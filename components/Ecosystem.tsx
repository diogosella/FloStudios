import type { ReactNode } from "react";
import RotatingText from "@/components/RotatingText";

type Eco = { icon: ReactNode; title: string; label: string };

const ECOSYSTEM: Eco[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
      </svg>
    ),
    title: "FloLabs Innovations Group",
    label: "AI & Robotics R&D",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10 12 5 2 10l10 5 10-5z" /><path d="M6 12v5c0 1 2.7 3 6 3s6-2 6-3v-5" />
      </svg>
    ),
    title: "FloLabs International",
    label: "Education Programs",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.8 19.2 16 11l3.5-3.5a2.1 2.1 0 0 0-3-3L13 8 4.8 6.2a.5.5 0 0 0-.5.8L8 11l-2 2H4l-1 1 3 2 2 3 1-1v-2l2-2 3.9 3.7a.5.5 0 0 0 .8-.5z" />
      </svg>
    ),
    title: "Flo Travel",
    label: "AI-Powered Travel",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="4" /><path d="M9 10h.01M15 10h.01M9 15h6" />
      </svg>
    ),
    title: "CAIPO",
    label: "AI Productivity Officer",
  },
];

const NETWORK_NAMES = ECOSYSTEM.map((e) => e.title);

export default function Ecosystem() {
  return (
    <section className="band alt">
      <div className="wrap">
        <div className="sec-head center reveal">
          <h2 className="section-title eco-rotate-title">
            <RotatingText
              texts={NETWORK_NAMES}
              mainClassName="eco-rotate"
              splitLevelClassName="eco-rotate-split"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.012}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              /* these names are long — the stagger'd exit+enter eats ~1s, so give
                 each name room to actually rest and be read */
              rotationInterval={3000}
            />
          </h2>
          <p className="lead">
            FloStudios.ai works alongside other innovative platforms in the FloLabs Innovations Group
            network
          </p>
        </div>
        <div className="eco-grid">
          {ECOSYSTEM.map((e) => (
            <div className="eco reveal" key={e.title}>
              <div className="eco-badge">{e.icon}</div>
              <h3>{e.title}</h3>
              <span>{e.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
