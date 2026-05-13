"use client"

import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { motion } from "motion/react"
import { useEffect } from "react"

export const HeroSection = () => {
    const [ emblaRef, emblaApi ] = useEmblaCarousel(
        {
            align: "start",
            watchDrag: false,
            active: false,
            breakpoints: {
                '(max-width: 767px)': { active: true }
            }
        },
        [Autoplay({ delay: 4000 })])

        useEffect(() => {
            if(!emblaApi) return 
                    emblaApi.on("select", () => {
                        const lastIndex = emblaApi.scrollSnapList().length
                        const currentIdenx = emblaApi.selectedScrollSnap()

                        if (currentIdenx === lastIndex) {
                            emblaApi.scrollTo(0)
                        }
                    })
        },[emblaApi])

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            id="heroSection"
            className="relative h-dvh"
        >

            <div className="absolute z-10 flex flex-col gap-4.5 items-start w-full px-6.5 pt-16.5 2xl:px-70 md:px-30">
                <Image
                    src="/assets/icons/barco.svg"
                    width={ 251 }
                    height={ 64 }
                    alt="Ship Icon"
                    className="w-52.5 h-13.5 md:w-[230px] md:h-[59px] xl:w-62.75 xl:h-16"
                />

                <h1 className="w-[320px] max-w-full font-[Zodiak] font-bold text-[40px] md:w-100 md:text-[50px] xl:w-xl xl:text-[76px]">Nossa paixão é te levar mais longe.</h1>
                <p className="w-65 font-[Secondary] text-sm text-neutral-400 md:w-87.5 md:text-[17px] xl:w-97 xl:text-[20px]"> Consultoria estratégica em internacionalização e exportação.</p>
            </div>

            <div className="relative w-full min-h-165 max-h-231">
                <video preload="auto" autoPlay loop muted className="relative z-0 w-full min-h-165 max-h-231 object-cover object-[85%_center]">
                    <source src="videos/navio.mp4" type="video/mp4"/>
                    Your Browser does not support the video.
                </video>

                <motion.div
                    initial={{ opacity: 0,y: 50 }}
                    animate={{ opacity: 1,y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="embla absolute z-10 bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-58 md:w-fit"
                >
                    <div className="embla__viewport overflow-hidden md:overflow-visible" ref={ emblaRef }>
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
                </motion.div>
            </div>
        </motion.section>
    )
}