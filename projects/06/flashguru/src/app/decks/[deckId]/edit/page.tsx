'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import DeckForm from '@/components/DeckForm';
import FlashcardInput from '@/components/FlashcardInput';
import useFlashcards from '@/hooks/useFlashcards';
import { Deck, Flashcard } from '@/types';

export default function EditDeckPage({ params }: { params: { deckId: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getDeck, updateDeck, addCards, updateCard, deleteCard } = useFlashcards();
  const [deck, setDeck] = useState<Deck | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'info' | 'cards'>('info');
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editCardForm, setEditCardForm] = useState({ term: '', definition: '' });

  useEffect(() => {
    const deckData = getDeck(params.deckId);
    if (deckData) {
      setDeck(deckData);
    } else {
      // Deck not found, redirect to decks page
      router.push('/decks');
    }
    setLoading(false);

    // Check if we should switch to cards tab and edit a specific card
    const cardId = searchParams.get('cardId');
    if (cardId) {
      setActiveTab('cards');
      setEditingCardId(cardId);
      
      if (deckData) {
        const cardToEdit = deckData.cards.find(card => card.id === cardId);
        if (cardToEdit) {
          setEditCardForm({
            term: cardToEdit.term,
            definition: cardToEdit.definition
          });
        }
      }
    }
  }, [getDeck, params.deckId, router, searchParams]);

  const handleUpdateDeck = (name: string, description: string) => {
    if (!deck) return;
    
    const success = updateDeck(deck.id, name, description);
    if (success) {
      setDeck(prevDeck => {
        if (!prevDeck) return null;
        return {
          ...prevDeck,
          name,
          description
        };
      });
      
      router.push(`/decks/${deck.id}`);
    }
  };

  const handleAddCards = (cards: Array<{ term: string, definition: string }>) => {
    if (!deck) return;
    
    const success = addCards(deck.id, cards);
    if (success) {
      // Reload deck data to get the new cards
      const updatedDeck = getDeck(deck.id);
      if (updatedDeck) {
        setDeck(updatedDeck);
      }
      
      // Switch back to cards tab
      setEditingCardId(null);
    }
  };

  const handleUpdateCard = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!deck || !editingCardId) return;
    
    const success = updateCard(
      deck.id,
      editingCardId,
      editCardForm.term,
      editCardForm.definition
    );
    
    if (success) {
      // Reload deck data to get the updated card
      const updatedDeck = getDeck(deck.id);
      if (updatedDeck) {
        setDeck(updatedDeck);
      }
      
      setEditingCardId(null);
      setEditCardForm({ term: '', definition: '' });
    }
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
      
      if (editingCardId === cardId) {
        setEditingCardId(null);
        setEditCardForm({ term: '', definition: '' });
      }
    }
  };

  const startEditCard = (card: Flashcard) => {
    setEditingCardId(card.id);
    setEditCardForm({
      term: card.term,
      definition: card.definition
    });
  };

  const cancelEditCard = () => {
    setEditingCardId(null);
    setEditCardForm({ term: '', definition: '' });
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

  return (
    <main className="min-h-screen">
      <Navigation />
      
      <Container className="py-8 max-w-3xl">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Edit Deck: {deck.name}
            </h1>
            <Link href={`/decks/${deck.id}`} passHref>
              <Button variant="outline" size="sm">
                Cancel
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('info')}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'info'
                    ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400'
                }`}
              >
                Deck Information
              </button>
              <button
                onClick={() => setActiveTab('cards')}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'cards'
                    ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400'
                }`}
              >
                Flashcards ({deck.cards.length})
              </button>
            </nav>
          </div>
        </div>
        
        {activeTab === 'info' ? (
          <Card>
            <DeckForm
              initialData={{
                name: deck.name,
                description: deck.description || ''
              }}
              onSubmit={handleUpdateDeck}
              onCancel={() => router.push(`/decks/${deck.id}`)}
            />
          </Card>
        ) : (
          <div className="space-y-8">
            {/* Add new cards form */}
            <Card className="overflow-hidden">
              <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {editingCardId ? 'Edit Card' : 'Add New Cards'}
                </h3>
              </div>
              
              <div className="p-4">
                {editingCardId ? (
                  <form onSubmit={handleUpdateCard} className="space-y-4">
                    <div>
                      <label htmlFor="term" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Term
                      </label>
                      <input
                        id="term"
                        type="text"
                        value={editCardForm.term}
                        onChange={(e) => setEditCardForm({ ...editCardForm, term: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Enter term"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="definition" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Definition
                      </label>
                      <textarea
                        id="definition"
                        value={editCardForm.definition}
                        onChange={(e) => setEditCardForm({ ...editCardForm, definition: e.target.value })}
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Enter definition"
                        required
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={cancelEditCard}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">
                        Update Card
                      </Button>
                    </div>
                  </form>
                ) : (
                  <FlashcardInput
                    onSubmit={handleAddCards}
                  />
                )}
              </div>
            </Card>
            
            {/* Existing cards list */}
            {deck.cards.length > 0 && (
              <Card className="overflow-hidden">
                <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Existing Cards
                  </h3>
                </div>
                
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {deck.cards.map(card => (
                    <div key={card.id} className="p-4">
                      <div className="flex justify-between">
                        <div className="flex-grow">
                          <p className="font-medium text-gray-900 dark:text-white mb-1">{card.term}</p>
                          <p className="text-gray-600 dark:text-gray-400">{card.definition}</p>
                        </div>
                        <div className="ml-4 flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => startEditCard(card)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteCard(card.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        )}
      </Container>
    </main>
  );
}