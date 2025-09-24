import { Box, Button } from '@mui/material';

const links = [
  { label: 'SoundCloud', url: 'https://soundcloud.com/andrei-kropotoff' },
  { label: 'Instagram', url: 'https://www.instagram.com/architech.pt' },
];

const Links = () => (
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
    <Box display="flex" justifyContent="center" gap={2} mt={4}>
      <Button
        variant="contained"
        color="primary"
        href="#book"
        className="architech-btn"
        sx={{ fontWeight: 700, textTransform: 'none' }}
      >
        Book
      </Button>
      <Button
        variant="outlined"
        color="primary"
        href="https://drive.google.com/drive/folders/1jPb0WhksD9Btwt-cpz6Ass2CxJm35Dm1?usp=drive_link"
        target="_blank"
        rel="noopener noreferrer"
        className="architech-btn"
        sx={{ fontWeight: 700, textTransform: 'none', borderColor: '#ffb347', color: '#ffb347', background: 'transparent', '&:hover': { background: '#ffb34722', borderColor: '#ffb347', color: '#222' } }}
      >
        Press Kit
      </Button>
    </Box>
  </Box>
);

export default Links;