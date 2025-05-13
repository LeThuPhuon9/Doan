import React from 'react';
import { Container, Typography, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    textAlign: 'center',
    background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
    backgroundSize: '400% 400%',
    animation: '$gradientBG 15s ease infinite',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      width: '200%',
      height: '200%',
      top: '-50%',
      left: '-50%',
      background: 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)',
      backgroundSize: '30px 30px',
      animation: '$starfield 60s linear infinite',
    },
  },
  content: {
    position: 'relative',
    zIndex: 2,
    animation: '$fadeIn 1s ease-out, $glow 5s ease-in-out infinite',
    backdropFilter: 'blur(8px)',
    padding: theme.spacing(8),
    borderRadius: 30,
    background: 'rgba(255, 255, 255, 0.15)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transform: 'perspective(1000px)',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'perspective(1000px) rotateX(2deg) rotateY(2deg) scale(1.02)',
      background: 'rgba(255, 255, 255, 0.2)',
    }
  },
  title: {
    marginBottom: theme.spacing(4),
    fontWeight: 900,
    fontSize: '4.5rem',
    background: 'linear-gradient(-45deg, #FFF, #a8edea)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '4px 4px 8px rgba(0,0,0,0.2)',
    animation: '$slideUp 1s ease-out, $shimmer 3s infinite, $wave 5s ease-in-out infinite',
    letterSpacing: '3px',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: '100%',
      height: '2px',
      background: 'linear-gradient(90deg, transparent, #fff, transparent)',
      animation: '$line 3s linear infinite',
    },
  },
  subtitle: {
    marginBottom: theme.spacing(6),
    color: '#fff',
    fontSize: '2rem',
    lineHeight: 1.8,
    fontWeight: 500,
    animation: '$slideUp 1s ease-out 0.3s, $pulse 5s infinite',
    opacity: 0,
    animationFillMode: 'forwards',
    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
  },
  loginButton: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2.5, 8),
    fontSize: '1.5rem',
    borderRadius: 50,
    background: 'linear-gradient(-45deg, #FFF, #a8edea)',
    color: '#333',
    boxShadow: '0 4px 20px rgba(255, 255, 255, 0.4)',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    animation: '$slideUp 1s ease-out 0.6s, $bounce 5s infinite',
    opacity: 0,
    animationFillMode: 'forwards',
    '&:hover': {
      transform: 'translateY(-5px) scale(1.05)',
      boxShadow: '0 6px 30px rgba(255, 255, 255, 0.6)',
    },
  },
  decorCircle: {
    position: 'absolute',
    borderRadius: '50%',
    background: 'linear-gradient(-45deg, #FFF, rgba(255,255,255,0.5))',
    opacity: 0.15,
    animation: '$float 8s ease-in-out infinite',
    filter: 'blur(4px)',
  },
  '@keyframes gradientBG': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' },
  },
  '@keyframes shimmer': {
    '0%': { filter: 'brightness(100%)' },
    '50%': { filter: 'brightness(150%)' },
    '100%': { filter: 'brightness(100%)' },
  },
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.02)' },
    '100%': { transform: 'scale(1)' },
  },
  '@keyframes bounce': {
    '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
    '40%': { transform: 'translateY(-10px)' },
    '60%': { transform: 'translateY(-5px)' },
  },
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  '@keyframes slideUp': {
    from: {
      opacity: 0,
      transform: 'translateY(30px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  '@keyframes float': {
    '0%, 100%': {
      transform: 'translateY(0) rotate(0deg) scale(1)',
    },
    '50%': {
      transform: 'translateY(-30px) rotate(15deg) scale(1.1)',
    },
  },
  '@keyframes starfield': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  '@keyframes glow': {
    '0%, 100%': { boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)' },
    '50%': { boxShadow: '0 8px 32px rgba(255, 255, 255, 0.3)' },
  },
  '@keyframes wave': {
    '0%, 100%': { transform: 'rotate(-1deg)' },
    '50%': { transform: 'rotate(1deg)' },
  },
  '@keyframes line': {
    '0%': { backgroundPosition: '-200% 0' },
    '100%': { backgroundPosition: '200% 0' },
  },
}));

function Home() {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth={false}>
      {[...Array(20)].map((_, i) => (
        <Box
          key={i}
          className={classes.decorCircle}
          style={{
            width: `${Math.random() * 400 + 100}px`,
            height: `${Math.random() * 400 + 100}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${Math.random() * 8 + 8}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}

      <Box className={classes.content} maxWidth={1000} mx="auto">
        <Typography variant="h1" className={classes.title}>
          Welcome to Dynonary English
        </Typography>

        <Typography variant="h4" className={classes.subtitle}>
          Your personal English learning companion. Improve your vocabulary, practice pronunciation, 
          and master the English language with our interactive tools.
        </Typography>

        <Button
          component={Link}
          to="/login"
          variant="contained"
          size="large"
          className={classes.loginButton}
        >
          Start Your Journey
        </Button>
      </Box>
    </Container>
  );
}

export default Home;