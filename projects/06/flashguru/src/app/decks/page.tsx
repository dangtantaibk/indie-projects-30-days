'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import DeckList from '@/components/DeckList';
import useFlashcards from '@/hooks/useFlashcards';
import { DeckSummary } from '@/types';

export default function DecksPage() {
  const router = useRouter();
  const { getDeckSummaries, deleteDeck, loading, decks: allDecksData } = useFlashcards();
  const [decks, setDecks] = useState<DeckSummary[]>([]);

  useEffect(() => {
    const allDecks = getDeckSummaries();
    setDecks(allDecks);
  }, [allDecksData]); // Sử dụng allDecksData làm dependency thay vì getDeckSummaries

  const handleDeleteDeck = (deckId: string) => {
    deleteDeck(deckId);
    setDecks(prev => prev.filter(deck => deck.id !== deckId));
  };

  return (
    <main className="min-h-screen">
      <Navigation />
      
      <Container className="py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Flashcard Decks</h1>
          <Link href="/decks/new" passHref>
            <Button>
              Create New Deck
            </Button>
          </Link>
        </div>
        
        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400">Loading your flashcard decks...</p>
          </div>
        ) : (
          <DeckList decks={decks} onDelete={handleDeleteDeck} />
        )}
      </Container>
    </main>
  );
}