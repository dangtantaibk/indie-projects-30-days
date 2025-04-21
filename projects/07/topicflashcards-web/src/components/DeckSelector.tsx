'use client';

import { useState, useEffect } from 'react';
import { Topic } from '@/types';
import Link from 'next/link';
import { isPremiumUnlocked } from '@/lib/storage';

export default function DeckSelector() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch('/api/decks');
        
        if (!response.ok) {
          throw new Error('Failed to fetch topics');
        }
        
        const data = await response.json();
        setTopics(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching topics:', err);
        setError('Failed to load topics. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchTopics();
  }, []);
  
  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-pulse">Loading available topics...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {topics.map(topic => {
        const isUnlocked = !topic.isPremium || isPremiumUnlocked(topic.id);
        
        return (
          <div 
            key={topic.id}
            className={`bg-white rounded-xl shadow-md overflow-hidden 
                      ${topic.isPremium && !isUnlocked ? 'opacity-80' : ''}`}
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold mb-2">{topic.name}</h3>
                {topic.isPremium && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                    PREMIUM
                  </span>
                )}
              </div>
              
              <p className="text-gray-600 mb-4">{topic.description}</p>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{topic.totalCards} cards</span>
                
                {isUnlocked ? (
                  <Link href={`/deck/${topic.id}`}>
                    <span className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium">
                      Study Now
                    </span>
                  </Link>
                ) : (
                  <Link href={`/unlock/${topic.id}`}>
                    <span className="inline-block bg-yellow-500 text-white px-4 py-2 rounded-md text-sm font-medium">
                      Unlock
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}