import React, { useState, useRef, useEffect } from 'react';

// Header popover menu: a trigger button + a panel that closes on outside-click
// or Escape (same proven pattern as Dropdown.jsx). `children` may be a render
// function receiving a `close()` helper so menu items can dismiss the panel.
export default function HeaderMenu({ trigger, ariaLabel, align = 'right', disabled, panelClass = '', children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDocClick); document.removeEventListener('keydown', onKey); };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className={`hdr-menu${open ? ' is-open' : ''}`} ref={ref}>
      <button
        type="button"
        className={`control-btn hdr-menu-trigger${open ? ' is-active' : ''}`}
        disabled={disabled}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen(o => !o)}
      >
        {trigger}
        <svg className="hdr-menu-caret" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
      </button>
      {open && (
        <div className={`hdr-menu-panel hdr-menu-panel--${align} ${panelClass}`} role="menu">
          {typeof children === 'function' ? children(close) : children}
        </div>
      )}
    </div>
  );
}
