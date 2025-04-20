import React from 'react';
import Link from 'next/link';
import { DeckSummary } from '@/types';
import Card from './ui/Card';
import Button from './ui/Button';
import { calculateProgressPercentage, formatDate } from '@/lib/utils';

interface DeckListProps {
  decks: DeckSummary[];
  onDelete?: (deckId: string) => void;
}

const DeckList: React.FC<DeckListProps> = ({ decks, onDelete }) => {
  if (decks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400 mb-4">You don't have any flashcard decks yet.</p>
        <Link href="/decks/new" passHref>
          <Button>Create Your First Deck</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {decks.map((deck) => (
        <Card key={deck.id} className="flex flex-col" hoverable>
          <Link href={`/decks/${deck.id}`} className="flex-grow p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{deck.name}</h3>
            {deck.description && (
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{deck.description}</p>
            )}
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>{deck.cardCount} cards</span>
              <span>{deck.learnedCount} learned</span>
            </div>
            
            {deck.cardCount > 0 && (
              <div className="mt-3">
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-green-500 h-full rounded-full" 
                    style={{ width: `${calculateProgressPercentage(deck.learnedCount, deck.cardCount)}%` }}
                  />
                </div>
              </div>
            )}
          </Link>
          
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex justify-between">
            <Link href={`/decks/${deck.id}/study`} passHref>
              <Button size="sm" variant="primary">
                Study
              </Button>
            </Link>
            
            <div className="flex gap-2">
              <Link href={`/decks/${deck.id}/edit`} passHref>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
              </Link>
              
              {onDelete && (
                <Button 
                  size="sm" 
                  variant="danger"
                  onClick={(e) => {
                    e.preventDefault();
                    if (window.confirm(`Are you sure you want to delete "${deck.name}"?`)) {
                      onDelete(deck.id);
                    }
                  }}
                >
                  Delete
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DeckList;