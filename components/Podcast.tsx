const EXPECT = [
  "AI & Robotics Industry Insights",
  "Creative Technology Processes",
  "Startup Stories & Lessons",
  "Future of Digital Design",
];

const PRODUCED = ["Professional Audio", "Video Recording", "Post-Production", "Multi-Platform"];

function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l5 5L20 6" />
    </svg>
  );
}

export default function Podcast() {
  return (
    <section className="band sec-blue" id="about">
      <div className="wrap">
        <div className="sec-head center">
          <h2 className="section-title reveal">
            Our AI-Powered Podcast <span className="blue-text">Coming Soon</span>
          </h2>
          <p className="lead reveal">
            Deep conversations about AI, robotics, creativity, and the future of technology. Season 1
            launches soon with industry experts and innovative minds.
          </p>
        </div>

        <div className="podcast-grid">
          <div className="pod-card reveal">
            <div className="pod-mic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="2" width="6" height="12" rx="3" />
                <path d="M5 10a7 7 0 0 0 14 0M12 17v4M8 21h8" />
              </svg>
            </div>
            <span className="pod-tag">Season 1 · Launching Soon</span>
            <h3>The Flo Frequency</h3>
            <p>AI-powered conversations exploring technology, creativity, and the future of learning.</p>
            <a className="btn btn-primary" href="#contact" style={{ background: "var(--blue)", color: "#fff" }}>
              Get Notified
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.7 21a2 2 0 0 1-3.4 0" />
              </svg>
            </a>
          </div>

          <div className="pod-lists reveal">
            <div className="pod-list">
              <h4>What to Expect</h4>
              <ul>
                {EXPECT.map((item) => (
                  <li key={item}>
                    <span className="tick"><Check /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pod-list">
              <h4>Produced With</h4>
              <div className="produced">
                {PRODUCED.map((c) => (
                  <span className="chip" key={c}>{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
