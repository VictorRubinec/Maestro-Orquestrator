from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from uuid import UUID
import uuid

from ..database import get_db
from ..models import Agente, Empresa
from ..schemas import AgenteBase, AgenteRead

router = APIRouter(prefix="/api/agents", tags=["agents"])

async def get_mock_tenant(db: AsyncSession):
    result = await db.execute(select(Empresa).limit(1))
    empresa = result.scalars().first()
    return empresa.id

@router.get("/", response_model=List[AgenteRead])
async def list_agents(db: AsyncSession = Depends(get_db)):
    tenant_id = await get_mock_tenant(db)
    result = await db.execute(select(Agente).where(Agente.tenant_id == tenant_id))
    return result.scalars().all()

@router.post("/", response_model=AgenteRead)
async def create_agent(data: AgenteBase, db: AsyncSession = Depends(get_db)):
    tenant_id = await get_mock_tenant(db)
    
    # Gera um token único para o novo agente
    token = f"agt_{uuid.uuid4().hex[:12]}"
    
    agent = Agente(
        tenant_id=tenant_id,
        nome=data.nome,
        descricao=data.descricao,
        os=data.os,
        token_conexao=token,
        status="OFFLINE"
    )
    
    db.add(agent)
    await db.commit()
    await db.refresh(agent)
    return agent

@router.put("/{id}", response_model=AgenteRead)
async def update_agent(id: UUID, data: AgenteBase, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Agente).where(Agente.id == id))
    agent = result.scalars().first()
    if not agent:
        raise HTTPException(status_code=404, detail="Agente não encontrado")
    
    agent.nome = data.nome
    agent.descricao = data.descricao
    agent.os = data.os
    
    await db.commit()
    await db.refresh(agent)
    return agent

@router.delete("/{id}")
async def delete_agent(id: UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Agente).where(Agente.id == id))
    agent = result.scalars().first()
    if not agent:
        raise HTTPException(status_code=404, detail="Agente não encontrado")
    
    await db.delete(agent)
    await db.commit()
    return {"message": "Agente removido com sucesso"}
