'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  MenuItem, 
  Stack, 
  IconButton,
  Divider,
  Tooltip,
  Tabs,
  Tab,
  Link,
  Paper,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
  Chip,
  Collapse,
  Switch,
  FormControlLabel
} from '@mui/material';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SensorsIcon from '@mui/icons-material/Sensors';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FolderIcon from '@mui/icons-material/Folder';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TerminalIcon from '@mui/icons-material/Terminal';

interface NewAutomationModalProps {
  open: boolean;
  onClose: () => void;
}

const RUNTIMES = [
  { label: 'Python', value: 'python', preset: 'python main.py' },
  { label: 'Node.js', value: 'node', preset: 'node index.js' },
  { label: 'Shell Script', value: 'shell', preset: './script.sh' },
  { label: 'PowerShell', value: 'powershell', preset: 'powershell -File script.ps1' },
];

const AVAILABLE_AGENTS = [
  { id: 'victor-pc', name: 'Victor-Workstation (Online)' },
  { id: 'server-01', name: 'Server-Production-01 (Offline)' },
  { id: 'raspberry-pi', name: 'Raspberry-PI-Home (Online)' },
];

const NewAutomationModal: React.FC<NewAutomationModalProps> = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  
  // States: Informações
  const [runtime, setRuntime] = useState('python');
  const [commandLine, setCommandLine] = useState('');
  
  // States: Agentes
  const [selectedAgents, setSelectedAgents] = useState([{ agentId: 'victor-pc', path: 'C:\\Automations\\MyScript' }]);

  // States: Parâmetros
  const [params, setParams] = useState([
    { id: 1, key: 'Ambiente', command: '-env', type: 'text', value: 'prod', value2: '', description: 'Define o ambiente' }
  ]);
  const [expandedParams, setExpandedParams] = useState<number[]>([1]);

  // States: Agendamento (Múltiplos)
  const [schedules, setSchedules] = useState([
    { 
      id: 1, type: 'weekly', agents: ['victor-pc'], selectedDays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
      monthlyDays: [] as string[], specificDates: [] as string[], frequencyMode: 'period', 
      startTime: '08:00', endTime: '18:00', interval: '30', fixedTimes: [] as string[]
    }
  ]);
  const [expandedSchedules, setExpandedSchedules] = useState<number[]>([1]);
  
  // Cálculo da Prévia do Comando
  const fullCommandPreview = useMemo(() => {
    let cmd = commandLine;
    params.forEach(p => {
      if (p.command) {
        if (p.type === 'flag') {
          cmd += ` ${p.command}`;
        } else if (p.type === 'date_range') {
          cmd += ` ${p.command} ${p.value || 'DATA1'} ${p.value2 || 'DATA2'}`;
        } else {
          cmd += ` ${p.command} ${p.value || 'VALOR'}`;
        }
      }
    });
    return cmd;
  }, [commandLine, params]);

  const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

  const toggleExpandSchedule = (id: number) => {
    setExpandedSchedules(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleExpandParam = (id: number) => {
    setExpandedParams(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const markAllDays = (scheduleId: number, type: 'all' | 'work') => {
    setSchedules(prev => prev.map(s => {
      if (s.id === scheduleId) {
        const days = type === 'all' ? [...daysOfWeek] : ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];
        return { ...s, selectedDays: days };
      }
      return s;
    }));
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    const selected = RUNTIMES.find(r => r.value === runtime);
    if (selected) setCommandLine(selected.preset);
  }, [runtime]);

  const addAgent = () => setSelectedAgents([...selectedAgents, { agentId: '', path: '' }]);
  const removeAgent = (index: number) => setSelectedAgents(selectedAgents.filter((_, i) => i !== index));
  const updateAgent = (index: number, field: string, value: string) => {
    const newAgents = [...selectedAgents];
    (newAgents[index] as any)[field] = value;
    setSelectedAgents(newAgents);
  };

  const addParam = () => {
    const id = Date.now();
    setParams([...params, { id, key: '', command: '', type: 'text', value: '', value2: '', description: '' }]);
    setExpandedParams([...expandedParams, id]);
  };
  const removeParam = (id: number) => setParams(params.filter(p => p.id !== id));
  const updateParam = (id: number, field: string, value: any) => {
    setParams(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const addSchedule = () => {
    const id = Date.now();
    setSchedules([...schedules, { 
      id, type: 'weekly', agents: [], selectedDays: [], monthlyDays: [], specificDates: [],
      frequencyMode: 'period', startTime: '08:00', endTime: '18:00', interval: '60', fixedTimes: []
    }]);
    setExpandedSchedules([...expandedSchedules, id]);
  };
  
  const removeSchedule = (id: number) => setSchedules(schedules.filter(s => s.id !== id));
  const updateSchedule = (id: number, field: string, value: any) => {
    setSchedules(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const toggleDay = (scheduleId: number, day: string) => {
    setSchedules(prev => prev.map(s => {
      if (s.id === scheduleId) {
        const days = s.selectedDays.includes(day) ? s.selectedDays.filter(d => d !== day) : [...s.selectedDays, day];
        return { ...s, selectedDays: days };
      }
      return s;
    }));
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      slotProps={{
        paper: { 
          sx: { 
            borderRadius: '24px', 
            bgcolor: '#121212', 
            color: 'white', 
            border: '1px solid rgba(255,255,255,0.08)',
            minHeight: '650px'
          } 
        }
      }}
    >
      <DialogTitle component="div" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 4, pt: 3, pb: 0 }}>
        <Typography variant="h5" sx={{ fontWeight: '800' }}>Configurar Automação</Typography>
        <IconButton onClick={onClose} sx={{ color: 'rgba(255,255,255,0.3)' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Box sx={{ px: 4, mt: 2 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          sx={{ 
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            '& .MuiTab-root': { color: 'rgba(255,255,255,0.4)', textTransform: 'none', fontWeight: '700', fontSize: '0.95rem' },
            '& .Mui-selected': { color: '#598AEB !important' },
            '& .MuiTabs-indicator': { bgcolor: '#598AEB' }
          }}
        >
          <Tab icon={<AssignmentIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Informações" />
          <Tab icon={<SensorsIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Agentes" />
          <Tab icon={<SettingsInputComponentIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Parâmetros" />
          <Tab icon={<CalendarMonthIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Agendamento" />
        </Tabs>
      </Box>

      <DialogContent sx={{ 
        px: 4, 
        py: 3,
        /* Custom Scrollbar */
        '&::-webkit-scrollbar': { width: '6px' },
        '&::-webkit-scrollbar-track': { background: 'transparent' },
        '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }
      }}>
        {activeTab === 0 && (
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Nome da Automação"
              placeholder="Ex: Backup Diário de Notas Fiscais"
              slotProps={{
                inputLabel: { sx: { color: 'rgba(255,255,255,0.4)' } },
                input: { sx: { color: 'white', borderRadius: '14px', bgcolor: 'rgba(255,255,255,0.02)' } }
              }}
            />
            <TextField
              select
              fullWidth
              label="Runtime (Linguagem)"
              value={runtime}
              onChange={(e) => setRuntime(e.target.value)}
              slotProps={{
                inputLabel: { sx: { color: 'rgba(255,255,255,0.4)' } },
                input: { sx: { color: 'white', borderRadius: '14px', bgcolor: 'rgba(255,255,255,0.02)' } }
              }}
            >
              {RUNTIMES.map((option) => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              ))}
            </TextField>
            <Box>
              <Typography variant="overline" sx={{ color: '#598AEB', fontWeight: '800' }}>Comando Base</Typography>
              <TextField
                fullWidth
                value={commandLine}
                onChange={(e) => setCommandLine(e.target.value)}
                multiline
                rows={2}
                slotProps={{
                  input: { sx: { color: 'white', borderRadius: '14px', fontFamily: 'monospace', bgcolor: 'rgba(255,255,255,0.03)', mt: 1 } }
                }}
              />
            </Box>
          </Stack>
        )}

        {activeTab === 1 && (
          <Stack spacing={3}>
            <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: '800', color: 'white' }}>Seleção de Agentes</Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>Especifique o caminho da automação em cada máquina.</Typography>
              </Box>
              <Button startIcon={<AddIcon />} onClick={addAgent} size="small" sx={{ textTransform: 'none', borderRadius: '8px' }}>Adicionar Agente</Button>
            </Stack>
            
            <Stack spacing={2}>
              {selectedAgents.map((item, index) => (
                <Paper key={index} sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                    <Grid size={{ xs: 12, md: 5 }}>
                      <TextField
                        select
                        fullWidth
                        size="small"
                        label="Agente"
                        value={item.agentId}
                        onChange={(e) => updateAgent(index, 'agentId', e.target.value)}
                        slotProps={{
                          inputLabel: { sx: { color: 'rgba(255,255,255,0.4)' } },
                          input: { sx: { color: 'white', borderRadius: '10px' } }
                        }}
                      >
                        {AVAILABLE_AGENTS.filter(agent => 
                          !selectedAgents.some((sa, i) => i !== index && sa.agentId === agent.id)
                        ).map(agent => (
                          <MenuItem key={agent.id} value={agent.id}>{agent.name}</MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Caminho da Pasta"
                        placeholder="C:\Maestro\Scripts\..."
                        value={item.path}
                        onChange={(e) => updateAgent(index, 'path', e.target.value)}
                        slotProps={{
                          inputLabel: { sx: { color: 'rgba(255,255,255,0.4)' } },
                          input: { 
                            sx: { color: 'white', borderRadius: '10px' },
                            startAdornment: <FolderIcon sx={{ fontSize: 18, mr: 1, color: 'rgba(255,255,255,0.2)' }} />
                          }
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 1 }}>
                      <IconButton color="error" onClick={() => removeAgent(index)} disabled={selectedAgents.length === 1} size="small">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Stack>
          </Stack>
        )}

        {activeTab === 2 && (
          <Stack spacing={3}>
            {/* Prévia do Comando */}
            <Paper sx={{ p: 2, bgcolor: 'black', borderRadius: '16px', border: '1px solid rgba(89, 138, 235, 0.2)', borderLeft: '4px solid #598AEB' }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
                <TerminalIcon sx={{ fontSize: 16, color: '#598AEB' }} />
                <Typography variant="caption" sx={{ fontWeight: '800', color: '#598AEB', letterSpacing: 1 }}>PRÉVIA DO COMANDO CLI</Typography>
              </Stack>
              <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'rgba(255,255,255,0.8)', wordBreak: 'break-all' }}>
                {fullCommandPreview}
              </Typography>
            </Paper>

            <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: '800', color: 'white' }}>Parâmetros do Processo</Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>Configure como os argumentos serão montados.</Typography>
              </Box>
              <Button startIcon={<AddIcon />} onClick={addParam} size="small" sx={{ textTransform: 'none', borderRadius: '8px' }}>Novo Parâmetro</Button>
            </Stack>

            {params.map((param) => (
              <Paper key={param.id} sx={{ bgcolor: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                <Box 
                  onClick={() => toggleExpandParam(param.id)}
                  sx={{ 
                    p: 2, px: 3, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    bgcolor: expandedParams.includes(param.id) ? 'rgba(255,255,255,0.03)' : 'transparent',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
                  }}
                >
                  <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                    {expandedParams.includes(param.id) ? <ExpandMoreIcon sx={{ color: '#598AEB' }} /> : <ChevronRightIcon sx={{ color: 'rgba(255,255,255,0.3)' }} />}
                    <Typography variant="subtitle2" sx={{ fontWeight: '800', color: expandedParams.includes(param.id) ? 'white' : 'rgba(255,255,255,0.6)' }}>
                      {param.key || 'Novo Parâmetro'}
                    </Typography>
                    {param.type && <Chip label={param.type.replace('_', ' ').toUpperCase()} size="small" sx={{ height: 18, fontSize: '0.6rem', bgcolor: 'rgba(89, 138, 235, 0.1)', color: '#598AEB' }} />}
                  </Stack>
                  <IconButton 
                    size="small" 
                    onClick={(e) => { e.stopPropagation(); removeParam(param.id); }} 
                    disabled={params.length === 1}
                    sx={{ color: 'rgba(255,255,255,0.1)', '&:hover': { color: 'error.main' } }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>

                <Collapse in={expandedParams.includes(param.id)}>
                  <Box sx={{ p: 3, pt: 1 }}>
                    <Grid container spacing={2.5}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField 
                          fullWidth size="small" label="Nome amigável" 
                          value={param.key} onChange={(e) => updateParam(param.id, 'key', e.target.value)}
                          slotProps={{ inputLabel: { sx: { color: 'rgba(255,255,255,0.4)' } }, input: { sx: { borderRadius: '12px' } } }} 
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField 
                          fullWidth size="small" label="Argumento CLI (ex: -di)" 
                          value={param.command} onChange={(e) => updateParam(param.id, 'command', e.target.value)}
                          slotProps={{ inputLabel: { sx: { color: 'rgba(255,255,255,0.4)' } }, input: { sx: { borderRadius: '12px', fontFamily: 'monospace' } } }} 
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          select fullWidth size="small" label="Tipo de Dado"
                          value={param.type} onChange={(e) => updateParam(param.id, 'type', e.target.value)}
                          slotProps={{ input: { sx: { borderRadius: '12px' } } }}
                        >
                          <MenuItem value="text">Texto</MenuItem>
                          <MenuItem value="number">Número</MenuItem>
                          <MenuItem value="date">Data</MenuItem>
                          <MenuItem value="date_range">Duas Datas</MenuItem>
                          <MenuItem value="flag">Vazio (Apenas Flag)</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        {param.type === 'flag' ? (
                          <Box sx={{ height: '40px', display: 'flex', alignItems: 'center' }}>
                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>
                              Este parâmetro não requer valor (flag pura).
                            </Typography>
                          </Box>
                        ) : param.type === 'date_range' ? (
                          <Grid container spacing={1}>
                            <Grid size={{ xs: 6 }}>
                              <TextField 
                                fullWidth size="small" type="date" label="Início"
                                value={param.value} onChange={(e) => updateParam(param.id, 'value', e.target.value)}
                                slotProps={{ inputLabel: { shrink: true, sx: { fontSize: '0.7rem' } }, input: { sx: { borderRadius: '12px' } } }} 
                              />
                            </Grid>
                            <Grid size={{ xs: 6 }}>
                              <TextField 
                                fullWidth size="small" type="date" label="Fim"
                                value={param.value2} onChange={(e) => updateParam(param.id, 'value2', e.target.value)}
                                slotProps={{ inputLabel: { shrink: true, sx: { fontSize: '0.7rem' } }, input: { sx: { borderRadius: '12px' } } }} 
                              />
                            </Grid>
                          </Grid>
                        ) : (
                          <TextField 
                            fullWidth size="small" label="Valor Padrão" 
                            type={param.type === 'number' ? 'number' : param.type === 'date' ? 'date' : 'text'}
                            value={param.value} onChange={(e) => updateParam(param.id, 'value', e.target.value)}
                            slotProps={{ 
                              inputLabel: { shrink: param.type === 'date', sx: { color: 'rgba(255,255,255,0.4)' } }, 
                              input: { sx: { borderRadius: '12px' } } 
                            }} 
                          />
                        )}
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <TextField 
                          fullWidth size="small" label="Instrução/Descrição" 
                          value={param.description} onChange={(e) => updateParam(param.id, 'description', e.target.value)}
                          slotProps={{ inputLabel: { sx: { color: 'rgba(255,255,255,0.4)' } }, input: { sx: { borderRadius: '12px' } } }} 
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Collapse>
              </Paper>
            ))}
          </Stack>
        )}

        {activeTab === 3 && (
          <Stack spacing={4}>
            <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: '800', color: 'white' }}>Cronograma de Execução</Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>Defina quando e onde esta automação deve rodar.</Typography>
              </Box>
              <Button startIcon={<AddIcon />} onClick={addSchedule} size="small" sx={{ textTransform: 'none', borderRadius: '8px' }}>Novo Agendamento</Button>
            </Stack>

            {schedules.map((schedule) => (
              <Paper key={schedule.id} sx={{ bgcolor: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                <Box 
                  onClick={() => toggleExpandSchedule(schedule.id)}
                  sx={{ 
                    p: 2, px: 3, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    bgcolor: expandedSchedules.includes(schedule.id) ? 'rgba(255,255,255,0.03)' : 'transparent',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
                  }}
                >
                  <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                    {expandedSchedules.includes(schedule.id) ? <ExpandMoreIcon sx={{ color: '#598AEB' }} /> : <ChevronRightIcon sx={{ color: 'rgba(255,255,255,0.3)' }} />}
                    <Typography variant="subtitle2" sx={{ fontWeight: '800', color: expandedSchedules.includes(schedule.id) ? 'white' : 'rgba(255,255,255,0.6)' }}>
                      {schedule.type === 'weekly' ? 'Agendamento Semanal' : schedule.type === 'monthly' ? 'Agendamento Mensal' : 'Datas Específicas'}
                    </Typography>
                    {!expandedSchedules.includes(schedule.id) && (
                      <Chip label={`${schedule.agents.length} Agente(s)`} size="small" sx={{ height: 20, fontSize: '0.65rem', bgcolor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)' }} />
                    )}
                  </Stack>
                  <IconButton 
                    size="small" 
                    onClick={(e) => { e.stopPropagation(); removeSchedule(schedule.id); }} 
                    disabled={schedules.length === 1}
                    sx={{ color: 'rgba(255,255,255,0.1)', '&:hover': { color: 'error.main' } }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>

                <Collapse in={expandedSchedules.includes(schedule.id)}>
                  <Box sx={{ p: 3, pt: 1 }}>
                    <Stack spacing={3}>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: '800', mb: 1, color: 'rgba(255,255,255,0.8)' }}>Vincular aos Agentes</Typography>
                        <FormControl fullWidth size="small">
                          <InputLabel sx={{ color: 'rgba(255,255,255,0.4)' }}>Selecione os Agentes</InputLabel>
                          <Select
                            multiple
                            value={schedule.agents}
                            onChange={(e) => updateSchedule(schedule.id, 'agents', e.target.value)}
                            input={<OutlinedInput label="Selecione os Agentes" sx={{ borderRadius: '12px', color: 'white' }} />}
                            renderValue={(selected) => (
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                  <Chip key={value} label={AVAILABLE_AGENTS.find(a => a.id === value)?.name || value} size="small" sx={{ bgcolor: 'rgba(89, 138, 235, 0.2)', color: '#598AEB', fontWeight: '700' }} />
                                ))}
                              </Box>
                            )}
                          >
                            {selectedAgents.filter(a => a.agentId).map((a) => (
                              <MenuItem key={a.agentId} value={a.agentId}>
                                {AVAILABLE_AGENTS.find(aa => aa.id === a.agentId)?.name || a.agentId}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>

                      <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: '800', mb: 1, color: 'rgba(255,255,255,0.8)' }}>Tipo de agendamento</Typography>
                          <TextField
                            select fullWidth size="small" value={schedule.type}
                            onChange={(e) => updateSchedule(schedule.id, 'type', e.target.value)}
                            slotProps={{ input: { sx: { borderRadius: '12px', bgcolor: 'rgba(255,255,255,0.02)', color: 'white' } } }}
                          >
                            <MenuItem value="weekly">Dias da semana</MenuItem>
                            <MenuItem value="monthly">Dias do mês</MenuItem>
                            <MenuItem value="specific">Datas específicas</MenuItem>
                          </TextField>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: '800', mb: 1, color: 'rgba(255,255,255,0.8)' }}>Frequência</Typography>
                          <TextField
                            select fullWidth size="small" value={schedule.frequencyMode}
                            onChange={(e) => updateSchedule(schedule.id, 'frequencyMode', e.target.value)}
                            slotProps={{ input: { sx: { borderRadius: '12px', bgcolor: 'rgba(255,255,255,0.02)', color: 'white' } } }}
                          >
                            <MenuItem value="period">Por período</MenuItem>
                            <MenuItem value="fixed">Horários específicos</MenuItem>
                            <MenuItem value="allday">O dia todo</MenuItem>
                          </TextField>
                        </Grid>
                      </Grid>

                      {schedule.type === 'weekly' && (
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: '800', mb: 1.5, color: 'rgba(255,255,255,0.8)' }}>Selecione os dias da semana</Typography>
                          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                            {daysOfWeek.map(day => (
                              <Box 
                                key={day} onClick={() => toggleDay(schedule.id, day)}
                                sx={{ 
                                  px: 1.5, py: 0.8, borderRadius: '12px', cursor: 'pointer', border: '1px solid',
                                  borderColor: schedule.selectedDays.includes(day) ? '#598AEB' : 'rgba(255,255,255,0.1)',
                                  bgcolor: schedule.selectedDays.includes(day) ? 'rgba(89, 138, 235, 0.1)' : 'transparent',
                                  color: schedule.selectedDays.includes(day) ? '#598AEB' : 'rgba(255,255,255,0.5)',
                                  fontWeight: '700', fontSize: '0.8rem', transition: 'all 0.2s'
                                }}
                              >
                                {day}
                              </Box>
                            ))}
                          </Stack>
                          <Stack direction="row" spacing={2} sx={{ mt: 1.5 }}>
                            <Link component="button" variant="caption" onClick={() => markAllDays(schedule.id, 'work')} sx={{ fontWeight: '700', color: '#598AEB', textDecoration: 'none' }}>Marcar todos os dias úteis</Link>
                            <Link component="button" variant="caption" onClick={() => markAllDays(schedule.id, 'all')} sx={{ fontWeight: '700', color: '#598AEB', textDecoration: 'none' }}>Marcar todos</Link>
                          </Stack>
                        </Box>
                      )}

                      {schedule.type === 'monthly' && (
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: '800', mb: 1, color: 'rgba(255,255,255,0.8)' }}>Dias do mês</Typography>
                          <TextField fullWidth size="small" placeholder="Ex: 1, 15, 30" helperText="Separe por vírgula" slotProps={{ input: { sx: { borderRadius: '12px' } } }} />
                        </Box>
                      )}

                      {schedule.type === 'specific' && (
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: '800', mb: 1, color: 'rgba(255,255,255,0.8)' }}>Datas específicas</Typography>
                          <TextField fullWidth size="small" type="date" slotProps={{ inputLabel: { shrink: true }, input: { sx: { borderRadius: '12px' } } }} />
                        </Box>
                      )}

                      <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />
                      
                      {schedule.frequencyMode === 'period' && (
                        <Grid container spacing={2}>
                          <Grid size={{ xs: 4 }}>
                            <TextField fullWidth size="small" type="time" label="Início" value={schedule.startTime} onChange={(e) => updateSchedule(schedule.id, 'startTime', e.target.value)} slotProps={{ inputLabel: { shrink: true }, input: { sx: { borderRadius: '12px' } } }} />
                          </Grid>
                          <Grid size={{ xs: 4 }}>
                            <TextField fullWidth size="small" type="time" label="Fim" value={schedule.endTime} onChange={(e) => updateSchedule(schedule.id, 'endTime', e.target.value)} slotProps={{ inputLabel: { shrink: true }, input: { sx: { borderRadius: '12px' } } }} />
                          </Grid>
                          <Grid size={{ xs: 4 }}>
                            <TextField select fullWidth size="small" label="Intervalo" value={schedule.interval} onChange={(e) => updateSchedule(schedule.id, 'interval', e.target.value)} slotProps={{ input: { sx: { borderRadius: '12px' } } }}>
                              <MenuItem value="5">5 min</MenuItem>
                              <MenuItem value="15">15 min</MenuItem>
                              <MenuItem value="30">30 min</MenuItem>
                              <MenuItem value="60">1 hora</MenuItem>
                            </TextField>
                          </Grid>
                        </Grid>
                      )}

                      {schedule.frequencyMode === 'fixed' && (
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: '800', mb: 1, color: 'rgba(255,255,255,0.8)' }}>Horários específicos</Typography>
                          <TextField fullWidth size="small" placeholder="Ex: 08:00, 12:00" helperText="Separe por vírgula" slotProps={{ input: { sx: { borderRadius: '12px' } } }} />
                        </Box>
                      )}
                    </Stack>
                  </Box>
                </Collapse>
              </Paper>
            ))}
          </Stack>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 4, py: 3, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Button onClick={onClose} sx={{ color: 'rgba(255,255,255,0.4)', textTransform: 'none', fontWeight: '700' }}>Cancelar</Button>
        <Button variant="contained" sx={{ px: 5, borderRadius: '12px', fontWeight: '800', textTransform: 'none' }}>Salvar Automação</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewAutomationModal;
