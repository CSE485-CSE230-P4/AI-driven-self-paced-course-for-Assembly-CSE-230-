from fastapi import APIRouter, HTTPException, status

from app.models.request_models import CreateAIQueryRequest
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
