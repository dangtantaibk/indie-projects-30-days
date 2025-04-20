import { Deck } from "@/types";

const DECKS_KEY = "flashguru_decks";

// Check if window object is available (client-side only)
const isClient = typeof window !== "undefined";

/**
 * Retrieves all flashcard decks from localStorage
 */
export function getAllDecks(): Deck[] {
  if (!isClient) return [];
  
  try {
    const decksJson = localStorage.getItem(DECKS_KEY);
    if (!decksJson) return [];
    
    const decks = JSON.parse(decksJson) as Deck[];
    
    // Convert string dates back to Date objects
    return decks.map(deck => ({
      ...deck,
      createdAt: new Date(deck.createdAt),
      updatedAt: new Date(deck.updatedAt),
      cards: deck.cards.map(card => ({
        ...card,
        lastReviewed: card.lastReviewed ? new Date(card.lastReviewed) : undefined
      }))
    }));
  } catch (error) {
    console.error("Error loading decks from localStorage:", error);
    return [];
  }
}

/**
 * Retrieves a specific deck by ID
 */
export function getDeckById(deckId: string): Deck | undefined {
  const decks = getAllDecks();
  return decks.find(deck => deck.id === deckId);
}

/**
 * Saves a deck to localStorage
 */
export function saveDeck(deck: Deck): void {
  if (!isClient) return;
  
  try {
    const decks = getAllDecks();
    const existingDeckIndex = decks.findIndex(d => d.id === deck.id);
    
    // Update deck's updatedAt timestamp
    const deckToSave = {
      ...deck,
      updatedAt: new Date()
    };
    
    if (existingDeckIndex >= 0) {
      // Update existing deck
      decks[existingDeckIndex] = deckToSave;
    } else {
      // Add new deck
      decks.push(deckToSave);
    }
    
    localStorage.setItem(DECKS_KEY, JSON.stringify(decks));
  } catch (error) {
    console.error("Error saving deck to localStorage:", error);
  }
}

/**
 * Deletes a deck from localStorage
 */
export function deleteDeck(deckId: string): void {
  if (!isClient) return;
  
  try {
    const decks = getAllDecks();
    const updatedDecks = decks.filter(deck => deck.id !== deckId);
    localStorage.setItem(DECKS_KEY, JSON.stringify(updatedDecks));
  } catch (error) {
    console.error("Error deleting deck from localStorage:", error);
  }
}

/**
 * Exports all decks as a JSON string
 */
export function exportDecks(): string {
  const decks = getAllDecks();
  return JSON.stringify(decks, null, 2);
}

/**
 * Imports decks from a JSON string
 */
export function importDecks(json: string): boolean {
  if (!isClient) return false;
  
  try {
    const decks = JSON.parse(json) as Deck[];
    
    // Validate the structure
    if (!Array.isArray(decks)) {
      throw new Error("Invalid deck data structure");
    }
    
    // Basic validation of each deck
    decks.forEach(deck => {
      if (!deck.id || !deck.name || !Array.isArray(deck.cards)) {
        throw new Error(`Invalid deck structure: ${deck.name || "Unknown"}`);
      }
    });
    
    localStorage.setItem(DECKS_KEY, json);
    return true;
  } catch (error) {
    console.error("Error importing decks:", error);
    return false;
  }
}