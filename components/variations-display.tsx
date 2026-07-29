'use client';

import { OptimizationResult, EntryType } from '@/lib/optimizer';
import { VariationCard } from './variation-card';

interface VariationsDisplayProps {
  result: OptimizationResult;
}

function getLimit(type: EntryType): number {
  return type === 'honor' ? 100 : 150;
}

function getTypeInfo(type: EntryType) {
  const config = {
    activity: {
      title: 'Activity Entry',
      description: 'Optimized for demonstrating leadership, initiative, and impact'
    },
    honor: {
      title: 'Honor Entry',
      description: 'Optimized to highlight selectivity and recognition'
    },
    unknown: {
      title: 'Entry (Type Unclear)',
      description: 'Optimized using general best practices'
    }
  };
  return config[type];
}

export function VariationsDisplay({ result }: VariationsDisplayProps) {
  const limit = getLimit(result.type);
  const typeInfo = getTypeInfo(result.type);

  return (
    <div className="w-full space-y-6">
      <div className="rounded-lg bg-card border border-border p-4 space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Optimization Complete</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">Entry Type</p>
            <p className="text-foreground mt-1">{typeInfo.title}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">Original Length</p>
            <p className="text-foreground mt-1">{result.originalLength} characters</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Optimized Variations</h3>
        <p className="text-xs text-muted-foreground">
          Try each variation and choose the one that best represents your entry. Each is optimized for a different approach.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
        <VariationCard
          title="Leadership-Focused"
          description="Emphasizes initiative, leadership, and your role in driving change"
          text={result.variations.leadership}
          limit={limit}
        />

        <VariationCard
          title="Quantitative-Focused"
          description="Highlights metrics, scale, and measurable impact where applicable"
          text={result.variations.quantitative}
          limit={limit}
        />

        <VariationCard
          title="Direct & Concise"
          description="Stripped down version focusing on the core achievement"
          text={result.variations.direct}
          limit={limit}
        />
      </div>

      <div className="rounded-lg bg-blue-500/10 border border-blue-200 dark:border-blue-800 p-4 space-y-2">
        <p className="text-sm font-medium text-blue-900 dark:text-blue-200">Pro Tips</p>
        <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
          <li>• Copy the variation you like and paste it into the Common App</li>
          <li>• Under 100 chars is ideal for most activity fields</li>
          <li>• Use semicolons to pack more impact into fewer words</li>
          <li>• Admissions officers read thousands of entries—be specific and memorable</li>
        </ul>
      </div>
    </div>
  );
}
