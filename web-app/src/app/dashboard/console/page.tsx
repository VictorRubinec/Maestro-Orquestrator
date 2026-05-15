'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Stack, 
  IconButton, 
  Chip,
  Divider,
  InputBase,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import TerminalIcon from '@mui/icons-material/Terminal';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SearchIcon from '@mui/icons-material/Search';
import SensorsIcon from '@mui/icons-material/Sensors';

export default function ConsolePage() {
  const [selectedAgent, setSelectedAgent] = useState('all');
  const [isPaused, setIsPaused] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const agents = [
    { id: 'all', name: 'Todos os Agentes' },
    { id: 'VICTOR-PC', name: 'Victor-PC' },
    { id: 'SERVER-01', name: 'Server-Production-01' },
    { id: 'RASPBERRY-PI', name: 'Raspberry-PI-Home' },
  ];

  // Simulated log generation
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        const time = new Date().toLocaleTimeString('pt-BR', { hour12: false });
        const randomAgentObj = agents[Math.floor(Math.random() * (agents.length - 1)) + 1];
        
        // If an agent is selected, only generate for that one (or skip if random doesn't match)
        if (selectedAgent !== 'all' && randomAgentObj.id !== selectedAgent) return;

        const messages = [
          `Heartbeat received. CPU: ${Math.floor(Math.random() * 100)}% | RAM: ${Math.random().toFixed(1)}GB`,
          'Idle - Waiting for instructions.',
          'Checking directory /mnt/automations...',
          `[STDOUT] Line ${Math.floor(Math.random() * 1000)}: Process running...`,
          '[DEBUG] Socket connection stable.',
          '[INFO] Scanning for file changes...'
        ];
        const msg = messages[Math.floor(Math.random() * messages.length)];
        
        setLogs(prev => [...prev.slice(-99), `[${time}] [${randomAgentObj.id}] ${msg}`]);
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isPaused, selectedAgent]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const clearLogs = () => setLogs([]);

  return (
    <Box sx={{ height: 'calc(100vh - 140px)', display: 'flex', flexDirection: 'column' }}>
      <Stack direction={{ xs: 'column', md: 'row' }} sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, mb: 3, gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: '900', color: 'white' }}>Live Console</Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)' }}>Logs em tempo real da infraestrutura.</Typography>
        </Box>
        
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', width: { xs: '100%', md: 'auto' } }}>
          {/* Machine Selector */}
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <Select
              value={selectedAgent}
              onChange={(e) => {
                setSelectedAgent(e.target.value);
                clearLogs();
              }}
              displayEmpty
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.03)', 
                color: 'white', 
                borderRadius: '12px',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.1)' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#598AEB' },
                fontSize: '0.85rem',
                fontWeight: '700'
              }}
              renderValue={(value) => {
                const agent = agents.find(a => a.id === value);
                return (
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <SensorsIcon sx={{ fontSize: 16, color: '#598AEB' }} />
                    <Typography variant="body2" sx={{ fontWeight: '700' }}>{agent?.name}</Typography>
                  </Stack>
                );
              }}
            >
              {agents.map((agent) => (
                <MenuItem key={agent.id} value={agent.id} sx={{ fontSize: '0.85rem', fontWeight: '600' }}>
                  {agent.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Stack direction="row" spacing={1}>
            <IconButton size="small" onClick={() => setIsPaused(!isPaused)} sx={{ color: isPaused ? '#ff9800' : '#598AEB' }}>
              {isPaused ? <PlayCircleIcon /> : <PauseCircleIcon />}
            </IconButton>
            <IconButton size="small" onClick={clearLogs} sx={{ color: 'rgba(255,255,255,0.3)' }}><DeleteSweepIcon /></IconButton>
          </Stack>
        </Stack>
      </Stack>

      <Paper 
        sx={{ 
          flexGrow: 1, 
          bgcolor: '#000000', 
          borderRadius: '24px', 
          border: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Terminal Toolbar */}
        <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row" spacing={3}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ff5f56' }} />
              <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ffbd2e' }} />
              <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#27c93f' }} />
            </Box>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace' }}>
              maestro@orchestrator:~/logs/{selectedAgent.toLowerCase()}
            </Typography>
          </Stack>
          <Box sx={{ bgcolor: 'rgba(255,255,255,0.03)', px: 2, borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
            <SearchIcon sx={{ fontSize: 16, color: 'rgba(255,255,255,0.2)', mr: 1 }} />
            <InputBase placeholder="Filtrar console..." sx={{ color: 'white', fontSize: '0.75rem', width: 150 }} />
          </Box>
        </Box>

        {/* Terminal Content */}
        <Box 
          ref={scrollRef}
          sx={{ 
            p: 3, 
            flexGrow: 1, 
            overflowY: 'auto',
            fontFamily: 'monospace',
            fontSize: '0.85rem',
            lineHeight: 1.6,
            '&::-webkit-scrollbar': { width: '6px' },
            '&::-webkit-scrollbar-track': { background: 'transparent' },
            '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }
          }}
        >
          {logs.length === 0 ? (
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.2)', display: 'block', textAlign: 'center', mt: 4 }}>
              Aguardando logs do agente {selectedAgent === 'all' ? 'selecionado' : selectedAgent}...
            </Typography>
          ) : (
            logs.map((log, i) => {
              const isSystem = log.includes('[SYSTEM]');
              const isError = log.includes('Falhou') || log.includes('ERROR');
              return (
                <Box key={i} sx={{ display: 'flex', gap: 1.5, mb: 0.5, color: isSystem ? '#598AEB' : isError ? '#f44336' : 'rgba(255,255,255,0.8)' }}>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.2)', minWidth: 70, userSelect: 'none' }}>
                    {log.split(']')[0].replace('[', '')}
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: '800', minWidth: 100, userSelect: 'none', color: isSystem ? '#598AEB' : '#598AEB' }}>
                    {log.split(']')[1].replace('[', '')}
                  </Typography>
                  <Typography variant="caption" sx={{ flexGrow: 1 }}>
                    {log.split(']')[2]?.trim() || log.split(']')[1]?.trim()}
                  </Typography>
                </Box>
              );
            })
          )}
        </Box>
      </Paper>
    </Box>
  );
}
