from pydantic import BaseModel, Field


class UserCreate(BaseModel):
    userid: str
    password: str = Field(min_length=6, max_length=72)


class UserLogin(BaseModel):
    userid: str
    password: str = Field(max_length=72)


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserResponse(BaseModel):
    userid: str
    message: str


class CreateAIQueryRequest(BaseModel):
    prompt: str
    context: str | None = None
    system_prompt: str | None = None
    session_id: str | None = None
    temperature: float | None = None
    top_p: float | None = None
    top_k: int | None = None
    endpoint: str | None = None
    enable_search: bool | None = None
    search_params: dict | None = None
    extra_input: dict | None = None
    extra_model_params: dict | None = None
