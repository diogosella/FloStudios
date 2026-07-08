type Status = { label: string; kind: "live" | "dev" | "soon" };

type Project = {
  name: string;
  status: Status;
  kicker: string;
  title: string;
  desc: string;
  tags: string[];
  year?: string;
  stats?: { value: number; suffix?: string; label: string }[];
};

const PROJECTS: Project[] = [
  {
    name: "FloLabs Innovations Group",
    status: { label: "Live", kind: "live" },
    kicker: "Corporate Website",
    title: "FloLabs Innovations Group",
    desc: "Main company website showcasing AI & robotics research with modern design and professional portfolio presentation.",
    tags: ["Next.js", "Figma", "Tailwind CSS", "TypeScript", "Responsive Design", "SEO Optimized"],
    year: "2024",
  },
  {
    name: "RoboCollective.ai",
    status: { label: "Live", kind: "live" },
    kicker: "E-commerce Platform",
    title: "RoboCollective.ai",
    desc: "Premium robot marketplace with e-commerce functionality, product showcases, and customer testimonials.",
    tags: ["WordPress", "Canva", "WooCommerce", "Custom CSS", "Product Catalog", "Shopping Cart"],
    stats: [
      { value: 50, suffix: "+", label: "Products" },
      { value: 3, label: "Categories" },
    ],
  },
  {
    name: "FloLabs International",
    status: { label: "Live", kind: "live" },
    kicker: "Educational Website",
    title: "FloLabs International",
    desc: "Educational platform for AI & robotics programs with course information and application system.",
    tags: ["WordPress", "Figma", "Canva", "Custom Plugins", "Course Catalog", "Application System"],
  },
  {
    name: "CAIPO.ai",
    status: { label: "In Development", kind: "dev" },
    kicker: "AI Platform",
    title: "CAIPO.ai",
    desc: "AI assistant platform landing page with modern design and early access signup functionality.",
    tags: ["Next.js", "Figma", "Framer Motion", "Tailwind CSS", "Waitlist System", "Interactive Design"],
  },
  {
    name: "MoodChanger.ai",
    status: { label: "Coming Soon", kind: "soon" },
    kicker: "AI Platform",
    title: "MoodChanger.ai",
    desc: "AI mood management platform with comprehensive brand design and user experience planning.",
    tags: ["Canva", "Figma", "Brand Guidelines", "Presentation Design", "Brand Identity", "Pitch Deck"],
  },
  {
    name: "MoodChanger for Pets",
    status: { label: "Coming Soon", kind: "soon" },
    kicker: "Presentation Design",
    title: "MoodChanger for Pets",
    desc: "Specialized AI health monitoring for pets with custom branding and presentation materials.",
    tags: ["Canva", "Figma", "Illustration", "Brand Design", "Custom Graphics", "Pet-focused UI"],
  },
];

const ARSENAL = ["Figma", "Canva Pro", "Next.js", "WordPress", "Tailwind CSS"];

export default function Work() {
  return (
    <section className="band" id="work">
      <div className="wrap">
        <div className="sec-head center">
          <h2 className="section-title reveal">
            Websites &amp; <span className="blue-text">Digital Experiences</span>
          </h2>
          <p className="lead reveal">
            Real projects we&apos;ve designed and developed for the FloLabs Innovations Group
            ecosystem, from AI platforms to robotics marketplaces.
          </p>
        </div>

      </div>

      <div className="carousel" data-carousel>
        <div className="car-track">
          {PROJECTS.map((p) => (
            <article className="pcard" key={p.name}>
              <div className="pcard-visual">
                <span className="pname">{p.name}</span>
                <span className={`status ${p.status.kind}`}>
                  <span className="sd" />
                  {p.status.label}
                </span>
              </div>
              <div className="pcard-body">
                <span className="pcard-kicker">{p.kicker}</span>
                <h3 className="pcard-title">{p.title}</h3>
                <p className="pcard-desc">{p.desc}</p>
                <span className="tag-label">Design &amp; Development</span>
                <div className="tags">
                  {p.tags.map((t) => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </div>
                {(p.year || p.stats) && (
                  <div className="pcard-foot">
                    {p.year && <span className="year">{p.year}</span>}
                    {p.stats?.map((s) => (
                      <div className="stat" key={s.label}>
                        <b data-count={s.value} data-suffix={s.suffix}>
                          {s.value}
                          {s.suffix ?? ""}
                        </b>
                        <span>{s.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="car-controls">
          <button className="car-arrow prev" aria-label="Previous project" type="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <button className="car-arrow next" aria-label="Next project" type="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="wrap">
        <div className="arsenal">
          <h3 className="reveal">Our Design Arsenal</h3>
          <div className="marquee reveal">
            <div className="marquee-track">
              {[...ARSENAL, ...ARSENAL].map((tool, i) => (
                <span className="chip" key={i}>{tool}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
