import type { ReactNode } from 'react';

export function MockStep({ n, children }: { n: number; children: ReactNode }) {
  return (
    <div className="not-prose mt-8 flex items-center gap-3 text-fd-foreground [&+figure]:mt-3">
      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-fd-primary/15 font-display text-sm font-extrabold text-fd-primary">
        {n}
      </span>
      <span className="font-semibold">{children}</span>
    </div>
  );
}
