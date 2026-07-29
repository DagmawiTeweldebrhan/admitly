'use client';

import { useState } from 'react';
import { TypeSelector } from '@/components/type-selector';
import { ActivityForm, type ActivityFormData } from '@/components/activity-form';
import { HonorForm, type HonorFormData } from '@/components/honor-form';
import { VariationsDisplay } from '@/components/variations-display-new';
import { optimizeActivity, optimizeHonor } from '@/lib/beabies-optimizer';
import { saveEntry } from '@/app/actions/entries';
import { useRouter } from 'next/navigation';

type Step = 'type-selection' | 'form-input' | 'results';

export default function OptimizerPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('type-selection');
  const [entryType, setEntryType] = useState<'ACTIVITY' | 'HONOR' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [variations, setVariations] = useState<any[]>([]);

  const handleTypeSelect = (type: 'ACTIVITY' | 'HONOR') => {
    setEntryType(type);
    setStep('form-input');
  };

  const handleActivitySubmit = async (data: ActivityFormData) => {
    setIsLoading(true);
    try {
      const result = optimizeActivity(data);
      setVariations(result.variations);
      setStep('results');
    } finally {
      setIsLoading(false);
    }
  };

  const handleHonorSubmit = async (data: HonorFormData) => {
    setIsLoading(true);
    try {
      const result = optimizeHonor(data);
      setVariations(result.variations);
      setStep('results');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveEntry = async (selectedVariation: string, variationType: string) => {
    setIsLoading(true);
    try {
      // Prepare the raw input for storage
      let rawInput = '';
      if (entryType === 'ACTIVITY') {
        // This would be reconstructed from the form, but for now we use selectedVariation
        rawInput = selectedVariation;
      } else {
        rawInput = selectedVariation;
      }

      await saveEntry(
        entryType!,
        rawInput,
        selectedVariation,
        variations.map((v) => ({
          type: v.type,
          content: v.content,
        }))
      );

      router.push('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToForm = () => {
    setStep('form-input');
    setVariations([]);
  };

  const handleBackToType = () => {
    setStep('type-selection');
    setEntryType(null);
    setVariations([]);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-40 bg-card/50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Common App Optimizer</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Using the BEABIES formula for maximum impact
              </p>
            </div>
            <button
              onClick={() => router.push('/dashboard')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              View History →
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {step === 'type-selection' && (
          <div className="bg-card rounded-lg border border-border p-8">
            <TypeSelector selected={entryType} onSelect={handleTypeSelect} />
          </div>
        )}

        {step === 'form-input' && entryType === 'ACTIVITY' && (
          <div className="bg-card rounded-lg border border-border p-8">
            <button
              onClick={handleBackToType}
              className="text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              ← Change Entry Type
            </button>
            <ActivityForm onSubmit={handleActivitySubmit} isLoading={isLoading} />
          </div>
        )}

        {step === 'form-input' && entryType === 'HONOR' && (
          <div className="bg-card rounded-lg border border-border p-8">
            <button
              onClick={handleBackToType}
              className="text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              ← Change Entry Type
            </button>
            <HonorForm onSubmit={handleHonorSubmit} isLoading={isLoading} />
          </div>
        )}

        {step === 'results' && entryType && (
          <div className="bg-card rounded-lg border border-border p-8">
            <VariationsDisplay
              entryType={entryType}
              variations={variations}
              onSave={handleSaveEntry}
              isLoading={isLoading}
              onBack={handleBackToForm}
            />
          </div>
        )}
      </div>
    </main>
  );
}
