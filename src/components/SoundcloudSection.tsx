import { Box, Typography } from '@mui/material';

const SoundcloudSection = () => (
  <Box id="music">
    <Typography
      gutterBottom
      sx={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 'clamp(2.4rem, 8vw, 4.5rem)',
        letterSpacing: '0.08em',
        lineHeight: 1,
        color: '#f0eff5',
      }}
    >
      On Deck
    </Typography>

    <div style={{ width: '100%', maxWidth: 760, margin: '0 auto' }}>

      <iframe
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1990955323&color=%237c6af7&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false"
        style={{ display: 'block', borderRadius: 4, marginBottom: 48 }}
      />

      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.68rem',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: '#4a4855',
        marginBottom: 12,
      }}>
        Live Set
      </div>

      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 4 }}>
        <iframe
          src="https://www.youtube.com/embed/mkLQBNJp8Mk"
          title="ArchiTech — YouTube"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: 4,
          }}
        />
      </div>

    </div>
  </Box>
);

export default SoundcloudSection;
