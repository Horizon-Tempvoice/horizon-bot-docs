import { createI18nMiddleware } from 'fumadocs-core/i18n/middleware';
import { i18n } from '@/lib/i18n';
import { NextRequest, NextResponse, NextFetchEvent } from 'next/server';
import { getNegotiator } from 'fumadocs-core/negotiation';
import { match } from '@formatjs/intl-localematcher';

const i18nMiddleware = createI18nMiddleware(i18n);

export default function middleware(request: NextRequest, event: NextFetchEvent) {
    const url = request.nextUrl;
    const { pathname, search } = url;

    const segments = pathname.split('/');
    const pathLocale = segments[1];
    const isSupportedLocale = i18n.languages.includes(pathLocale as any);

    if (isSupportedLocale) {
        const response = i18nMiddleware(request, event);
        
        if (response instanceof NextResponse) {
            response.cookies.set('FD_LOCALE', pathLocale, {
                path: '/',
                maxAge: 60 * 60 * 24 * 30, // 30 Tage
                sameSite: 'lax',
            });
        }
        return response;
    }

    let locale = request.cookies.get('FD_LOCALE')?.value;

    if (!locale || !i18n.languages.includes(locale as any)) {
        const negotiator = getNegotiator(request);
        const languages = negotiator.languages(i18n.languages as string[]);
        locale = match(languages, i18n.languages as string[], i18n.defaultLanguage);
    }

    if (locale && locale !== i18n.defaultLanguage && i18n.languages.includes(locale as any)) {
        const redirectUrl = new URL(`/${locale}${pathname}${search}`, request.url);
        const response = NextResponse.redirect(redirectUrl);
        
        response.cookies.set('FD_LOCALE', locale, {
            path: '/',
            maxAge: 60 * 60 * 24 * 30,
            sameSite: 'lax',
        });
        
        return response;
    }

    return i18nMiddleware(request, event);
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|img|og).*)'],
};