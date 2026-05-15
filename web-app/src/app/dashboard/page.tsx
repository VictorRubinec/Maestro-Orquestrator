'use client';

import React from 'react';
import { 
  Box, 
  Stack,
  LinearProgress,
  Paper,
  Typography,
  Chip,
  IconButton,
  Avatar,
  Divider,
  Button
} from '@mui/material';
import Grid from '@mui/material/Grid';
import SensorsIcon from '@mui/icons-material/Sensors';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function DashboardPage() {
  const stats = [
    { label: 'Agentes Online', value: '3', sub: 'Todos operacionais', icon: <SensorsIcon />, color: '#598AEB' },
    { label: 'Execuções (Hoje)', value: '156', sub: '+12% vs ontem', icon: <PrecisionManufacturingIcon />, color: '#4caf50' },
    { label: 'Horas Poupadas', value: '45.2h', sub: 'Média de 1.5h/job', icon: <TrendingUpIcon />, color: '#ff9800' },
    { label: 'Custo Evitado', value: 'R$ 3.840', sub: 'ROI Estimado', icon: <AccountBalanceWalletIcon />, color: '#9c27b0' },
  ];

  return (
    <Box>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: '900', color: 'white', letterSpacing: -1 }}>
            Dashboard
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)' }}>
            Status global da sua orquestração de processos.
          </Typography>
        </Box>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Box sx={{ textAlign: 'right', display: { xs: 'none', md: 'block' } }}>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', display: 'block' }}>ÚLTIMA ATUALIZAÇÃO</Typography>
            <Typography variant="body2" sx={{ fontWeight: '700', color: 'white' }}>Há 2 minutos</Typography>
          </Box>
          <IconButton sx={{ bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <RefreshIcon sx={{ color: 'white' }} />
          </IconButton>
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {/* Top Stats Cards */}
        {stats.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
            <Paper 
              sx={{ 
                p: 3, 
                borderRadius: '24px', 
                bgcolor: 'rgba(255,255,255,0.02)', 
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'transform 0.2s, background 0.2s',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.04)', transform: 'translateY(-4px)' }
              }}
            >
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 2 }}>
                <Box sx={{ 
                  p: 1.2, 
                  borderRadius: '14px', 
                  bgcolor: `${stat.color}15`, 
                  color: stat.color,
                  display: 'flex'
                }}>
                  {stat.icon}
                </Box>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: '800', letterSpacing: 1 }}>
                  {stat.label.toUpperCase()}
                </Typography>
              </Stack>
              <Typography variant="h4" sx={{ fontWeight: '900', color: 'white', mb: 0.5 }}>
                {stat.value}
              </Typography>
              <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                <ArrowUpwardIcon sx={{ fontSize: 14, color: '#4caf50' }} />
                <Typography variant="caption" sx={{ color: '#4caf50', fontWeight: '800' }}>
                  {stat.sub}
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        ))}

        {/* Health Chart Section */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper 
            sx={{ 
              p: 3, 
              borderRadius: '28px', 
              bgcolor: 'rgba(255,255,255,0.02)', 
              border: '1px solid rgba(255,255,255,0.05)',
              minHeight: '400px'
            }}
          >
            <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: '800' }}>Carga dos Agentes</Typography>
              <Chip label="Real-time" size="small" sx={{ bgcolor: 'rgba(76, 175, 80, 0.1)', color: '#4caf50', fontWeight: '800', fontSize: '0.6rem' }} />
            </Stack>
            
            <Stack spacing={4}>
              {[
                { name: 'Victor-PC', os: 'Windows 11', cpu: 65, ram: 42, status: 'Online' },
                { name: 'Server-01', os: 'Ubuntu 22.04', cpu: 22, ram: 15, status: 'Online' },
                { name: 'Raspberry-PI', os: 'Raspbian', cpu: 88, ram: 75, status: 'Online' },
              ].map((agent) => (
                <Box key={agent.name}>
                  <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', mb: 1.5, alignItems: 'center' }}>
                    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: agent.cpu > 80 ? 'rgba(244, 67, 54, 0.1)' : 'rgba(255,255,255,0.05)', color: agent.cpu > 80 ? '#f44336' : 'white', width: 32, height: 32, fontSize: '0.8rem' }}>{agent.name[0]}</Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: '700' }}>{agent.name}</Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>{agent.os}</Typography>
                      </Box>
                    </Stack>
                    <Stack direction="row" spacing={3}>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', display: 'block' }}>CPU</Typography>
                        <Typography variant="body2" sx={{ fontWeight: '800', color: agent.cpu > 80 ? '#f44336' : 'white' }}>{agent.cpu}%</Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', display: 'block' }}>RAM</Typography>
                        <Typography variant="body2" sx={{ fontWeight: '800', color: '#598AEB' }}>{agent.ram}%</Typography>
                      </Box>
                    </Stack>
                  </Stack>
                  <LinearProgress 
                    variant="determinate" 
                    value={agent.cpu} 
                    sx={{ 
                      height: 6, 
                      borderRadius: 3, 
                      bgcolor: 'rgba(255,255,255,0.03)', 
                      '& .MuiLinearProgress-bar': { 
                        bgcolor: agent.cpu > 80 ? '#f44336' : agent.cpu > 50 ? '#ff9800' : '#598AEB',
                        borderRadius: 3
                      } 
                    }} 
                  />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Recent Activity Sidebar */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={3}>
            <Paper 
              sx={{ 
                p: 3, 
                borderRadius: '28px', 
                bgcolor: '#598AEB', 
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Box sx={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)' }} />
              <TrendingUpIcon sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: '800', mb: 1 }}>Insight do Maestro</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 3 }}>
                Seu "Backup de Notas" economizou 4h extras hoje devido à otimização do servidor.
              </Typography>
              <Button 
                variant="contained" 
                size="small"
                sx={{ 
                  bgcolor: 'white', 
                  color: '#598AEB', 
                  fontWeight: '800', 
                  borderRadius: '10px',
                  textTransform: 'none',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                }}
              >
                Ver Detalhes
              </Button>
            </Paper>

            <Paper 
              sx={{ 
                p: 3, 
                borderRadius: '28px', 
                bgcolor: 'rgba(255,255,255,0.02)', 
                border: '1px solid rgba(255,255,255,0.05)',
                flexGrow: 1
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: '800', mb: 3 }}>Últimas Atividades</Typography>
              <Stack spacing={2.5}>
                {[
                  { task: 'Backup Notas', time: 'Há 5m', status: 'Sucesso' },
                  { task: 'Sinc. Estoque', time: 'Há 12m', status: 'Falhou' },
                  { task: 'Limpeza Cache', time: 'Há 45m', status: 'Sucesso' },
                  { task: 'Relatório ROI', time: 'Há 1h', status: 'Sucesso' },
                ].map((item, i) => (
                  <Stack key={i} direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: item.status === 'Sucesso' ? '#4caf50' : '#f44336' }} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: '700', fontSize: '0.85rem' }}>{item.task}</Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)' }}>{item.time}</Typography>
                    </Box>
                    <IconButton size="small" sx={{ color: 'rgba(255,255,255,0.2)' }}><PlayArrowIcon fontSize="small" /></IconButton>
                  </Stack>
                ))}
              </Stack>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

