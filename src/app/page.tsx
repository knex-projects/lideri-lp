
import Image from "next/image";
import { HeroSection, SectionProjects, ProcessSection, SolutionsSection, PartnersSection } from "../components";

export default function Home() {
  return (

    <main className="">
      <HeroSection />
      <SectionProjects />
      <SolutionsSection />
      <ProcessSection />
      <PartnersSection />
    </main>
  );
}
