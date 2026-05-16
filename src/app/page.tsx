
import Image from "next/image";
import { HeroSection, SectionProjects, ProcessSection, SolutionsSection, PartnersSection,TestimonialsSection } from "../components";
import MapWrapper from "../components/sections/mapsection/mapsection";

export default function Home() {
  return (

    <main className="">
      <HeroSection />
      <SectionProjects />
      <SolutionsSection />
      <ProcessSection />
      <TestimonialsSection />
      <PartnersSection />
      <MapWrapper />
    </main>
  );
}
