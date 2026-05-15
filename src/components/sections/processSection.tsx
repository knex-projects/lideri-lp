"use client"
import Analise from "@/public/assets/icon/analise.svg";
import Cadastro from "@/public/assets/icon/cadastro.svg";
import Caminhao from "@/public/assets/icon/caminhao.svg";
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
    }

    const processCardItem: processCardType[] = [
        { id: 1, icon: Analise, title: "Análise de Conjuntura" },
        { id: 2, icon: Estudo, title: "Estudo de Mercado" },
        { id: 3, icon: Planejamento, title: "Planejamento Burocrático" },
        { id: 4, icon: Prospeccao, title: "Prospecção Internacional" },
        { id: 5, icon: Cadastro, title: "Cadastro no Radar Siscomex" },
        { id: 6, icon: Clientes, title: "Prospecção Nacional de Clientes" },
        { id: 7, icon: Fornecedores, title: "Prospecção Nacional de Fornecedores" },
        { id: 8, icon: Logistica, title: "Análise Logística" },
        { id: 9, icon: Produtos, title: "Análise de Produtos" },
        { id: 10, icon: Marketing, title: " Marketing Internacional" },
    ];

    const [activeCard, setActiveCard] = useState<number>(10);

    return (
        <section className="bg-transparent sm:px-[12.5%] px-[26px] w-full h-fit min-h-[1065px] sm:min-h-[1280px] flex-col  sm:grid  sm:gap-[48px] pb-[62px]">
            <Image src={Caminhao} alt="caminhao" className="w-[168px] h-[43px] sm:w-[251px] sm:h-[64px]" />
            <div className="grid gap-2 max-sm:mt-[32px] max-sm:mb-[26px]">
                <h1 className=" font-zodiak text-4xl sm:text-5xl text-N8 font-bold  max-w-[512px]">Veja o processo e  <strong className="text-R5">como funciona.</strong></h1>
                <p className="text-N5 text-[14px] sm:text-[16px] font-poppins max-w-[557px]">Entenda o passo a passo de como exportar com sucesso com nossa empresa.  </p>
            </div>
            <div className="grid absolute sm:relative sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 content-between justify-items-stretch gap-x-11  gap-y-[52px] ">
                {processCardItem.map((item) => (
                    <div key={item.id} className={` max-sm:hidden max-w-[330px]  h-[260px]  relative rounded-[8px] py-[48px]  px-10 text-center flex flex-col justify-between  items-center hover:ring-R5 shadow-[2px_2px_8px_rgba(0,0,0,0.4)] hover:shadow-[0px_1px_8px_#87240E] ring-[2px] hover:ring-[2.5px] duration-300  ease-out  transition-all text-black ring-[rgba(0,0,0,0.2)]  ${item.id == 9 ? "2xl:col-start-2 " : " "}`}><h1 className="absolute top-1 left-5 text-[40px] font-bold font-zodiak text-N8">{item.id}</h1>
                        <Image src={item.icon} alt={item.title} className="h-[100px]" />
                        <h2 className="mt-[20px] text-[20px]">{item.title}</h2></div>
                ))}
            </div>
            <div>
                {processCardItem.map((item) => (
                    <div onClick={() => (setActiveCard(item.id))} key={item.id} className={`sm:hidden w-auto  h-auto justify-between  relative rounded-[8px] py-[19px]  px-4 flex flex-col justify-between  items-center hover:border-R5 shadow-[2px_2px_8px_rgba(0,0,0,0.4)]  hover:shadow-[0px_1px_8px_#87240E] border-[2px] hover:ring-[2.5] duration-300  ease-out  transition-all text-black border-[rgba(0,0,0,0.2)]  ${item.id == activeCard ? "animate-altura-78-172" : " "}`}>
                        <h1 className=" w-full text-[24px] font-bold  font-zodiak text-N8  ">{item.id}.  <strong className=" text-[16px] font-poppins font-normal">{item.title}</strong></h1>
                        <Image src={item.icon} alt={item.title} className={`h-[70px]  ${item.id == activeCard ? "animate-opacity-top-bottom  relative" : "hidden absolute"} `} />
                    </div>
                ))}
            </div>

        </section>

    );
}
