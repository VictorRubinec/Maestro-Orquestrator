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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import styles from './Login.module.css';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <Box className={styles.loginPage}>
      <Button 
        startIcon={<ChevronLeftIcon />} 
        className={styles.backButton}
        onClick={() => router.push('/')}
        sx={{ color: 'primary.main', zIndex: 1 }}
      >
        Voltar para o site
      </Button>

      <Container maxWidth="xs" sx={{ zIndex: 1 }}>
        <Paper elevation={0} className={styles.loginCard}>
          <Stack spacing={3} sx={{ alignItems: 'center' }}>
            <Box className={styles.iconWrapper}>
              <LockOutlinedIcon sx={{ color: 'primary.main' }} />
            </Box>
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: '800', color: 'white' }}>
                Bem-vindo de volta
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                Acesse sua conta para gerenciar seus agentes
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleLogin} sx={{ width: '100%', mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                autoFocus
                variant="outlined"
                slotProps={{
                  inputLabel: { sx: { color: 'rgba(255,255,255,0.7)' } },
                  input: { sx: { color: 'white' } }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                    '&:hover fieldset': { borderColor: 'primary.main' },
                  }
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                slotProps={{
                  inputLabel: { sx: { color: 'rgba(255,255,255,0.7)' } },
                  input: { 
                    sx: { color: 'white' },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: 'rgba(255,255,255,0.7)' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                    '&:hover fieldset': { borderColor: 'primary.main' },
                  }
                }}
              />
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                <Link href="#" variant="body2" sx={{ color: 'primary.main', textDecoration: 'none' }}>
                  Esqueceu a senha?
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                className={styles.submitBtn}
                sx={{ mt: 4, fontWeight: '700' }}
              >
                Entrar no Maestro
              </Button>
            </Box>

            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
              Não tem uma conta?{' '}
              <Link href="#" sx={{ color: 'primary.main', fontWeight: '600', textDecoration: 'none' }}>
                Cadastre-se agora
              </Link>
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
