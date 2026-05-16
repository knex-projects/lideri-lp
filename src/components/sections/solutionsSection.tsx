
import Image from "next/image";
import type { ComponentType, SVGProps } from "react";

type SolutionItem = {
    title: string;
    description: string;
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

function IconPackage(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 48 53.3333"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M21.3333 46.4667V28.2L5.33333 18.9333V37.2L21.3333 46.4667ZM26.6667 46.4667L42.6667 37.2V18.9333L26.6667 28.2V46.4667ZM21.3333 52.6L2.66667 41.8667C1.82222 41.3778 1.16667 40.7333 0.7 39.9333C0.233333 39.1333 0 38.2444 0 37.2667V16.0667C0 15.0889 0.233333 14.2 0.7 13.4C1.16667 12.6 1.82222 11.9556 2.66667 11.4667L21.3333 0.733333C22.1778 0.244444 23.0667 0 24 0C24.9333 0 25.8222 0.244444 26.6667 0.733333L45.3333 11.4667C46.1778 11.9556 46.8333 12.6 47.3 13.4C47.7667 14.2 48 15.0889 48 16.0667V37.2667C48 38.2444 47.7667 39.1333 47.3 39.9333C46.8333 40.7333 46.1778 41.3778 45.3333 41.8667L26.6667 52.6C25.8222 53.0889 24.9333 53.3333 24 53.3333C23.0667 53.3333 22.1778 53.0889 21.3333 52.6ZM34.6667 17.4L39.8 14.4667L24 5.33333L18.8 8.33333L34.6667 17.4ZM24 23.6L29.2 20.6L13.4 11.4667L8.2 14.4667L24 23.6Z"
                fill="currentColor"
            />
        </svg>
    );
}

function IconShop(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 48 42.6667"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M2.66667 5.33333V0H45.3333V5.33333H2.66667ZM2.66667 42.6667V26.6667H0V21.3333L2.66667 8H45.3333L48 21.3333V26.6667H45.3333V42.6667H40V26.6667H29.3333V42.6667H2.66667ZM8 37.3333H24V26.6667H8V37.3333ZM5.46667 21.3333H42.5333L40.9333 13.3333H7.06667L5.46667 21.3333Z"
                fill="currentColor"
            />
        </svg>
    );
}

function IconSearch(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M44.2667 48L27.4667 31.2C26.1333 32.2667 24.6 33.1111 22.8667 33.7333C21.1333 34.3556 19.2889 34.6667 17.3333 34.6667C12.4889 34.6667 8.38889 32.9889 5.03333 29.6333C1.67778 26.2778 0 22.1778 0 17.3333C0 12.4889 1.67778 8.38889 5.03333 5.03333C8.38889 1.67778 12.4889 0 17.3333 0C22.1778 0 26.2778 1.67778 29.6333 5.03333C32.9889 8.38889 34.6667 12.4889 34.6667 17.3333C34.6667 19.2889 34.3556 21.1333 33.7333 22.8667C33.1111 24.6 32.2667 26.1333 31.2 27.4667L48 44.2667L44.2667 48ZM17.3333 29.3333C20.6667 29.3333 23.5 28.1667 25.8333 25.8333C28.1667 23.5 29.3333 20.6667 29.3333 17.3333C29.3333 14 28.1667 11.1667 25.8333 8.83333C23.5 6.5 20.6667 5.33333 17.3333 5.33333C14 5.33333 11.1667 6.5 8.83333 8.83333C6.5 11.1667 5.33333 14 5.33333 17.3333C5.33333 20.6667 6.5 23.5 8.83333 25.8333C11.1667 28.1667 14 29.3333 17.3333 29.3333ZM12 25.3333L14 18.8L8.66667 14.5333H15.2L17.3333 8L19.4667 14.5333H26L20.6667 18.8L22.6667 25.3333L17.3333 21.2L12 25.3333Z"
                fill="currentColor"
            />
        </svg>
    );
}

const solutionItems: SolutionItem[] = [
    {
        title: "Análise de Produtos",
        description:
            "Avaliação para escolher a melhor NCM de exportação, analisando aspectos quantitativos e qualitativos para um ótimo desempenho internacional.",
        Icon: IconPackage,
    },
    {
        title: "Estudo de Mercado",
        description:
            "Estudo aprofundado de cinco países para exportar, avaliando todo o perfil demográfico, a cultura e também a concorrência no mercado externo.",
        Icon: IconShop,
    },
    {
        title: "Análise de Conjuntura",
        description:
            "Mapeamento dos melhores mercados globais para o produto, com foco na sazonalidade, atratividade e nos riscos de cada país para a exportação.",
        Icon: IconSearch,
    },
];

