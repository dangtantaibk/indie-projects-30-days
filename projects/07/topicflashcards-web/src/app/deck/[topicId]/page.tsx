'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Flashcard from '@/components/Flashcard';
import ProgressTracker from '@/components/ProgressTracker';
import { Flashcard as FlashcardType } from '@/types';
import { applyLearnedStatus, isPremiumUnlocked } from '@/lib/storage';
import Link from 'next/link';

interface DeckPageProps {
  params: {
    topicId: string;
  };
}

export default function DeckPage({ params }: DeckPageProps) {
  const { topicId } = params;
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deck, setDeck] = useState<{
    topicId: string;
    name: string;
    description: string;
    isPremium: boolean;
    cards: FlashcardType[];
  } | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const response = await fetch(`/api/decks/${topicId}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Deck not found');
          }
          throw new Error('Failed to fetch deck');
        }
        
        const data = await response.json();
        
        // Check if this is a premium deck and if user has unlocked it
        if (data.isPremium && !isPremiumUnlocked(topicId)) {
          router.push(`/unlock/${topicId}`);
          return;
        }
        
        // Apply saved learned status from localStorage
        const cards = applyLearnedStatus(data.cards || []);
        
        setDeck({
          ...data,
          cards
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching deck:', err);
        setError(`Failed to load deck: ${err instanceof Error ? err.message : 'Unknown error'}`);
        setLoading(false);
      }
    };
    
    fetchDeck();
  }, [topicId, router]);
  
  const handleCardLearnedChange = (cardId: string, learned: boolean) => {
    if (!deck) return;
    
    const updatedCards = deck.cards.map(card => 
      card.id === cardId ? { ...card, learned } : card
    );
    
    setDeck({
      ...deck,
      cards: updatedCards
    });
  };
  
  const handlePrevCard = () => {
    setCurrentCardIndex(prev => Math.max(0, prev - 1));
  };
  
  const handleNextCard = () => {
    setCurrentCardIndex(prev => Math.min(deck?.cards.length ? deck.cards.length - 1 : 0, prev + 1));
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading flashcards...</div>
      </div>
    );
  }
  
  if (error || !deck) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-lg mb-6">{error || 'Could not load the deck'}</p>
          <Link href="/">
            <span className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Return Home
            </span>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-6">
          <Link href="/" className="text-blue-500 hover:underline">
            &larr; Back to All Decks
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-2 text-center text-blue-800">
          {deck.name}
        </h1>
        <p className="text-gray-600 mb-8 text-center max-w-lg mx-auto">
          {deck.description}
        </p>
        
        <ProgressTracker cards={deck.cards} />
        
        {deck.cards.length > 0 ? (
          <>
            <div className="mb-8">
              <Flashcard 
                card={deck.cards[currentCardIndex]} 
                onLearnedChange={handleCardLearnedChange}
              />
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={handlePrevCard}
                disabled={currentCardIndex === 0}
                className={`px-5 py-2 rounded-md ${
                  currentCardIndex === 0
                    ? 'bg-gray-200 text-gray-400'
                    : 'bg-blue-500 text-white'
                }`}
              >
                Previous Card
              </button>
              
              <div className="text-center py-2">
                {currentCardIndex + 1} / {deck.cards.length}
              </div>
              
              <button
                onClick={handleNextCard}
                disabled={currentCardIndex === deck.cards.length - 1}
                className={`px-5 py-2 rounded-md ${
                  currentCardIndex === deck.cards.length - 1
                    ? 'bg-gray-200 text-gray-400'
                    : 'bg-blue-500 text-white'
                }`}
              >
                Next Card
              </button>
            </div>
          </>
        ) : (
          <div className="text-center p-12 bg-white rounded-xl shadow-md">
            <p className="text-xl text-gray-600">
              This deck has no cards yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}