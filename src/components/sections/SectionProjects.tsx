"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ProjectCard } from "../cards/ProjectCard";
import {
  icecreamImg,
  acaiImg,
  beerImg,
  lacemakerImg,
  craftsmanImg,
} from "../../../public/assets";

export const SectionProjects = () => {
  const projects = [
    {
      title: "Internacionalização de Sorvetes",
      description:
        "Estudo estratégico e plano burocrático para internacionalizar marca de sorvetes, estruturando de forma sólida a base de futuras exportações.",
      imageSrc: icecreamImg,
    },
    {
      title: "Internacionalização de Açaí",
      description:
        "Análise de mercado global e conjuntura para empresa cearense de açaí, focando em identificar países promissores para as futuras exportações.",
      imageSrc: acaiImg,
    },
    {
      title: "Cervejaria Freya",
      description:
        "Preparação para exportar a cerveja artesanal por meio de estudos de mercado, planejamento e prospecção de parceiros para o mercado exterior.",
      imageSrc: beerImg,
    },
    {
      title: "Projeto Rendeiras",
      description:
        "Assessoria na internacionalização do artesanato das rendeiras do Cariri, promovendo impacto social e novas oportunidades globais de mercado.",
      imageSrc: lacemakerImg,
    },
    {
      title: "Projeto Artesão Empreendedor",
      description:
        "Apoio na exportação do artesanato da Paraíba, com foco em plano burocrático e logístico, levando toda a arte local ao mercado internacional.",
      imageSrc: craftsmanImg,
    },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <section id="projetos" className="2xl:pb-16 pb-10 flex flex-col pt-24 md:pt-36  gap-[16px] md:gap-8 lg:gap-[44px] font-sans w-full  mx-auto sm:px-[12.5%] px-[26px]">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 w-full   lg:px-0">
        <div className="flex flex-col max-w-2xl">
          <div className="flex flex-col w-full sm:pt-[104px] lg:w-[557px] h-auto lg:h-[192px] gap-[8px]">
            <h2 className="w-full lg:w-[518px] text-[28px] min-[360px]:text-[36px] md:text-[42px] lg:text-[48px] font-[540] leading-[36px] min-[360px]:leading-[44px] md:leading-[50px] lg:leading-[56px] tracking-normal text-N8 font-zodiak font-normal">
              Conheça nosso portfólio <br /> de <span className="text-R5">projetos.</span>
            </h2>
            <p className="text-[14px] lg:text-[16px] font-[400] leading-none tracking-normal text-N5 font-poppins">
              Conheça alguns dos projetos que desenvolvemos para conectar empresas
              ao mercado internacional com estratégia, segurança e eficiência.
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden pt-12" ref={emblaRef}>
        <div className="flex ml-0 min-[500px]:ml-[-36px] lg:ml-[-64px]">
          {projects.map((project, index) => (
            <div
              className="flex-[0_0_100%] min-[500px]:flex-[0_0_auto] min-w-0 pl-0 min-[500px]:pl-[20px] md:pl-[36px] lg:pl-[64px]"
              key={index}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                imageSrc={project.imageSrc}
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center gap-[12px] mt-4 lg:hidden">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={`w-[8px] h-[8px] rounded-full transition-colors duration-300 ${index === selectedIndex ? "bg-R5" : "bg-R1"
              }`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>

      <div className="hidden lg:flex justify-center items-center gap-4 lg:-mt-[4px]">
        <button onClick={scrollPrev} className="flex items-center justify-center w-[36px] h-[36px] bg-R5 text-white rounded-full hover:bg-R6 transition-colors">
          <svg
            width="12"
            height="20"
            viewBox="0 0 12 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 18l-8-8 8-8" />
          </svg>
        </button>
        <button onClick={scrollNext} className="flex items-center justify-center w-[36px] h-[36px] bg-R5 text-white rounded-full hover:bg-R6 transition-colors">
          <svg
            width="12"
            height="20"
            viewBox="0 0 12 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 18l8-8-8-8" />
          </svg>
        </button>
      </div>
    </section>
  );
};
