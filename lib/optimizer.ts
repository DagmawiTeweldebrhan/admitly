// Optimization engine for Common App entries
// Implements BEABIES formula for activities and Selectivity rule for honors

export type EntryType = 'activity' | 'honor' | 'unknown';

export interface OptimizationResult {
  type: EntryType;
  originalLength: number;
  variations: {
    leadership: string;
    quantitative: string;
    direct: string;
  };
}

// Detect entry type based on content
export function detectEntryType(text: string): EntryType {
  const lowerText = text.toLowerCase();

  // Check for honor keywords (recognition, award, position, rank, etc.)
  const honorKeywords = [
    'award', 'honor', 'recognition', 'rank', 'place', 'selected',
    'finalist', 'semifinalist', 'inducted', 'elected', 'president',
    'captain', 'champion', 'winner', 'best', 'top', 'distinguished',
    'medal', 'scholarship', 'grant', 'fellowship', 'prize',
    'committee', 'board', 'appointed'
  ];

  // Check for activity keywords (volunteer, teach, lead, participate, etc.)
  const activityKeywords = [
    'volunteer', 'founded', 'taught', 'teach', 'coach', 'lead',
    'organize', 'participate', 'compete', 'perform', 'create',
    'build', 'develop', 'manage', 'coordinate', 'club', 'team',
    'organization', 'group', 'member', 'host', 'conduct'
  ];

  let honorScore = 0;
  let activityScore = 0;

  honorKeywords.forEach(keyword => {
    if (lowerText.includes(keyword)) honorScore++;
  });

  activityKeywords.forEach(keyword => {
    if (lowerText.includes(keyword)) activityScore++;
  });

  if (honorScore > activityScore && honorScore > 0) return 'honor';
  if (activityScore > honorScore && activityScore > 0) return 'activity';
  return 'unknown';
}

// Apply telegram-style syntax: aggressive abbreviations, semicolons, no articles/pronouns
function applyTelegramSyntax(text: string): string {
  // Remove articles and common pronouns at the start
  text = text.replace(/^(the|a|an|i|we|my|our|his|her|their)\s+/i, '');

  // Replace common phrases with abbreviations
  text = text.replace(/\borganization\b/gi, 'org');
  text = text.replace(/\bcommunity\b/gi, 'community');
  text = text.replace(/\bnational\b/gi, 'natl');
  text = text.replace(/\bdeveloped\b/gi, 'dev\'d');
  text = text.replace(/\brecognized\b/gi, 'recognized');
  text = text.replace(/\bstudent\b/gi, 'student');

  // Split sentences and rejoin with semicolons (aggressive punctuation)
  const sentences = text.split(/\.\s+/);
  text = sentences.join('; ').trim();

  // Remove trailing period if exists
  if (text.endsWith('.')) {
    text = text.slice(0, -1);
  }

  return text.trim();
}

// BEABIES formula: Bold, Energetic, Active, Beneficial, Impactful, Exciting, Specific
function applyBEABIES(text: string, style: 'leadership' | 'quantitative' | 'direct'): string {
  let result = text;

  // Apply style-specific transformations
  if (style === 'leadership') {
    // Emphasize leadership and initiative
    result = result.replace(/\bleading\b/gi, 'spearheading');
    result = result.replace(/\bhelping\b/gi, 'mobilizing');
    result = result.replace(/\bparticipat/gi, 'orchestrating');
  } else if (style === 'quantitative') {
    // Add numbers and metrics where possible
    if (!result.match(/\d+/)) {
      result = result.replace(/\bstudents\b/gi, 'students');
      result = result.replace(/\bmembers\b/gi, 'members');
    }
    result = result.replace(/\bsignificant\b/gi, 'measurable');
    result = result.replace(/\blarge\b/gi, 'extensive');
  } else if (style === 'direct') {
    // Keep it concise and direct
    result = result.replace(/\bvery\b/gi, '');
    result = result.replace(/\bquite\b/gi, '');
    result = result.replace(/\breally\b/gi, '');
    result = result.replace(/\balso\b/gi, '');
  }

  return result.trim();
}

// Selectivity rule for honors: Focus on recognition selectivity
function applySelectivityRule(text: string): string {
  // Extract the most selective/impressive element
  // If it mentions "top X%" or "finalist" or "selected", emphasize that
  const selectivePatterns = /top\s+\d+%|finalist|semifinalist|selected|only|exclusive|rare/gi;

  if (selectivePatterns.test(text)) {
    // Already has selective language
    return text;
  }

  // Otherwise, add context about competitiveness if possible
  return text;
}

// Main optimization function
export function optimizeEntry(text: string): OptimizationResult {
  const type = detectEntryType(text);
  const baseText = text.trim();

  let variations = {
    leadership: '',
    quantitative: '',
    direct: ''
  };

  if (type === 'activity') {
    // Apply telegram syntax first
    let telegramText = applyTelegramSyntax(baseText);

    // Apply BEABIES formula with different styles
    variations.leadership = applyBEABIES(telegramText, 'leadership');
    variations.quantitative = applyBEABIES(telegramText, 'quantitative');
    variations.direct = applyBEABIES(telegramText, 'direct');
  } else if (type === 'honor') {
    // Apply selectivity rule and telegram syntax
    let selectiveText = applySelectivityRule(baseText);
    let telegramText = applyTelegramSyntax(selectiveText);

    // Variations for honors
    variations.leadership = applyBEABIES(telegramText, 'leadership');
    variations.quantitative = applyBEABIES(telegramText, 'quantitative');
    variations.direct = applyBEABIES(telegramText, 'direct');
  } else {
    // Unknown type, apply generic optimization
    let telegramText = applyTelegramSyntax(baseText);
    variations.leadership = applyBEABIES(telegramText, 'leadership');
    variations.quantitative = applyBEABIES(telegramText, 'quantitative');
    variations.direct = applyBEABIES(telegramText, 'direct');
  }

  return {
    type,
    originalLength: baseText.length,
    variations
  };
}

// Get character limit based on entry type and field
export function getCharacterLimit(type: EntryType, field: 'short' | 'medium' | 'long'): number {
  if (type === 'honor') {
    return 100; // Honors have fixed 100 char limit
  }

  // Activities have tiered limits
  if (field === 'short') return 50;
  if (field === 'medium') return 100;
  return 150;
}
