import { useState, useRef } from 'react';
import Player from '@vimeo/player';
import arcaneFlyer from '../assets/arcane_flyer.jpg';
import architechPlaying from '../assets/architech_playing.jpg';
import architechPicture from '../assets/architech_picture.jpg';
import GoaLisboaFlyer from '../assets/GoaLisboaFlyer.jpeg';
import lineup from '../assets/lineup.jpg';
import micromusicThumb from '../assets/micromusic_thumb.jpg';
import fridayHappynessThumb from '../assets/fridayHappyness_thumb.jpg';
import feels from '../assets/feels.jpg';
import dancing from '../assets/dancing.jpg';
import blackAndWhite from '../assets/black_and_white.jpg';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const media = [
  { type: 'image', src: feels },
  { type: 'video', src: 'https://player.vimeo.com/video/1098844722', vimeoId: 1098844722, thumb: fridayHappynessThumb },
  { type: 'video', src: 'https://player.vimeo.com/video/1124918177', vimeoId: 1124918177, thumb: micromusicThumb },
  { type: 'image', src: architechPlaying },
  { type: 'image', src: dancing },
  { type: 'image', src: blackAndWhite },
  { type: 'image', src: lineup },
  { type: 'image', src: arcaneFlyer },
  { type: 'image', src: architechPicture },
  { type: 'image', src: GoaLisboaFlyer },
];

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<{ type: string; src: string; vimeoId?: number } | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Refs for the Vimeo preview container divs and player instances
  const previewContainerRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const playerInstances = useRef<Map<number, Player>>(new Map());

  const handleOpen = (item: typeof media[number]) => {
    setSelected(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelected(null);
  };

  const currentIndex = selected ? media.findIndex(item => item.src === selected.src) : -1;

  const handlePrev = () => {
    if (currentIndex > 0) setSelected(media[currentIndex - 1]);
  };

  const handleNext = () => {
    if (currentIndex < media.length - 1) setSelected(media[currentIndex + 1]);
  };

  const handleVideoMouseEnter = (idx: number, vimeoId: number) => {
    setHoveredIdx(idx);
    const container = previewContainerRefs.current.get(idx);
    if (!container) return;

    // Lazy-init: create the player only on first hover
    let player = playerInstances.current.get(idx);
    if (!player) {
      player = new Player(container, {
        id: vimeoId,
        muted: true,
        controls: false,
        loop: true,
        title: false,
        byline: false,
        portrait: false,
        width: 640,
      });
      playerInstances.current.set(idx, player);
    }
    player.play().catch(() => {});
  };

  const handleVideoMouseLeave = (idx: number) => {
    setHoveredIdx(null);
    playerInstances.current.get(idx)?.pause();
  };

  return (
    <div>
      <div id="gallery">
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
          Moments
        </Typography>
      </div>
      <div className="gallery-container">
        {media.map((item, idx) => {
          const isFeatured = idx < 3;
          const nonFeaturedCount = media.filter((_, i) => i >= 3).length;
          const isLastOdd = idx === media.length - 1 && nonFeaturedCount % 2 !== 0;
          const wrapperClass = `gallery-thumb-wrapper${(isFeatured || isLastOdd) ? ' gallery-thumb-wrapper-featured' : ''}${isLastOdd ? ' gallery-thumb-wrapper-contain' : ''}`;

          if (item.type === 'video' && item.vimeoId) {
            return (
              <div
                key={idx}
                className={wrapperClass}
                onMouseEnter={() => handleVideoMouseEnter(idx, item.vimeoId!)}
                onMouseLeave={() => handleVideoMouseLeave(idx)}
                onClick={() => handleOpen(item)}
              >
                {/* Static thumbnail — shown until hover */}
                <img
                  src={item.thumb}
                  alt="Video thumbnail"
                  className="gallery-image"
                  style={{ opacity: hoveredIdx === idx ? 0 : 1, transition: 'opacity 0.4s ease' }}
                />

                {/* Vimeo player preview — fades in on hover */}
                <div
                  className="vimeo-preview"
                  style={{ opacity: hoveredIdx === idx ? 1 : 0 }}
                  ref={(el) => {
                    if (el) previewContainerRefs.current.set(idx, el);
                  }}
                />

                {/* Play button — hidden while previewing */}
                <svg
                  viewBox="0 0 56 56"
                  style={{
                    position: 'absolute',
                    width: 56,
                    height: 56,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 3,
                    pointerEvents: 'none',
                    filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.7))',
                    opacity: hoveredIdx === idx ? 0 : 1,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <circle cx="28" cy="28" r="27" fill="rgba(10,10,12,0.6)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                  <polygon points="23,18 23,38 41,28" fill="white" />
                </svg>

                {/* "Click for sound" hint — appears on hover */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 4,
                    pointerEvents: 'none',
                    opacity: hoveredIdx === idx ? 1 : 0,
                    transition: 'opacity 0.4s ease 0.2s',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.6rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(240,239,245,0.7)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  click for sound
                </div>
              </div>
            );
          }

          return (
            <div
              key={idx}
              className={wrapperClass}
              onClick={() => handleOpen(item)}
            >
              <img
                src={item.src}
                alt={`Gallery ${idx + 1}`}
                className="gallery-image"
              />
            </div>
          );
        })}
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        PaperProps={{
          style: {
            background: '#0f0f12',
            border: '1px solid rgba(124, 106, 247, 0.2)',
            borderRadius: 4,
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
            color: '#f0eff5',
            zIndex: 10,
            background: 'rgba(18,18,22,0.7)',
            '&:hover': { background: 'rgba(124,106,247,0.25)' },
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
              borderRadius: 4,
              border: 'none',
              boxShadow: '0 4px 32px rgba(0,0,0,0.55)',
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
                borderRadius: 4,
                boxShadow: '0 4px 32px rgba(0,0,0,0.55)',
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
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(255,255,255,0.75)',
                  background: 'rgba(18,18,22,0.7)',
                  zIndex: 20,
                  width: 38,
                  height: 38,
                  '&:hover': { background: 'rgba(124,106,247,0.3)', color: '#f0eff5' },
                }}
              >
                <ArrowBackIosNewIcon sx={{ fontSize: 20 }} />
              </IconButton>
            )}
            {currentIndex < media.length - 1 && (
              <IconButton
                aria-label="next"
                onClick={handleNext}
                sx={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(255,255,255,0.75)',
                  background: 'rgba(18,18,22,0.7)',
                  zIndex: 20,
                  width: 38,
                  height: 38,
                  '&:hover': { background: 'rgba(124,106,247,0.3)', color: '#f0eff5' },
                }}
              >
                <ArrowForwardIosIcon sx={{ fontSize: 20 }} />
              </IconButton>
            )}
          </>
        )}
      </Dialog>
    </div>
  );
};

export default Gallery;
