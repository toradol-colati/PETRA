import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from './i18n.config';

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return i18n.defaultLocale;
  
  // Basic priority matching
  const languages = acceptLanguage.split(',').map((l) => l.split(';')[0].trim().toLowerCase());
  for (const lang of languages) {
    if (lang.startsWith('it')) return 'it';
    if (lang.startsWith('en')) return 'en';
  }
  
  return i18n.defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    );
  }
}

export const config = {
  // Configured to avoid static files, API routes, and Next.js internal assets
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json|Petra-logo.svg|og-image.png|sw.js|sitemap.xml|robots.txt|favicon).*)',
  ],
};
