import React, { useState } from 'react';
import Button from './ui/Button';
import { parseFlashcardInput } from '@/lib/utils';

interface FlashcardInputProps {
  onSubmit: (cards: Array<{ term: string, definition: string }>) => void;
  onCancel?: () => void;
}

const FlashcardInput: React.FC<FlashcardInputProps> = ({ onSubmit, onCancel }) => {
  const [input, setInput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!input.trim()) {
      setError('Please enter at least one flashcard');
      return;
    }

    const parsed = parseFlashcardInput(input);
    
    if (parsed.length === 0) {
      setError('Could not parse any valid flashcards');
      return;
    }

    // Validate that each card has a term and definition
    const invalidCards = parsed.filter(card => !card.term || !card.definition);
    if (invalidCards.length > 0) {
      setError(`${invalidCards.length} card(s) are missing terms or definitions. Please check your format.`);
      return;
    }

    onSubmit(parsed);
    setInput('');
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="flashcard-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Enter flashcards (one per line)
          </label>
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            Format: Term - Definition (or Term: Definition)
          </div>
          <textarea
            id="flashcard-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-48 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="HTTP - HyperText Transfer Protocol&#10;CSS - Cascading Style Sheets&#10;HTML - HyperText Markup Language"
          />
        </div>

        {error && (
          <div className="text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-end space-x-2">
          {onCancel && (
            <Button 
              type="button" 
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
          <Button type="submit">
            Add Flashcards
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FlashcardInput;