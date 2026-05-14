# Documentação de Arquitetura: Maestro (Orquestrador de Automações Distribuído)

Este documento detalha as definições arquiteturais, modelagem de banco de dados, contratos de comunicação e estrutura de projeto para o orquestrador SaaS "Maestro".

## 1. Modelagem do Banco de Dados (ERD / DDL)
Esquema desenvolvido para PostgreSQL, focando no isolamento Multi-tenant (`tenant_id`) e aproveitamento extensivo do tipo `JSONB` para flexibilidade na modelagem de métricas e configurações.

```sql
-- DDL para o Projeto Maestro

-- Tabela de Empresas (Tenants)
CREATE TABLE empresas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Configurações de Variáveis Dinâmicas
-- Armazena variáveis/fórmulas dinâmicas avaliadas pelo Dynamic Evaluator
CREATE TABLE configuracoes_variaveis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
    chave VARCHAR(100) NOT NULL,
    valor JSONB NOT NULL, -- Pode ser um valor literal numérico ou expressão em texto
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tenant_id, chave)
);

-- Tabela de Agentes (Workers)
CREATE TABLE agentes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
    nome VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'OFFLINE', -- ONLINE, OFFLINE, BUSY
    ultima_telemetria JSONB, -- Guarda os dados de hardware reportados (CPU, RAM, Disco)
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Automações (Jobs)
CREATE TABLE automacoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
    nome VARCHAR(255) NOT NULL,
    comando_execucao VARCHAR(500) NOT NULL, -- ex: "python script.py"
    formula_avaliacao VARCHAR(500), -- ex: "(tempo_manual / 60) * custo_hora"
    parametros_dinamicos JSONB, -- Inputs fixos ou dinâmicos da automação
    restricoes_agendamento JSONB, -- Input para OR-Tools (janelas, duração, timezone)
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Execuções (Histórico)
CREATE TABLE execucoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
    automacao_id UUID NOT NULL REFERENCES automacoes(id) ON DELETE CASCADE,
    agente_id UUID REFERENCES agentes(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, RUNNING, COMPLETED, FAILED
    resultado_avaliacao NUMERIC, -- Valor gerado pelo processamento seguro via 'ast' ou 'SpEL'
    metricas_execucao JSONB, -- Logs, Exit Code, Duração em milissegundos, etc
    iniciado_em TIMESTAMP WITH TIME ZONE,
    finalizado_em TIMESTAMP WITH TIME ZONE
);

-- Criação de Índices
CREATE INDEX idx_agentes_tenant ON agentes(tenant_id);
CREATE INDEX idx_automacoes_tenant ON automacoes(tenant_id);
CREATE INDEX idx_execucoes_tenant ON execucoes(tenant_id);
CREATE INDEX idx_execucoes_status ON execucoes(status);
```

---

## 2. Contrato de Interface WebSocket (Payloads)
Protocolo bidirecional asíncrono e event-driven sobre WebSocket (`wss://`).

### 2.1. Handshake (Worker ➔ Server)
No handshake inicial, o JWT é enviado nos Headers ou na Query. Em caso de restrições, pode ser enviado no payload primário.
```json
{
  "type": "HANDSHAKE",
  "payload": {
    "agent_version": "1.0.0",
    "os": "Windows",
    "hostname": "SERVER-01",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI..."
  }
}
```

### 2.2. Telemetria e Heartbeat (Worker ➔ Server)
Utiliza a biblioteca `psutil` para enviar métricas cíclicas de recursos físicos da máquina.
```json
{
  "type": "HEARTBEAT_TELEMETRY",
  "payload": {
    "agent_id": "a1b2c3d4-...",
    "status": "ONLINE",
    "hardware": {
      "cpu_percent": 35.5,
      "ram_total_mb": 16384,
      "ram_used_mb": 8192,
      "ram_percent": 50.0,
      "disk_free_gb": 105.2
    },
    "timestamp": "2026-05-13T17:54:55-03:00"
  }
}
```

