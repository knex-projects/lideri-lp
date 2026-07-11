"use client"

import { imagemDoCard as barco } from "@/public/assets";
import { ChevronDown, ChevronLeft, ChevronRight, Pencil, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Categoria = "Todos" | "Publicidades" | "Rascunhos" | "Agendados"
const categorias: Categoria[] = ["Todos", "Publicidades", "Rascunhos", "Agendados"]

const cards = [
    {
        titulo: "Tendências de consumo no mercado asiático",
        categoria: "Pesquisa de Mercado",
        autor: "Maria",
        data: "01/08/2040"
    },
    {
        titulo: "Impacto da inteligência artificial no varejo europeu",
        categoria: "Inovação Tecnológica",
        autor: "João",
        data: "15/09/2040",
        imgSrc: ""
    },
    {
        titulo: "Sustentabilidade e hábitos de compra na América Latina",
        categoria: "Comportamento",
        autor: "Ana",
        data: "22/10/2040"
    },
    {
        titulo: "Transformação digital no setor financeiro africano",
        categoria: "Tecnologia e Finanças",
        autor: "Kwame",
        data: "10/11/2040"
    },
    {
        titulo: "Evolução dos serviços de saúde na Europa Ocidental",
        categoria: "Saúde e Tecnologia",
        autor: "Sophie",
        data: "05/12/2040"
    }
]

export default function Posts() {
    const [ categoriasAtivas, setCategoriasAtivas ] = useState(new Set())
    const [ paginaAtual, setPaginaAtual ] = useState(1)
    const totalDePaginas = 3

    const toggleCategoria = (categoria: Categoria) => {
        setCategoriasAtivas((prev) => {
            const novaCategoria = new Set(prev)
            
            if (novaCategoria.has(categoria)) {
                novaCategoria.delete(categoria)
            } else {
                novaCategoria.add(categoria)
            }

            return novaCategoria
        })
    }

    return (
        <main className="flex flex-col gap-6 w-dvw px-4 py-4 mb-6 sm:px-8 2xl:px-30 lg:py-10 md:bg-N2">
            <form className="flex flex-col gap-4 sm:flex-row sm:justify-between md:px-8 md:py-4 md:bg-N1 md:border md:border-B9 md:rounded-2xl">
                <div className="relative xl:hidden max-w-35.5">
                    <select name="categoria" className="appearance-none px-4 py-3 pr-8 border border-N5 rounded-lg font-montserrat text-N8">
                        <option value="todos">Todos</option>
                        <option value="publicados">Publicados</option>
                        <option value="rascunhos">Rascunhos</option>
                        <option value="agendados">Agendados</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 inset-y-1/2 -translate-y-1/2"/>
                </div>

                <div className="hidden xl:flex gap-4">
                    {
                        categorias.map((categoriaMap, index) => (
                            <button
                                key={ index }
                                type="button"
                                onClick={ () => toggleCategoria(categoriaMap) }
                                className= { `px-5 py-3 border rounded-lg font-montserrat font-medium transition-all ease-in-out duration-300 
                                    ${ categoriasAtivas.has(categoriaMap)
                                        ? "bg-R5 text-N1"
                                        : "border-N5 text-N5"
                                    }` } 
                            >
                                { categoriaMap }
                            </button>
                        ))
                    }
                </div>

                <div className="relative">
                    <input
                        type="text"
                        name="postagem"
                        placeholder="Buscar Postagens?"
                        className="w-[clamp(217px,24vw,453px)] px-4 py-3 pl-10 border border-N5 rounded-lg font-montserrat text-N8 xl:pl-4 xl:pr-10"
                    />
                    <button type="submit">
                        <Search size={ 16 } className="absolute left-4 inset-y-1/2 -translate-y-1/2 text-N5 xl:left-auto xl:right-6"/>
                    </button>
                </div>

            </form>

            <div className="flex flex-col gap-6 md:p-8 md:bg-N1 md:border md:border-B9 md:rounded-xl">
                {
                    cards.map((card, index) => (
                        <div key={ index } className="flex justify-between items-center gap-6">
                            <div className="flex justify-center items-center gap-2 md:gap-6">
                                <div className="relative shrink-0 w-[clamp(77px,10vw,142px)] h-[clamp(44px,7vw,80px)]">
                                    <Image
                                        src={ barco }
                                        alt="Imagem do card"
                                        fill
                                        className="rounded-lg"
                                    />
                                </div>

                                <div>
                                    <h2 className="font-montserrat font-medium text-sm text-N9 md:text-[32px]">
                                        { card.titulo }
                                    </h2>

                                    <div className="flex gap-4">
                                        <p className="font-montserrat font-medium text-[8px] text-N7 md:text-2xl">
                                            <span className="font-medium">Categoria:</span> { card.categoria }
                                        </p>
                                        <p className="font-montserrat font-medium text-[8px] text-N7 md:text-2xl">
                                            <span className="font-medium">Autor:</span> { card.autor }
                                        </p>
                                    </div>
                                </div>
                            </div>


                            <div className="flex flex-col items-end gap-2">
                                <p className="font-montserrat font-semibold text-[8px] text-[#87240E] md:text-2xl">
                                    { card.data }
                                </p>
                                <button className="cursor-pointer p-2 bg-R5 rounded-lg text-N1"><Pencil size={ 16 }/></button>
                            </div>
                        </div>
                    ))
                }
            </div>

            <nav className="mt-auto">
                <ul className="flex justify-center items-center gap-3">
                    <li
                        onClick={() => setPaginaAtual(Math.max(paginaAtual - 1, 1))}
                        className="cursor-pointer p-2 bg-[#87240E] border border-N4 rounded-full text-N1"
                    >
                        <ChevronLeft size={ 22 } />
                    </li>
                    {
                        Array.from({ length: totalDePaginas }).map((_, index) => (
                            <li key={ index }>
                                <Link
                                    href={`/posts?page=${index + 1}`}
                                    className={`px-5 py-3 border border-N4 rounded-full font-montserrat text-xl
                                        ${
                                            paginaAtual == index + 1
                                                ? "bg-R5 text-N1"
                                                : "bg-none text-N9"
                                        }
                                        `}
                                    onClick={() => setPaginaAtual(index + 1)}
                                >
                                    { index + 1 }
                                </Link>
                            </li>
                        ))
                    }
                    <li
                        onClick={() => setPaginaAtual(Math.min(paginaAtual + 1, totalDePaginas))}
                        className="cursor-pointer p-2 bg-[#87240E] border border-N4 rounded-full text-N1"
                    >
                        <ChevronRight size={ 22 } />
                    </li>
                </ul>
            </nav>
        </main>
    )
}