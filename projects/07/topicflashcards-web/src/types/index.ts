export interface Flashcard {
  id: string;
  front: string;
  back: string;
  topicTag: string;
  learned: boolean;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  totalCards: number;
  isPremium: boolean;
}