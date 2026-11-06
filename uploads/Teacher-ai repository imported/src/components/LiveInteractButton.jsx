import React from "react";
import Icon from "./Icon";

export default function LiveInteractButton({ isLiveMode, isListening, isProcessing, liveTranscript, onToggle, disabled }) {
  if (!isLiveMode) {
    return (
      <button
        type="button"
        className="live-interact-btn"
        onClick={onToggle}
        disabled={disabled}
        title={disabled ? "Load a book to talk to the AI Teacher" : "Talk to the AI Teacher by voice"}
        aria-label="Start voice conversation"
      >
        <Icon name="mic" size={16} />
        <span>Talk</span>
      </button>
    );
  }

  return (
    <div className="live-active-panel">
      <div className="live-status-row">
        {isProcessing ? (
          <div className="live-status thinking">
            <span className="live-status-dot thinking-dot" />
            <span>Thinking…</span>
          </div>
        ) : isListening ? (
          <div className="live-status listening">
            <span className="live-eq" aria-hidden="true"><i /><i /><i /><i /></span>
            <span>Listening…</span>
          </div>
        ) : (
          <div className="live-status idle">
            <span className="live-status-dot idle-dot" />
            <span>Speaking…</span>
          </div>
        )}
        <button type="button" className="live-stop-btn" onClick={onToggle} title="Stop voice" aria-label="Stop voice">
          <Icon name="stop" size={15} /> <span>Stop</span>
        </button>
      </div>
      {liveTranscript && (
        <div className="live-transcript-preview">
          <Icon name="speech" size={15} style={{ flexShrink: 0, marginTop: 1 }} />
          <span style={{ flex: 1, wordBreak: 'break-word' }}>{liveTranscript}</span>
        </div>
      )}
    </div>
  );
}
