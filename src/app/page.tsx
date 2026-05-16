
import Image from "next/image";
import { HeroSection, SectionProjects, ProcessSection, SolutionsSection,TestimonialsSection } from "../components";
import MapWrapper from "../components/sections/mapsection/mapsection";

export default function Home() {
  return (

    <main className="">
      <HeroSection />
      <SectionProjects />
      <SolutionsSection />
      <ProcessSection />
      <TestimonialsSection />
      <MapWrapper />
    </main>
  );
}
