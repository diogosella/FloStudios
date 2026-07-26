"use client";

import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import BgVideo from "@/components/BgVideo";
import SvcCardMedia from "@/components/SvcCardMedia";

/**
 * Each service card carries a still image (always visible) and an
 * optional short video (Pexels, free-for-commercial) that only plays
 * when the card is the front of the ScrollStack. Videos are lazily
 * loaded (`preload="none"`) so zero video bytes ship on page load.
 *
 * Per-card tuning knobs (both accept "%" or keyword values):
 *   objectPosition: "50% 50%" (default center) | "50% 30%" (favor top)
 *                   "left center" | "right bottom" etc.
 *   scale: 1 (default) | 1.15 (zoom in) | 0.9 (zoom out)
 */
type Service = {
  title: string;
  desc: string;
  features: string[];
  image: string;
  video?: string;
  alt: string;
  objectPosition?: string;
  scale?: number;
};

/* Posters below are literal frame-0 stills of each Pexels video,
   extracted with ffmpeg and saved under /public/services/. When the
   card isn't the active one, the poster is what the user sees;
   when it becomes active the video plays over the same frame, so
   the swap is visually seamless. */
const SERVICES: Service[] = [
  {
    title: "Web Design & Development",
    desc: "Creating modern, responsive websites that effectively represent your brand and engage visitors.",
    features: [
      "User Interface Design",
      "Brand Integration",
      "User Experience Strategy",
      "Interactive Prototyping",
      "Visual Communication",
    ],
    image: "/services/web.jpg",
    video: "https://videos.pexels.com/video-files/11274341/11274341-sd_960_540_25fps.mp4",
    alt: "Developer typing code on a dark screen",
    objectPosition: "50% 50%",
  },
  {
    title: "Brand Identity Design",
    desc: "Developing visual identity systems that help your business stand out and connect with customers.",
    features: [
      "Logo Systems",
      "Color & Typography",
      "Brand Guidelines",
      "Visual Assets",
      "Voice & Tone",
    ],
    image: "/services/brand.jpg",
    video: "https://videos.pexels.com/video-files/1350205/1350205-sd_960_540_30fps.mp4",
    alt: "Designer working at a laptop",
    objectPosition: "50% 50%",
  },
  {
    title: "Digital Content Creation",
    desc: "Producing engaging video, audio, and visual content to tell your brand's story across platforms.",
    features: [
      "Video Production",
      "Motion Graphics",
      "Photography",
      "Copywriting",
      "Social Assets",
    ],
    image: "/services/content.jpg",
    video: "https://videos.pexels.com/video-files/26898433/12029155_1920_1080_30fps.mp4",
    alt: "Videographer adjusting a camera on a tripod",
    objectPosition: "50% 50%",
  },
  {
    title: "Digital Strategy",
    desc: "Planning and implementing digital solutions that align with your business goals and growth objectives.",
    features: [
      "Market Research",
      "Roadmap Planning",
      "Analytics Setup",
      "KPI Framework",
      "Growth Loops",
    ],
    image: "/services/strategy.jpg",
    video: "https://videos.pexels.com/video-files/7429487/7429487-hd_1366_720_25fps.mp4",
    alt: "Sticky notes being arranged on a whiteboard",
    objectPosition: "50% 50%",
  },
  {
    title: "Creative Consultation",
    desc: "Providing expert guidance on digital projects, from concept development to final implementation.",
    features: [
      "Concept Development",
      "Design Reviews",
      "Direction Sessions",
      "Workshops",
      "Implementation Guidance",
    ],
    image: "/services/consult.jpg",
    video: "https://videos.pexels.com/video-files/36398129/15435252_1920_1080_60fps.mp4",
    alt: "Two professionals collaborating over a laptop",
    objectPosition: "50% 50%",
  },
  {
    title: "Ongoing Support",
    desc: "Maintaining and evolving your digital presence with updates, improvements, and new features.",
    features: [
      "Content Updates",
      "Feature Releases",
      "Performance Monitoring",
      "Client Training",
      "Bug Fixes",
    ],
    image: "/services/support.jpg",
    video: "https://videos.pexels.com/video-files/7682763/7682763-sd_960_540_24fps.mp4",
    alt: "Support professional with a headset providing live client support",
    objectPosition: "50% 50%",
  },
];

export default function Services() {
  return (
    <section className="band alt has-bg-video" id="services">
      <BgVideo
        className="section-bg-video"
        poster="/assets/services-bg-poster.webp"
        sources={[
          { src: "/assets/services-bg.webm", type: "video/webm" },
          { src: "/assets/services-bg.mp4", type: "video/mp4" },
        ]}
      />
      <div className="wrap svc-editorial">
        <header className="svc-head">
          <h2 className="section-title reveal">
            Digital <span className="blue-text">Creative Services</span>
          </h2>
          <p className="lead reveal">
            Professional design and development services powered by industry-standard tools and
            creative expertise.
          </p>
        </header>
      </div>

      {/* ScrollStack is a direct child of <section> so it spans the full section
          width — bypassing the .wrap.svc-editorial max-width constraint. */}
      <ScrollStack
        className="svc-stack"
        /* Use the page's scroll — no nested "scroll trap". Wheel/touchpad
           anywhere on the page drives the stack, even when the cursor
           isn't directly over the cards. */
        useWindowScroll
        itemDistance={100}
        itemStackDistance={30}
        itemScale={0.03}
        baseScale={0.88}
        stackPosition="18%"
        scaleEndPosition="10%"
      >
        {SERVICES.map((s) => (
          <ScrollStackItem key={s.title} itemClassName="svc-card">
            <div className="svc-card-body">
              <h3 className="svc-card-name">{s.title}</h3>
              <div className="svc-card-details">
                <p className="svc-card-desc">{s.desc}</p>
                <ul className="svc-card-features">
                  {s.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
            <SvcCardMedia
              image={s.image}
              video={s.video}
              alt={s.alt}
              objectPosition={s.objectPosition}
              scale={s.scale}
            />
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
}
