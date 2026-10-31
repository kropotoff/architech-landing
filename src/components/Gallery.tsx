import { useState, useRef, useEffect } from 'react';
import Player from '@vimeo/player';
import arcaneFlyer from '../assets/arcane_flyer.jpg';
import architechPlaying from '../assets/architech_playing.jpg';
import architechPicture from '../assets/architech_picture.jpg';
import lineup from '../assets/lineup.jpg';
import micromusicThumb from '../assets/micromusic_thumb.jpg';
import fridayHappynessThumb from '../assets/fridayHappyness_thumb.jpg';
import feels from '../assets/feels.jpg';
import dancing from '../assets/dancing.jpg';
import blackAndWhite from '../assets/black_and_white.jpg';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type VideoItem = {
  type: 'youtube' | 'vimeo';
  id: string;
  title: string;
  place: string;
  thumb?: string; // required for Vimeo; YouTube thumbs are derived from the id
};

type PhotoItem = {
  type: 'image';
  src: string;
  alt: string;
  layout?: 'big' | 'tall' | 'big-mobile';
};

type MediaItem = VideoItem | PhotoItem;

// To add a YouTube video, paste only the id — the part after /embed/ or youtu.be/
// (drop any ?si=... share-tracking suffix). The first entry is the featured one.
const videos: VideoItem[] = [
  { type: 'youtube', id: '2VotfvF9yZ8', title: 'Stone · Tribal Techno', place: 'BawiŁąka, Bieszczady · Elevator Music' },
  { type: 'youtube', id: 'XzpRCkr2HHs', title: 'Deep House', place: 'Skowronkowy Jarzmin · Elevator Music' },
  { type: 'vimeo', id: '1098844722', title: 'Friday Night Pizza Party', place: 'FridayHappyness', thumb: fridayHappynessThumb },
  { type: 'vimeo', id: '1124918177', title: 'The Undercommons Vol. 3', place: 'LX Factory · Elevator Music', thumb: micromusicThumb },
  { type: 'youtube', id: 'YUPzqaKMB9g', title: 'Tech House', place: 'Fábrica Braço de Prata · Elevator Music' },
];

// Order matters for the bento grid — see .photo-grid in App.css
const photos: PhotoItem[] = [
  { type: 'image', src: feels, alt: 'Crowd at an Architech set', layout: 'big' },
  { type: 'image', src: dancing, alt: 'Dancing', layout: 'tall' },
  { type: 'image', src: blackAndWhite, alt: 'Black and white portrait', layout: 'tall' },
  { type: 'image', src: architechPlaying, alt: 'Architech playing', layout: 'big' },
  { type: 'image', src: lineup, alt: 'Lineup poster' },
  { type: 'image', src: arcaneFlyer, alt: 'Arcane flyer', layout: 'big-mobile' },
  { type: 'image', src: architechPicture, alt: 'Architech portrait' },
];

const media: MediaItem[] = [...videos, ...photos];

const youtubeThumb = (id: string) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

const embedUrl = (item: VideoItem) =>
  item.type === 'youtube'
    ? `https://www.youtube-nocookie.com/embed/${item.id}?autoplay=1&rel=0&cc_load_policy=0`
    : `https://player.vimeo.com/video/${item.id}?autoplay=1`;

const PlayIcon = () => (
  <svg viewBox="0 0 56 56" className="video-tile-play">
    <circle cx="28" cy="28" r="27" fill="rgba(10,10,12,0.6)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
    <polygon points="23,18 23,38 41,28" fill="white" />
  </svg>
);

const VideoTile = ({ item, featured, onOpen }: { item: VideoItem; featured?: boolean; onOpen: () => void }) => {
  const [hovered, setHovered] = useState(false);
  const [ytPreviewSrc, setYtPreviewSrc] = useState('');
  const vimeoContainer = useRef<HTMLDivElement>(null);
  const vimeoPlayer = useRef<Player | null>(null);

  const handleMouseEnter = () => {
    setHovered(true);
    if (item.type === 'youtube') {
      setYtPreviewSrc(
        `https://www.youtube-nocookie.com/embed/${item.id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${item.id}`
      );
      return;
    }
    if (!vimeoContainer.current) return;
    // Lazy-init: create the player only on first hover
    if (!vimeoPlayer.current) {
      vimeoPlayer.current = new Player(vimeoContainer.current, {
        id: Number(item.id),
        muted: true,
        controls: false,
        loop: true,
        title: false,
        byline: false,
        portrait: false,
        width: 640,
      });
    }
    vimeoPlayer.current.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (item.type === 'youtube') setYtPreviewSrc('');
    else vimeoPlayer.current?.pause();
  };

  return (
    <div
      className={`video-tile${featured ? ' video-tile-featured' : ''}${hovered ? ' is-previewing' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      aria-label={`Play ${item.title}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(); } }}
    >
      <img
        src={item.thumb ?? youtubeThumb(item.id)}
        alt=""
        className="gallery-image video-tile-thumb"
        loading="lazy"
        onError={(e) => {
          // Not every YouTube video has a maxres thumbnail
          if (item.type === 'youtube') e.currentTarget.src = `https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`;
        }}
      />

      {item.type === 'youtube' ? (
        <iframe
          src={ytPreviewSrc || undefined}
          title={`${item.title} preview`}
          allow="autoplay"
          tabIndex={-1}
          className="video-tile-preview"
        />
      ) : (
        <div ref={vimeoContainer} className="video-tile-preview vimeo-preview" />
      )}

      <PlayIcon />

      <div className="video-tile-badge">{featured ? 'Latest' : 'Video'}</div>

      <div className="video-tile-caption">
        <div className="video-tile-title">{item.title}</div>
        <div className="video-tile-place">{item.place}</div>
      </div>

      <div className="video-tile-hint">click for sound</div>
    </div>
  );
};

