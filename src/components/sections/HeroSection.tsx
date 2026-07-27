"use client"

import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { EmblaCarouselType } from "embla-carousel"
import { motion, useInView } from "framer-motion"
import { useCallback, useEffect, useState, useRef } from "react"
import Fade from "embla-carousel-fade"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"


const CounterNumber = ({ to, duration = 2 }: { to: number; duration?: number }) => {
    const nodeRef = useRef<HTMLSpanElement>(null)
    const isInView = useInView(nodeRef, { once: true })

    useEffect(() => {
        const node = nodeRef.current
        if (!node || !isInView) return

        
        import("framer-motion").then(({ animate }) => {
            const controls = animate(0, to, {
                duration: duration,
                ease: "easeOut",
                onUpdate(value) {
                    node.textContent = Math.round(value).toString()
                },
            })
            return () => controls.stop()
        })
    }, [to, duration, isInView])

    return <span ref={nodeRef}>0</span>
}

export const HeroSection = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            align: "start",
            watchDrag: false,
            active: false,
            breakpoints: {
                '(max-width: 47.9375rem)': { active: true }
            }
        },
        [Autoplay({ delay: 4000 }), Fade()],
    )

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnap] = useState<number[]>([0, 1, 2])

    const setupSnaps = useCallback((api?: EmblaCarouselType) => {
        const embla = api ?? emblaApi
        if (!embla) return
        setScrollSnap(embla.scrollSnapList())
    }, [emblaApi])

    const onSelect = useCallback((api?: EmblaCarouselType) => {
        const embla = api ?? emblaApi
        if (!embla) return
        setSelectedIndex(embla.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        
        setupSnaps(emblaApi)
        onSelect(emblaApi)

        emblaApi.on("reInit", setupSnaps)
        emblaApi.on("reInit", onSelect)
        emblaApi.on("select", onSelect)

        emblaApi.on("select", () => {
            const lastIndex = emblaApi.scrollSnapList().length
            const currentIdenx = emblaApi.selectedScrollSnap()

            if (currentIdenx === lastIndex) {
                emblaApi.scrollTo(0)
            }
        })

        return () => {
            emblaApi.off("reInit", setupSnaps)
            emblaApi.off("reInit", onSelect)
            emblaApi.off("select", onSelect)
        }
    }, [emblaApi, setupSnaps, onSelect])

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            id="heroSection"
            className="relative bg-white mb-5"
        >
            <div className="absolute z-10 flex flex-col gap-8 items-start w-full px-6.5 pt-62.5 md:px-[12.5%] sm:pt-59.25 sm:gap-10">
                <div className="flex flex-col gap-4 sm:gap-5">
                    <div className="bg-R5 w-9 h-3 rounded-sm md:w-10 md:h-3.5"></div>
                    <h1 className="sm:w-80 w-73.75 max-w-full font-zodiac text-white font-normal text-[2.5rem] md:w-100 md:text-[3.125rem]/[3.875rem] xl:w-128.5 xl:text-[4.75rem]/[5.125rem]">
                        Nossa paixão é te levar mais longe.
                    </h1>
                    <p className="w-70.25 sm:w-65 font-montserrat  text-sm text-N4 md:w-87.5 md:text-[1.0625rem] xl:w-150 xl:text-[1.25rem]"> 
                        Consultoria estratégica em internacionalização e exportação.
                    </p>
                </div>
                <Link href = "/contato">
                <div className="bg-R5 px-3 md:px-6 h-13 rounded-[0.5rem] font-montserrat flex text-[0.875rem] md:text-[1rem] text-N1 items-center justify-center gap-2 font-medium hover:bg-R8 transition-all">
                    Entre em contato
                    <ArrowUpRight color="#FFFFFF" size={20}/>
                </div>
                </Link>
                
            </div>

            <div className="relative w-full min-h-165 max-h-253.5">
                <video preload="auto" autoPlay loop muted className="relative z-0 w-full min-h-200 max-h-231 object-cover object-[87%_center] sm:brightness-100">
                    <source src="videos/navio.mp4" type="video/mp4" />
                    Your Browser does not support the video.
                </video>
                <div className="absolute inset-0 bg-gradient-to-r from-[#00051B]/80 to-transparent pointer-events-none lg:hidden" />

                <motion.div
                    className="embla flex flex-col gap-4 absolute z-10 bottom-0 left-1/2 -translate-x-1/2 translate-y-[55%] w-58 text-white md:w-fit md:translate-y-1/2"
                >
                    <div className="overflow-hidden md:overflow-visible" ref={emblaRef}>
                        <div className="embla__containter flex items-center gap-5 xl:gap-10">
                            
                            
                            <div className="embla__slide flex justify-center shrink-0 items-center w-[clamp(14.5rem,20vw,20.5625rem)] h-[clamp(7.5rem,16vw,10rem)] bg-R5 rounded-lg px-2.5 py-5 shadow-[0.125rem_0.125rem_0.5rem_0rem_#000,inset_0rem_-0.125rem_0.625rem_0rem_#C55A42,inset_0.125rem_0.1875rem_0.625rem_0rem_#9D361F]">
                                
                                
                                    <h2 className="flex embla__viewport flex-col gap-2.5 justify-center items-center font-montserrat font-medium text-[2rem] leading-6 xl:text-5xl">
                                        <div>+<CounterNumber to={10} /></div>
                                        <span className="text-[0.75rem] md:text-sm xl:text-base font-normal"> Projetos executados</span>
                                    </h2>
                                
                            </div>

                           
                            <div className="embla__slide flex justify-center shrink-0 items-center w-[clamp(14.5rem,20vw,20.5625rem)] h-[clamp(7.5rem,18vw,11.25rem)] bg-R5 rounded-lg px-2.5 py-5 shadow-[0.125rem_0.125rem_0.5rem_0rem_#000,inset_0rem_-0.125rem_0.625rem_0rem_#C55A42,inset_0.125rem_0.1875rem_0.625rem_0rem_#9D361F]">
                               
                                    <h2 className="flex flex-col gap-2.5 justify-center items-center font-montserrat font-medium text-[2rem] leading-6 xl:text-5xl">
                                        <div>+<CounterNumber to={100} /></div>
                                        <span className="text-[0.75rem] md:text-sm xl:text-base font-normal"> Soluções vendidas</span>
                                    </h2>
                                                         
                            </div>

                            
                            <div className="embla__slide flex justify-center shrink-0 items-center w-[clamp(14.5rem,20vw,20.5625rem)] h-[clamp(7.5rem,16vw,10rem)] bg-R5 rounded-lg px-2.5 py-5 shadow-[0.125rem_0.125rem_0.5rem_0rem_#000,inset_0rem_-0.125rem_0.625rem_0rem_#C55A42,inset_0.125rem_0.1875rem_0.625rem_0rem_#9D361F]">
                                
                                    <h2 className="flex flex-col gap-2.5 justify-center items-center font-montserrat font-medium text-[2rem] leading-6 xl:text-5xl">
                                        <div>+<CounterNumber to={25} /></div>
                                        <span className="text-[0.75rem] md:text-sm xl:text-base font-normal"> Locais prospectados em 2025</span>
                                    </h2>
                                
                            </div>

                        </div>
                    </div>

                   
                    <div className="embla__dots flex justify-center items-center gap-3 md:hidden">
                        {scrollSnaps.map((_, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    setSelectedIndex(index)
                                    emblaApi?.scrollTo(index)
                                }}
                                className={`embla__dot w-2 h-2 rounded-full transition-colors duration-200 ${index === selectedIndex ? "bg-R5" : "bg-R1"}`}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.section>
    )
}
