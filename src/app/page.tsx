
import Image from "next/image";
import ProcessSection from "../components/sections/processSection";
import { SectionProjects } from "../components";
import { HeroSection } from "../components/sections/HeroSection";

export default function Home() {
  return (

    <main className="">
      <HeroSection />
      <SectionProjects />
      <ProcessSection />
    </main>
  );
}
