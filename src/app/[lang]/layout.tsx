import { RootProvider } from 'fumadocs-ui/provider/next';
import '../global.css';
import { GeistSans } from 'geist/font/sans';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { defineI18nUI } from 'fumadocs-ui/i18n';
import { i18n } from '@/lib/i18n';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import React from "react";
import Script from 'next/script';
import type { Metadata } from 'next';
import { BRAND_COLOR } from '@/lib/brand';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://docs.horizon-bot.me'),
  title: {
    template: '%s | Horizon',
    default: 'Horizon',
  },
  icons: {
    icon: '/img/horizon-prod.png',
  },
};


const { provider } = defineI18nUI(i18n, {
    translations: {
        en: {
            displayName: 'English',
            chooseLanguage: 'Language',
            lastUpdate: 'Last updated at',
            search: 'Search',
            nextPage: 'Next Page',
            previousPage: 'Previous Page',
            toc: 'On this page',
            tocNoHeadings: 'No headings found in this page',
        },
        de: {
            displayName: 'Deutsch',
            chooseLanguage: 'Sprache',
            lastUpdate: 'Zuletzt aktualisiert am',
            search: 'Suche',
            nextPage: 'Nächste Seite',
            previousPage: 'Vorherige Seite',
            toc: 'Auf dieser Seite',
            tocNoHeadings: 'Keine Überschriften in dieser Seite gefunden',
        },
    },
});

export default async function Layout({ params, children }: { params: Promise<{ lang: string }>; children: React.ReactNode }) {
  const lang = (await params).lang;
  return (
    <html lang={lang} className={GeistSans.className} suppressHydrationWarning style={{ '--brand-color': BRAND_COLOR } as React.CSSProperties}>
      <body className="flex flex-col min-h-screen">
        <Script defer src="https://analytics.diamondforge.me/script.js" data-website-id="6e92de1c-42cb-4a3d-8698-3e907c128215" strategy="afterInteractive" />
        <Script defer src="https://analytics.diamondforge.me/recorder.js" data-website-id="6e92de1c-42cb-4a3d-8698-3e907c128215" data-sample-rate="0.6" data-mask-level="moderate" data-max-duration="900000" strategy="afterInteractive" />
        <RootProvider i18n={provider(lang)}>
          <DocsLayout
            {...baseOptions(lang)}
            tree={source.getPageTree(lang)}
            sidebar={{ banner: <LanguageSwitcher /> }}
          >
            {children}
          </DocsLayout>
        </RootProvider>
      </body>
    </html>
  );
}
