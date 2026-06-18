import { Building, Building2, CircleUserRound, Clock3, FileText, Mail, MapPinned, Phone } from "lucide-react";
import Image from "next/image";

export function Footer() {
    return (
        <section className="w-full flex flex-col gap-30 min-h-212.75 sm:min-h-137.75 pb-8 px-6.5 pt-25 justify-between bg-R5 md:px-[12.5%]">
            <div className="mx-auto flex w-full flex-col">
                <div className="flex items-start gap-12.5 max-sm:flex-col 2xl:gap-30 2xl:flex-nowrap sm:flex-wrap">
                    <div className="flex flex-col items-start gap-6 sm:justify-center max-[1161px]:w-full">
                        <Image
                            src="/logo/lideriLogo.svg"
                            alt="Lídere Jr. logo"
                            width={237}
                            height={91}
                            className="h-auto w-auto"
                        />

                        <p className="w-58 font-montserrat text-xs text-N3 md:text-sm">Consultoria especializada em soluções estratégicas para impulsionar o crescimento da sua organização</p>

                        <div className="w-12 h-1 rounded-[10px] bg-[#87240E]"></div>
                    </div>

                    <div className="flex flex-col gap-8 text-N3">
                        <div className="flex flex-col gap-3">
                            <h3 className="text-[30px] sm:text-[32px] font-zodiak font-normal ">Endereço</h3>
                            <div className="w-12 h-1 rounded-[10px] bg-[#87240E]"></div>
                        </div>

                        <div className="flex flex-col gap-5 sm:text-lg">
                            <div className="flex gap-5">
                                <MapPinned className="shrink-0"/>
                                <p className="font-montserrat leading-[1.6] max-w-61 sm:max-w-51.75">
                                    UFPB – Campus I
                                </p>
                            </div>
                            <div className="flex gap-5">
                                <Building2 className="shrink-0"/>
                                <p>
                                    Centro de Ciências Sociais Aplicadas
                                </p>
                            </div>
                            <div className="flex gap-5">
                                <Building className="shrink-0"/>
                                <p>
                                    Bloco dos Centros Acadêmicos – Líderi Consultoria, 1º Andar
                                </p>
                            </div>
                            <div className="flex gap-5">
                            <CircleUserRound className="shrink-0"/>
                            <p>
                                João Pessoa/PB – CEP: 58050-725
                            </p>
                            </div>
                            <div className="flex gap-5">
                                <FileText className="shrink-0"/>
                                <p className="font-montserrat leading-[1.6]"><strong className="font-bold">CNPJ:</strong> <br /> 19.521.379/0001-03</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8 justify-self-start font-montserrat text-N3">
                        <div className="flex flex-col gap-3">
                            <h3 className="text-[30px] sm:text-[32px] font-zodiak font-normal">Contatos</h3>
                            <div className="w-12 h-1 rounded-[10px] bg-[#87240E]"></div>
                        </div>

                        <div className="flex flex-col gap-5 sm:text-lg">
                            <div className="flex gap-5">
                                <Phone className="shrink-0"/>
                                <p className="leading-[1.6]">(83) 99999-9999</p>
                            </div>
                            <div className="flex gap-5">
                                <Mail className="shrink-0"/>
                                <a href="mailto:contato@lidericonsultoria.com" target="_blank" rel="noopener noreferrer">
                                    <p className="leading-[1.6]">
                                        contato@lidericonsultoria
                                        .com
                                    </p>
                                </a>
                            </div>
                            <div className="flex gap-5">
                                <Clock3 className="shrink-0"/>
                                <p className="leading-[1.6]">
                                    Segunda a Sexta
                                    08h às 18h
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8 2xl:justify-self-end">
                        <div className="flex flex-col gap-3">
                            <h3 className="text-[30px] sm:text-[32px] font-zodiak font-normal text-N3">Redes sociais</h3>
                            <div className="w-12 h-1 rounded-[10px] bg-[#87240E]"></div>
                        </div>

                        <p className="font-montserrat sm:text-lg text-N3">Acompanhe nossas redes e fique por dentro das novidades da Líderi.</p>

                        <div className="flex items-center gap-6 text-N3">
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
            <p className="text-center font-montserrat text-[14px] leading-[1.6] text-N3 md:text-start">
                © 2026 Líderi Jr. Consultoria. Todos os direitos reservados.
            </p>
        </section>
    );
}
