from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Literal
import httpx

router = APIRouter(prefix="/chat", tags=["local-chat"])

OLLAMA_URL = "http://localhost:11434"   # Ollama default
MODEL = "llama3.2:1b"                   # small model

class Msg(BaseModel):
    role: Literal["system", "user", "assistant"]
    content: str

class ChatRequest(BaseModel):
    messages: List[Msg]
    temperature: float = 0.2
    max_tokens: int = 256

@router.post("/local")
async def chat_local(payload: ChatRequest):
    """
    Local conversation endpoint: Next.js -> FastAPI -> Ollama
    """
    try:
        req = {
            "model": MODEL,
            "messages": [m.model_dump() for m in payload.messages],
            "stream": False,
            "options": {
                "temperature": payload.temperature,
                "num_predict": payload.max_tokens
            }
        }

        async with httpx.AsyncClient(timeout=60) as client:
            r = await client.post(f"{OLLAMA_URL}/api/chat", json=req)
            r.raise_for_status()
            data = r.json()

        return {
            "reply": data["message"]["content"],
            "model": MODEL
        }

    except httpx.HTTPError as e:
        raise HTTPException(status_code=502, detail=f"Ollama error: {str(e)}")
