import React from 'react';
import QuizPanel from './QuizPanel';
import HomeworkPanel from './HomeworkPanel';
import LearningOutcomesBanner from './LearningOutcomesBanner';
import Dropdown from './Dropdown';
import HeaderMenu from './HeaderMenu';
import Icon from './Icon';
import { apiUrl } from '../config';
import { LANGUAGE_OPTIONS } from '../languages';

const STYLE_OPTIONS = [
  { value: 'Simple', label: 'Simple' },
  { value: 'Detailed', label: 'Detailed' },
  { value: 'Step-by-Step', label: 'Step-by-Step' },
  { value: 'Storytelling', label: 'Storytelling' },
  { value: 'Exam Focused', label: 'Exam Focused' },
];
const QUESTION_OPTIONS = [
  { value: 3, label: '3 Questions' },
  { value: 5, label: '5 Questions' },
  { value: 10, label: '10 Questions' },
];

export default function BookReader({
  onBack,
  onLogout,
  locked = false,
  currentBook,
  currentPageText,
  currentPage,
  totalPages,
  onPageChange,
  onTeachPage,
  onGenerateQuizClick,
  onGenerateHomeworkClick,
  isGeneratingHomework,
  activeHomework,
  setActiveHomework,
  onPocketNotes,
  isGeneratingNotes,
  onFetchVideos,
  isLoadingVideos,
  selectedStyle,
  setSelectedStyle,
  numQuestions,
  setNumQuestions,
  isExplaining,
  isGeneratingQuiz,
  workspaceMode,
  setWorkspaceMode,
  activeQuiz,
  setActiveQuiz,
  onQuizSubmit,
  teachingLanguage,
  setTeachingLanguage,
  llmProvider,
  isVisionActive,
  setIsVisionActive,
  showVisionPreview,
  setShowVisionPreview,
  chapterLOs,
  isLoadingLOs,
  showLOBanner,
  setShowLOBanner,
  onPlayAvatarBriefing,
  onOpenLOModal,
}) {
  return (
    <div className="left-pane">
      {/* ── Header ── */}
      <header className="reader-header">
        {/* Left Controls & Logo */}
        <div className="logo-section" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onBack}
            disabled={locked}
            title={locked ? "End the teacher call first" : "Back to Dashboard"}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: locked ? 'not-allowed' : 'pointer',
              opacity: locked ? 0.4 : 1,
              color: 'var(--text-main)',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => { if (!locked) e.currentTarget.style.background = 'var(--bg-tertiary)'; }}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src="public/es-logo.png" alt="Excelsoft" className="reader-logo-img" />
          </div>
          {currentBook && (
            <span className="book-title" title={currentBook.title} style={{ marginLeft: '1rem' }}>{currentBook.title}</span>
          )}
        </div>

        {/* Right side controls */}
        <div className="reader-header-controls">
          {/* Only show controls after book loaded */}
          {currentBook && (
            <div className="reader-controls">
              {/* Primary action — always visible */}
              <button
                className="control-btn primary"
                onClick={onTeachPage}
                disabled={isExplaining || locked}
                title="Explain the current page"
              >
                <Icon name="teach" /> <span>{isExplaining ? "Explaining…" : "Teach Me Page"}</span>
              </button>

              <span className="ctl-sep" aria-hidden="true" />

              {/* Learning activities — grouped to keep the bar uncluttered */}
              <HeaderMenu
                ariaLabel="Learning activities"
                disabled={locked}
                trigger={<><Icon name="sparkles" /> <span>Activities</span></>}
              >
                {(close) => (
                  <>
                    <div className="hdr-menu-title">Learning activities</div>
                    <button
                      className="hdr-menu-item"
                      onClick={() => { close(); onOpenLOModal(); }}
                      disabled={locked}
                      title="View Chapter Objectives, Learning Outcomes & Orientation"
                    >
                      <span className="hdr-menu-ic"><Icon name="target" size={17} /></span>
                      <span className="hdr-menu-txt"><span className="hdr-menu-k">Objectives &amp; LOs</span><span className="hdr-menu-d">Chapter goals & orientation</span></span>
                    </button>
                    <button
                      className={`hdr-menu-item${activeQuiz ? ' is-active' : ''}`}
                      onClick={() => { close(); onGenerateQuizClick(); }}
                      disabled={isGeneratingQuiz || !!activeQuiz || locked}
                    >
                      <span className="hdr-menu-ic"><Icon name="quiz" size={17} /></span>
                      <span className="hdr-menu-txt"><span className="hdr-menu-k">{isGeneratingQuiz ? "Generating…" : "Quiz"}</span><span className="hdr-menu-d">Pop quiz for this page</span></span>
                      {activeQuiz && <span className="hdr-menu-active"><Icon name="check" size={12} stroke={3} /> Active</span>}
                    </button>
                    <button
                      className={`hdr-menu-item${activeHomework ? ' is-active' : ''}`}
                      onClick={() => { close(); onGenerateHomeworkClick(); }}
                      disabled={isGeneratingHomework || locked}
                      title="Generate written homework, then grade a photo of the answers"
                    >
                      <span className="hdr-menu-ic"><Icon name="homework" size={17} /></span>
                      <span className="hdr-menu-txt"><span className="hdr-menu-k">{isGeneratingHomework ? "Generating…" : "Homework"}</span><span className="hdr-menu-d">Write & grade from a photo</span></span>
                      {activeHomework && <span className="hdr-menu-active"><Icon name="check" size={12} stroke={3} /> Active</span>}
                    </button>
                    <button
                      className="hdr-menu-item"
                      onClick={() => { close(); onPocketNotes(); }}
                      disabled={isGeneratingNotes || locked}
                      title="Quick revision notes for this page"
                    >
                      <span className="hdr-menu-ic"><Icon name="notes" size={17} /></span>
                      <span className="hdr-menu-txt"><span className="hdr-menu-k">{isGeneratingNotes ? "Writing…" : "Notes"}</span><span className="hdr-menu-d">Quick revision notes</span></span>
                    </button>
                    <button
                      className="hdr-menu-item"
                      onClick={() => { close(); onFetchVideos(); }}
                      disabled={isLoadingVideos || locked}
                      title="Find related YouTube videos for this chapter"
                    >
                      <span className="hdr-menu-ic"><Icon name="videos" size={17} /></span>
                      <span className="hdr-menu-txt"><span className="hdr-menu-k">{isLoadingVideos ? "Finding…" : "Videos"}</span><span className="hdr-menu-d">Related reference videos</span></span>
                    </button>
                  </>
                )}
              </HeaderMenu>

              <span className="ctl-sep" aria-hidden="true" />

              {/* Attention Guard — turns the webcam on so the lesson pauses when
                  the student looks away. Everything runs on-device; no frame
                  ever leaves the browser. */}
              <button
                className={`control-btn control-btn--icon${isVisionActive ? ' success' : ''}`}
                onClick={() => setIsVisionActive(!isVisionActive)}
                disabled={locked}
                title={isVisionActive
                  ? "Attention Guard is ON — click to turn the camera off"
                  : "Attention Guard: pause the lesson if you look away (uses your webcam, on-device only)"}
                aria-label={isVisionActive ? "Attention Guard on" : "Attention Guard off"}
              >
                <Icon name={isVisionActive ? 'eye' : 'eyeOff'} /> <span>{isVisionActive ? "Guard On" : "Guard"}</span>
              </button>

              {/* Show/hide the little camera preview while the guard is running. */}
              {isVisionActive && (
                <button
                  className="control-btn control-btn--icon"
                  onClick={() => setShowVisionPreview(!showVisionPreview)}
                  disabled={locked}
                  title={showVisionPreview ? "Hide the camera preview" : "Show the camera preview"}
                  aria-label={showVisionPreview ? "Hide camera preview" : "Show camera preview"}
                >
                  <Icon name={showVisionPreview ? 'cameraOff' : 'camera'} />
                </button>
              )}

              <span className="ctl-sep" aria-hidden="true" />

              {/* Session preferences — tucked into a settings popover */}
              <HeaderMenu
                ariaLabel="Session settings"
                disabled={locked}
                panelClass="hdr-menu-panel--settings"
                trigger={<Icon name="settings" />}
              >
                {() => (
                  <>
                    <div className="hdr-menu-title">Session settings</div>
                    <label className="hdr-field">
                      <span className="hdr-field-label">Explanation style</span>
                      <Dropdown
                        compact
                        ariaLabel="Explanation style"
                        icon={<Icon name="sparkles" size={14} />}
                        value={selectedStyle}
                        options={STYLE_OPTIONS}
                        onChange={setSelectedStyle}
                        disabled={locked}
                      />
                    </label>
                    <label className="hdr-field">
                      <span className="hdr-field-label">Teaching language</span>
                      <Dropdown
                        compact
                        ariaLabel="Teaching language"
                        icon={<Icon name="globe" size={14} />}
                        value={teachingLanguage}
                        options={LANGUAGE_OPTIONS}
                        onChange={setTeachingLanguage}
                        disabled={locked}
                      />
                    </label>
                    <label className="hdr-field">
                      <span className="hdr-field-label">Quiz questions</span>
                      <Dropdown
                        compact
                        ariaLabel="Number of quiz questions"
                        icon={<Icon name="hash" size={14} />}
                        value={numQuestions}
                        options={QUESTION_OPTIONS}
                        onChange={setNumQuestions}
                        disabled={locked}
                      />
                    </label>
                  </>
                )}
              </HeaderMenu>
            </div>
          )}
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="page-viewer-content">
        {!currentBook ? (
          /* Loading placeholder — a book is always selected before entering the classroom,
             so this only shows briefly while the chosen chapter is being loaded. */
          <div className="upload-zone" style={{ cursor: 'default' }}>
            <div className="upload-icon"><Icon name="book" size={30} stroke={1.8} /></div>
            <h3>Preparing your textbook…</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Loading the chapter you selected. This will just take a moment.</p>
            
          </div>
        ) : workspaceMode === 'quiz' && activeQuiz ? (
          /* Quiz Mode */
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--text-main)', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Icon name="quiz" size={20} /> Pop Quiz — Page {currentPage}
              </h2>
              <button className="control-btn" onClick={() => setWorkspaceMode('pdf')}>
                <Icon name="book" /> <span>Back to PDF</span>
              </button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
              <QuizPanel
                questions={activeQuiz}
                llmProvider={llmProvider}
                onResetQuiz={() => { setActiveQuiz(null); setWorkspaceMode('pdf'); }}
                onSubmitAnswers={onQuizSubmit}
              />
            </div>
          </div>
        ) : workspaceMode === 'homework' && activeHomework ? (
          /* Homework Mode */
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--text-main)', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Icon name="homework" size={20} /> Homework — Page {currentPage}
              </h2>
              <button className="control-btn" onClick={() => setWorkspaceMode('pdf')}>
                <Icon name="book" /> <span>Back to PDF</span>
              </button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
              <HomeworkPanel
                questions={activeHomework}
                language={teachingLanguage}
                onReset={() => { setActiveHomework(null); setWorkspaceMode('pdf'); }}
              />
            </div>
          </div>
        ) : (
          /* PDF Viewer */
          <div className="pdf-frame-wrap" onContextMenu={(e) => e.preventDefault()}>
            {(activeQuiz || activeHomework) && workspaceMode === 'pdf' && !locked && (
              <div className="resume-fabs-container">
                {activeQuiz && (
                  <button className="resume-quiz-fab" onClick={() => setWorkspaceMode('quiz')}>
                    <Icon name="quiz" /> <span>Resume Active Quiz</span>
                  </button>
                )}
                {activeHomework && (
                  <button className="resume-quiz-fab" onClick={() => setWorkspaceMode('homework')}>
                    <Icon name="homework" /> <span>Resume Homework</span>
                  </button>
                )}
              </div>
            )}
            <iframe
              src={`${apiUrl(`/books/${currentBook.book_id}/pdf/pages/${currentPage}`)}#toolbar=0&navpanes=0`}
              width="100%"
              height="100%"
              style={{ border: 'none' }}
              key={`${currentBook.book_id}-${currentPage}`}
            />
          </div>
        )}
      </main>

      {/* ── Page Navigation Footer ── */}
      {currentBook && workspaceMode !== 'quiz' && workspaceMode !== 'homework' && (
        <footer className="page-footer">
          {locked ? (
            /* During a teacher call: keep the current page visible but lock navigation. */
            <div className="call-lock-note">
              <Icon name="lock" size={14} style={{ display: 'inline-block', verticalAlign: '-2px', marginRight: '6px' }} /> On page {currentPage} of {totalPages} · page controls are paused during your teacher call
            </div>
          ) : (
            <>
              <button className="control-btn" disabled={currentPage <= 1} onClick={() => onPageChange(currentPage - 1)}>
                <Icon name="chevronLeft" /> <span>Prev</span>
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Page</span>
                <input
                  type="number" min="1" max={totalPages} value={currentPage}
                  className="page-number-input"
                  onChange={(e) => { const v = parseInt(e.target.value); if (v >= 1 && v <= totalPages) onPageChange(v); }}
                />
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>of {totalPages}</span>
              </div>
              <button className="control-btn" disabled={currentPage >= totalPages} onClick={() => onPageChange(currentPage + 1)}>
                <span>Next</span> <Icon name="chevronRight" />
              </button>
            </>
          )}
        </footer>
      )}
    </div>
  );
}
