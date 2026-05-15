from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from uuid import UUID

from ..database import get_db
from ..models import Automacao, Empresa
from ..schemas import AutomacaoBase, AutomacaoRead

router = APIRouter(prefix="/api/automations", tags=["automations"])

# Mock tenant_id para simplificação (em prod viria do Auth)
MOCK_TENANT_ID = None

async def get_mock_tenant(db: AsyncSession):
    result = await db.execute(select(Empresa).limit(1))
    empresa = result.scalars().first()
    if not empresa:
        # Cria uma empresa padrão se não existir
        empresa = Empresa(nome="Maestro Default")
        db.add(empresa)
        await db.commit()
        await db.refresh(empresa)
    return empresa.id

@router.get("/", response_model=List[AutomacaoRead])
async def list_automations(db: AsyncSession = Depends(get_db)):
    tenant_id = await get_mock_tenant(db)
    result = await db.execute(select(Automacao).where(Automacao.tenant_id == tenant_id))
    return result.scalars().all()

@router.post("/", response_model=AutomacaoRead)
async def create_automation(data: AutomacaoBase, db: AsyncSession = Depends(get_db)):
    tenant_id = await get_mock_tenant(db)
    
    # Converte Pydantic para Dict para salvar no JSON da SQLAlchemy
    automacao = Automacao(
        tenant_id=tenant_id,
        nome=data.nome,
        descricao=data.descricao,
        comando_base=data.comando_base,
        parametros_config=[p.dict() for p in data.parametros_config] if data.parametros_config else None,
        schedules=[s.dict() for s in data.schedules] if data.schedules else None,
        agentes_mapping={k: v.dict() for k, v in data.agentes_mapping.items()} if data.agentes_mapping else None
    )
    
    db.add(automacao)
    await db.commit()
    await db.refresh(automacao)
    return automacao

@router.get("/{id}", response_model=AutomacaoRead)
async def get_automation(id: UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Automacao).where(Automacao.id == id))
    automacao = result.scalars().first()
    if not automacao:
        raise HTTPException(status_code=404, detail="Automação não encontrada")
    return automacao

@router.put("/{id}", response_model=AutomacaoRead)
async def update_automation(id: UUID, data: AutomacaoBase, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Automacao).where(Automacao.id == id))
    automacao = result.scalars().first()
    if not automacao:
        raise HTTPException(status_code=404, detail="Automação não encontrada")
    
    automacao.nome = data.nome
    automacao.descricao = data.descricao
    automacao.comando_base = data.comando_base
    automacao.parametros_config = [p.dict() for p in data.parametros_config] if data.parametros_config else None
    automacao.schedules = [s.dict() for s in data.schedules] if data.schedules else None
    automacao.agentes_mapping = {k: v.dict() for k, v in data.agentes_mapping.items()} if data.agentes_mapping else None
    
    await db.commit()
    await db.refresh(automacao)
    return automacao

@router.delete("/{id}")
async def delete_automation(id: UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Automacao).where(Automacao.id == id))
    automacao = result.scalars().first()
    if not automacao:
        raise HTTPException(status_code=404, detail="Automação não encontrada")
    
    await db.delete(automacao)
    await db.commit()
    return {"message": "Automação deletada com sucesso"}
