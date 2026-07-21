import Lightfall from "@/components/Lightfall";

// module-level so the array reference stays stable — Lightfall re-creates its
// WebGL context whenever the `colors` prop identity changes
const LIGHTFALL_COLORS = ["#bdd6ff", "#00daff", "#03daff"];

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-bg" aria-hidden="true">
        <Lightfall
          colors={LIGHTFALL_COLORS}
          backgroundColor="#06B6D4"
          speed={1}
          streakCount={1}
          streakWidth={1}
          streakLength={1.6}
          glow={1.5}
          density={1.4}
          twinkle={1}
          zoom={3.6}
          backgroundGlow={0}
          opacity={1}
          mouseInteraction={false}
          mouseStrength={1.2}
          mouseRadius={0.25}
        />
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
