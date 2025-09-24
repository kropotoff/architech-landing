import './App.css';
import { Container } from '@mui/material';
import LandingText from './components/LandingText';
import AboutSection from './components/AboutSection';
import SoundcloudSection from './components/SoundcloudSection';
import SectionDivider from './components/SectionDivider';
import FadeInSection from './components/FadeInSection';
import Gallery from './components/Gallery';
import Hero from './components/Hero.tsx';


function App() {
  return (
    <Container maxWidth="sm" className="center-container">
      <FadeInSection><Hero /></FadeInSection>
      <FadeInSection><LandingText /></FadeInSection>
      <SectionDivider />
      <FadeInSection><Gallery /></FadeInSection> 
      <SectionDivider />
      <FadeInSection><AboutSection /></FadeInSection>
      <SectionDivider />
      <FadeInSection><SoundcloudSection /></FadeInSection>
      <footer style={{ marginTop: 40, fontSize: '0.95em', color: '#888' }}>
        © 2025 Andrei Kropotoff. Made with ❤️. All rights reserved. Rhythms, and vibes shared freely.
      </footer>
    </Container>
  );
}

export default App;