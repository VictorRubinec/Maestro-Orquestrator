'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Stack, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Tooltip
} from '@mui/material';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import PendingIcon from '@mui/icons-material/Pending';
import TerminalModal from '@/components/TerminalModal';

export default function JobsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState('');
  const [logs, setLogs] = useState('');

  const jobHistory = [
    { id: '#1284', automation: 'Contar até 5', agent: 'Victor-PC', start: '14/05 15:00', duration: '5s', status: 'Sucesso' },
    { id: '#1283', automation: 'Backup de Logs', agent: 'Server-01', start: '14/05 14:30', duration: '1m 12s', status: 'Sucesso' },
    { id: '#1282', automation: 'Limpeza de Temporários', agent: 'Victor-PC', start: '14/05 12:00', duration: '2s', status: 'Falhou' },
    { id: '#1281', automation: 'Relatório Mensal', agent: 'Server-01', start: '14/05 10:00', duration: '15m', status: 'Pendente' },
  ];

  const handleShowLogs = (job: any) => {
    setSelectedJob(job.automation + ' ' + job.id);
    setLogs(`[INFO] Job ${job.id} started at ${job.start}\n[DEBUG] Connecting to worker ${job.agent}...\n[EXEC] Executing automation sequence...\n[DONE] Execution finished with status: ${job.status}`);
    setModalOpen(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Sucesso': return <CheckCircleIcon sx={{ fontSize: 16, mr: 0.5 }} />;
      case 'Falhou': return <ErrorIcon sx={{ fontSize: 16, mr: 0.5 }} />;
      default: return <PendingIcon sx={{ fontSize: 16, mr: 0.5 }} />;
    }
  };

  return (
    <Box>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: '800', mb: 1 }}>
            Histórico de Jobs
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Acompanhe o status de todas as execuções enviadas aos agentes.
          </Typography>
        </Box>
      </Stack>

      {/* Filtros */}
      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        <TextField 
          placeholder="Buscar por ID ou Automação..." 
          size="small"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
              sx: { borderRadius: '12px', bgcolor: 'background.paper' }
            }
          }}
          sx={{ maxWidth: 400, flexGrow: 1 }}
        />
      </Stack>

      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '24px', border: '1px solid', borderColor: 'divider', bgcolor: '#000000', color: 'white' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'rgba(255,255,255,0.02)' }}>
            <TableRow>
              <TableCell sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: '700' }}>ID</TableCell>
              <TableCell sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: '700' }}>Automação</TableCell>
              <TableCell sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: '700' }}>Agente</TableCell>
              <TableCell sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: '700' }}>Início</TableCell>
              <TableCell sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: '700' }}>Duração</TableCell>
              <TableCell sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: '700' }}>Status</TableCell>
              <TableCell align="right" sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: '700' }}>Logs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobHistory.map((job) => (
              <TableRow key={job.id} sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.03)' } }}>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: '600' }}>{job.id}</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: '700' }}>{job.automation}</TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)' }}>{job.agent}</TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)' }}>{job.start}</TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)' }}>{job.duration}</TableCell>
                <TableCell>
                  <Chip 
                    label={job.status} 
                    icon={getStatusIcon(job.status)}
                    size="small" 
                    sx={{ 
                      fontWeight: '800',
                      bgcolor: job.status === 'Sucesso' ? 'rgba(76, 175, 80, 0.15)' : job.status === 'Falhou' ? 'rgba(244, 67, 54, 0.15)' : 'rgba(255, 152, 0, 0.15)',
                      color: job.status === 'Sucesso' ? '#4caf50' : job.status === 'Falhou' ? '#f44336' : '#ff9800',
                      '& .MuiChip-icon': { color: 'inherit' }
                    }} 
                  />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Ver logs">
                    <IconButton size="small" onClick={() => handleShowLogs(job)} sx={{ color: '#598AEB' }}>
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TerminalModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        jobName={selectedJob} 
        logs={logs}
      />
    </Box>
  );
}
