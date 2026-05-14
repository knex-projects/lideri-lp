
import Image from "next/image";
import ProcessSection from "../components/sections/processSection";
import { SectionProjects } from "../components";

export default function Home() {
  return (

    <main className="">
      <SectionProjects />
      <ProcessSection />
    </main>
  );
}
