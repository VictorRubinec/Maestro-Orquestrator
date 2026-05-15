import uuid
from datetime import datetime
from sqlalchemy import Column, String, Float, ForeignKey, DateTime, JSON, Uuid, Boolean, Text
from sqlalchemy.orm import relationship
from .database import Base

class Empresa(Base):
    __tablename__ = "empresas"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    nome = Column(String(255), nullable=False)
    criado_em = Column(DateTime(timezone=True), default=datetime.utcnow)

    agentes = relationship("Agente", back_populates="empresa", cascade="all, delete")
    automacoes = relationship("Automacao", back_populates="empresa", cascade="all, delete")
    notificacoes_config = relationship("NotificacaoConfig", back_populates="empresa", cascade="all, delete")

class NotificacaoConfig(Base):
    __tablename__ = "notificacoes_configs"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    tenant_id = Column(Uuid(as_uuid=True), ForeignKey("empresas.id", ondelete="CASCADE"), nullable=False)
    
    canal = Column(String(50), nullable=False) # slack, discord, teams, telegram, whatsapp, email
    webhook_url = Column(String(500), nullable=True)
    token = Column(String(500), nullable=True)
    destino = Column(String(255), nullable=True) # e-mail ou número de telefone
    ativo = Column(Boolean, default=True)
    
    regras = Column(JSON, nullable=True) # { "on_failure": true, "on_success": false, "on_agent_offline": true }
    
    criado_em = Column(DateTime(timezone=True), default=datetime.utcnow)
    empresa = relationship("Empresa", back_populates="notificacoes_config")

class Agente(Base):
    __tablename__ = "agentes"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    tenant_id = Column(Uuid(as_uuid=True), ForeignKey("empresas.id", ondelete="CASCADE"), nullable=False)
    nome = Column(String(255), nullable=False)
    descricao = Column(Text, nullable=True)
    os = Column(String(100), nullable=True)
    
    token_conexao = Column(String(255), unique=True, nullable=False)
    status = Column(String(50), default="OFFLINE")
    
    ultima_telemetria = Column(JSON, nullable=True) # { cpu: 10, ram: 20, last_seen: ... }
    
    criado_em = Column(DateTime(timezone=True), default=datetime.utcnow)
    atualizado_em = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

    empresa = relationship("Empresa", back_populates="agentes")
    execucoes = relationship("Execucao", back_populates="agente")

class Automacao(Base):
    __tablename__ = "automacoes"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    tenant_id = Column(Uuid(as_uuid=True), ForeignKey("empresas.id", ondelete="CASCADE"), nullable=False)
    nome = Column(String(255), nullable=False)
    descricao = Column(Text, nullable=True)
    
    comando_base = Column(String(500), nullable=False) # Ex: python main.py
    
    # Schema dos parâmetros: [{ name, description, type, command_arg, value_mask }]
    parametros_config = Column(JSON, nullable=True)
    
    # Agendamentos: [{ type, days, times, specific_dates, month_days, agents_ids }]
    schedules = Column(JSON, nullable=True)
    
    # Mapeamento de agentes: { agent_id: { path: "C:/..." } }
    agentes_mapping = Column(JSON, nullable=True)
    
    criado_em = Column(DateTime(timezone=True), default=datetime.utcnow)

    empresa = relationship("Empresa", back_populates="automacoes")
    execucoes = relationship("Execucao", back_populates="automacao")

class Execucao(Base):
    __tablename__ = "execucoes"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    tenant_id = Column(Uuid(as_uuid=True), ForeignKey("empresas.id", ondelete="CASCADE"), nullable=False)
    automacao_id = Column(Uuid(as_uuid=True), ForeignKey("automacoes.id", ondelete="CASCADE"), nullable=False)
    agente_id = Column(Uuid(as_uuid=True), ForeignKey("agentes.id", ondelete="SET NULL"), nullable=True)
    
    status = Column(String(50), default="PENDING") # PENDING, RUNNING, SUCCESS, ERROR
    comando_final = Column(Text, nullable=True)
    parametros_utilizados = Column(JSON, nullable=True)
    
    logs = Column(Text, nullable=True)
    metricas_execucao = Column(JSON, nullable=True) # { duration: 120, exit_code: 0 }
    
    iniciado_em = Column(DateTime(timezone=True), nullable=True)
    finalizado_em = Column(DateTime(timezone=True), nullable=True)

    empresa = relationship("Empresa")
    automacao = relationship("Automacao", back_populates="execucoes")
    agente = relationship("Agente", back_populates="execucoes")
