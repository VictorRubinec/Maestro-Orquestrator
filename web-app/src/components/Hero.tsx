import React from 'react';
import { Box, Typography, Button, Container, Stack } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import styles from './Hero.module.css';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  onCtaClick?: () => void;
  secondaryCtaText?: string;
}

const Hero: React.FC<HeroProps> = ({ 
  title, 
  subtitle, 
  ctaText, 
  onCtaClick,
  secondaryCtaText 
}) => {
  return (
    <Box className={styles.heroWrapper}>
      <Container maxWidth="lg">
        <Stack spacing={4} sx={{ alignItems: 'center', textAlign: 'center' }}>
          <Typography variant="h1" className={styles.title}>
            {title}
          </Typography>
          <Typography variant="h5" className={styles.subtitle}>
            {subtitle}
          </Typography>
          <Stack direction="row" spacing={2} className={styles.ctaGroup}>
            <Button 
              variant="contained" 
              size="large" 
              onClick={onCtaClick}
              startIcon={<RocketLaunchIcon />}
            >
              {ctaText}
            </Button>
            {secondaryCtaText && (
              <Button variant="outlined" size="large">
                {secondaryCtaText}
              </Button>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Hero;
