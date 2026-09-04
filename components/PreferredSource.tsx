"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const BRAND = "FloStudios";
const DOMAIN = "www.flostudios.ai";
const PUBLICATION_HOST = "flostudios.ai";
const DEEPLINK = `https://www.google.com/preferences/source?q=${DOMAIN}`;
const STORAGE_KEY = "flostudios.preferred-source.dismissed-at";
const LOCAL_RESET_KEY = "flostudios.preferred-source.localhost-reset";
const LOCAL_RESET_TOKEN = "publication-host-v2";
const DISMISS_MS = 30 * 24 * 60 * 60 * 1000;
const SHOW_AFTER_MS = 10_000;
const SHOW_AFTER_SCROLL_PX = 320;
const SCRIPT_TIMEOUT_MS = 1_600;
const PUBLISHER_SRC = "https://news.google.com/swg/js/v1/publisher.js";

const PRIVATE_PREFIXES = [
  "/internships",
  "/internship",
  "/login",
  "/signin",
  "/signup",
  "/auth",
  "/account",
  "/admin",
  "/dashboard",
  "/hr",
];

type PreferredSourceApi = {
  init: (opts: { theme?: string; lang?: string }) => void;
  addPreferredSource: () => void;
};

declare global {
  interface Window {
    PREFERRED_SOURCE?: Array<(api: PreferredSourceApi) => void>;
  }
}

function isPrivatePath(pathname: string) {
  const path = (pathname.split("?")[0] || "/").toLowerCase();
  return PRIVATE_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));
}

/** Google's JS API can only add the current host. Never call it on localhost / previews. */
function isPublicationHost() {
  const host = window.location.hostname.replace(/^www\./, "").toLowerCase();
  return host === PUBLICATION_HOST;
}

/** One-shot: clear a stale localhost dismiss so the chip can be retested. */
function resetDismissedOnNonProduction() {
  if (isPublicationHost()) return;
  try {
    if (localStorage.getItem(LOCAL_RESET_KEY) === LOCAL_RESET_TOKEN) return;
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem(LOCAL_RESET_KEY, LOCAL_RESET_TOKEN);
  } catch {
    /* ignore */
  }
}

function isDismissed() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const at = Number(raw);
    if (!Number.isFinite(at)) return false;
    return Date.now() - at < DISMISS_MS;
  } catch {
    return false;
  }
}

function writeDismissed() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    /* ignore quota / private mode */
  }
}

function currentTheme(): "light" | "dark" {
  const t = document.documentElement.dataset.theme;
  if (t === "dark" || t === "light") return t;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function currentLang() {
  return document.documentElement.lang || "en";
}

let publisherPromise: Promise<PreferredSourceApi> | null = null;

function ensurePublisher(): Promise<PreferredSourceApi> {
  if (publisherPromise) return publisherPromise;

  publisherPromise = new Promise((resolve, reject) => {
    const fail = (err: Error) => {
      publisherPromise = null;
      reject(err);
    };

    const queue = (window.PREFERRED_SOURCE = window.PREFERRED_SOURCE || []);
    queue.push((api) => {
      try {
        api.init({ theme: currentTheme(), lang: currentLang() });
        resolve(api);
      } catch (err) {
        fail(err instanceof Error ? err : new Error("preferredSource.init failed"));
      }
    });

    if (document.querySelector(`script[src="${PUBLISHER_SRC}"]`)) return;

    const script = document.createElement("script");
    script.src = PUBLISHER_SRC;
    script.async = true;
    script.setAttribute("preferred-sources-control", "manual");
    script.onerror = () => fail(new Error("publisher.js failed to load"));
    document.head.appendChild(script);
  });

  return publisherPromise;
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = window.setTimeout(() => reject(new Error("timeout")), ms);
    promise.then(
      (value) => {
        window.clearTimeout(t);
        resolve(value);
      },
      (err) => {
        window.clearTimeout(t);
        reject(err);
      }
    );
  });
}

function openDeeplink() {
  window.open(DEEPLINK, "_blank", "noopener,noreferrer");
}

/** Official four-color Google G. */
function GoogleG({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export function PreferredSourceFooterLink() {
  const pathname = usePathname() ?? "/";
  if (isPrivatePath(pathname)) return null;

  return (
    <a
      className="footer-preferred"
      href={DEEPLINK}
      target="_blank"
      rel="noopener noreferrer"
    >
      <GoogleG size={18} />
      Add as preferred source on Google
    </a>
  );
}

export function PreferredSourceChip() {
  const pathname = usePathname() ?? "/";
  const privateRoute = isPrivatePath(pathname);
  const [eligible, setEligible] = useState(false);
  const [open, setOpen] = useState(false);
  const adding = useRef(false);

  useEffect(() => {
    resetDismissedOnNonProduction();
    if (privateRoute || isDismissed()) {
      setEligible(false);
      setOpen(false);
      return;
    }
    setEligible(true);
  }, [privateRoute]);

  useEffect(() => {
    if (!eligible || open) return;

    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      setOpen(true);
    };

    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      if (y >= SHOW_AFTER_SCROLL_PX) show();
    };

    const timer = window.setTimeout(show, SHOW_AFTER_MS);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [eligible, open]);

  useEffect(() => {
    if (!open || !isPublicationHost()) return;
    void ensurePublisher().catch(() => {
      /* click handler falls back to the deeplink */
    });
  }, [open]);

  const dismiss = useCallback(() => {
    writeDismissed();
    setOpen(false);
    setEligible(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, dismiss]);

  const onAdd = () => {
    if (adding.current) return;
    adding.current = true;
    dismiss();

    // addPreferredSource() always uses window.location.host (localhost in dev).
    if (!isPublicationHost()) {
      openDeeplink();
      adding.current = false;
      return;
    }

    void (async () => {
      try {
        const api = await withTimeout(ensurePublisher(), SCRIPT_TIMEOUT_MS);
        api.addPreferredSource();
      } catch {
        openDeeplink();
      } finally {
        adding.current = false;
      }
    })();
  };

  if (privateRoute || !open) return null;

  return (
    <aside
      className="ps-chip"
      role="region"
      aria-label={`Add ${BRAND} as a preferred source on Google`}
    >
      <button
        type="button"
        className="ps-chip-close"
        aria-label="Dismiss preferred source prompt"
        onClick={dismiss}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
      <h2 className="ps-chip-copy">
        See {BRAND} <span className="ps-chip-accent">more often</span> on Google
      </h2>
      <button type="button" className="ps-chip-add" onClick={onAdd}>
        <GoogleG size={16} />
        Add on Google
      </button>
    </aside>
  );
}
