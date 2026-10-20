import ChannelListMock from "@/components/discord-mock/ChannelListMock";
import { FitWidth } from "@/components/discord-mock/FitWidth";

const STEPS = [
  {
    label: "Join",
    text: "You join the Join to Create channel on your server.",
  },
  {
    label: "Talk",
    text: "Horizon instantly creates your own channel and moves you in. Rename it, lock it, kick people out: your call.",
  },
  {
    label: "Leave",
    text: "Once everyone has left, Horizon deletes the channel. Your channel list stays clean.",
  },
];

/** The life of a temporary channel in three Discord channel list mockups. */
export function TempChannelSteps() {
  return (
    <ol className="not-prose my-8 grid gap-10 sm:grid-cols-3 sm:gap-4">
      {STEPS.map((step, i) => (
        <li key={step.label} className="flex min-w-0 flex-col gap-4">
          <FitWidth width={344}>
            <ChannelListMock stage={i} />
          </FitWidth>
          <div>
            <h3 className="mb-1 text-xl font-bold tracking-tight text-fd-foreground">
              {step.label}
            </h3>
            <p className="text-sm leading-relaxed text-fd-muted-foreground">
              {step.text}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
