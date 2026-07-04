
import Image from "next/image";
import { HeroSection, SectionProjects, ProcessSection, SolutionsSection, PartnersSection, TestimonialsSection, BlogSection } from "@/src/components";
import MapWrapper from "@/src/components/sections/mapsection/mapsection";




export default function Home() {
  return (

    <main className="">
      <HeroSection />
      <SectionProjects />
      <ProcessSection />
      <TestimonialsSection />
      <BlogSection />
      <PartnersSection />
      <MapWrapper />
    </main>
  );
}
