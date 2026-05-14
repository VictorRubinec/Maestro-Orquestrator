from typing import Dict
from fastapi import WebSocket

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}
        self.agent_telemetry: Dict[str, dict] = {}
        self.job_chat_map: Dict[str, int] = {}

    async def connect(self, websocket: WebSocket, agent_token: str):
        await websocket.accept()
        self.active_connections[agent_token] = websocket
        self.agent_telemetry[agent_token] = {}

    def disconnect(self, agent_token: str):
        if agent_token in self.active_connections:
            del self.active_connections[agent_token]
        if agent_token in self.agent_telemetry:
            del self.agent_telemetry[agent_token]

    def update_telemetry(self, agent_token: str, telemetry: dict):
        self.agent_telemetry[agent_token] = telemetry

    def set_job_chat(self, execution_id: str, chat_id: int):
        self.job_chat_map[execution_id] = chat_id

    def get_and_clear_job_chat(self, execution_id: str):
        return self.job_chat_map.pop(execution_id, None)

    async def send_job(self, agent_token: str, payload: dict):
        if agent_token in self.active_connections:
            await self.active_connections[agent_token].send_json({
                "type": "EXECUTE_JOB",
                "payload": payload
            })
            return True
        return False

manager = ConnectionManager()
