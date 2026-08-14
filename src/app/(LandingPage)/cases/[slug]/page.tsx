import type { CasePageProps } from '@/src/types';
import cases from "@/src/data/cases";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";



function IconMountain() {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 6L24 22L34 12L44 42H4L16 6Z" stroke="#87240E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.28027 30.16C13.5203 27.02 18.7603 27.3 24.0003 31C29.4803 34.88 34.9803 35 40.4603 31.38" stroke="#87240E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

function IconAim() {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="#87240E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M44 24H36M12 24H4M24 12V4M24 44V36" stroke="#87240E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

function IconGraph() {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 14H44V26" stroke="#87240E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M44 14L27 31L17 21L4 34" stroke="#87240E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}


export default async function CasePage({ params }: CasePageProps) {
    const { slug } = await params;

    const caseItem = cases.find((caseItem) => caseItem.slug === slug);

    if (!caseItem) {
        notFound();
    }

    return (
        <main className="flex flex-col gap-16 font-montserrat">
            <div className="h-29 md:h-22.5 w-full bg-[#0D1122]"/>
            <div className="md:max-w-[75%] w-full mx-auto justify-center items-center xl:flex gap-24">
                <div className="w-full md:w-160 md:min-w-128 h-89.25 md:h-128 mb-8.5 mx-auto  xl::mb-0">
                    <img src={caseItem.imageSrc} alt={caseItem.title} className="absolute top-29 h-89.25 md:relative md:top-0 w-full md:h-full object-cover object-top md:rounded-[0.5rem]" />
                    <div className="absolute inset-x-0 top-29 h-89.25 bg-gradient-to-t from-white via-transparent to-transparent md:hidden" />
                </div>
                <div className="flex flex-col max-w-[85%] mx-auto md:max-w-full md:mx-0 md:items-center xl:items-start gap-4">
                    <h1 className="font-impact text-[2.25rem] leading-[100%] md:text-[4.75rem] max-w-168 md:leading-[5.125rem]">
                        {caseItem.title.split(' ').slice(0, -1).join(' ')} <span className="text-[#87240E]">{caseItem.title.split(' ').pop()}</span>
                    </h1>
                    <p className="text-[1.125rem] md:text-[1.5rem] leading-[100%] md:leading-[2.25rem] text-[#2D2D2D] max-w-168">
                        {caseItem.description}
                    </p>
                </div>
            </div>
            <hr className="w-[85%] xl:w-[75%] mx-auto border-[0.0625rem] border-[#B1AFAF]"/>
            <div className="grid justify-items-center  xl:grid-cols-2 w-[85%] xl:w-[75%] mx-auto mb-35.5 gap-16">
                <article className="flex flex-col w-full border-[0.0625rem] gap-6 md:gap-8 md:last:col-span-full border-[#6C6C6C] rounded-[0.5rem] px-6 md:px-16 py-12">
                    <div className="flex gap-4 items-center">
                        <div className="w-12 h-12"><IconMountain/></div>
                        <h1 className="font-impact text-[2rem] md:text-[3rem] leading-[100%] md:leading-[3.5rem]">
                            O Obstáculo de
                            <span className="text-[#87240E]"> Mercado</span>
                        </h1>
                    </div>
                    <p className="text-[1rem] md:text-[1.25rem] leading-[1.5rem] md:leading-[100%] text-[#2D2D2D]">
                        {caseItem.marketObstacles}
                    </p>
                </article>
                <article className="flex flex-col w-full border-[0.0625rem] gap-6 md:gap-8 md:last:col-span-full border-[#6C6C6C] rounded-[0.5rem] px-6 md:px-16 py-12">
                    <div className="flex gap-4 items-center">
                        <div className="w-12 h-12"><IconAim/></div>
                        <h1 className="font-impact text-[2rem] md:text-[3rem] leading-[100%] md:leading-[3.5rem]">
                            A Estratégia de
                            <span className="text-[#87240E]"> Entrada</span>
                        </h1>
                    </div>
                    <p className="text-[1rem] md:text-[1.25rem] leading-[1.5rem] md:leading-[100%] text-[#2D2D2D]">
                        {caseItem.entryEstrategy}
                    </p>
                </article>
                <article className="flex flex-col w-full border-[0.0625rem] gap-6 md:gap-8 md:last:col-span-full border-[#6C6C6C] rounded-[0.5rem] px-6 md:px-16 py-12">
                    <div className="flex gap-4 items-center">
                        <div className="w-12 h-12"><IconGraph/></div>
                        <h1 className="font-impact text-[2rem] md:text-[3rem] leading-[100%] md:leading-[3.5rem]">
                            <span className="text-[#87240E]">Ganhos </span>
                             e
                            <span className="text-[#87240E]"> Escalabilidade</span>
                        </h1>
                    </div>
                    <p className="text-[1rem] md:text-[1.25rem] leading-[1.5rem] md:leading-[100%] text-[#2D2D2D]">
                        {caseItem.scalability}
                    </p>
                </article>
            </div>
        </main>
    )
};