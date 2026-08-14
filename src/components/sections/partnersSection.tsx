import type { Partner } from '@/src/types';
import Image from "next/image";



const partners: Partner[] = [
    {
        name: "PB Júnior",
        src: "/assets/images/partners/pb-junior.webp",
        width: 207,
        height: 105,
        className: "order-1",
    },
    {
        name: "UFPB",
        src: "/assets/images/partners/ufpb.webp",
        width: 85,
        height: 127,
        className: "order-3 sm:order-2",
    },
    {
        name: "Brasil Júnior",
        src: "/assets/images/partners/brasil-junior.webp",
        width: 207,
        height: 77,
        className: "order-2 sm:order-3",
    },
    {
        name: "Proex Comex UFPB",
        src: "/assets/images/partners/proex-comex.webp",
        width: 114,
        height: 127,
        className: "order-4",
    },
    {
        name: "ESRI",
        src: "/assets/images/partners/esri.webp",
        width: 101,
        height: 146,
        className: "order-5",
    },
];

export default function PartnersSection() {
    return (
        <section
            className="w-full bg-transparent py-15 sm:py-14 "
            aria-labelledby="partners-section-title"
        >
            <div className="mx-auto flex w-full flex-col items-center gap-15">
                <h2
                    id="partners-section-title"
                    className="w-full px-6.5 md:px-[12.5%] text-left font-zodiak text-[2.25rem] leading-[2.625rem] font-normal text-N8 sm:text-[2.75rem] sm:leading-[3.25rem] xl:text-[3rem] xl:leading-[3.5rem]"
                >
                    Nossos <span className="text-R5">parceiros.</span>
                </h2>

                <div className="flex w-full flex-col items-stretch">
                    <div className="h-px w-full  " />

                    <div className="flex max-sm:flex-col sm:flex-wrap items-center justify-center gap-x-10 gap-y-10 px-6.5 py-10 sm:gap-x-15 sm:px-[12.5%] sm:py-15 xl:gap-x-21.5">
                        {partners.map((partner) => (
                            <div
                                key={partner.name}
                                className={`flex shrink-0 items-center justify-center ${partner.className ?? ""}`}
                                style={{
                                    width: partner.width,
                                    height: partner.height,
                                }}
                            >
                                <Image
                                    src={partner.src}
                                    alt={partner.name}
                                    width={partner.width}
                                    height={partner.height}
                                    className="h-full w-full object-contain"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="h-px w-full " />
                </div>
            </div>
        </section>
    );
}
