'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface Variation {
  type: 'LEADERSHIP' | 'QUANTITATIVE' | 'CONCISE';
  content: string;
  characterCount: number;
}

interface VariationsDisplayProps {
  entryType: 'ACTIVITY' | 'HONOR';
  variations: Variation[];
  onSave: (selectedVariation: string, variationType: string) => Promise<void>;
  isLoading?: boolean;
  onBack?: () => void;
}

const VARIATION_LABELS = {
  LEADERSHIP: {
    title: 'Leadership-Focused',
    description: 'Emphasizes your role in driving change and initiative',
    color: 'blue',
  },
  QUANTITATIVE: {
    title: 'Quantitative-Focused',
    description: 'Highlights metrics and measurable impact',
    color: 'green',
  },
  CONCISE: {
    title: 'Direct & Concise',
    description: 'Maximum impact with aggressive compression',
    color: 'purple',
  },
};

const CHARACTER_LIMITS = {
  ACTIVITY: 150,
  HONOR: 100,
};

export function VariationsDisplay({
  entryType,
  variations,
  onSave,
  isLoading,
  onBack,
}: VariationsDisplayProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  const handleCopy = (content: string, variationType: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(variationType);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSave = async (variationType: string) => {
    const variation = variations.find((v) => v.type === variationType);
    if (!variation) return;

    setSavingId(variationType);
    try {
      await onSave(variation.content, variationType);
      setSelectedType(variationType);
    } finally {
      setSavingId(null);
    }
  };

  const limit = CHARACTER_LIMITS[entryType];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Your Optimized Variations
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Choose your favorite and save it to your history. Character limit: {limit}
          </p>
        </div>
        {onBack && (
          <button
            onClick={onBack}
            className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back
          </button>
        )}
      </div>

      <div className="space-y-4">
        {variations.map((variation) => {
          const label = VARIATION_LABELS[variation.type];
          const colorClass =
            label.color === 'blue'
              ? 'border-blue-500/30 bg-blue-50/5'
              : label.color === 'green'
                ? 'border-green-500/30 bg-green-50/5'
                : 'border-purple-500/30 bg-purple-50/5';

          const isSelected = selectedType === variation.type;
          const isOverLimit = variation.characterCount > limit;

          return (
            <div
              key={variation.type}
              className={`rounded-lg border-2 p-4 transition-all ${colorClass} ${
                isSelected ? 'ring-2 ring-offset-2 ring-offset-background' : ''
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{label.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{label.description}</p>
                  </div>
                  <span
                    className={`text-xs font-mono px-2 py-1 rounded-md ${
                      isOverLimit
                        ? 'bg-red-500/20 text-red-700'
                        : 'bg-foreground/10 text-foreground'
                    }`}
                  >
                    {variation.characterCount}/{limit}
                  </span>
                </div>

                <div className="bg-background/50 rounded p-3 text-sm text-foreground leading-relaxed border border-border/50">
                  {variation.content}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleCopy(variation.content, variation.type)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-colors"
                  >
                    {copiedId === variation.type ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleSave(variation.type)}
                    disabled={savingId === variation.type || isLoading}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isSelected
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-foreground/10 hover:bg-foreground/20 text-foreground'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {savingId === variation.type ? 'Saving...' : isSelected ? 'Saved' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedType && (
        <div className="rounded-lg bg-green-50/10 border border-green-500/20 p-4">
          <p className="text-sm text-green-700 dark:text-green-400">
            ✓ Variation saved to your history! You can view all your entries in the dashboard.
          </p>
        </div>
      )}
    </div>
  );
}
