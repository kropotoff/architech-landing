import { useState } from 'react';
import arcaneFlyer from '../assets/arcane_flyer.jpg';
import architechPlaying from '../assets/architech_playing.jpg';
import architechPicture from '../assets/architech_picture.jpg';
import GoaLisboaFlyer from '../assets/GoaLisboaFlyer.jpeg';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const media = [
  architechPlaying,
  arcaneFlyer,
  architechPicture,
  GoaLisboaFlyer,
];

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const handleOpen = (src: string) => {
    setSelected(src);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelected(null);
  };

  return (
    <div>
      <div id="gallery" className="gallery-header">
        <Typography variant="h4" fontWeight="bold" gutterBottom mt={4}>
          Moments
        </Typography>
      </div>
      <div className="gallery-container">
        {media.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Gallery ${idx + 1}`}
            className="gallery-image"
            onClick={() => handleOpen(src)}
            style={{ cursor: 'zoom-in' }}
          />
        ))}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        PaperProps={{
          style: {
            background: 'rgba(20,20,20,0.95)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
            borderRadius: 18,
            padding: 0,
          },
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 12,
            top: 12,
            color: '#fff',
            zIndex: 10,
            background: 'rgba(30,30,30,0.5)',
            '&:hover': { background: 'rgba(30,30,30,0.8)' },
          }}
        >
          <CloseIcon />
        </IconButton>
        {selected && (
          <img
            src={selected}
            alt="Large preview"
            style={{
              maxWidth: '90vw',
              maxHeight: '80vh',
              display: 'block',
              margin: '40px auto 20px auto',
              borderRadius: 16,
              boxShadow: '0 4px 32px rgba(0,0,0,0.45)',
            }}
          />
        )}
      </Dialog>
    </div>
  );
};

export default Gallery;