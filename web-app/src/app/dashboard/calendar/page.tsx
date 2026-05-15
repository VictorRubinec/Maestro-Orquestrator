'use client';

import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Stack, 
  IconButton, 
  Chip,
  Avatar,
  Divider
} from '@mui/material';
import Grid from '@mui/material/Grid';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function CalendarPage() {
  const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  const hours = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];

  const scheduledJobs = [
    { day: 0, hour: '08:00', name: 'Backup Notas', agent: 'Victor-PC', color: '#598AEB' },
    { day: 1, hour: '10:00', name: 'Sinc. Estoque', agent: 'Server-01', color: '#4caf50' },
    { day: 2, hour: '08:00', name: 'Relatório ROI', agent: 'Victor-PC', color: '#ff9800' },
    { day: 3, hour: '14:00', name: 'Limpeza Cache', agent: 'Server-01', color: '#f44336' },
    { day: 4, hour: '18:00', name: 'Backup Global', agent: 'Cloud-A', color: '#9c27b0' },
  ];

  return (
    <Box>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: '900', color: 'white' }}>Calendário</Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)' }}>Cronograma semanal de execuções automáticas.</Typography>
        </Box>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Stack direction="row" sx={{ bgcolor: 'rgba(255,255,255,0.03)', borderRadius: '12px', p: 0.5 }}>
            <IconButton size="small" sx={{ color: 'white' }}><ChevronLeftIcon /></IconButton>
            <Box sx={{ px: 2, display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ fontWeight: '800' }}>Maio 2026</Typography>
            </Box>
            <IconButton size="small" sx={{ color: 'white' }}><ChevronRightIcon /></IconButton>
          </Stack>
          <IconButton sx={{ bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <FilterListIcon sx={{ color: 'white' }} />
          </IconButton>
        </Stack>
      </Stack>

      <Paper sx={{ p: 4, borderRadius: '28px', bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
        <Grid container>
          {/* Header de Dias */}
          <Grid size={{ xs: 1 }} /> {/* Espaço para coluna de horas */}
          {days.map((day, i) => (
            <Grid key={day} size={{ xs: 1.57 }}>
              <Box sx={{ textAlign: 'center', pb: 3 }}>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', fontWeight: '800', letterSpacing: 1 }}>{day.toUpperCase()}</Typography>
                <Typography variant="h6" sx={{ fontWeight: '900', color: i === 3 ? '#598AEB' : 'white' }}>{14 + i}</Typography>
              </Box>
            </Grid>
          ))}

          {/* Grid de Horas */}
          {hours.map((hour) => (
            <React.Fragment key={hour}>
              <Grid size={{ xs: 1 }}>
                <Box sx={{ height: 100, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', pr: 2, pt: 1 }}>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.2)', fontWeight: '700' }}>{hour}</Typography>
                </Box>
              </Grid>
              {days.map((_, dayIndex) => {
                const job = scheduledJobs.find(j => j.day === dayIndex && j.hour === hour);
                return (
                  <Grid key={`${dayIndex}-${hour}`} size={{ xs: 1.57 }}>
                    <Box sx={{ 
                      height: 100, 
                      border: '1px solid rgba(255,255,255,0.03)', 
                      p: 1,
                      position: 'relative',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.01)' }
                    }}>
                      {job && (
                        <Paper sx={{ 
                          p: 1.5, 
                          height: '100%', 
                          bgcolor: `${job.color}15`, 
                          borderLeft: `4px solid ${job.color}`,
                          borderRadius: '12px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between'
                        }}>
                          <Typography variant="caption" sx={{ fontWeight: '800', color: 'white', display: 'block', lineHeight: 1.1 }}>{job.name}</Typography>
                          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                            <Avatar sx={{ width: 14, height: 14, fontSize: '0.5rem', bgcolor: job.color }}>{job.agent[0]}</Avatar>
                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.6rem' }}>{job.agent}</Typography>
                          </Stack>
                        </Paper>
                      )}
                    </Box>
                  </Grid>
                );
              })}
            </React.Fragment>
          ))}
        </Grid>
      </Paper>

      {/* Legenda */}
      <Stack direction="row" spacing={4} sx={{ mt: 4, justifyContent: 'center' }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Box sx={{ width: 12, height: 12, borderRadius: '4px', bgcolor: '#598AEB' }} />
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>Processos de Backup</Typography>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Box sx={{ width: 12, height: 12, borderRadius: '4px', bgcolor: '#4caf50' }} />
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>Sincronização</Typography>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Box sx={{ width: 12, height: 12, borderRadius: '4px', bgcolor: '#ff9800' }} />
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>Financeiro / ROI</Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
