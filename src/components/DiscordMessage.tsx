import type { ReactNode } from "react";
import { withBase } from "@/lib/base";

type Accent = "blue" | "green" | "red" | "grey";

const ACCENTS: Record<Accent, string> = {
  blue: "#00A0FF",
  green: "#57F287",
  red: "#ED4245",
  grey: "#99AAB5",
};

interface DiscordMessageProps {
  author?: string;
  avatar?: string;
  highlight?: boolean;
  verified?: boolean;
  ephemeral?: boolean;
  edited?: boolean;
  caption?: string;
  children: ReactNode;
}

export function DiscordMessage({
  author = "Horizon",
  avatar = "/img/horizon-prod.png",
  highlight,
  verified = true,
  ephemeral,
  edited,
  caption,
  children,
}: DiscordMessageProps) {
  return (
    <figure className="not-prose my-6">
      <div className="rounded-lg bg-[#313338] py-3 text-[15px] leading-[1.375] text-[#dbdee1]">
        <div
          className={`flex gap-4 px-4 py-1 ${
            highlight ? "border-l-2 border-[#f0b232] bg-[#f0b232]/10 pl-[14px]" : ""
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={withBase(avatar)} alt="" className="mt-0.5 h-10 w-10 shrink-0 rounded-full" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-white">{author}</span>
              <span className="inline-flex items-center gap-0.5 rounded bg-[#5865f2] px-1 text-[10px] font-semibold leading-4 text-white">
                {verified && (
                  <svg aria-label="Verified app" viewBox="0 0 16 15.2" className="h-[10px] w-[10px]">
                    <path d="M7.4 11.17 4 8.62l1-1.36 2 1.53L10.64 4 12 5z" fill="currentColor" />
                  </svg>
                )}
                APP
              </span>
              <span className="text-xs text-[#949ba4]">Today at 20:15</span>
            </div>
            {children}
            {edited && <span className="text-[10px] text-[#949ba4]">(edited)</span>}
            {ephemeral && (
              <p className="mt-1 text-xs text-[#949ba4]">Only you can see this · Dismiss message</p>
            )}
          </div>
        </div>
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-fd-muted-foreground">{caption}</figcaption>
      )}
    </figure>
  );
}

export function DiscordContainer({ accent = "blue", children }: { accent?: Accent; children: ReactNode }) {
  return (
    <div
      className="mt-1 flex max-w-[520px] flex-col gap-2 rounded-lg border border-[#3f4147] bg-[#2b2d31] px-4 py-3"
      style={{ borderLeft: `4px solid ${ACCENTS[accent]}` }}
    >
      {children}
    </div>
  );
}

export function DiscordText({ children }: { children: ReactNode }) {
  return <p className="m-0">{children}</p>;
}

export function DiscordHeading({ children }: { children: ReactNode }) {
  return <p className="m-0 text-xl font-bold leading-tight text-white">{children}</p>;
}

export function DiscordSubtext({ children }: { children: ReactNode }) {
  return <p className="m-0 text-xs text-[#949ba4]">{children}</p>;
}

export function DiscordSeparator() {
  return <hr className="my-0.5 w-full border-0 border-t border-[#3f4147]" />;
}

export function DiscordMention({ children, highlight }: { children: ReactNode; highlight?: boolean }) {
  return (
    <span
      className={`rounded px-0.5 font-medium ${
        highlight ? "bg-[#f0b232]/30 text-[#f0b232]" : "bg-[#5865f2]/30 text-[#c9cdfb]"
      }`}
    >
      {children}
    </span>
  );
}

export function DiscordTime({ children }: { children: ReactNode }) {
  return <span className="rounded bg-white/10 px-1">{children}</span>;
}

export function DiscordActionRow({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap gap-2">{children}</div>;
}

type ButtonStyle = "primary" | "secondary" | "success" | "danger";

const BUTTON_STYLES: Record<ButtonStyle, string> = {
  primary: "bg-[#5865f2]",
  secondary: "bg-[#4e5058]",
  success: "bg-[#248046]",
  danger: "bg-[#da373c]",
};

export function DiscordComponentButton({
  children,
  style = "secondary",
}: {
  children: ReactNode;
  style?: ButtonStyle;
}) {
  return (
    <span
      className={`inline-flex h-8 items-center rounded px-4 text-sm font-medium text-white ${BUTTON_STYLES[style]}`}
    >
      {children}
    </span>
  );
}
