"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { lideriIcon } from "@/public/assets"
import { motion, AnimatePresence } from "motion/react"
import { Menu, TextAlignJustify, X } from "lucide-react"

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isDesktop, setIsDesktop] = useState(false)

    const menuRef = useRef<HTMLDivElement>(null)
    
    const pathname = usePathname()
    const isGlass = pathname === '/' || pathname.startsWith('/blog') || pathname.startsWith('/login')
    const isInternalBlog = pathname.startsWith('/blog/') && pathname !== '/blog'
    
    useEffect(() => {
        const handleResize = () => {
            const desktop = window.innerWidth >= 850
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
            document.body.style.overflow = "hidden";
        
        } else {
            document.body.style.overflow = "unset"; 
        }
        return () => {
      document.body.style.overflow = "unset";
    };
    }, [isOpen])

    return (
        <header className="absolute top-0 z-50 h-29 md:h-22.5 w-full ">
            <div className={ `flex justify-between items-center max-[53.125rem]:bg-[#0D1122] w-full h-full p-6.5 md:py-3.25 xl:px-[12.5%]  ${ isGlass ? (isInternalBlog ? "backdrop-blur-sm" : "backdrop-blur-[3.125rem]") : "bg-[#0D1122]" }` }>
                <div  className="relative w-36 h-13.75 md:w-46.5 md:h-18">
                    <Image
                    src={lideriIcon}
                    alt="Lideri logo"
                    loading="eager"
                    fill
                
                />
                </div>
                

                <button
                    className="flex justify-center items-center w-27.5 h-10.75 px-3 py-2 rounded-lg border border-N1 font-montserrat text-N1 text-lg font-normal min-[53.125rem]:hidden"
                    data-open = {isOpen}  onClick={() => {
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
                        <motion.nav data-size="isOpen"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            ref={menuRef}
                            className="flex justify-center absolute top-29 left-0 bg-B9/55 backdrop-blur-[3.125rem]    w-full h-dvh md:top-0 md:h-22.5 md:px-6.5 md:py-3.25 md:flex md:flex-row md:justify-end md:bg-R1/5 md:backdrop-blur-none xl:px-[12.5%]"
                        >
                            <ul className="flex flex-col  items-center w-[90%] font-montserrat font-normal text-N1 text-lg md:text-xl md:flex-row md:gap-4 md:w-auto lg:gap-10 ">
                                <li className="order-1 w-full border-y border-N5 md:border-none md:order-1">
                                    <Link
                                        onClick={()=>{setIsOpen(false)}}
                                        href="/"
                                        className="block w-full max-md:w-full py-4 text-center text-nowrap transition ease-in-out duration-300 md:p-0 md:border-transparent md:hover:border-b-2 md:hover:border-N1"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li className="order-3 w-full border-b border-N5 md:border-none md:order-2">
                                    <Link 
                                        onClick={()=>{setIsOpen(false)}}
                                        href="/servicos"
                                        className="block w-full max-md:w-full py-4 text-center text-nowrap transition ease-in-out duration-300 md:p-0 md:border-transparent md:hover:border-b-2 md:hover:border-N1"
                                    >
                                        Serviços
                                    </Link>
                                </li>
                                <li className="order-4 w-full border-b border-N5 md:border-none md:order-4">
                                    <Link 
                                        onClick={()=>{setIsOpen(false)}}
                                        href="/cases"
                                        className="block w-full max-md:w-full py-4 text-center text-nowrap transition ease-in-out duration-300 md:p-0 md:border-transparent md:hover:border-b-2 md:hover:border-N1"
                                    >
                                        Cases
                                    </Link>
                                </li>
                                <li className="order-2 w-full border-b border-N5 md:border-none md:order-5">
                                    <Link 
                                        onClick={()=>{setIsOpen(false)}}
                                        href="/sobreNos"
                                        className="block w-full max-md:w-full  py-4 text-center text-nowrap transition ease-in-out duration-300 md:p-0 md:border-transparent md:hover:border-b-2 md:hover:border-N1"
                                    >
                                        Sobre nós
                                    </Link>
                                </li>
                                <li className="order-5 w-full border-b border-N5 md:border-none md:order-3">
                                    <Link 
                                        onClick={()=>{setIsOpen(false)}}
                                        href="/blog"
                                        className="block w-full py-4 max-md:w-full text-center text-nowrap transition ease-in-out duration-300 md:p-0 md:border-transparent md:hover:border-b-2 md:hover:border-N1"
                                    >
                                        Blog
                                    </Link>
                                </li>
                                <li className="order-6 w-full md:order-6">
                                    <Link
                                        onClick={()=>{setIsOpen(false)}}
                                        href="/contato"
                                        className="block w-full bg-[#87240E] py-4 text-center text-nowrap font-montserrat font-bold md:font-normal md:px-6 md:py-3 md:rounded-lg"
                                    >
                                        Contato
                                    </Link>
                                </li>
                            </ul>
                        </motion.nav>
                    )
                }
            </AnimatePresence>

        </header>
    )
}