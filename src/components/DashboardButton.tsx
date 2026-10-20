import { ExternalLink, LayoutDashboard } from "lucide-react";

export function DashboardButton() {
  return (
    <a
      href="https://dashboard.horizon-bot.me"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-lg border bg-fd-secondary/50 p-1.5 ps-2 text-sm text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
    >
      <LayoutDashboard className="size-4" />
      Open Bot Dashboard
      <ExternalLink className="ms-auto me-1 size-3.5 opacity-60" />
    </a>
  );
}
