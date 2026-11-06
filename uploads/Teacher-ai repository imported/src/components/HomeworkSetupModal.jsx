import React, { useState } from 'react';
import Icon from './Icon';

// Must match QTYPE_META keys/marks in backend/openai_service.py
const QUESTION_TYPES = [
  { type: 'mcq',          label: 'Multiple choice',    hint: '4 options, one correct', marks: 1, icon: 'quiz' },
  { type: 'true_false',   label: 'True / False',       hint: 'judge a statement',      marks: 1, icon: 'check' },
  { type: 'fill_blank',   label: 'Fill in the blank',  hint: 'one-word answer',        marks: 1, icon: 'notes' },
  { type: 'short_answer', label: 'Short answer',       hint: '2-3 sentences',          marks: 2, icon: 'homework' },
  { type: 'long_answer',  label: 'Long answer',        hint: 'detailed explanation',   marks: 5, icon: 'book' },
];
const DIFFICULTIES = [
  { label: 'Easy', icon: 'check' },
  { label: 'Medium', icon: 'target' },
  { label: 'Hard', icon: 'zap' },
];

const stepBtnStyle = {
  width: '28px', height: '28px', borderRadius: '8px', border: '1px solid var(--glass-border)',
  background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '16px', fontWeight: '600',
  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1,
};

/**
 * Homework setup card (centre-screen overlay). The teacher/student chooses how many
 * of each question type to include and the difficulty, then clicks Generate.
 */
export default function HomeworkSetupModal({ open, busy, difficulty, setDifficulty, onGenerate, onClose }) {
  // counts keyed by question type
  const [counts, setCounts] = useState({ mcq: 2, true_false: 2, fill_blank: 0, short_answer: 1, long_answer: 0 });

  if (!open) return null;

  const setCount = (type, delta) =>
    setCounts((c) => ({ ...c, [type]: Math.max(0, Math.min(15, (c[type] || 0) + delta)) }));

  const totalQ = QUESTION_TYPES.reduce((s, t) => s + (counts[t.type] || 0), 0);
  const totalMarks = QUESTION_TYPES.reduce((s, t) => s + (counts[t.type] || 0) * t.marks, 0);

  const handleGenerate = () => {
    if (totalQ === 0 || busy) return;
    const question_mix = QUESTION_TYPES
      .filter((t) => (counts[t.type] || 0) > 0)
      .map((t) => ({ type: t.type, count: counts[t.type] }));
    onGenerate(question_mix);
  };

  return (
    <div
      onClick={busy ? undefined : onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(20,30,50,0.42)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '760px', maxHeight: '90vh', display: 'flex', flexDirection: 'column',
          background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)',
          borderRadius: '20px', boxShadow: 'var(--shadow-lg)', overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, padding: '22px 24px', borderBottom: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
            <span style={{ width: 42, height: 42, borderRadius: 12, flexShrink: 0, display: 'grid', placeItems: 'center', color: '#fff', background: 'var(--accent-gradient)', boxShadow: '0 6px 16px -6px var(--accent-glow)' }}>
              <Icon name="homework" size={20} />
            </span>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--text-main)', fontSize: '19px', fontWeight: 600, lineHeight: 1.2 }}>Homework Setup</h2>
              <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: 2 }}>Built from the current page · pick types, counts &amp; difficulty</p>
            </div>
          </div>
          <button onClick={onClose} disabled={busy} aria-label="Close"
            style={{ width: 34, height: 34, flexShrink: 0, borderRadius: 9, background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)', color: 'var(--text-muted)', cursor: busy ? 'default' : 'pointer', display: 'grid', placeItems: 'center' }}>
            <Icon name="x" size={16} />
          </button>
        </div>

        {/* Body — two columns */}
        <div className="hw-body">
          {/* Left: configuration */}
          <div className="hw-config">
            <label className="hw-label">Difficulty</label>
            <div style={{ display: 'flex', gap: '8px', margin: '8px 0 20px' }}>
              {DIFFICULTIES.map((d) => (
                <button
                  key={d.label}
                  onClick={() => setDifficulty(d.label)}
                  className="control-btn"
                  style={{
                    flex: 1, justifyContent: 'center', gap: 6,
                    background: difficulty === d.label ? 'var(--accent-color)' : 'var(--bg-tertiary)',
                    color: difficulty === d.label ? '#fff' : 'var(--text-main)',
                    border: difficulty === d.label ? '1px solid var(--accent-color)' : '1px solid var(--glass-border)',
                  }}
                >
                  <Icon name={d.icon} size={14} /> {d.label}
                </button>
              ))}
            </div>

            <label className="hw-label">Question types</label>
            <div className="hw-types">
              {QUESTION_TYPES.map((t) => {
                const active = (counts[t.type] || 0) > 0;
                return (
                  <div key={t.type} className="hw-type" data-active={active}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span className="hw-type-ic"><Icon name={t.icon} size={17} /></span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main)' }}>{t.label}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t.hint} · {t.marks} mark{t.marks > 1 ? 's' : ''}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button onClick={() => setCount(t.type, -1)} style={stepBtnStyle} aria-label={`Fewer ${t.label}`}>−</button>
                      <span style={{ minWidth: '18px', textAlign: 'center', fontWeight: '600', color: 'var(--text-main)', fontFamily: 'var(--font-display)' }}>{counts[t.type] || 0}</span>
                      <button onClick={() => setCount(t.type, +1)} style={stepBtnStyle} aria-label={`More ${t.label}`}>+</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: summary rail */}
          <aside className="hw-summary">
            <div className="hw-summary-title">Summary</div>
            <div className="hw-stat">
              <span className="hw-stat-num">{totalQ}</span>
              <span className="hw-stat-lbl">question{totalQ !== 1 ? 's' : ''}</span>
            </div>
            <div className="hw-stat">
              <span className="hw-stat-num">{totalMarks}</span>
              <span className="hw-stat-lbl">total marks</span>
            </div>
            <div className="hw-stat">
              <span className="hw-stat-num" style={{ fontSize: 18 }}>{difficulty}</span>
              <span className="hw-stat-lbl">difficulty</span>
            </div>
            <div style={{ flex: 1 }} />
            <button
              className="control-btn success"
              style={{ width: '100%', justifyContent: 'center', height: 44 }}
              onClick={handleGenerate}
              disabled={totalQ === 0 || busy}
            >
              {busy ? 'Generating…' : (<><Icon name="sparkles" size={15} /> <span>Generate</span></>)}
            </button>
            <button className="control-btn" style={{ width: '100%', justifyContent: 'center' }} onClick={onClose} disabled={busy}>
              Cancel
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}
