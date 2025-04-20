import React from 'react';
import Link from 'next/link';
import Container from './ui/Container';

const Navigation: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm dark:bg-gray-800 py-4">
      <Container>
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-blue-600 flex items-center gap-2">
            <span className="text-2xl">🧠</span>
            <span>FlashGuru</span>
          </Link>
          <div className="flex gap-6">
            <Link 
              href="/" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Home
            </Link>
            <Link 
              href="/decks" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              My Decks
            </Link>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navigation;