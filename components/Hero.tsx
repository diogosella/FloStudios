const TILE_SEQ = [
  "play", "", "cam", "", "film", "play",
  "", "cam", "film", "", "play", "",
  "cam", "", "film", "play", "", "",
];

function Glyph({ kind }: { kind: string }) {
  if (kind === "play")
    return (
      <svg className="gly" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
      </svg>
    );
  if (kind === "cam")
    return (
      <svg className="gly" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path d="M15 8l5-3v14l-5-3V8z" />
        <rect x="3" y="6" width="12" height="12" rx="2" />
      </svg>
    );
  if (kind === "film")
    return (
      <svg className="gly" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4" />
      </svg>
    );
  return null;
}

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-media" aria-hidden="true">
        <div className="hero-scene">
          <div className="tile-wall">
            {TILE_SEQ.map((kind, i) => (
              <div className="tile" key={i}>
                <Glyph kind={kind} />
              </div>
            ))}
          </div>
          <span className="sweep" />
          <div className="wave">
            {Array.from({ length: 48 }).map((_, i) => (
              <i key={i} style={{ animationDelay: `${(-(i % 12) * 0.09).toFixed(2)}s` }} />
            ))}
          </div>
        </div>
        <video className="hero-video" id="heroVideo" autoPlay muted loop playsInline preload="auto">
          <source src="/assets/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
      </div>

      <div className="wrap hero-inner">
        <img className="hero-logo hero-anim d1" src="/flostudios-logo.png" alt="FloStudios.ai" />
        <h1 className="hero-title hero-anim d2">FloStudios.ai</h1>
        <p className="hero-sub hero-anim d3">
          Where AI meets creativity. A learning-focused division of FloLabs Innovations Group,
          creating AI-enhanced content and experiences for cutting-edge technology education in
          artificial intelligence, robotics, and emerging tech platforms.
        </p>
        <div className="hero-actions hero-anim d4">
          <a className="btn btn-primary" href="#contact">
            Let&apos;s Talk
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </a>
          <a className="btn btn-ghost" href="#work">
            View Our Work
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7" />
              <path d="M8 7h9v9" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
