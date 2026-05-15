'use client';

import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  Box, 
  Typography, 
  IconButton,
  Stack 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TerminalIcon from '@mui/icons-material/Terminal';
import styles from './TerminalModal.module.css';

interface TerminalModalProps {
  open: boolean;
  onClose: () => void;
  logs: string;
  jobName: string;
}

const TerminalModal: React.FC<TerminalModalProps> = ({ open, onClose, logs, jobName }) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      slotProps={{
        paper: {
          sx: { borderRadius: '16px', bgcolor: '#0c0c0c', color: '#00ff00' }
        }
      }}
    >
      <DialogTitle component="div" sx={{ 
        borderBottom: '1px solid rgba(255,255,255,0.1)', 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        py: 2
      }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <TerminalIcon sx={{ color: 'primary.main' }} />
          <Typography variant="subtitle1" sx={{ fontWeight: '700', color: 'white' }}>
            Terminal - {jobName}
          </Typography>
        </Stack>
        <IconButton onClick={onClose} size="small" sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ mt: 2, p: 0 }}>
        <Box className={styles.terminalBody}>
          <pre className={styles.pre}>
            {logs || 'Aguardando saída do agente...'}
          </pre>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default TerminalModal;
