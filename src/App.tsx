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
      <Box maxWidth="sm" mx="auto">
        <FadeInSection><LandingText /></FadeInSection>
      </Box>
      <SectionDivider />
      <FadeInSection><Gallery /></FadeInSection>
      <SectionDivider />
      <Box maxWidth="sm" mx="auto">
        <FadeInSection><AboutSection /></FadeInSection>
      </Box>
      <SectionDivider />
      <FadeInSection><SoundcloudSection /></FadeInSection>
      <footer style={{
        marginTop: 60,
        marginBottom: 24,
        fontSize: '0.7rem',
        color: 'var(--color-text-muted)',
        fontFamily: "'Space Mono', monospace",
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        textAlign: 'center',
      }}>
        ARCHITECH © 2025 — ALL RIGHTS RESERVED
      </footer>
    </Container>
  );
}

export default App;