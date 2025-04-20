import { useState, useEffect } from 'react';
import { Deck, Flashcard, DeckSummary } from '@/types';
import { getAllDecks, saveDeck, deleteDeck as deleteStorageDeck } from '@/lib/storage';
import { generateId } from '@/lib/utils';

export function useFlashcards() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load decks from localStorage
  useEffect(() => {
    try {
      const loadedDecks = getAllDecks();
      setDecks(loadedDecks);
      setError(null);
    } catch (err) {
      setError('Failed to load flashcard decks');
      console.error('Error loading decks:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get deck summaries
  const getDeckSummaries = (): DeckSummary[] => {
    return decks.map(deck => ({
      id: deck.id,
      name: deck.name,
      description: deck.description,
      cardCount: deck.cards.length,
      learnedCount: deck.cards.filter(card => card.isLearned).length
    }));
  };

  // Create a new deck
  const createDeck = (name: string, description: string = '') => {
    const newDeck: Deck = {
      id: generateId(),
      name,
      description,
      cards: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    try {
      saveDeck(newDeck);
      setDecks(prevDecks => [...prevDecks, newDeck]);
      return newDeck.id;
    } catch (err) {
      setError('Failed to create new deck');
      console.error('Error creating deck:', err);
      return null;
    }
  };

  // Get deck by ID
  const getDeck = (deckId: string): Deck | undefined => {
    return decks.find(deck => deck.id === deckId);
  };

  // Update deck details
  const updateDeck = (deckId: string, name: string, description: string = '') => {
    const deckToUpdate = decks.find(d => d.id === deckId);
    if (!deckToUpdate) return false;

    const updatedDeck = {
      ...deckToUpdate,
      name,
      description,
      updatedAt: new Date()
    };

    try {
      saveDeck(updatedDeck);
      setDecks(prevDecks => 
        prevDecks.map(d => d.id === deckId ? updatedDeck : d)
      );
      return true;
    } catch (err) {
      setError('Failed to update deck');
      console.error('Error updating deck:', err);
      return false;
    }
  };

  // Delete a deck
  const deleteDeck = (deckId: string) => {
    try {
      deleteStorageDeck(deckId);
      setDecks(prevDecks => prevDecks.filter(d => d.id !== deckId));
      return true;
    } catch (err) {
      setError('Failed to delete deck');
      console.error('Error deleting deck:', err);
      return false;
    }
  };

  // Add a card to a deck
  const addCard = (deckId: string, term: string, definition: string) => {
    const deckToUpdate = decks.find(d => d.id === deckId);
    if (!deckToUpdate) return false;

    const newCard: Flashcard = {
      id: generateId(),
      term,
      definition,
      isLearned: false
    };

    const updatedDeck = {
      ...deckToUpdate,
      cards: [...deckToUpdate.cards, newCard],
      updatedAt: new Date()
    };

    try {
      saveDeck(updatedDeck);
      setDecks(prevDecks => 
        prevDecks.map(d => d.id === deckId ? updatedDeck : d)
      );
      return true;
    } catch (err) {
      setError('Failed to add card');
      console.error('Error adding card:', err);
      return false;
    }
  };

  // Add multiple cards to a deck
  const addCards = (deckId: string, cards: Array<{ term: string, definition: string }>) => {
    const deckToUpdate = decks.find(d => d.id === deckId);
    if (!deckToUpdate) return false;

    const newCards: Flashcard[] = cards.map(card => ({
      id: generateId(),
      term: card.term,
      definition: card.definition,
      isLearned: false
    }));

    const updatedDeck = {
      ...deckToUpdate,
      cards: [...deckToUpdate.cards, ...newCards],
      updatedAt: new Date()
    };

    try {
      saveDeck(updatedDeck);
      setDecks(prevDecks => 
        prevDecks.map(d => d.id === deckId ? updatedDeck : d)
      );
      return true;
    } catch (err) {
      setError('Failed to add cards');
      console.error('Error adding cards:', err);
      return false;
    }
  };

  // Update a card
  const updateCard = (deckId: string, cardId: string, term: string, definition: string) => {
    const deckToUpdate = decks.find(d => d.id === deckId);
    if (!deckToUpdate) return false;

    const updatedCards = deckToUpdate.cards.map(card => 
      card.id === cardId ? { ...card, term, definition } : card
    );

    const updatedDeck = {
      ...deckToUpdate,
      cards: updatedCards,
      updatedAt: new Date()
    };

    try {
      saveDeck(updatedDeck);
      setDecks(prevDecks => 
        prevDecks.map(d => d.id === deckId ? updatedDeck : d)
      );
      return true;
    } catch (err) {
      setError('Failed to update card');
      console.error('Error updating card:', err);
      return false;
    }
  };

  // Delete a card
  const deleteCard = (deckId: string, cardId: string) => {
    const deckToUpdate = decks.find(d => d.id === deckId);
    if (!deckToUpdate) return false;

    const updatedCards = deckToUpdate.cards.filter(card => card.id !== cardId);
    const updatedDeck = {
      ...deckToUpdate,
      cards: updatedCards,
      updatedAt: new Date()
    };

    try {
      saveDeck(updatedDeck);
      setDecks(prevDecks => 
        prevDecks.map(d => d.id === deckId ? updatedDeck : d)
      );
      return true;
    } catch (err) {
      setError('Failed to delete card');
      console.error('Error deleting card:', err);
      return false;
    }
  };

  // Mark card as learned/not learned
  const toggleCardLearned = (deckId: string, cardId: string) => {
    const deckToUpdate = decks.find(d => d.id === deckId);
    if (!deckToUpdate) return false;

    const updatedCards = deckToUpdate.cards.map(card => 
      card.id === cardId ? { 
        ...card, 
        isLearned: !card.isLearned,
        lastReviewed: new Date()
      } : card
    );

    const updatedDeck = {
      ...deckToUpdate,
      cards: updatedCards,
      updatedAt: new Date()
    };

    try {
      saveDeck(updatedDeck);
      setDecks(prevDecks => 
        prevDecks.map(d => d.id === deckId ? updatedDeck : d)
      );
      return true;
    } catch (err) {
      setError('Failed to update card status');
      console.error('Error updating card status:', err);
      return false;
    }
  };

  return {
    decks,
    loading,
    error,
    getDeckSummaries,
    createDeck,
    getDeck,
    updateDeck,
    deleteDeck,
    addCard,
    addCards,
    updateCard,
    deleteCard,
    toggleCardLearned
  };
}

export default useFlashcards;