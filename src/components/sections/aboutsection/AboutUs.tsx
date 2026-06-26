import { chama1, chama2, counter1, counter2, counter3, counter4, equipe1, equipe2, logoLideri1, logoLideri2 } from "@/public/assets"

import Image from "next/image"
import { AcordionMenu } from "./AcordionMenu"
import { TeamCarousel } from "./TeamCarousel"

export const AboutUs = () => {
    return (
        <section className="pb-25 px-6.5 pt-45 md:px-[12.5%] overflow-x-hidden">
            <div className="grid  gap-y-2 md:grid-cols-2 md:grid-rows-2 justify-items-center  md:items-start 2xl:items-center text-center md:text-start ">
                <div className="w-full xl:pr-[10%] h-auto order-2 ">
                    <h2 className="font-[impact] text-[36px] text-N8 md:text-[48px]">
                        Saiba mais sobre
                        <span className="text-R5"> quem somos.</span>
                    </h2>
                    
                    <div className="hidden w-10 h-3.5 mb-7.5 bg-R5 rounded-sm md:block"></div>
                </div>

                <div className="relative shrink-0 w-[clamp(299px,40vw,577px)] h-[clamp(164px,22vw,318px)] mb-2.5 md:w-full order-1  md:order-2 xl:row-span-2  ">
                    <Image
                        src={ equipe1 }
                        alt="Foto da Equipe da Lideri"
                        fill
                        sizes="(max-width: 768px) 100vw, 40vw"
                        quality={ 100 }
                        className="rounded-lg object-cover"
                    />
                   <div className="hidden xl:block w-[108px] h-[111px] absolute -left-10 -bottom-10 ring-[25px] ring-N1 bg-N1 rounded-full"> 
                     <Image
                        src={ logoLideri2 }
                        alt="Foto da Equipe da Lideri"
                        fill
                        quality={ 100 }
                        className="rounded-lg object-cover"
                    />
                   </div>
                 
                </div>

                <div className="flex flex-col justify-center  w-full xl:pr-[10%] order-3 items-center md:col-span-2  xl:col-span-1">

                    <p className="font-montserrat w-full text-sm text-N5 md:text-xl">A Líderi Jr. Consultoria Internacional é a Empresa Júnior de Relações Internacionais da Universidade Federal da Paraíba. Formada e gerida por estudantes, somos uma consultoria especializada em transformar conhecimento acadêmico em soluções reais para negócios que navegam em um mercado cada vez mais global.</p>
                </div>
            </div>

            <div className="flex flex-col items-center gap-8 my-12 2xl:flex-row md:mt-37.5 md:mb-50 2xl:items-start">
                <div className="md:relative md:shrink-0 w-[100vw] md:w-[clamp(416px,40vw,540px)] h-[clamp(280px,22vw,330px)]">
                    <div className="relative w-full h-full overflow-hidden sm:rounded-lg md:w-full md:h-full">
                        <Image
                            src={ chama1 }
                            fill
                            sizes="(max-width: 768px) 100vw, 40vw"
                            quality={ 100 }
                            alt="Foto da Lideri no Chama"
                            className="object-cover"
                        />
                    </div>

                    <div className="hidden md:block md:absolute md:w-[clamp(218px,21.8vw,330px)] md:h-[clamp(140px,14vw,212px)] md:top-full md:left-full md:-translate-x-1/2 md:-translate-y-1/2 rounded-lg overflow-hidden">
                        <Image
                            src={ chama2 }
                            fill
                            sizes="(max-width: 768px) 0vw, 21vw"
                            quality={ 100 }
                            alt="Foto da Lideri no Chama"
                            className="object-cover"
                        />
                    </div>
                </div>

                <div className="flex jus  md:justify-end w-full md:mt-25 md:flex-1 2xl:mt-0">
                    <AcordionMenu />
                </div>
            </div>

            <div className="flex flex-col items-center md:flex-row md:justify-between md:gap-12.5 md:items-start">
                <div className="relative shrink-0 w-[clamp(298px,30vw,577px)] h-[clamp(303px,30vw,578px)] mb-19 md:mb-0">
                    <Image
                        src={ equipe2 }
                        fill
                        sizes="(max-width: 768px) 100vw, 30vw"
                        quality={ 100 }
                        alt="Foto da equipe da Lideri"
                        className="object-cover rounded-lg"
                    />

                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex items-center justify-center bg-R5 px-7 py-5 rounded-lg xl:px-11.75 xl:py-6.75">
                        <div className="relative w-[clamp(162px,15vw,234px)] h-[clamp(56px,7.15vw,81px)]">
                            <Image
                                src={ logoLideri1 }
                                fill
                                quality={ 100 }
                                alt="Logo da Lideri"
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
                
                <div className="w-full max-w-144.25">
                    <h2 className="font-[impact] text-[36px] text-center sm:text-[40px] md:text-start">Conheça <span className="text-R5">nossa história.</span></h2>

                    <p className="mt-4 mb-8 font-montserrat text-sm text-N5 text-justify sm:text-xl">A Líderi lançou âncora em 07 de dezembro de 2012, inspirada pelo ENERI e pelo desejo de transformar a graduação em experiência real. Nasceu com o nome Mundialize, em um cenário de poucos incentivos, mas encontrou nos primeiros apoiadores o impulso necessário para zarpar. As professoras Xaman e Mojana e os membros da EJA foram fundamentais para consolidar essa iniciativa.</p>

                    <div className="flex flex-col gap-8">
                        <div className="flex items-start gap-2">
                            <Image
                                src={ counter1 }
                                width={ 23.33 }
                                height={ 23.33 }
                                alt="Ícone do contador"
                            />
                            <p className="font-montserrat text-sm text-N5 sm:text-lg">Nos primeiros anos, a Líderi atuou em captação de recursos para ONGs, comércio exterior e organização de eventos, consolidando sua identidade institucional.</p>
                        </div>
                        <div className="flex items-start gap-2">
                            <Image
                                src={ counter2 }
                                width={ 23.33 }
                                height={ 23.33 }
                                alt="Ícone do contador"
                            />
                            <p className="font-montserrat text-sm text-N5 sm:text-lg">Em 2017, a conquista da federação fortaleceu a estrutura da empresa e consolidou sua especialização em tradução e comércio exterior.</p>
                        </div>
                        <div className="flex items-start gap-2">
                            <Image
                                src={ counter3 }
                                width={ 23.33 }
                                height={ 23.33 }
                                alt="Ícone do contador"
                            />
                            <p className="font-montserrat text-sm text-N5 sm:text-lg">Durante a pandemia de 2020, a Líderi concentrou suas atividades em comércio exterior e superou um dos períodos mais desafiadores de sua história.</p>
                        </div>
                        <div className="flex items-start gap-2">
                            <Image
                                src={ counter4 }
                                width={ 23.33 }
                                height={ 23.33 }
                                alt="Ícone do contador"
                            />
                            <p className="font-montserrat text-sm text-N5 sm:text-lg">Após mais de uma década, a Líderi continua conectando academia e mercado por meio da formação de profissionais e da entrega de soluções aos clientes.</p>
                        </div>
                    </div>
                </div>
            </div>

            <TeamCarousel />
        </section>
    )
}