### 2.3. Execução de Job (Server ➔ Worker)
Payload disparado pelo Scheduler do Control Plane quando os solvers (OR-Tools) definem a janela de execução.
```json
{
  "type": "EXECUTE_JOB",
  "payload": {
    "execution_id": "f5e6d7c8-...",
    "automation_id": "9a8b7c6d-...",
    "command": "python automacao_relatorio.py",
    "env_vars": {
      "API_KEY": "secret123",
      "TENANT_ID": "b1c2d3e4-..."
    },
    "timeout_seconds": 3600
  }
}
```

### 2.4. Job Completo (Worker ➔ Server)
O Worker engloba a saída padrão (stdout) e tempo da automação ao finalizar.
```json
{
  "type": "JOB_COMPLETED",
  "payload": {
    "execution_id": "f5e6d7c8-...",
    "exit_code": 0,
    "duration_seconds": 125.4,
    "stdout": "Automação finalizada. 100 itens inseridos.",
    "stderr": "",
    "timestamp": "2026-05-13T17:58:20-03:00"
  }
}
```

### 2.5. Relatório de Erro (Worker ➔ Server)
Reporte de falhas (crashes de app cliente, timeouts e falha de subprocess).
```json
{
  "type": "ERROR_LOG",
  "payload": {
    "execution_id": "f5e6d7c8-...",
    "error_type": "JOB_FAILED",
    "exit_code": 1,
    "message": "Time out na busca de elemento web.",
    "traceback": "Traceback (most recent call last):\n  File \"script.py\", line 42...",
    "timestamp": "2026-05-13T18:01:10-03:00"
  }
}
```

---

## 3. Estrutura de Diretórios (Boilerplate)
A separação foca nos três componentes primários (Frontend, Backend, Edge Worker).

```text
maestro-orchestrator/
├── control-plane/                # Backend FastAPI / Spring Boot (Server)
│   ├── src/
│   │   ├── api/
│   │   │   ├── ws_handler.py     # Gestão do Lifecycle de WebSockets
│   │   │   └── routes.py         # Endpoints REST (CRUDs do Dashboard)
│   │   ├── core/
│   │   │   ├── security.py       # Validação JWT multitenant e isolamento DB
│   │   │   ├── evaluator.py      # Motor AST para validação de fórmulas s/ RCE
│   │   │   └── scheduler.py      # Módulo Google OR-Tools / CSP Bin Packing
│   │   ├── models/               # Tabelas / Modelos SQLModel/SQLAlchemy
│   │   └── services/             # Regras de Negócio e Serviços
│   ├── Dockerfile
│   └── pyproject.toml
│
├── worker-agent/                 # Agente Headless Standalone em Python
│   ├── src/
│   │   ├── main.py               # Entrypoint (WSS Client Loop & Exponential Backoff)
│   │   ├── executor.py           # Subprocess Isolation (subprocess.Popen)
│   │   ├── telemetry.py          # Wrapper de psutil (Heartbeat)
│   │   └── config.py             # Args/Env parser (Tokens e Configs)
│   ├── build.py                  # Automação de compilação PyInstaller
│   └── requirements.txt          # Dependências: asyncio, websockets, psutil
│
└── dashboard/                    # SPA Front-end (React.js/Next.js)
    ├── src/
    │   ├── components/           # UI Elements (Tabelas de Telemetria, Gráficos)
    │   ├── pages/                # Views (Dashboard, Agentes, Automacoes)
    │   ├── hooks/                # Custom hooks (useWebSocket, useAuth)
    │   └── services/             # API Client REST/GraphQL
    ├── package.json
    └── vite.config.js
```

---

## 4. Agente Worker: Snippet Python Core
Implementação demonstrando assincronismo (`asyncio`), isolamento de processo (`create_subprocess_shell`), telemetria (`psutil`) e *Exponential Backoff*.

