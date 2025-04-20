export interface Flashcard {
  id: string;
  term: string;
  definition: string;
  isLearned: boolean;
  lastReviewed?: Date;
}

export interface Deck {
  id: string;
  name: string;
  description?: string;
  cards: Flashcard[];
  createdAt: Date;
  updatedAt: Date;
}

export type DeckSummary = {
  id: string;
  name: string;
  description?: string;
  cardCount: number;
  learnedCount: number;
};