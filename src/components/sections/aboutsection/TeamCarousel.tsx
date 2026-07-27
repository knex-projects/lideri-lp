"use client"

import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"

const teamMembers = [
    {
        name: "Gerciane Mauricio",
        role: "Diretora de Projetos",
        image: "/assets/images/team/gerciane_mauricio.webp",
    },
    {
        name: "Ana Clara",
        role: "Consultora de Projetos",
        image: "/assets/images/team/ana_clara.webp",
    },
    {
        name: "Anna Paula",
        role: "Consultora de Projetos",
        image: "/assets/images/team/anna_paula.webp",
    },
    {
        name: "Guilherme Cucco",
        role: "Consultor de Projetos",
        image: "/assets/images/team/gui_cucco.webp",
    },
    {
        name: "José Adenilson",
        role: "Consultor de Projetos",
        image: "/assets/images/team/jose_adenilson.webp",
    },
    {
        name: "Letícia França",
        role: "Presidenta",
        image: "/assets/images/team/leticia_franca_presidenta.webp",
    },
]

const carouselMembers = [...teamMembers, ...teamMembers]

export const TeamCarousel = () => {
    const [emblaRef] = useEmblaCarousel({
        align: "start",
        loop: true,
        skipSnaps: false,
        watchDrag: true,
    })

    return (
        <section className="mt-24 md:mt-32">
            <div className="mx-auto flex max-w-160 flex-col items-center text-center">
                <h2 className="font-[impact] text-[2.25rem] font-normal leading-[100%] tracking-[0] text-N8 md:text-[2.5rem]">
                    Conheça a <span className="text-R5">equipe</span> que vai
                    <br className="hidden sm:block" /> impulsionar seu negócio.
                </h2>
                <p className="mt-4 self-center font-montserrat text-[0.875rem] font-normal leading-[100%] tracking-[0] text-justify text-N5 md:text-[1.25rem]">
                    Conheça nosso time de produção e gerência.
                </p>
            </div>

            <div className="relative mt-7 md:mt-12 xl:ml-[calc(1.9375rem-12.5vw)] xl:h-92 xl:w-[calc(100vw-1.9375rem)]">
                <div className="cursor-grab overflow-hidden active:cursor-grabbing xl:h-full" ref={emblaRef}>
                    <div className="-ml-3 flex touch-pan-y select-none md:-ml-8 xl:-ml-10 xl:h-92">
                        {carouselMembers.map((member, index) => (
                            <div
                                key={`${member.name}-${index}`}
                                className="min-w-0 flex-[0_0_42.5%] pl-3 min-[30rem]:flex-[0_0_48%] md:flex-[0_0_20.625rem] md:pl-8 xl:flex-[0_0_23.125rem] xl:pl-10"
                            >
                                <article className="flex h-full flex-col items-center text-center md:h-92 md:w-82.5 md:gap-2.5">
                                    <div className="relative aspect-square w-full max-w-35 overflow-hidden rounded-[1.125rem] bg-R5 sm:max-w-46 md:h-72.5 md:w-78 md:max-w-none md:rounded-[3.125rem] md:border md:border-transparent md:px-8 md:pt-8 md:pb-7.5">
                                        <Image
                                            src={member.image}
                                            alt={`Foto de ${member.name}`}
                                            fill
                                            sizes="(max-width: 30rem) 72vw, (max-width: 48rem) 48vw, (max-width: 64rem) 33vw, 20vw"
                                            quality={100}
                                            priority={index < 3}
                                            draggable={false}
                                            className="pointer-events-none object-cover select-none md:p-0"
                                        />
                                    </div>

                                    <div className="mt-3 flex flex-col items-center gap-2 md:mt-0">
                                        <h3 className="font-montserrat text-[1rem] font-bold leading-tight text-N8 md:text-[1.75rem]">
                                            {member.name}
                                        </h3>
                                        <p className="font-montserrat text-[0.625rem] font-medium text-R5 md:text-[1.25rem]">
                                            {member.role}
                                        </p>
                                    </div>
                                </article>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
