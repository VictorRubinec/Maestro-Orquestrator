from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from uuid import UUID

from ..database import get_db
from ..models import Execucao, Empresa
from ..schemas import ExecucaoRead

router = APIRouter(prefix="/api/jobs", tags=["jobs"])

async def get_mock_tenant(db: AsyncSession):
    result = await db.execute(select(Empresa).limit(1))
    empresa = result.scalars().first()
    return empresa.id

@router.get("/", response_model=List[ExecucaoRead])
async def list_jobs(db: AsyncSession = Depends(get_db)):
    tenant_id = await get_mock_tenant(db)
    result = await db.execute(
        select(Execucao)
        .where(Execucao.tenant_id == tenant_id)
        .order_by(Execucao.iniciado_em.desc())
    )
    return result.scalars().all()

@router.get("/{id}", response_model=ExecucaoRead)
async def get_job(id: UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Execucao).where(Execucao.id == id))
    job = result.scalars().first()
    if not job:
        raise HTTPException(status_code=404, detail="Job não encontrado")
    return job

@router.get("/automation/{automation_id}", response_model=List[ExecucaoRead])
async def list_jobs_by_automation(automation_id: UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Execucao)
        .where(Execucao.automacao_id == automation_id)
        .order_by(Execucao.iniciado_em.desc())
    )
    return result.scalars().all()
