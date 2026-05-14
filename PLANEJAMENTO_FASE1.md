# Planejamento Técnico: Fase 1 - Protótipo (Core, Conectividade e Bots)

Este documento detalha o planejamento arquitetural e fluxo de execução especificamente para a **Fase 1** do projeto Maestro. O objetivo é estabelecer a fundação sólida de comunicação entre o servidor e os agentes, permitindo disparos via API e Chatbots.

## Stack Tecnológica da Fase 1
- **Linguagem**: Python 3.11+
- **Gerenciador de Pacotes/Ambiente**: `uv` (Astral) - Substituindo o pip e venv tradicional para máxima velocidade e gestão moderna de dependências.
- **Backend (Control Plane)**: `FastAPI`, `Uvicorn` (Servidor ASGI)
- **Banco de Dados**: `PostgreSQL` (Acessado via `SQLAlchemy` e `asyncpg`)
- **Comunicação WebSockets**: Nativas do FastAPI (`fastapi.websockets`) no servidor, e biblioteca `websockets` no Worker.
- **Bots**: `python-telegram-bot` (Telegram) e `botbuilder-core` (Microsoft Teams).
- **Worker (Agente)**: Python puro utilizando `asyncio`, `psutil` e `subprocess`.

---

## Fluxo de Construção (Etapas)

### 1. Setup do Ambiente e Estrutura de Pastas (via UV)
- Utilização do `uv` para inicializar os projetos (`uv init`) nas pastas `control-plane/` e `worker-agent/`.
- Criação dos ambientes virtuais ultrarrápidos (`uv venv`).
- Instalação das dependências e gestão do `pyproject.toml` usando `uv add`.
- Configuração do `.env` local para as credenciais de banco e tokens.

### 2. Modelagem do Banco de Dados (ORM)
- Transcrição do DDL SQL (definido em `maestro_planning_and_architecture.md`) para modelos ORM do SQLAlchemy.
- Criação das tabelas: `empresas`, `agentes`, `automacoes`, `execucoes`, e `configuracoes_variaveis`.
- Implementação de um script simples de *seed* para inserir a sua empresa e uma automação de teste.

### 3. API Core e Websockets (Control Plane)
- Criação do `ConnectionManager` no FastAPI para manter o estado das conexões ativas (quem está online).
- Endpoint WebSocket (`/ws/agent/{token}`) para:
  - Receber Handshake e validar autenticação básica.
  - Receber métricas periódicas (Telemetria).
  - Enviar comandos `EXECUTE_JOB`.
- Endpoints REST `/api/jobs/trigger` para permitir disparo das automações via Postman.

### 4. Construção do Agente (Worker)
- Implementação do cliente Python headless.
- Loop de reconexão automática com *Exponential Backoff*.
- Loop assíncrono para enviar estado de CPU/RAM.
- Função isolada (via `subprocess`) que roda um script fictício quando o servidor mandar, capturando os logs do console e devolvendo para o servidor sem travar a conexão.

### 5. Integração com Bots
- **Telegram**: Configuração de um webhook (ou background task com polling) no FastAPI para interagir com o Telegram.
  - Comandos: `/status` (mostra quantos agentes estão online e sua CPU) e `/run <id_automacao>` (dispara uma execução no agente).
- **Microsoft Teams**: Configuração do endpoint `/api/messages` recebendo eventos do Bot Framework, mapeando para as mesmas ações do Telegram.

---

## Verification Plan (Validação da Fase 1)

**Passo 1: Teste Local de Comunicação**
- Rodar o Control Plane na porta 8000.
- Ligar o Worker em um terminal separado.
- Verificar no banco de dados (ou logs do servidor) se o Worker apareceu como "ONLINE" com seus dados de RAM/CPU.

**Passo 2: Teste de Disparo via Postman**
- Fazer uma requisição HTTP POST para `/api/jobs/trigger`.
- O servidor enviará um socket para o Worker. O Worker rodará um script que conta de 1 a 5 e devolve o log.

**Passo 3: Teste via Telegram / Teams**
- Abrir o chat do Bot no celular.
- Enviar `/status` -> O bot responde "1 agente online (CPU 20%)".
- Enviar `/run script_teste` -> O bot responde "Execução iniciada". Segundos depois, responde "Execução concluída com sucesso. Logs: ...".
