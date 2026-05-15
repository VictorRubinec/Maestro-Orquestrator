'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Stack, 
  TextField, 
  Button, 
  Switch, 
  Avatar,
  Collapse
} from '@mui/material';
import Grid from '@mui/material/Grid';
import SaveIcon from '@mui/icons-material/Save';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import GroupsIcon from '@mui/icons-material/Groups'; // Teams fallback

export default function SettingsPage() {
  const [channels, setChannels] = useState({
    slack: true,
    discord: false,
    teams: true,
    telegram: false,
    whatsapp: false,
    email: true
  });

  const toggleChannel = (channel: keyof typeof channels) => {
    setChannels(prev => ({ ...prev, [channel]: !prev[channel] }));
  };

  const channelConfigs = [
    { id: 'slack', name: 'Slack Integration', icon: 'S', color: '#4A154B', sub: 'Canais específicos via Webhook.' },
    { id: 'discord', name: 'Discord Webhook', icon: 'D', color: '#5865F2', sub: 'Monitoramento via servidores Discord.' },
    { id: 'teams', name: 'Microsoft Teams', icon: <GroupsIcon />, color: '#444791', sub: 'Conecte sua organização via Webhook.' },
    { id: 'telegram', name: 'Telegram Bot', icon: <TelegramIcon />, color: '#0088cc', sub: 'Receba alertas direto no seu bot.' },
    { id: 'whatsapp', name: 'WhatsApp Business', icon: <WhatsAppIcon />, color: '#25D366', sub: 'Notificações via API Oficial/Broker.' },
  ];

  return (
    <Box>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: '900', color: 'white' }}>
            Notificações
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)' }}>
            Configure como o Maestro deve te avisar sobre eventos importantes.
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<SaveIcon />}
          sx={{ bgcolor: '#598AEB', borderRadius: '12px', fontWeight: '800', textTransform: 'none', px: 4 }}
        >
          Salvar Configurações
        </Button>
      </Stack>

      <Grid container spacing={4}>
        {/* Canais de Comunicação */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <Stack spacing={2.5}>
            {channelConfigs.map((ch) => (
              <Paper key={ch.id} sx={{ p: 3, borderRadius: '24px', bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Stack direction="row" spacing={3} sx={{ alignItems: 'flex-start' }}>
                  <Avatar sx={{ bgcolor: ch.color, width: 44, height: 44, fontSize: '1rem' }}>{ch.icon}</Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: '800' }}>{ch.name}</Typography>
                      <Switch 
                        checked={channels[ch.id as keyof typeof channels]} 
                        onChange={() => toggleChannel(ch.id as keyof typeof channels)} 
                      />
                    </Stack>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', display: 'block', mb: 2 }}>
                      {ch.sub}
                    </Typography>
                    <Collapse in={channels[ch.id as keyof typeof channels]}>
                      <TextField 
                        fullWidth 
                        size="small"
                        label={ch.id === 'whatsapp' ? 'Número (DDI + DDD + Número)' : 'Webhook URL / Token'} 
                        placeholder={ch.id === 'telegram' ? '123456789:ABCDefgh...' : 'https://...'}
                        slotProps={{
                          inputLabel: { sx: { color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' } },
                          input: { sx: { borderRadius: '12px', bgcolor: 'black', color: 'white', fontFamily: 'monospace', fontSize: '0.75rem' } }
                        }}
                      />
                    </Collapse>
                  </Box>
                </Stack>
              </Paper>
            ))}

            {/* Email (Especial) */}
            <Paper sx={{ p: 3, borderRadius: '24px', bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <Stack direction="row" spacing={3} sx={{ alignItems: 'flex-start' }}>
                <Box sx={{ p: 1.2, borderRadius: '12px', bgcolor: 'rgba(89, 138, 235, 0.1)', color: '#598AEB', display: 'flex' }}>
                  <EmailIcon />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: '800' }}>Relatórios por E-mail</Typography>
                    <Switch checked={channels.email} onChange={() => toggleChannel('email')} />
                  </Stack>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', display: 'block' }}>
                    Resumos diários e alertas críticos na sua caixa de entrada.
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Stack>
        </Grid>

        {/* Regras de Disparo */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <Paper sx={{ p: 4, borderRadius: '24px', bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', height: 'fit-content', position: 'sticky', top: 20 }}>
            <Typography variant="h6" sx={{ fontWeight: '800', mb: 1 }}>Regras de Disparo</Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', display: 'block', mb: 4 }}>
              Defina quais eventos devem gerar uma notificação.
            </Typography>
            
            <Stack spacing={2}>
              {[
                { label: 'Falha na execução de Job', default: true },
                { label: 'Agente ficou Offline', default: true },
                { label: 'Sucesso na execução', default: false },
                { label: 'Relatório diário de ROI', default: true },
                { label: 'Novos Agentes conectados', default: false },
                { label: 'Tentativa de Login não autorizada', default: true },
              ].map((rule, i) => (
                <Box key={i} sx={{ p: 2, borderRadius: '16px', bgcolor: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ fontWeight: '600' }}>{rule.label}</Typography>
                  <Switch size="small" defaultChecked={rule.default} />
                </Box>
              ))}
            </Stack>

            <Box sx={{ mt: 4, p: 3, borderRadius: '16px', bgcolor: 'rgba(89, 138, 235, 0.05)', border: '1px dashed rgba(89, 138, 235, 0.3)' }}>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <NotificationsActiveIcon sx={{ color: '#598AEB' }} />
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>
                  Configuração aplicada globalmente para todos os canais ativos acima.
                </Typography>
              </Stack>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
