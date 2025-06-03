import './App.css';
import { Box, Button, Container, Typography } from '@mui/material'
import logo from './assets/architech_logo.png';
import aboutImg from './assets/architech_picture.jpg';

const links = [
  { label: 'SoundCloud', url: 'https://soundcloud.com/andrei-kropotoff' },
  { label: 'Instagram', url: 'https://www.instagram.com/architech.pt' },
];

function App() {
  return (
    <Container maxWidth="sm" className="center-container">
      <img
        src={logo}
        alt="Architech Logo"
        className="architech-logo"
      />
      <div className="landing-text">
        ArchiTech crafts immersive journeys that blend deep, jazz, and ethnic house with melodic and psychedelic techno.
        A global soundscape for body and mind and spirit.
      </div>
      <Box display="flex" flexDirection="column" gap={2} mb={6}>
        {links.map((link) => (
          <Button
            key={link.label}
            variant="contained"
            href={link.url}
            target="_blank"
            className="architech-btn"
          >
            {link.label}
          </Button>
        ))}
      </Box>
      <div className="section-fade" />

      <Box id="about" textAlign="center">
        <Typography variant="h4" fontWeight="bold" gutterBottom mt={4}>
          The Journey
        </Typography>
        <img
          src={aboutImg}
          alt="Andrei playing live"
          className="about-img"
        />
        <div className="about-text">
          Born amidst the rhythms of Brazil, into a music-loving family with roots across Europe, and raised on the waves of the African coast, ArchiTech's musical journey is as eclectic as his upbringing.
          <br /><br />
          A drummer since childhood, he spent five years at a music conservatory, where his passion evolved across a multitude of instruments before discovering the art of DJing, transforming his instrumental prowess into a distinctive sonic identity.
          <br /><br />
          As the co-founder of Elevator Music, he channels his global influences into raw, immersive, and boundlessly creative sets.
          <br /><br />
          Sets that blend the warmth of deep, the soul of jazz, and the pulse of ethnic <strong>house</strong> with the power of driving and the depth of deep, melodic and psychedelic <strong>techno</strong>, to create a journey that moves the soul.
        </div>
      </Box>

      <div className="section-fade" />

      <Box id="music" textAlign="center" sx={{ my: 6 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Sneak Peek
        </Typography>
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <iframe
            width="100%"
            height="166"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1990955323&color=%2328252a&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
            title="SoundCloud Player"
          ></iframe>
          <div style={{
            fontSize: 10,
            color: "#cccccc",
            lineBreak: "anywhere",
            wordBreak: "normal",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            fontFamily: "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif",
            fontWeight: 100,
            marginTop: 4
          }}>
            <a href="https://soundcloud.com/andrei-kropotoff" title="ArchiTech" target="_blank" rel="noopener noreferrer" style={{ color: "#cccccc", textDecoration: "none" }}>ArchiTech</a>
            {" · "}
            <a href="https://soundcloud.com/andrei-kropotoff/architech-live-set-deep-house-deep-tech-psy-tech" title="ArchiTech Live Set | Deep house, Deep Tech, Psy Tech" target="_blank" rel="noopener noreferrer" style={{ color: "#cccccc", textDecoration: "none" }}>ArchiTech Live Set | Deep house, Deep Tech, Psy Tech</a>
          </div>
        </div>
      </Box>
    </Container>


  );
}

export default App;
