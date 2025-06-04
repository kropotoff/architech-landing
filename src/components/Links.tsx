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
  </Box>
);

export default Links;