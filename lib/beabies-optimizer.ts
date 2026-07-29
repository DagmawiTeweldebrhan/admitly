/**
 * BEABIES Optimization Engine for Common App Entries
 *
 * BEABIES Formula for Activities:
 * B - Beneficiaries: Who exactly did you assist? (e.g., "40 high school students")
 * E - Endeavors: What were your daily tasks? (e.g., "Created the curriculum")
 * A - Actual Impact: Use clear numbers. (e.g., "Raised 5,000 Birr")
 * B - Backlash: What challenges did you face? (e.g., "Limited internet access")
 * I - Insights: What skills did you develop? (e.g., "Team management")
 * E - Effort: How much time did you commit? (e.g., "15 hrs/wk for 6 months")
 * S - Solved: What was the main problem you fixed? (e.g., "Lack of computer skills")
 */

interface ActivityInput {
  beneficiaries: string; // e.g., "40 high school students"
  endeavors: string; // e.g., "Created the curriculum"
  actualImpact: string; // e.g., "Raised 5,000 Birr"
  backlash: string; // e.g., "Limited internet access"
  insights: string; // e.g., "Team management"
  effort: string; // e.g., "15 hrs/wk for 6 months"
  solved: string; // e.g., "Lack of computer skills"
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
  // Emphasizes impact and problem-solving
  const leadershipVariation = applyTelegramSyntax(
    `Served ${input.beneficiaries}; ${input.endeavors}. ` +
    `Despite ${input.backlash}, achieved ${input.actualImpact}. ` +
    `Developed ${input.insights}; solved ${input.solved}.`
  );

  // Quantitative-Focused Variation
  // Emphasizes measurable impact and effort
  const quantitativeVariation = applyTelegramSyntax(
    `${input.actualImpact} for ${input.beneficiaries}. ` +
    `${input.endeavors} (${input.effort}); overcame ${input.backlash}. ` +
    `Gained ${input.insights}; resolved ${input.solved}.`
  );

  // Concise & Direct Variation
  // Most aggressive compression, maximum impact in minimum words
  const conciseVariation = applyTelegramSyntax(
    `${input.beneficiaries}: ${input.endeavors}. ` +
    `${input.actualImpact}; ${input.effort}. ` +
    `Solved: ${input.solved}.`
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

  if (!input.beneficiaries?.trim()) errors.push('Beneficiaries is required');
  if (!input.endeavors?.trim()) errors.push('Endeavors is required');
  if (!input.actualImpact?.trim()) errors.push('Actual Impact is required');
  if (!input.backlash?.trim()) errors.push('Backlash is required');
  if (!input.insights?.trim()) errors.push('Insights is required');
  if (!input.effort?.trim()) errors.push('Effort is required');
  if (!input.solved?.trim()) errors.push('Solved is required');

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
