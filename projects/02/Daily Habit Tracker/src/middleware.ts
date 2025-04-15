import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Temporarily allowing all access
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api/ (API routes)
     * 2. /_next/ (Next.js internals)
     * 3. /.+\\..+ (static files)
     */
    '/((?!api|_next|.*\\..*).*)',
  ],
};