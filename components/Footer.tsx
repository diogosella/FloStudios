export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <a className="brand" href="#top">
              <img className="logo-img" src="/flostudios-logo.png" alt="FloStudios.ai logo" />
              FloStudios.ai
            </a>
            <p className="footer-about">
              An AI-focused creative learning division of FloLabs Innovations Group, empowering the
              next generation of content creators, storytellers, and digital innovators with
              cutting-edge AI technology and innovative learning experiences.
            </p>
            <p className="footer-net">Part of the FloLabs Network:</p>
            <div className="footer-net-links">
              <a href="#">FloLabs Innovations Group</a>
              <a href="#">FloLabs International</a>
              <a href="#">LinkedIn</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#services">Services</a></li>
              <li><a href="#work">Our Work</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Join Us</a></li>
              <li><a href="#about">Podcasts</a></li>
              <li><a href="#work">Videos</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Connect</h4>
            <ul>
              <li>
                <a className="with-ico" href="mailto:John@flomadlabs.com">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                  John@flomadlabs.com
                </a>
              </li>
              <li>
                <a className="with-ico" href="#">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.94 5a2 2 0 1 1-4-.02 2 2 0 0 1 4 .02zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" />
                  </svg>
                  Follow us on LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 FloStudios.ai</span>
          <div className="legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
