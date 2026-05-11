import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { GeistSans } from 'geist/font/sans';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import React from "react";
import { Analytics } from '@/components/analytics';
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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning style={{ '--brand-color': BRAND_COLOR } as React.CSSProperties}>
      <body className="flex flex-col min-h-screen">
        <Analytics />
        <RootProvider>
          <DocsLayout
            {...baseOptions}
            tree={source.getPageTree()}
          >
            {children}
          </DocsLayout>
        </RootProvider>
      </body>
    </html>
  );
}
