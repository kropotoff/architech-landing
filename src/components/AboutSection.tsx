import { Box, Typography } from '@mui/material';

const AboutSection = () => (
  <Box id="about" textAlign="center">
    <Typography variant="h4" fontWeight="bold" gutterBottom mt={4}>
      The Journey
    </Typography>
    <div className="about-text">
      Born amidst the rhythms of Brazil, into a music-loving family with roots across Europe, and raised on the waves of the African coast, ArchiTech's musical journey is as eclectic as his upbringing.
      <br /><br />
      A drummer since childhood, he spent five years at a music conservatory, where his passion evolved across a multitude of instruments before discovering the art of DJing, transforming his instrumental prowess into a distinctive sonic identity.
      <br /><br />
      As the co-founder of Elevator Music, he channels his global influences into raw, immersive, and boundlessly creative sets.
      <br /><br />
      Sets that weave the warmth of deep, the soul of jazz, and the pulse of ethnic <strong>house</strong> with the relentless drive of <strong>techno</strong> and the hypnotic depth of melodic, psychedelic soundscapes, crafting a transcendent journey that stirs the soul.
    </div>
  </Box>
);

export default AboutSection;