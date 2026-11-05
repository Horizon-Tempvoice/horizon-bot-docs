import { ExternalLink } from 'lucide-react';

export function DashboardButton() {
  return (
    <a
      href="https://dashboard.horizon-bot.me"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-fd-primary px-4 text-sm font-semibold text-fd-primary-foreground transition-colors hover:bg-fd-primary/85"
    >
      Open Dashboard
      <ExternalLink size={13} className="opacity-60" />
    </a>
  );
}
