/**
 * Generates a random UUID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

/**
 * Format a date to a readable string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('default', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
}

/**
 * Parse bulk text input into term-definition pairs
 * Format: Term - Definition
 */
export function parseFlashcardInput(text: string): Array<{ term: string, definition: string }> {
  if (!text.trim()) return [];

  return text
    .split('\n')
    .filter(line => line.trim())
    .map(line => {
      // Try to split by hyphen first
      let parts = line.split('-');
      
      // If no hyphen or multiple hyphens, try splitting by first colon
      if (parts.length !== 2) {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
          parts = [
            line.slice(0, colonIndex),
            line.slice(colonIndex + 1)
          ];
        }
      }

      // If we couldn't split properly, use the whole line as term with empty definition
      if (parts.length !== 2) {
        return { term: line.trim(), definition: '' };
      }

      return {
        term: parts[0].trim(),
        definition: parts[1].trim()
      };
    });
}

/**
 * Calculate progress percentage
 */
export function calculateProgressPercentage(learned: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((learned / total) * 100);
}