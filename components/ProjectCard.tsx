import type { CSSProperties } from "react";

export type ProjectStatus = { label: string; kind: "live" | "dev" | "soon" };

export type MediaIconName =
  | "sparkle"
  | "globe"
  | "plane"
  | "cap"
  | "robot"
  | "bulb"
  | "chip"
  | "network"
  | "scales"
  | "rocket"
  | "orbit";

export type ProjectMedia =
  | { kind: "image"; src: string; alt: string; variant?: "product" | "logo" | "photo"; scale?: number }
  | { kind: "icon"; name: MediaIconName };

export type ProjectCardProps = {
  accent: string;
  pattern?: "dots" | "rings" | "rays";
  media: ProjectMedia;
  status: ProjectStatus;
  kicker: string;
  title: string;
  desc: string;
  category: string;
  tags: string[];
  year?: string;
  stats?: { value: number; suffix?: string; label: string }[];
};

/* ---- accent helpers: the accent color drives glow, border, divider, panel & pills ---- */
function hexToRgb(hex: string) {
  const n = hex.replace("#", "");
  const v = n.length === 3 ? n.split("").map((c) => c + c).join("") : n;
  return { r: parseInt(v.slice(0, 2), 16), g: parseInt(v.slice(2, 4), 16), b: parseInt(v.slice(4, 6), 16) };
}
function relLuminance({ r, g, b }: { r: number; g: number; b: number }) {
  const f = (c: number) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function mixDown({ r, g, b }: { r: number; g: number; b: number }, t: number) {
  // blend the accent toward a deep ink so the bottom panel gets depth + contrast
  const d = { r: 6, g: 16, b: 26 };
  const m = (a: number, x: number) => Math.round(a * t + x * (1 - t));
  return `rgb(${m(r, d.r)}, ${m(g, d.g)}, ${m(b, d.b)})`;
}

function MediaIcon({ name }: { name: MediaIconName }) {
  if (name === "sparkle") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 1.5c.8 4.9 2.9 7 7.8 7.8-4.9.8-7 2.9-7.8 7.8-.8-4.9-2.9-7-7.8-7.8 4.9-.8 7-2.9 7.8-7.8Z" />
        <path d="M19 14c.35 2.15 1.35 3.15 3.5 3.5-2.15.35-3.15 1.35-3.5 3.5-.35-2.15-1.35-3.15-3.5-3.5 2.15-.35 3.15-1.35 3.5-3.5Z" opacity=".7" />
      </svg>
    );
  }

  const stroke = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "plane":
      return (
        <svg {...stroke}>
          <path d="M22 2 11 13" />
          <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
        </svg>
      );
    case "cap":
      return (
        <svg {...stroke}>
          <path d="M22 10 12 5 2 10l10 5 10-5Z" />
          <path d="M6 12v5c0 1 2.7 3 6 3s6-2 6-3v-5" />
        </svg>
      );
    case "robot":
      return (
        <svg {...stroke}>
          <rect x="4" y="8" width="16" height="12" rx="2.5" />
          <path d="M9 8V6a3 3 0 0 1 6 0v2M12 2v2M9.5 14h.01M14.5 14h.01" />
        </svg>
      );
    case "bulb":
      return (
        <svg {...stroke}>
          <path d="M9.5 18.5h5M10.5 22h3" />
          <path d="M12 2a7 7 0 0 0-4 12.8v3.7h8v-3.7A7 7 0 0 0 12 2Z" />
        </svg>
      );
    case "chip":
      return (
        <svg {...stroke}>
          <rect x="4.5" y="4.5" width="15" height="15" rx="2.5" />
          <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
          <path d="M9 2v2.5M15 2v2.5M9 19.5V22M15 19.5V22M2 9h2.5M2 15h2.5M19.5 9H22M19.5 15H22" />
        </svg>
      );
    case "network":
      return (
        <svg {...stroke}>
          <circle cx="5" cy="6" r="2.2" />
          <circle cx="19" cy="6" r="2.2" />
          <circle cx="12" cy="18.5" r="2.2" />
          <path d="M7.2 6h9.6M6.3 8l4.6 8.6M17.7 8l-4.6 8.6" />
        </svg>
      );
    case "scales":
      return (
        <svg {...stroke}>
          <path d="M12 3.5v17M7.5 20.5h9M4 7.5h16" />
          <path d="M4 7.5 1.6 13a3 3 0 0 0 4.8 0L4 7.5Z" />
          <path d="M20 7.5 17.6 13a3 3 0 0 0 4.8 0L20 7.5Z" />
        </svg>
      );
    case "rocket":
      return (
        <svg {...stroke}>
          <path d="M12 2.2c3 2.7 4.8 6.6 4.8 10.5 0 1.5-.26 3-.75 4.3H7.95A13 13 0 0 1 7.2 12.7C7.2 8.8 9 4.9 12 2.2Z" />
          <circle cx="12" cy="10" r="2.1" />
          <path d="M7.95 17 5 20.4l3.3-.7M16.05 17 19 20.4l-3.3-.7" />
        </svg>
      );
    case "orbit":
      return (
        <svg {...stroke}>
          <circle cx="12" cy="12" r="3.3" />
          <ellipse cx="12" cy="12" rx="10" ry="4.4" transform="rotate(-24 12 12)" />
        </svg>
      );
    default:
      return (
        <svg {...stroke}>
          <circle cx="12" cy="12" r="9.2" />
          <path d="M3 12h18" />
          <path d="M12 2.8c2.6 2.5 4 5.8 4 9.2s-1.4 6.7-4 9.2c-2.6-2.5-4-5.8-4-9.2s1.4-6.7 4-9.2Z" />
        </svg>
      );
  }
}

