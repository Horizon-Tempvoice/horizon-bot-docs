import { Eye } from "lucide-react";
import type { ReactNode } from "react";
import { withBase } from "@/lib/base";

type Accent = "blue" | "green" | "red" | "grey";

const ACCENTS: Record<Accent, string> = {
  blue: "border-l-[#00A0FF]",
  green: "border-l-[#57F287]",
  red: "border-l-[#ED4245]",
  grey: "border-l-[#99AAB5]",
};

interface MessageRowProps {
  author?: string;
  avatar?: string;
  highlight?: boolean;
  verified?: boolean;
  ephemeral?: boolean;
  edited?: boolean;
  command?: string;
  time?: string;
  children: ReactNode;
}

interface DiscordMessageProps extends MessageRowProps {
  caption?: string;
}

function CommandIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5" fill="currentColor">
      <circle cx="4.5" cy="4.5" r="2.5" />
      <circle cx="11.5" cy="4.5" r="2.5" />
      <circle cx="4.5" cy="11.5" r="2.5" />
      <circle cx="11.5" cy="11.5" r="2.5" />
    </svg>
  );
}

function CommandReply({ command }: { command: string }) {
  return (
    <div className="relative mb-1 flex items-center gap-1 pl-[72px] text-sm text-dc-muted">
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-9 h-2.5 w-8 rounded-tl-md border-t-2 border-l-2 border-dc-embed-border"
      />
      <span className="block size-4 shrink-0 overflow-hidden rounded-full bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={withBase("/img/fabi.png")} alt="" className="size-full scale-[1.45] object-cover" />
      </span>
      <span className="font-semibold text-dc-text-strong">Fabi</span>
      <span className="text-dc-text">used</span>
      <span className="inline-flex items-center gap-0.5 rounded bg-[#5865f2]/15 px-1 font-medium text-[#4752c4] dark:bg-[#5865f2]/30 dark:text-[#c9cdfb]">
        <CommandIcon />
        {command}
      </span>
    </div>
  );
}

const FRAME =
  "w-fit max-w-full [zoom:0.875] rounded-xl border border-dc-border bg-dc-chat py-3 pr-4 text-[15px] leading-[1.375] text-dc-text shadow-[0_8px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.3)]";

