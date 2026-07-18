"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Share, CirclePlay, CircleStop } from "lucide-react";

const relatedPosts = [
    {
        id: 1,
        title: "Incoterms: Tudo o que você precisa saber para levar o seu negócio além",
        image: "/assets/images/blog/materia2.png",
        link: "/blog/incoterms",
        date: "23/04/2023",
    },
    {
        id: 2,
        title: "Conheça os Casos de Sucesso da Líderi Consultoria",
        image: "/assets/images/blog/materia3.jpg",
        link: "/blog/casos-de-sucesso",
        date: "22/04/2023",
    },
    {
        id: 3,
        title: "Diferenças culturais que podem virar oportunidades de negócio",
        image: "/assets/images/blog/materia5.jpg",
        link: "/blog/diferencas-culturais",
        date: "20/04/2023",
    },
];

export default function BlogPost() {
    const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {
        return () => {
            if (window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    const handleListen = () => {
        if (!("speechSynthesis" in window)) {
            alert("Seu navegador não suporta a leitura de texto em voz alta.");
            return;
        }

        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        } else {
            const articleElement = document.getElementById("article-content");
            if (articleElement) {
                const text = articleElement.innerText;
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = "pt-BR";
                
                utterance.onend = () => setIsSpeaking(false);
                utterance.onerror = () => setIsSpeaking(false);
                
                window.speechSynthesis.speak(utterance);
                setIsSpeaking(true);
            }
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "O 'Tarifaço' estadunidense: Quais seus impactos no mercado brasileiro e como contorná-lo?",
                    url: window.location.href
                });
            } catch (err) {
                console.error("Erro ao compartilhar", err);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copiado para a área de transferência!");
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
                    src="/assets/images/blog/materia1.png"
                    alt="O 'Tarifaço' estadunidense: Quais seus impactos no mercado brasileiro e como contorná-lo?"
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
                    O 'Tarifaço' estadunidense: Quais seus impactos no mercado brasileiro e como contorná-lo?
                </h1>

                <div className="flex flex-row justify-between md:justify-start pt-6 border-t border-[#6C6C6C] mb-8 font-montserrat w-full md:gap-20">
                    <div className="flex flex-col gap-1">
                        <span className="text-[14px] md:text-[20px] text-[#2D2D2D]">Escrito por:</span>
                        <span className="text-[16px] md:text-[24px] font-bold text-[#680000] leading-none">Redator chave</span>
                    </div>
                    <div className="flex items-center gap-4 md:gap-8">
                        <div className="flex flex-col gap-1 text-left hidden md:flex">
                            <span className="text-[14px] md:text-[20px] text-[#2D2D2D]">Ultima alteração em:</span>
                            <span className="text-[16px] md:text-[24px] font-bold text-[#680000] leading-none">24/02/2026</span>
                        </div>
                        <div className="flex flex-col gap-1 text-left md:hidden">
                            <span className="text-[14px] text-[#2D2D2D]">Alterado em:</span>
                            <span className="text-[16px] font-bold text-[#680000] leading-none">24/02/2026</span>
                        </div>
                        
                        <div className="flex items-center gap-4 md:gap-6 ml-auto md:ml-0">
                            <button onClick={handleShare} className="flex items-center hover:scale-110 transition-transform group flex-shrink-0" aria-label="Compartilhar">
                                <Share size={32} className="text-[#680000]" strokeWidth={1.5} />
                            </button>
                            <button onClick={handleListen} className="flex items-center gap-2 hover:scale-105 transition-transform">
                                {isSpeaking ? (
                                    <CircleStop size={40} className="text-[#680000]" strokeWidth={1.5} />
                                ) : (
                                    <CirclePlay size={40} className="text-[#680000]" strokeWidth={1.5} />
                                )}
                                <span className="font-montserrat text-[#2D2D2D] text-[14px] md:text-[16px] font-medium hidden md:inline">
                                    {isSpeaking ? "Parar de escutar" : "Escutar essa matéria"}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                <article id="article-content" className="font-montserrat font-normal text-[18px] md:text-[24px] leading-relaxed text-[#2D2D2D] mb-16 space-y-6 md:space-y-8">
                    <p className="mb-6">
                        Recentemente, assistimos a uma mudança significativa no cenário global: a aprovação de uma nova estratégia de tarifas por parte do governo dos Estados Unidos. A iniciativa do governo, anunciada em janeiro de 2026, tem o potencial de afetar substancialmente as dinâmicas da economia estadunidense, aplicando tarifas sobre produtos importados que vão de 10% a 20%, e no Brasil falou-se em tarifas de até 50%.
                    </p>
                    <p className="mb-6">
                        À medida que o país aplica essas barreiras, o mercado se ajusta à nova realidade. Muitos questionam como essa medida afeta o produtor, o exportador e a população em geral. Com o aumento de barreiras tarifárias, o preço de insumos cruciais pode encarecer e o custo de vida inflar. Dentre os setores que sentem o impacto inicial, destacam-se a siderurgia, mineração, combustíveis e equipamentos de construção civil.
                    </p>
                    <p className="mb-6">
                       O Ministério do Desenvolvimento, Indústria, Comércio e Serviços (Mdic) estima que pouco mais de 55% das exportações brasileiras aos EUA enfrentam o teto tarifário dos 50%, número e realidade que assustam qualquer exportador. Mas, como já é bem sabido por quem sabe de comércio internacional, toda crise traz consigo uma faca de dois gumes: uma adversidade, mas também uma oportunidade. Por que não enxergar a referida adversidade como uma oportunidade de expansão do produto para novos mercados? As consequências desse tarifaço são diversas, vão desde retrações nas exportações até restrições a tecnologias estratégicas, como bem explica Lauro Accioly, mestre em Relações Internacionais pela UFPB e atual doutorando em R.I. pela San Tiago Dantas (UNESP/UNICAMP/PUC-SP): "Não podemos desconectar também essas ações do contexto de complexidade das cadeias produtivas, especialmente na indústria tecnológica. Todo esse cenário remete muito dos debates da disputa tecno geopolítica: a busca pela redução de dependência em cadeias produtivas que compõem o processo de corrida tecnológica pela Inteligência Artificial. Curiosamente, durante as negociações do tarifaço, o encarregado de negócios da Embaixada dos EUA, Gabriel Escobar, tratou do tema com o Instituto Brasileiro de Mineração (Ibram) — levantando suspeitas de que tais recursos pudessem ser usados como moeda de troca, além de serem componentes essenciais sob domínio chinês para fabricação de dispositivos computacionais de extrema valia à indústria tech. Portanto, nota-se que não são assuntos isolados e desconectados." Em outras palavras, esse assunto vai para além de pautas de exportação, sendo também de importância geopolítica para o Brasil. A principal solução para mitigar esses impactos é a diversificação de mercados, dado que a medida do governo Trump pode ser lida não como caso isolado, mas sim como uma reconfiguração das relações econômicas e políticas globais. A Líderi te ajuda com isso. Desde estudos de mercado com diferentes opções de países promissores até serviços de prospecção internacional e análise logística, nossa consultoria mitiga possíveis receios que você, como exportador, venha a sentir com todo o processo da exportação.
                    </p>
                    
                    <div className="mt-16">
                        <h3 className="font-montserrat font-bold text-[16px] md:text-[24px] text-[#680000] mb-4">Referências:</h3>
                        <ul className="flex flex-col font-montserrat text-[12px] md:text-[24px] text-[#4B4B4B] space-y-4 break-all">
                            <li>
                                <Link href="#" className="hover:underline">
                                    https://www.cnnbrasil.com.br/economia/macroeconomia/tarifaco-veja-impactos-em-principais-setores-brasileiros-atingidos/
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    https://www.thomsonreuters.com.br/pt/tax-accounting/comercio-exterior/blog/tarifa-trump.html
                                </Link>
                            </li>
                        </ul>
                    </div>
                </article>

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
                        {relatedPosts.map((post) => (
                            <div key={post.id} className="flex flex-col gap-4">
                                <Link href={post.link} className="group relative flex flex-col justify-end w-full h-[202px] md:h-[256px] rounded-[8px] overflow-hidden shadow-[0px_4px_4px_0px_#08166D40]">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        quality={100}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#000E31]/90 via-[#000E31]/40 to-transparent"></div>
                                    
                                    <div className="relative z-10 w-full px-[24px] py-[32px] md:p-4 flex flex-col justify-end h-full">
                                        <div className="flex items-center justify-between gap-[16px] w-full">
                                            <div className="flex items-center flex-1 h-[72px]">
                                                <h3 className="font-montserrat font-semibold text-[16px] leading-[24px] text-[#FFFFFF] line-clamp-3">
                                                    {post.title}
                                                </h3>
                                            </div>
                                            <div className="hidden md:flex flex-shrink-0 items-center justify-center w-[29px] h-[27px] bg-[#9D361F] border-2 border-[#87240E] rounded-[8px] transition-transform group-hover:scale-110">
                                                <img src="/assets/icon/arrow-card.svg" alt="Arrow" className="w-[12px] h-[12px]" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <span className="font-montserrat font-normal text-[14px] leading-none text-[#2D2D2D] md:hidden">
                                    {post.date}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
