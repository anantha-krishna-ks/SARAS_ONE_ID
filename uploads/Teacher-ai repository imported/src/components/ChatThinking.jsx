import React from 'react';
import Icon from './Icon';

// AI-chat "thinking" indicator: robot avatar + white bubble containing a
// twinkling sparkle and a shimmer "Thinking…" label. Left-aligned bot row.
export default function ChatThinking({ label = 'Thinking…' }) {
  return (
    <div className="chat-thinking-row">
      <span className="chat-thinking-avatar"><Icon name="robot" size={20} /></span>
      <div className="chat-thinking-bubble">
        <span className="chat-thinking-spark" aria-hidden="true">
          <svg className="cts-star cts-star-lg" viewBox="0 0 24 24" width="18" height="18">
            <path d="M12 1.5c.6 5 4 8.4 9 9-5 .6-8.4 4-9 9-.6-5-4-8.4-9-9 5-.6 8.4-4 9-9Z" />
          </svg>
          <svg className="cts-star cts-star-sm" viewBox="0 0 24 24" width="9" height="9">
            <path d="M12 1.5c.6 5 4 8.4 9 9-5 .6-8.4 4-9 9-.6-5-4-8.4-9-9 5-.6 8.4-4 9-9Z" />
          </svg>
        </span>
        <span className="chat-thinking-label">{label}</span>
      </div>
    </div>
  );
}
