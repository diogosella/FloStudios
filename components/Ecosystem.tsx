import type { ReactNode } from "react";
import RotatingText from "@/components/RotatingText";

type Eco = { icon: ReactNode; title: string; label: string; href: string };

const ECOSYSTEM: Eco[] = [
  {
    icon: (
      <img
        className="eco-item-logo"
        src="/FloLabs_logo.svg"
        alt=""
        aria-hidden="true"
      />
    ),
    title: "FloLabs Innovations Group",
    label: "AI & Robotics R&D",
    href: "https://www.flolabsinnovations.com/",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10 12 5 2 10l10 5 10-5z" /><path d="M6 12v5c0 1 2.7 3 6 3s6-2 6-3v-5" />
      </svg>
    ),
    title: "FloLabs International",
    label: "Education Programs",
    href: "https://www.flolabs.international/",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.8 19.2 16 11l3.5-3.5a2.1 2.1 0 0 0-3-3L13 8 4.8 6.2a.5.5 0 0 0-.5.8L8 11l-2 2H4l-1 1 3 2 2 3 1-1v-2l2-2 3.9 3.7a.5.5 0 0 0 .8-.5z" />
      </svg>
    ),
    title: "Flo Travel",
    label: "AI-Powered Travel",
    href: "https://www.flomadtravel.com/",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
        <path d="M19 3.5l.7 2 2 .7-2 .7L19 9l-.7-2-2-.7 2-.7z" />
        <path d="M5 15l.6 1.6 1.6.6-1.6.6L5 19.4l-.6-1.6L2.8 17.2l1.6-.6z" />
      </svg>
    ),
    title: "CAIPO",
    label: "AI Productivity Officer",
    href: "https://www.caipo.ai/",
  },
];

const NETWORK_NAMES = ECOSYSTEM.map((e) => e.title);

export default function Ecosystem() {
  return (
    <section className="band alt eco-band">
      <div className="wrap eco-wrap">
        <div className="eco-head reveal">
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
          <p className="lead eco-lead">
            FloStudios.ai works alongside other innovative platforms in the FloLabs Innovations Group
            network
          </p>
        </div>

        <ul className="eco-list reveal">
          {ECOSYSTEM.map((e) => (
            <li key={e.title}>
              <a
                className="eco-item"
                href={e.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${e.title} — ${e.label}`}
              >
                <span className="eco-item-mark" aria-hidden="true">
                  {e.icon}
                </span>
                <div className="eco-item-body">
                  <h3>{e.title}</h3>
                  <span>{e.label}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
