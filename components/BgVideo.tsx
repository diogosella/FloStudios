"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * Background <video> that pauses itself when scrolled off-screen and resumes
 * when it comes back. Software video decode is one of the biggest CPU sinks
 * on machines without GPU-accelerated decoding — a page with two full-bleed
 * background videos will pin a core even when neither is on screen.
 *
 * Also honors prefers-reduced-motion: renders the poster only.
 */

type Source = { src: string; type: string };

type BgVideoProps = {
  className?: string;
  sources: Source[];
  poster?: string;
  style?: CSSProperties;
};

export default function BgVideo({ className = "", sources, poster, style }: BgVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      // Poster stays visible via the <video poster> attribute; skip playback entirely.
      video.removeAttribute("autoplay");
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? false;
        if (visible) {
          video.play().catch(() => {
            // Autoplay can be blocked (e.g. low battery / user gesture policy). Silent.
          });
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-hidden="true"
      style={style}
    >
      {sources.map((s) => (
        <source key={s.src} src={s.src} type={s.type} />
      ))}
    </video>
  );
}
