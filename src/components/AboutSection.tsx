import { Box, Typography } from '@mui/material';

const AboutSection = () => (
  <Box id="about" textAlign="center">
    <Typography
      gutterBottom
      mt={4}
      sx={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 'clamp(2.4rem, 8vw, 4.5rem)',
        letterSpacing: '0.08em',
        lineHeight: 1,
        color: '#f0eff5',
      }}
    >
      The Journey
    </Typography>
    <div className="about-text">
      ArchiTech is a Lisbon-based DJ and co-founder of Elevator Music, a collective dedicated to the art of electronic music experience.
      <br /><br />
      Born in South America, raised between Europe and the African coast, and trained as a percussionist in conservatory, rhythm has shaped his musical language from the beginning. Years behind drums and instruments eventually evolved into DJing, where that same rhythmic intuition drives his sets.
      <br /><br />
      His selections move deliberately. Deep house foundations, jazz-inflected grooves, and organic textures gradually unfold into hypnotic techno, melodic psychedelia, and tribal energy.
      <br /><br />
      The result is not a playlist but a narrative.
      <br /><br />
      Music is a journey, not a sequence. He carries the same conviction whether he's playing deep underground gatherings and forest raves to mainstream stages like Micro Club, Goa Lisboa, Friday Night Pizza Party and Village Underground.
      <br /><br />
      Whether opening a dancefloor or guiding a room deep into the night, his sets build patiently, reward attention, and aim for something rare in club culture today.
      <br /><br />
      Immersion.
    </div>
  </Box>
);

export default AboutSection;