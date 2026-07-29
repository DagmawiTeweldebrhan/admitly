'use client';

import { useState } from 'react';

export interface ActivityFormData {
  beneficiaries: string;
  endeavors: string;
  actualImpact: string;
  backlash: string;
  insights: string;
  effort: string;
  solved: string;
}

interface ActivityFormProps {
  onSubmit: (data: ActivityFormData) => void;
  isLoading?: boolean;
}

const BEABIES_FIELDS = [
  {
    id: 'beneficiaries',
    label: 'B - Beneficiaries',
    placeholder: 'e.g., 40 high school students, 500 community members, 20 refugee families',
    description: 'Who exactly did you assist?',
    tooltip: 'Be specific with numbers and demographics of who you served',
  },
  {
    id: 'endeavors',
    label: 'E - Endeavors',
    placeholder: 'e.g., Created the curriculum, Taught coding workshops, Organized community events',
    description: 'What were your daily tasks?',
    tooltip: 'Describe the specific work you did regularly',
  },
  {
    id: 'actualImpact',
    label: 'A - Actual Impact',
    placeholder: 'e.g., Raised 5,000 Birr, 95% graduation rate, 30 students placed in jobs',
    description: 'Use clear numbers',
    tooltip: 'Quantify the tangible results and outcomes',
  },
  {
    id: 'backlash',
    label: 'B - Backlash',
    placeholder: 'e.g., Limited internet access, Language barriers, Funding constraints',
    description: 'What challenges did you face?',
    tooltip: 'Describe obstacles you overcame',
  },
  {
    id: 'insights',
    label: 'I - Insights',
    placeholder: 'e.g., Team management, Cross-cultural communication, Problem-solving under pressure',
    description: 'What skills did you develop?',
    tooltip: 'Reflect on growth and skills gained',
  },
  {
    id: 'effort',
    label: 'E - Effort',
    placeholder: 'e.g., 15 hrs/week for 6 months, 500+ volunteer hours, Daily commitment for 2 years',
    description: 'How much time did you commit?',
    tooltip: 'Show your dedication and time investment',
  },
  {
    id: 'solved',
    label: 'S - Solved',
    placeholder: 'e.g., Lack of computer skills, Food insecurity, Educational gap in rural areas',
    description: 'What was the main problem you fixed?',
    tooltip: 'Identify the core problem you addressed',
  },
];

export function ActivityForm({ onSubmit, isLoading }: ActivityFormProps) {
  const [formData, setFormData] = useState<ActivityFormData>({
    beneficiaries: '',
    endeavors: '',
    actualImpact: '',
    backlash: '',
    insights: '',
    effort: '',
    solved: '',
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
      <div className="bg-blue-50/5 border border-blue-500/20 rounded-lg p-4">
        <p className="text-sm text-muted-foreground">
          Fill in each BEABIES component. The optimizer will combine these into compelling variations.
        </p>
      </div>

      {BEABIES_FIELDS.map((field) => (
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
            value={formData[field.id as keyof ActivityFormData]}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
          />
          <p className="text-xs text-muted-foreground">{field.tooltip}</p>
        </div>
      ))}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-muted text-white font-medium rounded-lg transition-colors"
      >
        {isLoading ? 'Optimizing...' : 'Generate Variations'}
      </button>
    </form>
  );
}
