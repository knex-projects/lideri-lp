import cases from "../../../data/cases";
import { notFound } from "next/navigation";
import type { ComponentType, SVGProps } from "react";
import { ScrollDownIndicator } from "../../../components/ui/ScrollDownIndicator";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

type descriptionItem = {
    title: string;
    description: string;
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

function IconMountain(props: SVGProps<SVGSVGElement>) {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 6L24 22L34 12L44 42H4L16 6Z" stroke="#87240E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.28027 30.16C13.5203 27.02 18.7603 27.3 24.0003 31C29.4803 34.88 34.9803 35 40.4603 31.38" stroke="#87240E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

function IconAim(props: SVGProps<SVGSVGElement>) {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="#87240E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M44 24H36M12 24H4M24 12V4M24 44V36" stroke="#87240E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

function IconGraph(props: SVGProps<SVGSVGElement>) {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 14H44V26" stroke="#87240E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M44 14L27 31L17 21L4 34" stroke="#87240E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}



export default async function CasePage({ params }: Props) {
  const { slug } = await params;

  const caseItem = cases.find(
    (item) => item.slug === slug
  );

  if (!caseItem) {
    notFound();
  }

  const caseItems: descriptionItem[] = [
    {
        title: "O Obstáculo de Mercado",
        description: caseItem.marketObstacles,
        Icon: IconMountain,
    },
    {
        title: "A estratégia de Entrada",
        description: caseItem.entryEstrategy,
        Icon: IconAim,
    },
    {
        title: "Ganhos e Escalabilidade",
        description: caseItem.scalability,
        Icon: IconGraph,
    },
  ];

  return (
    <main>
        <div className="h-0 md:h-22.5 w-full bg-linear-to-r from-[#0D1122] to-[#373166] invisible md:visible"/>
        <div className="h-25 md:h-0 w-full md:hidden">
                <img src={caseItem.imageSrc} alt={caseItem.title} className="w-full h-full brightness-80 object-top" />
        </div>
        <div className="md:max-w-[80%] flex flex-col md:mt-[30px] mb-[30px] mx-auto md:flex-row items-center justify-center gap-6 md:gap-12 w-full bg-cover bg-center">
            <div className="relative w-full max-w-[900px] h-screen md:h-[400px] overflow-hidden md:max-w-[500px] md:rounded-[8px] md:shadow-[2px_2px_8px_rgba(0,0,0,0.4)] flex-shrink-0">
                <img src={caseItem.imageSrc} alt={caseItem.title} className="w-full h-full brightness-110 object-cover object-top" />
                <div className="absolute inset-x-0 bottom-0 h-[80%] bg-gradient-to-t from-white to-transparent md:hidden" />
            </div>
            <div className="absolute md:relative bottom-20 md:bottom-0 left-0 w-[80%] flex flex-col gap-6 md:gap-8 items-start px-6 md:w-full md:max-w-[700px]">
                <h1 className="font-zodiac font-normal leading-none md:leading-tight text-[50px] md:text-[50px]/[62px] xl:text-[76px]/[82px] text-N8">
                    {caseItem.title.split(' ').slice(0, -1).join(' ')} <span className="text-R5">{caseItem.title.split(' ').pop()}</span>
                </h1>
                <p className="max-w-[700px] font-montserrat text-[18px] xl:text-[20px] text-N8">{caseItem.description}</p>
            </div>
            <ScrollDownIndicator className="absolute bottom-10 right-10 md:hidden" />
        </div>
        <hr className="w-[80%] border-1 border-[rgba(0,0,0,0.2)] mx-auto invisible md:visible" />
        <div className="flex w-full flex-col items-center gap-[64px] px-6.5 py-16 md:px-[12.5%]">
          <div className=" grid w-full grid-cols-1  justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-2 lg:gap-8   xl:items-center xl:justify-center xl:gap-[60px]">
              {caseItems.map(
                ({ title, description, Icon }) => (
                  <article
                      key={title}
                      className="flex h-full flex-col inset-0 transition-all duration-300 justify-between rounded-[8px] ring-2  ring-[rgba(0,0,0,0.2)] bg-white px-[40px] py-[24px] lg:max-w-none md:last:col-span-full lg:last:col-span-full"
                  >
                    <div className="flex w-full items-stretch flex-col justify-between gap-8 mb-6">
                        <div className="flex items-center gap-6">
                            <Icon className="sm:h-[36px]/[36px] md:h-[32px]/[32px] w-[32px] h-[32px] text-R5" aria-hidden="true"/>
                            <h3 className="font-zodiak sm:text-[32px] text-[28px] text-N8">
                                {title.split(' ').slice(0, -1).join(' ')} <span className="text-R5">{title.split(' ').pop()}</span>
                            </h3>
                        </div>
                        <p className="font-montserrat xl:text-[18px] text-[16px] text-N6">
                            {description}
                        </p>
                    </div>
                  </article>
                ),
              )}
          </div>
      </div>
    </main>
  );
}
