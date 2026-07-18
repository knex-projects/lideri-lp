"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Share, CirclePlay, CircleStop } from "lucide-react";
import { useParams } from "next/navigation";
import { client } from "@/src/sanity/lib/client";

interface SanityPost {
    _id: string;
    title: string;
    body: string;
    publishedAt: string;
    authorName: string;
    imageUrl: string | null;
    audioUrl: string | null;
    categories: string[];
}

const postDetailQuery = `*[_type == "post" && slug.current == $slug && (!defined(publishedAt) || publishedAt <= now())][0]{
  _id,
  title,
  body,
  publishedAt,
  "authorName": coalesce(authorRaw, "Anônimo"),
  "imageUrl": coalesce(imagemDaGaleria->arquivo.asset->url, null),
  "audioUrl": coalesce(audioDescricao.asset->url, null),
  "categories": categories[]->title
}`;

const relatedPostsQuery = `*[_type == "post" && slug.current != $slug && (!defined(publishedAt) || publishedAt <= now())] | order(publishedAt desc)[0...3]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  "imageUrl": coalesce(imagemDaGaleria->arquivo.asset->url, null)
}`;

const formatDate = (value?: string | null) => {
    if (!value) return "Sem data";
    try {
        return new Date(value).toLocaleDateString("pt-BR");
    } catch {
        return value;
    }
};

export default function BlogPost() {
    const { slug } = useParams<{ slug: string }>();

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const animationRef = useRef<number | null>(null);

    const [post, setPost] = useState<SanityPost | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [isSpeaking, setIsSpeaking] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!slug) return;

        const fetchPostData = async () => {
            try {
                setLoading(true);
                const postData = await client.fetch<SanityPost>(postDetailQuery, { slug }, { useCdn: false });
                const relatedData = await client.fetch<any[]>(relatedPostsQuery, { slug }, { useCdn: false });

                setPost(postData);
                setRelatedPosts(relatedData || []);
            } catch (error) {
                console.error("Erro ao carregar o post do Sanity:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPostData();
    }, [slug]);

    const trackMetric = (metric: 'view' | 'share') => {
        if (!post?._id) return;

        void fetch(`/api/posts/${post._id}/metrics`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ metric }),
            keepalive: true,
        });
    };

    useEffect(() => {
        if (!post?._id) return;

        const trackingKey = `post-viewed:${post._id}`;
        if (window.sessionStorage.getItem(trackingKey)) return;

        window.sessionStorage.setItem(trackingKey, 'true');
        trackMetric('view');
    }, [post?._id]);

    useEffect(() => {
        return () => {
            if (window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    const isSpeakingRef = useRef(false);

const startVisualizer = (audioElement: HTMLAudioElement) => {
    if (!canvasRef.current) return;

    if (!audioContextRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const audioCtx = new AudioContextClass();
        const analyser = audioCtx.createAnalyser();
        
        const source = audioCtx.createMediaElementSource(audioElement);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        
        analyser.fftSize = 32;
        audioContextRef.current = audioCtx;
        analyserRef.current = analyser;
    }

    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext("2d");
    const analyser = analyserRef.current;
    
    if (!canvasCtx || !analyser) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
        if (!isSpeakingRef.current || !canvasRef.current) {
            if (canvasCtx) canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
            return;
        }

        animationRef.current = requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);

        const width = canvas.width;
        const height = canvas.height;
        canvasCtx.clearRect(0, 0, width, height);

        const barWidth = width / bufferLength;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            barHeight = (dataArray[i] / 255) * height;

            canvasCtx.fillStyle = "#680000";
            
            canvasCtx.fillRect(x, height - barHeight, barWidth - 3, barHeight);

            x += barWidth;
        }
    };

    draw();
};

const handleListen = () => {
    if (post?.audioUrl) {
        if (!audioRef.current) {
            audioRef.current = new Audio(post.audioUrl);
            audioRef.current.crossOrigin = "anonymous"; 
            audioRef.current.onended = () => {
                setIsSpeaking(false);
                isSpeakingRef.current = false;
                if (animationRef.current) cancelAnimationFrame(animationRef.current);
            };
        }

        if (isSpeaking) {
            audioRef.current.pause();
            setIsSpeaking(false);
            isSpeakingRef.current = false;
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        } else {
            setIsSpeaking(true);
            isSpeakingRef.current = true;
            void audioRef.current.play();
        }
        return;
    }

    if (!("speechSynthesis" in window)) return;
    if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        isSpeakingRef.current = false;
    } else {
        const articleElement = document.getElementById("article-content");
        if (articleElement) {
            const text = articleElement.innerText;
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "pt-BR";
            utterance.onend = () => {
                setIsSpeaking(false);
                isSpeakingRef.current = false;
            };
            window.speechSynthesis.speak(utterance);
            setIsSpeaking(true);
            isSpeakingRef.current = true;
        }
    }
};

