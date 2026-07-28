"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/src/services/api";
import { cms } from "@/src/services/cms";
import type { PostListItem } from "@/src/types";

const formatDate = (value?: string | null) => {
    if (!value) return "Sem data";
    try {
        return new Date(value).toLocaleDateString("pt-BR");
    } catch {
        return value;
    }
};

export const BlogSection = () => {
    const [posts, setPosts] = useState<PostListItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isActive = true;

        const fetchLatestPosts = async () => {
            try {
                setLoading(true);
                await api.publishScheduledPosts();
                const data = await cms.getLatestPosts();
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
            <div className="w-full max-w-350">
                <div className="flex flex-col mb-12">
                    <h2 className="font-[impact] text-[2.25rem] text-N8 md:text-[3rem]">
                        Nosso <span className="text-R5">Blog.</span>
                    </h2>
                    <p className="mt-4 font-montserrat text-sm text-N5 md:text-lg max-w-2xl">
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
                            <div key={post._id} className="flex flex-col w-full max-w-113.3325">
                                <Link
                                    href={post.slug ? `/blog/${post.slug}` : "/blog"}
                                    className="group relative flex flex-col justify-end w-full h-69.75 rounded-[0.5rem] overflow-hidden mb-3"
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
                                        <div className="absolute bottom-8 md:bottom-10 left-4 flex flex-col gap-1 w-[calc(100%-2rem)]">
                                            <h3 className="font-montserrat text-[1rem] md:text-[1.125rem] font-bold text-N1 leading-[1.25rem] md:leading-[1.375rem] w-full line-clamp-2 xl:line-clamp-none xl:truncate">
                                                {post.title || "Post sem título"}
                                            </h3>
                                            <p className="font-montserrat text-[0.625rem] md:text-[0.875rem] text-N3 leading-[0.875rem] md:leading-[1.0625rem] w-[calc(100%-5rem)] md:w-[calc(100%-6rem)] xl:max-w-79.75 min-h-7 md:min-h-8.5 line-clamp-2">
                                                {post.categories?.filter(Boolean).join(" • ") || "Postagem recente"}
                                            </p>
                                        </div>
                                        <div className="absolute bottom-4 right-4 flex items-center justify-center w-13.5 h-10 md:w-17.7625 md:h-13.62 rounded-[0.5rem] border-2 border-N1/30 bg-transparent transition-colors group-hover:border-N1/50">
                                            <img src="/assets/icon/arrow-right-blog.svg" alt="Seta" className="w-4.5 md:w-7" />
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
                        className="flex items-center justify-center gap-2 whitespace-nowrap bg-R5 text-N1 font-montserrat text-[0.875rem] md:text-[1rem] font-normal md:font-medium leading-none md:leading-[1.5rem] text-center w-44.25 h-10 md:w-52 md:h-13 px-6 py-3 rounded-[0.5rem] hover:bg-R8 transition-all"
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
