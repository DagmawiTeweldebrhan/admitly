/**
 * BEABIES Optimization Engine for Common App Entries
 *
 * BEABIES Formula for Activities:
 * B - Bold Action (leadership verb)
 * E - Energetic Role/Organization (context)
 * A - Active Metrics (scale/numbers)
 * B - Beneficial Impact (who benefited)
 * I - Impactful Result (measurable outcome)
 * E - Exceptional Recognition (awards/selectivity)
 * S - Specific Detail (proof point)
 */

interface ActivityInput {
  boldAction: string; // e.g., "Founded", "Led"
  organization: string; // e.g., "School debate club"
  metrics: string; // e.g., "15 members"
  beneficialImpact: string; // e.g., "Student-athletes"
  impactfulResult: string; // e.g., "Won regional tournament"
  exceptionalRecognition: string; // e.g., "Top school org"
  specificDetail: string; // e.g., "Only debate org with X achievement"
}

interface HonorInput {
  honorName: string; // e.g., "National Merit Finalist"
  selectivity: string; // e.g., "0.5% of test takers"
  achievement: string; // e.g., "Earned by maintaining 4.0 GPA and scoring 1500+"
  significance: string; // e.g., "Recognized for academic excellence"
}

interface OptimizationResult {
  type: 'ACTIVITY' | 'HONOR';
  variations: {
    type: 'LEADERSHIP' | 'QUANTITATIVE' | 'CONCISE';
    content: string;
    characterCount: number;
  }[];
}

/**
 * Aggressive telegram-style syntax rules
 */
function applyTelegramSyntax(text: string): string {
  let result = text;

  // Remove unnecessary articles at the start
  result = result.replace(/^(A|An|The)\s+/i, '');

  // Replace "and" with semicolons for punch
  result = result.replace(/\s+and\s+/gi, '; ');

  // Remove redundant pronouns and articles in middle sections
  result = result.replace(/,\s+(The|A|An)\s+/g, ', ');

  // Use semicolons for multiple related points
  result = result.replace(/\.\s+([A-Z])/g, '; $1');

  // Abbreviations for common words
  const abbreviations: Record<string, string> = {
    'competition': 'comp',
    'organization': 'org',
    'academic': 'acad',
    'regional': 'reg\'l',
    'national': 'nat\'l',
    'international': 'intl',
  };

  Object.entries(abbreviations).forEach(([full, abbr]) => {
    result = result.replace(new RegExp(`\\b${full}\\b`, 'gi'), abbr);
  });

  return result.trim();
}

/**
 * Generate activity-focused variations using BEABIES
 */
export function optimizeActivity(input: ActivityInput): OptimizationResult {
  // Leadership-Focused Variation
  // Emphasizes the bold action and leadership
  const leadershipVariation = applyTelegramSyntax(
    `${input.boldAction} ${input.organization} with ${input.metrics}. ` +
    `Focused on ${input.beneficialImpact}; achieved ${input.impactfulResult}. ` +
    `${input.exceptionalRecognition}.`
  );

  // Quantitative-Focused Variation
  // Emphasizes metrics and measurable impact
  const quantitativeVariation = applyTelegramSyntax(
    `${input.metrics} in ${input.organization}. ` +
    `${input.boldAction} initiative serving ${input.beneficialImpact}. ` +
    `Result: ${input.impactfulResult}; ${input.exceptionalRecognition}.`
  );

  // Concise & Direct Variation
  // Most aggressive compression, maximum impact in minimum words
  const conciseVariation = applyTelegramSyntax(
    `${input.boldAction} ${input.organization}. ` +
    `${input.metrics}; ${input.impactfulResult}. ` +
    `${input.specificDetail}.`
  );

  return {
    type: 'ACTIVITY',
    variations: [
      {
        type: 'LEADERSHIP',
        content: leadershipVariation,
        characterCount: leadershipVariation.length,
      },
      {
        type: 'QUANTITATIVE',
        content: quantitativeVariation,
        characterCount: quantitativeVariation.length,
      },
      {
        type: 'CONCISE',
        content: conciseVariation,
        characterCount: conciseVariation.length,
      },
    ],
  };
}

/**
 * Generate honor-focused variations
 * Honors have stricter character limits and focus on selectivity
 */
export function optimizeHonor(input: HonorInput): OptimizationResult {
  // Leadership Impact Variation
  const leadershipVariation = applyTelegramSyntax(
    `${input.honorName}—${input.selectivity} of awardees. ` +
    `${input.achievement}; recognized for ${input.significance}.`
  );

  // Quantitative Selectivity Variation
  const quantitativeVariation = applyTelegramSyntax(
    `${input.honorName} (${input.selectivity}). ` +
    `${input.achievement}. ` +
    `${input.significance}.`
  );

  // Concise Recognition Variation
  const conciseVariation = applyTelegramSyntax(
    `${input.honorName}—${input.selectivity}. ` +
    `${input.achievement}.`
  );

  return {
    type: 'HONOR',
    variations: [
      {
        type: 'LEADERSHIP',
        content: leadershipVariation,
        characterCount: leadershipVariation.length,
      },
      {
        type: 'QUANTITATIVE',
        content: quantitativeVariation,
        characterCount: quantitativeVariation.length,
      },
      {
        type: 'CONCISE',
        content: conciseVariation,
        characterCount: conciseVariation.length,
      },
    ],
  };
}

/**
 * Helper to validate activity input before optimization
 */
export function validateActivityInput(input: Partial<ActivityInput>): string[] {
  const errors: string[] = [];

  if (!input.boldAction?.trim()) errors.push('Bold Action is required');
  if (!input.organization?.trim()) errors.push('Organization is required');
  if (!input.metrics?.trim()) errors.push('Metrics are required');
  if (!input.beneficialImpact?.trim()) errors.push('Beneficial Impact is required');
  if (!input.impactfulResult?.trim()) errors.push('Impactful Result is required');

  return errors;
}

/**
 * Helper to validate honor input before optimization
 */
export function validateHonorInput(input: Partial<HonorInput>): string[] {
  const errors: string[] = [];

  if (!input.honorName?.trim()) errors.push('Honor Name is required');
  if (!input.selectivity?.trim()) errors.push('Selectivity is required');
  if (!input.achievement?.trim()) errors.push('Achievement description is required');

  return errors;
}
