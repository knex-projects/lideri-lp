"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { client } from "@/src/sanity/lib/client";

interface SanityPostListItem {
    _id: string;
    title?: string | null;
    slug?: string | null;
    publishedAt?: string | null;
    imageUrl?: string | null;
    categories?: Array<string | null> | null;
    authorName?: string | null;
}

const defaultHeroImages = [
    "/assets/images/blog/materia4.jpg",
    "/assets/images/blog/materia5.jpg",
    "/assets/images/blog/materia6.jpg",
];

const postsQuery = `*[_type == "post" && status == "posted"] | order(publishedAt desc, _createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  "imageUrl": coalesce(imagemDaGaleria->arquivo.asset->url, null),
  "categories": categories[]->title,
  "authorName": author->name
}`;

const formatDate = (value?: string | null) => {
    if (!value) return "Sem data";

    try {
        return new Date(value).toLocaleDateString("pt-BR");
    } catch {
        return value;
    }
};

export default function Blog() {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true },
        [Autoplay({ delay: 4000 }), Fade()]
    );
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [posts, setPosts] = useState<SanityPostListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isActive = true;

        const loadPosts = async () => {
            try {
                setLoading(true);
                setError(null);
                await fetch('/api/posts/publish-scheduled', { cache: 'no-store' });
                const data = await client.fetch<SanityPostListItem[]>(postsQuery, {}, { useCdn: false });

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

    const heroImages = posts.slice(0, 3).map((post, index) => post.imageUrl || defaultHeroImages[index % defaultHeroImages.length]);
    const heroPost = posts[0];
    const filteredPosts = posts.filter((post) => {
        const title = post.title?.toLowerCase() ?? "";
        return title.includes(searchQuery.toLowerCase());
    });

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
        <main className="w-full pt-[116px] md:pt-0 bg-[#0D1122] md:bg-transparent">
            <section className="w-full h-[85vh] flex flex-col items-center relative">
                <div className="hidden md:block w-full h-[700px] xl:h-[924px] pointer-events-none"></div>
                <div className="relative md:fixed md:top-0 md:left-0 md:-z-10 w-full h-[282px] md:h-[700px] xl:h-[924px] overflow-hidden bg-black" ref={emblaRef}>
                    <div className="flex h-full">
                        {heroImages.map((src, index) => (
                            <div className="relative flex-[0_0_100%] h-full" key={index}>
                                <Image
                                    src={src}
                                    alt={`Hero Slide ${index + 1}`}
                                    fill
                                    className="object-cover opacity-100 md:opacity-60"
                                    priority={index === 0}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full bg-black flex flex-col justify-center px-6.5 md:px-[12.5%] h-[160px] md:h-auto md:py-12">
                    <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center gap-4 md:gap-6 mb-4 md:mb-8">
                        <h1 className="font-[impact] text-[24px] md:text-[40px] text-white leading-[100%] md:leading-tight max-w-[1100px]">
                            {heroPost?.title || "Além das Fronteiras: Como a Líderi Destrava a Exportação para Empresas Brasileiras"}
                        </h1>
                        <Link href={heroPost?.slug ? `/blog/${heroPost.slug}` : "/blog"} className="hidden md:flex flex-shrink-0 items-center justify-center w-[52px] 2xl:w-[150px] h-[52px] bg-white border-2 border-[#87240E] rounded-[8px] font-montserrat font-medium text-[24px] leading-[24px] text-[#87240E] transition-all hover:bg-gray-50 hover:scale-105">
                            <span className="hidden 2xl:inline">Ver mais</span>
                            <ArrowRight className="2xl:hidden" size={30} color="#87240E" />
                        </Link>
                    </div>

                    <div className="flex gap-[8px] md:gap-[16px] w-[80px] h-[16px] items-center">
                        {heroImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => emblaApi?.scrollTo(index)}
                                className={`w-[8px] h-[8px] md:w-[16px] md:h-[16px] rounded-full transition-colors ${index === selectedIndex ? "bg-[#680000]" : "bg-[#FFB7A7] hover:bg-[#FFB7A7]/80"}`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="w-full px-6.5 md:px-[12.5%] py-16 md:py-24 bg-white">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h2 className="font-[impact] text-[36px] md:text-[48px] leading-[100%] text-N8 ml-[5px]">
                            Ultimas <span className="text-R5">postagens</span>
                        </h2>
                        <p className="font-montserrat font-normal text-[16px] md:text-[24px] leading-[24px] md:leading-[36px] tracking-[0.0288em] text-[#2D2D2D] mt-2 md:whitespace-normal whitespace-nowrap ml-[5px]">
                            Confira nossas ultimas postagens
                        </p>
                    </div>

                    <div className="w-full border-t-2 border-[#5E1504] md:hidden"></div>

                    <div className="flex items-center border border-[#2D2D2D] rounded-[8px] px-[12px] py-[11px] md:px-4 w-full md:w-[451px] h-[46px] md:h-[62px] bg-transparent focus-within:border-R5 transition-colors justify-between">
                        <input
                            type="text"
                            placeholder="Buscar postagens?"
                            className="outline-none flex-1 font-montserrat font-normal text-[16px] md:text-[20px] leading-[24px] md:leading-none text-[#000000] bg-transparent"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search size={24} className="text-[#2D2D2D] ml-2 cursor-pointer hover:text-R5 transition-colors flex-shrink-0 w-[24px] h-[24px]" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[24px] md:gap-x-[48px] gap-y-[24px] md:gap-y-[64px] w-full">
                    {loading ? (
                        <div className="col-span-full flex justify-center items-center py-12">
                            <p className="font-montserrat text-[#2D2D2D] text-[18px]">Carregando postagens do Sanity...</p>
                        </div>
                    ) : error ? (
                        <div className="col-span-full flex justify-center items-center py-12">
                            <p className="font-montserrat text-[#2D2D2D] text-[18px]">{error}</p>
                        </div>
                    ) : filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <div key={post._id} className="flex flex-col gap-4">
                                <Link href={post.slug ? `/blog/${post.slug}` : "/blog"} className="group relative flex flex-col justify-end w-full h-[202px] md:h-[256px] rounded-[8px] overflow-hidden shadow-[0px_4px_4px_0px_#08166D40]">
                                    <img
                                        src={post.imageUrl || "/assets/images/blog/materia1.png"}
                                        alt={post.title || "Post do blog"}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#000E31]/90 via-[#000E31]/40 to-transparent"></div>

                                    <div className="relative z-10 w-full px-[24px] py-[32px] md:p-4 flex flex-col justify-end h-full">
                                        <div className="flex items-center justify-between gap-[16px] w-full">
                                            <div className="flex items-center flex-1 h-[72px]">
                                                <h3 className="font-montserrat font-semibold text-[16px] leading-[24px] text-[#FFFFFF] line-clamp-3">
                                                    {post.title || "Post sem título"}
                                                </h3>
                                            </div>
                                            <div className="hidden md:flex flex-shrink-0 items-center justify-center w-[29px] h-[27px] bg-[#9D361F] border-2 border-[#87240E] rounded-[8px] transition-transform group-hover:scale-110">
                                                <img src="/assets/icon/arrow-card.svg" alt="Arrow" className="w-[12px] h-[12px]" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <div className="flex flex-col gap-1">
                                    <span className="font-montserrat font-normal text-[14px] leading-none text-[#2D2D2D]">
                                        {formatDate(post.publishedAt)}
                                    </span>
                                    {post.categories && post.categories.length > 0 ? (
                                        <span className="font-montserrat text-[12px] text-[#680000]">
                                            {post.categories.join(" • ")}
                                        </span>
                                    ) : null}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full flex justify-center items-center py-12">
                            <p className="font-montserrat text-[#2D2D2D] text-[18px]">Nenhuma postagem encontrada com "{searchQuery}".</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
