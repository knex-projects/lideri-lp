"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";

const heroImages = [
    "/assets/images/blog/materia4.jpg",
    "/assets/images/blog/materia5.jpg",
    "/assets/images/blog/materia6.jpg",
];

const blogPosts = [
    {
        id: 1,
        title: "O 'Tarifaço' estadunidense: Quais seus impactos no mercado brasileiro e como contorná-lo?",
        image: "/assets/images/blog/materia1.png",
        link: "#",
    },
    {
        id: 2,
        title: "Incoterms: Tudo o que você precisa saber para levar o seu negócio além",
        image: "/assets/images/blog/materia2.png",
        link: "#",
    },
    {
        id: 3,
        title: "Conheça os Casos de Sucesso da Líderi Consultoria",
        image: "/assets/images/blog/materia3.jpg",
        link: "#",
    },
    {
        id: 4,
        title: "Das Praias Brasileiras para o Mundo: Estratégias que Levaram a Havaianas a Conquistar o Mercado Global",
        image: "/assets/images/blog/materia4.jpg",
        link: "#",
    },
    {
        id: 5,
        title: "Diferenças culturais que podem virar oportunidades de negócio",
        image: "/assets/images/blog/materia5.jpg",
        link: "#",
    },
    {
        id: 6,
        title: "Como Preparar sua Empresa para a Internacionalização: Passos essenciais antes de entrar em mercados estrangeiros",
        image: "/assets/images/blog/materia6.jpg",
        link: "#",
    },
];

export default function Blog() {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true },
        [Autoplay({ delay: 4000 }), Fade()]
    );
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
    }, [emblaApi, onSelect]);

    return (
        <main className="w-full">
            <section className="w-full flex flex-col items-center bg-black">
                <div className="relative w-full h-[500px] md:h-[700px] xl:h-[924px] overflow-hidden bg-black" ref={emblaRef}>
                    <div className="flex h-full">
                        {heroImages.map((src, index) => (
                            <div className="relative flex-[0_0_100%] h-full" key={index}>
                                <Image 
                                    src={src} 
                                    alt={`Hero Slide ${index + 1}`} 
                                    fill 
                                    className="object-cover" 
                                    priority={index === 0}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full bg-black flex flex-col px-6.5 md:px-[12.5%] py-8 md:py-12">
                    <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center gap-6 mb-8">
                        <h1 className="font-[impact] text-[28px] md:text-[40px] text-white leading-tight max-w-[1100px]">
                            Além das Fronteiras: Como a Líderi Destrava a Exportação para Empresas Brasileiras
                        </h1>
                        <Link href="#" className="flex items-center justify-center w-[150px] h-[52px] bg-white border-2 border-[#87240E] rounded-[8px] font-montserrat font-medium text-[24px] leading-[24px] text-[#87240E] transition-all hover:bg-gray-50 hover:scale-105">
                            Ver mais
                        </Link>
                    </div>
                    
                    <div className="flex gap-[16px] w-[80px] h-[16px]">
                        {heroImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => emblaApi?.scrollTo(index)}
                                className={`w-[16px] h-[16px] rounded-full transition-colors ${index === selectedIndex ? "bg-[#680000]" : "bg-[#FFB7A7] hover:bg-[#FFB7A7]/80"}`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="w-full px-6.5 md:px-[12.5%] py-16 md:py-24 bg-white">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h2 className="font-[impact] text-[36px] md:text-[48px] text-N8 ml-[5px]">
                            Ultimas <span className="text-R5">postagens</span>
                        </h2>
                        <p className="font-montserrat font-normal text-[24px] leading-[36px] tracking-[0.0288em] text-[#2D2D2D] mt-2">
                            Confira nossas ultimas <br/> postagens
                        </p>
                    </div>
                    
                    <div className="flex items-center border border-[#2D2D2D] rounded-[8px] px-4 w-full md:w-[451px] h-[62px] bg-transparent focus-within:border-R5 transition-colors">
                        <input 
                            type="text" 
                            placeholder="Buscar postagens?" 
                            className="outline-none flex-1 font-montserrat font-normal text-[20px] leading-none text-[#000000] bg-transparent" 
                        />
                        <Search size={24} className="text-[#2D2D2D] ml-2 cursor-pointer hover:text-R5 transition-colors" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[48px] gap-y-[64px] w-full">
                    {blogPosts.map((post) => (
                        <Link key={post.id} href={post.link} className="group relative flex flex-col justify-end w-full h-[256px] rounded-[8px] overflow-hidden shadow-[0px_4px_4px_0px_#08166D40]">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                quality={100}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#000E31]/90 via-[#000E31]/40 to-transparent"></div>
                            
                            <div className="relative z-10 w-full p-4 flex flex-col justify-end h-full">
                                <div className="flex items-center gap-[16px] w-full">
                                    <div className="flex items-center flex-1 h-[72px]">
                                        <h3 className="font-montserrat font-semibold text-[16px] leading-[24px] text-[#FFFFFF] line-clamp-3">
                                            {post.title}
                                        </h3>
                                    </div>
                                    <div className="flex-shrink-0 flex items-center justify-center w-[29px] h-[27px] bg-[#9D361F] border-2 border-[#87240E] rounded-[8px] transition-transform group-hover:scale-110">
                                        <img src="/assets/icon/arrow-card.svg" alt="Arrow" className="w-[12px] h-[12px]" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}