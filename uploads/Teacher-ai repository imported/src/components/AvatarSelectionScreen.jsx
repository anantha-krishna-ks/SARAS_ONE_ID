import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import Icon from './Icon';
import { avatarModelUrl } from '../avatarModels';

const AVATARS = [
  {
    id: '/brunette.glb',
    name: 'Dr. Sofia',
    description: 'Ready Player Me — Default teacher',
    cameraTarget: '0m 1.62m 0m',
    cameraOrbit: '0deg 85deg 0.85m'
  },
  {
    id: '/avaturn.glb',
    name: 'Prof. Maya',
    description: 'Avaturn — Highly detailed model',
    cameraTarget: '0m 1.72m 0m',
    cameraOrbit: '0deg 85deg 0.85m'
  },
  {
    id: '/mpfb.glb',
    name: 'Ms. Priya',
    description: 'MPFB — Blender generated avatar',
    cameraTarget: '0m 1.65m 0m',
    cameraOrbit: '0deg 85deg 0.80m'
  },
  {
    id: '/avatarsdk.glb',
    name: 'Prof. Alex',
    description: 'AvatarSDK — AI generated avatar',
    cameraTarget: '0m 1.66m 0m',
    cameraOrbit: '0deg 85deg 0.85m'
  }
];

export default function AvatarSelectionScreen({
  onLogout,
  onSelectAvatar,
  currentAvatar,
  onEnterClassroom,
  selectedAccent,
  setSelectedAccent,
  catalog,
  selectedClass,
  setSelectedClass,
  selectedSubject,
  setSelectedSubject,
  selectedBookName,
  setSelectedBookName,
}) {
  const classOptions = catalog ? Object.keys(catalog) : [];
  const subjectOptions = selectedClass && catalog[selectedClass] ? Object.keys(catalog[selectedClass]) : [];
  const bookOptions = selectedClass && selectedSubject && catalog[selectedClass]?.[selectedSubject]
    ? catalog[selectedClass][selectedSubject] : [];

  const handleClassChange = (val) => {
    setSelectedClass(val);
    setSelectedSubject('');
    setSelectedBookName('');
  };

  const handleSubjectChange = (subject) => {
    setSelectedSubject(subject);
    const books = subject && catalog[selectedClass]?.[subject] ? catalog[selectedClass][subject] : [];
    setSelectedBookName(books.length === 1 ? books[0] : '');
  };

  const bookReady = selectedClass && selectedSubject && selectedBookName;
  // Class, Subject AND Chapter are all mandatory before a session can start.
  const canEnter = !!currentAvatar && !!bookReady;
  const step1Done = !!bookReady;
  const step2Done = !!currentAvatar;
  const [entering, setEntering] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const handleEnter = () => {
    if (!canEnter || entering) return;
    setEntering(true);
    setTimeout(() => onEnterClassroom(currentAvatar), 1000);
  };

  return (
    <div className={`setup-screen theme-day${entering ? ' is-entering' : ''}`} style={{ position: 'relative' }}>
      {/* ── Primary header ── */}
      <header className="studio-header">
        <div className="studio-brand">
          <img src="public/es-logo.png" alt="Excelsoft" className="studio-logo-img" />
        </div>
        <button className="studio-logout" onClick={() => setShowLogout(true)} title="Log out">
          <Icon name="logout" size={15} /> <span>Logout</span>
        </button>
      </header>

      <div className="setup-panel">
        {/* Page title — hero */}
        <header className="setup-header">
          <span className="setup-flourish" aria-hidden="true">
            <svg width="240" height="12" viewBox="0 0 240 12" fill="none">
              <defs>
                <linearGradient id="flRule" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stop-color="currentColor" stop-opacity="0" />
                  <stop offset="1" stop-color="currentColor" stop-opacity="0.7" />
                </linearGradient>
                <linearGradient id="flRuleR" x1="1" y1="0" x2="0" y2="0">
                  <stop offset="0" stop-color="currentColor" stop-opacity="0" />
                  <stop offset="1" stop-color="currentColor" stop-opacity="0.7" />
                </linearGradient>
              </defs>
              <path d="M6 6h96" stroke="url(#flRule)" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M234 6h-96" stroke="url(#flRuleR)" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M120 1.5l4.2 4.5-4.2 4.5-4.2-4.5 4.2-4.5Z" fill="currentColor" />
            </svg>
          </span>
          <span className="setup-eyebrow-hero" style={{ display: 'none' }}></span>
          <h1 className="setup-title">Learn with your AI teacher</h1>
          <p className="setup-subtitle">
            Two quick steps — pick your chapter, choose your AI teacher,<br />and your classroom opens ready to go.
          </p>
        </header>

        {/* Progress stepper */}
        <ol className="setup-stepper" aria-label="Setup progress">
          <li className={`stepper-item ${step1Done ? 'done' : 'active'}`}>
            <span className="stepper-dot">{step1Done ? <Icon name="check" size={15} stroke={2.6} /> : '1'}</span>
            <span className="stepper-text">
              <span className="stepper-k">Step 1</span>
              <span className="stepper-v">Choose chapter</span>
            </span>
          </li>
          <li className="stepper-line" aria-hidden="true" />
          <li className={`stepper-item ${step2Done ? 'done' : (step1Done ? 'active' : '')}`}>
            <span className="stepper-dot">{step2Done ? <Icon name="check" size={15} stroke={2.6} /> : '2'}</span>
            <span className="stepper-text">
              <span className="stepper-k">Step 2</span>
              <span className="stepper-v">Pick teacher</span>
            </span>
          </li>
        </ol>

        {/* Step 1 — Chapter */}
        <section className={`setup-card ${step1Done ? 'is-complete' : ''}`}>
          <div className="setup-card-head">
            <span className="step-num">1</span>
            <div className="setup-card-titles">
              <h2 className="setup-card-title">Select your chapter</h2>
              <p className="setup-card-sub">Choose the textbook and chapter for this session.</p>
            </div>
            <span className={`setup-pill ${step1Done ? 'ok' : ''}`}>{step1Done ? 'Ready' : 'Required'}</span>
          </div>
          <div className="config-grid">
            <div className="config-field">
              <label>Class <span className="required-star">*</span></label>
              <Dropdown
                icon={<Icon name="teach" size={16} />}
                placeholder="Select class…"
                value={selectedClass}
                options={classOptions.map(c => ({ value: c, label: c }))}
                onChange={handleClassChange}
              />
            </div>

            <div className="config-field">
              <label>Subject <span className="required-star">*</span></label>
              <Dropdown
                icon={<Icon name="book" size={16} />}
                placeholder={selectedClass ? 'Select subject…' : 'Select a class first'}
                value={selectedSubject}
                disabled={!selectedClass}
                options={subjectOptions.map(s => ({ value: s, label: s }))}
                onChange={handleSubjectChange}
              />
            </div>

            <div className="config-field">
              <label>Chapter <span className="required-star">*</span></label>
              <Dropdown
                icon={<Icon name="homework" size={16} />}
                placeholder={selectedSubject ? 'Select chapter…' : 'Select a subject first'}
                value={selectedBookName}
                disabled={!selectedSubject}
                options={bookOptions.map(b => ({ value: b, label: b.replace(/\.pdf$/i, '') }))}
                onChange={setSelectedBookName}
              />
            </div>
          </div>

          {classOptions.length === 0 && (
            <p className="empty-hint">No chapters available in the library.</p>
          )}
        </section>

        {/* Step 2 — Teacher */}
        <section className={`setup-card ${step2Done ? 'is-complete' : ''}`}>
          <div className="setup-card-head">
            <span className="step-num">2</span>
            <div className="setup-card-titles">
              <h2 className="setup-card-title">Choose your AI teacher</h2>
              <p className="setup-card-sub">Select a presenter, then set the voice accent.</p>
            </div>
            <div className="accent-inline">
              <span className="accent-inline-label">Voice accent</span>
              <div className="accent-tabs" role="tablist" aria-label="Voice accent">
                <span className="accent-tab-indicator" data-pos={selectedAccent === 'US' ? '0' : '1'} aria-hidden="true" />
                <button
                  type="button" role="tab" id="accent-tab-us"
                  aria-selected={selectedAccent === 'US'} aria-controls="teacher-grid"
                  className={`accent-tab ${selectedAccent === 'US' ? 'is-active' : ''}`}
                  onClick={() => setSelectedAccent('US')}
                >
                  <img src="public/flags/us.png" alt="" aria-hidden="true" style={{ width: '20px', height: '14px', borderRadius: '2px', objectFit: 'cover', display: 'block' }} /> <span>US English</span>
                </button>
                <button
                  type="button" role="tab" id="accent-tab-in"
                  aria-selected={selectedAccent === 'IN'} aria-controls="teacher-grid"
                  className={`accent-tab ${selectedAccent === 'IN' ? 'is-active' : ''}`}
                  onClick={() => setSelectedAccent('IN')}
                >
                  <img src="public/flags/in.png" alt="" aria-hidden="true" style={{ width: '20px', height: '14px', borderRadius: '2px', objectFit: 'cover', display: 'block' }} /> <span>Indian English</span>
                </button>
              </div>
            </div>
          </div>
          <div className="teacher-grid" id="teacher-grid">
            {AVATARS.map((avatar) => (
              <button
                key={avatar.id}
                type="button"
                className={`teacher-card ${currentAvatar === avatar.id ? 'is-selected' : ''}`}
                onClick={() => onSelectAvatar(avatar.id)}
                aria-pressed={currentAvatar === avatar.id}
              >
                {currentAvatar === avatar.id && (
                  <span className="teacher-check" aria-hidden="true"><Icon name="check" size={13} stroke={3} /></span>
                )}
                <div className="teacher-stage">
                  <model-viewer
                    src={avatarModelUrl(avatar.id)}
                    alt={avatar.name}
                    disable-zoom
                    disable-pan
                    disable-tap
                    interaction-prompt="none"
                    camera-target={avatar.cameraTarget}
                    camera-orbit={avatar.cameraOrbit}
                    min-camera-orbit={avatar.cameraOrbit}
                    max-camera-orbit={avatar.cameraOrbit}
                    field-of-view="24deg"
                    style={{ width: '100%', height: '100%', backgroundColor: 'transparent', cursor: 'pointer', pointerEvents: 'none' }}
                  />
                </div>
                <div className="teacher-meta">
                  <div className="teacher-meta-top">
                    <span className="teacher-name">{avatar.name}</span>
                    <span className="teacher-status">{currentAvatar === avatar.id ? 'Selected' : 'Select'}</span>
                  </div>
                  <span className="teacher-role">{avatar.description}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="setup-cta">
          <button className="enter-btn" disabled={!canEnter || entering} onClick={handleEnter}>
            Enter Classroom
            <span className="enter-arrow">→</span>
          </button>
        </div>
      </div>

      {showLogout && (
        <div className="logout-overlay" role="dialog" aria-modal="true" aria-labelledby="logout-title" onClick={() => setShowLogout(false)}>
          <div className="logout-card" onClick={(e) => e.stopPropagation()}>
            <span className="logout-ic"><Icon name="logout" size={22} /></span>
            <h2 id="logout-title" className="logout-title">Log out?</h2>
            <p className="logout-msg">You'll need to sign in again to continue your session.</p>
            <div className="logout-actions">
              <button className="logout-btn cancel" onClick={() => setShowLogout(false)}>Cancel</button>
              <button className="logout-btn confirm" onClick={onLogout}>Log out</button>
            </div>
          </div>
        </div>
      )}

      {entering && (
        <div className="enter-cine" role="status" aria-label="Entering classroom">
          <span className="enter-panel enter-panel--top" aria-hidden="true" />
          <span className="enter-panel enter-panel--bottom" aria-hidden="true" />
          <span className="enter-seam" aria-hidden="true" />
          <span className="enter-sweep" aria-hidden="true" />
          <div className="enter-core">
            <span className="enter-emblem">
              <span className="enter-ring" aria-hidden="true" />
              <span className="enter-emblem-face"><Icon name="teach" size={30} stroke={2} style={{ color: '#fff' }} /></span>
            </span>
            <span className="enter-title">Entering classroom</span>
            <span className="enter-progress" aria-hidden="true"><i /></span>
          </div>
        </div>
      )}
    </div>
  );
}
