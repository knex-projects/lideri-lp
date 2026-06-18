import { Building, Building2, CircleUserRound, Clock3, FileText, Mail, MapPinned, Phone } from "lucide-react";
import Image from "next/image";

export function Footer() {
    return (
        <section className="w-full flex flex-col min-h-[851px] sm:min-h-[551px] pb-[32px] px-[26px] pt-[100px] justify-between bg-R5 md:px-[12.5%]">
            <div className="mx-auto flex w-full flex-col ">
                <div className="flex max-sm:flex-col flex-wrap   justify-between  ">
                    <div className="flex flex-col items-start gap-6 sm:justify-center max-[1161px]:w-full   py-8 sm:py-10">
                        <Image
                            src="/logo/lideriLogo.svg"
                            alt="Lídere Jr. logo"
                            width={237}
                            height={91}
                            className="h-auto w-auto"
                        />
                        <p className="w-58 font-montserrat text-xs text-N3">Consultoria especializada em soluções estratégicas  para impulsionar o crescimento da sua organização</p>

                        <div className="w-12 h-1 bg-[#87240E]"></div>
                    </div>

                    <div className="flex flex-col text-N3 sm:gap-8 pr-[26px] py-[40px]">
                        <h3 className="text-[30px]  sm:text-[32px] font-zodiak max-md:pb-[22px] font-normal">Endereço</h3>

                        <div className="w-12 h-1 bg-[#87240E]"></div>
                        
                        <MapPinned />
                        <p className="text-[16px] sm:text-[20px] font-montserrat leading-[1.6] max-w-[244px]  sm:max-w-[207px]">UFPB – Campus I </p>

                        <Building2 />
                        <p>Centro de Ciências Sociais Aplicadas</p>

                        <Building />
                        <p>Bloco dos Centros Acadêmicos – Líderi Consultoria, 1º Andar </p>

                        <CircleUserRound />
                        <p>João Pessoa/PB – CEP: 58050-725</p>

                        <FileText />
                        <p className="text-[16px] sm:text-[20px] font-montserrat leading-[1.6] text-N3"><strong className="font-bold">CNPJ:</strong> <br /> 19.521.379/0001-03</p>
                    </div>
                    <div className="grid max-2xl:grid-cols-1 grid-cols-2 text-N3">
                        <div className="flex flex-col  pr-[26px] py-[40px] justify-self-start">
                            <h3 className="text-[30px] pb-[22px] sm:text-[32px] font-zodiak font-normal">Contatos</h3>

                            <div className="w-12 h-1 bg-[#87240E]"></div>

                            <Phone />
                            <a href="mailto:contato@lidericonsultoria.com" target="_blank" rel="noopener noreferrer">
                                <p className="text-[16px] sm:text-[20px] font-montserrat leading-[1.6]">contato@lidericonsultoria.com</p>
                            </a>

                            <Mail />
                            <p className="text-[16px] sm:text-[20px] font-montserrat leading-[1.6]">(83) 99999-9999</p>

                            <Clock3 />
                            <p>
                                Segunda a Sexta
                                08h às 18h
                            </p>
                        </div>

                        <div className="flex flex-col gap-[22px] sm:gap-8  pr-[26px] py-[40px] 2xl:justify-self-end">
                            <h3 className="text-[30px] sm:text-[32px] font-zodiak font-normal text-N3">Redes sociais</h3>

                            <div className="w-12 h-1 bg-[#87240E]"></div>

                            <p className="font-montserrat text-N3">Acompanhe nossas redes e fique por dentro das novidades da Líderi.</p>
                            <div className="flex items-center gap-3 text-N3">
                                <a href="https://www.instagram.com/liderijr" target="_blank" rel="noopener noreferrer">
                                    <Image src="/assets/icon/instagram.svg" alt="Instagram" width={40} height={40} />
                                </a>
                                <a href="https://www.linkedin.com/in/lidericonsultoria" target="_blank" rel="noopener noreferrer">
                                    <Image src="/assets/icon/linkedin.svg" alt="LinkedIn" width={40} height={40} />
                                </a>
                            </div>

                        </div>
                    </div>

                </div>


            </div>
            <p className="mt-10 text-start font-montserrat text-[14px] sm:text-[16px] leading-[1.6] text-R2">
                © 2026 Líderi Jr. Consultoria. Todos os direitos reservados.
            </p>
        </section>
    );
}
