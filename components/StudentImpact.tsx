import type { ReactNode } from "react";

type Impact = { icon: ReactNode; title: string; desc: string };

const IMPACTS: Impact[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="4" /><path d="M9 10h.01M15 10h.01M9 15h6" />
      </svg>
    ),
    title: "CAIPO.ai",
    desc: "Wearable AI productivity assistant that helps professionals optimize their workflow and manage tasks through intelligent automation and voice commands.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.8 5.6a5.5 5.5 0 0 0-8.8 1.4A5.5 5.5 0 0 0 3.2 5.6c-2 2-2 5.3 0 7.4L12 21l8.8-8a5.2 5.2 0 0 0 0-7.4z" />
      </svg>
    ),
    title: "MoodChanger.ai",
    desc: "AI-powered mood management platform serving people, athletes, and pets with personalized wellness tracking and emotional intelligence insights.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.8 19.2 16 11l3.5-3.5a2.1 2.1 0 0 0-3-3L13 8 4.8 6.2a.5.5 0 0 0-.5.8L8 11l-2 2H4l-1 1 3 2 2 3 1-1v-2l2-2 3.9 3.7a.5.5 0 0 0 .8-.5z" />
      </svg>
    ),
    title: "Flo Travel",
    desc: "AI-driven travel planning platform that creates personalized itineraries, recommends destinations, and optimizes travel experiences using machine learning.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="8" width="14" height="12" rx="2" /><path d="M9 8V6a3 3 0 0 1 6 0v2M9 14h.01M15 14h.01M12 2v2" />
      </svg>
    ),
    title: "RoboCollective",
    desc: "Revolutionary robot marketplace and dealership franchise platform connecting buyers with the latest robotics technology and automation solutions.",
  },
];

export default function StudentImpact() {
  return (
    <section className="band">
      <div className="wrap">
        <div className="sec-head center">
          <h2 className="section-title reveal">
            Built by <span className="blue-text">Flearners</span>
          </h2>
          <p className="lead reveal">
            Real-world AI and robotics projects developed through our experiential learning programs.
            These platforms are live products serving real users—built by students, for the future.
          </p>
        </div>

        <div className="impact-grid">
          {IMPACTS.map((im) => (
            <div className="impact reveal" key={im.title}>
              <div className="impact-ico">{im.icon}</div>
              <div>
                <h3>{im.title}</h3>
                <p>{im.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="recruit">
          <h3 className="reveal">Want to build the next big thing?</h3>
          <p className="reveal">
            Join our experiential learning program and work on real AI and robotics projects that make
            an impact. Get recruited today while building your portfolio.
          </p>
          <a className="btn btn-primary reveal" href="#contact" style={{ background: "#fff", color: "var(--blue-700)" }}>
            Apply to theNext.wtf today
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
