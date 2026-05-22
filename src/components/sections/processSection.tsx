"use client"
import Analise from "@/public/assets/icon/analise.svg";
import Cadastro from "@/public/assets/icon/cadastro.svg";
import Clientes from "@/public/assets/icon/clientes.svg";
import Estudo from "@/public/assets/icon/estudo.svg";
import Fornecedores from "@/public/assets/icon/fornecedores.svg";
import Logistica from "@/public/assets/icon/logistica.svg";
import Marketing from "@/public/assets/icon/marketing.svg";
import Planejamento from "@/public/assets/icon/planejamento.svg";
import Produtos from "@/public/assets/icon/produtos.svg";
import Prospeccao from "@/public/assets/icon/prospeccao.svg";
import Image, { type StaticImageData } from "next/image";
import { useState } from "react";

export default function ProcessSection() {
    interface processCardType {
        id: number;
        icon: StaticImageData;
        title: string;
        descrição: string;
    }

    const processCardItem: processCardType[] = [
        { id: 1, icon: Analise, title: "Análise de Conjuntura",descrição: "Visão global do cenário internacional dos mercados e produtos específicos.  " },
        { id: 2, icon: Estudo, title: "Estudo de Mercado", descrição:"Base de dados atualizada e uma análise assertiva sobre o mercado-alvo." },
        { id: 3, icon: Planejamento, title: "Planejamento Burocrático", descrição:"Levantamento dos documentos necessários. " },
        { id: 4, icon: Prospeccao, title: "Prospecção Internacional", descrição:"Levantamento de clientes ou revendedores internacionais." },
        { id: 5, icon: Cadastro, title: "Cadastro no Radar Siscomex", descrição:"Orientação para cadastramento no Radar. " },
        { id: 6, icon: Clientes, title: "Prospecção Nacional de Clientes", descrição:"Levantamento de clientes ou revendedores nacionais." },
        { id: 7, icon: Fornecedores, title: "Prospecção Nacional de Fornecedores", descrição:"Levantamento de fornecedores nacionais de produtos. " },
        { id: 8, icon: Logistica, title: "Análise Logística", descrição:"Consideração sobre as etapas do deslocamento da mercadoria. " },
        { id: 9, icon: Produtos, title: "Análise de Produtos", descrição:"Entendimento do comportamento de cada produto em potencial no mercado internacional." },
        { id: 10, icon: Marketing, title: " Marketing Internacional", descrição:"Adequação, produção e suporte de conteúdo digital para o mercado internacional." },
    ];

    const [activeCard, setActiveCard] = useState<number>(10);

    return (
        <section id="processo" className="bg-N1 md:px-[12.5%] px-[26px] w-full h-fit min-h-[1065px] sm:min-h-[1280px] flex-col  sm:grid  sm:gap-[48px] pb-[62px]">
            <div className="grid gap-2 max-sm:mt-[32px] max-sm:mb-[26px]">
                <h1 className=" font-zodiak text-4xl sm:text-5xl text-N8 font-normal  max-w-[512px]">Para o seu problema, a Líderi tem a  <strong className="text-R5 font-normal">solução.</strong></h1>
                <p className="text-N5 text-[14px] sm:text-[16px] font-montserrat max-w-[557px]">Entenda o passo a passo de como exportar com sucesso com nossa empresa.  </p>
            </div>
            <div className="grid absolute sm:relative sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 items-stretch content-between justify-items-stretch gap-x-11  gap-y-[52px] ">
                {processCardItem.map((item) => (
                    <div key={item.id} className={` max-sm:hidden max-w-[330px]  min-h-[280px] h-auto relative rounded-[8px] py-[48px]  px-10 text-center flex flex-col justify-between  items-center hover:ring-R5 shadow-[2px_2px_8px_rgba(0,0,0,0.4)] hover:shadow-[0px_1px_8px_#87240E] ring-[2px] hover:ring-[2.5px] duration-300  ease-out  transition-all text-black ring-[rgba(0,0,0,0.2)]  ${item.id == 9 ? "2xl:col-start-2 " : " "}`}><h1 className="absolute top-1 left-5 text-[40px] font-normal font-zodiak hidden text-N8">{item.id}</h1>
                        <Image src={item.icon} alt={item.title} className="h-[50px]" />
                        <h2 className="mt-[20px] font-montserrat font-bold text-[18px]">{item.title}</h2>
                        <p className="text-N5 text-[16px]">{item.descrição}</p></div>
                ))}
            </div>
            <div>
              {processCardItem.map((item, index) => (
    <div  
        key={item.id}  
        style={{ zIndex: index }} 
        className="sm:hidden w-auto min-h-[152px] relative -mt-[10px] rounded-[8px] py-[19px] px-4 flex justify-between items-center bg-white shadow-[2px_2px_8px_rgba(0,0,0,0.4)] border-2 border-black/20 hover:border-R5 hover:shadow-[0px_1px_8px_rgba(135, 36, 14, 1)] transition-shadow  duration-300 ease-out  text-black"
    >
        <Image src={item.icon} alt={item.title} className="w-[34px] h-auto object-contain" />
        
        <div className="px-5 w-full flex flex-col gap-1">
            <h3 className="text-[16px] font-montserrat font-bold text-N8">
                {item.title}
            </h3>
            <p className="text-N5 text-[14px] font-montserrat font-normal leading-tight">
                {item.descrição}
            </p>
        </div>
    </div>
))}
            </div>

        </section>

    );
}