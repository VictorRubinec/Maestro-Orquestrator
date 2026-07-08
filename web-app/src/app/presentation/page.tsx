'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Stack, 
  Button, 
  Paper, 
  IconButton, 
  Grid,
  LinearProgress,
  Chip,
  Tabs,
  Tab,
  Card,
  CardContent,
  Avatar,
  Fade,
  Grow
} from '@mui/material';
import { useRouter } from 'next/navigation';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SensorsIcon from '@mui/icons-material/Sensors';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TerminalIcon from '@mui/icons-material/Terminal';
import ErrorIcon from '@mui/icons-material/Error';
import StorageIcon from '@mui/icons-material/Storage';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InfoIcon from '@mui/icons-material/Info';

export default function PresentationPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const totalSlides = 8;

  // Navegação via teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Mocks do tour do protótipo
  const prototypeTabs = [
    {
      title: 'Overview',
      desc: 'Painel geral do cliente. Mostra o ROI acumulado, agentes ativos e o status das execuções.',
      notes: [
        'Indicadores de Horas Poupadas e ROI Estimado atualizados dinamicamente.',
        'Estado consolidado de carga dos servidores.',
        'Fluxo de atividades recentes com alertas de sucesso ou falha.'
      ],
      component: (
        <Box sx={{ p: 2, bgcolor: '#070708', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
          {/* Header Mock */}
          <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ width: 120, height: 16, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: '4px' }} />
            <Box sx={{ width: 60, height: 16, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: '4px' }} />
          </Stack>
          {/* Stats Cards */}
          <Grid container spacing={1.5} sx={{ mb: 2 }}>
            {[
              { label: 'AGENTES ONLINE', val: '3', color: '#598AEB' },
              { label: 'HORAS POUPADAS', val: '45.2h', color: '#ff9800' },
              { label: 'CUSTO EVITADO', val: 'R$ 3.840', color: '#4caf50' }
            ].map((stat, i) => (
              <Grid size={4} key={i}>
                <Paper sx={{ p: 1.5, bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '12px' }}>
                  <Typography sx={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', fontWeight: '700' }}>{stat.label}</Typography>
                  <Typography sx={{ fontSize: '1.1rem', fontWeight: '800', color: stat.color }}>{stat.val}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
          {/* Content Mock */}
          <Paper sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '12px' }}>
            <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 1 }}>
              <Box sx={{ width: 100, height: 12, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: '3px' }} />
              <Box sx={{ width: 40, height: 12, bgcolor: 'rgba(76, 175, 80, 0.1)', borderRadius: '6px' }} />
            </Stack>
            <Box sx={{ width: '100%', height: 4, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: '2px', mb: 1 }}>
              <Box sx={{ width: '68%', height: '100%', bgcolor: '#598AEB', borderRadius: '2px' }} />
            </Box>
            <Box sx={{ width: '100%', height: 4, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
              <Box sx={{ width: '42%', height: '100%', bgcolor: '#4caf50', borderRadius: '2px' }} />
            </Box>
          </Paper>
        </Box>
      )
    },
    {
      title: 'Agentes',
      desc: 'Tabela de monitoramento de saúde física dos computadores cliente instalados.',
      notes: [
        'Comunicação bidirecional via WebSocket em tempo real.',
        'Métricas de hardware capturadas via biblioteca psutil.',
        'Informações de Sistema Operacional detectados automaticamente.'
      ],
      component: (
        <Box sx={{ p: 2, bgcolor: '#070708', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ width: 100, height: 14, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: '4px', mb: 0.5 }} />
            <Box sx={{ width: 180, height: 8, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: '2px' }} />
          </Box>
          <Stack spacing={1.5}>
            {[
              { name: 'Victor-Workstation', os: 'Windows 11', cpu: 65, ram: 42, status: 'Online' },
              { name: 'Server-Production-01', os: 'Ubuntu 22.04', cpu: 12, ram: 25, status: 'Online' }
            ].map((a, i) => (
              <Paper key={i} sx={{ p: 1.2, bgcolor: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Avatar sx={{ width: 22, height: 22, bgcolor: 'rgba(89, 138, 235, 0.1)', color: '#598AEB', fontSize: '0.65rem' }}>{a.name[0]}</Avatar>
                    <Box>
                      <Typography sx={{ fontSize: '0.7rem', fontWeight: '800', color: 'white' }}>{a.name}</Typography>
                      <Typography sx={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)' }}>{a.os}</Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography sx={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.3)' }}>CPU</Typography>
                      <Typography sx={{ fontSize: '0.65rem', fontWeight: '800', color: 'white' }}>{a.cpu}%</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography sx={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.3)' }}>RAM</Typography>
                      <Typography sx={{ fontSize: '0.65rem', fontWeight: '800', color: '#598AEB' }}>{a.ram}%</Typography>
                    </Box>
                    <Chip label={a.status} size="small" sx={{ height: 18, fontSize: '0.55rem', bgcolor: 'rgba(76,175,80,0.1)', color: '#4caf50', fontWeight: '800' }} />
                  </Stack>
                </Stack>
              </Paper>
            ))}
          </Stack>
        </Box>
      )
    },
    {
      title: 'Automações',
      desc: 'Tela de cadastro e gerenciamento das instruções que os robôs executarão.',
      notes: [
        'Modelagem de argumentos tipados (text, flag, number, data).',
        'Mapeamento de arquivos específicos por agente (/opt/... vs C:/...).',
        'Configurações de agendamento flexíveis e centralizadas.'
      ],
      component: (
        <Box sx={{ p: 2, bgcolor: '#070708', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
            <Box sx={{ width: 90, height: 14, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: '4px' }} />
            <Box sx={{ width: 80, height: 20, bgcolor: '#598AEB', borderRadius: '6px' }} />
          </Stack>
          <TableMockUp />
        </Box>
      )
    },
    {
      title: 'Console/Logs',
      desc: 'Terminal ao vivo para acompanhar as execuções dos agentes instantaneamente.',
      notes: [
        'Streaming de stdout/stderr via WebSockets.',
        'Histórico detalhado de tempo de execução e código de saída.',
        'Disparo de comandos manuais e debug rápido.'
      ],
      component: (
        <Box sx={{ p: 2, bgcolor: '#070708', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <Box sx={{ mb: 1.5, display: 'flex', gap: 1 }}>
            <Box sx={{ width: 60, height: 16, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: '4px' }} />
            <Box sx={{ width: 60, height: 16, bgcolor: 'rgba(89, 138, 235, 0.15)', borderRadius: '4px' }} />
          </Box>
          <Box sx={{ 
            p: 1.5, 
            fontFamily: 'monospace', 
            fontSize: '0.6rem', 
            bgcolor: '#000000', 
            borderRadius: '8px', 
            border: '1px solid rgba(255,255,255,0.06)',
            color: '#4caf50',
            height: 110,
            overflowY: 'hidden'
          }}>
            <div>[INFO] Iniciando execução do Job 12...</div>
            <div>[DEBUG] Conectado ao agente: Victor-Workstation</div>
            <div>[OK] Comando recebido: python main.py -re</div>
            <div>[INFO] Processando lote de faturamento: 100%</div>
            <div style={{ color: 'white' }}>[STDOUT] Execução finalizada em 12.5s com exit_code 0</div>
          </Box>
        </Box>
      )
    }
  ];

  return (
    <Box sx={{ 
      bgcolor: '#000000', 
      minHeight: '100vh', 
      color: 'white', 
      position: 'relative', 
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Background Glows */}
      <Box sx={{ position: 'absolute', top: -300, right: -300, width: 800, height: 800, borderRadius: '50%', bgcolor: 'rgba(89, 138, 235, 0.04)', filter: 'blur(150px)', pointerEvents: 'none', zIndex: 1 }} />
      <Box sx={{ position: 'absolute', bottom: -300, left: -300, width: 800, height: 800, borderRadius: '50%', bgcolor: 'rgba(76, 175, 80, 0.03)', filter: 'blur(150px)', pointerEvents: 'none', zIndex: 1 }} />

      {/* Header Fixo */}
      <Box sx={{ py: 3, borderBottom: '1px solid rgba(255,255,255,0.04)', zIndex: 10, bgcolor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)' }}>
        <Container maxWidth="lg">
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: '900', letterSpacing: -1, color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 10, height: 10, borderRadius: '2px', bgcolor: '#598AEB' }} />
              MAESTRO <span style={{ opacity: 0.4, fontSize: '0.8rem', fontWeight: '500' }}>PITCH DECK</span>
            </Typography>
            <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: '700' }}>
                Slide {currentSlide + 1} de {totalSlides}
              </Typography>
              <Button 
                variant="text" 
                size="small" 
                onClick={() => router.push('/dashboard')}
                sx={{ color: '#598AEB', fontWeight: '700', fontSize: '0.75rem' }}
              >
                Voltar ao Dashboard
              </Button>
            </Stack>
          </Stack>
        </Container>
        <LinearProgress 
          variant="determinate" 
          value={((currentSlide + 1) / totalSlides) * 100} 
          sx={{ 
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            right: 0, 
            height: 2, 
            bgcolor: 'rgba(255,255,255,0.03)', 
            '& .MuiLinearProgress-bar': { bgcolor: '#598AEB' } 
          }} 
        />
      </Box>

      {/* Container de Conteúdo dos Slides */}
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', zIndex: 5, py: 6 }}>
        <Container maxWidth="lg">
          {/* SLIDE 1: CAPA */}
          {currentSlide === 0 && (
            <Fade in={true} timeout={600}>
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Chip label="PROPOSTA DE VALOR & TECH PITCH" size="small" sx={{ bgcolor: 'rgba(89, 138, 235, 0.1)', color: '#598AEB', fontWeight: '800', mb: 3 }} />
                <Typography variant="h1" sx={{ fontWeight: '900', fontSize: { xs: '3rem', md: '5rem' }, letterSpacing: -2, lineHeight: 1.1, mb: 3 }}>
                  Orquestração sem Caos.<br />
                  <Box component="span" sx={{ color: '#598AEB' }}>ROI sem Dúvidas.</Box>
                </Typography>
                <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.5)', maxW: 600, mx: 'auto', mb: 6, fontWeight: '400', lineHeight: 1.6 }}>
                  Apresentação estratégica da plataforma Maestro: gerenciamento distribuído e centralizado de automações com análise dinâmica de retorno financeiro.
                </Typography>
                <Button 
                  variant="contained" 
                  size="large" 
                  onClick={nextSlide}
                  endIcon={<ArrowForwardIcon />}
                  sx={{ 
                    bgcolor: '#598AEB', 
                    color: 'white', 
                    fontWeight: '800', 
                    px: 4, 
                    py: 1.8, 
                    borderRadius: '12px',
                    boxShadow: '0 10px 30px rgba(89, 138, 235, 0.25)' 
                  }}
                >
                  Começar Apresentação
                </Button>
              </Box>
            </Fade>
          )}

          {/* SLIDE 2: O PROBLEMA */}
          {currentSlide === 1 && (
            <Fade in={true} timeout={500}>
              <Box>
                <Typography variant="overline" sx={{ color: '#f44336', fontWeight: '800', letterSpacing: 2 }}>O CENÁRIO ATUAL</Typography>
                <Typography variant="h3" sx={{ fontWeight: '900', letterSpacing: -1, mb: 4, mt: 1 }}>O Caos das Automações não Gerenciadas</Typography>
                
                <Grid container spacing={4}>
                  {[
                    {
                      title: 'Falhas Silenciosas',
                      desc: 'Scripts e robôs param de rodar em alguma estação devido a atualizações locais, erros de variáveis ou token expirado. Sem alertas imediatos, a falha só é descoberta semanas depois, gerando prejuízos.',
                      icon: <ErrorIcon sx={{ fontSize: 32 }} />,
                      color: '#f44336'
                    },
                    {
                      title: 'Descentralização e Shadow IT',
                      desc: 'Vários scripts Python de faturamento e planilhas automatizadas rodam escondidos em máquinas locais de funcionários. Se o computador quebrar ou o funcionário sair da empresa, a automação morre.',
                      icon: <StorageIcon sx={{ fontSize: 32 }} />,
                      color: '#ff9800'
                    },
                    {
                      title: 'Falta de Visibilidade de ROI',
                      desc: 'A diretoria investe em desenvolvimento de robôs e infraestrutura, mas não faz ideia do retorno sobre o investimento em termos financeiros claros. "Quanto tempo e dinheiro realmente poupamos?" fica sem resposta.',
                      icon: <TrendingUpIcon sx={{ fontSize: 32 }} />,
                      color: '#2196f3'
                    }
                  ].map((p, i) => (
                    <Grid size={{ xs: 12, md: 4 }} key={i}>
                      <Paper sx={{ 
                        p: 4, 
                        bgcolor: 'rgba(255,255,255,0.02)', 
                        border: '1px solid rgba(255,255,255,0.05)', 
                        borderRadius: '24px',
                        height: '100%'
                      }}>
                        <Box sx={{ color: p.color, mb: 2, display: 'flex' }}>{p.icon}</Box>
                        <Typography variant="h6" sx={{ fontWeight: '800', mb: 2 }}>{p.title}</Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{p.desc}</Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Fade>
          )}

          {/* SLIDE 3: O QUE É ROI */}
          {currentSlide === 2 && (
            <Fade in={true} timeout={500}>
              <Box>
                <Typography variant="overline" sx={{ color: '#4caf50', fontWeight: '800', letterSpacing: 2 }}>CONCEITO FINANCEIRO</Typography>
                <Typography variant="h3" sx={{ fontWeight: '900', letterSpacing: -1, mb: 4, mt: 1 }}>O que é o ROI em Automação?</Typography>
                
                <Grid container spacing={5} sx={{ alignItems: 'center' }}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', mb: 3, lineHeight: 1.7 }}>
                      ROI (Retorno sobre o Investimento) é a métrica definitiva de eficiência operacional. No ecossistema de robôs/automação (RPA), calcular o ROI é a única forma de comprovar se a iniciativa vale a pena.
                    </Typography>
                    
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', mb: 3, pl: 2, borderLeft: '3px solid #4caf50', fontStyle: 'italic' }}>
                      "Muitas empresas falham em iniciativas de automação porque medem apenas se o código funciona, e não se o processo gera valor econômico real para o negócio."
                    </Typography>

                    <Stack spacing={2} sx={{ mt: 4 }}>
                      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                        <Box sx={{ p: 0.5, bgcolor: 'rgba(76,175,80,0.15)', color: '#4caf50', borderRadius: '6px', mt: 0.5 }}><InfoIcon fontSize="small" /></Box>
                        <Typography variant="body2" sx={{ color: 'white', fontWeight: '600' }}>Cálculo Base: Tempo manual gasto multiplicador do custo médio por hora vs o custo de manutenção da automação.</Typography>
                      </Box>
                    </Stack>
                  </Grid>
                  
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ 
                      p: 4, 
                      bgcolor: 'rgba(76, 175, 80, 0.02)', 
                      border: '1px solid rgba(76, 175, 80, 0.2)', 
                      borderRadius: '24px',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <Box sx={{ position: 'absolute', top: -30, right: -30, width: 90, height: 90, borderRadius: '50%', bgcolor: 'rgba(76,175,80,0.1)' }} />
                      <Typography variant="subtitle2" sx={{ color: '#4caf50', fontWeight: '800', mb: 2 }}>FÓRMULA MATEMÁTICA DO ROI</Typography>
                      
                      <Box sx={{ 
                        p: 3, 
                        bgcolor: '#000000', 
                        borderRadius: '16px', 
                        border: '1px solid rgba(255,255,255,0.06)',
                        fontFamily: 'monospace',
                        fontSize: { xs: '0.85rem', md: '1.05rem' },
                        textAlign: 'center',
                        color: 'white',
                        mb: 3
                      }}>
                        <div style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '8px' }}>ROI =</div>
                        <div style={{ borderBottom: '1.5px solid rgba(255,255,255,0.3)', paddingBottom: '8px', marginBottom: '8px' }}>
                          (Horas Salvas * Custo/Hora) - Custo Auto
                        </div>
                        <div style={{ color: '#4caf50', fontWeight: '800' }}>
                          Custo Automação
                        </div>
                      </Box>

                      <Stack spacing={1} sx={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                        <div>• <strong>Horas Salvas</strong>: Tempo manual anterior menos tempo de execução do robô.</div>
                        <div>• <strong>Custo/Hora</strong>: Custo médio da equipe responsável pelo processo.</div>
                        <div>• <strong>Custo Automação</strong>: Infraestrutura, licença e custo de desenvolvimento do robô.</div>
                      </Stack>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </Fade>
          )}

          {/* SLIDE 4: BENEFICIOS DO ROI E PESQUISAS */}
          {currentSlide === 3 && (
            <Fade in={true} timeout={500}>
              <Box>
                <Typography variant="overline" sx={{ color: '#598AEB', fontWeight: '800', letterSpacing: 2 }}>VALOR DE MERCADO</Typography>
                <Typography variant="h3" sx={{ fontWeight: '900', letterSpacing: -1, mb: 4, mt: 1 }}>Pesquisas e Resultados do ROI em Automação</Typography>
                
                <Grid container spacing={4}>
                  <Grid size={{ xs: 12, lg: 4 }}>
                    <Paper sx={{ p: 4, bgcolor: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '24px', textAlign: 'center', height: '100%' }}>
                      <Typography variant="h2" sx={{ fontWeight: '900', color: '#598AEB', mb: 1 }}>+40%</Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: '800', mb: 2 }}>Eficiência Operacional</Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
                        De acordo com o <strong>Gartner</strong>, a orquestração bem estruturada de rotinas robotizadas de TI e negócios reduz tempos de entrega operacionais em mais de 40%.
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid size={{ xs: 12, lg: 4 }}>
                    <Paper sx={{ p: 4, bgcolor: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '24px', textAlign: 'center', height: '100%' }}>
                      <Typography variant="h2" sx={{ fontWeight: '900', color: '#4caf50', mb: 1 }}>&lt; 6m</Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: '800', mb: 2 }}>Período de Payback</Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
                        Pesquisas de mercado da <strong>McKinsey</strong> revelam que a centralização transparente do valor de tempo economizado traz payback total do projeto em menos de 6 meses.
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid size={{ xs: 12, lg: 4 }}>
                    <Paper sx={{ p: 4, bgcolor: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '24px', textAlign: 'center', height: '100%' }}>
                      <Typography variant="h2" sx={{ fontWeight: '900', color: '#ff9800', mb: 1 }}>-95%</Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: '800', mb: 2 }}>Erros e Retrabalho</Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
                        A governança digital elimina execuções manuais duplicadas ou errôneas, reduzindo o tempo de retrabalho corporativo em faturamento e cargas de TI.
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </Fade>
          )}

          {/* SLIDE 5: APRESENTAÇÃO DO MAESTRO */}
          {currentSlide === 4 && (
            <Fade in={true} timeout={500}>
              <Box>
                <Typography variant="overline" sx={{ color: '#598AEB', fontWeight: '800', letterSpacing: 2 }}>A SOLUÇÃO</Typography>
                <Typography variant="h3" sx={{ fontWeight: '900', letterSpacing: -1, mb: 4, mt: 1 }}>Conheça o Maestro Orchestrator</Typography>
                
                <Grid container spacing={6} sx={{ alignItems: 'center' }}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h6" sx={{ fontWeight: '800', color: '#598AEB', mb: 2 }}>
                      A regência perfeita de sua infraestrutura.
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, mb: 4 }}>
                      O Maestro é uma plataforma SaaS multi-tenant que unifica agentes de execução remotos e fornece à sua empresa governança total, auditoria ao vivo e relatórios claros de retorno de investimento.
                    </Typography>

                    <Stack spacing={3}>
                      {[
                        { title: 'Conexão Instantânea', desc: 'Workers se conectam ao servidor via websockets de baixa latência em segundos.' },
                        { title: 'Cálculo de ROI Nativo', desc: 'Variáveis financeiras de custo integradas direto nas configurações do robô.' },
                        { title: 'Gestão Inteligente', desc: 'Agendamentos otimizados baseados em limites de hardware.' }
                      ].map((item, i) => (
                        <Box key={i} sx={{ display: 'flex', gap: 2 }}>
                          <Avatar sx={{ bgcolor: 'rgba(89, 138, 235, 0.1)', color: '#598AEB', width: 32, height: 32, fontSize: '0.85rem' }}>{i + 1}</Avatar>
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: '800' }}>{item.title}</Typography>
                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>{item.desc}</Typography>
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ 
                      p: 4, 
                      bgcolor: 'rgba(255,255,255,0.02)', 
                      border: '1px solid rgba(255,255,255,0.05)', 
                      borderRadius: '28px',
                      position: 'relative'
                    }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: '800', color: 'rgba(255,255,255,0.4)', mb: 3 }}>PROBLEMAS QUE O MAESTRO CRASH-TESTED E RESOLVEU</Typography>
                      <Stack spacing={2.5}>
                        {[
                          { bad: 'Instalação manual de cron em dezenas de servidores locais', good: 'Cadastro visual centralizado das automações e controle remoto' },
                          { bad: 'Incerteza se o script rodou ou quebrou nas máquinas', good: 'Log ao vivo no navegador e notificações diretas no Telegram' },
                          { bad: 'Métricas de economia do robô não mensuradas', good: 'Gráficos agregados de ROI calculados automaticamente por job executado' }
                        ].map((x, idx) => (
                          <Box key={idx} sx={{ pb: 2, borderBottom: idx < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                            <Typography sx={{ color: '#f44336', fontSize: '0.75rem', textDecoration: 'line-through', mb: 0.5 }}>❌ {x.bad}</Typography>
                            <Typography sx={{ color: '#4caf50', fontSize: '0.8rem', fontWeight: '800' }}>🟢 {x.good}</Typography>
                          </Box>
                        ))}
                      </Stack>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </Fade>
          )}

          {/* SLIDE 6: O PROTOTIPO - TOUR VISUAL */}
          {currentSlide === 5 && (
            <Fade in={true} timeout={500}>
              <Box>
                <Typography variant="overline" sx={{ color: '#ff9800', fontWeight: '800', letterSpacing: 2 }}>PÁGINAS DO PRODUTO</Typography>
                <Typography variant="h3" sx={{ fontWeight: '900', letterSpacing: -1, mb: 4, mt: 1 }}>Tour Interativo do Protótipo</Typography>
                
                <Grid container spacing={4}>
                  <Grid size={{ xs: 12, md: 5 }}>
                    <Paper sx={{ p: 1, bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', mb: 3 }}>
                      <Tabs 
                        value={activeTab} 
                        onChange={(e, val) => setActiveTab(val)}
                        variant="fullWidth"
                        sx={{ 
                          minHeight: 40,
                          '& .MuiTabs-indicator': { bgcolor: '#598AEB' },
                          '& .MuiTab-root': { color: 'rgba(255,255,255,0.4)', textTransform: 'none', fontWeight: '800', fontSize: '0.75rem', minHeight: 40 }
                        }}
                      >
                        {prototypeTabs.map((tab, idx) => (
                          <Tab label={tab.title} key={idx} />
                        ))}
                      </Tabs>
                    </Paper>

                    <Typography variant="h6" sx={{ fontWeight: '800', mb: 1 }}>
                      {prototypeTabs[activeTab].title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mb: 3, lineHeight: 1.6 }}>
                      {prototypeTabs[activeTab].desc}
                    </Typography>

                    <Typography variant="caption" sx={{ color: '#598AEB', fontWeight: '800', display: 'block', mb: 1.5 }}>DESTAQUES DA TELA:</Typography>
                    <Stack spacing={1}>
                      {prototypeTabs[activeTab].notes.map((note, idx) => (
                        <Box key={idx} sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                          <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#598AEB', mt: 0.8 }} />
                          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>{note}</Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Grid>

                  <Grid size={{ xs: 12, md: 7 }}>
                    {prototypeTabs[activeTab].component}
                  </Grid>
                </Grid>
              </Box>
            </Fade>
          )}

          {/* SLIDE 7: PARTE TECNICA E ARQUITETURA */}
          {currentSlide === 6 && (
            <Fade in={true} timeout={500}>
              <Box>
                <Typography variant="overline" sx={{ color: '#598AEB', fontWeight: '800', letterSpacing: 2 }}>ESTRUTURA DE DADOS E TECNOLOGIAS</Typography>
                <Typography variant="h3" sx={{ fontWeight: '900', letterSpacing: -1, mb: 4, mt: 1 }}>Como o Maestro Funciona por Baixo dos Panos?</Typography>
                
                <Grid container spacing={4} sx={{ mb: 4 }}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '20px', height: '100%' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: '800', color: '#598AEB', mb: 1 }}>1. Front-end (Next.js & MUI)</Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, display: 'block' }}>
                        Construído no padrão SPA utilizando Next.js App Router para roteamento ágil e Material UI para componentes com Design System centralizado. Consome a API REST assíncrona do Control Plane.
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '20px', height: '100%' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: '800', color: '#4caf50', mb: 1 }}>2. Control Plane (FastAPI)</Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, display: 'block' }}>
                        Orquestrador central construído em Python FastAPI. Ele mantém conexões WebSocket ativas, gerencia filas de tarefas, armazena variáveis no PostgreSQL e dispara notificações via bot do Telegram.
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '20px', height: '100%' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: '800', color: '#ff9800', mb: 1 }}>3. Worker Agent (Python Headless)</Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, display: 'block' }}>
                        Script leve executando localmente nas máquinas de destino. Ele consome as instruções via sockets e executa subprocessos locais para scripts, devolvendo logs em tempo real sem travar a thread de telemetria.
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>

                <Paper sx={{ p: 3, bgcolor: '#000000', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: '800', mb: 2, fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>FLUXO DE COMUNICAÇÃO DE EXECUÇÃO</Typography>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ p: 1.5, bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', flexGrow: 1, textAlign: 'center', width: '100%' }}>
                      <Typography variant="caption" sx={{ fontWeight: '800', display: 'block' }}>Dashboard Web</Typography>
                      <Typography variant="caption" sx={{ color: '#598AEB', fontSize: '0.65rem' }}>Disparo: POST /api/jobs/trigger</Typography>
                    </Box>
                    <ArrowForwardIcon sx={{ color: 'rgba(255,255,255,0.2)', display: { xs: 'none', md: 'block' } }} />
                    <Box sx={{ p: 1.5, bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', flexGrow: 1, textAlign: 'center', width: '100%' }}>
                      <Typography variant="caption" sx={{ fontWeight: '800', display: 'block' }}>Control Plane (FastAPI)</Typography>
                      <Typography variant="caption" sx={{ color: '#4caf50', fontSize: '0.65rem' }}>Mapeia comandos e envia por WebSocket</Typography>
                    </Box>
                    <ArrowForwardIcon sx={{ color: 'rgba(255,255,255,0.2)', display: { xs: 'none', md: 'block' } }} />
                    <Box sx={{ p: 1.5, bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', flexGrow: 1, textAlign: 'center', width: '100%' }}>
                      <Typography variant="caption" sx={{ fontWeight: '800', display: 'block' }}>Worker Agent (Máquina local)</Typography>
                      <Typography variant="caption" sx={{ color: '#ff9800', fontSize: '0.65rem' }}>Executa subprocesso e streama os logs</Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Box>
            </Fade>
          )}

          {/* SLIDE 8: FECHAMENTO */}
          {currentSlide === 7 && (
            <Fade in={true} timeout={500}>
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="overline" sx={{ color: '#4caf50', fontWeight: '800', letterSpacing: 2 }}>PRONTOS PARA CRESCER</Typography>
                <Typography variant="h2" sx={{ fontWeight: '900', letterSpacing: -2, mb: 3 }}>Assuma o Controle das Automações</Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.5)', maxW: 600, mx: 'auto', mb: 5, lineHeight: 1.6 }}>
                  O Maestro traz governança e cálculo de eficiência operacional transparente para colocar a área de RPA e robôs corporativos no centro estratégico de crescimento da empresa.
                </Typography>
                <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
                  <Button 
                    variant="contained" 
                    onClick={() => router.push('/dashboard')}
                    sx={{ bgcolor: 'white', color: 'black', fontWeight: '900', px: 4, py: 1.5, borderRadius: '10px', textTransform: 'none', '&:hover': { bgcolor: '#f0f0f0' } }}
                  >
                    Ir para o Dashboard
                  </Button>
                  <Button 
                    variant="outlined" 
                    onClick={() => setCurrentSlide(0)}
                    sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.1)', fontWeight: '800', px: 4, py: 1.5, borderRadius: '10px', textTransform: 'none' }}
                  >
                    Reiniciar Pitch
                  </Button>
                </Stack>
              </Box>
            </Fade>
          )}
        </Container>
      </Box>

      {/* Footer Fixo */}
      <Box sx={{ py: 3, borderTop: '1px solid rgba(255,255,255,0.03)', zIndex: 10 }}>
        <Container maxWidth="lg">
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Stack direction="row" spacing={1}>
              <IconButton 
                onClick={prevSlide} 
                disabled={currentSlide === 0} 
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.02)', 
                  border: '1px solid rgba(255,255,255,0.06)',
                  color: 'white',
                  '&:disabled': { opacity: 0.2 }
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
              <IconButton 
                onClick={nextSlide} 
                disabled={currentSlide === totalSlides - 1} 
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.02)', 
                  border: '1px solid rgba(255,255,255,0.06)',
                  color: 'white',
                  '&:disabled': { opacity: 0.2 }
                }}
              >
                <ChevronRightIcon />
              </IconButton>
            </Stack>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', fontWeight: '700' }}>
              Dica: Navegue usando as setas do teclado ◄ ► ou Barra de Espaço.
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

