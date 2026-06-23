
import Image from "next/image";
import { HeroSection, ProjectsSection, ProcessSection, SolutionsSection, PartnersSection, TestimonialsSection } from "../components";
import MapWrapper from "../components/sections/mapsection/mapsection";



export default function Home() {
  return (

    <main className="">
      <HeroSection />
      <ProjectsSection />
      <ProcessSection />
      <TestimonialsSection />
      <PartnersSection />
      <MapWrapper />
    </main>
  );
}
