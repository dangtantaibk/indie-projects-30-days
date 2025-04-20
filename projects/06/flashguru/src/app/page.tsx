'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import DeckList from '@/components/DeckList';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import useFlashcards from '@/hooks/useFlashcards';
import { DeckSummary } from '@/types';

export default function Home() {
  const router = useRouter();
  const { getDeckSummaries, deleteDeck, loading, decks } = useFlashcards();
  const [recentDecks, setRecentDecks] = useState<DeckSummary[]>([]);

  useEffect(() => {
    const deckSummaries = getDeckSummaries();
    // Get the 3 most recent decks
    setRecentDecks(deckSummaries.slice(0, 3));
  }, [decks]); // Sử dụng decks từ useFlashcards làm dependency thay vì getDeckSummaries

  const handleDeleteDeck = (deckId: string) => {
    deleteDeck(deckId);
    setRecentDecks(prev => prev.filter(deck => deck.id !== deckId));
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-16">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                Learn Faster with <span className="text-blue-600">FlashGuru</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Create, study, and master your own flashcards. The simple way to boost your learning through active recall.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/decks/new" passHref>
                  <Button size="lg">
                    Create Your First Deck
                  </Button>
                </Link>
                <Link href="/decks" passHref>
                  <Button variant="outline" size="lg">
                    Browse Your Decks
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative w-full max-w-md">
              <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-700 p-6">
                {/* Placeholder for card illustration */}
                <div className="transform rotate-6 shadow-md">
                  <div className="bg-blue-500 text-white p-4 rounded-lg">
                    <div className="text-xl font-bold">HTTP</div>
                  </div>
                </div>
                <div className="transform -rotate-3 shadow-md translate-y-4 translate-x-4">
                  <div className="bg-green-500 text-white p-4 rounded-lg">
                    <div className="text-xl font-bold">HyperText Transfer Protocol</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Recent Decks */}
      <section className="py-12">
        <Container>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {recentDecks.length > 0 ? "Your Recent Decks" : "Get Started"}
            </h2>
            <Link href="/decks" passHref>
              <Button variant="outline">
                View All Decks
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">Loading your flashcard decks...</div>
          ) : (
            <DeckList decks={recentDecks} onDelete={handleDeleteDeck} />
          )}
        </Container>
      </section>

      {/* Features */}
      <section className="bg-gray-50 dark:bg-gray-800 py-12">
        <Container>
          <h2 className="text-2xl font-bold text-center mb-10 text-gray-900 dark:text-white">
            Features
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
              <div className="text-blue-500 text-3xl mb-4">🔄</div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Interactive Flashcards</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Flip cards with a click to test your recall and strengthen your memory.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
              <div className="text-blue-500 text-3xl mb-4">📊</div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Track Progress</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Mark cards as learned and see your study progress for each deck.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
              <div className="text-blue-500 text-3xl mb-4">📱</div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Study Anywhere</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your flashcards are saved locally, so you can study even offline.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-8 mt-auto">
        <Container>
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>© {new Date().getFullYear()} FlashGuru - Your Flashcard Assistant</p>
          </div>
        </Container>
      </footer>
    </main>
  );
}
