"use client"
import type { ProcessCard } from '@/src/types';
import Analise from "@/public/assets/icon/analise.svg";
import Cadastro from "@/public/assets/icon/cadastro.svg";
import Clientes from "@/public/assets/icon/clientes.svg";
import Estudo from "@/public/assets/icon/estudo.svg";
import Fornecedores from "@/public/assets/icon/fornecedores.svg";
import Logistica from "@/public/assets/icon/logistica.svg";
import Translate from "@/public/assets/icon/traducaoPortfolio.svg";
import Planejamento from "@/public/assets/icon/planejamento.svg";
import Produtos from "@/public/assets/icon/produtos.svg";
import Prospeccao from "@/public/assets/icon/prospeccao.svg";
import { ArrowRight } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProcessSection() {
    

    const processCardItem: ProcessCard[] = [
        { id: 1, icon: Analise, title: "Análise de Conjuntura", descrição: "Visão global do cenário internacional dos mercados e produtos específicos.  " },
        { id: 2, icon: Estudo, title: "Estudo de Mercado", descrição: "Base de dados atualizada e uma análise assertiva sobre o mercado-alvo." },
        { id: 3, icon: Planejamento, title: "Planejamento Burocrático", descrição: "Levantamento dos documentos necessários. " },
        { id: 4, icon: Prospeccao, title: "Prospecção Internacional", descrição: "Levantamento de clientes ou revendedores internacionais." },
        { id: 5, icon: Cadastro, title: "Cadastro no Radar Siscomex", descrição: "Orientação para cadastramento no Radar. " },
        { id: 6, icon: Clientes, title: "Prospecção Nacional", descrição: "Levantamento de clientes ou revendedores nacionais." },
        { id: 7, icon: Fornecedores, title: "Prospecção Nacional de Fornecedores", descrição: "Levantamento de fornecedores nacionais de produtos. " },
        { id: 8, icon: Logistica, title: "Análise Logística", descrição: "Consideração sobre as etapas do deslocamento da mercadoria. " },
        { id: 9, icon: Produtos, title: "Análise de Produtos", descrição: "Entendimento do comportamento de cada produto em potencial no mercado internacional." },
        { id: 10, icon: Translate, title: " Tradução de portfólio ", descrição: "Tradução do portfólio visando o(s) mercado(s) internacional(is) destino." },
    ];

    const [activeCard, setActiveCard] = useState<number>(10);

    return (
        <section id="processo" className="bg-N1 md:px-[12.5%] px-6.5 w-full h-fit min-h-266.25 sm:min-h-320 flex-col  sm:grid  sm:gap-12 pb-15.5">
            <div className="grid gap-2 max-sm:mt-8 max-sm:mb-6.5">
                <h1 className=" font-zodiak text-4xl sm:text-5xl text-N8 font-normal  max-w-128">Para o seu problema, a Líderi tem a  <strong className="text-R5 font-normal">solução.</strong></h1>
                <p className="text-N5 text-[0.875rem] sm:text-[1rem] font-montserrat max-w-139.25">Entenda o passo a passo de como exportar com sucesso com nossa empresa.  </p>
            </div>
            <div className="grid absolute sm:relative sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 items-stretch content-between justify-items-stretch gap-x-11  gap-y-13 ">
                {processCardItem.map((item) => (
                    <div key={item.id} className={` max-sm:hidden max-w-82.5  min-h-70 h-auto relative rounded-[0.5rem] pt-9 pb-6.5  px-10 text-center flex flex-col justify-between  items-center hover:ring-R5 shadow-[0.125rem_0.125rem_0.5rem_rgba(0,0,0,0.4)] hover:shadow-[0rem_0.0625rem_0.5rem_#87240E] ring-[0.125rem] hover:ring-[0.15625rem] duration-300  ease-out  transition-all text-black ring-[rgba(0,0,0,0.2)]  ${item.id == 9 ? "2xl:col-start-2 " : " "}`}><h1 className="absolute top-1 left-5 text-[2.5rem] font-normal font-zodiak hidden text-N8">{item.id}</h1>
                        <Image src={item.icon} alt={item.title} className="h-15" />
                        <h2 className="mt-5 font-montserrat font-bold text-[1.125rem]">{item.title}</h2>
                        <p className="text-N5 text-[1rem]">{item.descrição}</p>
                         <Link href="/servicos" className="w-full flex justify-end pt-3">
                                <div>
                                    <ArrowRight color="#680000" className="size-4 " /> 
                                    </div>

                            </Link>
                        </div>
                ))}
            </div>
            <div>
                {processCardItem.map((item, index) => (
                    <div
                        key={item.id}
                        style={{ zIndex: index }}
                        className="sm:hidden w-auto min-h-38 relative -mt-2.5 rounded-[0.5rem] py-4.75 px-4 flex justify-between items-center bg-white shadow-[0.125rem_0.125rem_0.5rem_rgba(0,0,0,0.4)] border-2 border-black/20 hover:border-R5 hover:shadow-[0rem_0.0625rem_0.5rem_rgba(135, 36, 14, 1)] transition-shadow  duration-300 ease-out  text-black"
                    >
                        <Image src={item.icon} alt={item.title} className="size-12.5  object-contain" />

                        <div className="px-5 w-full flex flex-col gap-1">
                            <h3 className="text-[1rem] font-montserrat font-bold text-N8">
                                {item.title}
                            </h3>
                            <p className="text-N5 text-[0.875rem] font-montserrat font-normal leading-tight">
                                {item.descrição}
                                
                            </p>
                           
                        </div>
                             <Link href="/servicos">
                                <div>
                                    <ArrowRight color="#680000" className="size-4  " /> 
                                    </div>

                            </Link>
                    </div>
                ))}
            </div>

        </section>

    );
}