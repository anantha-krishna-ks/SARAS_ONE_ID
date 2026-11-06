// Premium stroke-icon set (Lucide-style: 24px grid, 2px round caps, currentColor).
// Single source for all iconography — replaces emoji across the app (SARAS §5.4).
import React from 'react';

const P = {
  back: <><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></>,
  sparkles: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4" /><path d="M12 8.5 13.2 11 15.5 12 13.2 13 12 15.5 10.8 13 8.5 12 10.8 11 12 8.5Z" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18Z" /></>,
  hash: <><line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" /><line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" /></>,
  target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="0.6" fill="currentColor" /></>,
  teach: <><path d="M22 10 12 5 2 10l10 5 10-5Z" /><path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" /></>,
  quiz: <><path d="M9 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-3" /><rect x="9" y="2" width="6" height="4" rx="1" /><path d="m9 13 2 2 4-4" /></>,
  homework: <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" /><path d="M14 3v5h5" /><path d="M9 14h4" /><path d="M9 17h6" /></>,
  notes: <><path d="M5 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14l-4-2-3 2-3-2-4 2Z" /><path d="M9 7h6" /><path d="M9 11h6" /></>,
  videos: <><circle cx="12" cy="12" r="9" /><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" /></>,
  eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></>,
  eyeOff: <><path d="M17.9 17.9A10.1 10.1 0 0 1 12 20c-7 0-10-8-10-8a18.5 18.5 0 0 1 5-6M9.9 4.2A9 9 0 0 1 12 4c7 0 10 8 10 8a18.5 18.5 0 0 1-2.2 3.2m-6.7-1.1a3 3 0 1 1-4.2-4.2" /><line x1="2" y1="2" x2="22" y2="22" /></>,
  camera: <><rect x="3" y="7" width="13" height="10" rx="2.5" /><path d="M16 10.5 21 8v8l-5-2.5" /></>,
  cameraOff: <><path d="M16 10.5 21 8v8l-5-2.5" /><rect x="3" y="7" width="13" height="10" rx="2.5" /><line x1="2.5" y1="2.5" x2="21.5" y2="21.5" /></>,
  book: <><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2Z" /><path d="M4 19a2 2 0 0 0 2 2h13" /></>,
  phone: <><path d="M6.6 3.5a1 1 0 0 1 1 .6l1.3 3a1 1 0 0 1-.3 1.2l-1.4 1a12 12 0 0 0 5 5l1-1.4a1 1 0 0 1 1.2-.3l3 1.3a1 1 0 0 1 .6 1V19a2 2 0 0 1-2 2A16 16 0 0 1 4 6a2 2 0 0 1 2-2Z" /></>,
  download: <><path d="M12 3v12" /><polyline points="7 11 12 16 17 11" /><path d="M5 20h14" /></>,
  refresh: <><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M21 4v4h-4" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" /><path d="M3 20v-4h4" /></>,
  send: <><path d="M4 12h15" /><polyline points="13 6 19 12 13 18" /></>,
  chevronLeft: <polyline points="15 6 9 12 15 18" />,
  chevronRight: <polyline points="9 6 15 12 9 18" />,
  lock: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  x: <><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></>,
  trophy: <><path d="M7 4h10v5a5 5 0 0 1-10 0Z" /><path d="M7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3" /><path d="M12 14v3M9 20h6M10 20v-1a2 2 0 0 1 4 0v1" /></>,
  mic: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M6 11a6 6 0 0 0 12 0" /><line x1="12" y1="17" x2="12" y2="21" /></>,
  bulb: <><path d="M9 18h6" /><path d="M10 21h4" /><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.2 1 2.5h6c0-1.3.3-1.8 1-2.5A6 6 0 0 0 12 3Z" /></>,
  speech: <><path d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-4 4V5Z" /></>,
  brain: <><path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 3 3 2 2 0 0 0 3-1.7V6A2 2 0 0 0 9 4Z" /><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-3 3 2 2 0 0 1-3-1.7V6A2 2 0 0 1 15 4Z" /></>,
  zap: <polygon points="13 2 4 14 11 14 10 22 20 10 13 10 13 2" />,
  clock: <><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 14" /></>,
  image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="9" r="1.6" /><path d="m21 16-5-5L5 20" /></>,
  chat: <><path d="M21 12a8 8 0 0 1-11.4 7.2L4 20l1-4.8A8 8 0 1 1 21 12Z" /></>,
  check: <polyline points="20 6 9 17 4 12" />,
  alert: <><path d="M12 3 2 20h20L12 3Z" /><line x1="12" y1="10" x2="12" y2="14" /><circle cx="12" cy="17.5" r="0.6" fill="currentColor" /></>,
  play: <polygon points="7 5 19 12 7 19 7 5" fill="currentColor" stroke="none" />,
  pause: <><rect x="7" y="5" width="3.5" height="14" rx="1" /><rect x="13.5" y="5" width="3.5" height="14" rx="1" /></>,
  micOff: <><line x1="2" y1="2" x2="22" y2="22" /><path d="M9 9v2a3 3 0 0 0 4.6 2.5" /><path d="M15 10V6a3 3 0 0 0-5.7-1.3" /><path d="M6 11a6 6 0 0 0 9 5.2M18 11v0" /><line x1="12" y1="19" x2="12" y2="22" /></>,
  phoneOff: <><path d="M6.6 3.5a1 1 0 0 1 1 .6l1.3 3a1 1 0 0 1-.3 1.2l-1.4 1a12 12 0 0 0 5 5l1-1.4a1 1 0 0 1 1.2-.3l3 1.3a1 1 0 0 1 .6 1V19" /><line x1="2" y1="2" x2="22" y2="22" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  upload: <><path d="M12 15V3" /><polyline points="7 8 12 3 17 8" /><path d="M5 21h14" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><polygon points="16 8 13 13 8 16 11 11 16 8" fill="currentColor" stroke="none" /></>,
  ban: <><circle cx="12" cy="12" r="9" /><line x1="6" y1="6" x2="18" y2="18" /></>,
  settings: <><path d="M12 15.4a3.4 3.4 0 1 0 0-6.8 3.4 3.4 0 0 0 0 6.8Z" /><path d="M19.4 12c0-.5-.05-1-.13-1.46l1.86-1.45-1.8-3.12-2.2.9a7.3 7.3 0 0 0-2.53-1.47L14.2 3h-3.6l-.34 2.4a7.3 7.3 0 0 0-2.53 1.47l-2.2-.9-1.8 3.12L5.6 10.6a7.4 7.4 0 0 0 0 2.92l-1.86 1.45 1.8 3.12 2.2-.9a7.3 7.3 0 0 0 2.53 1.47l.34 2.34h3.6l.34-2.4a7.3 7.3 0 0 0 2.53-1.47l2.2.9 1.8-3.12-1.86-1.39c.08-.47.13-.96.13-1.46Z" /></>,
  logout: <><path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" /></>,
  robot: <><rect x="4.5" y="8" width="15" height="11" rx="3" /><path d="M12 4.5v3.5" /><circle cx="12" cy="3.6" r="1.3" /><circle cx="9.5" cy="13" r="1.15" fill="currentColor" stroke="none" /><circle cx="14.5" cy="13" r="1.15" fill="currentColor" stroke="none" /><path d="M2.6 12.5v3M21.4 12.5v3" /></>,
  stop: <rect x="6" y="6" width="12" height="12" rx="2.5" fill="currentColor" stroke="none" />,
  crown: <><path d="m3 6 3.5 3.2L12 4l5.5 5.2L21 6l-1.8 11H4.8L3 6Z" /><line x1="4.8" y1="20" x2="19.2" y2="20" /></>,
  shield: <><path d="M12 3 5 6v6c0 4 3 6.6 7 8 4-1.4 7-4 7-8V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></>,
};

export default function Icon({ name, size = 16, stroke = 2, style, className }) {
  const d = P[name];
  if (!d) return null;
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" focusable="false"
      style={{ flexShrink: 0, display: 'block', ...style }}
      className={className}
    >
      {d}
    </svg>
  );
}
