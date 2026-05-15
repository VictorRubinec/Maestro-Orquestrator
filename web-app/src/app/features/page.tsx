'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Stack, 
  Paper,
  Button,
  Divider
} from '@mui/material';
import Grid from '@mui/material/Grid';
import SensorsIcon from '@mui/icons-material/Sensors';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TerminalIcon from '@mui/icons-material/Terminal';
import ShieldMoonIcon from '@mui/icons-material/ShieldMoon';
import LayersIcon from '@mui/icons-material/Layers';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/navigation';

export default function FeaturesPage() {
  const router = useRouter();

  const mainFeatures = [
    {
      title: "Arquitetura Multi-Agente",
      desc: "Instale o Worker em servidores locais, nuvem ou máquinas físicas. O Maestro conecta todos em uma rede unificada.",
      icon: <SensorsIcon />,
      color: "#598AEB"
    },
    {
      title: "Agendamento Avançado",
      desc: "Planeje execuções por minuto, hora, dias específicos ou intervalos complexos. Controle total sobre o cronograma.",
      icon: <PrecisionManufacturingIcon />,
      color: "#9c27b0"
    },
    {
      title: "Monitoramento Live",
      desc: "Veja logs em tempo real e o consumo de hardware (CPU/RAM) de cada agente enquanto eles trabalham.",
      icon: <TerminalIcon />,
      color: "#ff9800"
    },
    {
      title: "Cálculo de ROI Nativo",
      desc: "Converta tempo automatizado em economia real. O Maestro gera relatórios financeiros prontos para apresentação.",
      icon: <TrendingUpIcon />,
      color: "#4caf50"
    },
    {
      title: "Segurança de Dados",
      desc: "Comunicação via WebSocket seguro. Seus dados nunca saem da sua infraestrutura; o Maestro apenas orquestra.",
      icon: <ShieldMoonIcon />,
      color: "#f44336"
    },
    {
      title: "Parâmetros Dinâmicos",
      desc: "Passe argumentos flexíveis para seus scripts (datas, IDs, flags) com máscaras de input e prévia CLI.",
      icon: <LayersIcon />,
      color: "#00bcd4"
    }
  ];

  return (
    <Box sx={{ bgcolor: '#000000', minHeight: '100vh', color: 'white', pb: 10 }}>
      {/* Navbar */}
      <Container maxWidth="lg">
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', py: 4 }}>
          <Typography 
            variant="h5" 
            onClick={() => router.push('/')}
            sx={{ fontWeight: '900', letterSpacing: -1.5, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <Box sx={{ width: 12, height: 12, borderRadius: '2px', bgcolor: '#598AEB' }} />
            MAESTRO
          </Typography>
          <Button 
            onClick={() => router.push('/login')}
            sx={{ color: 'white', fontWeight: '800', textTransform: 'none', px: 3, border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }}
          >
            Login
          </Button>
        </Stack>
      </Container>

      {/* Header Section */}
      <Container maxWidth="md" sx={{ pt: 10, pb: 15, textAlign: 'center' }}>
        <Typography variant="overline" sx={{ color: '#598AEB', fontWeight: '900', letterSpacing: 4 }}>O PODER DO MAESTRO</Typography>
        <Typography variant="h2" sx={{ fontWeight: '900', mt: 2, mb: 4, letterSpacing: -2 }}>
          Funcionalidades feitas para <Box component="span" sx={{ color: '#598AEB' }}>escalar.</Box>
        </Typography>
        <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
          Explore todas as ferramentas que tornam o Maestro a escolha número #1 para orquestração de RPA e automação distribuída.
        </Typography>
      </Container>

      {/* Features Grid */}
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {mainFeatures.map((f, i) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={i}>
              <Paper sx={{ p: 5, borderRadius: '32px', bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', height: '100%' }}>
                <Box sx={{ color: f.color, mb: 4, '& svg': { fontSize: 48 } }}>
                  {f.icon}
                </Box>
                <Typography variant="h5" sx={{ fontWeight: '800', mb: 2 }}>{f.title}</Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.8 }}>
                  {f.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Deep Dive Section */}
      <Container maxWidth="lg" sx={{ mt: 20 }}>
        <Paper sx={{ p: { xs: 4, md: 8 }, borderRadius: '48px', bgcolor: '#121212', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
          <Box sx={{ position: 'absolute', top: -50, right: -50, width: 300, height: 300, bgcolor: 'rgba(89, 138, 235, 0.05)', borderRadius: '50%', filter: 'blur(80px)' }} />
          <Grid container spacing={8} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h3" sx={{ fontWeight: '900', mb: 3, letterSpacing: -1.5 }}>Visibilidade Total</Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.5)', mb: 4, lineHeight: 1.8, fontSize: '1.1rem' }}>
                Não apenas agende. Veja a saúde da sua infraestrutura. O Maestro fornece telemetria detalhada de cada servidor conectado, permitindo que você identifique gargalos antes que eles virem problemas.
              </Typography>
              <Stack spacing={2}>
                {['Status de CPU e RAM em tempo real', 'Histórico completo de logs (Stdout/Stderr)', 'Notificações push em canais de sua escolha'].map((text, i) => (
                  <Stack key={i} direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#598AEB' }} />
                    <Typography variant="body2" sx={{ fontWeight: '700' }}>{text}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
               <Box sx={{ p: 4, borderRadius: '24px', bgcolor: 'black', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#598AEB' }}>$ maestro agent stats --id server-01</Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', display: 'block' }}>[CPU] [||||||||||          ] 45%</Typography>
                    <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', display: 'block' }}>[RAM] [||||||              ] 30%</Typography>
                    <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', display: 'block' }}>[NET] 1.2 MB/s up | 0.8 MB/s down</Typography>
                  </Box>
               </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* CTA */}
      <Container maxWidth="md" sx={{ mt: 20, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: '900', mb: 6 }}>Pronto para automatizar com inteligência?</Typography>
        <Button 
          variant="contained" 
          size="large"
          onClick={() => router.push('/login')}
          sx={{ bgcolor: '#598AEB', color: 'white', fontWeight: '900', px: 6, py: 2, borderRadius: '14px', textTransform: 'none' }}
        >
          Começar Teste Gratuito
        </Button>
      </Container>
    </Box>
  );
}
