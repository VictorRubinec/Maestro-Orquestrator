# Fase 2: Plataforma Web (MVP e Institucional)

Nesta fase vamos transformar o Maestro em um SaaS visualmente atrativo, pronto para o cliente final. O objetivo é desenvolver tanto o site de vendas (Institucional) quanto o painel de controle (Dashboard) onde o usuário gerencia os Agentes e Automações sem precisar do Telegram.

## Tecnologias e Design System

- **Framework**: Next.js (App Router)
- **Biblioteca de Componentes**: Material UI (MUI)
- **Arquitetura de Componentes**: Padrão de componentes altamente reutilizáveis e dinâmicos, baseados em parâmetros (props), evitando duplicação de código.
- **Paleta de Cores**: Tons de azul (`#598AEB`, `#4A72C2`, `#3A5A99`, `#2B4270`, `#192742`) para componentes de ação (botões, destaques).
- **Temas**: Suporte a **Light Mode** e **Dark Mode** (detectado automaticamente pelo sistema), com fundos estritamente brancos ou pretos/cinza-escuro.
- **Ícones**: Uso exclusivo de **MUI Icons** (proibido o uso de emojis no design).
- **Estilização**: Uso de **CSS Modular** (um arquivo `.css` por componente/página) aliado aos temas avançados do MUI para controle total do design e micro-animações premium.
- **Comunicação**: Fetch API para consumo dos endpoints do Control Plane (FastAPI).

> [!IMPORTANT]
> A estética visual será tratada como prioridade máxima. O site deverá ter um tema escuro (Dark Mode) sofisticado, paletas harmoniosas, uso sutil de glassmorphism e animações que deem vida à interface.

## Arquitetura das Páginas

A plataforma será dividida em duas grandes áreas:

### 1. Site Institucional (Pronto para Venda)
- `/` **(Landing Page)**: Hero section impactante com call-to-action (CTA), explicação visual de como a orquestração via agentes funciona, benefícios de ROI e prova social.
- `/features`: Explicação técnica e de negócio da plataforma.
- `/pricing`: Planos e custos da plataforma SaaS.

### 2. Dashboard (SaaS Core)
- `/login` e `/register`: Fluxos de autenticação.
- `/dashboard`:
  - **Overview**: Gráficos e cards exibindo Agentes Online, Automações executadas no mês e estimativa inicial de economia (ROI).
  - **Agentes**: Tabela com os Workers instalados nas máquinas dos clientes, informando status (Online/Offline), e uso de RAM/CPU em tempo real.
  - **Automações**: Tela de CRUD para gerenciar os scripts do banco de dados (que hoje inserimos via seed). Onde o usuário configura nome, comando de terminal e parâmetros.
  - **Execuções**: Disparo manual de automações diretamente do painel, com um visualizador de terminal recebendo os logs (stdout).

## Proposed Changes

### [Web App]

Criaremos o diretório `web-app` utilizando a CLI do Next.js e configuraremos o Material UI.

#### [NEW] `web-app/src/app/page.tsx`
Landing Page institucional focada na venda e atração de clientes.

#### [NEW] `web-app/src/app/dashboard/page.tsx`
A tela principal do painel SaaS do cliente.

#### [NEW] `web-app/src/theme.ts`
Arquivo de tokens e customização premium do Material UI (Dark Theme, fontes modernas como Inter/Outfit, cores primárias vibrantes).

### [Control Plane]

#### [MODIFY] `control-plane/src/main.py`
Habilitar o CORS no FastAPI para permitir requisições do frontend. Adição das rotas REST (`GET /api/agents`, `GET /api/automations`).

## User Review Required

> [!WARNING]
> **Autenticação**: Como nosso foco é o MVP e o apelo visual/vendas, você deseja que construamos um fluxo real de login agora (conectando no banco do FastAPI) ou podemos deixar uma tela de Login "Mockada" (que entra direto) para focarmos primariamente no visual da Landing Page e nas telas do Dashboard de Automação primeiro?

## Verification Plan

- **Automated Tests**: Utilizaremos a porta 3000 local (`npm run dev`) para validar a interface.
- **Manual Verification**: Navegaremos pelo site Institucional para verificar a qualidade do design e, no Dashboard, testaremos a exibição das máquinas online e o disparo dos robôs via clique em botão.
