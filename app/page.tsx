'use client';

import { useState } from 'react';
import { EntryForm } from '@/components/entry-form';
import { VariationsDisplay } from '@/components/variations-display';
import { optimizeEntry, type OptimizationResult } from '@/lib/optimizer';

export default function Home() {
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (text: string) => {
    setIsLoading(true);
    try {
      // Simulate processing delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      const optimized = optimizeEntry(text);
      setResult(optimized);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Common App Optimizer</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Craft compelling activity & honor entries for top US universities
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {!result ? (
          // Form State
          <div className="space-y-8">
            <div className="rounded-lg border border-border bg-card p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-foreground">Enter Your Entry</h2>
                <p className="text-muted-foreground">
                  Paste your raw activity or honor description. We'll automatically detect the type and generate optimized variations using proven Ivy League admissions strategies.
                </p>
              </div>

              <EntryForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>

            {/* Info Section */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-4 space-y-3">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  For Activities
                </h3>
                <p className="text-sm text-muted-foreground">
                  Describe what you did, your role, and the impact. Include numbers if possible. The optimizer will highlight leadership and initiative.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-4 space-y-3">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  For Honors
                </h3>
                <p className="text-sm text-muted-foreground">
                  Include the honor name, how you earned it, and why it matters. The optimizer will emphasize its selectivity and value.
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Results State
          <div className="space-y-6">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              ← Start Over
            </button>

            <VariationsDisplay result={result} />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          <p>
            Built to help students craft authentic, compelling entries. Based on proven Ivy League admissions frameworks.
          </p>
        </div>
      </footer>
    </main>
  );
}
