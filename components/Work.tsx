import WorkCarousel3D from "@/components/WorkCarousel3D";
import ProjectCard, { type ProjectCardProps } from "@/components/ProjectCard";

const PROJECTS: ProjectCardProps[] = [
  {
    accent: "#FDE035",
    pattern: "rays",
    media: { kind: "image", src: "/assets/carousel/moodchanger.png", alt: "MoodChanger app", variant: "product" },
    status: { label: "Live", kind: "live" },
    kicker: "AI Wellbeing Platform",
    title: "MoodChanger",
    desc: "An AI-powered platform designed to enhance emotional well-being with personalized insights and practical guidance.",
    href: "https://www.moodchanger.ai/",
  },
  {
    accent: "#9D52EB",
    pattern: "dots",
    media: { kind: "image", src: "/assets/caipo-card.webp", alt: "CAIPO wearable device", variant: "product", scale: 1.6 },
    status: { label: "Live", kind: "live" },
    kicker: "Wearable AI",
    title: "CAIPO",
    desc: "A wearable AI system focused on capturing moments, organizing notes, and improving productivity workflows.",
    href: "https://www.caipo.ai/",
  },
  {
    accent: "#0AA573",
    pattern: "rays",
    media: { kind: "image", src: "/assets/carousel/flotravel.png", alt: "Flo Travel", variant: "product" },
    status: { label: "Live", kind: "live" },
    kicker: "AI Travel Platform",
    title: "Flo Travel",
    desc: "AI-powered travel planning for flights, hotels, reservations, and activities in one connected experience.",
    href: "https://www.flomadtravel.com/",
  },
  {
    accent: "#13A7CB",
    pattern: "dots",
    media: { kind: "image", src: "/assets/carousel/bootcamp.png", alt: "Graduation cap", variant: "product" },
    status: { label: "Live", kind: "live" },
    kicker: "Education Initiative",
    title: "Bootcamp University",
    desc: "A cooperative education initiative that helps learners move from foundational training to paid, real-world tech project experience.",
    href: "https://www.bootcampuniversity.org/",
  },
  {
    accent: "#002868",
    pattern: "rings",
    media: { kind: "image", src: "/assets/carousel/tarrl.png", alt: "TARRL robot", variant: "product" },
    status: { label: "Live", kind: "live" },
    kicker: "Robotics Research Lab",
    title: "TARRL",
    desc: "The official portal for FloLabs' Texas Advanced Robotics Research Lab (TARRL).",
    href: "https://tarrl.org/",
  },
  {
    accent: "#387CEA",
    pattern: "dots",
    media: { kind: "image", src: "/flolabs-logo.png", alt: "FloLabs mark", variant: "logo" },
    status: { label: "Live", kind: "live" },
    kicker: "Corporate Platform",
    title: "FloLabs Innovations Group",
    desc: "A global platform showcasing FloLabs initiatives, partnerships, and AI/technology innovation.",
    href: "https://www.flolabsinnovations.com/",
  },
  {
    accent: "#8B5A2B",
    pattern: "rings",
    media: { kind: "image", src: "/assets/pets-card.png", alt: "A cat and dog resting together", variant: "photo" },
    status: { label: "Live", kind: "live" },
    kicker: "Pet Wellness Platform",
    title: "MoodChanger for Pets",
    desc: "An AI-driven pet wellness platform combining wearables, environment data, and behavior insights.",
    href: "https://www.moodchanger.ai/",
  },
  {
    accent: "#00DBFF",
    pattern: "rays",
    media: { kind: "image", src: "/assets/robocollective-card.png", alt: "Humanoid robot", variant: "product" },
    status: { label: "Live", kind: "live" },
    kicker: "Robotics Initiative",
    title: "Humanoid Robots",
    desc: "A major initiative focused on intelligent systems, human-robot interaction, and robotics commercialization through RoboCollective.",
    href: "https://www.robocollective.ai/",
  },
  {
    accent: "#1269C7",
    pattern: "dots",
    media: { kind: "image", src: "/assets/carousel/hepheastus.png", alt: "Hephaestus mark", variant: "product" },
    status: { label: "Live", kind: "live" },
    kicker: "Experiential Institute",
    title: "Hephaestus International",
    desc: "An experiential learning institute focused on innovation, education, and advanced technology development.",
    href: "https://hephaestus.international/",
  },
  {
    accent: "#00349B",
    pattern: "rings",
    media: { kind: "image", src: "/assets/carousel/international.png", alt: "FloLabs International globe", variant: "product" },
    status: { label: "Live", kind: "live" },
    kicker: "Global Hub",
    title: "FloLabs International",
    desc: "A global hub highlighting FloLabs' mission, projects, and collaboration opportunities.",
    href: "https://www.flolabs.international/",
  },
  {
    accent: "#AD46FF",
    pattern: "dots",
    media: { kind: "image", src: "/assets/carousel/brain.svg", alt: "FloBrain mark", variant: "product" },
    status: { label: "Coming Soon", kind: "soon" },
    kicker: "AI Initiative",
    title: "FloBrain",
    desc: "An AI-native initiative focused on knowledge workflows, intelligent assistants, and practical team productivity systems.",
    href: "https://www.flobrain.ai/",
  },
  {
    accent: "#FF6600",
    pattern: "rays",
    media: { kind: "image", src: "/ConnectingTheDots_logo.svg", alt: "Connecting the Dots logo", variant: "logo" },
    status: { label: "Coming Soon", kind: "soon" },
    kicker: "Cross-Disciplinary Initiative",
    title: "Connecting the Dots",
    desc: "A cross-disciplinary initiative connecting ideas, teams, and execution into clearer and more actionable outcomes.",
    href: "https://www.youtube.com/@flolabsinnovation",
  },
  {
    accent: "#F23D3D",
    pattern: "dots",
    media: { kind: "image", src: "/assets/carousel/legal.webp", alt: "Legal & Ethics Ventures Institute", variant: "product" },
    status: { label: "Live", kind: "live" },
    kicker: "Legal & Ethics Institute",
    title: "Legal & Ethics Ventures Institute",
    desc: "A remote-first, hands-on institute for legal, ethics, and AI venture projects with real-world execution.",
    href: "https://www.legalethicsventuresinstitute.com/",
  },
  {
    accent: "#2962FF",
    pattern: "rays",
    media: { kind: "image", src: "/assets/carousel/spaceventures.png", alt: "Space Ventures rocket", variant: "product" },
    status: { label: "Live", kind: "live" },
    kicker: "Venture Institute",
    title: "Space Ventures Institute",
    desc: "A remote-first experiential venture institute connecting talent to real space economy projects.",
    href: "https://www.spaceventuresinstitute.com/",
  },
  {
    // TODO: no accent supplied for Cosmos Intelligence — placeholder pending confirmation
    accent: "#5A4FCF",
    pattern: "rings",
    media: { kind: "image", src: "/assets/carousel/cosmos.png", alt: "Saturn planet with rings", variant: "product" },
    status: { label: "Live", kind: "live" },
    kicker: "Research Initiative",
    title: "Cosmos Intelligence",
    desc: "An open research and product initiative using AI to study cosmic-scale structure, signals, and information patterns across public space data.",
    href: "http://cosmosintelligence.org/",
  },
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
    </section>
  );
}
