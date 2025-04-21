import { Flashcard } from '@/types';

// Key for storing learned cards in localStorage
const LEARNED_CARDS_KEY = 'topic_flashcards_learned';
const UNLOCKED_PREMIUM_KEY = 'topic_flashcards_premium_unlocked';

/**
 * Retrieve learned card IDs from localStorage
 */
export const getLearnedCards = (): string[] => {
  if (typeof window === 'undefined') return [];
  
  const storedData = localStorage.getItem(LEARNED_CARDS_KEY);
  if (!storedData) return [];
  
  try {
    return JSON.parse(storedData);
  } catch (e) {
    console.error('Error parsing learned cards from localStorage:', e);
    return [];
  }
};

/**
 * Mark a card as learned or not learned
 */
export const toggleCardLearned = (cardId: string, isLearned: boolean): void => {
  if (typeof window === 'undefined') return;
  
  const learnedCards = getLearnedCards();
  
  let updatedLearnedCards: string[];
  if (isLearned) {
    // Add to learned cards if not already there
    updatedLearnedCards = [...new Set([...learnedCards, cardId])];
  } else {
    // Remove from learned cards
    updatedLearnedCards = learnedCards.filter(id => id !== cardId);
  }
  
  localStorage.setItem(LEARNED_CARDS_KEY, JSON.stringify(updatedLearnedCards));
};

/**
 * Check if a card is marked as learned
 */
export const isCardLearned = (cardId: string): boolean => {
  return getLearnedCards().includes(cardId);
};

/**
 * Apply learned status to cards from localStorage
 */
export const applyLearnedStatus = (cards: Flashcard[]): Flashcard[] => {
  const learnedCardIds = getLearnedCards();
  
  return cards.map(card => ({
    ...card,
    learned: learnedCardIds.includes(card.id)
  }));
};

/**
 * Check if a premium topic is unlocked
 */
export const isPremiumUnlocked = (topicId: string): boolean => {
  if (typeof window === 'undefined') return false;
  
  const unlockedTopics = localStorage.getItem(UNLOCKED_PREMIUM_KEY);
  if (!unlockedTopics) return false;
  
  try {
    return JSON.parse(unlockedTopics).includes(topicId);
  } catch (e) {
    return false;
  }
};

/**
 * Unlock a premium topic
 */
export const unlockPremiumTopic = (topicId: string): void => {
  if (typeof window === 'undefined') return;
  
  const unlockedTopics = localStorage.getItem(UNLOCKED_PREMIUM_KEY);
  let updatedUnlockedTopics: string[] = [];
  
  if (unlockedTopics) {
    try {
      updatedUnlockedTopics = JSON.parse(unlockedTopics);
    } catch (e) {
      console.error('Error parsing unlocked topics:', e);
    }
  }
  
  // Add the new topic if not already unlocked
  if (!updatedUnlockedTopics.includes(topicId)) {
    updatedUnlockedTopics.push(topicId);
    localStorage.setItem(UNLOCKED_PREMIUM_KEY, JSON.stringify(updatedUnlockedTopics));
  }
};