function MessageRow({
  author = "Horizon",
  avatar = "/img/horizon-prod.png",
  highlight,
  verified = true,
  ephemeral,
  edited,
  command,
  time = "Today at 20:15",
  children,
}: MessageRowProps) {
  return (
    <div>
      {command && <CommandReply command={command} />}
      <div
        className={`flex gap-4 px-4 py-1 ${
          highlight ? "border-l-2 border-[#f0b232] bg-[#f0b232]/10 pl-[14px]" : ""
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={withBase(avatar)} alt="" className="mt-0.5 h-10 w-10 shrink-0 rounded-full object-cover" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-dc-text-strong">{author}</span>
            <span className="inline-flex items-center gap-0.5 rounded bg-[#5865f2] px-1 text-[10px] font-semibold leading-4 text-white">
              {verified && (
                <svg aria-label="Verified app" viewBox="0 0 16 15.2" className="h-[10px] w-[10px]">
                  <path d="M7.4 11.17 4 8.62l1-1.36 2 1.53L10.64 4 12 5z" fill="currentColor" />
                </svg>
              )}
              APP
            </span>
            <span className="text-xs text-dc-muted">{time}</span>
          </div>
          {children}
          {edited && <p className="mt-1 text-xs text-dc-muted">(edited)</p>}
          {ephemeral && (
            <p className="mt-2 flex items-center gap-1.5 text-sm text-dc-muted">
              <Eye className="size-4" />
              Only you can see this •<span className="text-[#006ce7] dark:text-[#00a8fc]">Dismiss message</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function Caption({ children }: { children?: string }) {
  if (!children) return null;
  return <figcaption className="mt-2 text-center text-sm text-fd-muted-foreground">{children}</figcaption>;
}

export function DiscordMessage({ caption, ...props }: DiscordMessageProps) {
  return (
    <figure className="not-prose my-6">
      <div className={FRAME}>
        <MessageRow {...props} />
      </div>
      <Caption>{caption}</Caption>
    </figure>
  );
}

export function DiscordContainer({
  accent = "blue",
  thumbnail,
  children,
}: {
  accent?: Accent;
  thumbnail?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`mt-1 flex max-w-[540px] gap-4 rounded-lg border border-l-4 border-dc-embed-border bg-dc-embed py-3 pr-4 pl-3 ${ACCENTS[accent]}`}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-2">{children}</div>
      {thumbnail && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={withBase(thumbnail)} alt="" className="size-20 shrink-0 rounded-full max-sm:size-14" />
      )}
    </div>
  );
}

export function DiscordText({ children }: { children: ReactNode }) {
  return <p className="m-0">{children}</p>;
}

export function DiscordHeading({ children, large }: { children: ReactNode; large?: boolean }) {
  return (
    <p className={`m-0 font-bold leading-tight text-dc-text-strong ${large ? "text-xl" : "text-base"}`}>
      {children}
    </p>
  );
}

export function DiscordSubtext({ children }: { children: ReactNode }) {
  return <p className="m-0 text-xs text-dc-muted">{children}</p>;
}

export function DiscordFooter({ children = "Horizon • Tempvoice System" }: { children?: ReactNode }) {
  return <p className="m-0 mt-1 text-sm font-medium text-dc-text">{children}</p>;
}

export function DiscordFields({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-2 gap-x-4 gap-y-2">{children}</div>;
}

export function DiscordField({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <p className="m-0 font-semibold text-dc-text-strong">{name}</p>
      <div className="mt-0.5">{children}</div>
    </div>
  );
}

export function DiscordCode({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-[#e3e5e8] px-1 py-0.5 font-mono text-[0.85em] text-dc-text-strong dark:bg-[#0e0e10]">
      {children}
    </code>
  );
}

export function DiscordSeparator() {
  return <hr className="my-0.5 w-full border-0 border-t border-dc-embed-border" />;
}

export function DiscordMention({ children, highlight }: { children: ReactNode; highlight?: boolean }) {
  return (
    <span
      className={`rounded px-0.5 font-medium ${
        highlight
          ? "bg-[#f0b232]/30 text-[#9a6700] dark:text-[#f0b232]"
          : "bg-[#5865f2]/15 text-[#4752c4] dark:bg-[#5865f2]/30 dark:text-[#c9cdfb]"
      }`}
    >
      {children}
    </span>
  );
}

export function DiscordTime({ children }: { children: ReactNode }) {
  return <span className="rounded bg-dc-text/10 px-1">{children}</span>;
}

export function DiscordActionRow({ children }: { children: ReactNode }) {
  return <div className="mt-2 flex flex-wrap gap-2">{children}</div>;
}

type ButtonStyle = "primary" | "secondary" | "success" | "danger";

const BUTTON_STYLES: Record<ButtonStyle, string> = {
  primary: "bg-[#5865f2] text-white",
  secondary: "border border-dc-embed-border bg-dc-embed-button text-dc-text-strong",
  success: "bg-[#248046] text-white",
  danger: "bg-[#da373c] text-white",
};

export function DiscordComponentButton({
  children,
  icon,
  style = "secondary",
  highlight,
  disabled,
}: {
  children: ReactNode;
  icon?: ReactNode;
  style?: ButtonStyle;
  highlight?: boolean;
  disabled?: boolean;
}) {
  return (
    <span
      className={`inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-sm font-medium ${BUTTON_STYLES[style]} ${
        highlight ? "ring-2 ring-fd-primary ring-offset-2 ring-offset-dc-chat" : ""
      } ${disabled ? "opacity-50" : ""}`}
    >
      {icon}
      {children}
    </span>
  );
}
