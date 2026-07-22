import ThemeToggle from "@/components/ThemeToggle";

export default function Nav() {
  return (
    <nav className="nav" id="nav">
      <div className="wrap nav-inner">
        <a className="brand" href="#top">
          <img className="logo-img" src="/flostudios-logo.png" alt="FloStudios.ai logo" />
          FloStudios.ai
        </a>
        <div className="nav-links">
          <a href="#top">Home</a>
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="nav-right">
          <ThemeToggle />
          <a className="btn btn-dark" href="#contact">
            Let&apos;s Talk
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </a>
          <button className="nav-toggle" id="navToggle" aria-label="Menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
