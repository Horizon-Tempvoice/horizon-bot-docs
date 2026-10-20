// Twemoji glyphs, the emoji set Discord renders, as inline SVG for the mockups.

type EmojiProps = { className?: string };

/** Twemoji's ➕. */
export function PlusEmoji({ className = "size-[18px]" }: EmojiProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 36 36" className={className}>
      <path
        fill="#b5bac1"
        d="M31 15H21V5a3 3 0 1 0-6 0v10H5a3 3 0 1 0 0 6h10v10a3 3 0 1 0 6 0V21h10a3 3 0 1 0 0-6Z"
      />
    </svg>
  );
}
