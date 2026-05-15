'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Chip,
  IconButton,
  Stack,
  Tooltip
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import TerminalIcon from '@mui/icons-material/Terminal';
import TerminalModal from '@/components/TerminalModal';
import NewAutomationModal from '@/components/NewAutomationModal';
import RunAutomationModal from '@/components/RunAutomationModal';

export default function AutomationsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [runModalOpen, setRunModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState('');
  const [terminalLogs, setTerminalLogs] = useState('');

  const automations = [
    { id: 1, name: 'Faturamento Mensal', runtime: 'Python', lastRun: '14/05 15:00', agents: 2 },
    { id: 2, name: 'Sincronização DB', runtime: 'Node.js', lastRun: '14/05 12:30', agents: 1 },
    { id: 3, name: 'Relatório Mensal', runtime: 'Node.js', lastRun: '13/05 09:00', agents: 3 },
  ];

  const mockParams: any[] = [
    { id: '1', name: '-re', type: 'flag', description: 'Re-executar processamento' },
    { id: '2', name: 'Intervalo de Datas', type: 'date_range', description: 'Data Inicial (-di) e Final (-df)' },
    { id: '3', name: '-ht', type: 'text', description: 'Hotel Tag' },
    { id: '4', name: '-i', type: 'number', description: 'ID da Instância' },
    { id: '5', name: '-p', type: 'text', description: 'Período' },
  ];

  const mockAgents = [
    { id: 'victor-pc', name: 'Victor-Workstation (Online)' },
    { id: 'server-01', name: 'Server-Production-01 (Offline)' },
  ];

  const handleShowTerminal = (nome: string) => {
    setSelectedJob(nome);
    setTerminalLogs('Iniciando conexão com agentes...\n[OK] Victor-PC conectado\n[OK] Server-01 conectado\nLogs em tempo real:\n');
    setModalOpen(true);
  };

  const handleOpenRun = (nome: string) => {
    setSelectedJob(nome);
    setRunModalOpen(true);
  };

  return (
    <Box>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: '800' }}>
          Minhas Automações
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setNewModalOpen(true)} sx={{ borderRadius: '12px', fontWeight: '800', textTransform: 'none' }}>
          Nova Automação
        </Button>
      </Stack>

      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', bgcolor: '#000000' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'rgba(255,255,255,0.02)' }}>
            <TableRow>
              <TableCell sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: '700' }}>Automação</TableCell>
              <TableCell sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: '700' }}>Última Execução</TableCell>
              <TableCell sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: '700' }}>Agentes</TableCell>
              <TableCell align="right" sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: '700' }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {automations.map((item) => (
              <TableRow key={item.id} sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.03)' } }}>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: '700', color: 'white' }}>{item.name}</Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>{item.runtime}</Typography>
                </TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)' }}>{item.lastRun}</TableCell>
                <TableCell>
                  <Chip label={`${item.agents} Agentes`} size="small" sx={{ bgcolor: 'rgba(89, 138, 235, 0.1)', color: '#598AEB', fontWeight: '800' }} />
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
                    <Tooltip title="Editar">
                      <IconButton size="small" onClick={() => setNewModalOpen(true)} sx={{ color: 'rgba(255,255,255,0.4)' }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Logs">
                      <IconButton size="small" onClick={() => handleShowTerminal(item.name)} sx={{ color: '#598AEB' }}>
                        <TerminalIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Executar Agora">
                      <IconButton size="small" onClick={() => handleOpenRun(item.name)} sx={{ color: '#4caf50' }}>
                        <PlayArrowIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir">
                      <IconButton size="small" sx={{ color: 'error.main' }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
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
        logs={terminalLogs}
      />
      <NewAutomationModal 
        open={newModalOpen} 
        onClose={() => setNewModalOpen(false)} 
      />
      <RunAutomationModal 
        open={runModalOpen} 
        onClose={() => setRunModalOpen(false)} 
        automationName={selectedJob}
        agents={mockAgents}
        params={mockParams}
      />
    </Box>
  );
}
