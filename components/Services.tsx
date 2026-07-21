import type { ReactNode } from "react";

type Service = { icon: ReactNode; title: string; desc: string };

const S = (children: ReactNode) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const SERVICES: Service[] = [
  {
    icon: S(<><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></>),
    title: "Web Design & Development",
    desc: "Creating modern, responsive websites that effectively represent your brand and engage visitors.",
  },
  {
    icon: S(<><circle cx="13.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="10.5" r="2.5" /><circle cx="8.5" cy="7.5" r="2.5" /><circle cx="6.5" cy="12.5" r="2.5" /><path d="M12 22a10 10 0 1 1 10-10c0 3-2 3-3 3h-4a2 2 0 0 0 0 4c1 0 1 1 0 3" /></>),
    title: "Brand Identity Design",
    desc: "Developing visual identity systems that help your business stand out and connect with customers.",
  },
  {
    icon: S(<><path d="M15 8h5l-3 4 3 4h-5" /><rect x="2" y="6" width="13" height="12" rx="2" /><path d="M8 10v4M6 12h4" /></>),
    title: "Digital Content Creation",
    desc: "Producing engaging video, audio, and visual content to tell your brand's story across platforms.",
  },
  {
    icon: S(<><path d="M3 3v18h18" /><path d="M7 15l4-4 3 3 5-6" /></>),
    title: "Digital Strategy",
    desc: "Planning and implementing digital solutions that align with your business goals and growth objectives.",
  },
  {
    icon: S(<><path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" /><path d="M9 10h.01M13 10h.01M17 10h.01" /></>),
    title: "Creative Consultation",
    desc: "Providing expert guidance on digital projects, from concept development to final implementation.",
  },
  {
    icon: S(<path d="M12 2a3 3 0 0 0-3 3v1H7a2 2 0 0 0-2 2 3 3 0 0 0 0 6 2 2 0 0 0 2 2h2v1a3 3 0 0 0 6 0v-1h2a2 2 0 0 0 2-2 3 3 0 0 0 0-6 2 2 0 0 0-2-2h-2V5a3 3 0 0 0-3-3z" />),
    title: "Ongoing Support",
    desc: "Maintaining and evolving your digital presence with updates, improvements, and new features.",
  },
];

export default function Services() {
  return (
    <section className="band alt has-bg-video" id="services">
      <video className="section-bg-video" autoPlay muted loop playsInline preload="metadata" poster="/assets/services-bg-poster.webp" aria-hidden="true">
        <source src="/assets/services-bg.webm" type="video/webm" />
        <source src="/assets/services-bg.mp4" type="video/mp4" />
      </video>
      <div className="wrap">
        <div className="sec-head center">
          <h2 className="section-title reveal">
            Digital <span className="blue-text">Creative Services</span>
          </h2>
          <p className="lead reveal">
            Professional design and development services powered by industry-standard tools and
            creative expertise.
          </p>
        </div>

        <div className="svc-grid">
          {SERVICES.map((s) => (
            <div className="svc reveal" key={s.title}>
              <div className="svc-ico">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
