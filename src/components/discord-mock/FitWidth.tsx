"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

/**
 * Fills its column, but below `width` lays the children out at `width` and
 * zooms them down, so a mockup shrinks as a whole instead of reflowing.
 */
export function FitWidth({
  width,
  children,
}: {
  width: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      if (entry) setZoom(Math.min(1, entry.contentRect.width / width));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div ref={ref} className="w-full">
      <div style={{ width: zoom < 1 ? width : "100%", zoom }}>{children}</div>
    </div>
  );
}
