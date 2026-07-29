'use client';

import { useState } from 'react';
import { CharacterCounter } from './character-counter';

interface VariationCardProps {
  title: string;
  description: string;
  text: string;
  limit?: number;
}

export function VariationCard({ title, description, text, limit }: VariationCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-3">
      <div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>

      <div className="relative">
        <div className="rounded bg-muted/50 p-3 min-h-20 flex items-center">
          <p className="text-sm text-foreground break-words">{text}</p>
        </div>
        {limit && <CharacterCounter current={text.length} limit={limit} />}
      </div>

      <button
        onClick={handleCopy}
        className="w-full px-3 py-2 text-sm font-medium rounded border border-border hover:bg-muted transition-colors"
      >
        {copied ? '✓ Copied' : 'Copy Text'}
      </button>
    </div>
  );
}
