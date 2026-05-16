
import Image from "next/image";
import { HeroSection, SectionProjects, ProcessSection, SolutionsSection } from "../components";
import MapWrapper from "../components/sections/mapsection/mapsection";

export default function Home() {
  return (

    <main className="">
      <HeroSection />
      <SectionProjects />
      <SolutionsSection />
      <ProcessSection />
      <MapWrapper />
    </main>
  );
}
