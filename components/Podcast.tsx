import FaultyTerminal from "@/components/FaultyTerminal";

const INSIDE = [
  "Leadership discussions",
  "Product & AI development",
  "Creative problem solving",
  "Company growth in real time",
];

export default function Podcast() {
  return (
    <section className="ctd-band" id="about">
      <div className="ctd-bg" aria-hidden="true">
        <FaultyTerminal
          scale={1.3}
          gridMul={[2, 1]}
          digitSize={1.6}
          timeScale={1}
          pause={false}
          scanlineIntensity={1.2}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={1}
          chromaticAberration={0}
          dither={0}
          curvature={0.04}
          tint="#ff6610"
          mouseReact={false}
          mouseStrength={0.5}
          pageLoadAnimation={false}
          brightness={1}
        />
        <div className="ctd-scrim" />
      </div>

      <div className="ctd-wrap">
        <div className="ctd-grid">
          <div className="ctd-mark reveal">
            <img
              className="ctd-logo"
              src="/ConnectingTheDots_logo.svg"
              alt="Connecting the Dots"
            />
            <span className="ctd-mark-caption">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="9" y="2" width="6" height="12" rx="3" />
                <path d="M5 10a7 7 0 0 0 14 0" />
                <path d="M12 17v4" />
                <path d="M8 21h8" />
              </svg>
              A FloLabs original series
            </span>
          </div>

          <div className="ctd-copy reveal">
            <span className="ctd-kicker">From the studio</span>

            <h2 className="ctd-title">
              See how an AI company <em>thinks</em>.
            </h2>

            <p className="ctd-lead">
              An ongoing video series documenting the people, decisions, experiments,
              and ideas behind FloLabs. Watch the meetings, follow the products, and
              experience our growth from the inside.
            </p>

            <ul className="ctd-list">
              {INSIDE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <a
              className="btn btn-primary ctd-cta"
              href="https://www.youtube.com/@FloLabsInnovation"
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow our growth
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