```python
import asyncio
import json
import websockets
import psutil
import subprocess
import os

WS_URL = "wss://api.maestro.com/ws/agent"
TOKEN = os.getenv("MAESTRO_AGENT_TOKEN")

async def gather_telemetry():
    """Captura de saúde física via psutil"""
    cpu = psutil.cpu_percent(interval=None)
    ram = psutil.virtual_memory()
    disk = psutil.disk_usage('/')
    return {
        "cpu_percent": cpu,
        "ram_total_mb": ram.total // (1024 * 1024),
        "ram_used_mb": ram.used // (1024 * 1024),
        "ram_percent": ram.percent,
        "disk_free_gb": disk.free // (1024 * 1024 * 1024)
    }

async def heartbeat_loop(websocket):
    """Loop de telemetria periódico (Heartbeat)"""
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
            await asyncio.sleep(30)
    except asyncio.CancelledError:
        pass

async def execute_job(websocket, payload):
    """Executa scripts isolando a thread principal (subprocess)"""
    execution_id = payload.get("execution_id")
    command = payload.get("command")
    
    try:
        # Isolamento do Job: Cria subprocesso assíncrono para prevenir travamento do WebSocket
        process = await asyncio.create_subprocess_shell(
            command,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            env={**os.environ, **payload.get("env_vars", {})}
        )
        
        stdout, stderr = await asyncio.wait_for(
            process.communicate(), 
            timeout=payload.get("timeout_seconds", 3600)
        )
        
        if process.returncode == 0:
            result = {
                "type": "JOB_COMPLETED",
                "payload": {
                    "execution_id": execution_id,
                    "exit_code": process.returncode,
                    "stdout": stdout.decode('utf-8'),
                    "stderr": stderr.decode('utf-8')
                }
            }
        else:
            result = {
                "type": "ERROR_LOG",
                "payload": {
                    "execution_id": execution_id,
                    "error_type": "JOB_FAILED",
                    "exit_code": process.returncode,
                    "message": "Processo retornou um código de erro.",
                    "traceback": stderr.decode('utf-8')
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
                "exit_code": -1,
                "message": "Job excedeu o limite máximo de tempo (timeout)."
            }
        }
        await websocket.send(json.dumps(error_payload))
    except Exception as e:
        print(f"Erro Crítico Interno: {e}")

async def listen_commands(websocket):
    """Consumer de instruções do Control Plane"""
    async for message in websocket:
        data = json.loads(message)
        if data.get("type") == "EXECUTE_JOB":
            # Dispara background task sem bloquear o ping/pong
            asyncio.create_task(execute_job(websocket, data.get("payload")))

async def agent_main_loop():
    """Conexão WebSocket central com Resiliência de Rede"""
    backoff = 1
    max_backoff = 60
    extra_headers = {"Authorization": f"Bearer {TOKEN}"}
    
    while True:
        try:
            print(f"Conectando ao Control Plane: {WS_URL}...")
            async with websockets.connect(WS_URL, extra_headers=extra_headers) as websocket:
                print("Conectado com Sucesso!")
                backoff = 1 # Restaura o timer de backoff
                
                # Inicia de forma concorrente a telemetria e o listener de comandos
                heartbeat_task = asyncio.create_task(heartbeat_loop(websocket))
                listen_task = asyncio.create_task(listen_commands(websocket))
                
                # Fica em estado de aguardo. Cai se a conexão quebrar.
                await asyncio.gather(heartbeat_task, listen_task)
                
        except (websockets.ConnectionClosed, OSError) as e:
            print(f"Conexão perdida. Tentando reconectar em {backoff} segundos... (Erro: {e})")
            await asyncio.sleep(backoff)
            backoff = min(backoff * 2, max_backoff) # Implementação do Exponential Backoff

if __name__ == "__main__":
    asyncio.run(agent_main_loop())
```
