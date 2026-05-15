'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Stack, 
  Link,
  IconButton,
  InputAdornment
} from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#000000', position: 'relative', overflow: 'hidden' }}>
      {/* Background Glows */}
      <Box sx={{ position: 'absolute', top: -150, left: -150, width: 400, height: 400, bgcolor: 'rgba(89, 138, 235, 0.08)', filter: 'blur(100px)', pointerEvents: 'none' }} />
      <Box sx={{ position: 'absolute', bottom: -150, right: -150, width: 400, height: 400, bgcolor: 'rgba(76, 175, 80, 0.05)', filter: 'blur(100px)', pointerEvents: 'none' }} />

      <Button 
        startIcon={<ChevronLeftIcon />} 
        onClick={() => router.push('/')}
        sx={{ position: 'absolute', top: 30, left: 30, color: 'rgba(255,255,255,0.4)', textTransform: 'none', fontWeight: '700', '&:hover': { color: 'white' } }}
      >
        Voltar para o site
      </Button>

      <Container maxWidth="xs" sx={{ zIndex: 1 }}>
        <Paper elevation={0} sx={{ p: 5, borderRadius: '32px', bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <Stack spacing={4} sx={{ alignItems: 'center' }}>
            <Box sx={{ width: 60, height: 60, borderRadius: '18px', bgcolor: 'rgba(89, 138, 235, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PersonAddAlt1Icon sx={{ color: '#598AEB', fontSize: 32 }} />
            </Box>
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: '900', color: 'white', letterSpacing: -1 }}>
                Criar Conta
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mt: 1 }}>
                Comece sua jornada na orquestração hoje.
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleRegister} sx={{ width: '100%' }}>
              <Stack spacing={2.5}>
                <TextField
                  required
                  fullWidth
                  label="Nome Completo"
                  placeholder="Seu nome"
                  variant="outlined"
                  slotProps={{
                    inputLabel: { sx: { color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' } },
                    input: { sx: { color: 'white', borderRadius: '14px', bgcolor: 'rgba(255,255,255,0.02)' } }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                      '&:hover fieldset': { borderColor: '#598AEB' },
                      '&.Mui-focused fieldset': { borderColor: '#598AEB' }
                    }
                  }}
                />
                <TextField
                  required
                  fullWidth
                  label="E-mail Corporativo"
                  placeholder="exemplo@empresa.com"
                  variant="outlined"
                  slotProps={{
                    inputLabel: { sx: { color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' } },
                    input: { sx: { color: 'white', borderRadius: '14px', bgcolor: 'rgba(255,255,255,0.02)' } }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                      '&:hover fieldset': { borderColor: '#598AEB' },
                      '&.Mui-focused fieldset': { borderColor: '#598AEB' }
                    }
                  }}
                />
                <TextField
                  required
                  fullWidth
                  label="Senha"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  slotProps={{
                    inputLabel: { sx: { color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' } },
                    input: { 
                      sx: { color: 'white', borderRadius: '14px', bgcolor: 'rgba(255,255,255,0.02)' },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} sx={{ color: 'rgba(255,255,255,0.3)' }}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                      '&:hover fieldset': { borderColor: '#598AEB' },
                      '&.Mui-focused fieldset': { borderColor: '#598AEB' }
                    }
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ 
                    mt: 2, 
                    py: 1.8, 
                    borderRadius: '14px', 
                    fontWeight: '900', 
                    bgcolor: '#598AEB', 
                    textTransform: 'none',
                    fontSize: '1rem',
                    boxShadow: '0 10px 30px rgba(89, 138, 235, 0.2)',
                    '&:hover': { bgcolor: '#4A72C2' }
                  }}
                >
                  Criar minha conta
                </Button>
              </Stack>
            </Box>

            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)' }}>
              Já tem uma conta?{' '}
              <Link onClick={() => router.push('/login')} sx={{ color: '#598AEB', fontWeight: '800', cursor: 'pointer', textDecoration: 'none' }}>
                Fazer login
              </Link>
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
