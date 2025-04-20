'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import DeckForm from '@/components/DeckForm';
import FlashcardInput from '@/components/FlashcardInput';
import useFlashcards from '@/hooks/useFlashcards';

export default function NewDeckPage() {
  const router = useRouter();
  const { createDeck, addCards } = useFlashcards();
  const [step, setStep] = useState<'info' | 'cards'>('info');
  const [newDeckId, setNewDeckId] = useState<string | null>(null);
  const [deckName, setDeckName] = useState('');

  const handleCreateDeck = (name: string, description: string) => {
    const deckId = createDeck(name, description);
    if (deckId) {
      setNewDeckId(deckId);
      setDeckName(name);
      setStep('cards');
    }
  };

  const handleAddCards = (cards: Array<{ term: string, definition: string }>) => {
    if (!newDeckId) return;
    
    const success = addCards(newDeckId, cards);
    if (success) {
      router.push(`/decks/${newDeckId}`);
    }
  };

  const handleSkip = () => {
    if (newDeckId) {
      router.push(`/decks/${newDeckId}`);
    }
  };

  return (
    <main className="min-h-screen">
      <Navigation />
      
      <Container className="py-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {step === 'info' ? 'Create New Deck' : `Add Flashcards to "${deckName}"`}
          </h1>
          {step === 'cards' && (
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Add your flashcards below, one per line.
            </p>
          )}
        </div>
        
        <Card>
          {step === 'info' ? (
            <DeckForm 
              onSubmit={handleCreateDeck} 
              onCancel={() => router.push('/decks')} 
            />
          ) : (
            <div className="p-4">
              <FlashcardInput 
                onSubmit={handleAddCards}
                onCancel={handleSkip}
              />
            </div>
          )}
        </Card>
      </Container>
    </main>
  );
}