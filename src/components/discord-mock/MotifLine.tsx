"use client";

import { useInView } from "@/lib/useInView";

/**
 * The page's motif line, grown once when it scrolls into view. Positioning
 * comes from the caller.
 */
export default function MotifLine({
  className = "",
  horizontal = false,
}: {
  className?: string;
  horizontal?: boolean;
}) {
  const [ref, inView] = useInView<HTMLSpanElement>();

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`motif-line block ${horizontal ? "motif-line-x" : ""} ${inView ? "is-visible" : ""} ${className}`}
    />
  );
}
