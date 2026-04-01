import Image from "next/image";
import type { ReactNode } from "react";

interface ImageWithCaptionProps {
  src: string;
  alt: string;
  caption?: string;
  inline?: boolean;
  maxWidth?: string;
  center?: boolean;
}

interface ImageRowProps {
  children: ReactNode;
}

export function ImageWithCaption({ src, alt, caption, inline = false, maxWidth, center = false }: ImageWithCaptionProps) {
  return (
    <figure
      className={inline ? "flex-1 min-w-0 m-0" : `my-6${center ? " mx-auto" : ""}`}
      style={maxWidth ? { maxWidth } : undefined}
    >
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes="100vw"
        className="rounded-lg border border-fd-border w-full h-auto"
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-fd-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function ImageRow({ children }: ImageRowProps) {
  return (
    <div className="flex gap-4 my-6">
      {children}
    </div>
  );
}
