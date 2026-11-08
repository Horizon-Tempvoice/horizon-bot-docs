import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { ChevronDown, CirclePlus, CloudDownload, Hash, MousePointer2, Plus } from "lucide-react";
import { PlusEmoji } from "@/components/discord-mock/DiscordEmojis";
import { SpeakerIcon } from "@/components/discord-mock/DiscordIcons";
import { withBase } from "@/lib/base";

export const metadata = { robots: { index: false, follow: false } };

function Cursor({ className = "" }: { className?: string }) {
  return (
    <MousePointer2
      className={`absolute size-6 fill-white text-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] ${className}`}
    />
  );
}

function Card({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="relative h-[190px] w-[300px] shrink-0 overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-[linear-gradient(140deg,#0b5f99_0%,#0e7fd0_55%,#29b0ff_100%)] [clip-path:polygon(0_0,100%_0,100%_60px,50px_60px,50px_100%,0_100%)]">
        <div className="absolute -right-14 -top-24 size-48 rounded-full bg-white/10" />
      </div>
      <p className="absolute left-4 top-3.5 font-display text-[21px] font-extrabold leading-none tracking-tight text-white">
        {label}
      </p>
      {children}
    </div>
  );
}

function Scene({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`absolute overflow-hidden rounded-tl-xl border-l border-t border-dc-border bg-dc-chat text-dc-text shadow-[0_10px_30px_rgba(0,0,0,0.45)] ${className}`}
    >
      {children}
    </div>
  );
}

function SetupCommandScene() {
  return (
    <Scene className="-bottom-4 left-9 right-0 top-[46px]">
      <div className="px-3 pt-2 text-[10px] font-semibold uppercase tracking-wide text-dc-muted">Commands</div>
      <div className="relative mx-2 mt-1 flex items-center gap-2 rounded-md bg-dc-selected px-2 py-1.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={withBase("/img/horizon-prod.png")} alt="" className="size-6 rounded-full" />
        <div className="min-w-0 leading-tight">
          <p className="text-[13px] font-semibold text-dc-text-strong">/setup</p>
          <p className="text-[11px] text-dc-muted">Set up temporary voice channels</p>
        </div>
        <Cursor className="-bottom-3 right-6" />
      </div>
      <div className="mx-2 mt-3 flex items-center gap-2 rounded-md bg-dc-button px-2.5 py-1.5 text-[12px] text-dc-text-strong">
        <span className="flex size-4 items-center justify-center rounded-full bg-dc-muted">
          <Plus className="size-3 text-dc-button" strokeWidth={3} />
        </span>
        /setup
      </div>
    </Scene>
  );
}

function SetupMenuScene() {
  return (
    <Scene className="-bottom-4 left-9 right-0 top-[46px] p-2.5">
      <div className="rounded-md border-l-[3px] border-[#00a0ff] bg-dc-embed px-2.5 py-2">
        <p className="text-[9px] text-dc-muted">Let&apos;s get Horizon running on your server...</p>
        <p className="text-[14px] font-bold text-dc-text-strong">Set up Horizon</p>
      </div>
      <div className="mt-2.5 flex gap-1.5">
        <span className="relative -m-[4px] rounded-[9px] border-2 border-white/80 p-[2px]">
          <span className="inline-flex h-7 items-center gap-1 rounded-md bg-[#5865f2] px-2.5 text-[11px] font-medium text-white">
            <CloudDownload className="size-3.5" />
            Setup Horizon
          </span>
          <Cursor className="-bottom-3 right-0" />
        </span>
        <span className="inline-flex h-7 items-center gap-1 rounded-md border border-dc-embed-border bg-dc-embed-button px-2.5 text-[11px] font-medium text-dc-text-strong opacity-50">
          <CirclePlus className="size-3.5 text-[#3fae5f]" />
          Add Generator
        </span>
      </div>
    </Scene>
  );
}

