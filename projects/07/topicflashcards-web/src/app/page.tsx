import DeckSelector from '@/components/DeckSelector';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-2 text-blue-800">
            Topic Flashcards
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Learn new concepts effectively with our curated flashcard decks. 
            Choose a topic below to get started!
          </p>
        </header>
        
        <DeckSelector />
        
        <footer className="mt-16 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Topic Flashcards. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
