import Image from "next/image";
import ProcessSection from "../componets/sections/processSection";
import { HeroSection } from "../componets/sections/HeroSection";

export default function Home() {
  return (
    <main className="bg-white"> 
      <HeroSection />
      <ProcessSection/>
    </main>
  );
}
