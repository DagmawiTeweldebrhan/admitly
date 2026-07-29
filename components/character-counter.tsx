'use client';

interface CharacterCounterProps {
  current: number;
  limit: number;
  variant?: 'subtle' | 'warning' | 'danger';
}

export function CharacterCounter({ current, limit, variant }: CharacterCounterProps) {
  // Determine color based on usage
  let displayVariant = variant;
  if (!displayVariant) {
    if (current > limit) displayVariant = 'danger';
    else if (current > limit * 0.9) displayVariant = 'warning';
    else displayVariant = 'subtle';
  }

  const bgColor = {
    subtle: 'bg-muted',
    warning: 'bg-yellow-500/10',
    danger: 'bg-red-500/10'
  }[displayVariant];

  const textColor = {
    subtle: 'text-muted-foreground',
    warning: 'text-yellow-600 dark:text-yellow-500',
    danger: 'text-red-600 dark:text-red-500'
  }[displayVariant];

  return (
    <div className={`absolute bottom-3 right-3 px-2 py-1 rounded text-xs font-medium ${bgColor} ${textColor}`}>
      {current} / {limit}
    </div>
  );
}
