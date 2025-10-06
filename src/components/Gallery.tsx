import { useState } from 'react';
import arcaneFlyer from '../assets/arcane_flyer.jpg';
import architechPlaying from '../assets/architech_playing.jpg';
import architechPicture from '../assets/architech_picture.jpg';
import GoaLisboaFlyer from '../assets/GoaLisboaFlyer.jpeg';
import lineup from '../assets/lineup.jpg';
import pizzaparty from '../assets/pizzaparty.jpg';
import micromusicThumb from '../assets/micromusic_thumb.jpg';
import fridayHappynessThumb from '../assets/fridayHappyness_thumb.jpg';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const media = [
  { type: 'video', src: 'https://player.vimeo.com/video/1124918177', thumb: micromusicThumb },
  { type: 'video', src: 'https://player.vimeo.com/video/1098844722', thumb: fridayHappynessThumb },
  { type: 'image', src: architechPlaying },
  { type: 'image', src: lineup },
  { type: 'image', src: pizzaparty },
  { type: 'image', src: arcaneFlyer },
  { type: 'image', src: architechPicture },
  { type: 'image', src: GoaLisboaFlyer }
];

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<{ type: string; src: string } | null>(null);

  const handleOpen = (item: { type: string; src: string }) => {
    setSelected(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelected(null);
  };

  const currentIndex = selected ? media.findIndex(item => item.src === selected.src) : -1;

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelected(media[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < media.length - 1) {
      setSelected(media[currentIndex + 1]);
    }
  };

  return (
    <div>
      <div id="gallery" className="gallery-header">
        <Typography variant="h4" fontWeight="bold" gutterBottom mt={4}>
          Moments
        </Typography>
      </div>
      <div className="gallery-container">
        {media.map((item, idx) =>
          item.type === 'video' ? (
            item.thumb ? (
              <div
                key={idx}
                className="gallery-image"
                style={{
                  position: 'relative',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#111',
                }}
                onClick={() => handleOpen(item)}
              >
                <img
                  src={item.thumb}
                  alt="Video thumbnail"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 18,
                    opacity: 0.85,
                  }}
                />
                <span style={{
                  color: '#fff',
                  fontSize: 48,
                  position: 'absolute',
                  zIndex: 2,
                  pointerEvents: 'none',
                  textShadow: '0 2px 8px #000'
                }}>▶</span>
              </div>
            ) : (
              <div
                key={idx}
                className="gallery-image"
                style={{
                  position: 'relative',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#111',
                }}
                onClick={() => handleOpen(item)}
              >
                <span style={{
                  color: '#fff',
                  fontSize: 48,
                  zIndex: 2,
                  pointerEvents: 'none',
                  textShadow: '0 2px 8px #000'
                }}>▶</span>
              </div>
            )
          ) : (
            <img
              key={idx}
              src={item.src}
              alt={`Gallery ${idx + 1}`}
              className="gallery-image"
              onClick={() => handleOpen(item)}
              style={{ cursor: 'zoom-in' }}
            />
          )
        )}
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
        {selected && selected.type === 'video' ? (
          <iframe
            src={`${selected.src}?autoplay=1`}
            title="Vimeo Video"
            style={{
              width: '80vw',
              height: '45vw',
              maxWidth: 900,
              maxHeight: 506,
              display: 'block',
              margin: '40px auto 20px auto',
              borderRadius: 16,
              border: 'none',
              boxShadow: '0 4px 32px rgba(0,0,0,0.45)',
              background: '#000',
            }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          selected && (
            <img
              src={selected.src}
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
          )
        )}
        {open && (
          <>
            {currentIndex > 0 && (
              <IconButton
                aria-label="previous"
                onClick={handlePrev}
                sx={{
                  position: 'absolute',
                  left: 24,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(255,255,255,0.75)',
                  background: 'rgba(30,30,30,0.5)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                  zIndex: 20,
                  width: 38,
                  height: 38,
                  '&:hover': {
                    background: 'rgba(60,60,60,0.85)',
                    color: '#C0C0C0', // silver
                  },
                }}
              >
                <ArrowBackIosNewIcon sx={{ fontSize: 22 }} />
              </IconButton>
            )}
            {currentIndex < media.length - 1 && (
              <IconButton
                aria-label="next"
                onClick={handleNext}
                sx={{
                  position: 'absolute',
                  right: 24,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(255,255,255,0.75)',
                  background: 'rgba(30,30,30,0.5)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                  zIndex: 20,
                  width: 38,
                  height: 38,
                  '&:hover': {
                    background: 'rgba(60,60,60,0.85)',
                    color: '#C0C0C0', // silver
                  },
                }}
              >
                <ArrowForwardIosIcon sx={{ fontSize: 22 }} />
              </IconButton>
            )}
          </>
        )}
      </Dialog>
    </div>
  );
};

export default Gallery;