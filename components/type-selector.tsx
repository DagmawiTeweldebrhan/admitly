'use client';

interface TypeSelectorProps {
  selected: 'ACTIVITY' | 'HONOR' | null;
  onSelect: (type: 'ACTIVITY' | 'HONOR') => void;
}

export function TypeSelector({ selected, onSelect }: TypeSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          What type of entry are you optimizing?
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Choose whether this is an activity or honor. Each has different optimization strategies.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onSelect('ACTIVITY')}
          className={`p-6 rounded-lg border-2 transition-all ${
            selected === 'ACTIVITY'
              ? 'border-blue-500 bg-blue-50/10 ring-2 ring-blue-500/20'
              : 'border-border hover:border-blue-300/50'
          }`}
        >
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Activity</h3>
            <p className="text-sm text-muted-foreground">
              Leadership roles, clubs, volunteer work, projects, internships
            </p>
          </div>
        </button>

        <button
          onClick={() => onSelect('HONOR')}
          className={`p-6 rounded-lg border-2 transition-all ${
            selected === 'HONOR'
              ? 'border-purple-500 bg-purple-50/10 ring-2 ring-purple-500/20'
              : 'border-border hover:border-purple-300/50'
          }`}
        >
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Honor</h3>
            <p className="text-sm text-muted-foreground">
              Awards, recognitions, competitions, scholarships, distinctions
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
