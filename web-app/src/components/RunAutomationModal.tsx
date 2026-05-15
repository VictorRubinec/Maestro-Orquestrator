'use client';

import React, { useState } from 'react';
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
  FormControlLabel,
  Switch,
  Chip
} from '@mui/material';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SensorsIcon from '@mui/icons-material/Sensors';
import SettingsIcon from '@mui/icons-material/Settings';

interface Parameter {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'date_range' | 'flag';
  description?: string;
  defaultValue?: any;
}

interface RunAutomationModalProps {
  open: boolean;
  onClose: () => void;
  automationName: string;
  agents: { id: string, name: string }[];
  params: Parameter[];
}

const RunAutomationModal: React.FC<RunAutomationModalProps> = ({ 
  open, 
  onClose, 
  automationName, 
  agents, 
  params 
}) => {
  const [selectedAgent, setSelectedAgent] = useState(agents[0]?.id || '');

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      slotProps={{
        paper: { 
          sx: { 
            borderRadius: '24px', 
            bgcolor: '#0A0A0A', 
            color: 'white', 
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
          } 
        }
      }}
    >
      <DialogTitle component="div" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 4, py: 3 }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Box sx={{ p: 1, borderRadius: '12px', bgcolor: 'rgba(76, 175, 80, 0.1)', color: '#4caf50', display: 'flex' }}>
            <PlayArrowIcon />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: '800', lineHeight: 1.2 }}>Executar Automação</Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>{automationName}</Typography>
          </Box>
        </Stack>
        <IconButton onClick={onClose} sx={{ color: 'rgba(255,255,255,0.3)' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ 
        px: 4, 
        py: 1,
        maxHeight: '60vh',
        /* Custom Scrollbar */
        '&::-webkit-scrollbar': { width: '6px' },
        '&::-webkit-scrollbar-track': { background: 'transparent' },
        '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.1)', borderRadius: '10px' },
        '&::-webkit-scrollbar-thumb:hover': { background: 'rgba(255,255,255,0.2)' }
      }}>
        <Stack spacing={4}>
          {/* Escolha do Agente */}
          <Box>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 2 }}>
              <SensorsIcon sx={{ fontSize: 18, color: '#598AEB' }} />
              <Typography variant="subtitle2" sx={{ fontWeight: '800' }}>Agente de Execução</Typography>
            </Stack>
            <TextField
              select
              fullWidth
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
              slotProps={{
                input: { sx: { borderRadius: '14px', bgcolor: 'rgba(255,255,255,0.03)', color: 'white' } }
              }}
            >
              {agents.map(agent => (
                <MenuItem key={agent.id} value={agent.id}>{agent.name}</MenuItem>
              ))}
            </TextField>
          </Box>

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />

          {/* Parâmetros Dinâmicos */}
          <Box>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 2 }}>
              <SettingsIcon sx={{ fontSize: 18, color: '#598AEB' }} />
              <Typography variant="subtitle2" sx={{ fontWeight: '800' }}>Parâmetros da Task</Typography>
            </Stack>
            
            <Stack spacing={3}>
              {params.map((param) => (
                <Box key={param.id}>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', mb: 1, display: 'block', fontWeight: '700' }}>
                    {param.name.toUpperCase()} {param.description && `• ${param.description}`}
                  </Typography>

                  {param.type === 'text' && (
                    <TextField fullWidth placeholder="Digite o texto..." slotProps={{ input: { sx: { borderRadius: '12px', color: 'white' } } }} />
                  )}

                  {param.type === 'number' && (
                    <TextField fullWidth type="number" placeholder="0" slotProps={{ input: { sx: { borderRadius: '12px', color: 'white' } } }} />
                  )}

                  {param.type === 'date' && (
                    <TextField fullWidth type="date" slotProps={{ inputLabel: { shrink: true }, input: { sx: { borderRadius: '12px', color: 'white' } } }} />
                  )}

                  {param.type === 'date_range' && (
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 6 }}>
                        <TextField fullWidth type="date" label="Início" slotProps={{ inputLabel: { shrink: true }, input: { sx: { borderRadius: '12px', color: 'white' } } }} />
                      </Grid>
                      <Grid size={{ xs: 6 }}>
                        <TextField fullWidth type="date" label="Fim" slotProps={{ inputLabel: { shrink: true }, input: { sx: { borderRadius: '12px', color: 'white' } } }} />
                      </Grid>
                    </Grid>
                  )}

                  {param.type === 'flag' && (
                    <FormControlLabel 
                      control={<Switch color="primary" />} 
                      label={<Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>Ativar flag ({param.name})</Typography>} 
                    />
                  )}
                </Box>
              ))}
            </Stack>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 4, py: 3, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Button onClick={onClose} sx={{ color: 'rgba(255,255,255,0.4)', textTransform: 'none', fontWeight: '700' }}>Cancelar</Button>
        <Button 
          variant="contained" 
          fullWidth
          startIcon={<PlayArrowIcon />}
          sx={{ 
            px: 4, 
            borderRadius: '14px', 
            fontWeight: '800', 
            textTransform: 'none',
            bgcolor: '#4caf50',
            '&:hover': { bgcolor: '#43a047' }
          }}
        >
          Iniciar Agora
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RunAutomationModal;
