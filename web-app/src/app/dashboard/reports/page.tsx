'use client';

import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Stack, 
  Divider,
  Chip,
  Tooltip,
  IconButton
} from '@mui/material';
import Grid from '@mui/material/Grid';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TimerIcon from '@mui/icons-material/Timer';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import { BarChart, LineChart, PieChart } from '@mui/x-charts';

export default function ReportsPage() {
  // Mock Data
  const stats = [
    { title: 'Economia Total (ROI)', value: 'R$ 12.450', sub: '+15% este mês', icon: <AttachMoneyIcon />, color: '#4caf50' },
    { title: 'Tempo Salvo', value: '458h', sub: '≈ 57 dias de trabalho', icon: <TimerIcon />, color: '#598AEB' },
    { title: 'Execuções Sucesso', value: '2.840', sub: '98.2% de eficácia', icon: <CheckCircleIcon />, color: '#4caf50' },
    { title: 'Falhas Identificadas', value: '12', sub: 'Auto-recuperadas', icon: <ErrorIcon />, color: '#f44336' },
  ];

  return (
    <Box>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: '800' }}>Relatórios & ROI</Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)' }}>
            Análise de performance e economia gerada pela orquestração.
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Chip label="Últimos 30 dias" variant="outlined" sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.1)' }} />
          <Chip label="Exportar PDF" clickable sx={{ bgcolor: '#598AEB', color: 'white', fontWeight: '700' }} />
        </Stack>
      </Stack>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid key={index} size={{ xs: 12, md: 6, lg: 3 }}>
            <Paper sx={{ p: 3, borderRadius: '24px', bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
              <Box sx={{ position: 'absolute', top: -10, right: -10, width: 80, height: 80, borderRadius: '50%', bgcolor: `${stat.color}05`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {React.cloneElement(stat.icon, { sx: { fontSize: 40, color: `${stat.color}20` } })}
              </Box>
              <Stack spacing={1}>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: '700', letterSpacing: 1 }}>{stat.title.toUpperCase()}</Typography>
                <Typography variant="h4" sx={{ fontWeight: '900', color: 'white' }}>{stat.value}</Typography>
                <Typography variant="caption" sx={{ color: stat.color, fontWeight: '700' }}>{stat.sub}</Typography>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Gráfico de Economia */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper sx={{ p: 4, borderRadius: '24px', bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', height: '100%' }}>
            <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: '800' }}>Economia Acumulada</Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>Cálculo baseado em custo/hora médio de R$ 35,00</Typography>
              </Box>
              <IconButton size="small" sx={{ color: 'rgba(255,255,255,0.2)' }}><InfoIcon fontSize="small" /></IconButton>
            </Stack>
            
            <Box sx={{ width: '100%', height: 300 }}>
              <LineChart
                xAxis={[{ data: [1, 5, 10, 15, 20, 25, 30], label: 'Dias do Mês' }]}
                series={[
                  {
                    data: [1200, 2500, 4100, 6800, 8900, 10500, 12450],
                    area: true,
                    color: '#598AEB',
                  },
                ]}
                height={300}
                margin={{ left: 60, right: 20, top: 20, bottom: 40 }}
                sx={{
                  '.MuiLineElement-root': { strokeWidth: 4 },
                  '.MuiAreaElement-root': { fill: 'url(#gradient)' },
                }}
              />
              <svg style={{ height: 0 }}>
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#598AEB" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#598AEB" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </svg>
            </Box>
          </Paper>
        </Grid>

        {/* Distribuição por Robô */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper sx={{ p: 4, borderRadius: '24px', bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: '800', mb: 4 }}>Volume por Automação</Typography>
            <Box sx={{ width: '100%', height: 300, display: 'flex', justifyContent: 'center' }}>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 45, label: 'Backup', color: '#598AEB' },
                      { id: 1, value: 30, label: 'Sinc. DB', color: '#4caf50' },
                      { id: 2, value: 25, label: 'Relatórios', color: '#ff9800' },
                    ],
                    innerRadius: 80,
                    outerRadius: 110,
                    paddingAngle: 5,
                    cornerRadius: 10,
                  },
                ]}
                height={250}
              />
            </Box>
            <Stack spacing={1.5} sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>Top Performance</Typography>
                <Typography variant="body2" sx={{ color: '#4caf50', fontWeight: '800' }}>Backup de Notas</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>Economia/Hora</Typography>
                <Typography variant="body2" sx={{ color: 'white', fontWeight: '800' }}>R$ 145,00/dia</Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        {/* Performance de Agentes */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 4, borderRadius: '24px', bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <Typography variant="h6" sx={{ fontWeight: '800', mb: 4 }}>Uso de Hardware por Agente</Typography>
            <Box sx={{ width: '100%', height: 300 }}>
              <BarChart
                xAxis={[{ scaleType: 'band', data: ['Victor-PC', 'Server-01', 'Raspberry-PI', 'Cloud-Worker-A'] }]}
                series={[
                  { data: [85, 40, 95, 20], label: 'Uso de CPU (%)', color: '#598AEB' },
                  { data: [60, 25, 80, 15], label: 'Uso de Memória (%)', color: '#4caf50' },
                ]}
                height={300}
                borderRadius={12}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
