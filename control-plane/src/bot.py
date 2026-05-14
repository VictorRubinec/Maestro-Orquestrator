import os
import asyncio
from telegram import Update, BotCommand
from telegram.ext import Application, CommandHandler, ContextTypes
from sqlalchemy import select
from .ws_handler import manager
from .database import AsyncSessionLocal
from .models import Automacao
from dotenv import load_dotenv

load_dotenv()
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")

async def start_cmd(update: Update, context: ContextTypes.DEFAULT_TYPE):
    msg = (
        "Olá! Eu sou o Maestro Bot 🎼.\n\n"
        "Comandos disponíveis:\n"
        "/status - Ver agentes online\n"
        "/jobs - Listar automações cadastradas\n"
        "/start_job <nome_da_automacao> - Disparar automação\n"
        "/run <comando> - Executar comando cru no terminal\n"
        "/help - Ajuda"
    )
    await update.message.reply_text(msg)

async def help_cmd(update: Update, context: ContextTypes.DEFAULT_TYPE):
    msg = (
        "📖 *Ajuda do Maestro Bot*\n\n"
        "O Maestro permite que você envie comandos para Agentes (Workers) que estão instalados nos computadores.\n\n"
        "1. Para testar rapidamente um código, use:\n"
        "`/run python -c \"print('Olá')\"`\n\n"
        "2. Para rodar um Job já salvo no banco, primeiro liste-os com `/jobs` e depois dispare usando `/start_job`.\n\n"
        "Os agentes precisam estar rodando na máquina para receberem as tarefas!"
    )
    await update.message.reply_text(msg, parse_mode="Markdown")

async def status_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    count = len(manager.active_connections)
    if count == 0:
        await update.message.reply_text("🔴 Nenhum agente online no momento.")
        return
        
    response = f"🟢 Agentes Online: {count}\n\n"
    for token in manager.active_connections.keys():
        hw = manager.agent_telemetry.get(token, {})
        cpu = hw.get('cpu_percent', 'N/A')
        ram = hw.get('ram_percent', 'N/A')
        response += f"💻 *Agente:* `{token[:8]}...`\n"
        response += f"   ├ CPU: {cpu}%\n"
        response += f"   └ RAM: {ram}%\n\n"
        
    await update.message.reply_text(response, parse_mode="Markdown")

async def jobs_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(Automacao))
        automacoes = result.scalars().all()
        
    if not automacoes:
        await update.message.reply_text("Nenhuma automação encontrada no banco de dados.")
        return
        
    response = "📜 *Automações Cadastradas:*\n\n"
    for auto in automacoes:
        response += f"- *Nome:* `{auto.nome}`\n  *Comando:* `{auto.comando_execucao}`\n\n"
        
    await update.message.reply_text(response, parse_mode="Markdown")

async def start_job_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not context.args:
        await update.message.reply_text("Uso correto: /start_job <nome>\nExemplo: /start_job Contar ate 5")
        return
        
    nome_buscado = " ".join(context.args)
    
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(Automacao).where(Automacao.nome.ilike(f"%{nome_buscado}%")))
        auto = result.scalars().first()
        
    if not auto:
        await update.message.reply_text(f"Automação '{nome_buscado}' não encontrada.")
        return
        
    count = len(manager.active_connections)
    if count == 0:
        await update.message.reply_text("🔴 Nenhum agente online para executar a automação.")
        return
        
    agent_token = list(manager.active_connections.keys())[0]
    
    import uuid
    execution_id = str(uuid.uuid4())
    
    # Registra o chat para poder responder com o log depois
    manager.set_job_chat(execution_id, update.effective_chat.id)
    
    success = await manager.send_job(
        agent_token=agent_token,
        payload={
            "execution_id": execution_id,
            "command": auto.comando_execucao,
            "timeout_seconds": 60
        }
    )
    
    if success:
        await update.message.reply_text(f"🚀 Disparando automação *{auto.nome}* no agente...\n\nID: `{execution_id}`\nAguarde o relatório de execução...", parse_mode="Markdown")
    else:
        await update.message.reply_text("Falha ao comunicar com o agente.")

async def run_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not context.args:
        await update.message.reply_text("Uso correto: /run <comando_a_ser_executado>\nExemplo: /run python --version")
        return
        
    command = " ".join(context.args)
    count = len(manager.active_connections)
    if count == 0:
        await update.message.reply_text("🔴 Nenhum agente online para executar o comando.")
        return
        
    agent_token = list(manager.active_connections.keys())[0]
    
    import uuid
    execution_id = str(uuid.uuid4())
    
    # Registra o chat para poder responder com o log depois
    manager.set_job_chat(execution_id, update.effective_chat.id)
    
    success = await manager.send_job(
        agent_token=agent_token,
        payload={
            "execution_id": execution_id,
            "command": command,
            "timeout_seconds": 60
        }
    )
    
    if success:
        await update.message.reply_text(f"🚀 Comando enviado para o agente!\n\nAguardando finalização para exibir os logs...", parse_mode="Markdown")
    else:
        await update.message.reply_text("Falha ao enviar comando.")

bot_app = None

async def start_telegram_bot():
    global bot_app
    if not TELEGRAM_BOT_TOKEN or TELEGRAM_BOT_TOKEN == "YOUR_TELEGRAM_BOT_TOKEN":
        print("Telegram token não configurado corretamente. Bot não será iniciado.")
        return
        
    print("Iniciando Telegram Bot...")
    bot_app = Application.builder().token(TELEGRAM_BOT_TOKEN).build()
    bot_app.add_handler(CommandHandler("start", start_cmd))
    bot_app.add_handler(CommandHandler("help", help_cmd))
    bot_app.add_handler(CommandHandler("status", status_command))
    bot_app.add_handler(CommandHandler("run", run_command))
    bot_app.add_handler(CommandHandler("jobs", jobs_command))
    bot_app.add_handler(CommandHandler("start_job", start_job_command))
    
    await bot_app.initialize()
    await bot_app.start()
    
    # Configura o menu do Telegram
    commands = [
        BotCommand("start", "Iniciar o bot"),
        BotCommand("help", "Como usar"),
        BotCommand("status", "Ver agentes online e uso de hardware"),
        BotCommand("jobs", "Listar automações"),
        BotCommand("start_job", "Disparar automação salva (ex: /start_job nome)"),
        BotCommand("run", "Executar comando cru")
    ]
    await bot_app.bot.set_my_commands(commands)
    
    await bot_app.updater.start_polling()

async def stop_telegram_bot():
    if bot_app:
        print("Parando Telegram Bot...")
        await bot_app.updater.stop()
        await bot_app.stop()
        await bot_app.shutdown()
