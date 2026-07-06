"use client"

import { Input } from "./Input"
import { callLog, chat, exploreNearby } from "@/public/assets"
import Image from "next/image"
import { useRef, useState } from "react"
import { RiInstagramFill } from "react-icons/ri"
import { LuLinkedin } from "react-icons/lu"
import emailjs from "@emailjs/browser"

export const ContactSection = () => {
    const form = useRef<HTMLFormElement>(null)

    const [ telefone, setTelefone ] = useState<string | undefined>()

    const sendEmail = (e: React.SyntheticEvent) => {
        e.preventDefault()

        emailjs.sendForm("serviceId", "templateId", form.current!, "publicKey").then(
            () => {
                form.current!.reset()
                setTelefone(undefined)
            },
            (error) => {
                alert(`Falha ao enviar a mensagem. Tente novamente, ${ error.text }`)
            }
        )
    }

    return (
        <section className="pb-25 pt-45 px-6.5 overflow-x-hidden md:py-60 md:px-[12.5%]">
            <div>
                <h1 className="mb-4 font-[impact] text-[36px] text-center md:text-5xl">Para onde podemos te levar?</h1>
                <p className="font-Montserrat text-sm text-center md:text-[28px]">Vamos entender e encontrar o melhor plano para escalar seu negócio</p>
                
                <div className="flex flex-col md:items-center md:mt-15 xl:flex-row xl:gap-30 3xl:gap-[15vw]">
                    <div className="mt-10 mb-15 bg-N3 rounded-lg p-4 w-full max-w-180 sm:mx-0 md:px-8 md:py-12 xl:mb-0 xl:mt-0">
                        <form ref={ form } onSubmit={ sendEmail } className="flex flex-col gap-6 text-N9">
                            <div className="grid grid-cols-2 grid-rows-1 gap-x-3">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="nome" className="font-bold md:text-2xl">Nome</label>
                                    <input
                                        type="text"
                                        name="nome"
                                        id="nome"
                                        placeholder="Primeiro nome"
                                        required
                                        className="px-3 py-4 border-[2.5px] border-N6 rounded-lg bg-N1 placeholder:font-Montserrat placeholder:text-sm placeholder:text-N4 transition-colors ease-in-out focus:border-R5 focus:outline-none md:text-lg"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="sobrenome" className="font-bold md:text-2xl">Sobrenome</label>
                                    <input
                                        type="text"
                                        id="sobrenome"
                                        name="sobrenome"
                                        placeholder="Sobrenome"
                                        required
                                        className="row-start-2 row-end-3 px-3 py-4 border-[2.5px] border-N6 rounded-lg bg-N1 placeholder:font-Montserrat placeholder:text-sm placeholder:text-N4 transition-colors ease-in-out focus:border-R5 focus:outline-none md:text-lg"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="font-bold md:text-2xl">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="email@contact.com"
                                    required
                                    className="px-6 py-4 border-[2.5px] border-N6 rounded-lg bg-N1 placeholder:font-Montserrat placeholder:text-sm placeholder:text-N4 transition-colors ease-in-out focus:border-R5 focus:outline-none md:text-lg md:placeholder:text-lg"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="telefone" className="font-bold md:text-2xl">Número</label>
                                <Input value={ telefone } onChange={ setTelefone } />
                                <input type="hidden" name="telefone" value={ telefone || "" }/>
                            </div>
                            
                            <div className="flex flex-col gap-2">
                                <label htmlFor="mensagem" className="font-bold md:text-2xl">Mensagens</label>
                                <textarea
                                    name="mensagem"
                                    id="mensagem"
                                    rows={ 4 }
                                    placeholder="Descreva seus interesses"
                                    required
                                    className="px-6 py-4 border-[2.5px] border-N6 rounded-lg bg-N1 placeholder:font-Montserrat placeholder:text-sm placeholder:text-N4 md:text-lg transition-colors ease-in-out focus:border-R5 focus:outline-none md:placeholder:text-lg"
                                ></textarea>
                            </div>

                            <div className="flex gap-1 sm:gap-2.5">
                                <div className="flex-1">
                                    <input
                                        type="checkbox"
                                        id="prospeccao"
                                        name="prospeccao"
                                        value="prospeccao"
                                        className="hidden peer"
                                    />
                                    <label
                                        htmlFor="prospeccao"
                                        className="block w-full px-2.25 py-1.5 border-[2.5px] border-N8 rounded-full bg-N1 cursor-pointer font-Montserrat text-center text-[10px] text-N5 transition-all duration-300 peer-checked:bg-R5 peer-checked:text-N1 peer-checked:border-R5 hover:border-R5 hover:text-R5 md:text-lg"
                                    >
                                        Prospecção
                                    </label>
                                </div>

                                <div className="flex-1">
                                    <input
                                        type="checkbox"
                                        name="analise"
                                        id="analise"
                                        value="analise"
                                        className="hidden peer"
                                    />
                                    <label
                                        htmlFor="analise"
                                        className="block w-full px-2.25 py-1.5 border-[2.5px] border-N8 rounded-full bg-N1 cursor-pointer font-Montserrat text-center text-[10px] text-N5 transition-all duration-300 peer-checked:bg-R5 peer-checked:text-N1 peer-checked:border-R5 hover:border-R5 hover:text-R5 md:text-lg"
                                    >
                                        Análise
                                    </label>
                                </div>

                                <div className="flex-1">
                                    <input
                                        type="checkbox"
                                        name="burocracia"
                                        id="burocracia"
                                        value="burocracia"
                                        className="hidden peer"
                                    />
                                    <label
                                        htmlFor="burocracia"
                                        className="block w-full px-2.25 py-1.5 border-[2.5px] border-N8 rounded-full bg-N1 cursor-pointer font-Montserrat text-center text-[10px] text-N5 transition-all duration-300 peer-checked:bg-R5 peer-checked:text-N1 peer-checked:border-R5 hover:border-R5 hover:text-R5 md:text-lg"
                                    >
                                        Burocrácia
                                    </label>
                                </div>

                                <div className="flex-1">
                                    <input
                                        type="checkbox"
                                        name="outro"
                                        id="outro"
                                        value="outro"
                                        className="hidden peer"
                                    />
                                    <label
                                        htmlFor="outro"
                                        className="block w-full px-2.25 py-1.5 border-[2.5px] border-N8 rounded-full bg-N1 cursor-pointer font-Montserrat text-center text-[10px] text-N5 transition-all duration-300 peer-checked:bg-R5 peer-checked:text-N1 peer-checked:border-R5 hover:border-R5 hover:text-R5 md:text-lg"
                                    >
                                        Outro
                                    </label>
                                </div>
                            </div>

                            <button type="submit" className="py-3 rounded-lg bg-R5 font-Montserrat text-lg font-bold text-N1">Enviar</button>
                        </form>
                    </div>

                    <div className="flex flex-col gap-5 md:justify-center md:gap-18">
                        <div className="flex items-start gap-5">
                            <Image
                                src={ chat }
                                width={ 46 }
                                height={ 46 }
                                alt="Ícone de chat"
                            />
                            <div className="flex flex-col justify-center items-start gap-2">
                                <h2 className="mb-1 font-[impact] text-[32px]">Converse com nós</h2>
                                <p className="font-Montserrat text-sm text-N5 md:text-lg">Nossa equipe está ativa para ajudar</p>
                                <p className="font-Montserrat text-sm text-N5 md:text-lg"><em>contato@lidericonsultoria.com</em></p>
                            </div>
                        </div>

                        <div className="flex items-start gap-5">
                            <Image
                                src={ exploreNearby }
                                width={ 46 }
                                height={ 46 }
                                alt="Ícone de explore nearby"
                            />
                            <div className="flex flex-col justify-center items-start gap-2">
                                <h2 className="mb-1 font-[impact] text-[32px]">Visite-nos</h2>
                                <p className="font-Montserrat text-sm text-N5 md:text-lg">Venha conhecer nossa sede</p>
                                <p className="font-Montserrat text-sm text-N5 md:text-lg"><em>rua, nº, bairro, João Pessoa-PB; 58050-725</em></p>
                            </div>
                        </div>

                        <div className="flex items-start gap-5">
                            <Image
                                src={ callLog }
                                width={ 46 }
                                height={ 46 }
                                alt="Ícone de call log"
                            />
                            <div className="flex flex-col justify-center items-start gap-2">
                                <h2 className="mb-1 font-[impact] text-[32px]">Contate-nos</h2>
                                <p className="font-Montserrat text-sm text-N5 md:text-lg">De Segunda à Sexta, das 8h às 17h</p>
                                <p className="font-Montserrat text-sm text-N5 md:text-lg"><em>+55 (83) 9125-5249</em></p>
                            </div>
                        </div>

                        <div className="flex justify-center items-center gap-6 md:justify-start">
                            <a
                                href="https://www.instagram.com/liderijr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex justify-center items-center w-15 h-15 rounded-[19px] text-R5 transition-all duration-500 hover:bg-R5 hover:text-N1"
                            >
                                <RiInstagramFill size={ 60 } className="scale-110" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/lidericonsultoria"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex justify-center items-center w-15 h-15 bg-R5 rounded-2xl text-N1 border-3 transition-all duration-500 hover:bg-N1 hover:border-R5 hover:text-R5"
                            >
                                <LuLinkedin size={ 33.33 } className="scale-115"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}