export default function FinalCTA() {
  return (
    <section className="sec-blue final" id="contact">
      <img className="cta-watermark" src="/flostudios-logo.png" alt="" aria-hidden="true" />
      <div className="wrap">
        <h2 className="reveal">Ready to Work Together?</h2>
        <p className="reveal">
          Let&apos;s discuss your project and explore how we can help bring your digital vision to life.
          Get in touch to start the conversation.
        </p>
        <div className="final-actions reveal">
          <a
            className="btn btn-primary"
            href="https://www.flolabs.international/internships"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply to Programs
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
