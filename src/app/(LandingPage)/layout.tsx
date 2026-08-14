
import { Header } from "@/src/components/layout/Header/Header";
import { Footer } from "@/src/components/layout/footer";

export default function LandingPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header/>
      <main>{children}</main>
      <Footer/>
    </>
  );
}