export default function ProjectCard(p: ProjectCardProps) {
  const rgb = hexToRgb(p.accent);
  const panelDark = relLuminance(rgb) > 0.5; // light accents (e.g. yellow) need dark panel text

  const style = {
    ["--accent"]: p.accent,
    ["--ar"]: rgb.r,
    ["--ag"]: rgb.g,
    ["--ab"]: rgb.b,
    ["--accent-2"]: mixDown(rgb, 0.72),
  } as CSSProperties;

  return (
    <article
      className={`pcard pat-${p.pattern ?? "dots"}${panelDark ? " panel-dark" : ""}${
        p.tags.length ? "" : " no-tags"
      }`}
      style={style}
    >
      <div className="pcard-top">
        <span className="pcard-pattern" aria-hidden="true" />
        <span className="pcard-glow" aria-hidden="true" />

        <span className={`pcard-status ${p.status.kind}`}>{p.status.label}</span>

        <div className={`pcard-media${p.media.kind === "icon" ? " is-icon" : ""}`}>
          {p.media.kind === "image" ? (
            <img
              className={`pcard-hero is-${p.media.variant ?? "product"}`}
              src={p.media.src}
              alt={p.media.alt}
              loading="lazy"
              draggable={false}
              style={p.media.scale ? ({ ["--hs"]: p.media.scale } as CSSProperties) : undefined}
            />
          ) : (
            <span className="pcard-iconwrap">
              <MediaIcon name={p.media.name} />
            </span>
          )}
        </div>

        <div className="pcard-info">
          <span className="pcard-eyebrow">{p.kicker}</span>
          <h3 className="pcard-title">{p.title}</h3>
          <span className="pcard-divider" />
          <p className="pcard-desc">{p.desc}</p>
          {(p.year || p.stats) && (
            <div className="pcard-metrics">
              {p.year && (
                <span className="pcard-metric">
                  <b>{p.year}</b>
                  <i>Launched</i>
                </span>
              )}
              {p.stats?.map((s) => (
                <span className="pcard-metric" key={s.label}>
                  <b data-count={s.value} data-suffix={s.suffix}>
                    {s.value}
                    {s.suffix ?? ""}
                  </b>
                  <i>{s.label}</i>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="pcard-panel">
        <span className="pcard-cat">{p.category}</span>
        {p.tags.length > 0 && (
          <>
            <span className="pcard-panel-line" />
            <div className="pcard-pills">
              {p.tags.map((t) => (
                <span className="pcard-pill" key={t}>
                  <i className="pill-dot" />
                  {t}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </article>
  );
}
