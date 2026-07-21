"use client";

import { Children, useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * 3D cylindrical carousel: each child card is attached to the outside of an
 * invisible horizontal cylinder (rotateY + translateZ). Only the ring rotates;
 * every card keeps its fixed angle. Drag / horizontal-wheel spin the ring with
 * inertia, then a spring settles it onto the nearest card. Emphasis
 * (scale / opacity / blur) is derived every frame from each card's live angle,
 * so neighbours curve smoothly into the distance. Transform-only — no layout.
 */
export default function WorkCarousel3D({ children }: { children: ReactNode }) {
  const cards = Children.toArray(children);
  const n = cards.length;
  const step = n > 0 ? 360 / n : 60;

  const hostRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const host = hostRef.current;
    const ring = ringRef.current;
    const els = cardRefs.current.filter((el): el is HTMLDivElement => !!el);
    if (!host || !ring || els.length === 0) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const st = { rotation: 0, velocity: 0, dragging: false, lastX: 0, raf: 0 };
    let radius = readRadius();
    let activeIdx = -1;

    function readRadius() {
      const v = getComputedStyle(ring!).getPropertyValue("--cyl-r");
      const parsed = parseFloat(v);
      return Number.isFinite(parsed) && parsed > 0 ? parsed : 560;
    }

    // wrap an angle to the signed −180..180 range (distance from the camera front)
    const signed = (a: number) => {
      a %= 360;
      if (a > 180) a -= 360;
      if (a < -180) a += 360;
      return a;
    };

    // emphasis falloff scales with the ring density, so a 6-card and a 16-card
    // ring both keep roughly the same number of cards legible around the front
    const fadeRange = step * 2.4;
    const blurStart = step * 1.0;

    const render = () => {
      ring.style.transform = `translateZ(${-radius}px) rotateY(${st.rotation}deg)`;
      let best = 0;
      let bestAbs = Infinity;
      for (let i = 0; i < els.length; i++) {
        const base = i * step;
        const a = Math.abs(signed(base + st.rotation));
        const scale = Math.max(0.7, 1 - a / 375);
        const opacity = Math.max(0, 1 - a / fadeRange);
        const blur = a > blurStart ? Math.min((a - blurStart) / (step * 0.8), 3.5) : 0;
        const el = els[i];
        el.style.transform = `rotateY(${base}deg) translateZ(${radius}px) scale(${scale.toFixed(3)})`;
        el.style.opacity = opacity.toFixed(3);
        el.style.filter = blur ? `blur(${blur.toFixed(2)}px)` : "none";
        el.style.pointerEvents = a < 90 ? "auto" : "none";
        if (a < bestAbs) {
          bestAbs = a;
          best = i;
        }
      }
      if (best !== activeIdx) {
        if (activeIdx >= 0) els[activeIdx].classList.remove("is-active");
        els[best].classList.add("is-active");
        activeIdx = best;
      }
    };

    const nearestSnap = () => Math.round(st.rotation / step) * step;

    const loop = () => {
      if (st.dragging) {
        render();
        st.raf = requestAnimationFrame(loop);
        return;
      }
      if (Math.abs(st.velocity) > 0.02) {
        // inertia: keep spinning, easing out — never a hard stop
        st.rotation += st.velocity;
        st.velocity *= 0.94;
        render();
        st.raf = requestAnimationFrame(loop);
        return;
      }
      // settle onto the nearest card with a spring
      const diff = nearestSnap() - st.rotation;
      if (!reduce && Math.abs(diff) > 0.05) {
        st.rotation += diff * 0.12;
        render();
        st.raf = requestAnimationFrame(loop);
      } else {
        st.rotation = nearestSnap();
        st.velocity = 0;
        render();
        st.raf = 0;
      }
    };
    const kick = () => {
      if (!st.raf) st.raf = requestAnimationFrame(loop);
    };

    const onDown = (e: PointerEvent) => {
      st.dragging = true;
      st.lastX = e.clientX;
      st.velocity = 0;
      host.classList.add("dragging");
      host.setPointerCapture?.(e.pointerId);
      e.preventDefault();
      kick();
    };
    const onMove = (e: PointerEvent) => {
      if (!st.dragging) return;
      const dx = e.clientX - st.lastX;
      st.lastX = e.clientX;
      const delta = dx * 0.22; // degrees per pixel
      st.rotation += delta;
      st.velocity = Math.max(-7, Math.min(7, delta)); // last delta = release momentum
    };
    const onUp = () => {
      if (!st.dragging) return;
      st.dragging = false;
      host.classList.remove("dragging");
      if (reduce) st.velocity = 0;
      kick();
    };

    // only horizontal wheel intent rotates — vertical scroll still pages normally
    const onWheel = (e: WheelEvent) => {
      const horiz = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : 0;
      if (!horiz) return;
      e.preventDefault();
      st.velocity = Math.max(-7, Math.min(7, horiz * 0.06));
      st.rotation += st.velocity;
      kick();
    };

    const onResize = () => {
      radius = readRadius();
      render();
    };

    host.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp);
    host.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", onResize, { passive: true });

    render();

    return () => {
      host.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      host.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
      if (st.raf) cancelAnimationFrame(st.raf);
    };
  }, [n, step]);

  return (
    <div className="cyl" ref={hostRef}>
      <div className="cyl-stage">
        <div className="cyl-ring" ref={ringRef} style={{ ["--step" as string]: `${step}deg` } as CSSProperties}>
          {cards.map((child, i) => (
            <div
              className="cyl-card"
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              style={{ ["--i" as string]: i } as CSSProperties}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
