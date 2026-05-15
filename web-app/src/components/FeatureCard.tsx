import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import styles from './FeatureCard.module.css';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, color = '#598AEB' }) => {
  return (
    <Paper elevation={0} className={styles.card}>
      <Box sx={{ 
        width: 60, 
        height: 60, 
        borderRadius: '16px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        bgcolor: `${color}15`,
        color: color,
        mb: 3
      }}>
        {icon}
      </Box>
      <Typography variant="h5" sx={{ fontWeight: '700', mb: 2 }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
        {description}
      </Typography>
    </Paper>
  );
};

export default FeatureCard;