useEffect(() => {
    if (isSpeaking && post?.audioUrl && audioRef.current) {
        startVisualizer(audioRef.current);
    }
}, [isSpeaking, post?.audioUrl]);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: post?.title || 'Post da Líderi',
                    url: window.location.href
                });
                trackMetric('share');
            } catch (err) {
                console.error("Erro ao compartilhar", err);
            }
        } else {
            try {
                await navigator.clipboard.writeText(window.location.href);
                trackMetric('share');
                alert("Link copiado para a área de transferência!");
            } catch (err) {
                console.error("Erro ao copiar o link", err);
            }
        }
    };

    return (
        <main className="w-full bg-transparent relative min-h-screen">
            <style>{`
                @media (min-width: 768px) {
                    @keyframes sticky-parallax-header-move-and-size {
                        to {
                            background-position: 50% 100%;
                            height: 10vh;
                        }
                    }
                    @keyframes sticky-parallax-color-fade {
                        to {
                            background-color: rgba(13, 17, 34, 0.9);
                        }
                    }
                    #sticky-parallax-header {
                        position: fixed !important;
                        top: 0;
                        z-index: 40 !important;
                        animation: sticky-parallax-header-move-and-size linear forwards;
                        animation-timeline: scroll();
                        animation-range: 0vh 85vh;
                    }
                    #sticky-parallax-overlay {
                        animation: sticky-parallax-color-fade linear forwards;
                        animation-timeline: scroll();
                        animation-range: 0vh 85vh;
                    }
                }
            `}</style>
            <div className="absolute top-0 left-0 w-full h-[116px] bg-[#0D1122] md:hidden -z-10"></div>

            <div id="sticky-parallax-header" className="absolute md:fixed top-[116px] md:top-0 left-0 w-full h-[240px] md:h-[85vh] -z-10 bg-black">
                <Image
                    src={post?.imageUrl || "/assets/images/blog/materia1.png"}
                    alt={post?.title || "sem imagem"}
                    fill
                    className="object-cover opacity-80 md:opacity-100"
                    priority
                />
                <div id="sticky-parallax-overlay" className="absolute inset-0 bg-black/40"></div>
            </div>

            <div className="w-full mt-[356px] md:mt-[85vh] bg-white shadow-[0px_-10px_30px_rgba(0,0,0,0.1)] relative z-10 pt-10 md:pt-16 pb-24 px-6.5 xl:px-[12.5%]">
                <nav className="font-montserrat text-[14px] md:text-[16px] text-[#B1AFAF] font-normal mb-6 flex justify-center md:justify-start gap-2">
                    <Link href="/" className="hover:underline">Home</Link> <span className="text-[#6C6C6C]">&gt;</span> <Link href="/blog" className="hover:underline">Blog</Link> <span className="text-[#6C6C6C]">&gt;</span> <span className="text-[#2D2D2D]">Postagem</span>
                </nav>

                <h1 className="font-[impact] text-[32px] md:text-[64px] leading-[100%] md:leading-[1.1] text-N8 mb-8 tracking-wide">
                    {post?.title}
                </h1>

                <div className="flex flex-row justify-between md:justify-start pt-6 border-t border-[#6C6C6C] mb-8 font-montserrat w-full md:gap-20">
                    <div className="flex flex-col gap-1">
                        <span className="text-[14px] md:text-[20px] text-[#2D2D2D]">Escrito por:</span>
                        <span className="text-[16px] md:text-[24px] font-bold text-[#680000] leading-none">{post?.authorName}</span>
                    </div>
                    <div className="flex items-center gap-4 md:gap-8">
                        <div className="flex flex-col gap-1 text-left hidden md:flex">
                            <span className="text-[14px] md:text-[20px] text-[#2D2D2D]">Ultima alteração em:</span>
                            <span className="text-[16px] md:text-[24px] font-bold text-[#680000] leading-none">{formatDate(post?.publishedAt)}</span>
                        </div>
                        <div className="flex flex-col gap-1 text-left md:hidden">
                            <span className="text-[14px] text-[#2D2D2D]">Alterado em:</span>
                            <span className="text-[16px] font-bold text-[#680000] leading-none">{formatDate(post?.publishedAt)}</span>
                        </div>

                        <div className="flex items-center gap-4 md:gap-6 ml-auto md:ml-0">
                            <button onClick={handleShare} className="flex items-center hover:scale-110 transition-transform" aria-label="Compartilhar">
                                <Share size={32} className="text-[#680000]" strokeWidth={1.5} />
                            </button>

                            <div className="flex flex-col md:flex-row items-start md:items-center gap-3 bg-gray-50 p-2 rounded-lg border border-gray-100">
                                <button onClick={handleListen} className="flex items-center gap-2 hover:scale-105 transition-transform">
                                    {isSpeaking ? (
                                        <CircleStop size={40} className="text-[#680000]" strokeWidth={1.5} />
                                    ) : (
                                        <CirclePlay size={40} className="text-[#680000]" strokeWidth={1.5} />
                                    )}
                                    <span className="font-montserrat text-[#2D2D2D] text-[14px] md:text-[16px] font-medium hidden md:inline">
                                        {isSpeaking ? "Parar áudio" : post?.audioUrl ? "Ouvir matéria" : "Escutar matéria (Voz AI)"}
                                    </span>
                                </button>

                                {isSpeaking && post?.audioUrl && (
                                    <canvas
                                        ref={canvasRef}
                                        width={120}
                                        height={40}
                                        className="w-[120px] h-[40px] bg-transparent rounded-sm animate-fade-in"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div 
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: post?.body|| "sem titulo" }} 
                />
               
                <div className="mt-20">
                    <div className="flex flex-col mb-10">
                        <h2 className="font-[impact] text-[36px] leading-[100%] text-N8">
                            Postagens <span className="text-R5">relacionadas</span>
                        </h2>
                        <p className="font-montserrat font-normal text-[16px] md:text-[24px] leading-[24px] tracking-[0.0288em] text-[#2D2D2D] mt-2">
                            Confira nossas ultimas postagens
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] md:gap-[48px] w-full">
                        {relatedPosts.map((related) => (
                            <div key={related._id} className="flex flex-col gap-4">
                                <Link href={`/blog/${related.slug}`} className="group relative flex flex-col justify-end w-full h-[202px] md:h-[256px] rounded-[8px] overflow-hidden shadow-[0px_4px_4px_0px_#08166D40]">
                                    <Image
                                        src={related.imageUrl || "/assets/images/blog/materia2.png"}
                                        alt={related.title}
                                        fill
                                        quality={100}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#000E31]/90 via-[#000E31]/40 to-transparent"></div>
                                    <div className="relative z-10 w-full px-[24px] py-[32px] md:p-4 flex flex-col justify-end h-full">
                                        <div className="flex items-center justify-between gap-[16px] w-full">
                                            <div className="flex items-center flex-1 h-[72px]">
                                                <h3 className="font-montserrat font-semibold text-[16px] leading-[24px] text-[#FFFFFF] line-clamp-3">
                                                    {related.title}
                                                </h3>
                                            </div>
                                            <div className="hidden md:flex flex-shrink-0 items-center justify-center w-[29px] h-[27px] bg-[#9D361F] border-2 border-[#87240E] rounded-[8px] transition-transform group-hover:scale-110">
                                                <img src="/assets/icon/arrow-card.svg" alt="Arrow" className="w-[12px] h-[12px]" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <span className="font-montserrat font-normal text-[14px] leading-none text-[#2D2D2D] md:hidden">
                                    {formatDate(related.publishedAt)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
