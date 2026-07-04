"use client"
import { lideriIcon } from "@/public/assets";
import { Pencil, TextAlignJustify, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react"
import Image from "next/image";
import { useEffect, useState } from "react";

interface HeaderProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export function Header({ isOpen, setIsOpen }: HeaderProps) {
    const [isDesktop, setIsDesktop] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            const desktop = window.innerWidth >= 1024 
            setIsDesktop(desktop)
            if (desktop) {
                setIsOpen(false)
            }
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [setIsOpen])

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"; 
        } else {
            document.body.style.overflow = ""
        }
    }, [isOpen])

    return (
        <section className="w-full h-[98px] bg-[rgb(13,17,34)] flex items-center justify-center lg:justify-between px-8 py-[13px] relative z-50">
            <div className="relative w-36 h-13.75 md:w-46.5 md:h-18">
                <Image
                    src={lideriIcon}
                    alt="Lideri logo"
                    loading="eager"
                    fill
                />
            </div>
            
           
            <button
                className="flex absolute ml-4 sm:ml-8 left-0 justify-center items-center max-sm:w-[20%] w-27.5 h-10.75 px-3 py-2 rounded-lg border border-white/20 font-montserrat text-white text-lg font-normal lg:hidden"
                onClick={() => setIsOpen(!isOpen)}
            >
                <AnimatePresence mode="sync">
                    {isOpen ? (
                        <motion.span
                            key="exit"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex justify-center items-center absolute gap-2"
                        >
                            <span className="max-sm:hidden max-sm:absolute">Fechar</span>
                            <X size={24} strokeWidth={3} className="text-white" />
                        </motion.span>
                    ) : (
                        <motion.span
                            key="menu"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex justify-center  items-center absolute gap-2"
                        >
                            <span className="max-sm:hidden max-sm:absolute">Menu</span>
                            <TextAlignJustify size={24} strokeWidth={3} className="text-white" />
                        </motion.span>
                    )}
                </AnimatePresence>
            </button>

          
            {isDesktop && (
                <div className="hidden lg:flex lg:flex-row lg:justify-end">
                    <button className="w-[146px] h-[52px] bg-white border-2 border-[rgb(135,36,14)] rounded-lg flex items-center justify-center gap-[5px] transition hover:bg-[rgb(240,240,240)]">
                        <h1 className="font-['Montserrat'] text-[16px] font-medium text-[rgb(135,36,14)]">
                            Novo Post
                        </h1>
                        <Pencil className="w-4 h-4 text-[rgb(135,36,14)]" />
                    </button>
                </div>
            )}
        </section>
    )
}