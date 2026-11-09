import {
  Check,
  DoorOpen,
  Download,
  Eye,
  EyeOff,
  LockKeyhole,
  LockKeyholeOpen,
  LogOut,
  type LucideIcon,
  MailPlus,
  PencilLine,
  Repeat,
  Trash,
  UserRoundCheck,
  UserRoundMinus,
  UserRoundPlus,
  UserRoundX,
  Users,
} from "lucide-react";
import { withBase } from "@/lib/base";
import { FitWidth } from "./FitWidth";

const ACTIONS: [string, LucideIcon, LucideIcon?][] = [
  ["Rename", PencilLine],
  ["Limit", Users],
  ["Lock", LockKeyhole],
  ["Unlock", LockKeyholeOpen],
  ["Invite", MailPlus],
  ["Delete", Trash],
  ["Hide", EyeOff],
  ["Show", Eye],
  ["Trust", UserRoundPlus],
  ["Untrust", UserRoundMinus],
  ["Claim", Download],
  ["Transfer", Repeat],
  ["Kick", DoorOpen, LogOut],
  ["Block", UserRoundX],
  ["Unblock", UserRoundCheck],
];

const DESIGN_WIDTH = 620;

export default function PanelMock() {
  return (
    <div aria-hidden="true" className="not-prose mx-auto my-6 w-full max-w-[620px]">
      <FitWidth width={DESIGN_WIDTH}>
        <div className="text-dc-text rounded-xl border border-dc-border bg-dc-chat p-5 shadow-[0_8px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
          <div className="flex gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={withBase("/img/horizon-prod.png")}
              alt=""
              width={40}
              height={40}
              className="size-10 shrink-0 rounded-full"
            />
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5">
                <span className="font-semibold text-dc-text-strong">Horizon</span>
                <span className="flex items-center gap-0.5 rounded bg-[#5865f2] px-1 text-xs font-semibold leading-[18px] text-white">
                  <Check className="size-3" strokeWidth={3.5} />
                  APP
                </span>
              </p>
              <div className="mt-1.5 rounded-r-lg border-l-4 border-brand bg-dc-embed px-5 py-4">
                <p className="text-lg font-bold text-dc-text-strong">
                  Horizon Interface
                </p>
                <p className="mt-2 text-[15px] text-dc-text">
                  You can use this interface to manage your temporary channels.
                </p>
                <div className="mt-5 grid grid-cols-5 gap-1.5">
                  {ACTIONS.map(([label, Icon]) => (
                    <span
                      key={label}
                      className="flex h-12 items-center justify-center gap-1 rounded-md border border-dc-embed-border bg-dc-embed-button px-1 text-[11px] font-bold uppercase text-brand"
                    >
                      <Icon className="size-4 shrink-0" strokeWidth={1.75} />
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-1.5 grid w-4/5 grid-cols-5 gap-2">
                {ACTIONS.map(([label, Icon, ButtonIcon = Icon]) => (
                  <span
                    key={label}
                    className="grid h-11 place-items-center rounded-xl bg-dc-embed text-brand"
                  >
                    <ButtonIcon className="size-6" strokeWidth={1.75} />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FitWidth>
    </div>
  );
}
