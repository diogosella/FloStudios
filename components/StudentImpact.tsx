import type { CSSProperties } from "react";

type Impact = { title: string; desc: string; accent: string };

/* Every card carries the same FloLabs mark (see CSS: .fl-ico masks
   /FloLabs_logo.svg and tints via background-color on hover). Accents come
   from the same FloLabs project palette used elsewhere on the site. */
const IMPACTS: Impact[] = [
  {
    title: "CAIPO.ai",
    desc: "Wearable AI productivity assistant that helps professionals optimize their workflow and manage tasks through intelligent automation and voice commands.",
    accent: "#9D52EB",
  },
  {
    title: "MoodChanger.ai",
    desc: "AI-powered mood management platform serving people, athletes, and pets with personalized wellness tracking and emotional intelligence insights.",
    accent: "#FDE035",
  },
  {
    title: "Flo Travel",
    desc: "AI-driven travel planning platform that creates personalized itineraries, recommends destinations, and optimizes travel experiences using machine learning.",
    accent: "#0AA573",
  },
  {
    title: "RoboCollective",
    desc: "Revolutionary robot marketplace and dealership franchise platform connecting buyers with the latest robotics technology and automation solutions.",
    accent: "#00DBFF",
  },
];

export default function StudentImpact() {
  return (
    <section className="band flearners">
      <div className="wrap fl-wrap">
        {/* Editorial header: asymmetric — title left, lead right, giant watermark behind */}
        <header className="fl-head">
          <h2 className="section-title fl-title reveal">
            From our program, <span className="blue-text">into the world.</span>
          </h2>

          <p className="lead fl-lead reveal">
            Real-world AI and robotics projects developed through our experiential learning programs.
            These platforms are live products serving real users—built by students, for the future.
          </p>
        </header>

        {/* Project entries — editorial index */}
        <ol className="fl-list">
          {IMPACTS.map((im, i) => (
            <li
              className="fl-item reveal"
              key={im.title}
              style={{ ["--i" as string]: i, ["--accent" as string]: im.accent } as CSSProperties}
            >
              <span className="fl-spine" aria-hidden="true" />
              <div className="fl-body">
                <div className="fl-name-row">
                  <span className="fl-ico" aria-hidden="true" />
                  <h3 className="fl-name">{im.title}</h3>
                </div>
                <p className="fl-desc">{im.desc}</p>
              </div>
              <span className="fl-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7" />
                  <path d="M9 7h8v8" />
                </svg>
              </span>
            </li>
          ))}
        </ol>

        {/* Recruit manifesto — asymmetric split with a color-striped top rail */}
        <aside className="fl-recruit reveal">
          <div className="fl-recruit-rail" aria-hidden="true">
            {IMPACTS.map((im) => (
              <span key={im.title} style={{ background: im.accent } as CSSProperties} />
            ))}
          </div>
          <div className="fl-recruit-inner">
            <div className="fl-recruit-copy">
              <span className="fl-recruit-eyebrow reveal">Join us</span>
              <h3 className="reveal">Want to build the next big thing?</h3>
              <p className="reveal">
                Join our experiential learning program and work on real AI and robotics projects that make
                an impact. Get recruited today while building your portfolio.
              </p>
            </div>
            <a
              className="btn btn-primary reveal fl-recruit-cta"
              href="https://www.flolabs.international/internships"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply to GetRecruitedToday
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
