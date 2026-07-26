"use client";

import { useEffect, useRef, type CSSProperties } from "react";

type SvcCardMediaProps = {
  image: string;
  alt: string;
  video?: string;
  objectPosition?: string;
  scale?: number;
};

/**
 * Renders the still image (always) plus an optional video that only
 * plays when the parent `.svc-card` has the `.is-active` class (the
 * ScrollStack toggles this on the front card of the stack). Video is
 * `preload="none"` so it costs nothing on page load — download only
 * starts once the card becomes active. Honors prefers-reduced-motion
 * by leaving the video silent and never playing.
 */
export default function SvcCardMedia({
  image,
  alt,
  video,
  objectPosition,
  scale,
}: SvcCardMediaProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const videoEl = videoRef.current;
    if (!container || !videoEl || !video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const card = container.closest(".svc-card");
    if (!card) return;

    const update = () => {
      if (card.classList.contains("is-active")) {
        // preload="none" means the browser only actually requests the
        // file at play() time — that's the whole point of the swap.
        videoEl.play().catch(() => {
          // autoplay can still be blocked in edge cases; the poster
          // stays visible in that case, which is fine
        });
      } else {
        videoEl.pause();
      }
    };

    // Initial pass in case the card is already active on mount
    update();

    const observer = new MutationObserver(update);
    observer.observe(card, { attributes: true, attributeFilter: ["class"] });

    return () => {
      observer.disconnect();
      videoEl.pause();
    };
  }, [video]);

  const style: CSSProperties = {
    objectPosition: objectPosition ?? "50% 50%",
    ...(scale ? ({ ["--img-scale" as string]: scale } as CSSProperties) : {}),
  };

  return (
    <figure className="svc-card-media" ref={containerRef} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="svc-card-image"
        src={image}
        alt={alt}
        loading="lazy"
        style={style}
      />
      {video && (
        <video
          ref={videoRef}
          className="svc-card-video"
          src={video}
          poster={image}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          style={style}
        />
      )}
    </figure>
  );
}
