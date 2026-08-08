"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { TestimonialCard } from "@/src/components/cards/TestimonialCard";
import type { Testimonial } from "@/src/types";

const testimonials: Testimonial[] = [
  {
    name: "Ulenice Casado",
    role: "Bodega de Sabores",
    quote:
      "A consultoria da Lideri fortaleceu a presença digital da Bodega de Sabores por meio das redes sociais e da implementação do site, ampliando a visibilidade da marca e das feiras. A parceria contribuiu para atrair novos clientes, fortalecer o empreendedorismo feminino e impulsionar as vendas.",
    avatarUrl: "/assets/images/testimonials/ulenice_casado.webp",
  },
  {
    name: "Alessandra Ribeiro",
    role: "Eu Caramelo",
    quote:
      "A Lideri conduziu o projeto da Eu Caramelo com profissionalismo, dedicação e atenção em todas as etapas do atendimento. A parceria foi marcada pelo comprometimento da equipe, resultando em uma experiência muito positiva e recomendável.",
    avatarUrl: "/assets/images/testimonials/alessandra_ribeiro.webp",
  },
  {
    name: "Pedro Costa",
    role: "Tachão de Ubatuba",
    quote:
      "A consultoria de negócios internacionais da Lideri forneceu dados estratégicos e bem estruturados, contribuindo para uma tomada de decisão mais segura. O trabalho destacou-se pela qualidade, profissionalismo e comprometimento da equipe. Recomendo!",
    avatarUrl: "/assets/images/testimonials/pedro_costa.jpg",
  },
];

export const TestimonialsSection = () => {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      watchDrag: true,
    },
    [
      Autoplay({
        delay: 3000,
        stopOnMouseEnter: true,
        stopOnInteraction: false,
        playOnInit: true,
      }),
    ],
  );

  return (
    <section className="py-16 w-full font-sans overflow-hidden">
      <div className="flex flex-col gap-6 px-6.5 md:px-[12.5%] mb-10 lg:mb-12">
        <div className="flex flex-col gap-2 max-w-140">
          <h2 className="font-zodiak font-normal text-[1.75rem] min-[22.5rem]:text-[2.25rem] md:text-[2.625rem] lg:text-[3rem] leading-[1.15] text-N8">
            Experiências reais em cada{" "}
            <span className="text-R5">depoimento.</span>
          </h2>
          <p className="font-montserrat text-[0.875rem] lg:text-[1rem] text-N5 leading-snug max-w-139.25">
            Ouça agora um pequeno relato da experiência de clientes com a Líderi.
          </p>
        </div>
      </div>

      <div className="hidden min-[68.75rem]:block px-6.5 md:px-[12.5%]">
        <div className="flex flex-wrap justify-center gap-20">
          {testimonials.map((t, index) => (
            <TestimonialCard key={index} testimonial={t} />
          ))}
        </div>
      </div>

      <div className="block min-[68.75rem]:hidden w-full">
        <div className="embla__viewport overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((t, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0 flex justify-center px-6.5 py-4">
                <TestimonialCard testimonial={t} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