function SetupDoneScene() {
  return (
    <Scene className="-bottom-4 left-9 right-0 top-[46px] bg-dc-bg px-2 pt-2 text-[13px]">
      <p className="flex items-center gap-1 px-1 pb-1 text-[11px] font-semibold uppercase text-dc-muted">
        Horizon Channels
        <ChevronDown className="size-3" />
      </p>
      <div className="flex items-center gap-1.5 rounded-md px-1.5 py-1 text-dc-muted">
        <Hash className="size-4" />
        <span className="font-medium">interface</span>
      </div>
      <div className="flex items-center gap-1.5 rounded-md bg-dc-selected px-1.5 py-1">
        <SpeakerIcon className="size-4 text-dc-muted" />
        <PlusEmoji className="size-3.5" />
        <span className="font-semibold text-dc-text-strong">Create your channel</span>
      </div>
    </Scene>
  );
}

function Member() {
  return (
    <div className="mt-1 flex items-center gap-1.5 py-0.5 pl-7 text-[12px] text-dc-text">
      <span className="block size-[20px] overflow-hidden rounded-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={withBase("/img/user-avatar.png")} alt="" className="block size-full" />
      </span>
      User
    </div>
  );
}

function VoiceRow({
  name,
  generator,
  active,
  timer,
  clicked,
}: {
  name: string;
  generator?: boolean;
  active?: boolean;
  timer?: boolean;
  clicked?: boolean;
}) {
  return (
    <div
      className={`relative flex items-center gap-1.5 rounded-md px-1.5 py-1 ${active ? "bg-dc-selected" : "text-dc-muted"}`}
    >
      <SpeakerIcon className={`size-4 ${active ? "text-[#23a55a]" : "text-dc-muted"}`} />
      {generator && <PlusEmoji className="size-3.5" />}
      <span className={`flex-1 truncate ${active ? "font-semibold text-dc-text-strong" : "font-medium"}`}>{name}</span>
      {timer && <span className="font-mono text-[10px] text-[#23a55a]">0:30</span>}
      {clicked && <Cursor className="-bottom-3 left-[150px]" />}
    </div>
  );
}

function ChannelScene({ stage }: { stage: number }) {
  return (
    <Scene className="-bottom-4 left-9 right-0 top-[46px] bg-dc-bg px-2 pt-2 text-[13px]">
      <p className="flex items-center gap-1 px-1 pb-1 text-[11px] font-semibold uppercase text-dc-muted">
        Horizon Channels
        <ChevronDown className="size-3" />
      </p>
      <VoiceRow name="Create your channel" generator active={stage === 0} clicked={stage === 0} />
      {stage === 0 && <Member />}
      {stage === 1 && (
        <>
          <VoiceRow name="User's Channel" active timer />
          <Member />
        </>
      )}
      {stage === 2 && (
        <div className="mt-0.5 flex items-center justify-between rounded-md border border-dashed border-dc-dashed px-1.5 py-1 text-dc-muted">
          <span className="truncate line-through">User&apos;s Channel</span>
          <span className="text-[10px]">Deleted</span>
        </div>
      )}
    </Scene>
  );
}

function Row({ id, children }: { id: string; children: ReactNode }) {
  return (
    <div id={id} className="flex w-fit gap-3">
      {children}
    </div>
  );
}

export default function WelcomeCards() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <div id="welcome-cards" className="dark fixed left-0 top-0 z-[9999] flex flex-col gap-10 p-10">
      <style>
        {"html,body{background:transparent!important}body *{visibility:hidden}#welcome-cards,#welcome-cards *{visibility:visible}"}
      </style>
      <Row id="setup">
        <Card label="Run /setup">
          <SetupCommandScene />
        </Card>
        <Card label="Click Setup Horizon">
          <SetupMenuScene />
        </Card>
        <Card label="Channels ready">
          <SetupDoneScene />
        </Card>
      </Row>
      <Row id="usage">
        <Card label="Join to create">
          <ChannelScene stage={0} />
        </Card>
        <Card label="Your own channel">
          <ChannelScene stage={1} />
        </Card>
        <Card label="Gone when empty">
          <ChannelScene stage={2} />
        </Card>
      </Row>
    </div>
  );
}
