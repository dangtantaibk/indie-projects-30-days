'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Flashcard from '@/components/Flashcard';
import useFlashcards from '@/hooks/useFlashcards';
import { Deck, Flashcard as FlashcardType } from '@/types';
import { calculateProgressPercentage } from '@/lib/utils';

export default function DeckDetailPage({ params }: { params: { deckId: string } }) {
  const router = useRouter();
  const { getDeck, toggleCardLearned, deleteCard } = useFlashcards();
  const [deck, setDeck] = useState<Deck | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const deckData = getDeck(params.deckId);
    if (deckData) {
      setDeck(deckData);
    } else {
      // Deck not found, redirect to decks page
      router.push('/decks');
    }
    setLoading(false);
  }, [getDeck, params.deckId, router]);

  const handleToggleCardLearned = (cardId: string) => {
    if (!deck) return;
    
    toggleCardLearned(deck.id, cardId);
    
    // Update local state
    setDeck(prevDeck => {
      if (!prevDeck) return null;
      return {
        ...prevDeck,
        cards: prevDeck.cards.map(card => 
          card.id === cardId ? { ...card, isLearned: !card.isLearned } : card
        )
      };
    });
  };

  const handleDeleteCard = (cardId: string) => {
    if (!deck) return;
    
    if (window.confirm('Are you sure you want to delete this flashcard?')) {
      deleteCard(deck.id, cardId);
      
      // Update local state
      setDeck(prevDeck => {
        if (!prevDeck) return null;
        return {
          ...prevDeck,
          cards: prevDeck.cards.filter(card => card.id !== cardId)
        };
      });
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen">
        <Navigation />
        <Container className="py-8 text-center">
          <p>Loading deck...</p>
        </Container>
      </main>
    );
  }

  if (!deck) {
    return (
      <main className="min-h-screen">
        <Navigation />
        <Container className="py-8 text-center">
          <p>Deck not found.</p>
          <Link href="/decks" passHref>
            <Button className="mt-4">Return to Decks</Button>
          </Link>
        </Container>
      </main>
    );
  }

  const learnedCount = deck.cards.filter(card => card.isLearned).length;
  const progress = calculateProgressPercentage(learnedCount, deck.cards.length);

  return (
    <main className="min-h-screen">
      <Navigation />
      
      <Container className="py-8">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{deck.name}</h1>
            <div className="flex gap-2">
              <Link href={`/decks/${deck.id}/edit`} passHref>
                <Button variant="outline" size="sm">
                  Edit Deck
                </Button>
              </Link>
              <Link href={`/decks/${deck.id}/study`} passHref>
                <Button size="sm">
                  Study Deck
                </Button>
              </Link>
            </div>
          </div>
          
          {deck.description && (
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {deck.description}
            </p>
          )}
          
          <div className="flex flex-wrap gap-4 items-center text-sm">
            <div>
              <span className="text-gray-500 dark:text-gray-400">Created: </span>
              <span className="text-gray-700 dark:text-gray-300">
                {new Date(deck.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Last updated: </span>
              <span className="text-gray-700 dark:text-gray-300">
                {new Date(deck.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between mb-1 text-sm">
              <span className="text-gray-700 dark:text-gray-300">Progress</span>
              <span className="text-green-600 dark:text-green-400 font-medium">
                {learnedCount} / {deck.cards.length} cards learned ({progress}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-green-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
        
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Flashcards ({deck.cards.length})
          </h2>
          <Link href={`/decks/${deck.id}/edit`} passHref>
            <Button variant="outline" size="sm">
              Add Cards
            </Button>
          </Link>
        </div>
        
        {deck.cards.length === 0 ? (
          <Card className="p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This deck doesn't have any flashcards yet.
            </p>
            <Link href={`/decks/${deck.id}/edit`} passHref>
              <Button>Add Your First Card</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {deck.cards.map(card => (
              <Flashcard
                key={card.id}
                card={card}
                onLearnToggle={handleToggleCardLearned}
                onEdit={() => router.push(`/decks/${deck.id}/edit?cardId=${card.id}`)}
                onDelete={handleDeleteCard}
              />
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}