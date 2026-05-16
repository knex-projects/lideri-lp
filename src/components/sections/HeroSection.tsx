"use client"

import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { EmblaCarouselType } from "embla-carousel"
import { motion } from "motion/react"
import { useCallback, useEffect, useState } from "react"
import Fade from "embla-carousel-fade"

export const HeroSection = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            align: "start",
            watchDrag: false,
            active: false,
            breakpoints: {
                '(max-width: 767px)': { active: true }
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
        // initialize state
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
            className="relative h-[85dvh] bg-white xl:h-dvh mb-5"
        >

            <div className="absolute z-10 flex flex-col gap-8 items-start w-full px-6.5 pt-62.5 sm:px-[12.5%] sm:pt-48.25 sm:gap-10">
                <Image
                    src="/assets/icon/barco.svg"
                    width={251}
                    height={64}
                    alt="Ship Icon"
                    className="w-52.5 h-13.5 md:w-57.5 md:h-14.75 xl:w-62.75 xl:h-16"
                    style={{ height: "auto" }}
                    priority
                />

                <div className="flex flex-col gap-4 sm:gap-5">
                    <div className="bg-R5 w-9 h-3 rounded-sm md:w-10 md:h-3.5"></div>

                    <h1 className="sm:w-[320px] w-[295px] max-w-full font-[Zodiak] text-white font-bold text-[40px] md:w-100 md:text-[50px]/[62px] xl:w-xl xl:text-[76px]/[82px]">Nossa paixão é te levar mais longe.</h1>
                    <p className="w-[281px]  sm:w-65 font-[Poppins] text-sm text-N4 md:w-87.5 md:text-[17px] xl:w-150 xl:text-[20px]"> Consultoria estratégica em internacionalização e exportação.</p>
                </div>

            </div>

            <div className="relative w-full min-h-165 max-h-231">
                <video preload="auto" autoPlay loop muted className="relative z-0 w-full min-h-200.5 max-h-231 object-cover object-[87%_center]  sm:brightness-100">
                    <source src="videos/navio.mp4" type="video/mp4" />
                    Your Browser does not support the video.
                </video>
                <div className="absolute inset-0 bg-gradient-to-r from-[#00051B]/80 to-transparent pointer-events-none lg:hidden" />

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="embla flex flex-col gap-4 absolute z-10 bottom-0 left-1/2 -translate-x-1/2 translate-y-[55%] w-58 text-white md:w-fit md:translate-y-1/2"
                >
                    <div className="embla__viewport overflow-hidden md:overflow-visible" ref={emblaRef}>
                        <div className="embla__containter flex items-center gap-5 xl:gap-10">
                            <div className="embla__slide flex justify-center shrink-0 items-center w-[clamp(232px,20vw,329px)] h-[clamp(120px,16vw,160px)] bg-R5 rounded-lg px-2.5 py-5 shadow-[2px_2px_8px_0px_#000,inset_0px_-2px_10px_0px_#C55A42,inset_2px_3px_10px_0px_#9D361F]">
                                <h2 className="flex flex-col gap-2.5 justify-center items-center font-[Montserrat] font-medium text-[32px] leading-6 xl:text-5xl">
                                    +10
                                    <span className="text-[12px] md:text-sm xl:text-base"> Projetos executados</span>
                                </h2>
                            </div>
                            <div className="embla__slide flex justify-center shrink-0 items-center w-[clamp(232px,20vw,329px)] h-[clamp(120px,18vw,180px)] bg-R5 rounded-lg px-2.5 py-5 shadow-[2px_2px_8px_0px_#000,inset_0px_-2px_10px_0px_#C55A42,inset_2px_3px_10px_0px_#9D361F]">
                                <h2 className="flex flex-col gap-2.5 justify-center items-center font-[Montserrat] font-medium text-[32px] leading-6 xl:text-5xl">
                                    +100
                                    <span className="text-[12px] md:text-sm xl:text-base"> Soluções vendidas</span>
                                </h2>
                            </div>
                            <div className="embla__slide flex justify-center shrink-0 items-center w-[clamp(232px,20vw,329px)] h-[clamp(120px,16vw,160px)] bg-R5 rounded-lg px-2.5 py-5 shadow-[2px_2px_8px_0px_#000,inset_0px_-2px_10px_0px_#C55A42,inset_2px_3px_10px_0px_#9D361F]">
                                <h2 className="flex flex-col gap-2.5 justify-center items-center font-[Montserrat] font-medium text-[32px] leading-6 xl:text-5xl">
                                    +25
                                    <span className="text-[12px] md:text-sm xl:text-base"> Locais prospectados em 2025</span>
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="embla__dots flex justify-center items-center gap-3 md:hidden">
                        {scrollSnaps.map((_, index) => (
                            <div
                                onClick={() => {
                                    setSelectedIndex(index)
                                    emblaApi?.scrollTo(index)
                                }}
                                className={`embla__dot w-2 h-2 rounded-full ${index === selectedIndex ? "bg-R5" : "bg-R1"}`}
                                key={index}
                            ></div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.section>
    )
}