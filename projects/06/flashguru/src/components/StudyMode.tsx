import React, { useState, useEffect } from 'react';
import { Flashcard as FlashcardType } from '@/types';
import Flashcard from './Flashcard';
import Button from './ui/Button';
import Card from './ui/Card';

interface StudyModeProps {
  cards: FlashcardType[];
  deckName: string;
  onLearnToggle: (cardId: string) => void;
  onFinish: () => void;
}

const StudyMode: React.FC<StudyModeProps> = ({
  cards,
  deckName,
  onLearnToggle,
  onFinish
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledCards, setShuffledCards] = useState<FlashcardType[]>([]);
  const [studyCompleted, setStudyCompleted] = useState(false);
  const [learnedCount, setLearnedCount] = useState(0);

  useEffect(() => {
    // Shuffle cards initially
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    
    // Count already learned cards
    const initialLearnedCount = cards.filter(card => card.isLearned).length;
    setLearnedCount(initialLearnedCount);
  }, [cards]);

  const handleNext = () => {
    if (currentIndex < shuffledCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setStudyCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleLearnToggle = (cardId: string) => {
    const card = shuffledCards.find(c => c.id === cardId);
    if (card) {
      // Update learned count
      setLearnedCount(prevCount => 
        card.isLearned ? prevCount - 1 : prevCount + 1
      );
    }
    onLearnToggle(cardId);
  };

  if (cards.length === 0) {
    return (
      <Card className="p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">No cards in this deck</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Add some cards to start studying.
        </p>
        <Button onClick={onFinish}>Back to Deck</Button>
      </Card>
    );
  }

  if (studyCompleted) {
    const totalCards = cards.length;
    const progress = Math.round((learnedCount / totalCards) * 100);
    
    return (
      <Card className="p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">Study Session Complete!</h3>
        <div className="mb-6">
          <div className="text-3xl font-bold text-blue-600 mb-2">{learnedCount} / {totalCards}</div>
          <div className="text-gray-600 dark:text-gray-400">cards marked as learned</div>
          
          <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 h-4 rounded-full overflow-hidden">
            <div 
              className="bg-green-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Button 
            onClick={() => {
              setCurrentIndex(0);
              setStudyCompleted(false);
              setShuffledCards([...shuffledCards].sort(() => Math.random() - 0.5));
            }}
          >
            Study Again
          </Button>
          <Button variant="outline" onClick={onFinish}>
            Back to Deck
          </Button>
        </div>
      </Card>
    );
  }

  const currentCard = shuffledCards[currentIndex];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Studying: {deckName}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Card {currentIndex + 1} of {cards.length}
          </p>
        </div>
        <div>
          <span className="text-green-600 dark:text-green-400 font-semibold">
            {learnedCount} / {cards.length} learned
          </span>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-xl">
          {currentCard && (
            <Flashcard
              card={currentCard}
              onLearnToggle={handleLearnToggle}
              showActions={true}
            />
          )}
        </div>
      </div>

      <div className="flex justify-between gap-3 pt-4">
        <Button 
          variant="outline" 
          onClick={handlePrevious} 
          disabled={currentIndex === 0}
        >
          Previous
        </Button>
        <Button onClick={onFinish}>
          Exit Study
        </Button>
        <Button 
          variant="primary" 
          onClick={handleNext}
        >
          {currentIndex === shuffledCards.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default StudyMode;