import type { ReactNode } from "react";
import NewsletterForm from "@/components/NewsletterForm";

type Link = { name: string; href: string; external?: boolean };

const NAVIGATION: Link[] = [
  { name: "Home", href: "#top" },
  { name: "Our Work", href: "#work" },
  { name: "Services", href: "#services" },
  { name: "About Us", href: "#about" },
  { name: "Internships", href: "https://www.flolabs.international/internships", external: true },
];

/* Every FloLabs project site — see the network link list. */
const PROJECTS: Link[] = [
  { name: "Athletic Performance Intelligence", href: "https://www.athleticperformanceintelligence.com/" },
  { name: "Bootcamp University", href: "https://www.bootcampuniversity.org/" },
  { name: "CAIPO", href: "https://www.caipo.ai/" },
  { name: "Connecting the Dots", href: "https://www.youtube.com/@flolabsinnovation" },
  { name: "Cosmos Intelligence", href: "http://cosmosintelligence.org/" },
  { name: "Flo Travel", href: "https://www.flomadtravel.com/" },
  { name: "FloBrain", href: "https://www.flobrain.ai/" },
  { name: "FloLabs Innovations Group", href: "https://www.flolabsinnovations.com/" },
  { name: "FloLabs International", href: "https://www.flolabs.international/" },
  { name: "FloStudios", href: "https://www.flostudios.ai/" },
  { name: "Hephaestus International", href: "https://hephaestus.international/" },
  { name: "Legal & Ethics Ventures Institute", href: "https://www.legalethicsventuresinstitute.com/" },
  { name: "MoodChanger", href: "https://www.moodchanger.ai/" },
  { name: "RoboCollective", href: "https://www.robocollective.ai/" },
  { name: "Space Ventures Institute", href: "https://www.spaceventuresinstitute.com/" },
  { name: "TARRL", href: "https://tarrl.org/" },
].map((p) => ({ ...p, external: true }));

const COMPANY: Link[] = [
  { name: "Careers", href: "https://www.flolabs.international/internships", external: true },
  { name: "Contact Us", href: "#contact" },
  { name: "Merch", href: "https://flolabsrd.notion.site/merch-background", external: true },
];

type Social = { name: string; href: string; icon: ReactNode };

const SOCIALS: Social[] = [
  {
    name: "YouTube",
    href: "https://www.youtube.com/@flolabsinnovation",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-2C18.88 4 12 4 12 4s-6.88 0-8.59.42a2.78 2.78 0 0 0-1.95 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 2C5.12 20 12 20 12 20s6.88 0 8.59-.42a2.78 2.78 0 0 0 1.95-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58ZM9.75 15.02V8.98L15.5 12l-5.75 3.02Z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/flolabs-innovation/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05a4.17 4.17 0 0 1 3.75-2c4 0 4.75 2.5 4.75 5.9V21h-4v-5.6c0-1.34-.03-3.06-1.9-3.06-1.9 0-2.2 1.45-2.2 2.96V21h-4V9Z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/people/Flo-Labs-RD/61572285432918/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/flolabsinnovations/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="3.9" />
        <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@flomadlabs",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16.6 3h-2.5v11.9a2.4 2.4 0 1 1-2.4-2.4c.24 0 .47.04.69.1V10a5 5 0 1 0 4.21 4.94V8.9a6.2 6.2 0 0 0 3.6 1.15V7.53A3.62 3.62 0 0 1 16.6 3Z" />
      </svg>
    ),
  },
  {
    name: "Reddit",
    href: "https://www.reddit.com/user/FloLabs_Innovations/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm5.8 9.9a1.9 1.9 0 0 1-.86 1.58 3.2 3.2 0 0 1 .04.5c0 2.4-2.68 4.35-6 4.35s-6-1.95-6-4.35a3.2 3.2 0 0 1 .05-.52 1.9 1.9 0 1 1 2.1-3.1 7.6 7.6 0 0 1 3.98-1.24l.83-3.53a.42.42 0 0 1 .5-.32l2.53.54a1.35 1.35 0 1 1-.15.86l-2.14-.46-.72 3.08a7.6 7.6 0 0 1 3.9 1.24 1.9 1.9 0 0 1 3.12 1.4ZM9.1 13.2a1.2 1.2 0 1 0 1.2-1.2 1.2 1.2 0 0 0-1.2 1.2Zm5.94 2.7a.4.4 0 0 0-.56-.57 4.15 4.15 0 0 1-2.5.72 4.15 4.15 0 0 1-2.48-.72.4.4 0 1 0-.56.57 4.9 4.9 0 0 0 3.04.93 4.9 4.9 0 0 0 3.06-.93ZM13.7 14.4a1.2 1.2 0 1 0-1.2-1.2 1.2 1.2 0 0 0 1.2 1.2Z" />
      </svg>
    ),
  },
];

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function FooterLinks({ title, links }: { title: string; links: Link[] }) {
  return (
    <div className="footer-col">
      <h4 className="footer-h">{title}</h4>
      <ul>
        {links.map((l) => (
          <li key={l.name}>
            <a href={l.href} {...(l.external ? ext : {})}>
              {l.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brandcol">
            <a className="footer-brand" href="#top">
              <img src="/flostudios-logo.png" alt="" aria-hidden="true" />
              FloStudios.ai
            </a>
            <p className="footer-kicker">a FloLabs Innovations Group project</p>
            <p className="footer-about">
              An AI-focused creative learning division of FloLabs Innovations Group, empowering the
              next generation of content creators, storytellers, and digital innovators with
              cutting-edge AI technology and innovative learning experiences.
            </p>

            <h4 className="footer-h">Newsletter</h4>
            <p className="footer-note">Receive the newest FloLabs updates at:</p>
            <NewsletterForm />

            <h4 className="footer-h">Social Media</h4>
            <div className="footer-socials">
              {SOCIALS.map((s) => (
                <a key={s.name} className="footer-social" href={s.href} aria-label={s.name} {...ext}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <FooterLinks title="Navigation" links={NAVIGATION} />
          <FooterLinks title="Projects" links={PROJECTS} />
          <FooterLinks title="Company" links={COMPANY} />
        </div>

        <div className="footer-tagline">Live Long and Prosper</div>
      </div>
    </footer>
  );
}
