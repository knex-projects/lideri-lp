import Image from "next/image";
import ProcessSection from "../componets/sections/processSection";
import { HeroSection } from "../components";

export default function Home() {
  return (
    <main className=""> 
      <HeroSection />
      <ProcessSection/>
    </main>
  );
}
