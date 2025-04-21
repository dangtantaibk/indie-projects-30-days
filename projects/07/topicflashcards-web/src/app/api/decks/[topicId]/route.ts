import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Flashcard } from '@/types';

export async function GET(
  request: Request,
  { params }: { params: { topicId: string } }
) {
  try {
    if (!params.topicId) {
      return NextResponse.json(
        { error: 'Topic ID is required' },
        { status: 400 }
      );
    }
    
    const topicId = params.topicId;
    const decksDirectory = path.join(process.cwd(), 'public', 'decks');
    
    // Try to find a JSON file that matches the topicId
    const possibleFilenames = [
      `${topicId}.json`,
      `${topicId.toLowerCase()}.json`,
      `${topicId.replace(/[_-]/g, '')}.json`
    ];
    
    let fileContents = null;
    for (const filename of possibleFilenames) {
      const fullPath = path.join(decksDirectory, filename);
      if (fs.existsSync(fullPath)) {
        fileContents = fs.readFileSync(fullPath, 'utf8');
        break;
      }
    }
    
    if (!fileContents) {
      return NextResponse.json(
        { error: 'Deck not found' },
        { status: 404 }
      );
    }
    
    const deckData = JSON.parse(fileContents);
    
    // Return both deck metadata and cards
    return NextResponse.json({
      ...deckData,
      cards: deckData.cards || []
    });
  } catch (error) {
    console.error(`Failed to fetch deck ${params.topicId}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch deck' },
      { status: 500 }
    );
  }
}