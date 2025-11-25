import os
from typing import Any
from uuid import uuid4

import httpx


class CreateAIServiceError(Exception):
    def __init__(self, message: str, status_code: int | None = None) -> None:
        super().__init__(message)
        self.status_code = status_code


class CreateAIService:
    def __init__(
        self,
        api_url: str | None = None,
        api_token: str | None = None,
        default_system_prompt: str | None = None,
        model_provider: str | None = None,
        model_name: str | None = None,
        project_id: str | None = None,
        timeout: float = 30.0,
    ) -> None:
        self.api_url = api_url or os.getenv(
            "CREATEAI_API_URL",
            "https://api-main.aiml.asu.edu/query",
        )
        self.api_token = api_token or os.getenv("CREATEAI_API_TOKEN")
        self.default_system_prompt = default_system_prompt or os.getenv(
            "CREATEAI_SYSTEM_PROMPT",
            "You are Socratic CourseTutor (CSE 230 Assembly).",
        )
        self.model_provider = model_provider or os.getenv("CREATEAI_MODEL_PROVIDER", "openai")
        self.model_name = model_name or os.getenv("CREATEAI_MODEL_NAME", "gpt4")
        self.project_id = project_id or os.getenv("CREATEAI_PROJECT_ID")
        self.timeout = timeout

    async def query(
        self,
        *,
        prompt: str,
        context: str | None = None,
        system_prompt: str | None = None,
        session_id: str | None = None,
        temperature: float | None = None,
        top_p: float | None = None,
        top_k: int | None = None,
        endpoint: str | None = None,
        enable_search: bool | None = None,
        search_params: dict | None = None,
        extra_input: dict | None = None,
        extra_model_params: dict | None = None,
    ) -> Any:
        if not self.api_token:
            raise CreateAIServiceError("CREATEAI_API_TOKEN environment variable is not set.")

        payload = self._build_payload(
            prompt=prompt,
            context=context,
            system_prompt=system_prompt,
            session_id=session_id,
            temperature=temperature,
            top_p=top_p,
            top_k=top_k,
            endpoint=endpoint,
            enable_search=enable_search,
            search_params=endowed_search_params(search_params, self.project_id),
            extra_input=extra_input,
            extra_model_params=extra_model_params,
        )

        headers = {
            "Authorization": f"Bearer {self.api_token}",
            "Content-Type": "application/json",
        }

        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                response = await client.post(self.api_url, json=payload, headers=headers)
        except httpx.RequestError as exc:
            raise CreateAIServiceError(f"CreateAI request failed: {exc}") from exc

        if response.status_code >= 400:
            detail = response.text
            raise CreateAIServiceError(
                f"CreateAI returned error {response.status_code}: {detail}",
                status_code=response.status_code,
            )

        try:
            return response.json()
        except ValueError as exc:
            raise CreateAIServiceError("CreateAI response was not valid JSON") from exc

    def _build_payload(
        self,
        *,
        prompt: str,
        context: str | None,
        system_prompt: str | None,
        session_id: str | None,
        temperature: float | None,
        top_p: float | None,
        top_k: int | None,
        endpoint: str | None,
        enable_search: bool | None,
        search_params: dict | None,
        extra_input: dict | None,
        extra_model_params: dict | None,
    ) -> dict:
        user_query = prompt if not context else f"{prompt}\n\nContext:\n{context}"
        payload: dict[str, Any] = {
            "action": "query",
            "request_source": "override_params",
            "query": user_query,
            "model_provider": self.model_provider,
            "model_name": self.model_name,
            "session_id": session_id or str(uuid4()),
        }

        if endpoint:
            payload["endpoint"] = endpoint
        if extra_input:
            payload |= extra_input

        model_params: dict[str, Any] = {
            "system_prompt": system_prompt or self.default_system_prompt,
        }
        if temperature is not None:
            model_params["temperature"] = temperature
        if top_p is not None:
            model_params["top_p"] = top_p
        if top_k is not None:
            model_params["top_k"] = top_k
        if enable_search is not None:
            model_params["enable_search"] = enable_search
        if search_params:
            model_params["search_params"] = search_params
        if extra_model_params:
            model_params.update(extra_model_params)

        payload["model_params"] = model_params
        return payload


def endowed_search_params(request_params: dict | None, default_collection: str | None) -> dict | None:
    if request_params:
        return request_params
    if default_collection:
        return {"collection": default_collection}
    return None
