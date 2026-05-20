"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { lideriIcon } from "@/public/assets"
import { motion, AnimatePresence } from "motion/react"
import { Menu, TextAlignJustify, X } from "lucide-react"

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isDesktop, setIsDesktop] = useState(false)

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
        <header className="absolute top-0 z-50 h-29 md:h-22.5 w-full">
            <div className="flex justify-between items-center backdrop-blur-[50px] w-full h-full p-6.5 md:px-[12.5%] md:py-3.25">
                <div  className="relative w-[144px] h-[55px] md:w-[186px] md:h-[72px]">
                    <Image
                    src={lideriIcon}
                    alt="Lideri logo"
                    loading="eager"
                    fill
                   
                />
                </div>
                

                <button
                    className="flex justify-center items-center w-27.5 h-10.75 px-3 py-2 rounded-lg border border-N1 font-montserrat text-N1 text-lg font-normal md:hidden"
                    onClick={() => {
                        setIsOpen(!isOpen)
                    }}
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
                                    <X size={24} strokeWidth={3} className="text-N4" />
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="menu"
                                    initial={{ opacity: 0  }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                    className="flex justify-center items-center absolute gap-3"
                                >
                                    Menu
                                    <TextAlignJustify size={24} strokeWidth={3} className="text-N4" />
                                </motion.span>
                            )
                        }
                    </AnimatePresence>
                </button>
            </div>

            <AnimatePresence>
                {
                    (isOpen || isDesktop) && (
                        <motion.nav
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            ref={menuRef}
                            className="flex justify-center absolute top-29 left-0 bg-B9/55 backdrop-blur-[50px]  w-full h-dvh md:top-0 md:h-22.5 md:px-[12.5%] md:py-3.25 md:flex md:flex-row md:justify-end md:bg-R1/5 md:backdrop-blur-none"
                        >
                            <ul className="flex flex-col max-md:pt-[128px] items-center gap-2 w-[90%] font-montserrat font-normal text-N1 text-[20px] md:flex-row md:gap-4 md:w-auto lg:gap-10 ">
                                <li className="order-1 pl-4 max-md:w-full  border-b border-N5 text-center transition ease-in-out duration-300 md:order-1 md:p-0 md:border-transparent md:hover:border-b-2 md:hover:border-N1">
                                    <Link href="/#heroSection">Home</Link>
                                </li>
                                <li className="order-2 pl-4 max-md:w-full pb-1 border-b border-N5 text-center transition ease-in-out duration-300 md:order-2 md:p-0 md:border-transparent md:hover:border-b-2 md:hover:border-N1">
                                    <Link href="/#processo">Serviços</Link>
                                </li>
                                <li className="order-3 pl-4 max-md:w-full pb-1 border-b border-N5 text-center transition ease-in-out duration-300 md:order-4 md:p-0 md:border-transparent md:hover:border-b-2 md:hover:border-N1">
                                    <Link href="/#projetos">Cases</Link>
                                </li>
                                <li className="order-4 hidden max-md:w-full pl-4 pb-1 border-b border-N5 text-center transition ease-in-out duration-300 md:order-5 md:p-0 md:border-transparent md:hover:border-b-2 md:hover:border-N1">
                                    <Link href="/#aboutus">Sobre nós</Link>
                                </li>
                                <li className="order-5 pl-4 pb-1 max-md:w-full border-b border-N5 hidden text-center transition ease-in-out duration-300 md:order-3 md:p-0 md:border-transparent md:hover:border-b-2 md:hover:border-N1">
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