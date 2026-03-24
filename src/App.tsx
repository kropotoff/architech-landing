import './App.css';
import { Container, Box } from '@mui/material';
import LandingText from './components/LandingText';
import AboutSection from './components/AboutSection';
import SoundcloudSection from './components/SoundcloudSection';
import SectionDivider from './components/SectionDivider';
import FadeInSection from './components/FadeInSection';
import Gallery from './components/Gallery';
import Hero from './components/Hero.tsx';


function App() {
  return (
    <Container maxWidth="md" className="center-container">
      <FadeInSection><Hero /></FadeInSection>
      <Box maxWidth="sm" mx="auto" pt={5} sx={{ px: { xs: '20px', sm: 0 } }}>
        <FadeInSection><LandingText /></FadeInSection>
      </Box>
      <SectionDivider />
      <Box py={5}>
        <FadeInSection><Gallery /></FadeInSection>
      </Box>
      <SectionDivider />
      <Box maxWidth="sm" mx="auto" py={5} sx={{ px: { xs: '20px', sm: 0 } }}>
        <FadeInSection><AboutSection /></FadeInSection>
      </Box>
      <SectionDivider />
      <Box maxWidth="md" py={5} sx={{ px: { xs: '20px', sm: 0 } }}>
        <FadeInSection><SoundcloudSection /></FadeInSection>
      </Box>
      <Box component="footer" sx={{
        borderTop: '1px solid rgba(124, 106, 247, 0.1)',
        pt: 3,
        mt: 4,
        mb: 4,
        px: { xs: '20px', sm: 0 },
        fontSize: '0.7rem',
        color: 'var(--color-text-secondary)',
        fontFamily: "'Space Mono', monospace",
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        textAlign: 'center',
      }}>
        ARCHITECH © 2025 — ALL RIGHTS RESERVED
      </Box>
    </Container>
  );
}

export default App;