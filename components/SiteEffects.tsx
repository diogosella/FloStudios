"use client";

import { useEffect } from "react";

/**
 * All the DOM-driven interactions from the original static build, ported to a
 * single client component that wires them up on mount and tears them down on
 * unmount (safe under React Strict Mode double-invocation).
 */
export default function SiteEffects() {
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nav = document.getElementById("nav");

    // track everything we add so we can remove it on cleanup
    const off: Array<() => void> = [];
    const on = <K extends keyof WindowEventMap>(
      target: Window | HTMLElement,
      ev: string,
      fn: EventListenerOrEventListenerObject,
      opts?: AddEventListenerOptions
    ) => {
      target.addEventListener(ev, fn, opts);
      off.push(() => target.removeEventListener(ev, fn, opts));
    };

    /* ---- sticky nav: bg on scroll + hide when scrolling down ---- */
    let lastY = window.scrollY;
    const navScroll = () => {
      if (!nav) return;
      const y = window.scrollY;
      nav.classList.toggle("scrolled", y > 40);
      nav.classList.toggle("hide", y > 320 && y > lastY);
      lastY = y;
    };
    navScroll();
    on(window, "scroll", navScroll, { passive: true });

    /* ---- scroll reveal: one-by-one cascade, robust to anchor jumps ---- */
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const cleanupEl = (el: HTMLElement) => {
      const te = (ev: TransitionEvent) => {
        if (ev.propertyName !== "transform") return;
        el.classList.remove("reveal");
        el.style.transitionDelay = "";
        el.removeEventListener("transitionend", te as EventListener);
      };
      el.addEventListener("transitionend", te as EventListener);
    };
    const revealScan = () => {
      const line = innerHeight * 0.9;
      let batch = 0;
      for (const el of revealEls) {
        if (el.dataset.shown) continue;
        const top = el.getBoundingClientRect().top;
        if (top < line) {
          const inBand = top > 0;
          el.dataset.shown = "1";
          el.style.transitionDelay = inBand ? Math.min(batch, 9) * 95 + "ms" : "0ms";
          if (inBand) batch++;
          el.classList.add("in");
          cleanupEl(el);
        }
      }
    };
    let revTick = false;
    const onRevScroll = () => {
      if (revTick) return;
      revTick = true;
      requestAnimationFrame(() => {
        revealScan();
        revTick = false;
      });
    };
    on(window, "scroll", onRevScroll, { passive: true });
    revealScan();

    /* ---- mobile menu ---- */
    const toggle = document.getElementById("navToggle");
    if (toggle) {
      on(toggle, "click", () =>
        document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })
      );
    }

    /* ---- animated counters ---- */
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const end = Number(el.dataset.count);
          const suf = el.dataset.suffix || "";
          cio.unobserve(el);
          if (reduce) {
            el.textContent = end + suf;
            return;
          }
          const dur = 1100;
          const t0 = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - t0) / dur);
            el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * end) + suf;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.6 }
    );
    document.querySelectorAll("[data-count]").forEach((el) => cio.observe(el));

    /* The Work section's 3D cylinder carousel owns its own interaction —
       see components/WorkCarousel3D.tsx. */

    return () => {
      off.forEach((fn) => fn());
      cio.disconnect();
    };
  }, []);

  return null;
}
