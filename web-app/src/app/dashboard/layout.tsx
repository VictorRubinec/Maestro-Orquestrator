'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Drawer, 
  AppBar, 
  Toolbar, 
  List, 
  Typography, 
  Divider, 
  IconButton, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Avatar,
  Stack
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import SensorsIcon from '@mui/icons-material/Sensors';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import TerminalIcon from '@mui/icons-material/Terminal';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings';
import { useRouter, usePathname } from 'next/navigation';

const drawerWidth = 280;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { text: 'Visão Geral', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Automações', icon: <PrecisionManufacturingIcon />, path: '/dashboard/automations' },
    { text: 'Live Console', icon: <TerminalIcon />, path: '/dashboard/console' },
    { text: 'Calendário', icon: <CalendarMonthIcon />, path: '/dashboard/calendar' },
    { text: 'Agentes', icon: <SensorsIcon />, path: '/dashboard/agents' },
    { text: 'Relatórios & ROI', icon: <AssessmentIcon />, path: '/dashboard/reports' },
    { text: 'Notificações', icon: <SettingsIcon />, path: '/dashboard/settings' },
  ];

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: '800', color: 'primary' }}>
          MAESTRO
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ flexGrow: 1, px: 2, mt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton 
              onClick={() => router.push(item.path)}
              selected={pathname === item.path}
              sx={{ 
                borderRadius: '12px',
                '&.Mui-selected': {
                  backgroundColor: 'rgba(89, 138, 235, 0.08)',
                  color: 'primary.main',
                  '& .MuiListItemIcon-root': { color: 'primary.main' }
                }
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} sx={{ fontWeight: 600 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <ListItemButton sx={{ borderRadius: '12px' }} onClick={() => router.push('/')}>
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary="Sair" />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'background.default',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: '600' }}>
            {menuItems.find(i => i.path === pathname)?.text || 'Dashboard'}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', display: { xs: 'none', md: 'block' } }}>
              Victor @ Admin
            </Typography>
            <Avatar sx={{ width: 35, height: 35, bgcolor: 'primary.main' }}>V</Avatar>
          </Stack>
        </Toolbar>
      </AppBar>
      
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              borderRight: '1px solid',
              borderColor: 'divider'
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: 4, 
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: '64px'
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
