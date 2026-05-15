import asyncio
import uuid
from datetime import datetime, timedelta
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from .database import AsyncSessionLocal, engine, Base
from .models import Empresa, Agente, Automacao, Execucao, NotificacaoConfig

async def seed_data():
    # Garantir que as tabelas existam
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        
    async with AsyncSessionLocal() as session:
        # 1. Criar Empresa (Tenant)
        empresa = Empresa(nome="Maestro Enterprise")
        session.add(empresa)
        await session.flush()
        tenant_id = empresa.id

        # 2. Criar Agentes
        agente1 = Agente(
            tenant_id=tenant_id,
            nome="Victor-Workstation",
            descricao="PC Principal de Desenvolvimento",
            os="Windows 11",
            token_conexao="agt_victor_pc_2026",
            status="ONLINE",
            ultima_telemetria={"cpu": 45, "ram": 62, "disk": 30}
        )
        agente2 = Agente(
            tenant_id=tenant_id,
            nome="Server-Production-01",
            descricao="Servidor de Produção Nuvem",
            os="Ubuntu 22.04",
            token_conexao="agt_prod_server_01",
            status="ONLINE",
            ultima_telemetria={"cpu": 12, "ram": 25, "disk": 15}
        )
        session.add_all([agente1, agente2])
        await session.flush()

        # 3. Criar Automações
        # Automação 1: Faturamento Mensal (Complexa)
        auto1 = Automacao(
            tenant_id=tenant_id,
            nome="Faturamento Mensal TOTVS",
            descricao="Processamento de faturamento automatizado no ERP TOTVS",
            comando_base="python main.py",
            parametros_config=[
                {"name": "Re-processar", "description": "Forçar re-processamento", "type": "flag", "command_arg": "-re"},
                {"name": "Data Inicial", "description": "Início do período", "type": "date", "command_arg": "-di"},
                {"name": "Hotel Tag", "description": "Código do hotel", "type": "text", "command_arg": "-ht", "value_mask": "GTIM"},
                {"name": "ID Instância", "description": "ID da instância de banco", "type": "number", "command_arg": "-i"}
            ],
            schedules=[
                {"type": "monthly", "month_days": [1, 15], "times": ["08:00"], "agents_ids": [str(agente1.id)]}
            ],
            agentes_mapping={
                str(agente1.id): {"path": "C:/Automations/Billing"},
                str(agente2.id): {"path": "/opt/maestro/billing"}
            }
        )

        # Automação 2: Backup de Logs (Simples)
        auto2 = Automacao(
            tenant_id=tenant_id,
            nome="Backup de Logs",
            descricao="Limpeza e backup de logs temporários",
            comando_base="bash cleanup.sh",
            parametros_config=[
                {"name": "Ambiente", "description": "prod ou dev", "type": "text", "command_arg": "--env"}
            ],
            schedules=[
                {"type": "weekly", "days": [1, 2, 3, 4, 5], "times": ["23:00"], "agents_ids": [str(agente2.id)]}
            ],
            agentes_mapping={
                str(agente2.id): {"path": "/var/logs/maestro"}
            }
        )
        session.add_all([auto1, auto2])
        await session.flush()

        # 4. Criar Notificações (Slack)
        notif = NotificacaoConfig(
            tenant_id=tenant_id,
            canal="slack",
            webhook_url="https://hooks.slack.com/services/EXAMPLE",
            regras={"on_failure": True, "on_success": False, "on_agent_offline": True}
        )
        session.add(notif)

        # 5. Criar Histórico de Execuções (Jobs)
        for i in range(10):
            job = Execucao(
                tenant_id=tenant_id,
                automacao_id=auto1.id if i % 2 == 0 else auto2.id,
                agente_id=agente1.id if i % 2 == 0 else agente2.id,
                status="SUCCESS" if i != 3 else "ERROR",
                comando_final=f"python main.py -re -ht GTIM -i {1000 + i}",
                logs="[INFO] Iniciando processo...\n[DEBUG] Conectado ao agente.\n[INFO] Sucesso!",
                iniciado_em=datetime.utcnow() - timedelta(hours=i),
                finalizado_em=datetime.utcnow() - timedelta(hours=i) + timedelta(minutes=5),
                metricas_execucao={"duration_seconds": 300, "exit_code": 0 if i != 3 else 1}
            )
            session.add(job)

        await session.commit()
        print("Banco de dados populado com sucesso!")

if __name__ == "__main__":
    asyncio.run(seed_data())
