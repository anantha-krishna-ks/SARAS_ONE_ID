import React, { useState } from 'react';
import Icon from './Icon';

// One gallery tile: a realistic portrait, with a soft gradient + silhouette
// fallback if the photo can't load (offline / blocked network).
function AvatarTile({ t }) {
  const [err, setErr] = useState(false);
  return (
    <div className="gal-tile" style={err ? { background: t.bg, color: t.fg } : undefined}>
      {err ? (
        <div style={{ height: t.h + 'px', display: 'grid', placeItems: 'center' }}>
          <Icon name="user" size={Math.round(t.h * 0.36)} stroke={1.4} style={{ opacity: 0.85 }} />
        </div>
      ) : (
        <img src={t.src} alt="" loading="lazy" onError={() => setErr(true)} style={{ height: t.h + 'px' }} />
      )}
    </div>
  );
}

const MOCK_USERS = [
  { username: 'sumith', password: 'sumith@123', tenant: 'Oupi' },
  { username: 'deepa', password: 'deepa@123', tenant: 'Oupi' },
  { username: 'avinash', password: 'avinash@123', tenant: 'Oupi' },
  { username: 'Oupi_123', password: 'Oupi@123', tenant: 'Oupi' },
  { username: 'Kumar01', password: 'Kumar@123', tenant: 'Kumar' },
  
];

export default function LoginScreen({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = MOCK_USERS.find(u => u.username.toLowerCase() === username.trim().toLowerCase() && u.password === password);
    if (user) {
      setError('');
      const named = { ...user, username: user.username.charAt(0).toUpperCase() + user.username.slice(1) };
      setToast(named);
      setTimeout(() => onLoginSuccess(named), 1100);
    } else {
      setError('Invalid username or password');
    }
  };

  // Real portrait photos stored locally (one per tile, no repeats).
  const AV = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,29]
    .map(n => `public/avatars/a${n}.jpg`);
  const grads = [
    'linear-gradient(160deg,#cfe0f9,#a9c6f0)', 'linear-gradient(160deg,#cfe8df,#a6d3c5)',
    'linear-gradient(160deg,#ded8f2,#c1b8e8)', 'linear-gradient(160deg,#f2dee0,#e2bec3)',
    'linear-gradient(160deg,#dde6f1,#bfccdf)',
  ];
  const fgs = ['#5a80c6', '#559b88', '#7a6dbf', '#bf7883', '#6c82a1'];
  const heights = [78, 96, 68, 88, 74, 100, 66, 90, 80, 70, 94, 72, 86, 76, 98, 64, 84, 92, 68, 82, 74, 96, 70, 88, 78, 66, 90, 72, 94];
  const TILES = AV.map((src, i) => ({
    h: heights[i % heights.length],
    src,
    bg: grads[i % grads.length],
    fg: fgs[i % fgs.length],
  }));

  return (
    <div className="theme-day login-root">
      {toast && (
        <div className="login-toast" role="status">
          <span className="login-toast-ic"><Icon name="check" size={16} stroke={3} /></span>
          <div className="login-toast-txt">
            <span className="login-toast-title">Welcome, {toast.username}</span>
            <span className="login-toast-sub">Signing you in…</span>
          </div>
        </div>
      )}
      {/* ── Sign-in ── */}
      <main className="login-formwrap">
        <div className="login-form-inner login-enter">
          <div className="login-card">
          <span className="login-card-accent" aria-hidden="true" />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <img src="public/es-logo.png" alt="Excelsoft" className="login-logo-img" />
            <h1 style={{ fontSize: '24px', fontWeight: '600', color: 'var(--text-main)', marginBottom: '6px', letterSpacing: '-0.02em' }}>Welcome back</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Sign in to meet your AI teacher and continue learning.</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {error && (
              <div role="alert" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--error-color)', fontSize: '13px', background: 'rgba(220, 38, 38, 0.08)', border: '1px solid rgba(220, 38, 38, 0.22)', padding: '10px 12px', borderRadius: '10px', fontWeight: '500' }}>
                <Icon name="alert" size={15} /> {error}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="login-username" style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main)' }}>Username</label>
              <input
                id="login-username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter your username"
                autoComplete="username"
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--glass-border)',
                  padding: '13px 15px',
                  borderRadius: '12px',
                  color: 'var(--text-main)',
                  fontSize: '14.5px',
                  outline: 'none',
                  width: '100%',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s, box-shadow 0.2s'
                }}
                onFocus={e => { e.target.style.borderColor = 'var(--accent-color)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-subtle)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--glass-border)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="login-password" style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main)' }}>Password</label>
              <div style={{ position: 'relative', width: '100%' }}>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--glass-border)',
                    padding: '13px 46px 13px 15px',
                    borderRadius: '12px',
                    color: 'var(--text-main)',
                    fontSize: '14.5px',
                    outline: 'none',
                    width: '100%',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s, box-shadow 0.2s'
                  }}
                  onFocus={e => { e.target.style.borderColor = 'var(--accent-color)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-subtle)'; }}
                  onBlur={e => { e.target.style.borderColor = 'var(--glass-border)'; e.target.style.boxShadow = 'none'; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  title={showPassword ? 'Hide password' : 'Show password'}
                  style={{
                    position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', padding: '6px', margin: 0, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', lineHeight: 0
                  }}
                >
                  <Icon name={showPassword ? 'eyeOff' : 'eye'} size={19} />
                </button>
              </div>
            </div>

            <button type="submit" style={{
              background: 'var(--accent-gradient)',
              border: 'none',
              padding: '15px',
              borderRadius: '12px',
              color: 'var(--on-accent)',
              fontWeight: '600',
              fontSize: '15px',
              cursor: 'pointer',
              marginTop: '4px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              boxShadow: '0 4px 14px -6px var(--accent-glow)',
              transition: 'transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1.5px)'; e.currentTarget.style.boxShadow = '0 6px 16px -6px var(--accent-glow)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px -6px var(--accent-glow)'; }}
            onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.97)'; }}
            onMouseUp={e => { e.currentTarget.style.transform = 'translateY(-1.5px)'; }}
            >
              Sign In <Icon name="send" size={17} />
            </button>
          </form>

          <div className="login-secure">
            <Icon name="shield" size={14} /> Secure sign-in · your session stays on this device
          </div>
          </div>
        </div>
      </main>

      {/* ── Avatar gallery wall (decorative) ── */}
      <aside className="login-gallery" aria-hidden="true">
        <div className="login-gallery-fade" />
        <div className="gal-wall">
          {[0, 1, 2].map((ci) => {
            const col = TILES.filter((_, i) => i % 3 === ci);
            const loop = [...col, ...col];
            return (
              <div className={`gal-col gal-col-${ci}`} key={ci}>
                {loop.map((t, i) => <AvatarTile key={i} t={t} />)}
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
