"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { api } from "@/src/services/api";
import { cms } from "@/src/services/cms";
import type { PostListItem } from "@/src/types";
import { LoadingScreen } from "@/src/components/layout/loading";

const defaultHeroImages = [
    "/assets/images/blog/materia4.jpg",
    "/assets/images/blog/materia5.jpg",
    "/assets/images/blog/materia6.jpg",
];

const formatDate = (value?: string | null) => {
    if (!value) return "Sem data";

    try {
        return new Date(value).toLocaleDateString("pt-BR");
    } catch {
        return value;
    }
};

export default function Blog() {
   
    const [emblaImageRef, emblaImageApi] = useEmblaCarousel(
        { loop: true },
        [Autoplay({ delay: 4000 }), Fade()]
    );

   
    const [emblaTextRef, emblaTextApi] = useEmblaCarousel(
        { loop: true },
        [Fade()]
    );

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [posts, setPosts] = useState<PostListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isActive = true;

        const loadPosts = async () => {
            try {
                setLoading(true);
                setError(null);
                await api.publishScheduledPosts();
                const data = await cms.getPublishedPosts();

                if (isActive) {
                    setPosts(data ?? []);
                }
            } catch (err) {
                if (isActive) {
                    console.error("Erro ao carregar posts do Sanity:", err);
                    setError("Não foi possível carregar as postagens no momento.");
                }
            } finally {
                if (isActive) {
                    setLoading(false);
                }
            }
        };

        void loadPosts();

        return () => {
            isActive = false;
        };
    }, []);

    const heroPosts = posts.slice(0, 3).map((post, index) => ({ 
        title: post.title, 
        slug: post.slug, 
        imageUrl: post.imageUrl || defaultHeroImages[index % defaultHeroImages.length], 
    }));

    const filteredPosts = posts.filter((post) => {
        const title = post.title?.toLowerCase() ?? "";
        return title.includes(searchQuery.toLowerCase());
    });

   
    const onSelect = useCallback(() => {
        if (!emblaImageApi || !emblaTextApi) return;

        const newIndex = emblaImageApi.selectedScrollSnap();
        setSelectedIndex(newIndex);

        if (emblaTextApi.selectedScrollSnap() !== newIndex) {
            emblaTextApi.scrollTo(newIndex);
        }
    }, [emblaImageApi, emblaTextApi]);

    useEffect(() => {
        if (!emblaImageApi || !emblaTextApi) return;

        onSelect();
        emblaImageApi.on("select", onSelect);
        emblaImageApi.on("reInit", onSelect);
    }, [emblaImageApi, emblaTextApi, onSelect]);

    const scrollTo = (index: number) => {
        emblaImageApi?.scrollTo(index);
        emblaTextApi?.scrollTo(index);
    };

  if (loading) {
    return <LoadingScreen />;
  }

    return (
        <main className="w-full pt-29 md:pt-0 bg-[#0D1122] md:bg-transparent">
            <section className="w-full h-auto xl:h-[85vh] flex flex-col items-center relative">
                <div className="hidden md:block w-full h-175 xl:h-231 pointer-events-none"></div>

                <div className="relative md:fixed md:top-0 md:left-0 md:-z-10 w-full h-70.5 md:h-175 xl:h-231 overflow-hidden bg-black" ref={emblaImageRef}>
                    <div className="flex h-full">
                        {heroPosts.map((src, index) => (
                            <div className="relative flex-[0_0_100%] h-full min-w-0" key={index}>
                                <Link href={src?.slug ? `/blog/${src.slug}` : "/blog"} className="pointer-events-auto sm:pointer-events-none cursor-pointer sm:cursor-default" >
                                 <Image
                                    src={src.imageUrl}
                                    alt={`Hero Slide ${index + 1}`}
                                    fill
                                    className="object-cover opacity-100 md:opacity-60"
                                    priority={index === 0}
                                />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

               
                <div className="w-full bg-black flex flex-col justify-center px-6.5 md:px-[12.5%] h-40 md:h-auto md:py-12">
                    <div ref={emblaTextRef} className="overflow-hidden w-full">
                        <div className="flex w-full">
                            {heroPosts.map((post, index) => (
                                
                                <div key={index} className="flex-[0_0_100%] min-w-0 flex flex-col md:flex-row w-full justify-between items-start md:items-center gap-4 md:gap-6 mb-4 md:mb-8">
                                    <h1 className="font-[impact] text-[1.5rem] md:text-[2.5rem] text-white leading-[100%] md:leading-tight max-w-275">
                                        {post?.title || "Além das Fronteiras: Como a Líderi Destrava a Exportação para Empresas Brasileiras"}
                                    </h1>
                                    <Link href={post?.slug ? `/blog/${post.slug}` : "/blog"} className="hidden md:flex flex-shrink-0 items-center justify-center w-13 2xl:w-37.5 h-13 bg-white border-2 border-[#87240E] rounded-[0.5rem] font-montserrat font-medium text-[1.5rem] leading-[1.5rem] text-[#87240E] transition-all hover:bg-gray-50 hover:scale-105">
                                        <span className="hidden 2xl:inline">Ver mais</span>
                                        <ArrowRight className="2xl:hidden" size={30} color="#87240E" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                  
                    <div className="flex gap-2 md:gap-4 w-20 h-4 items-center">
                        {heroPosts.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => scrollTo(index)}
                                className={`w-2 h-2 md:w-4 md:h-4 rounded-full transition-colors ${index === selectedIndex ? "bg-[#680000]" : "bg-[#FFB7A7] hover:bg-[#FFB7A7]/80"}`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

           
            <section className="w-full px-6.5 md:px-[12.5%] py-16 md:py-24 bg-white">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h2 className="font-[impact] text-[2.25rem] md:text-[3rem] leading-[100%] text-N8 ml-1.25">
                            Ultimas <span className="text-R5">postagens</span>
                        </h2>
                        <p className="font-montserrat font-normal text-[1rem] md:text-[1.5rem] leading-[1.5rem] md:leading-[2.25rem] tracking-[0.0288em] text-[#2D2D2D] mt-2 md:whitespace-normal whitespace-nowrap ml-1.25">
                            Confira nossas ultimas postagens
                        </p>
                    </div>

                    <div className="w-full border-t-2 border-[#5E1504] md:hidden"></div>

                    <div className="flex items-center border border-[#2D2D2D] rounded-[0.5rem] px-3 py-2.75 md:px-4 w-full md:w-112.75 h-11.5 md:h-15.5 bg-transparent focus-within:border-R5 transition-colors justify-between">
                        <input
                            type="text"
                            placeholder="Buscar postagens?"
                            className="outline-none flex-1 font-montserrat font-normal text-[1rem] md:text-[1.25rem] leading-[1.5rem] md:leading-none text-[#000000] bg-transparent"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search size={24} className="text-[#2D2D2D] ml-2 cursor-pointer hover:text-R5 transition-colors flex-shrink-0 w-6 h-6" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-12 gap-y-6 md:gap-y-16 w-full">
                    {loading ? (
                        <div className="col-span-full flex justify-center items-center py-12">
                            <p className="font-montserrat text-[#2D2D2D] text-[1.125rem]">Carregando postagens do Sanity...</p>
                        </div>
                    ) : error ? (
                        <div className="col-span-full flex justify-center items-center py-12">
                            <p className="font-montserrat text-[#2D2D2D] text-[1.125rem]">{error}</p>
                        </div>
                    ) : filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <div key={post._id} className="flex flex-col gap-4">
                                <Link href={post.slug ? `/blog/${post.slug}` : "/blog"} className="group relative flex flex-col justify-end w-full h-50.5 md:h-64 rounded-[0.5rem] overflow-hidden shadow-[0rem_0.25rem_0.25rem_0rem_#08166D40]">
                                    <img
                                        src={post.imageUrl || "/assets/images/blog/materia1.png"}
                                        alt={post.title || "Post do blog"}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#000E31]/90 via-[#000E31]/40 to-transparent"></div>

                                    <div className="relative z-10 w-full px-6 py-8 md:p-4 flex flex-col justify-end h-full">
                                        <div className="flex items-center justify-between gap-4 w-full">
                                            <div className="flex items-center flex-1 h-18">
                                                <h3 className="font-montserrat font-semibold text-[1rem] leading-[1.5rem] text-[#FFFFFF] line-clamp-3">
                                                    {post.title || "Post sem título"}
                                                </h3>
                                            </div>
                                            <div className="hidden md:flex flex-shrink-0 items-center justify-center w-7.25 h-6.75 bg-[#9D361F] border-2 border-[#87240E] rounded-[0.5rem] transition-transform group-hover:scale-110">
                                                <img src="/assets/icon/arrow-card.svg" alt="Arrow" className="w-3 h-3" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <div className="flex flex-col gap-1">
                                    <span className="font-montserrat font-normal text-[0.875rem] leading-none text-[#2D2D2D]">
                                        {formatDate(post.publishedAt)}
                                    </span>
                                    {post.categories && post.categories.length > 0 ? (
                                        <span className="font-montserrat text-[0.75rem] text-[#680000]">
                                            {post.categories.join(" • ")}
                                        </span>
                                    ) : null}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full flex justify-center items-center py-12">
                            <p className="font-montserrat text-[#2D2D2D] text-[1.125rem]">Nenhuma postagem encontrada com "{searchQuery}".</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}