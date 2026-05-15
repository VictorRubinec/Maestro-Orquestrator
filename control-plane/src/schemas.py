from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from uuid import UUID
from datetime import datetime

# --- Notificações ---
class NotificacaoRegras(BaseModel):
    on_failure: bool = True
    on_success: bool = False
    on_agent_offline: bool = True

class NotificacaoConfigBase(BaseModel):
    canal: str # slack, discord, teams, telegram, whatsapp, email
    webhook_url: Optional[str] = None
    token: Optional[str] = None
    destino: Optional[str] = None
    ativo: bool = True
    regras: NotificacaoRegras

# --- Agentes ---
class AgenteBase(BaseModel):
    nome: str
    descricao: Optional[str] = None
    os: Optional[str] = None

class AgenteRead(AgenteBase):
    id: UUID
    token_conexao: str
    status: str
    ultima_telemetria: Optional[Dict[str, Any]] = None
    criado_em: datetime
    atualizado_em: datetime

    class Config:
        from_attributes = True

# --- Automações ---
class ParametroConfig(BaseModel):
    name: str
    description: Optional[str] = None
    type: str # text, number, date, date_range, flag
    command_arg: str # ex: -di
    value_mask: Optional[str] = None

class ScheduleConfig(BaseModel):
    type: str # weekly, monthly, specific_dates, interval
    days: Optional[List[int]] = None
    times: Optional[List[str]] = None
    specific_dates: Optional[List[str]] = None
    month_days: Optional[List[int]] = None
    agents_ids: List[str]

class AgenteMapping(BaseModel):
    path: str

class AutomacaoBase(BaseModel):
    nome: str
    descricao: Optional[str] = None
    comando_base: str
    parametros_config: Optional[List[ParametroConfig]] = None
    schedules: Optional[List[ScheduleConfig]] = None
    agentes_mapping: Optional[Dict[str, AgenteMapping]] = None

class AutomacaoRead(AutomacaoBase):
    id: UUID
    criado_em: datetime

    class Config:
        from_attributes = True

# --- Execuções ---
class ExecucaoRead(BaseModel):
    id: UUID
    automacao_id: UUID
    agente_id: Optional[UUID] = None
    status: str
    comando_final: Optional[str] = None
    parametros_utilizados: Optional[Dict[str, Any]] = None
    logs: Optional[str] = None
    metricas_execucao: Optional[Dict[str, Any]] = None
    iniciado_em: Optional[datetime] = None
    finalizado_em: Optional[datetime] = None

    class Config:
        from_attributes = True
