'use client';

import { detectEntryType } from '@/lib/optimizer';

interface DetectedBadgeProps {
  text: string;
}

export function DetectedBadge({ text }: DetectedBadgeProps) {
  const type = detectEntryType(text);

  const typeConfig = {
    activity: {
      label: 'Activity',
      color: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800'
    },
    honor: {
      label: 'Honor',
      color: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800'
    },
    unknown: {
      label: 'Entry Type Unknown',
      color: 'bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-800'
    }
  };

  const config = typeConfig[type];

  return (
    <div className={`inline-flex items-center px-3 py-1.5 rounded-full border text-sm font-medium ${config.color}`}>
      <div className={`w-2 h-2 rounded-full mr-2 ${type === 'activity' ? 'bg-blue-500' : type === 'honor' ? 'bg-purple-500' : 'bg-gray-500'}`} />
      {config.label}
    </div>
  );
}
