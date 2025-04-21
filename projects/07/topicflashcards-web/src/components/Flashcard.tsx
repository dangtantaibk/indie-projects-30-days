'use client';

import { useState } from 'react';
import { Flashcard as FlashcardType } from '@/types';
import { toggleCardLearned } from '@/lib/storage';

interface FlashcardProps {
  card: FlashcardType;
  onLearnedChange: (id: string, learned: boolean) => void;
}

export default function Flashcard({ card, onLearnedChange }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  const handleMarkLearned = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newLearnedStatus = !card.learned;
    toggleCardLearned(card.id, newLearnedStatus);
    onLearnedChange(card.id, newLearnedStatus);
  };
  
  return (
    <div 
      className={`relative h-64 w-full max-w-lg mx-auto cursor-pointer
                 transition-transform duration-700 transform-style-preserve-3d
                 ${isFlipped ? 'rotate-y-180' : ''}`}
      onClick={handleFlip}
    >
      {/* Front side */}
      <div 
        className={`absolute inset-0 p-6 rounded-xl shadow-lg bg-white 
                  flex flex-col justify-center backface-hidden
                  ${isFlipped ? 'opacity-0' : 'opacity-100'}`}
      >
        <h3 className="text-2xl font-bold text-center mb-4 text-gray-900">{card.front}</h3>
        <div className="text-sm text-gray-500 absolute bottom-3 left-0 right-0 text-center">
          Click to flip
        </div>
      </div>
      
      {/* Back side */}
      <div
        className={`absolute inset-0 p-6 rounded-xl shadow-lg bg-blue-50 
                  flex flex-col justify-center rotate-y-180 backface-hidden
                  ${isFlipped ? 'opacity-100' : 'opacity-0'}`}
      >
        <p className="text-lg text-center text-gray-800 font-medium">{card.back}</p>
        <div className="absolute bottom-3 left-0 right-0 text-center flex justify-center">
          <button
            className={`mt-4 px-4 py-2 rounded-full text-sm font-medium
                      ${card.learned 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={handleMarkLearned}
          >
            {card.learned ? 'Learned ✓' : 'Mark as Learned'}
          </button>
        </div>
      </div>
    </div>
  );
}