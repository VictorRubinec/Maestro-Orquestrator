from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import json
import uuid

from .ws_handler import manager
from .database import engine, Base
from .routers import automations, agents, jobs

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Cria as tabelas se não existirem (em prod usar Alembic)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield

app = FastAPI(title="Maestro Control Plane", lifespan=lifespan)

# Configuração de CORS para o Frontend React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Em prod, restringir para a URL do frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registro de Routers
app.include_router(automations.router)
app.include_router(agents.router)
app.include_router(jobs.router)

@app.get("/")
async def root():
    return {
        "status": "Control Plane Online",
        "version": "1.0.0",
        "connected_agents": len(manager.active_connections)
    }

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
                # Atualiza telemetria no banco e no manager
                manager.update_telemetry(token, p_data)
                
            elif p_type == "JOB_STARTED":
                exec_id = p_data.get("execution_id")
                # Aqui poderíamos atualizar o status do Job no banco para RUNNING
                
            elif p_type == "JOB_COMPLETED":
                exec_id = p_data.get("execution_id")
                # Lógica de persistência final do Job (logs, status, métricas)
                
            elif p_type == "ERROR_LOG":
                exec_id = p_data.get("execution_id")
                # Lógica de log de erro
                
    except WebSocketDisconnect:
        manager.disconnect(token)
        print(f"[Agent {token}] Desconectou.")

# Endpoint para disparar Job manualmente (usado pelo botão "Executar Agora")
@app.post("/api/jobs/trigger/{automation_id}")
async def trigger_manual_job(automation_id: uuid.UUID, agent_id: uuid.UUID, params: dict):
    # 1. Busca automação e agente no banco
    # 2. Gera comando final com os parâmetros
    # 3. Cria registro de Execução
    # 4. Envia comando via WebSocket
    execution_id = str(uuid.uuid4())
    # ... lógica de envio ...
    return {"execution_id": execution_id, "status": "sent"}
