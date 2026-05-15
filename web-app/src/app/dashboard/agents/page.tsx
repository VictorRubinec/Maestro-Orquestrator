'use client';

import React, { useState, useMemo } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Stack, 
  Chip, 
  LinearProgress,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import SensorsIcon from '@mui/icons-material/Sensors';
import SensorsOffIcon from '@mui/icons-material/SensorsOff';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function AgentsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<any>(null);

  const handleDownloadWorker = () => {
    // Simulação de download do executável
    const link = document.createElement('a');
    link.href = '#'; // Aqui seria a URL real do maestro-worker.exe
    link.download = 'maestro-worker.exe';
    document.body.appendChild(link);
    // link.click(); // Comentado para não disparar download falso agora
    alert('Iniciando download do Maestro Worker Installer (.exe)...');
    document.body.removeChild(link);
  };

  const agents = [
    // ... mantendo os agentes ...
    { 
      id: 1, 
      name: 'Victor-Workstation', 
      token: 'super-secret-key-maestro-2026', 
      status: 'Online', 
      lastSeen: 'Agora',
      cpu: 32,
      ram: 45,
      os: 'Windows 11',
      description: 'PC Principal de Desenvolvimento'
    },
    { 
      id: 2, 
      name: 'Server-Production-01', 
      token: 'prod-agent-token-alpha', 
      status: 'Offline', 
      lastSeen: 'Há 2 horas',
      cpu: 0,
      ram: 0,
      os: 'Ubuntu 22.04',
      description: 'Servidor de deploy em nuvem'
    },
    { 
      id: 3, 
      name: 'Raspberry-PI-Home', 
      token: 'home-pi-maestro-2026', 
      status: 'Online', 
      lastSeen: 'Agora',
      cpu: 12,
      ram: 20,
      os: 'Raspbian',
      description: 'Automação residencial'
    }
  ];

  const filteredAgents = useMemo(() => {
    return agents.filter(agent => {
      const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           agent.token.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'todos' || agent.status.toLowerCase() === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, filterStatus]);

  const handleOpenSettings = (agent: any) => {
    setSelectedAgent(agent);
    setSettingsOpen(true);
  };

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: '800', mb: 1 }}>
            Agentes Conectados
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {agents.filter(a => a.status === 'Online').length} agentes online no momento.
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={handleDownloadWorker}
          sx={{ borderRadius: '12px', fontWeight: '700' }}
        >
          Novo Agente
        </Button>
      </Stack>

      {/* Filtros e Busca */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 4, justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack direction="row" spacing={2} sx={{ width: { xs: '100%', md: 'auto' }, flexGrow: 1 }}>
          <TextField 
            placeholder="Buscar por nome ou token..." 
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
          <ToggleButtonGroup
            value={filterStatus}
            exclusive
            onChange={(e, val) => val && setFilterStatus(val)}
            size="small"
            sx={{ bgcolor: 'background.paper', borderRadius: '12px', p: 0.5 }}
          >
            <ToggleButton value="todos" sx={{ border: 'none', borderRadius: '8px !important', px: 2, fontWeight: '700' }}>Todos</ToggleButton>
            <ToggleButton value="online" sx={{ border: 'none', borderRadius: '8px !important', px: 2, fontWeight: '700' }}>Online</ToggleButton>
            <ToggleButton value="offline" sx={{ border: 'none', borderRadius: '8px !important', px: 2, fontWeight: '700' }}>Offline</ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(e, val) => val && setViewMode(val)}
          size="small"
          sx={{ bgcolor: 'background.paper', borderRadius: '12px', p: 0.5 }}
        >
          <ToggleButton value="grid" sx={{ border: 'none', borderRadius: '8px !important' }}>
            <ViewModuleIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="list" sx={{ border: 'none', borderRadius: '8px !important' }}>
            <ViewListIcon fontSize="small" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <Grid container spacing={3}>
          {filteredAgents.map((agent) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={agent.id}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  borderRadius: '24px', 
                  bgcolor: '#000000', 
                  border: '1px solid',
                  borderColor: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  position: 'relative'
                }}
              >
                <Stack spacing={3}>
                  <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                      <Box sx={{ p: 1.5, borderRadius: '16px', bgcolor: 'rgba(89, 138, 235, 0.1)', display: 'flex' }}>
                        {agent.status === 'Online' ? <SensorsIcon sx={{ color: '#598AEB' }} /> : <SensorsOffIcon sx={{ color: 'error.main' }} />}
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: '700' }}>{agent.name}</Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>{agent.os}</Typography>
                      </Box>
                    </Stack>
                    <IconButton onClick={() => handleOpenSettings(agent)} size="small" sx={{ color: 'rgba(255,255,255,0.3)' }}>
                      <SettingsIcon fontSize="small" />
                    </IconButton>
                  </Stack>

                  <Stack spacing={2}>
                    <Box>
                      <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="caption" sx={{ fontWeight: '600' }}>CPU</Typography>
                        <Typography variant="caption" sx={{ color: '#598AEB', fontWeight: '700' }}>{agent.cpu}%</Typography>
                      </Stack>
                      <LinearProgress variant="determinate" value={agent.cpu} sx={{ height: 6, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.05)', '& .MuiLinearProgress-bar': { bgcolor: '#598AEB' } }} />
                    </Box>
                    <Box>
                      <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="caption" sx={{ fontWeight: '600' }}>RAM</Typography>
                        <Typography variant="caption" sx={{ color: '#598AEB', fontWeight: '700' }}>{agent.ram}%</Typography>
                      </Stack>
                      <LinearProgress variant="determinate" value={agent.ram} sx={{ height: 6, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.05)', '& .MuiLinearProgress-bar': { bgcolor: '#598AEB' } }} />
                    </Box>
                  </Stack>

                  <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', pt: 2, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>Visto: {agent.lastSeen}</Typography>
                    <IconButton size="small" sx={{ color: '#598AEB' }}>
                      <RestartAltIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '16px', border: '1px solid', borderColor: 'divider', bgcolor: '#000000', color: 'white' }}>
          <Table>
            <TableHead sx={{ bgcolor: 'rgba(255,255,255,0.02)' }}>
              <TableRow>
                <TableCell sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: '700' }}>Agente</TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: '700' }}>Status</TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: '700' }}>CPU / RAM</TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: '700' }}>OS</TableCell>
                <TableCell align="right" sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: '700' }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAgents.map((agent) => (
                <TableRow key={agent.id} sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.03)' } }}>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: '700', color: 'white' }}>{agent.name}</Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>{agent.token.substring(0, 10)}...</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={agent.status} size="small" sx={{ bgcolor: agent.status === 'Online' ? 'rgba(89, 138, 235, 0.2)' : 'rgba(211, 47, 47, 0.2)', color: agent.status === 'Online' ? '#598AEB' : '#f44336', fontWeight: '800' }} />
                  </TableCell>
                  <TableCell sx={{ width: 200 }}>
                    <Stack spacing={1}>
                      <LinearProgress variant="determinate" value={agent.cpu} sx={{ height: 4, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.05)', '& .MuiLinearProgress-bar': { bgcolor: '#598AEB' } }} />
                      <LinearProgress variant="determinate" value={agent.ram} sx={{ height: 4, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.05)', '& .MuiLinearProgress-bar': { bgcolor: '#4A72C2' } }} />
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ color: 'rgba(255,255,255,0.7)' }}>{agent.os}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
                      <IconButton size="small" onClick={() => handleOpenSettings(agent)} sx={{ color: 'rgba(255,255,255,0.4)' }}><SettingsIcon fontSize="small" /></IconButton>
                      <IconButton size="small" sx={{ color: '#598AEB' }}><RestartAltIcon fontSize="small" /></IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Settings Modal */}
      <Dialog 
        open={settingsOpen} 
        onClose={() => setSettingsOpen(false)}
        slotProps={{
          paper: { sx: { borderRadius: '24px', p: 2, bgcolor: '#121212', color: 'white', minWidth: 400 } }
        }}
      >
        <DialogTitle sx={{ fontWeight: '800' }}>Configurações do Agente</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField 
              label="Nome do Agente" 
              fullWidth 
              defaultValue={selectedAgent?.name}
              slotProps={{
                inputLabel: { sx: { color: 'rgba(255,255,255,0.5)' } },
                input: { sx: { color: 'white', borderRadius: '12px' } }
              }}
            />
            <TextField 
              label="Descrição" 
              fullWidth 
              multiline 
              rows={3} 
              defaultValue={selectedAgent?.description}
              slotProps={{
                inputLabel: { sx: { color: 'rgba(255,255,255,0.5)' } },
                input: { sx: { color: 'white', borderRadius: '12px' } }
              }}
            />
            <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', display: 'block', mb: 1 }}>TOKEN DE ACESSO</Typography>
              <Typography variant="body2" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>{selectedAgent?.token}</Typography>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setSettingsOpen(false)} sx={{ color: 'text.secondary' }}>Cancelar</Button>
          <Button variant="contained" onClick={() => setSettingsOpen(false)}>Salvar Alterações</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
