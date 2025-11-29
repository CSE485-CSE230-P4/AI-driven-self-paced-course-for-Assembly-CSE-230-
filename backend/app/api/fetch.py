import json
import re
from fastapi import APIRouter, HTTPException, status

from app.models.request_models import CreateAIQueryRequest, QuizGenerationRequest
from app.services.ai_service import CreateAIService, CreateAIServiceError

router = APIRouter(tags=["ai"])
createai_service = CreateAIService()


@router.post("/query")
async def query_createai(request: CreateAIQueryRequest):
    try:
        result = await createai_service.query(
            prompt=request.prompt,
            context=request.context,
            system_prompt=request.system_prompt,
            session_id=request.session_id,
            temperature=request.temperature,
            top_p=request.top_p,
            top_k=request.top_k,
            endpoint=request.endpoint,
            enable_search=request.enable_search,
            search_params=request.search_params,
            extra_input=request.extra_input,
            extra_model_params=request.extra_model_params,
        )
    except CreateAIServiceError as exc:
        status_code = exc.status_code or status.HTTP_502_BAD_GATEWAY
        raise HTTPException(status_code=status_code, detail=str(exc)) from exc

    return {"result": result}


@router.post("/quiz")
async def generate_quiz(request: QuizGenerationRequest):
    """
    Generate quiz questions for a specific module using the CreateAI API.
    Returns questions in the format expected by the frontend.
    """
    # Construct the prompt for quiz generation
    quiz_prompt = f"""Generate {request.num_questions} multiple-choice quiz questions for Module {request.module_id} of CSE 230 Assembly Language Programming.

Each question should:
1. Test understanding of Assembly language concepts specific to Module {request.module_id}
2. Have exactly 4 answer choices (A, B, C, D)
3. Have exactly one correct answer
4. Include a brief hint that guides students toward the correct answer

Return the response as a valid JSON array with this exact structure:
[
  {{
    "id": "1",
    "prompt": "Question text here?",
    "choices": [
      {{"id": "A", "text": "Choice A text", "isCorrect": false}},
      {{"id": "B", "text": "Choice B text", "isCorrect": true}},
      {{"id": "C", "text": "Choice C text", "isCorrect": false}},
      {{"id": "D", "text": "Choice D text", "isCorrect": false}}
    ],
    "hint": "Helpful hint text"
  }}
]

Make sure the questions are relevant to Module {request.module_id} content and progressively test different aspects of the material."""

    try:
        # Use a longer timeout for quiz generation (90 seconds instead of default 30)
        # Quiz generation takes longer because it needs to generate multiple questions with search enabled
        quiz_service = CreateAIService(timeout=90.0)
        
        result = await quiz_service.query(
            prompt=quiz_prompt,
            context=f"Module {request.module_id}",
            system_prompt="You are an expert quiz generator for CSE 230 Assembly Language Programming. Generate high-quality multiple-choice questions that test conceptual understanding.",
            enable_search=True,
            temperature=0.7,
        )
        
        # Extract the response text from the CreateAI result
        # The CreateAI API returns a dict with "response" field containing a JSON string
        if isinstance(result, dict):
            response_text = result.get("response", "")
            # If response is not at top level, check nested structure
            if not response_text and "result" in result:
                response_text = result.get("result", {}).get("response", "")
        else:
            response_text = str(result)
        
        if not response_text:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Empty response from AI service"
            )
        
        # The response field contains a JSON string (with \n and escaped quotes)
        # Example: "[\n  {\n    \"id\": \"1\",\n    ...\n  }\n]\n\nExtra text here"
        # The response_text is a JSON-encoded string, so we need to parse it first
        questions = None
        parse_error = None
        
        # Strategy 1: Parse the response_text as a JSON string first
        # The API returns: {"response": "[\n  {\n    \"id\": ...\n  }\n]"}
        # So response_text is a JSON string that needs to be parsed
        try:
            # First parse: Get the actual string from the JSON-encoded response
            parsed_string = json.loads(response_text)
            
            if isinstance(parsed_string, str):
                # It's a JSON string, now parse the actual JSON array
                # The string might have extra text after the JSON array, so find where it ends
                # Find the last closing bracket to get just the JSON array
                bracket_end = parsed_string.rfind(']')
                if bracket_end != -1:
                    # Extract just the JSON array part (before any extra text)
                    json_array_str = parsed_string[:bracket_end + 1]
                    questions = json.loads(json_array_str)
                else:
                    # No closing bracket found, try parsing the whole string
                    questions = json.loads(parsed_string)
            elif isinstance(parsed_string, list):
                # It's already a list (shouldn't happen but handle it)
                questions = parsed_string
        except json.JSONDecodeError as e:
            parse_error = str(e)
            # If first parse failed, the response_text might not be JSON-encoded
            # Try parsing it directly as JSON
            try:
                questions = json.loads(response_text)
            except json.JSONDecodeError:
                pass
        
        # Strategy 2: If parsing failed, the response might have extra text
        # Extract just the JSON array part before any extra text
        if questions is None or not isinstance(questions, list):
            # Remove markdown code blocks if present
            cleaned_text = response_text.strip()
            if cleaned_text.startswith("```json"):
                cleaned_text = cleaned_text[7:]
            elif cleaned_text.startswith("```"):
                cleaned_text = cleaned_text[3:]
            if cleaned_text.endswith("```"):
                cleaned_text = cleaned_text[:-3]
            cleaned_text = cleaned_text.strip()
            
            # Try parsing the cleaned text as JSON string first
            try:
                parsed = json.loads(cleaned_text)
                if isinstance(parsed, str):
                    questions = json.loads(parsed)
                elif isinstance(parsed, list):
                    questions = parsed
            except json.JSONDecodeError:
                # If that fails, try to extract the JSON array manually
                bracket_start = cleaned_text.find('[')
                if bracket_start != -1:
                    # Find the matching closing bracket
                    bracket_count = 0
                    bracket_end = -1
                    for i in range(bracket_start, len(cleaned_text)):
                        if cleaned_text[i] == '[':
                            bracket_count += 1
                        elif cleaned_text[i] == ']':
                            bracket_count -= 1
                            if bracket_count == 0:
                                bracket_end = i
                                break
                    
                    if bracket_end != -1:
                        try:
                            # Extract the JSON array string
                            json_str = cleaned_text[bracket_start:bracket_end + 1]
                            # Try parsing it as JSON string first, then as array
                            try:
                                parsed_str = json.loads(json_str)
                                if isinstance(parsed_str, str):
                                    questions = json.loads(parsed_str)
                                elif isinstance(parsed_str, list):
                                    questions = parsed_str
                            except json.JSONDecodeError:
                                # If it's not a JSON string, try parsing directly
                                questions = json.loads(json_str)
                        except json.JSONDecodeError:
                            pass
        
        # Strategy 3: Try regex to extract JSON array (non-greedy)
        if questions is None or not isinstance(questions, list):
            json_match = re.search(r'\[[\s\S]*?\]', response_text, re.DOTALL)
            if json_match:
                try:
                    json_str = json_match.group(0)
                    # Try parsing as JSON string first
                    try:
                        parsed_str = json.loads(json_str)
                        if isinstance(parsed_str, str):
                            questions = json.loads(parsed_str)
                        elif isinstance(parsed_str, list):
                            questions = parsed_str
                    except json.JSONDecodeError:
                        # If not a JSON string, parse directly
                        questions = json.loads(json_str)
                except json.JSONDecodeError:
                    pass
        
        # If all strategies failed, return a helpful error
        if questions is None or not isinstance(questions, list):
            error_detail = f"Could not parse quiz questions from AI response. "
            if parse_error:
                error_detail += f"Parse error: {parse_error}. "
            # Show first 1000 chars for debugging
            preview = response_text[:1000].replace('\n', '\\n').replace('\r', '\\r')
            error_detail += f"Response preview: {preview}"
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=error_detail
            )
        
        # Validate the structure
        if not isinstance(questions, list):
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="AI response is not a list of questions"
            )
        
        # Ensure each question has the required structure
        validated_questions = []
        for i, q in enumerate(questions, 1):
            if not isinstance(q, dict):
                continue
            validated_q = {
                "id": str(q.get("id", str(i))),
                "prompt": str(q.get("prompt", "")),
                "choices": [],
                "hint": q.get("hint")
            }
            
            # Validate choices
            choices = q.get("choices", [])
            if not isinstance(choices, list) or len(choices) != 4:
                continue
            
            for choice in choices:
                if not isinstance(choice, dict):
                    continue
                validated_q["choices"].append({
                    "id": str(choice.get("id", "")),
                    "text": str(choice.get("text", "")),
                    "isCorrect": bool(choice.get("isCorrect", False))
                })
            
            # Ensure exactly one correct answer
            correct_count = sum(1 for c in validated_q["choices"] if c["isCorrect"])
            if correct_count != 1:
                # Auto-fix: 
                # - If multiple correct, keep the first correct one
                # - If none correct, mark the first choice as correct
                first_correct_idx = None
                for idx, c in enumerate(validated_q["choices"]):
                    if c["isCorrect"]:
                        first_correct_idx = idx
                        break
                
                # Reset all to false
                for c in validated_q["choices"]:
                    c["isCorrect"] = False
                
                # Set the correct one (first correct if found, otherwise first choice)
                target_idx = first_correct_idx if first_correct_idx is not None else 0
                validated_q["choices"][target_idx]["isCorrect"] = True
            
            if len(validated_q["choices"]) == 4 and validated_q["prompt"]:
                validated_questions.append(validated_q)
        
        if not validated_questions:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Could not generate valid quiz questions. Please try again."
            )
        
        return {
            "moduleId": request.module_id,
            "questions": validated_questions[:request.num_questions]
        }
        
    except HTTPException:
        raise
    except CreateAIServiceError as exc:
        status_code = exc.status_code or status.HTTP_502_BAD_GATEWAY
        raise HTTPException(status_code=status_code, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error generating quiz: {str(exc)}"
        ) from exc
