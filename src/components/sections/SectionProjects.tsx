"use client";
import React, { SVGProps, useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ProjectCard } from "../cards/ProjectCard";
import cases from "../../data/cases";
import Link from "next/link";

export const SectionProjects = () => {
  const projects = cases.map(({ title, description, imageSrc, slug }) => ({
    title,
    description,
    imageSrc,
    slug
  }));

  function IconLink(props: SVGProps<SVGSVGElement>) {
      return (
          <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.29231 12L0 10.7077L8.86154 1.84615H0.923077V0H12V11.0769H10.1538V3.13846L1.29231 12Z" fill="white"/>
          </svg>
      )
  }

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
    <section id="projetos" className="2xl:pb-16 pb-10 flex flex-col pt-24 md:pt-36  gap-4 md:gap-8 lg:gap-11 font-sans w-full  mx-auto md:px-[12.5%] px-6.5">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 w-full   lg:px-0">
        <div className="flex flex-col max-w-2xl">
          <div className="flex flex-col w-full sm:pt-26 lg:w-139.25 h-auto lg:h-48 gap-2">
            <h2 className="w-full lg:w-129.5 text-[1.75rem] min-[22.5rem]:text-[2.25rem] md:text-[2.625rem] lg:text-[3rem] font-[540] leading-[2.25rem] min-[22.5rem]:leading-[2.75rem] md:leading-[3.125rem] lg:leading-[3.5rem] tracking-normal text-N8 font-zodiak font-normal">
              Conheça nosso portfólio <br /> de <span className="text-R5">projetos.</span>
            </h2>
            <p className="text-[0.875rem] lg:text-[1rem] font-[400] leading-none tracking-normal text-N5 font-montserrat">
              Conheça alguns dos projetos que desenvolvemos para conectar empresas
              ao mercado internacional com estratégia, segurança e eficiência.
            </p>
          </div>
        </div>
        <Link href="/cases/" className="mt-auto flex justify-end">
          <button className="flex w-60 items-center justify-center h-11.5 rounded-[0.5rem] border-2 border-R5 bg-R5 px-5 text-white shadow-[0rem_0.0625rem_0.5rem_#87240E] transition-colors duration-300 hover:bg-white hover:text-R5">
            Explorar resultados <div className="ml-2 h-3 w-3"><IconLink/></div>
          </button>
        </Link>
      </div>

      <div className="overflow-hidden pt-16" ref={emblaRef}>
        <div className="flex ml-0 min-[31.25rem]:-ml-5 md:-ml-9 lg:-ml-16">
          {projects.map((project, index) => (
            <div
              className="flex-[0_0_100%] min-[31.25rem]:flex-[0_0_auto] min-w-0 pl-0 min-[31.25rem]:pl-5 md:pl-9 lg:pl-16"
              key={index}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                imageSrc={project.imageSrc}
                slug={project.slug}
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center gap-3 mt-4 lg:hidden">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${index === selectedIndex ? "bg-R5" : "bg-R1"
              }`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>

      <div className="hidden lg:flex justify-center items-center gap-4 lg:-mt-1">
        <button onClick={scrollPrev} className="flex items-center justify-center w-9 h-9 bg-R5 text-white rounded-full hover:bg-R6 transition-colors">
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
        <button onClick={scrollNext} className="flex items-center justify-center w-9 h-9 bg-R5 text-white rounded-full hover:bg-R6 transition-colors">
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
