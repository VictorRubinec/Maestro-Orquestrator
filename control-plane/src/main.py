from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Depends, HTTPException
from contextlib import asynccontextmanager
from pydantic import BaseModel
import uuid
import json

from .ws_handler import manager
from . import bot

@asynccontextmanager
async def lifespan(app: FastAPI):
    await bot.start_telegram_bot()
    yield
    await bot.stop_telegram_bot()

app = FastAPI(title="Maestro Control Plane", lifespan=lifespan)

@app.get("/")
async def root():
    return {"status": "Control Plane Online"}

@app.websocket("/ws/agent/{token}")
async def websocket_endpoint(websocket: WebSocket, token: str):
    await manager.connect(websocket, token)
    try:
        while True:
            data = await websocket.receive_text()
            payload = json.loads(data)
            
            p_type = payload.get("type")
            p_data = payload.get("payload", {})

            if p_type == "HEARTBEAT_TELEMETRY":
                manager.update_telemetry(token, p_data.get("hardware", {}))
                
            elif p_type == "JOB_COMPLETED":
                exec_id = p_data.get("execution_id")
                exit_code = p_data.get("exit_code")
                stdout = p_data.get("stdout", "")
                
                chat_id = manager.get_and_clear_job_chat(exec_id)
                if chat_id and bot.bot_app:
                    msg = f"✅ *Job Concluído com Sucesso!*\nID: `{exec_id}`\nExit Code: `{exit_code}`\n\n*Logs:*\n```\n{stdout[:3500]}\n```"
                    await bot.bot_app.bot.send_message(chat_id=chat_id, text=msg, parse_mode="Markdown")
                    
            elif p_type == "ERROR_LOG":
                exec_id = p_data.get("execution_id")
                error_msg = p_data.get("message", "")
                
                chat_id = manager.get_and_clear_job_chat(exec_id)
                if chat_id and bot.bot_app:
                    msg = f"❌ *Falha no Job!*\nID: `{exec_id}`\n\n*Erro:*\n```\n{error_msg[:3500]}\n```"
                    await bot.bot_app.bot.send_message(chat_id=chat_id, text=msg, parse_mode="Markdown")
                
    except WebSocketDisconnect:
        manager.disconnect(token)
        print(f"[Agent {token}] Desconectou.")

class TriggerJobRequest(BaseModel):
    agent_token: str
    command: str

@app.post("/api/jobs/trigger")
async def trigger_job(req: TriggerJobRequest):
    execution_id = str(uuid.uuid4())
    success = await manager.send_job(
        agent_token=req.agent_token,
        payload={
            "execution_id": execution_id,
            "command": req.command,
            "timeout_seconds": 60
        }
    )
    if not success:
        raise HTTPException(status_code=404, detail="Agente não encontrado ou offline")
    return {"message": "Job enviado com sucesso", "execution_id": execution_id}
