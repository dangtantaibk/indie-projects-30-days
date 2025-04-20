import React, { useState } from 'react';
import { Flashcard as FlashcardType } from '@/types';
import Card from './ui/Card';
import Button from './ui/Button';

interface FlashcardProps {
  card: FlashcardType;
  onLearnToggle: (cardId: string) => void;
  onEdit?: (cardId: string) => void;
  onDelete?: (cardId: string) => void;
  showActions?: boolean;
}

const Flashcard: React.FC<FlashcardProps> = ({
  card,
  onLearnToggle,
  onEdit,
  onDelete,
  showActions = true,
}) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className="perspective-1000 w-full">
      <div 
        className={`relative w-full transition-transform duration-300 transform-style-3d ${
          flipped ? 'rotate-y-180' : ''
        }`}
        style={{ minHeight: '180px' }}
      >
        {/* Front of card */}
        <Card 
          className={`absolute w-full h-full backface-hidden ${flipped ? 'invisible' : ''}`}
          onClick={handleFlip}
          hoverable
        >
          <div className="flex flex-col h-full">
            <div className="flex-grow flex items-center justify-center p-4">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white text-center">
                {card.term}
              </h3>
            </div>
            {showActions && (
              <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <Button 
                    variant={card.isLearned ? 'success' : 'outline'} 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onLearnToggle(card.id);
                    }}
                  >
                    {card.isLearned ? 'Learned' : 'Mark as Learned'}
                  </Button>
                </div>
                <div className="flex gap-2">
                  {onEdit && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(card.id);
                      }}
                    >
                      Edit
                    </Button>
                  )}
                  {onDelete && (
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(card.id);
                      }}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Back of card */}
        <Card 
          className={`absolute w-full h-full rotate-y-180 backface-hidden ${!flipped ? 'invisible' : ''}`}
          onClick={handleFlip}
          hoverable
        >
          <div className="flex flex-col h-full">
            <div className="flex-grow flex items-center justify-center p-4">
              <p className="text-gray-700 dark:text-gray-300 text-center">{card.definition}</p>
            </div>
            {showActions && (
              <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <Button 
                    variant={card.isLearned ? 'success' : 'outline'} 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onLearnToggle(card.id);
                    }}
                  >
                    {card.isLearned ? 'Learned' : 'Mark as Learned'}
                  </Button>
                </div>
                <div className="flex gap-2">
                  {onEdit && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(card.id);
                      }}
                    >
                      Edit
                    </Button>
                  )}
                  {onDelete && (
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(card.id);
                      }}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default Flashcard;