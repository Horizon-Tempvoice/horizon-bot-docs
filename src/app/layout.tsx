import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Bricolage_Grotesque } from 'next/font/google';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { baseOptions } from '@/lib/layout.shared';
import React from "react";
import { Analytics } from '@/components/analytics';
import type { Metadata } from 'next';
import { BRAND_COLOR } from '@/lib/brand';
import { withBase } from '@/lib/base';
import { SidebarFooter } from '@/components/SidebarFooter';
import { DashboardButton } from '@/components/DashboardButton';

const display = Bricolage_Grotesque({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-bricolage',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'development' ? 'http://localhost:3000/docs' : 'https://horizon-bot.me/docs'),
  title: {
    template: '%s | Horizon',
    default: 'Horizon',
  },
  icons: {
    icon: withBase('/img/horizon-prod.png'),
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} antialiased`} suppressHydrationWarning style={{ '--brand-color': BRAND_COLOR } as React.CSSProperties}>
      <body className="flex flex-col min-h-screen">
        <Analytics />
        <RootProvider
          theme={{ defaultTheme: 'dark' }}
          search={{ options: { api: withBase('/api/search') } }}
        >
          <DocsLayout
            {...baseOptions}
            nav={{ ...baseOptions.nav, mode: 'top' }}
            tree={source.getPageTree()}
            sidebar={{ banner: <DashboardButton />, footer: SidebarFooter }}
          >
            {children}
          </DocsLayout>
        </RootProvider>
      </body>
    </html>
  );
}
