"use client"

import { appBadging } from "@/public/assets"
import { ChevronDown } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import Image from "next/image"
import { useState } from "react"

export const AcordionMenu = () => {
    const [ openIndex, setOpenIndex ] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <div className="flex flex-col w-full 2xl:max-w-113.25">
            <div className="flex flex-col gap-3 pb-5">
                <button 
                    className="flex items-center justify-between border-b border-N4 font-zodiak text-[32px]"
                    onClick={ () => handleToggle(0) }
                >
                    <span className={`text-N9 transition-colors duration-300 ${openIndex === 0 ? "text-[#87240E]" : ""}`}>
                        Missão
                    </span>

                    <motion.span
                        animate={{ rotate: openIndex === 0 ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="shrink-0"
                    >
                        <ChevronDown size={ 36 } className="text-[#87240E]" />
                    </motion.span>
                </button>

                <AnimatePresence initial={false}>
                    {openIndex === 0 && (
                        <motion.div
                            key="missao"
                            initial={{ height: 0, opacity: 0, y: -10 }}
                            animate={{ height: "auto", opacity: 1, y: 0 }}
                            exit={{ height: 0, opacity: 0, y: 10 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <p className="font-montserrat text-sm text-N7 md:text-base">Somos uma empresa cuja missão é trazer serviços especializados para a sociedade brasileira, a fim de auxiliá-la a desbravar mares distantes através do comércio exterior.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="flex flex-col gap-3 pb-5">
                <button 
                    className="flex items-center justify-between border-b border-N4 font-zodiak text-[32px]"
                    onClick={ () => handleToggle(1) }
                >
                    <span className={`text-N9 transition-colors duration-300 ${openIndex === 1 ? "text-[#87240E]" : ""}`}>
                        Visão
                    </span>

                    <motion.span
                        animate={{ rotate: openIndex === 1 ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="shrink-0"
                    >
                        <ChevronDown size={ 36 } className="text-[#87240E]" />
                    </motion.span>
                </button>

                <AnimatePresence initial={false}>
                    {openIndex === 1 && (
                        <motion.div
                            key="visao"
                            initial={{ height: 0, opacity: 0, y: -10 }}
                            animate={{ height: "auto", opacity: 1, y: 0 }}
                            exit={{ height: 0, opacity: 0, y: 10 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <p className="font-montserrat text-sm text-N7 md:text-base">Transformar o cenário do Comércio Exterior paraibano, tornando-nos referência em excelência, inovação e impacto na área de Relações Internacionais.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
            <div className="flex flex-col gap-3 pb-5">
                <button 
                    className="flex items-center justify-between border-b border-N4 font-zodiak text-[32px]"
                    onClick={ () => handleToggle(2) }
                >
                    <span className={`text-N9 transition-colors duration-300 ${openIndex === 2 ? "text-[#87240E]" : ""}`}>
                        Valores
                    </span>

                    <motion.span
                        animate={{ rotate: openIndex === 2 ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="shrink-0"
                    >
                        <ChevronDown size={ 36 } className="text-[#87240E]" />
                    </motion.span>
                </button>

                <AnimatePresence initial={false}>
                    {openIndex === 2 && (
                        <motion.div
                            key="valores"
                            initial={{ height: 0, opacity: 0, y: -10 }}
                            animate={{ height: "auto", opacity: 1, y: 0 }}
                            exit={{ height: 0, opacity: 0, y: 10 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <div className="flex flex-col gap-6">
                                <p className="font-montserrat text-sm text-N7 md:text-base">Na Líderi, resultados são construídos por pessoas que compartilham os mesmos princípios. Nossa cultura é guiada por valores que definem como agimos, como entregamos e que tipo de impacto queremos gerar.</p>

                                <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-N7">
                                    <div className="flex items-center gap-2.5">
                                        <Image src={appBadging} width={18} height={18} alt="ìcone" />
                                        <p className="font-montserrat text-sm md:text-base">Resiliência</p>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <Image src={appBadging} width={18} height={18} alt="ìcone" />
                                        <p className="font-montserrat text-sm md:text-base">Comprometimento</p>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <Image src={appBadging} width={18} height={18} alt="ìcone" />
                                        <p className="font-montserrat text-sm md:text-base">Liderança</p>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <Image src={appBadging} width={18} height={18} alt="ìcone" />
                                        <p className="font-montserrat text-sm md:text-base">Competência</p>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <Image src={appBadging} width={18} height={18} alt="ìcone" />
                                        <p className="font-montserrat text-sm md:text-base">Qualidade em Serviço</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}