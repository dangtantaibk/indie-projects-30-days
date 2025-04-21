import { searchHashtags, getCategories, getHashtagsByCategory, getTrendingHashtags } from '@/lib/hashtags';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword');
  const action = searchParams.get('action');

  if (action === 'categories') {
    return NextResponse.json({ categories: getCategories() });
  }

  if (action === 'category' && keyword) {
    return NextResponse.json({ hashtags: getHashtagsByCategory(keyword) });
  }

  if (action === 'trending') {
    return NextResponse.json({ hashtags: getTrendingHashtags() });
  }

  if (keyword) {
    const hashtags = searchHashtags(keyword);
    return NextResponse.json({ hashtags });
  }

  return NextResponse.json({ 
    error: "Missing required parameters",
    message: "Please provide a keyword parameter or a valid action"
  }, { status: 400 });
}