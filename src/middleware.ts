import { NextResponse, NextRequest } from 'next/server';

import { ACCESS_TOKEN } from 'app-constants';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.includes('/auth') && !!req.cookies.get(ACCESS_TOKEN)?.value) {
    return NextResponse.redirect(new URL(`/`, req.url));
  }

  return NextResponse.next();
}