// Componentes estéticos locais mockados
function TableMockUp() {
  return (
    <Box sx={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', overflow: 'hidden' }}>
      <Stack direction="row" sx={{ bgcolor: 'rgba(255,255,255,0.02)', p: 1, borderBottom: '1px solid rgba(255,255,255,0.06)', justifyContent: 'space-between', fontSize: '0.55rem', fontWeight: '800', color: 'rgba(255,255,255,0.4)' }}>
        <Box sx={{ width: '40%' }}>NOME DO JOB</Box>
        <Box sx={{ width: '30%' }}>ÚLTIMA RUN</Box>
        <Box sx={{ width: '30%', textAlign: 'right' }}>STATUS</Box>
      </Stack>
      <Stack spacing={0.5} sx={{ p: 0.5 }}>
        {[
          { name: 'Faturamento TOTVS', time: 'Hoje 15:00', status: 'Sucesso', color: '#4caf50' },
          { name: 'Backup de Logs', time: 'Ontem 23:00', status: 'Sucesso', color: '#4caf50' }
        ].map((x, i) => (
          <Stack key={i} direction="row" sx={{ p: 1, bgcolor: 'rgba(255,255,255,0.01)', borderRadius: '8px', justifyContent: 'space-between', fontSize: '0.6rem', alignItems: 'center' }}>
            <Box sx={{ width: '40%', fontWeight: '700', color: 'white' }}>{x.name}</Box>
            <Box sx={{ width: '30%', color: 'rgba(255,255,255,0.4)' }}>{x.time}</Box>
            <Box sx={{ width: '30%', textAlign: 'right', color: x.color, fontWeight: '800' }}>{x.status}</Box>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
