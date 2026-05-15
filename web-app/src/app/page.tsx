'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Stack, 
  Button, 
  IconButton,
  Divider,
  Paper,
  alpha
} from '@mui/material';
import Grid from '@mui/material/Grid';
import SensorsIcon from '@mui/icons-material/Sensors';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TerminalIcon from '@mui/icons-material/Terminal';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  const features = [
    {
      title: "Controle Multi-Agente",
      desc: "Instale o worker em qualquer máquina e orquestre tudo centralizadamente.",
      icon: <SensorsIcon />,
      color: "#598AEB"
    },
    {
      title: "Métricas de ROI",
      desc: "Saiba exatamente quanto tempo e dinheiro suas automações estão economizando.",
      icon: <TrendingUpIcon />,
      color: "#4caf50"
    },
    {
      title: "Live Monitoring",
      desc: "Console em tempo real para acompanhar cada linha de log dos seus processos.",
      icon: <TerminalIcon />,
      color: "#ff9800"
    },
    {
      title: "Agendamento Inteligente",
      desc: "Motor de scheduling complexo com suporte a múltiplos horários e regras.",
      icon: <PrecisionManufacturingIcon />,
      color: "#9c27b0"
    }
  ];

  return (
    <Box sx={{ bgcolor: '#000000', minHeight: '100vh', color: 'white', overflowX: 'hidden' }}>
      {/* Background Glows */}
      <Box sx={{ position: 'fixed', top: -200, right: -200, width: 600, height: 600, borderRadius: '50%', bgcolor: 'rgba(89, 138, 235, 0.05)', filter: 'blur(100px)', pointerEvents: 'none' }} />
      <Box sx={{ position: 'fixed', bottom: -200, left: -200, width: 600, height: 600, borderRadius: '50%', bgcolor: 'rgba(76, 175, 80, 0.05)', filter: 'blur(100px)', pointerEvents: 'none' }} />

      {/* Navbar */}
      <Container maxWidth="lg">
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', py: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: '900', letterSpacing: -1.5, color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '2px', bgcolor: '#598AEB' }} />
            MAESTRO
          </Typography>
          <Stack direction="row" spacing={5} sx={{ alignItems: 'center' }}>
            <Typography 
              variant="body2" 
              onClick={() => router.push('/features')}
              sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: '700', cursor: 'pointer', '&:hover': { color: 'white' } }}
            >
              Funcionalidades
            </Typography>
            <Typography 
              variant="body2" 
              onClick={() => router.push('/pricing')}
              sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: '700', cursor: 'pointer', '&:hover': { color: 'white' } }}
            >
              Preços
            </Typography>
            <Button 
              onClick={() => router.push('/login')}
              sx={{ color: 'white', fontWeight: '800', textTransform: 'none', px: 3, border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }}
            >
              Login
            </Button>
          </Stack>
        </Stack>
      </Container>

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: 10, pb: 20 }}>
        <Grid container spacing={8} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, lg: 6 }}>
            {/* <Box sx={{ mb: 2, display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.5, borderRadius: '20px', bgcolor: 'rgba(89, 138, 235, 0.1)', border: '1px solid rgba(89, 138, 235, 0.2)' }}>
              <Typography variant="caption" sx={{ color: '#598AEB', fontWeight: '800' }}>V1.0 DISPONÍVEL</Typography>
            </Box> */}
            <Typography variant="h1" sx={{ fontWeight: '900', fontSize: { xs: '3.5rem', md: '5rem' }, lineHeight: 1, mb: 3, letterSpacing: -3 }}>
              Orquestre sua <Box component="span" sx={{ color: '#598AEB' }}>liberdade.</Box>
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.5)', mb: 5, fontWeight: '500', lineHeight: 1.6, maxWidth: 500 }}>
              A plataforma definitiva para gerenciar agentes de automação distribuídos. 
              Visualize ROI, monitore logs em tempo real e escala sem limites.
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button 
                variant="contained" 
                size="large"
                onClick={() => router.push('/login')}
                sx={{ bgcolor: '#598AEB', color: 'white', fontWeight: '900', px: 5, py: 2, borderRadius: '14px', textTransform: 'none', fontSize: '1.1rem', boxShadow: '0 10px 40px rgba(89, 138, 235, 0.3)' }}
              >
                Começar Agora
              </Button>
              <Button 
                variant="text" 
                size="large"
                endIcon={<PlayArrowIcon />}
                sx={{ color: 'white', fontWeight: '800', px: 3, textTransform: 'none' }}
              >
                Ver Demo
              </Button>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }}>
            <Box sx={{ position: 'relative' }}>
              <Paper 
                elevation={24}
                sx={{ 
                  borderRadius: '24px', 
                  overflow: 'hidden', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  bgcolor: '#121212',
                  boxShadow: '0 50px 100px -20px rgba(0,0,0,0.5)'
                }}
              >
                {/* Browser Frame Top */}
                <Box sx={{ px: 2, py: 1.5, bgcolor: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: 1 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ff5f56' }} />
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ffbd2e' }} />
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#27c93f' }} />
                </Box>
                {/* Product Mock (Image placeholder or simplified UI) */}
                <Box sx={{ p: 1, bgcolor: '#000' }}>
                  <Box sx={{ width: '100%', height: 350, borderRadius: '12px', bgcolor: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                    <Stack spacing={3} sx={{ width: '80%', opacity: 0.8 }}>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Box sx={{ flex: 1, height: 100, borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', p: 2 }}>
                          <Box sx={{ width: 30, height: 30, borderRadius: '8px', bgcolor: 'rgba(89, 138, 235, 0.2)', mb: 1 }} />
                          <Box sx={{ width: '60%', height: 10, borderRadius: '5px', bgcolor: 'rgba(255,255,255,0.1)', mb: 1 }} />
                          <Box sx={{ width: '40%', height: 20, borderRadius: '5px', bgcolor: 'white' }} />
                        </Box>
                        <Box sx={{ flex: 1, height: 100, borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', p: 2 }}>
                          <Box sx={{ width: 30, height: 30, borderRadius: '8px', bgcolor: 'rgba(76, 175, 80, 0.2)', mb: 1 }} />
                          <Box sx={{ width: '60%', height: 10, borderRadius: '5px', bgcolor: 'rgba(255,255,255,0.1)', mb: 1 }} />
                          <Box sx={{ width: '40%', height: 20, borderRadius: '5px', bgcolor: 'white' }} />
                        </Box>
                      </Box>
                      <Box sx={{ height: 150, borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', p: 3 }}>
                         <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 2 }}>
                            <Box sx={{ width: 100, height: 15, borderRadius: '5px', bgcolor: 'rgba(255,255,255,0.2)' }} />
                            <Box sx={{ width: 40, height: 15, borderRadius: '10px', bgcolor: 'rgba(76, 175, 80, 0.2)' }} />
                         </Stack>
                         <Box sx={{ width: '100%', height: 8, borderRadius: '4px', bgcolor: 'rgba(255,255,255,0.05)', mb: 1, overflow: 'hidden' }}>
                            <Box sx={{ width: '70%', height: '100%', bgcolor: '#598AEB' }} />
                         </Box>
                         <Box sx={{ width: '100%', height: 8, borderRadius: '4px', bgcolor: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                            <Box sx={{ width: '40%', height: '100%', bgcolor: '#4caf50' }} />
                         </Box>
                      </Box>
                    </Stack>
                    {/* Glass Overlay */}
                    <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(89, 138, 235, 0.1) 0%, transparent 100%)' }} />
                  </Box>
                </Box>
              </Paper>
              {/* Floating Badge */}
              <Paper sx={{ position: 'absolute', bottom: -30, right: -30, p: 2.5, borderRadius: '20px', bgcolor: '#598AEB', color: 'white', display: { xs: 'none', md: 'block' } }}>
                <Typography variant="h5" sx={{ fontWeight: '900' }}>+45%</Typography>
                <Typography variant="caption" sx={{ fontWeight: '700', opacity: 0.8 }}>Eficiência Operacional</Typography>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ py: 20, bgcolor: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 12 }}>
            <Typography variant="overline" sx={{ color: '#598AEB', fontWeight: '900', letterSpacing: 4 }}>FUNCIONALIDADES</Typography>
            <Typography variant="h3" sx={{ fontWeight: '900', mt: 2, letterSpacing: -1 }}>A maestria do orquestrador.</Typography>
          </Box>
          
          <Grid container spacing={4}>
            {features.map((feature, i) => (
              <Grid size={{ xs: 12, md: 6, lg: 3 }} key={i}>
                <Paper 
                  sx={{ 
                    p: 4, 
                    borderRadius: '24px', 
                    bgcolor: 'rgba(255,255,255,0.02)', 
                    border: '1px solid rgba(255,255,255,0.05)',
                    height: '100%',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      bgcolor: 'rgba(255,255,255,0.04)',
                      borderColor: feature.color,
                      '& .feature-icon': { color: feature.color, transform: 'scale(1.1)' }
                    }
                  }}
                >
                  <Box 
                    className="feature-icon" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.2)', 
                      mb: 3, 
                      transition: 'all 0.3s',
                      '& svg': { fontSize: 40 }
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: '800', mb: 2 }}>{feature.title}</Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
                    {feature.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ py: 20, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: '900', mb: 4, letterSpacing: -1.5 }}>
          Pronto para assumir a regência?
        </Typography>
        <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.4)', mb: 6, maxWidth: 600, mx: 'auto' }}>
          Junte-se a centenas de empresas que já otimizaram seus fluxos de trabalho com o Maestro Orchestrator.
        </Typography>
        <Button 
          variant="contained" 
          size="large"
          onClick={() => router.push('/register')}
          sx={{ bgcolor: 'white', color: 'black', fontWeight: '900', px: 6, py: 2, borderRadius: '14px', textTransform: 'none', fontSize: '1.2rem', '&:hover': { bgcolor: '#f0f0f0' } }}
        >
          Criar Conta Gratuita
        </Button>
      </Container>

      {/* Footer */}
      <Box sx={{ py: 8, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: 'column', md: 'row' }} sx={{ justifyContent: 'space-between', alignItems: 'center', gap: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: '900', letterSpacing: -1 }}>MAESTRO</Typography>
            <Stack direction="row" spacing={4}>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', fontWeight: '700' }}>© 2026 Maestro Orchestrator</Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', fontWeight: '700', cursor: 'pointer', '&:hover': { color: 'white' } }}>Políticas</Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', fontWeight: '700', cursor: 'pointer', '&:hover': { color: 'white' } }}>Termos</Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.05)' }} />
              <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.05)' }} />
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
