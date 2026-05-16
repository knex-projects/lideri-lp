import Image from "next/image";

type Partner = {
    name: string;
    src: string;
    width: number;
    height: number;
    className?: string;
};

const partners: Partner[] = [
    {
        name: "PB Júnior",
        src: "/assets/images/partners/pb-junior.svg",
        width: 207,
        height: 105,
        className: "order-1",
    },
    {
        name: "UFPB",
        src: "/assets/images/partners/ufpb.svg",
        width: 85,
        height: 127,
        className: "order-3 sm:order-2",
    },
    {
        name: "Brasil Júnior",
        src: "/assets/images/partners/brasil-junior.svg",
        width: 207,
        height: 77,
        className: "order-2 sm:order-3",
    },
    {
        name: "Proex Comex UFPB",
        src: "/assets/images/partners/proex-comex.svg",
        width: 114,
        height: 127,
        className: "order-4",
    },
    {
        name: "ESRI",
        src: "/assets/images/partners/esri.svg",
        width: 101,
        height: 146,
        className: "order-5",
    },
];

export default function PartnersSection() {
    return (
        <section
            className="w-full bg-transparent py-[60px] sm:py-[90px] xl:py-[120px]"
            aria-labelledby="partners-section-title"
        >
            <div className="mx-auto flex w-full flex-col items-center gap-[60px]">
                <h2
                    id="partners-section-title"
                    className="w-full px-[26px] sm:px-[12.5%] text-left font-zodiak text-[36px] leading-[42px] font-bold text-N8 sm:text-[44px] sm:leading-[52px] xl:text-[48px] xl:leading-[56px]"
                >
                    Nossos <span className="text-R5">parceiros.</span>
                </h2>

                <div className="flex w-full flex-col items-stretch">
                    <div className="h-px w-full border-t-[2.5px] border-dashed border-N4" />

                    <div className="flex max-sm:flex-col sm:flex-wrap items-center justify-center gap-x-10 gap-y-10 px-[26px] py-[40px] sm:gap-x-[60px] sm:px-[12.5%] sm:py-[60px] xl:gap-x-[86px]">
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

                    <div className="h-px w-full border-t-[2.5px] border-dashed border-N4" />
                </div>
            </div>
        </section>
    );
}
