'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import StudyMode from '@/components/StudyMode';
import useFlashcards from '@/hooks/useFlashcards';
import { Deck } from '@/types';

export default function StudyDeckPage({ params }: { params: { deckId: string } }) {
  const router = useRouter();
  const { getDeck, toggleCardLearned } = useFlashcards();
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

  const handleLearnToggle = (cardId: string) => {
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

  const handleFinish = () => {
    if (deck) {
      router.push(`/decks/${deck.id}`);
    } else {
      router.push('/decks');
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen">
        <Navigation />
        <Container className="py-8 text-center">
          <p>Loading study session...</p>
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

  return (
    <main className="min-h-screen">
      <Navigation />
      
      <Container className="py-8 max-w-3xl">
        <StudyMode
          cards={deck.cards}
          deckName={deck.name}
          onLearnToggle={handleLearnToggle}
          onFinish={handleFinish}
        />
      </Container>
    </main>
  );
}