'use client';

import { useState } from 'react';

export interface ActivityFormData {
  boldAction: string;
  organization: string;
  metrics: string;
  beneficialImpact: string;
  impactfulResult: string;
  exceptionalRecognition: string;
  specificDetail: string;
}

interface ActivityFormProps {
  onSubmit: (data: ActivityFormData) => void;
  isLoading?: boolean;
}

const BEABIES_FIELDS = [
  {
    id: 'boldAction',
    label: 'B - Bold Action',
    placeholder: 'e.g., Founded, Led, Organized, Established',
    description: 'Leadership verb showing what you initiated',
    tooltip: 'Use strong action verbs that demonstrate leadership and initiative',
  },
  {
    id: 'organization',
    label: 'E - Energetic Role/Organization',
    placeholder: 'e.g., School debate club, Robotics team, Community center program',
    description: 'The organization or context',
    tooltip: 'What organization or initiative did you lead?',
  },
  {
    id: 'metrics',
    label: 'A - Active Metrics',
    placeholder: 'e.g., 15 members, 3 years, managed 50 students',
    description: 'Scale and numbers',
    tooltip: 'Include quantifiable metrics showing scope and reach',
  },
  {
    id: 'beneficialImpact',
    label: 'B - Beneficial Impact',
    placeholder: 'e.g., Student-athletes, 200 community members, underrepresented students',
    description: 'Who benefited?',
    tooltip: 'Who did this activity serve or benefit?',
  },
  {
    id: 'impactfulResult',
    label: 'I - Impactful Result',
    placeholder: 'e.g., Won regional tournament, 100% college enrollment, increased participation 50%',
    description: 'Measurable outcome',
    tooltip: 'What concrete results did you achieve?',
  },
  {
    id: 'exceptionalRecognition',
    label: 'E - Exceptional Recognition',
    placeholder: 'e.g., Featured in local news, school activity of the year, selectivity/rarity',
    description: 'Awards or selectivity',
    tooltip: 'Any special recognition, awards, or what makes this exceptional?',
  },
  {
    id: 'specificDetail',
    label: 'S - Specific Detail',
    placeholder: 'e.g., Only debate org to compete at state level, first of its kind',
    description: 'Unique distinguishing detail',
    tooltip: 'What sets this apart from other similar activities?',
  },
];

export function ActivityForm({ onSubmit, isLoading }: ActivityFormProps) {
  const [formData, setFormData] = useState<ActivityFormData>({
    boldAction: '',
    organization: '',
    metrics: '',
    beneficialImpact: '',
    impactfulResult: '',
    exceptionalRecognition: '',
    specificDetail: '',
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
