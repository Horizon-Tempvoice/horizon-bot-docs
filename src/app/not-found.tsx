import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/base';

export const metadata: Metadata = {
  title: '404: Page not found',
  description: "This page doesn't exist. Head back to the Horizon docs.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100dvh-var(--fd-docs-row-2,3.5rem))] items-center px-4 py-24 [grid-area:main] md:px-12">
      <div className="w-full text-center">
        <h1 className="font-display text-[clamp(2.75rem,8vw,6rem)] leading-[0.92] font-extrabold tracking-tight break-words text-fd-foreground">
          404
          <span className="block text-fd-primary">Nobody&apos;s here.</span>
        </h1>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-fd-primary px-8 py-4 text-lg font-semibold text-fd-primary-foreground transition-colors duration-200 hover:bg-fd-primary/85"
          >
            Back to the docs
          </Link>
          <a
            href={SITE_URL}
            className="inline-flex items-center justify-center rounded-lg border border-fd-foreground/25 px-8 py-4 text-lg font-semibold text-fd-foreground transition-colors duration-200 hover:border-fd-foreground"
          >
            Go to horizon-bot.me
          </a>
        </div>
      </div>
    </main>
  );
}
