import { ExternalLink } from "lucide-react";

type Variant = "primary" | "secondary" | "danger" | "success" | "native";

interface DiscordButtonProps {
  label: string;
  href?: string;
  variant?: Variant;
}

const VARIANT_STYLES: Record<Variant, string> = {
  native: "bg-fd-background/60 border-fd-border text-fd-foreground hover:bg-fd-accent",
  primary: "bg-blue-500/20 border-blue-500/40 text-blue-400 hover:bg-blue-500/30",
  secondary: "bg-fd-background/60 border-fd-border text-fd-foreground hover:bg-fd-accent",
  danger: "bg-red-500/20 border-red-500/40 text-red-400 hover:bg-red-500/30",
  success: "bg-green-500/20 border-green-500/40 text-green-400 hover:bg-green-500/30",
};

export function DiscordButton({ label, href, variant }: DiscordButtonProps) {
  const variantClass = variant ? VARIANT_STYLES[variant] : VARIANT_STYLES.secondary;
  const className =
    `inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium no-underline ` +
    `backdrop-blur-md border transition-colors ${variantClass}`;

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
        <ExternalLink size={13} className="opacity-60" />
      </a>
    );
  }

  return <span className={className}>{label}</span>;
}
