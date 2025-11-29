# Quiz Generation Request Details

## Where the Request is Sent

**API URL**: Set by `CREATEAI_API_URL` environment variable
- Default: `https://api-main.aiml.asu.edu/query`
- Check your `.env` file for the actual value

**HTTP Method**: `POST`

**Headers**:
```
Authorization: Bearer <CREATEAI_API_TOKEN>
Content-Type: application/json
```

## Request Payload Structure

The request is sent as a JSON payload with the following structure:

```json
{
  "action": "query",
  "request_source": "override_params",
  "query": "<The full quiz generation prompt>",
  "model_provider": "openai",
  "model_name": "gpt4",
  "session_id": "<random UUID>",
  "model_params": {
    "system_prompt": "You are an expert quiz generator for CSE 230 Assembly Language Programming. Generate high-quality multiple-choice questions that test conceptual understanding.",
    "enable_search": true,
    "temperature": 0.7
  }
}
```

## The Query Being Sent

When you request 5 questions for Module 1, the `query` field contains:

```
Generate 5 multiple-choice quiz questions for Module 1 of CSE 230 Assembly Language Programming.

Each question should:
1. Test understanding of Assembly language concepts specific to Module 1
2. Have exactly 4 answer choices (A, B, C, D)
3. Have exactly one correct answer
4. Include a brief hint that guides students toward the correct answer

Return the response as a valid JSON array with this exact structure:
[
  {
    "id": "1",
    "prompt": "Question text here?",
    "choices": [
      {"id": "A", "text": "Choice A text", "isCorrect": false},
      {"id": "B", "text": "Choice B text", "isCorrect": true},
      {"id": "C", "text": "Choice C text", "isCorrect": false},
      {"id": "D", "text": "Choice D text", "isCorrect": false}
    ],
    "hint": "Helpful hint text"
  }
]

Make sure the questions are relevant to Module 1 content and progressively test different aspects of the material.
```

**Plus the context is added as**: `Module 1`

So the full query sent to the API is:
```
Generate 5 multiple-choice quiz questions for Module 1 of CSE 230 Assembly Language Programming.

Each question should:
1. Test understanding of Assembly language concepts specific to Module 1
2. Have exactly 4 answer choices (A, B, C, D)
3. Have exactly one correct answer
4. Include a brief hint that guides students toward the correct answer

Return the response as a valid JSON array with this exact structure:
[
  {
    "id": "1",
    "prompt": "Question text here?",
    "choices": [
      {"id": "A", "text": "Choice A text", "isCorrect": false},
      {"id": "B", "text": "Choice B text", "isCorrect": true},
      {"id": "C", "text": "Choice C text", "isCorrect": false},
      {"id": "D", "text": "Choice D text", "isCorrect": false}
    ],
    "hint": "Helpful hint text"
  }
]

Make sure the questions are relevant to Module 1 content and progressively test different aspects of the material.

Context:
Module 1
```

## Timeout Settings

- **Default timeout**: 30 seconds (for regular queries)
- **Quiz generation timeout**: 90 seconds (increased because generating multiple questions takes longer)

## Environment Variables Used

- `CREATEAI_API_URL` - The API endpoint URL
- `CREATEAI_API_TOKEN` - Authentication token
- `CREATEAI_MODEL_PROVIDER` - Model provider (default: "openai")
- `CREATEAI_MODEL_NAME` - Model name (default: "gpt4")
- `CREATEAI_PROJECT_ID` - Project ID (optional, used for search params)

## Why It Might Be Timing Out

1. **Large prompt**: The quiz generation prompt is quite long and detailed
2. **Multiple questions**: Generating 5-20 questions takes more time than a single response
3. **Enable search**: With `enable_search: true`, the API searches the knowledge base first, which adds time
4. **Network latency**: Connection to the API server might be slow

## Solutions

1. ✅ **Increased timeout to 90 seconds** for quiz generation
2. Consider reducing the number of questions if timeout persists
3. Check network connectivity to the API server
4. Verify the API URL is correct in your `.env` file

