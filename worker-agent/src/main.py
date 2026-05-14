import asyncio
import json
import websockets
import psutil
import subprocess
import os
from dotenv import load_dotenv

load_dotenv()

WS_URL = os.getenv("MAESTRO_WS_URL", "ws://localhost:8000/ws/agent")
TOKEN = os.getenv("MAESTRO_AGENT_TOKEN", "worker_teste_local")

async def gather_telemetry():
    cpu = psutil.cpu_percent(interval=None)
    ram = psutil.virtual_memory()
    return {
        "cpu_percent": cpu,
        "ram_percent": ram.percent,
        "ram_used_mb": ram.used // (1024 * 1024)
    }

async def heartbeat_loop(websocket):
    try:
        while True:
            telemetry_data = await gather_telemetry()
            payload = {
                "type": "HEARTBEAT_TELEMETRY",
                "payload": {
                    "status": "ONLINE",
                    "hardware": telemetry_data
                }
            }
            await websocket.send(json.dumps(payload))
            await asyncio.sleep(10) # Envia a cada 10 segundos
    except asyncio.CancelledError:
        pass

async def execute_job(websocket, payload):
    execution_id = payload.get("execution_id")
    command = payload.get("command")
    
    try:
        print(f"Executando Job [{execution_id}]: {command}")
        process = await asyncio.create_subprocess_shell(
            command,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        
        stdout, stderr = await asyncio.wait_for(
            process.communicate(), 
            timeout=payload.get("timeout_seconds", 60)
        )
        
        if process.returncode == 0:
            result = {
                "type": "JOB_COMPLETED",
                "payload": {
                    "execution_id": execution_id,
                    "exit_code": process.returncode,
                    "stdout": stdout.decode('utf-8', errors='replace') if stdout else ""
                }
            }
        else:
            result = {
                "type": "ERROR_LOG",
                "payload": {
                    "execution_id": execution_id,
                    "error_type": "JOB_FAILED",
                    "exit_code": process.returncode,
                    "message": stderr.decode('utf-8', errors='replace') if stderr else "Erro desconhecido."
                }
            }
            
        await websocket.send(json.dumps(result))
        
    except asyncio.TimeoutError:
        process.kill()
        error_payload = {
            "type": "ERROR_LOG",
            "payload": {
                "execution_id": execution_id,
                "error_type": "TIMEOUT",
                "message": "Timeout excedido."
            }
        }
        await websocket.send(json.dumps(error_payload))
    except Exception as e:
        print(f"Erro Crítico Interno: {e}")

async def listen_commands(websocket):
    async for message in websocket:
        data = json.loads(message)
        if data.get("type") == "EXECUTE_JOB":
            asyncio.create_task(execute_job(websocket, data.get("payload")))

async def agent_main_loop():
    backoff = 1
    max_backoff = 30
    url = f"{WS_URL}/{TOKEN}"
    
    while True:
        try:
            print(f"Conectando ao Control Plane: {url}...")
            async with websockets.connect(url) as websocket:
                print("Conectado com Sucesso!")
                backoff = 1
                
                heartbeat_task = asyncio.create_task(heartbeat_loop(websocket))
                listen_task = asyncio.create_task(listen_commands(websocket))
                
                await asyncio.gather(heartbeat_task, listen_task)
                
        except (websockets.ConnectionClosed, OSError) as e:
            print(f"Conexão perdida. Tentando reconectar em {backoff}s...")
            await asyncio.sleep(backoff)
            backoff = min(backoff * 2, max_backoff)

if __name__ == "__main__":
    # Inicializa telemetria da CPU antes de medir
    psutil.cpu_percent()
    asyncio.run(agent_main_loop())
