"use client";

import { useParams, useRouter } from 'next/navigation';
import { i18n } from '@/lib/i18n';
import React from "react";
import { Languages, ChevronDown, Check } from 'lucide-react';
import { useI18n } from 'fumadocs-ui/contexts/i18n';
import { Popover, PopoverContent, PopoverTrigger } from 'fumadocs-ui/components/ui/popover';

const LABELS: Record<string, string> = {
  en: 'English',
  de: 'Deutsch',
};

// simple classnames merger
function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}

export function LanguageSwitcher() {
  const { lang, slug } = useParams() as { lang?: string; slug?: string[] };
  const router = useRouter();
  const context = useI18n();

  const currentLang = lang ?? i18n.defaultLanguage;
  const slugPath = slug?.length ? `/${slug.join('/')}` : '';

  function onSelect(target: string) {
    router.push(`/${target}${slugPath}`);
  }

  return (
    <div className="flex flex-col gap-2 p-2">
      <p className="text-xs font-medium text-fd-muted-foreground">
        {context.text.chooseLanguage}
      </p>
      <Popover>
        <PopoverTrigger className="flex items-center gap-2 w-full bg-fd-secondary/50 border rounded-md px-3 py-1.5 text-sm hover:bg-fd-accent transition-colors">
          <Languages className="size-4 shrink-0" />
          <span className="flex-1 text-left">{LABELS[currentLang] ?? currentLang.toUpperCase()}</span>
          <ChevronDown className="size-4 opacity-50" />
        </PopoverTrigger>
        <PopoverContent className="p-1 min-w-30">
          {i18n.languages.map((lng) => (
            <button
              key={lng}
              type="button"
              className={cn(
                "flex items-center justify-between w-full px-2 py-1.5 text-sm rounded-sm transition-colors",
                lng === currentLang 
                  ? "bg-fd-primary/10 text-fd-primary font-medium" 
                  : "hover:bg-fd-accent"
              )}
              onClick={() => onSelect(lng)}
            >
              {LABELS[lng] ?? lng.toUpperCase()}
              {lng === currentLang && <Check className="size-4" />}
            </button>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
}
