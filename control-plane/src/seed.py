import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from .database import Base, DATABASE_URL, AsyncSessionLocal
from .models import Empresa, Agente, Automacao
import uuid

async def init_db():
    engine = create_async_engine(DATABASE_URL, echo=True)
    
    # Criar todas as tabelas
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
        
    async with AsyncSessionLocal() as session:
        # Inserir Empresa
        empresa_id = uuid.uuid4()
        nova_empresa = Empresa(id=empresa_id, nome="Minha Empresa Teste")
        session.add(nova_empresa)
        await session.commit()
        
        # Inserir Agente de Teste
        agente_id = uuid.uuid4()
        novo_agente = Agente(id=agente_id, tenant_id=empresa_id, nome="Worker-Local-01")
        session.add(novo_agente)
        
        # Inserir Automação de Teste
        nova_automacao = Automacao(
            tenant_id=empresa_id, 
            nome="Contar até 5", 
            comando_execucao="python -c \"import time; [print(f'Passo {i}') or time.sleep(1) for i in range(1, 6)]\""
        )
        session.add(nova_automacao)
        
        await session.commit()
        print(f"Banco de dados populado com sucesso!")
        print(f"ID da Empresa: {empresa_id}")
        print(f"ID do Agente: {agente_id}")

if __name__ == "__main__":
    asyncio.run(init_db())
