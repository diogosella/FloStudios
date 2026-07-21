"use client";

import { useState } from "react";

/**
 * Presentational newsletter capture. There is no subscribe endpoint yet, so the
 * submit is intercepted and the address is only acknowledged in the UI.
 * TODO: POST to the real mailing-list endpoint once it exists.
 */
export default function NewsletterForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="footer-news"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <input
        type="email"
        name="email"
        required
        className="footer-news-input"
        placeholder="Enter your email..."
        aria-label="Email address"
        onChange={() => sent && setSent(false)}
      />
      <button type="submit" className="footer-news-btn" aria-label="Subscribe">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 3 10.5 13.5" />
          <path d="M21 3l-6.8 18-3.7-8.5L2 8.8 21 3Z" />
        </svg>
      </button>
      {sent && (
        <p className="footer-news-ok" role="status">
          Thanks — we&apos;ll be in touch.
        </p>
      )}
    </form>
  );
}
