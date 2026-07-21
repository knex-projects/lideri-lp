"use client";

import type { BlogPost } from '@/src/types';
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Share, CirclePlay, CircleStop } from "lucide-react";
import { useParams } from "next/navigation";
import { api } from "@/src/services/api";
import { cms } from "@/src/services/cms";
import { LoadingScreen } from "@/src/components/layout/loading";



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

    const [post, setPost] = useState<BlogPost | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [isSpeaking, setIsSpeaking] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!slug) return;

        const fetchPostData = async () => {
            try {
                setLoading(true);
                const [postData, relatedData] = await cms.getPostPage(slug);

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

        void api.trackPostMetric(post._id, metric);
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

    if (loading) {
        return <LoadingScreen />;
      }
    

    return (
        <main className="w-full pt-29 bg-transparent relative min-h-screen">
            <style>{`
                @media (min-width: 48rem) {
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

            <div className="absolute top-0 left-0 w-full h-29 bg-[#0D1122] md:hidden -z-10"></div>

            <div id="sticky-parallax-header" className="relative md:fixed  md:top-0 left-0 w-full h-60 sm:h-[60vh] md:h-[85vh] -z-10 bg-black">
                <Image
                    src={post?.imageUrl ||"/assets/images/blog/materia1.png"}
                    alt={post?.title || ""}
                    fill
                    className="object-cover opacity-80 md:opacity-100"
                    priority
                />
                <div id="sticky-parallax-overlay" className="absolute inset-0 bg-black/40"></div>
            </div>

            <div className="w-full  md:mt-[85vh] bg-white shadow-[0rem_-0.625rem_1.875rem_rgba(0,0,0,0.1)] relative z-10 pt-10 md:pt-16 pb-24 px-6.5 xl:px-[12.5%]">

                <nav className="font-montserrat text-[0.875rem] md:text-[1rem] text-[#B1AFAF] font-normal mb-6 flex justify-center md:justify-start gap-2">
                    <Link href="/" className="hover:underline">Home</Link> <span className="text-[#6C6C6C]">&gt;</span> <Link href="/blog" className="hover:underline">Blog</Link> <span className="text-[#6C6C6C]">&gt;</span> <span className="text-[#2D2D2D]">Postagem</span>
                </nav>

                <h1 className="font-[impact] text-[2rem] md:text-[4rem] leading-[100%] md:leading-[1.1] text-N8 mb-8 tracking-wide">
                    {post?.title}
                </h1>

                <div className="flex flex-row justify-between md:justify-start pt-6 border-t border-[#6C6C6C] mb-8 font-montserrat w-full md:gap-20">
                    <div className="flex flex-col gap-1">
                        <span className="text-[0.875rem] md:text-[1.25rem] text-[#2D2D2D]">Escrito por:</span>
                        <span className="text-[1rem] md:text-[1.5rem] font-bold text-[#680000] leading-none">{post?.authorName}</span>
                    </div>
                    <div className="flex items-center gap-4 md:gap-8">
                        <div className="flex flex-col gap-1 text-left hidden md:flex">
                            <span className="text-[0.875rem] md:text-[1.25rem] text-[#2D2D2D]">Ultima alteração em:</span>
                            <span className="text-[1rem] md:text-[1.5rem] font-bold text-[#680000] leading-none">{formatDate(post?.publishedAt)}</span>
                        </div>
                        <div className="flex flex-col gap-1 text-left md:hidden">
                            <span className="text-[0.875rem] text-[#2D2D2D]">Alterado em:</span>
                            <span className="text-[1rem] font-bold text-[#680000] leading-none">{formatDate(post?.publishedAt)}</span>
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
                                    <span className="font-montserrat text-[#2D2D2D] text-[0.875rem] md:text-[1rem] font-medium hidden md:inline">
                                        {isSpeaking ? "Parar áudio" : post?.audioUrl ? "Ouvir matéria" : "Escutar matéria (Voz AI)"}
                                    </span>
                                </button>

                                {isSpeaking && post?.audioUrl && (
                                    <canvas
                                        ref={canvasRef}
                                        width={120}
                                        height={40}
                                        className="w-30 h-10 bg-transparent rounded-sm animate-fade-in"
                                    />
                                )}
                                <span className="font-montserrat text-[#2D2D2D] text-[14px] md:text-[18px] font-medium hidden md:inline">
                                    {isSpeaking ? "Parar de escutar" : "Escutar essa matéria"}
                                </span>
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
                        <h2 className="font-[impact] text-[2.25rem] leading-[100%] text-N8">
                            Postagens <span className="text-R5">relacionadas</span>
                        </h2>
                        <p className="font-montserrat font-normal text-[1rem] md:text-[1.5rem] leading-[1.5rem] tracking-[0.0288em] text-[#2D2D2D] mt-2">
                            Confira nossas ultimas postagens
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 w-full">
                        {relatedPosts.map((related) => (
                            <div key={related._id} className="flex flex-col gap-4">
                                <Link href={`/blog/${related.slug}`} className="group relative flex flex-col justify-end w-full h-50.5 md:h-64 rounded-[0.5rem] overflow-hidden shadow-[0rem_0.25rem_0.25rem_0rem_#08166D40]">
                                    <Image
                                        src={related.imageUrl || "/assets/images/blog/materia2.png"}
                                        alt={related.title}
                                        fill
                                        quality={100}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#000E31]/90 via-[#000E31]/40 to-transparent"></div>

                                    <div className="relative z-10 w-full px-6 py-8 md:p-4 flex flex-col justify-end h-full">
                                        <div className="flex items-center justify-between gap-4 w-full">
                                            <div className="flex items-center flex-1 h-18">
                                                <h3 className="font-montserrat font-semibold text-[1rem] leading-[1.5rem] text-[#FFFFFF] line-clamp-3">
                                                    {related.title}
                                                </h3>
                                            </div>
                                            <div className="hidden md:flex flex-shrink-0 items-center justify-center w-7.25 h-6.75 bg-[#9D361F] border-2 border-[#87240E] rounded-[0.5rem] transition-transform group-hover:scale-110">
                                                <img src="/assets/icon/arrow-card.svg" alt="Arrow" className="w-3 h-3" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <span className="font-montserrat font-normal text-[0.875rem] leading-none text-[#2D2D2D] md:hidden">
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
