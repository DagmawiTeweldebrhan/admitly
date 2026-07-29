'use client';

import { useState } from 'react';
import { DetectedBadge } from './detected-badge';
import { CharacterCounter } from './character-counter';

interface EntryFormProps {
  onSubmit: (text: string) => void;
  isLoading?: boolean;
}

export function EntryForm({ onSubmit, isLoading }: EntryFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="space-y-2">
        <label htmlFor="entry" className="block text-sm font-medium text-foreground">
          Paste your activity or honor entry
        </label>
        <p className="text-xs text-muted-foreground">
          Describe what you did, the impact, and why it matters to you
        </p>
      </div>

      <div className="relative">
        <textarea
          id="entry"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Example: I founded a debate club and coached 15 students to win the regional tournament..."
          className="w-full h-40 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
        />
        <CharacterCounter current={text.length} limit={500} />
      </div>

      {text.length > 0 && <DetectedBadge text={text} />}

      <button
        type="submit"
        disabled={!text.trim() || isLoading}
        className="w-full px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Optimizing...' : 'Optimize Entry'}
      </button>
    </form>
  );
}
