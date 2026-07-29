'use client';

import { useState } from 'react';

export interface HonorFormData {
  honorName: string;
  selectivity: string;
  achievement: string;
  significance: string;
}

interface HonorFormProps {
  onSubmit: (data: HonorFormData) => void;
  isLoading?: boolean;
}

const HONOR_FIELDS = [
  {
    id: 'honorName',
    label: 'Honor/Award Name',
    placeholder: 'e.g., National Merit Finalist, Valedictorian, TASP Fellow',
    description: 'The official name of the honor',
    tooltip: 'What is the exact name of the award or honor?',
  },
  {
    id: 'selectivity',
    label: 'Selectivity (How rare is this?)',
    placeholder: 'e.g., 0.5% of test takers, Top 1%, Awarded to only 20 students nationwide',
    description: 'The percentage or rarity',
    tooltip: 'How selective is this award? Include percentile or number if possible.',
  },
  {
    id: 'achievement',
    label: 'How You Earned It',
    placeholder: 'e.g., Maintained 4.0 GPA and scored 1500+ on SAT, Published research in peer-reviewed journal',
    description: 'Requirements or criteria',
    tooltip: 'What did you do to earn this recognition?',
  },
  {
    id: 'significance',
    label: 'Why It Matters',
    placeholder: 'e.g., Recognized for academic excellence and intellectual leadership',
    description: 'The significance of the award',
    tooltip: 'Why is this honor valuable or significant to your application?',
  },
];

export function HonorForm({ onSubmit, isLoading }: HonorFormProps) {
  const [formData, setFormData] = useState<HonorFormData>({
    honorName: '',
    selectivity: '',
    achievement: '',
    significance: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-purple-50/5 border border-purple-500/20 rounded-lg p-4">
        <p className="text-sm text-muted-foreground">
          Honors require emphasizing selectivity and prestige. Focus on how rare and valued this recognition is.
        </p>
      </div>

      {HONOR_FIELDS.map((field) => (
        <div key={field.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor={field.id} className="font-medium text-foreground">
              {field.label}
            </label>
            <span className="text-xs text-muted-foreground">{field.description}</span>
          </div>
          <input
            id={field.id}
            name={field.id}
            type="text"
            value={formData[field.id as keyof HonorFormData]}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
          />
          <p className="text-xs text-muted-foreground">{field.tooltip}</p>
        </div>
      ))}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-muted text-white font-medium rounded-lg transition-colors"
      >
        {isLoading ? 'Optimizing...' : 'Generate Variations'}
      </button>
    </form>
  );
}
