import { useState, type ReactElement } from 'react';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import SoundcloudIcon from '@mui/icons-material/CloudQueue';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import logo from '../assets/architech_logo.png';
import profile2 from '../assets/profile2.jpg';
import BookingModal from './BookingModal';

const socialLinks: { label: string; url: string; icon: ReactElement }[] = [
  { label: 'Instagram', url: 'https://www.instagram.com/architech.pt', icon: <InstagramIcon /> },
  { label: 'SoundCloud', url: 'https://soundcloud.com/andrei-kropotoff', icon: <SoundcloudIcon /> },
  { label: 'WhatsApp', url: `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`, icon: <WhatsAppIcon /> },
];

const Hero = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box textAlign="center" sx={{ mb: 5 }}>
      <div className="hero-card">
        <img src={profile2} alt="Architech portrait" className="hero-image" />
        <span className="hero-overlay-gradient" />
        <span className="hero-overlay-vignette" />
        <span className="hero-top-glass" />
        <span className="hero-logo-mask" />
        <img src={logo} alt="Architech logo" className="hero-logo-overlay" />
      </div>

      <Box className="hero-socials" display="flex" justifyContent="center" alignItems="center" gap={2} mt={3}>
        {socialLinks.map((s) => (
          <Tooltip key={s.label} title={s.label} arrow>
            <IconButton
              aria-label={s.label}
              size="large"
              component="a"
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
            >
              {s.icon}
            </IconButton>
          </Tooltip>
        ))}
        <Button
          variant="contained"
          className="architech-btn"
          sx={{ fontWeight: 700, textTransform: 'none' }}
          onClick={() => setOpen(true)}
        >
          Book
        </Button>
        <Button
          variant="contained"
          href="https://drive.google.com/drive/folders/1jPb0WhksD9Btwt-cpz6Ass2CxJm35Dm1?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className="architech-btn"
          sx={{ fontWeight: 700, textTransform: 'none' }}
        >
          Press Kit
        </Button>
      </Box>

      <BookingModal open={open} onClose={() => setOpen(false)} />
    </Box>
  );
};

export default Hero;


