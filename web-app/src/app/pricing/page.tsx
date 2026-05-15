'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Stack, 
  Paper,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import Grid from '@mui/material/Grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
  const router = useRouter();

  const plans = [
    {
      name: "Starter",
      price: "Grátis",
      desc: "Ideal para desenvolvedores e pequenos testes de automação.",
      features: ["1 Agente Conectado", "10 Execuções/Dia", "Histórico de 24h", "Console Live", "Comunidade Discord"],
      button: "Começar Grátis",
      featured: false
    },
    {
      name: "Pro",
      price: "R$ 149",
      period: "/mês",
      desc: "Para empresas que precisam de escala e monitoramento real.",
      features: ["Até 10 Agentes", "Execuções Ilimitadas", "Relatórios de ROI", "Notificações (Slack/Discord)", "Suporte Prioritário"],
      button: "Assinar Agora",
      featured: true
    },
    {
      name: "Enterprise",
      price: "Sob Consulta",
      desc: "Infraestrutura dedicada e controle total para grandes operações.",
      features: ["Agentes Ilimitados", "On-premise Deployment", "Custom API Integrations", "SLA de 99.9%", "Gerente de Conta"],
      button: "Falar com Consultor",
      featured: false
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
      <Container maxWidth="md" sx={{ pt: 10, pb: 10, textAlign: 'center' }}>
        <Typography variant="overline" sx={{ color: '#598AEB', fontWeight: '900', letterSpacing: 4 }}>PLANOS E PREÇOS</Typography>
        <Typography variant="h2" sx={{ fontWeight: '900', mt: 2, mb: 4, letterSpacing: -2 }}>
          Escolha o ritmo da sua <Box component="span" sx={{ color: '#598AEB' }}>automação.</Box>
        </Typography>
        <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
          Planos flexíveis que crescem com o seu negócio. Sem letras miúdas, apenas performance.
        </Typography>
      </Container>

      {/* Pricing Cards */}
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ alignItems: 'center' }}>
          {plans.map((plan, i) => (
            <Grid size={{ xs: 12, md: 4 }} key={i}>
              <Paper 
                sx={{ 
                  p: 5, 
                  borderRadius: '32px', 
                  bgcolor: plan.featured ? 'rgba(89, 138, 235, 0.05)' : 'rgba(255,255,255,0.02)', 
                  border: '1px solid',
                  borderColor: plan.featured ? '#598AEB' : 'rgba(255,255,255,0.05)',
                  height: '100%',
                  position: 'relative',
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'scale(1.02)' }
                }}
              >
                {plan.featured && (
                  <Chip 
                    label="MAIS POPULAR" 
                    size="small" 
                    sx={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', bgcolor: '#598AEB', color: 'white', fontWeight: '900', px: 2 }} 
                  />
                )}
                <Typography variant="h5" sx={{ fontWeight: '900', mb: 1 }}>{plan.name}</Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', mb: 4, minHeight: 40 }}>{plan.desc}</Typography>
                
                <Stack direction="row" sx={{ alignItems: 'baseline', mb: 4 }}>
                  <Typography variant="h3" sx={{ fontWeight: '900' }}>{plan.price}</Typography>
                  {plan.period && <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.4)', ml: 1 }}>{plan.period}</Typography>}
                </Stack>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', mb: 4 }} />

                <List sx={{ mb: 4 }}>
                  {plan.features.map((feat, j) => (
                    <ListItem key={j} disableGutters sx={{ py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleIcon sx={{ fontSize: 18, color: plan.featured ? '#598AEB' : 'rgba(255,255,255,0.2)' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={feat} 
                        slotProps={{ primary: { sx: { fontSize: '0.875rem', fontWeight: '600', color: 'rgba(255,255,255,0.7)' } } }} 
                      />
                    </ListItem>
                  ))}
                </List>

                <Button 
                  fullWidth 
                  variant={plan.featured ? "contained" : "outlined"}
                  size="large"
                  onClick={() => router.push('/register')}
                  sx={{ 
                    py: 1.5, 
                    borderRadius: '12px', 
                    fontWeight: '900', 
                    textTransform: 'none',
                    bgcolor: plan.featured ? '#598AEB' : 'transparent',
                    borderColor: plan.featured ? '#598AEB' : 'rgba(255,255,255,0.2)',
                    color: 'white',
                    '&:hover': {
                      bgcolor: plan.featured ? '#4A72C2' : 'rgba(255,255,255,0.05)',
                      borderColor: '#598AEB'
                    }
                  }}
                >
                  {plan.button}
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Comparison Question */}
      <Container maxWidth="md" sx={{ mt: 15, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.3)' }}>
          Precisa de algo sob medida para sua infraestrutura? <Box component="span" sx={{ color: '#598AEB', cursor: 'pointer', fontWeight: '700' }}>Fale com nosso time técnico.</Box>
        </Typography>
      </Container>
    </Box>
  );
}

import Chip from '@mui/material/Chip';
