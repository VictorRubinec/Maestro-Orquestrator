import uuid
from datetime import datetime
from sqlalchemy import Column, String, Float, ForeignKey, DateTime, JSON, Uuid
from sqlalchemy.orm import relationship
from .database import Base

def generate_uuid():
    return str(uuid.uuid4())

class Empresa(Base):
    __tablename__ = "empresas"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    nome = Column(String(255), nullable=False)
    criado_em = Column(DateTime(timezone=True), default=datetime.utcnow)

    agentes = relationship("Agente", back_populates="empresa", cascade="all, delete")
    automacoes = relationship("Automacao", back_populates="empresa", cascade="all, delete")
    configuracoes = relationship("ConfiguracaoVariavel", back_populates="empresa", cascade="all, delete")

class ConfiguracaoVariavel(Base):
    __tablename__ = "configuracoes_variaveis"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    tenant_id = Column(Uuid(as_uuid=True), ForeignKey("empresas.id", ondelete="CASCADE"), nullable=False)
    chave = Column(String(100), nullable=False)
    valor = Column(JSON, nullable=False)
    criado_em = Column(DateTime(timezone=True), default=datetime.utcnow)

    empresa = relationship("Empresa", back_populates="configuracoes")

class Agente(Base):
    __tablename__ = "agentes"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    tenant_id = Column(Uuid(as_uuid=True), ForeignKey("empresas.id", ondelete="CASCADE"), nullable=False)
    nome = Column(String(255), nullable=False)
    status = Column(String(50), default="OFFLINE")
    ultima_telemetria = Column(JSON, nullable=True)
    criado_em = Column(DateTime(timezone=True), default=datetime.utcnow)
    atualizado_em = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

    empresa = relationship("Empresa", back_populates="agentes")
    execucoes = relationship("Execucao", back_populates="agente")

class Automacao(Base):
    __tablename__ = "automacoes"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    tenant_id = Column(Uuid(as_uuid=True), ForeignKey("empresas.id", ondelete="CASCADE"), nullable=False)
    nome = Column(String(255), nullable=False)
    comando_execucao = Column(String(500), nullable=False)
    formula_avaliacao = Column(String(500), nullable=True)
    parametros_dinamicos = Column(JSON, nullable=True)
    restricoes_agendamento = Column(JSON, nullable=True)
    criado_em = Column(DateTime(timezone=True), default=datetime.utcnow)

    empresa = relationship("Empresa", back_populates="automacoes")
    execucoes = relationship("Execucao", back_populates="automacao")

class Execucao(Base):
    __tablename__ = "execucoes"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    tenant_id = Column(Uuid(as_uuid=True), ForeignKey("empresas.id", ondelete="CASCADE"), nullable=False)
    automacao_id = Column(Uuid(as_uuid=True), ForeignKey("automacoes.id", ondelete="CASCADE"), nullable=False)
    agente_id = Column(Uuid(as_uuid=True), ForeignKey("agentes.id", ondelete="SET NULL"), nullable=True)
    
    status = Column(String(50), default="PENDING")
    resultado_avaliacao = Column(Float, nullable=True)
    metricas_execucao = Column(JSON, nullable=True)
    
    iniciado_em = Column(DateTime(timezone=True), nullable=True)
    finalizado_em = Column(DateTime(timezone=True), nullable=True)

    empresa = relationship("Empresa")
    automacao = relationship("Automacao", back_populates="execucoes")
    agente = relationship("Agente", back_populates="execucoes")
