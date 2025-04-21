'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { unlockPremiumTopic } from '@/lib/storage';
import Link from 'next/link';

interface UnlockPageProps {
  params: {
    topicId: string;
  };
}

export default function UnlockPage({ params }: UnlockPageProps) {
  const { topicId } = params;
  const router = useRouter();
  const [deckInfo, setDeckInfo] = useState<{name: string, description: string} | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unlocking, setUnlocking] = useState(false);
  
  useEffect(() => {
    const fetchDeckInfo = async () => {
      try {
        const response = await fetch(`/api/decks/${topicId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch deck information');
        }
        
        const data = await response.json();
        setDeckInfo({
          name: data.name,
          description: data.description
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching deck info:', err);
        setError('Failed to load deck information');
        setLoading(false);
      }
    };
    
    fetchDeckInfo();
  }, [topicId]);
  
  const handleUnlock = () => {
    setUnlocking(true);
    
    // Simulate payment processing
    setTimeout(() => {
      unlockPremiumTopic(topicId);
      router.push(`/deck/${topicId}`);
    }, 1500);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }
  
  if (error || !deckInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-lg mb-6">{error || 'Could not load the deck information'}</p>
          <Link href="/">
            <span className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Return Home
            </span>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="container mx-auto max-w-xl">
        <div className="mb-6">
          <Link href="/" className="text-blue-500 hover:underline">
            &larr; Back to All Decks
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 bg-yellow-50 border-b border-yellow-100">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-yellow-800">
                Unlock Premium Content
              </h1>
              <span className="bg-yellow-200 text-yellow-800 text-sm px-2 py-1 rounded">
                PREMIUM
              </span>
            </div>
            <h2 className="text-xl font-semibold mb-2">{deckInfo.name}</h2>
            <p className="text-gray-600">{deckInfo.description}</p>
          </div>
          
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Premium Benefits</h3>
            <ul className="mb-6 space-y-2">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Unlimited access to this premium deck
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Progress tracking across devices
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Advanced learning algorithms
              </li>
            </ul>
            
            <div className="text-center">
              <p className="mb-4 font-semibold text-lg">Unlock this deck for just $4.99</p>
              <button
                onClick={handleUnlock}
                disabled={unlocking}
                className={`w-full py-3 px-6 text-white font-semibold rounded-md ${
                  unlocking
                    ? 'bg-gray-400'
                    : 'bg-yellow-500 hover:bg-yellow-600'
                }`}
              >
                {unlocking ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Unlock Now'
                )}
              </button>
              <p className="mt-2 text-xs text-gray-500">
                (Demo mode: Clicking will unlock the deck without actual payment)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}