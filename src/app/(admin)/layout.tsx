"use client"
import { Header } from "@/src/components/layout/headerADM";
import { Footer } from "@/src/components/layout/footer";
import SidebarCMS from "@/src/components/layout/sideBar";
import { useState } from "react";

export default function LandingPageLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <Header isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <main className="flex flex-1 w-full items-stretch">
         <SidebarCMS isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        {children}
        </main>
      <Footer/>
    </>
  );
}