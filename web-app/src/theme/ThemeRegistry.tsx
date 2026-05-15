'use client';

import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useMemo } from 'react';

const palette = {
  blue1: '#598AEB',
  blue2: '#4A72C2',
  blue3: '#3A5A99',
  blue4: '#2B4270',
  blue5: '#192742',
};

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: palette.blue1,
            dark: palette.blue2,
          },
          secondary: {
            main: palette.blue3,
          },
          background: {
            default: prefersDarkMode ? '#000000' : '#ffffff',
            paper: prefersDarkMode ? '#121212' : '#ffffff',
          },
        },
        typography: {
          fontFamily: '__Inter_aaf875, sans-serif', // Fallback for Inter
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600,
                padding: '10px 24px',
              },
            },
          },
        },
      }),
    [prefersDarkMode]
  );

  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
