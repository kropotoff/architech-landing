import { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';

// Minimal SC Widget API types
interface SCWidgetInstance {
  bind: (event: string, cb: (...args: any[]) => void) => void;
  play: () => void;
  pause: () => void;
  seekTo: (ms: number) => void;
  getDuration: (cb: (dur: number) => void) => void;
  getCurrentSound: (cb: (sound: { title: string } | null) => void) => void;
}

declare global {
  interface Window {
    SC?: { Widget: (el: HTMLIFrameElement) => SCWidgetInstance };
  }
}

const fmt = (ms: number) => {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};

const SoundcloudSection = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<SCWidgetInstance | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState(0);
  const [dur, setDur] = useState(0);
  const [trackTitle, setTrackTitle] = useState('');
  const [hoverPlay, setHoverPlay] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://w.soundcloud.com/player/api.js';
    script.async = true;
    script.onload = () => {
      if (!iframeRef.current || !window.SC) return;
      const w = window.SC.Widget(iframeRef.current);
      widgetRef.current = w;
      w.bind('ready', () => {
        w.getDuration((d) => setDur(d));
        w.getCurrentSound((s) => setTrackTitle(s?.title ?? ''));
      });
      w.bind('play', () => setPlaying(true));
      w.bind('pause', () => setPlaying(false));
      w.bind('finish', () => { setPlaying(false); setPos(0); });
      w.bind('playProgress', (e: { currentPosition: number }) => setPos(e.currentPosition));
    };
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  const toggle = () => {
    const w = widgetRef.current;
    if (!w) return;
    playing ? w.pause() : w.play();
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !widgetRef.current || !dur) return;
    const { left, width } = progressRef.current.getBoundingClientRect();
    widgetRef.current.seekTo(((e.clientX - left) / width) * dur);
  };

  const pct = dur > 0 ? (pos / dur) * 100 : 0;

  return (
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

      {/* Hidden SC iframe */}
      <iframe
        ref={iframeRef}
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1990955323&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false"
        style={{ position: 'absolute', width: 0, height: 0, border: 'none', overflow: 'hidden' }}
        allow="autoplay"
        title="SoundCloud"
      />

      {/* Shared width container — SC player + YouTube locked to same width */}
      <div style={{ width: '100%', maxWidth: 760, margin: '0 auto' }}>

      {/* Custom player */}
      <div style={{
        width: '100%',
        margin: '0 0 32px 0',
        background: 'rgba(18, 18, 22, 0.6)',
        border: '1px solid rgba(124, 106, 247, 0.14)',
        borderRadius: 4,
        padding: '18px 20px',
      }}>

        {/* Top row: play button + title + time */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>

          {/* Play / Pause button */}
          <button
            onClick={toggle}
            onMouseEnter={() => setHoverPlay(true)}
            onMouseLeave={() => setHoverPlay(false)}
            style={{
              flexShrink: 0,
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: `1px solid ${playing || hoverPlay ? '#7c6af7' : 'rgba(124,106,247,0.35)'}`,
              background: playing ? '#7c6af7' : hoverPlay ? 'rgba(124,106,247,0.18)' : 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s, border-color 0.2s',
              padding: 0,
              outline: 'none',
            }}
          >
            {playing ? (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect x="1.5" y="1" width="3" height="10" rx="1" fill="#f0eff5" />
                <rect x="7.5" y="1" width="3" height="10" rx="1" fill="#f0eff5" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 2 }}>
                <polygon points="2,1 12,6 2,11" fill="#7c6af7" />
              </svg>
            )}
          </button>

          {/* Track title */}
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.7rem',
            color: '#8c8a9a',
            letterSpacing: '0.03em',
            flex: 1,
            textAlign: 'left',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {trackTitle || '—'}
          </span>

          {/* Time */}
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.62rem',
            color: '#4a4855',
            letterSpacing: '0.06em',
            flexShrink: 0,
          }}>
            {fmt(pos)} / {fmt(dur)}
          </span>

          {/* Open on SoundCloud */}
          <a
            href="https://soundcloud.com/andrei-kropotoff/architech-live-set-deep-house-deep-tech-psy-tech"
            target="_blank"
            rel="noopener noreferrer"
            title="Open on SoundCloud"
            style={{ flexShrink: 0, display: 'flex', alignItems: 'center', color: '#4a4855', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#f0eff5')}
            onMouseLeave={e => (e.currentTarget.style.color = '#4a4855')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1.175 12.225c-.015.132.01.264.072.382l1.01 3.757-1.01 3.678a.73.73 0 0 1-.072.373.4.4 0 0 1-.35.206.4.4 0 0 1-.353-.206.73.73 0 0 1-.072-.373V8.585c0-.137.024-.263.072-.373A.4.4 0 0 1 .825 8a.4.4 0 0 1 .35.212c.048.11.072.236.072.373l-.072 3.64zm2.843-2.21c-.02.147.005.294.072.426l1.324 5.967-1.324 5.482a.86.86 0 0 1-.072.42.476.476 0 0 1-.426.252.476.476 0 0 1-.427-.252.86.86 0 0 1-.071-.42V8.47c0-.153.024-.294.071-.42A.476.476 0 0 1 3.592 7.8a.476.476 0 0 1 .426.252c.047.126.071.267.071.42l-.071 1.543zm2.862-.937c-.02.153.005.306.072.446l1.588 8.176-1.588 7.225a.99.99 0 0 1-.072.44.545.545 0 0 1-.496.287.545.545 0 0 1-.497-.287.99.99 0 0 1-.072-.44V8.19c0-.166.024-.32.072-.44A.545.545 0 0 1 7.86 7.46a.545.545 0 0 1 .496.287c.047.12.072.274.072.44l-.072.891zm2.87-.624c-.02.16.005.32.072.466l1.85 8.8-1.85 7.918a1.1 1.1 0 0 1-.072.459.614.614 0 0 1-.563.322.614.614 0 0 1-.563-.322 1.1 1.1 0 0 1-.072-.46V7.893c0-.18.024-.346.072-.46A.614.614 0 0 1 10.81 7.1a.614.614 0 0 1 .563.322c.047.114.072.28.072.46l-.072.572zm2.87-.312c-.02.166.005.333.072.487l2.112 9.424-2.112 8.612a1.21 1.21 0 0 1-.072.477.68.68 0 0 1-.628.357.68.68 0 0 1-.629-.357 1.21 1.21 0 0 1-.072-.477V7.613c0-.193.024-.366.072-.477A.68.68 0 0 1 13.754 6.8a.68.68 0 0 1 .629.357c.047.111.072.284.072.477l-.072.252zm5.817 2.312C18.1 8.1 16.657 7.1 14.98 7.1c-.39 0-.77.05-1.132.143V20.5c0 .742.602 1.344 1.344 1.344h6.464C22.602 21.844 24 20.446 24 18.8c0-1.646-1.398-3.044-3.044-3.044-.166 0-.33.014-.49.04a5.156 5.156 0 0 0 .034-.587c0-2.846-2.308-5.154-5.153-5.154z"/>
            </svg>
          </a>
        </div>

        {/* Progress bar */}
        <div
          ref={progressRef}
          onClick={seek}
          style={{
            height: 2,
            background: 'rgba(124, 106, 247, 0.12)',
            borderRadius: 1,
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          <div style={{
            height: '100%',
            width: `${pct}%`,
            background: '#7c6af7',
            borderRadius: 1,
            transition: 'width 0.5s linear',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              right: -4,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#7c6af7',
              boxShadow: '0 0 6px rgba(124, 106, 247, 0.7)',
              opacity: pct > 0 ? 1 : 0,
            }} />
          </div>
        </div>
      </div>

      {/* YouTube label */}
      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.68rem',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: '#4a4855',
        marginTop: 48,
        marginBottom: 12,
      }}>
        Live Set
      </div>

      {/* YouTube — full width */}
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

      </div> {/* end shared width container */}
    </Box>
  );
};

export default SoundcloudSection;
