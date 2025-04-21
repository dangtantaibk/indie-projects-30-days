'use client';

import { Flashcard } from '@/types';

interface ProgressTrackerProps {
  cards: Flashcard[];
}

export default function ProgressTracker({ cards }: ProgressTrackerProps) {
  // Calculate progress statistics
  const totalCards = cards.length;
  const learnedCards = cards.filter(card => card.learned).length;
  const progressPercentage = totalCards > 0 ? Math.round((learnedCards / totalCards) * 100) : 0;
  
  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">Your Progress</h3>
      
      <div className="flex items-center mb-2">
        <div className="text-sm text-gray-600 mr-2">
          {learnedCards} of {totalCards} cards learned
        </div>
        <div className="text-sm font-medium text-blue-700">
          {progressPercentage}%
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      {/* Encouragement message based on progress */}
      <div className="mt-2 text-sm italic text-gray-600">
        {progressPercentage === 0 && "Let's start learning!"}
        {progressPercentage > 0 && progressPercentage < 25 && "Good start! Keep going!"}
        {progressPercentage >= 25 && progressPercentage < 50 && "You're making progress!"}
        {progressPercentage >= 50 && progressPercentage < 75 && "More than halfway there!"}
        {progressPercentage >= 75 && progressPercentage < 100 && "Almost there, great job!"}
        {progressPercentage === 100 && "Congratulations! You've learned all the cards!"}
      </div>
    </div>
  );
}