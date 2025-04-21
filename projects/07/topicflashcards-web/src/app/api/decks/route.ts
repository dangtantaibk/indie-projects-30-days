import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const decksDirectory = path.join(process.cwd(), 'public', 'decks');
    const fileNames = fs.readdirSync(decksDirectory);
    
    const decks = fileNames
      .filter(fileName => fileName.endsWith('.json'))
      .map(fileName => {
        const fullPath = path.join(decksDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const deckData = JSON.parse(fileContents);
        
        return {
          id: deckData.topicId,
          name: deckData.name,
          description: deckData.description,
          totalCards: deckData.cards?.length || 0,
          isPremium: deckData.isPremium || false
        };
      });
    
    return NextResponse.json(decks);
  } catch (error) {
    console.error('Failed to fetch decks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch decks' },
      { status: 500 }
    );
  }
}