import { AudioLines, ChevronDown, Pencil, Plus } from "lucide-react";
import { withBase } from "@/lib/base";
import { PlusEmoji } from "./DiscordEmojis";
import {
  ActivitiesIcon,
  CameraOffIcon,
  CogIcon,
  HangUpIcon,
  HeadphonesIcon,
  MicIcon,
  ScreenShareIcon,
  SignalIcon,
  SoundboardIcon,
  SpeakerIcon,
} from "./DiscordIcons";
import MotifLine from "./MotifLine";

export type ChannelListMockText = {
  category: string;
  lounge: string;
  joinToCreate: string;
  channel: string;
  setStatus: string;
  member: string;
  username: string;
  server: string;
  voiceConnected: string;
  deleted: string;
};

const DEFAULT_MOCK: ChannelListMockText = {
  category: "Voice Channels",
  lounge: "General",
  joinToCreate: "Join to Create",
  channel: "Fabi's channel",
  setStatus: "Set a channel status",
  member: "Fabi",
  username: "fabi",
  server: "Chill Lounge",
  voiceConnected: "Voice Connected",
  deleted: "Deleted",
};

// Colors follow Discord's current dark theme
const MUTED = "text-[#94949c]";

// The cat sits small in a wide white frame, so it's zoomed in to fill the circle
function Avatar({ size = "size-7" }: { size?: string }) {
  return (
    <span
      className={`block ${size} shrink-0 overflow-hidden rounded-full bg-white`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={withBase("/img/fabi.png")}
        alt=""
        width={64}
        height={64}
        className="size-full scale-[1.45] object-cover"
      />
    </span>
  );
}

function ChannelRow({
  name,
  generator = false,
}: {
  name: string;
  generator?: boolean;
}) {
  return (
    <div className={`flex items-center gap-2 rounded-lg px-2 py-1.5 ${MUTED}`}>
      <SpeakerIcon className="size-5 shrink-0" />
      {generator && <PlusEmoji className="size-4 shrink-0" />}
      <span className="truncate font-medium">{name}</span>
    </div>
  );
}

/**
 * The channel you're connected to. A fresh temp channel also gets the status
 * line, the call timer and the motif line; the generator is only passed through.
 */
function ConnectedChannel({
  name,
  mock,
  generator = false,
}: {
  name: string;
  mock: ChannelListMockText;
  generator?: boolean;
}) {
  return (
    <div className="relative">
      {!generator && (
        <MotifLine className="absolute -left-2 top-0 bottom-0 w-[3px]" />
      )}
      <div className="rounded-lg bg-[#2a2a2f] px-2 py-1.5">
        <div className="flex items-center gap-2">
          <SpeakerIcon className="size-5 shrink-0 text-[#23a55a]" />
          {generator && <PlusEmoji className="size-4 shrink-0" />}
          <span className="flex-1 truncate font-semibold text-[#f2f3f5]">
            {name}
          </span>
          {!generator && (
            <span className="font-mono text-xs text-[#23a55a]">0:30</span>
          )}
        </div>
        {!generator && (
          <p className={`flex items-center gap-1 pl-7 text-xs ${MUTED}`}>
            {mock.setStatus}
            <Pencil className="size-3" />
          </p>
        )}
      </div>
      <div
        className={`flex items-center gap-2 py-1.5 pl-9 pr-2 text-sm ${MUTED}`}
      >
        {/* Green ring is Discord's speaking indicator */}
        <span className="rounded-full ring-2 ring-[#23a55a] ring-offset-2 ring-offset-[#121214]">
          <Avatar size="size-6" />
        </span>
        <span className="text-[#dfe0e2]">{mock.member}</span>
      </div>
    </div>
  );
}

/** A Discord channel list frozen at one stage of a temporary channel's life. */
export default function ChannelListMock({
  stage,
  mock = DEFAULT_MOCK,
}: {
  stage: number;
  mock?: ChannelListMockText;
}) {
  const connectedTo = stage === 0 ? mock.joinToCreate : mock.channel;

  return (
    <div
      aria-hidden="true"
      className="flex h-[24.5rem] flex-col overflow-hidden rounded-xl border border-[#2a2a30] bg-[#121214] text-[15px] shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
    >
      <div className="flex-1 px-2 pt-3">
        <p
          className={`flex items-center justify-between px-1.5 pb-1 text-sm font-medium ${MUTED}`}
        >
          <span className="flex items-center gap-1">
            {mock.category}
            <ChevronDown className="size-3.5" />
          </span>
          <Plus className="size-4" />
        </p>
        <ChannelRow name={mock.lounge} />
        {stage === 0 ? (
          <ConnectedChannel name={mock.joinToCreate} mock={mock} generator />
        ) : (
          <ChannelRow name={mock.joinToCreate} generator />
        )}
        {stage === 1 && <ConnectedChannel name={mock.channel} mock={mock} />}
        {stage === 2 && (
          <div
            className={`mt-0.5 flex items-center justify-between gap-2 rounded-lg border border-dashed border-[#3a3a40] px-2 py-1.5 ${MUTED}`}
          >
            <span className="truncate line-through">{mock.channel}</span>
            <span className="shrink-0 text-xs">{mock.deleted}</span>
          </div>
        )}
      </div>
      {/* Discord's floating panel: connection status while in voice, then the user bar */}
      <div className="m-2 rounded-lg border border-[#26262b] bg-[#1c1c20] px-2.5 py-2">
        {stage < 2 && (
          <div className="pb-1">
            <div className="flex items-center gap-2.5">
              <span className="grid size-8 shrink-0 place-items-center rounded-md bg-[#26262b]">
                <SignalIcon className="size-[18px] text-[#23a55a]" />
              </span>
              <div className="min-w-0 flex-1 leading-tight">
                <p className="truncate text-[15px] font-medium text-[#3fae5f]">
                  {mock.voiceConnected}
                </p>
                <p
                  className={`flex items-center gap-1 truncate text-xs ${MUTED}`}
                >
                  {stage === 0 && <PlusEmoji className="size-3 shrink-0" />}
                  <span className="truncate">
                    {connectedTo} / {mock.server}
                  </span>
                </p>
              </div>
              <span className="flex shrink-0 items-center gap-3 pr-1 text-[#b5bac1]">
                <AudioLines className="size-5" />
                <HangUpIcon className="size-5" />
              </span>
            </div>
            <div className="mt-2.5 grid grid-cols-4 gap-2 text-[#dfe0e2]">
              {[
                CameraOffIcon,
                ScreenShareIcon,
                ActivitiesIcon,
                SoundboardIcon,
              ].map((Icon, i) => (
                <span
                  // biome-ignore lint/suspicious/noArrayIndexKey: static list
                  key={i}
                  className="grid h-9 place-items-center rounded-lg bg-[#26262b]"
                >
                  <Icon className="size-5" />
                </span>
              ))}
            </div>
          </div>
        )}
        <div className={`flex items-center gap-2.5 ${stage < 2 ? "pt-2" : ""}`}>
          <span className="relative">
            <Avatar size="size-10" />
            <span className="absolute -right-0.5 -bottom-0.5 size-4 rounded-full border-[3px] border-[#1c1c20] bg-[#23a55a]" />
          </span>
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block truncate text-[15px] font-semibold text-[#f2f3f5]">
              {mock.member}
            </span>
            <span className={`block truncate text-[13px] ${MUTED}`}>
              {mock.username}
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-4 pr-1 text-[#b5bac1]">
            <MicIcon className="size-[22px]" />
            <HeadphonesIcon className="size-[22px]" />
            <CogIcon className="size-[22px]" />
          </span>
        </div>
      </div>
    </div>
  );
}
