"use client";
import React, { useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ProjectCard } from "./components/ProjectCard";
import {
  airplaneIcon,
  icecreamImg,
  acaiImg,
  beerImg,
  lacemakerImg,
  craftsmanImg,
} from "../../../../public/assets";

// falta botoes, alinhamento cards, hover, imagens dos cards

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

  return (
    <section className="py-16 flex flex-col gap-12  font-sans w-full">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="flex flex-col max-w-2xl">
          <Image
            src={airplaneIcon}
            alt="Airplane path icon"
            width={251}
            height={64}
            className="ml-[0px] mb-[40px]"
          />

          <div className="flex flex-col w-[557px] h-[192px] gap-[8px]">
            <h2 className="w-[517px] text-[48px] font-[540] leading-[56px] tracking-normal text-N8 font-zodiak font-bold">
              Conheça nosso <br />
              portfólio de <span className="text-R5">projetos.</span>
            </h2>
            <p className="text-[16px] font-[400] leading-none tracking-normal text-N5 font-poppins">
              Conheça alguns dos projetos que desenvolvemos para conectar empresas
              ao mercado internacional com estratégia, segurança e eficiência.
            </p>
          </div>
        </div>

        <button className="flex items-center justify-center w-[148px] h-[52px] py-[12px] px-[24px] gap-[8px] rounded-[8px] bg-R5 text-white font-sans font-medium text-[16px] leading-[24px] tracking-normal text-center whitespace-nowrap hover:bg-R6 transition-colors self-start md:self-auto shrink-0">
          Ver todos
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.29231 12L0 10.7077L8.86154 1.84615H0.923077V0H12V11.0769H10.1538V3.13846L1.29231 12Z" fill="white"/>
          </svg>
        </button>
      </div>

      <div className="overflow-hidden -mx-6 px-6 -my-6 py-6" ref={emblaRef}>
        <div className="flex -ml-[60px]">
          {projects.map((project, index) => (
            <div className="flex-[0_0_auto] pl-[60px]" key={index}>
              <ProjectCard
                title={project.title}
                description={project.description}
                imageSrc={project.imageSrc}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 mt-4">
        <button onClick={scrollPrev} className="flex items-center justify-center w-10 h-10 bg-R5 text-white rounded-full hover:bg-R6 transition-colors">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button onClick={scrollNext} className="flex items-center justify-center w-10 h-10 bg-R5 text-white rounded-full hover:bg-R6 transition-colors">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </section>
  );
};
