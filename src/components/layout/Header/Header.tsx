"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { lideriIcon } from "@/public/assets"
import { motion, AnimatePresence } from "motion/react"
import { Menu, TextAlignJustify, X } from "lucide-react"

export const Header = () => {
    const [ isOpen, setIsOpen ] = useState(false)
    const [ isDesktop, setIsDesktop ] = useState(false)
    
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleResize = () => {
            const desktop = window.innerWidth >= 768
            setIsDesktop(desktop)
            if (desktop) {
                setIsOpen(false)
            }
        }

        handleResize()
        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
    }, [isOpen])

    return (
        <header className="absolute top-0 z-50 h-29 md:h-22.5">
            <div className="flex justify-between items-center backdrop-blur-[50px] w-dvw h-full p-6.5 md:px-[12.5%] md:py-3.25">
                <Image
                    src={ lideriIcon }
                    alt="Lideri logo"
                    loading="eager"
                    width={ 64 }
                    height={ 64 }
                    className="text-R5"
                />
                
                <button
                    className="flex justify-center items-center w-27.5 h-10.75 px-3 py-2 rounded-lg border border-N1 font-poppins text-N1 text-lg font-normal md:hidden"
                    onClick={ () => {
                        setIsOpen(!isOpen)
                    } }
                >
                    <AnimatePresence mode="sync">
                        {
                            isOpen ? (
                                <motion.span
                                    key="exit"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="flex justify-center items-center absolute"
                                >
                                    Fechar
                                    <X size={ 24 } strokeWidth={ 3 } className="text-R3"/>
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="menu"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="flex justify-center items-center absolute gap-3"
                                >
                                    Menu
                                    <TextAlignJustify size={ 24 } strokeWidth={ 3 } className="text-R3"/>
                                </motion.span>
                            )
                        }
                    </AnimatePresence>
                </button>
            </div>
            
            <AnimatePresence>
                {
                    (isOpen || isDesktop ) && (
                        <motion.nav
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            ref={ menuRef }
                            className="flex justify-center absolute top-29 left-0 bg-B9/55 backdrop-blur-[50px] bg- w-dvw h-dvh md:top-0 md:h-22.5 md:px-[12.5%] md:py-3.25 md:flex md:flex-row md:justify-end md:bg-[unset] md:backdrop-blur-none"
                        >
                            <ul className="flex flex-col gap-2 w-[90%] font-zodiak font-bold text-N1 text-[24px] md:flex-row md:gap-4 md:w-auto lg:gap-6 lg:text-[30px]">
                                <li className="order-1 pl-4 pb-1 border-b border-N5 text-center transition ease-in-out duration-300 md:order-1 md:p-0 md:border-transparent md:hover:border-b-2 md:hover:border-N1">
                                    <Link href="/">Home</Link>
                                </li>
                                <li className="order-2 pl-4 pb-1 border-b border-N5 text-center transition ease-in-out duration-300 md:order-2 md:p-0 md:border-transparent md:hover:border-b-2 md:hover:border-N1">
                                    <Link href="/servicos">Serviços</Link>
                                </li>
                                <li className="order-3 pl-4 pb-1 border-b border-N5 text-center transition ease-in-out duration-300 md:order-4 md:p-0 md:border-transparent md:hover:border-b-2 md:hover:border-N1">
                                    <Link href="/cases">Cases</Link>
                                </li>
                                <li className="order-4 pl-4 pb-1 border-b border-N5 text-center transition ease-in-out duration-300 md:order-5 md:p-0 md:border-transparent md:hover:border-b-2 md:hover:border-N1">
                                    <Link href="/aboutus">Sobre nós</Link>
                                </li>
                                <li className="order-5 pl-4 pb-1 border-b border-N5 text-center transition ease-in-out duration-300 md:order-3 md:p-0 md:border-transparent md:hover:border-b-2 md:hover:border-N1">
                                    <Link href="/blog">Blog</Link>
                                </li>
                            </ul>
                        </motion.nav>
                    )
                }
            </AnimatePresence>
            
        </header>
    )
}