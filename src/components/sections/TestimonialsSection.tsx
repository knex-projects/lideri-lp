"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import Caminhao from "@/public/assets/icon/caminhao.svg";
import { TestimonialCard, type Testimonial } from "@/src/components/cards/TestimonialCard";

const testimonials: Testimonial[] = [
  {
    name: "Marta Bezerra",
    role: "Gerente de projetos 2024.1 e 2025.1",
    quote:
      "Participar da Líderi foi o início da minha trajetória profissional e uma das experiências mais transformadoras que vivi.",
    avatarUrl: "/assets/images/marta_bezerra.jpg",
  },
  {
    name: "Victoria Rodrigues",
    role: "Diretora de projetos 2023",
    quote:
      "A Líderi foi essencial para me abrir portas no mercado sênior, pois me proporcionou vivências e responsabilidades que aceleraram meu desenvolvimento.",
    avatarUrl: "/assets/images/victoria_rodrigues.jpg",
  },
  {
    name: "Júlia Almeida",
    role: "Diretora de Gestão de Pessoas 2024.2 e 2025",
    quote:
      "Minha experiência na Líderi foi transformadora. Vivi momentos de alegria, conquistas e aquele sentimento genuíno de dever cumprido.",
    avatarUrl: "/assets/images/julia_almeida.jpg",
  },
  {
    name: "Rebeca Paiva",
    role: "Diretoria de projetos 2025",
    quote:
      "Passei dois anos e poucos meses na empresa júnior, período em que tive a oportunidade de crescer constantemente através dos desafios, aprendizados e conexões que vivi no Movimento Empresa Júnior.",
    avatarUrl: "/assets/images/rebeca_paiva.jpg",
  },
  {
    name: "Lóis Queirós",
    role: "Diretor de Vendas 2023",
    quote:
      "A Líderi foi um passo essencial na minha trajetória profissional, e eu tenho muita satisfação em ter contribuído para a empresa e muito orgulho do que construí durante meu período como membro.",
    avatarUrl: "/assets/images/lois_queiros.jpg",
  },
  {
    name: "Lúcio Filho",
    role: "Vice-Presidente 2023",
    quote:
      "Em mais de um ano na empresa cresci e desenvolvi habilidades que me ajudaram tanto na vida profissional, como acadêmica e pessoal, com mais conhecimento e certeza sobre quem sou, onde posso chegar.",
    avatarUrl: "/assets/images/lucio_filho.jpg",
  },
];

export const TestimonialsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onInit = useCallback((api: typeof emblaApi) => {
    if (!api) return;
    setScrollSnaps(api.scrollSnapList());
  }, []);

  const onSelect = useCallback((api: typeof emblaApi) => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    const isLast = emblaApi.selectedScrollSnap() === emblaApi.scrollSnapList().length - 1;
    if (isLast) {
      emblaApi.scrollTo(0);
    } else {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <section className="py-16 w-full font-sans">
      <div className="flex flex-col gap-6 px-[26px] sm:px-[12.5%] mb-10 lg:mb-12">
        <Image
          src={Caminhao}
          alt="Caminhão icon"
          className="w-[168px] h-[43px] sm:w-[210px] sm:h-[54px] lg:w-[251px] lg:h-[64px]"
          style={{ height: "auto" }}
        />

        <div className="flex flex-col gap-2 max-w-[560px]">
          <h2 className="font-zodiak font-bold text-[28px] min-[360px]:text-[36px] md:text-[42px] lg:text-[48px] leading-[1.15] text-N8">
            Experiências reais em cada{" "}
            <span className="text-R5">depoimento.</span>
          </h2>
          <p className="font-poppins text-[14px] lg:text-[16px] text-N5 leading-snug max-w-[380px]">
            Ouça agora um pequeno relato da experiência de pós-juniores com a Lídere.
          </p>
        </div>
      </div>

      <div className="overflow-hidden max-[500px]:px-[26px] min-[501px]:px-[12.5%]" ref={emblaRef}>
        <div className="flex ml-[-32px] max-[500px]:ml-[-120px]">
          {testimonials.map((t, index) => (
            <div key={index} className="pl-8 max-[500px]:pl-[120px]">
              <TestimonialCard testimonial={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

