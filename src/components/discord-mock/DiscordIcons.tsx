// Discord UI glyphs redrawn as inline SVG for the mockups. Decorative only:
// the surrounding mock is aria-hidden.

type IconProps = { className?: string };

export function SpeakerIcon({ className = "size-5" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 3a1 1 0 0 0-1.65-.76L5.6 7H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.6l4.75 4.76A1 1 0 0 0 12 21V3Z" />
      <path d="M15.1 20.75c-.58.14-1.1-.33-1.1-.92v-.03c0-.5.37-.92.85-1.05a7 7 0 0 0 0-13.5A1.11 1.11 0 0 1 14 4.2v-.03c0-.6.52-1.06 1.1-.92a9 9 0 0 1 0 17.5Z" />
      <path d="M15.16 16.51c-.57.28-1.16-.2-1.16-.83v-.14c0-.43.28-.8.63-1.02a3 3 0 0 0 0-5.04c-.35-.23-.63-.6-.63-1.02v-.14c0-.63.59-1.1 1.16-.83a5 5 0 0 1 0 9.02Z" />
    </svg>
  );
}

export function SignalIcon({ className = "size-4" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className}>
      <circle cx="4.75" cy="19.25" r="1.75" fill="currentColor" />
      <path
        d="M4 14a6 6 0 0 1 6 6M4 9a11 11 0 0 1 11 11M4 4a16 16 0 0 1 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Cut-outs in the call buttons are drawn in the button color (#26262b), which
// is the only place these four icons appear.
const CUT = "#26262b";

export function CameraOffIcon({ className = "size-5" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className}>
      <rect x="2" y="6" width="14" height="12" rx="2.5" fill="currentColor" />
      <path d="M17 10.5 22 7.5v9l-5-3Z" fill="currentColor" />
      <path d="M3 21.5 21 3.5" stroke={CUT} strokeWidth="4.5" />
      <path
        d="M3 21.5 21 3.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ScreenShareIcon({ className = "size-5" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className}>
      <rect x="2" y="2.5" width="20" height="14" rx="2.5" fill="currentColor" />
      <path
        d="M8.5 13.5c0-3.5 2.5-5.5 6-5.5M12.5 5.25 15.5 8l-3 2.75"
        fill="none"
        stroke={CUT}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 16.5v4.5M8 21h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ActivitiesIcon({ className = "size-5" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <rect x="2.5" y="2.5" width="8.5" height="8.5" rx="3.5" />
      <path
        d="M17.25 3 21.5 10.5h-8.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="6.75" cy="17.25" r="4.25" />
      <path d="M17.25 12.75 18.6 15.9l3.15 1.35-3.15 1.35-1.35 3.15-1.35-3.15-3.15-1.35 3.15-1.35Z" />
    </svg>
  );
}

export function SoundboardIcon({ className = "size-5" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 19 19" className={className}>
      <path d="M2.6 7.4 1.2 18.2 11.4 16.2Z" fill="currentColor" />
      <ellipse
        cx="7"
        cy="11.8"
        rx="6.2"
        ry="2.4"
        transform="rotate(45 7 11.8)"
        fill={CUT}
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M5.6 2 6.8 5.4M10.2.8l.3 4.2M16 3l-3.3 3.25M17.7 8.3l-3.4.9M16.8 13.3 13.9 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HangUpIcon({ className = "size-5" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M21.5 13.4c-1.9-1.6-5.4-2.9-9.5-2.9s-7.6 1.3-9.5 2.9a1.5 1.5 0 0 0-.4 1.7l.9 2a1.5 1.5 0 0 0 1.8.8l3.1-1a1.5 1.5 0 0 0 1-1.4v-1.6c1-.3 2-.4 3.1-.4s2.1.1 3.1.4v1.6a1.5 1.5 0 0 0 1 1.4l3.1 1a1.5 1.5 0 0 0 1.8-.8l.9-2a1.5 1.5 0 0 0-.4-1.7Z" />
    </svg>
  );
}

export function MicIcon({ className = "size-5" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className}>
      <rect x="8" y="2" width="8" height="13" rx="4" fill="currentColor" />
      <path
        d="M5 11a7 7 0 0 0 14 0M12 18v3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HeadphonesIcon({ className = "size-5" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 3a9 9 0 0 0-9 9v6a3 3 0 0 0 3 3h1a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H5v-1a7 7 0 0 1 14 0v1h-2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h1a3 3 0 0 0 3-3v-6a9 9 0 0 0-9-9Z" />
    </svg>
  );
}

export function CogIcon({ className = "size-5" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M10.6 2h2.8l.5 2.6c.6.2 1.2.5 1.7.9l2.5-.9 1.4 2.4-2 1.7c.1.6.1 1.3 0 1.9l2 1.7-1.4 2.4-2.5-.9c-.5.4-1.1.7-1.7.9l-.5 2.6h-2.8l-.5-2.6a7 7 0 0 1-1.7-.9l-2.5.9-1.4-2.4 2-1.7a6 6 0 0 1 0-1.9l-2-1.7L5.9 4.6l2.5.9c.5-.4 1.1-.7 1.7-.9l.5-2.6ZM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        transform="translate(0 2)"
      />
    </svg>
  );
}
