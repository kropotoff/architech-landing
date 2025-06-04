import { Box, Typography } from '@mui/material';

const SoundcloudSection = () => (
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
);

export default SoundcloudSection;