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

    /* ---- hero: real video takes over the animated scene when it loads ---- */
    const hero = document.getElementById("top");
    const vid = document.getElementById("heroVideo") as HTMLVideoElement | null;
    if (vid) {
      on(vid, "loadeddata", () => {
        if (vid.videoWidth > 0) hero?.classList.add("has-video");
      });
    }

    /* ---- scroll parallax on hero media (not cursor-driven) ---- */
    const media = document.querySelector<HTMLElement>(".hero-media");
    if (!reduce && media) {
      on(
        window,
        "scroll",
        () => {
          media.style.transform = "translateY(" + Math.min(window.scrollY, 900) * 0.22 + "px)";
        },
        { passive: true }
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

    /* ---- work carousel: drag, arrows, dots, center-focus scaling ---- */
    const track = document.querySelector<HTMLElement>(".car-track");
    if (track) {
      const cards = Array.from(track.querySelectorAll<HTMLElement>(".pcard"));
      const prevBtn = document.querySelector<HTMLButtonElement>(".car-arrow.prev");
      const nextBtn = document.querySelector<HTMLButtonElement>(".car-arrow.next");
      const dots = Array.from(document.querySelectorAll<HTMLButtonElement>(".car-dots button"));

      const centerScroll = (i: number) =>
        cards[i].offsetLeft - (track.clientWidth - cards[i].offsetWidth) / 2;
      const currentIndex = () => {
        const center = track.scrollLeft + track.clientWidth / 2;
        let best = 0;
        let bd = Infinity;
        cards.forEach((c, i) => {
          const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - center);
          if (d < bd) {
            bd = d;
            best = i;
          }
        });
        return best;
      };
      // Smooth scroll manually: native smooth-scroll is cancelled by scroll-snap,
      // so we tween scrollLeft directly (with snap disabled during the animation).
      let anim = 0;
      const animateTo = (target: number) => {
        if (anim) cancelAnimationFrame(anim);
        const start = track.scrollLeft;
        const dist = target - start;
        if (Math.abs(dist) < 1) return;
        if (reduce) {
          track.scrollLeft = target;
          return;
        }
        track.style.scrollSnapType = "none";
        const t0 = performance.now();
        const ease = (t: number) => 1 - Math.pow(1 - t, 3);
        const frame = (now: number) => {
          const p = Math.min(1, (now - t0) / 450);
          track.scrollLeft = start + dist * ease(p);
          if (p < 1) {
            anim = requestAnimationFrame(frame);
          } else {
            anim = 0;
            track.style.scrollSnapType = "";
          }
        };
        anim = requestAnimationFrame(frame);
      };
      off.push(() => anim && cancelAnimationFrame(anim));

      const goTo = (i: number) => {
        animateTo(centerScroll(Math.max(0, Math.min(cards.length - 1, i))));
      };

      const focus = () => {
        const center = track.scrollLeft + track.clientWidth / 2;
        const half = track.clientWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        cards.forEach((c, i) => {
          const cc = c.offsetLeft + c.offsetWidth / 2;
          const d = Math.abs(cc - center);
          const norm = Math.min(d / half, 1);
          c.style.setProperty("--s", (1 - norm * 0.14).toFixed(3));
          c.style.setProperty("--o", (1 - norm * 0.4).toFixed(3));
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        dots.forEach((dt, i) => dt.classList.toggle("active", i === best));
        prevBtn?.toggleAttribute("disabled", track.scrollLeft <= 2);
        nextBtn?.toggleAttribute("disabled", track.scrollLeft >= track.scrollWidth - track.clientWidth - 2);
      };

      let ftick = false;
      const onFocus = () => {
        if (ftick) return;
        ftick = true;
        requestAnimationFrame(() => {
          focus();
          ftick = false;
        });
      };
      on(track, "scroll", onFocus, { passive: true });
      on(window, "resize", onFocus, { passive: true });
      focus();

      if (prevBtn) on(prevBtn, "click", () => goTo(currentIndex() - 1));
      if (nextBtn) on(nextBtn, "click", () => goTo(currentIndex() + 1));
      dots.forEach((dt, i) => on(dt, "click", () => goTo(i)));

      // drag to scroll (mouse)
      let down = false;
      let startX = 0;
      let startLeft = 0;
      const pd = (e: PointerEvent) => {
        down = true;
        startX = e.clientX;
        startLeft = track.scrollLeft;
        track.classList.add("dragging");
      };
      const pm = (e: PointerEvent) => {
        if (!down) return;
        track.scrollLeft = startLeft - (e.clientX - startX);
      };
      const pu = () => {
        if (!down) return;
        down = false;
        track.classList.remove("dragging");
      };
      on(track, "pointerdown", pd as EventListener);
      on(window, "pointermove", pm as EventListener, { passive: true });
      on(window, "pointerup", pu as EventListener);
    }

    return () => {
      off.forEach((fn) => fn());
      cio.disconnect();
    };
  }, []);

  return null;
}