const SectionLabel = ({ children }: { children: string }) => (
  <div className="gallery-label">{children}</div>
);

const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const isMobile = useMediaQuery('(max-width:600px)');

  const open = selectedIndex !== null;
  const selected = open ? media[selectedIndex] : null;

  const handleClose = () => setSelectedIndex(null);
  const handlePrev = () => setSelectedIndex(i => (i !== null && i > 0 ? i - 1 : i));
  const handleNext = () => setSelectedIndex(i => (i !== null && i < media.length - 1 ? i + 1 : i));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setSelectedIndex(i => (i !== null && i > 0 ? i - 1 : i));
      if (e.key === 'ArrowRight') setSelectedIndex(i => (i !== null && i < media.length - 1 ? i + 1 : i));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const [featured, ...restVideos] = videos;
  const counter = open
    ? `${String(selectedIndex + 1).padStart(2, '0')} / ${String(media.length).padStart(2, '0')}`
    : '';

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

      <div className="gallery">
        <VideoTile item={featured} featured onOpen={() => setSelectedIndex(0)} />

        <SectionLabel>Sets</SectionLabel>
        <div className="video-grid">
          {restVideos.map((item, i) => (
            <VideoTile key={item.id} item={item} onOpen={() => setSelectedIndex(i + 1)} />
          ))}
        </div>

        <SectionLabel>Photos</SectionLabel>
        <div className="photo-grid">
          {photos.map((item, i) => (
            <div
              key={item.src}
              className={`gallery-thumb-wrapper${item.layout ? ` photo-${item.layout}` : ''}`}
              onClick={() => setSelectedIndex(videos.length + i)}
            >
              <img src={item.src} alt={item.alt} className="gallery-image" loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={isMobile}
        maxWidth={false}
        PaperProps={{
          sx: {
            background: '#0a0a0c',
            border: isMobile ? 'none' : '1px solid rgba(124, 106, 247, 0.15)',
            borderRadius: isMobile ? 0 : '4px',
            m: isMobile ? 0 : '16px',
            width: isMobile ? '100%' : 'calc(100vw - 32px)',
            maxWidth: '1400px',
            height: isMobile ? '100%' : 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          },
        }}
      >
        {/* Close */}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 12,
            top: 12,
            color: '#f0eff5',
            zIndex: 10,
            background: 'rgba(18,18,22,0.8)',
            '&:hover': { background: 'rgba(124,106,247,0.3)' },
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Content */}
        {selected && selected.type !== 'image' ? (
          <>
            <div style={{
              width: '100%',
              aspectRatio: '16/9',
              maxHeight: '80vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <iframe
                key={selected.id}
                src={embedUrl(selected)}
                title={selected.title}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  display: 'block',
                  background: '#000',
                }}
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                allowFullScreen
              />
            </div>
            <div className="lightbox-caption">
              <span className="lightbox-counter">{counter}</span>
              <span className="video-tile-title">{selected.title}</span>
              <span className="video-tile-place">{selected.place}</span>
            </div>
          </>
        ) : (
          selected && (
            <>
              <img
                src={selected.src}
                alt={selected.alt}
                style={{
                  display: 'block',
                  maxWidth: '100%',
                  maxHeight: isMobile ? 'calc(100vh - 48px)' : 'calc(90vh - 48px)',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
              <div className="lightbox-caption">
                <span className="lightbox-counter">{counter}</span>
              </div>
            </>
          )
        )}

        {/* Prev / Next */}
        {open && selectedIndex > 0 && (
          <IconButton
            aria-label="previous"
            onClick={handlePrev}
            sx={{
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'rgba(255,255,255,0.75)',
              background: 'rgba(18,18,22,0.8)',
              zIndex: 20,
              width: 40,
              height: 40,
              '&:hover': { background: 'rgba(124,106,247,0.3)', color: '#f0eff5' },
            }}
          >
            <ArrowBackIosNewIcon sx={{ fontSize: 18 }} />
          </IconButton>
        )}
        {open && selectedIndex < media.length - 1 && (
          <IconButton
            aria-label="next"
            onClick={handleNext}
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'rgba(255,255,255,0.75)',
              background: 'rgba(18,18,22,0.8)',
              zIndex: 20,
              width: 40,
              height: 40,
              '&:hover': { background: 'rgba(124,106,247,0.3)', color: '#f0eff5' },
            }}
          >
            <ArrowForwardIosIcon sx={{ fontSize: 18 }} />
          </IconButton>
        )}
      </Dialog>
    </div>
  );
};

export default Gallery;
