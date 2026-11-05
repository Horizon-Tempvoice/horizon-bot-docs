import { CircleX, Smile } from "lucide-react";
import { withBase } from "@/lib/base";

export function DiscordCommandInput({
  command,
  option,
  description,
  value,
  caption,
}: {
  command: string;
  option: string;
  description: string;
  value: string;
  caption?: string;
}) {
  return (
    <figure className="not-prose my-6">
      <div className="overflow-hidden [zoom:0.875] rounded-lg border border-dc-border bg-dc-chat text-[15px] text-dc-text shadow-[0_8px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-2 border-b border-dc-border px-4 py-2.5">
          <span className="font-semibold text-dc-text-strong">{option}</span>
          <span className="min-w-0 flex-1 truncate text-sm text-dc-muted">{description}</span>
          <CircleX aria-hidden="true" className="size-5 shrink-0 text-dc-icon" />
        </div>
        <div className="flex items-center gap-3 px-4 py-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={withBase("/img/horizon-prod.png")} alt="" className="size-6 shrink-0 rounded-full" />
          <span className="font-semibold text-dc-text-strong">/{command}</span>
          <span className="flex min-w-0 items-stretch overflow-hidden rounded-md border border-[#5865f2] dark:border-[#00a8fc]/70">
            <span className="bg-dc-button px-2 py-0.5 text-dc-text">{option}</span>
            <span className="truncate px-2 py-0.5 text-dc-text-strong">{value}</span>
          </span>
          <Smile aria-hidden="true" className="ms-auto size-6 shrink-0 text-dc-icon" />
        </div>
      </div>
      {caption && <figcaption className="mt-2 text-center text-sm text-fd-muted-foreground">{caption}</figcaption>}
    </figure>
  );
}
