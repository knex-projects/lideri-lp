import { Building, Building2, CircleUserRound, Clock3, FileText, Mail, MapPinned, Phone } from "lucide-react";
import Image from "next/image";

export function Footer() {
    return (
        <section className="w-full flex flex-col min-h-212.75 sm:min-h-137.75 pb-8 px-6.5 pt-25 justify-between bg-R5 text-N3 md:px-[12.5%]">
            <div className="mx-auto flex w-full flex-col">
                <div className="flex max-sm:flex-col flex-wrap justify-between">
                    <div className="flex items-start text-N3 max-[1161px]:w-full py-8 sm:py-10 sm:justify-center xl:justify-start">
                        <div className="flex flex-col gap-6">
                            <Image
                                src="/logo/lideriLogo.svg"
                                alt="Lídere Jr. logo"
                                width={237}
                                height={91}
                                className="h-auto w-auto"
                            />
                            <p className="max-sm:w-[256px] max-[1161px]:w-full w-58 font-montserrat text-xs text-N3 md:text-sm">Consultoria especializada em soluções estratégicas  para impulsionar o crescimento da sua organização</p>
                            <div className="w-12 h-1 rounded-[10px] bg-[#87240E]"></div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5.5 sm:gap-8 pr-6.5 py-10 text-N3">
                        <div className="flex flex-col gap-3">
                            <h3 className="text-xl font-montserrat font-bold sm:text-2xl">Endereço</h3>
                            <div className="w-12 h-1 rounded-[10px] bg-[#87240E]"></div>
                        </div>

                        <div className="flex flex-col gap-5">
                            <div className="flex gap-5 items-center">
                                <MapPinned size={ 28 } className="shrink-0"/>
                                <p className="sm:text-lg font-montserrat leading-[1.6] max-w-61  sm:max-w-51.75">
                                    UFPB – Campus I
                                </p>
                            </div>
                            <div className="flex gap-5 items-center">
                                <Building2 size={ 28 } className="shrink-0"/>
                                <p className="sm:text-lg font-montserrat leading-[1.6] max-w-61  sm:max-w-51.75">
                                    Centro de Ciências Sociais Aplicadas
                                </p>
                            </div>
                            <div className="flex gap-5 items-center">
                                <Building size={ 28 } className="shrink-0"/>
                                <p className="sm:text-lg font-montserrat leading-[1.6] max-w-61  sm:max-w-51.75">
                                    Bloco dos Centros Acadêmicos – Líderi Consultoria, 1º Andar
                                </p>
                            </div>
                            <div className="flex gap-5 items-center">
                                <CircleUserRound size={ 28 } className="shrink-0"/>
                                <p className="sm:text-lg font-montserrat leading-[1.6] max-w-61  sm:max-w-51.75">
                                    João Pessoa/PB – CEP: 58050-725
                                </p>
                            </div>
                            <div className="flex gap-5 items-center">
                                <FileText size={ 28 } className="shrink-0"/>
                                <p className="sm:text-lg font-montserrat leading-[1.6]"><strong className="font-bold">CNPJ:</strong> <br /> 19.521.379/0001-03</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid max-2xl:grid-cols-1 grid-cols-2 text-N3 2xl:w-[45%]">
                        <div className="flex flex-col gap-8  py-10 justify-self-start">
                            <div className="flex flex-col gap-3">
                                <h3 className="text-xl font-montserrat font-bold sm:text-2xl">Contatos
                                      <div className="w-12 h-1 rounded-[10px] bg-[#87240E] mt-3"></div>
                                </h3>
                               
                            </div>

                            <div className="flex flex-col gap-5">
                                <div className="flex gap-5 items-center">
                                    <Phone size={ 28 } className="shrink-0"/>
                                    <p className="sm:text-lg font-montserrat leading-[1.6]">+55 (83) 9125-5249</p>
                                </div>
                                <div className="flex gap-5 items-center">
                                    <Mail size={ 28 } className="shrink-0"/>
                                    <a href="mailto:contato@lidericonsultoria.com" target="_blank" rel="noopener noreferrer">
                                        <p className="sm:text-lg font-montserrat leading-[1.6] sm:max-w-60 break-all">contato@lidericonsultoria.com</p>
                                    </a>
                                </div>
                                <div className="flex gap-5 items-center">
                                    <Clock3 size={ 28 } className="shrink-0" />
                                    <p className="sm:text-lg font-montserrat leading-[1.6] sm:max-w-60 break-all">
                                        Segunda a Sexta <br />
                                        08h às 18h
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-5.5 sm:gap-8  py-10 2xl:justify-self-end">
                            <h3 className="text-xl font-montserrat font-bold sm:text-2xl">Redes sociais
                                 <div className="w-12 h-1 rounded-[10px] bg-[#87240E] mt-3"></div>
                            </h3>
                           

                            <p className="sm:text-lg sm:max-w-60.75">Acompanhe nossas redes e fique por dentro das novidades da Líderi.</p>

                            <div className="flex items-center gap-3">
                                <a
                                    href="https://www.instagram.com/liderijr"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="border border-[#C1C2BE] p-2.25 rounded-lg"
                                >
                                    <Image src="/assets/icon/instagram.svg" alt="Instagram" width={34} height={34} />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/lidericonsultoria"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="border border-[#C1C2BE] p-2.25 rounded-lg"
                                >
                                    <Image src="/assets/icon/linkedin.svg" alt="LinkedIn" width={34} height={34} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p className="mt-10 text-center font-montserrat text-[14px] leading-[1.6] sm:text-start">
                © 2026 Líderi Jr. Consultoria. Todos os direitos reservados.
            </p>
        </section>
    );
}