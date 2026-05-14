import { SectionProjects } from "@/src/components";
import Image from "next/image";
import ProcessSection from "../componets/sections/processSection";

export default function Home() {
  return (
   
    <main className="">    
      <SectionProjects />
      <ProcessSection/>
    </main>
  );
}
