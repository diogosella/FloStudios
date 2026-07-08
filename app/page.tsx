import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Services from "@/components/Services";
import Podcast from "@/components/Podcast";
import StudentImpact from "@/components/StudentImpact";
import Ecosystem from "@/components/Ecosystem";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import SiteEffects from "@/components/SiteEffects";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Work />
      <Services />
      <Podcast />
      <StudentImpact />
      <Ecosystem />
      <FinalCTA />
      <Footer />
      <SiteEffects />
    </>
  );
}
