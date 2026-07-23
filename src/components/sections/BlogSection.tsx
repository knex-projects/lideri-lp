"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/src/sanity/lib/client";

interface SanityPostListItem {
    _id: string;
    title?: string | null;
    slug?: string | null;
    publishedAt?: string | null;
    imageUrl?: string | null;
    categories?: Array<string | null> | null;
}

const latestPostsQuery = `*[_type == "post" && status == "posted"] | order(publishedAt desc, _createdAt desc)[0...3] {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  "imageUrl": coalesce(imagemDaGaleria->arquivo.asset->url, null),
  "categories": categories[]->title
}`;

const formatDate = (value?: string | null) => {
    if (!value) return "Sem data";
    try {
        return new Date(value).toLocaleDateString("pt-BR");
    } catch {
        return value;
    }
};

export const BlogSection = () => {
    const [posts, setPosts] = useState<SanityPostListItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isActive = true;

        const fetchLatestPosts = async () => {
            try {
                setLoading(true);
                await fetch('/api/posts/publish-scheduled', { cache: 'no-store' });
                const data = await client.fetch<SanityPostListItem[]>(latestPostsQuery, {}, { useCdn: false });
                if (isActive) {
                    setPosts(data ?? []);
                }
            } catch (err) {
                console.error("Erro ao carregar os posts do BlogSection:", err);
            } finally {
                if (isActive) {
                    setLoading(false);
                }
            }
        };

        void fetchLatestPosts();

        return () => {
            isActive = false;
        };
    }, []);

    return (
        <section className="flex flex-col items-center pt-24 pb-12 px-6.5 md:pt-36 md:px-[12.5%]">
            <div className="w-full max-w-[1400px]">
                <div className="flex flex-col mb-12">
                    <h2 className="font-[impact] text-[36px] text-N8 md:text-[48px]">
                        Nosso <span className="text-R5">Blog.</span>
                    </h2>
                    <p className="font-montserrat text-sm text-N5 md:text-lg max-w-2xl md:text-[16px]">
                        Fique por dentro das principais publicações da Líderi e amplie sua visão sobre negócios e comércio exterior.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16 justify-items-center">
                    {loading ? (
                        <div className="col-span-full text-center text-N5 font-montserrat animate-pulse py-8">
                            Carregando postagens...
                        </div>
                    ) : posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post._id} className="flex flex-col w-full max-w-[453.33px]">
                                <Link
                                    href={post.slug ? `/blog/${post.slug}` : "/blog"}
                                    className="group relative flex flex-col justify-end w-full h-[279px] rounded-[8px] overflow-hidden mb-3"
                                >
                                    <Image
                                        src={post.imageUrl || "/assets/images/blog/materia1.png"}
                                        alt={post.title || "Post do blog"}
                                        fill
                                        quality={100}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#000E31]/90 via-[#000E31]/40 to-transparent"></div>

                                    <div className="relative z-10 w-full h-full">
                                        <div className="absolute bottom-[32px] md:bottom-[40px] left-[16px] flex flex-col gap-[4px] w-[calc(100%-32px)]">
                                            <h3 className="font-montserrat text-[16px] md:text-[18px] font-bold text-N1 leading-[20px] md:leading-[22px] w-full line-clamp-2 xl:line-clamp-none xl:truncate">
                                                {post.title || "Post sem título"}
                                            </h3>
                                            <p className="font-montserrat text-[10px] md:text-[14px] text-N3 leading-[14px] md:leading-[17px] w-[calc(100%-80px)] md:w-[calc(100%-96px)] xl:max-w-[319px] min-h-[28px] md:min-h-[34px] line-clamp-2">
                                                {post.categories?.filter(Boolean).join(" • ") || "Postagem recente"}
                                            </p>
                                        </div>
                                        <div className="absolute bottom-[16px] right-[16px] flex items-center justify-center w-[54px] h-[40px] md:w-[71.05px] md:h-[54.48px] rounded-[8px] border-2 border-N1/30 bg-transparent transition-colors group-hover:border-N1/50">
                                            <img src="/assets/icon/arrow-right-blog.svg" alt="Seta" className="w-[18px] md:w-[28px]" />
                                        </div>
                                    </div>
                                </Link>
                                <span className="font-montserrat text-xs text-N5 pl-1">
                                    {formatDate(post.publishedAt)}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-N5 font-montserrat py-8">
                            Nenhum post encontrado no Sanity.
                        </div>
                    )}
                </div>

                <div className="flex justify-center w-full">
                    <Link
                        href="/blog"
                        className="flex items-center justify-center gap-[8px] whitespace-nowrap bg-R5 text-N1 font-montserrat text-[14px] md:text-[16px] font-normal md:font-medium leading-none md:leading-[24px] text-center w-[177px] h-[40px] md:w-[208px] md:h-[52px] px-[24px] py-[12px] rounded-[8px] hover:bg-R8 transition-all"
                    >
                        Visite nosso blog
                        <img src="/assets/icon/arrow-up-right-blog-mobile.svg" alt="Visite" className="block md:hidden" />
                        <img src="/assets/icon/arrow-up-right-blog.svg" alt="Visite" className="hidden md:block" />
                    </Link>
                </div>
            </div>
        </section>
    );
};
