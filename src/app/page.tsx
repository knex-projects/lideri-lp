import ProcessSection from "../componets/sections/processSection";
import SolutionsSection from "../componets/sections/solutionsSection";

export default function Home() {
  return (
    <main className="bg-N1">
      <div className="grid-page-bg mx-auto w-full max-w-[1920px]">
      <ProcessSection/>
      <SolutionsSection/>
      </div>
    </main>
  );
}
