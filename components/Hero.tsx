export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-bg" aria-hidden="true">
        <video
          className="hero-bg-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/hero-bg-poster.webp"
          aria-hidden="true"
        >
          {/* WebM first so modern browsers pick the smaller file */}
          <source src="/assets/hero-bg.webm" type="video/webm" />
          <source src="/assets/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-scrim" aria-hidden="true" />

      <div className="wrap hero-inner">
        <h1 className="hero-title hero-anim d1">
          <span className="hero-title-thin">Flo</span>Studios
        </h1>
        <p className="hero-tagline hero-anim d2">
          Where AI meets <span className="hero-script">creativity</span>
        </p>
        <div className="hero-actions hero-anim d3">
          <a className="btn btn-primary" href="#contact">
            Let&apos;s talk
          </a>
          <a className="btn btn-ghost" href="#work">
            View our work
          </a>
        </div>
      </div>

      <div className="hero-corner">
        <img
          className="hero-mark hero-anim d2"
          src="/flostudios-logo.png"
          alt=""
          aria-hidden="true"
        />
        <p className="hero-desc hero-anim d4">
          A learning-focused division of FloLabs Innovations Group, creating AI-enhanced content and
          experiences for cutting-edge technology education in artificial intelligence, robotics, and
          emerging tech platforms.
        </p>
      </div>
    </header>
  );
}
