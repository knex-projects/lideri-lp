"use client"

import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"

const teamMembers = [
    {
        name: "Gerciane Mauricio",
        role: "Diretora de Projetos",
        image: "/assets/images/team/gerciane_mauricio.jpg",
    },
    {
        name: "Ana Clara",
        role: "Consultora de Projetos",
        image: "/assets/images/team/ana_clara.png",
    },
    {
        name: "Anna Paula",
        role: "Consultora de Projetos",
        image: "/assets/images/team/anna_paula.png",
    },
    {
        name: "Guilherme Cucco",
        role: "Consultor de Projetos",
        image: "/assets/images/team/gui_cucco.png",
    },
    {
        name: "José Adenilson",
        role: "Consultor de Projetos",
        image: "/assets/images/team/jose_adenilson.jpg",
    },
    {
        name: "Letícia França",
        role: "Presidenta",
        image: "/assets/images/team/leticia_franca_presidenta.jpg",
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
                <h2 className="font-[impact] text-[36px] font-normal leading-[100%] tracking-[0] text-N8 md:text-[40px]">
                    Conheça a <span className="text-R5">equipe</span> que vai
                    <br className="hidden sm:block" /> impulsionar seu negócio.
                </h2>
                <p className="mt-4 self-center font-montserrat text-[14px] font-normal leading-[100%] tracking-[0] text-justify text-N5 md:text-[20px]">
                    Conheça nosso time de produção e gerência.
                </p>
            </div>

            <div className="relative mt-7 md:mt-12 xl:ml-[calc(31px-12.5vw)] xl:h-[368px] xl:w-[calc(100vw-31px)]">
                <div className="cursor-grab overflow-hidden active:cursor-grabbing xl:h-full" ref={emblaRef}>
                    <div className="-ml-3 flex touch-pan-y select-none md:-ml-8 xl:-ml-[40px] xl:h-[368px]">
                        {carouselMembers.map((member, index) => (
                            <div
                                key={`${member.name}-${index}`}
                                className="min-w-0 flex-[0_0_42.5%] pl-3 min-[412px]:flex-[0_0_190px] md:flex-[0_0_330px] md:pl-8 xl:flex-[0_0_370px] xl:pl-[40px]"
                            >
                                <article className="flex h-full flex-col items-center text-center md:h-[368px] md:w-[330px] md:gap-[10px]">
                                    <div className="relative aspect-square w-full max-w-[168px] overflow-hidden rounded-[25px] bg-R5 sm:max-w-[184px] md:h-[290px] md:w-[312px] md:max-w-none md:rounded-[50px] md:border md:border-transparent md:px-8 md:pt-8 md:pb-[30px]">
                                        <Image
                                            src={member.image}
                                            alt={`Foto de ${member.name}`}
                                            fill
                                            sizes="(max-width: 480px) 72vw, (max-width: 768px) 48vw, (max-width: 1024px) 33vw, 20vw"
                                            quality={100}
                                            priority={index < 3}
                                            draggable={false}
                                            className="pointer-events-none object-cover select-none md:p-0"
                                        />
                                    </div>

                                    <div className="mt-3 flex flex-col items-center gap-[8px] md:mt-0">
                                        <h3 className="font-montserrat text-[16px] font-bold leading-tight text-N8 md:text-[28px]">
                                            {member.name}
                                        </h3>
                                        <p className="font-montserrat text-[10px] font-medium text-R5 md:text-[20px]">
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