const subtitle =
    "Descubra nossas soluções e como elas podem beneficiar e amplificar seus negócios.";

function ArrowForwardIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            width="28"
            height="24"
            viewBox="0 0 28 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path
                d="M17.1313 12.75H8V11.25H17.1313L12.9313 7.05L14 6L20 12L14 18L12.9313 16.95L17.1313 12.75Z"
                fill="currentColor"
            />
        </svg>
    );
}

function ArrowOutwardIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            width="15"
            height="14"
            viewBox="0 0 15 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path
                d="M2.79231 13L1.5 11.7077L10.3615 2.84615H2.42308V1H13.5V12.0769H11.6538V4.13846L2.79231 13Z"
                fill="currentColor"
            />
        </svg>
    );
}

export default function SolutionsSection() {
    return (
        <section
            className="w-full bg-transparent"
            aria-labelledby="solutions-section-title"
        >
            <div className="mx-auto min-h-[996px] w-full  px-[26px] py-[60px]  sm:py-[90px] sm:px-[12.5%] xl:py-[120px]">
                <div className="mx-auto flex w-full  flex-col items-center gap-[50px]">
                    <div className="flex w-full max-w-[557px] flex-col items-center gap-[40px]">
                        <Image
                            src="/assets/icon/caminhao2.svg"
                            alt="Caminhão"
                            height={0}
                            width={0}
                            className="h-[43px] w-[168px] sm:h-[64px] sm:w-[251px] xl:w-[286px]"
                            priority
                        />

                        <div className="flex w-full flex-col items-center justify-center gap-2 text-center">
                            <h2
                                id="solutions-section-title"
                                className="w-full font-zodiak text-[36px] leading-[42px] font-bold text-N8 sm:text-[44px] sm:leading-[52px] xl:text-[48px] xl:leading-[56px]"
                            >
                                Para o seu problema, a Líderi tem a{" "}
                                <span className="text-R5">solução.</span>
                            </h2>
                            <p className="w-full max-w-[514px] font-poppins text-[14px] leading-[20px] text-N5 sm:text-[16px] sm:leading-[22px] xl:max-w-none xl:leading-[normal]">
                                {subtitle}
                            </p>
                        </div>
                    </div>

                    <div className="flex w-full flex-col items-center gap-[64px]">
                        <div className=" grid w-full grid-cols-1  justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8   xl:items-center xl:justify-center xl:gap-[60px]">
                            {solutionItems.map(
                                ({ title, description, Icon }) => (
                                    <article
                                        key={title}
                                        className=" flex h-full flex-col hover:ring-[2.5px] inset-0 transition-all duration-300 hover:ring-R5/80 shadow-[2px_2px_8px_rgba(0,0,0,0.4)] hover:shadow-[0px_1px_8px_#87240E] justify-between rounded-[8px] ring-2  ring-[rgba(0,0,0,0.2)] bg-white px-[40px] py-[24px]   lg:max-w-none "
                                    >
                                        <div className="flex w-full items-stretch flex-col justify-between gap-8 mb-6">
                                            <Icon
                                                className="h-16 w-16 text-B7"
                                                aria-hidden="true"
                                            />
                                            <div className="flex flex-col gap-3 leading-normal">
                                                <h3 className="font-zodiak sm:text-[24px] text-[20px]  font-bold text-N8">
                                                    {title}
                                                </h3>
                                                <p className="font-poppins xl:text-[18px] text-[16px] text-N5">
                                                    {description}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex w-full justify-end ">
                                            <button
                                                type="button"
                                                aria-label={`Ver detalhes de ${title}`}
                                                className="inline-flex h-[52px] w-[71px] items-center justify-center rounded-[8px] ring-2 ring-R5 text-R5 shadow-[0px_1px_8px_0px_#87240e] transition-all duration-200 hover:-translate-y-[1px] hover:bg-R5 hover:text-N1"
                                            >
                                                <ArrowForwardIcon />
                                            </button>
                                        </div>
                                    </article>
                                ),
                            )}
                        </div>

                        <button
                            type="button"
                            className="hidden h-[52px] items-center gap-2 rounded-[8px] bg-R5 px-6 py-3 font-medium text-N1 transition-all duration-200 hover:-translate-y-[1px] hover:bg-R6"
                        >
                            <span className="font-montserrat text-[16px] leading-6">
                                Ver todos os serviços
                            </span>
                            <ArrowOutwardIcon className="text-N1" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
