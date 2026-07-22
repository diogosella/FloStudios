import WorkCarousel3D from "@/components/WorkCarousel3D";
import ProjectCard, { type ProjectCardProps } from "@/components/ProjectCard";

const CATEGORY = "Design & Development";

/* Carried-over projects keep their existing stacks; the newly added ones have
   empty `tags` until their stack lists arrive. */
const PROJECTS: ProjectCardProps[] = [
  {
    accent: "#FDE035",
    pattern: "rays",
    media: { kind: "icon", name: "sparkle" },
    status: { label: "Live", kind: "live" },
    kicker: "AI Wellbeing Platform",
    title: "MoodChanger",
    desc: "An AI-powered platform designed to enhance emotional well-being with personalized insights and practical guidance.",
    category: CATEGORY,
    tags: ["Canva", "Figma", "Brand Guidelines", "Presentation Design", "Brand Identity", "Pitch Deck"],
  },
  {
    accent: "#9D52EB",
    pattern: "dots",
    media: { kind: "image", src: "/assets/caipo-card.webp", alt: "CAIPO wearable device", variant: "product", scale: 1.6 },
    status: { label: "Live", kind: "live" },
    kicker: "Wearable AI",
    title: "CAIPO",
    desc: "A wearable AI system focused on capturing moments, organizing notes, and improving productivity workflows.",
    category: CATEGORY,
    tags: ["Next.js", "Figma", "Framer Motion", "Tailwind CSS", "Waitlist System", "Interactive Design"],
  },
  {
    accent: "#0AA573",
    pattern: "rays",
    media: { kind: "icon", name: "plane" },
    status: { label: "Live", kind: "live" },
    kicker: "AI Travel Platform",
    title: "Flo Travel",
    desc: "AI-powered travel planning for flights, hotels, reservations, and activities in one connected experience.",
    category: CATEGORY,
    tags: [],
  },
  {
    accent: "#13A7CB",
    pattern: "dots",
    media: { kind: "icon", name: "cap" },
    status: { label: "Live", kind: "live" },
    kicker: "Education Initiative",
    title: "Bootcamp University",
    desc: "A cooperative education initiative that helps learners move from foundational training to paid, real-world tech project experience.",
    category: CATEGORY,
    tags: [],
  },
  {
    accent: "#002868",
    pattern: "rings",
    media: { kind: "icon", name: "robot" },
    status: { label: "Live", kind: "live" },
    kicker: "Robotics Research Lab",
    title: "TARRL",
    desc: "The official portal for FloLabs' Texas Advanced Robotics Research Lab (TARRL).",
    category: CATEGORY,
    tags: [],
  },
  {
    accent: "#387CEA",
    pattern: "dots",
    media: { kind: "image", src: "/flolabs-logo.png", alt: "FloLabs mark", variant: "logo" },
    status: { label: "Live", kind: "live" },
    kicker: "Corporate Platform",
    title: "FloLabs Innovations Group",
    desc: "A global platform showcasing FloLabs initiatives, partnerships, and AI/technology innovation.",
    category: CATEGORY,
    tags: ["Next.js", "Figma", "Tailwind CSS", "TypeScript", "Responsive Design", "SEO Optimized"],
  },
  {
    accent: "#8B5A2B",
    pattern: "rings",
    media: { kind: "image", src: "/assets/pets-card.png", alt: "A cat and dog resting together", variant: "photo" },
    status: { label: "Live", kind: "live" },
    kicker: "Pet Wellness Platform",
    title: "MoodChanger for Pets",
    desc: "An AI-driven pet wellness platform combining wearables, environment data, and behavior insights.",
    category: CATEGORY,
    tags: ["Canva", "Figma", "Illustration", "Brand Design", "Custom Graphics", "Pet-focused UI"],
  },
  {
    accent: "#00DBFF",
    pattern: "rays",
    media: { kind: "image", src: "/assets/robocollective-card.png", alt: "Humanoid robot", variant: "product" },
    status: { label: "Live", kind: "live" },
    kicker: "Robotics Initiative",
    title: "Humanoid Robots",
    desc: "A major initiative focused on intelligent systems, human-robot interaction, and robotics commercialization through RoboCollective.",
    category: CATEGORY,
    tags: ["WordPress", "Canva", "WooCommerce", "Custom CSS", "Product Catalog", "Shopping Cart"],
  },
  {
    accent: "#1269C7",
    pattern: "dots",
    media: { kind: "icon", name: "bulb" },
    status: { label: "Live", kind: "live" },
    kicker: "Experiential Institute",
    title: "Hephaestus International",
    desc: "An experiential learning institute focused on innovation, education, and advanced technology development.",
    category: CATEGORY,
    tags: [],
  },
  {
    accent: "#00349B",
    pattern: "rings",
    media: { kind: "icon", name: "globe" },
    status: { label: "Live", kind: "live" },
    kicker: "Global Hub",
    title: "FloLabs International",
    desc: "A global hub highlighting FloLabs' mission, projects, and collaboration opportunities.",
    category: CATEGORY,
    tags: ["WordPress", "Figma", "Canva", "Custom Plugins", "Course Catalog", "Application System"],
  },
  {
    accent: "#AD46FF",
    pattern: "dots",
    media: { kind: "icon", name: "chip" },
    status: { label: "Coming Soon", kind: "soon" },
    kicker: "AI Initiative",
    title: "FloBrain",
    desc: "An AI-native initiative focused on knowledge workflows, intelligent assistants, and practical team productivity systems.",
    category: CATEGORY,
    tags: [],
  },
  {
    accent: "#FF6600",
    pattern: "rays",
    media: { kind: "image", src: "/ConnectingTheDots_logo.svg", alt: "Connecting the Dots logo", variant: "logo" },
    status: { label: "Coming Soon", kind: "soon" },
    kicker: "Cross-Disciplinary Initiative",
    title: "Connecting the Dots",
    desc: "A cross-disciplinary initiative connecting ideas, teams, and execution into clearer and more actionable outcomes.",
    category: CATEGORY,
    tags: [],
  },
  {
    accent: "#F23D3D",
    pattern: "dots",
    media: { kind: "icon", name: "scales" },
    status: { label: "Live", kind: "live" },
    kicker: "Legal & Ethics Institute",
    title: "Legal & Ethics Ventures Institute",
    desc: "A remote-first, hands-on institute for legal, ethics, and AI venture projects with real-world execution.",
    category: CATEGORY,
    tags: [],
  },
  {
    accent: "#2962FF",
    pattern: "rays",
    media: { kind: "icon", name: "rocket" },
    status: { label: "Live", kind: "live" },
    kicker: "Venture Institute",
    title: "Space Ventures Institute",
    desc: "A remote-first experiential venture institute connecting talent to real space economy projects.",
    category: CATEGORY,
    tags: [],
  },
  {
    // TODO: no accent supplied for Cosmos Intelligence — placeholder pending confirmation
    accent: "#5A4FCF",
    pattern: "rings",
    media: { kind: "icon", name: "orbit" },
    status: { label: "Live", kind: "live" },
    kicker: "Research Initiative",
    title: "Cosmos Intelligence",
    desc: "An open research and product initiative using AI to study cosmic-scale structure, signals, and information patterns across public space data.",
    category: CATEGORY,
    tags: [],
  },
];

const ARSENAL = [
  { name: "Figma", src: "/assets/figma-logo.png" },
  { name: "Canva Pro", src: "/assets/canva-logo.png" },
  { name: "Next.js", src: "/assets/next-logo.png" },
  { name: "WordPress", src: "/assets/wordpress.png" },
  { name: "Tailwind CSS", src: "/assets/tailwind-logo.png" },
];

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

      <WorkCarousel3D>
        {PROJECTS.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </WorkCarousel3D>

      <div className="wrap">
        <div className="arsenal">
          <h3 className="reveal">Our Design Arsenal</h3>
          <div className="arsenal-logos reveal">
            {ARSENAL.map((tool) => (
              <div className="arsenal-item" key={tool.name}>
                <div className="arsenal-tile">
                  <img src={tool.src} alt={`${tool.name} logo`} loading="lazy" draggable={false} />
                </div>
                <span className="arsenal-name">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
