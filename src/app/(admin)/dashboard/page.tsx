import React from 'react';
import { Pencil } from 'lucide-react';
import { Stoke } from 'next/font/google';
import PostCardCMS from '@/src/components/cards/postCard';

const postsRecentes = [
  {
    titulo: "Como exportar produtos para o japão?",
    categoria: "Vendas",
    autor: "Belcrano",
    data: "23/05/2040",
    imageSrc: ""
  },
  {
    titulo: "Como exportar produtos para a jamaica?",
    categoria: "Vendas",
    autor: "Belcrano",
    data: "23/05/2040",
    imageSrc: ""
  },
  {
    titulo: "Como exportar produtos para o Qatar?",
    categoria: "Vendas",
    autor: "Belcrano",
    data: "23/05/2040",
    imageSrc: ""
  },
  {
    titulo: "Quais são os requisitos legais para importar alimentos?",
    categoria: "Logística",
    autor: "Ciclano",
    data: "12/11/2039",
    imageSrc: ""
  },
  {
    titulo: "Estratégias para aumentar vendas no mercado europeu",
    categoria: "Marketing",
    autor: "Fulano",
    data: "05/02/2041",
    imageSrc: ""
  }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen w-full bg-[rgb(255,255,255)] font-sans flex flex-col items-start justify-start">

      <main className="w-full min-h-[calc(100vh-98px)] bg-[rgb(240,240,240)] p-4 md:p-8 flex flex-col gap-8">

     
        <section className="w-full grid grid-cols-2 xl:grid-cols-3 gap-[8px]   md:gap-[34px] items-stretch">

          {/* Card 1 */}
          <div className="w-full min-h-[172px] md:min-h-[217px] h-auto bg-white border-2 border-[rgb(218,218,218)] rounded-lg p-5 md:p-8 flex flex-col justify-between gap-4">
            <h3 className="font-['Montserrat'] text-[clamp(1.25rem,2.5vw,2rem)] font-normal text-black ">
              Total de
              Comparti
              lhamentos
            </h3>
            <div className="flex flex-wrap items-start gap-4 md:gap-8">
              <span className="font-['Impact'] text-[clamp(2.5rem,7vw,5.5rem)] flex leading-none font-normal text-[rgb(135,36,14)]">
                20
              </span>
              <div className="flex flex-col justify-center">
                <span className="font-['Montserrat'] text-[clamp(1rem,1.8vw,1.5rem)] font-normal text-black leading-tight">Compartilhamentos</span>
                <span className="font-['Montserrat'] text-[clamp(0.875rem,1.5vw,1.25rem)] font-normal text-[rgb(28,0,0)]">+2 Compartilhados</span>
              </div>
            </div>
          </div>


          <div className="w-full min-h-[172px] md:min-h-[217px] h-auto bg-white border-2 border-[rgb(218,218,218)] rounded-lg p-4 md:p-8 flex flex-col justify-between gap-4">
            <h3 className="font-['Montserrat'] text-[clamp(1.25rem,2.5vw,2rem)] font-normal text-black break-words">
              Total de publicações
            </h3>
            <div className="flex  flex-wrap items-start gap-4 md:gap-8">
              <span className="font-['Impact'] text-[clamp(2.5rem,7vw,5.5rem)] leading-none font-normal text-[rgb(135,36,14)]">
                150
              </span>
              <div className="flex flex-col justify-center">
                <span className="font-['Montserrat'] text-[clamp(1rem,1.8vw,1.5rem)] font-normal text-[rgb(28,0,0)] leading-none">Publicações</span>
                <span className="font-['Montserrat'] text-[clamp(0.875rem,1.5,1.25rem)] font-normal text-[rgb(28,0,0)] mt-1">+15 publicações</span>
              </div>
            </div>
          </div>

          <div className="w-full min-h-[172px] md:min-h-[217px] max-lg:col-span-2  h-auto bg-white border-2 border-[rgb(218,218,218)] rounded-lg p-5 md:p-8 flex flex-col justify-between gap-4">
            <h3 className="font-['Montserrat'] text-[clamp(1.25rem,2.5vw,2rem)] font-normal text-black break-words">
              Total de visualizações
            </h3>
            <div className="flex flex-wrap items-start gap-4 md:gap-8">
              <span className="font-['Impact'] text-[clamp(2.5rem,6vw,5.5rem)] leading-none font-normal text-[rgb(135,36,14)]">
                3K
              </span>
              <div className="flex flex-col justify-center">
                <span className="font-['Montserrat'] text-[clamp(1rem,1.8vw,1.5rem)] font-normal text-black leading-none">Visualizações</span>
                <span className="font-['Montserrat'] text-[clamp(0.875rem,1.5vw,1.25rem)] font-normal text-[rgb(28,0,0)] mt-1">+30 visualizações</span>
              </div>
            </div>
          </div>

        </section>
        <section className="w-full bg-white border-2 border-[rgb(218,218,218)] rounded-lg p-5 md:p-8 flex flex-col gap-8">
          <h2 className="font-['Impact'] text-[32px] md:text-[48px] font-normal text-black">
            Postagens <span className='text-R5'>recentes</span>
          </h2>

          <div className="w-full flex flex-col gap-6">
            {postsRecentes.map((post, idx) => (
              <PostCardCMS key={idx} {...post} />
            ))}
          </div>

        </section>xx
      </main>
    </div>
  );
}