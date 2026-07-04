"use client";
import { ComponentType, SVGProps } from 'react';
import { useState } from 'react';

export interface ServiceCardProps {
    title: string;
    description: string;
    expandedDescription: string;
    benefits: string[];
    icon: ComponentType<SVGProps<SVGSVGElement>>;
}

function IconArrowDown() {
    return (
        <svg viewBox="0 0 29 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.0782 17.2667L0 3.26667L3.28492 0L14.0782 10.7333L24.8715 0L28.1564 3.26667L14.0782 17.2667Z" fill="#680000"/>
        </svg>
    );
}

function IconArrowUp() {
    return (
        <svg viewBox="0 0 29 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.1174 -2.28882e-05L28.2349 14.1175L24.9408 17.4116L14.1174 6.58814L3.29395 17.4116L-0.000137329 14.1175L14.1174 -2.28882e-05Z" fill="#680000"/>
        </svg>
    )
}

export const ServiceCard = ({
    title,
    description,
    expandedDescription,
    benefits,
    icon: Icon,
}: ServiceCardProps) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    }

    return (
        <article className="py-[24px]">
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex w-10 md:w-12 lg:w-14 h-auto shrink-0 items-center justify-center">
                            <Icon/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-[20px] md:text-[26px] lg:text-[28px] font-bold leading-tight">
                                {title.split(' ').slice(0, -1).join(' ')}{' '}
                                <span className="text-[#87240E]">{title.split(' ').pop()}</span>
                            </h3>
                            <p className="text-[14px] md:text-[17px] lg:text-[18px] text-[#333]">{description}</p>
                        </div>
                    </div>
                    <button className='lg:hidden ml-[16px] min-w-[24px] md:min-w-[32px] min-h-[24px] md:min-h-[32px] max-w-[24px] md:max-w-[32px] max-h-[24px] md:max-h-[32px]'
                        onClick={toggleExpand}>
                        {isExpanded ? <IconArrowDown/> : <IconArrowUp/>}
                    </button>
                    <button className='hidden lg:block min-w-[148px] h-[52px] bg-[#87240E] px-[24px] py-[12px] text-[16px] text-white rounded-[8px] ml-[18px] border-[2px] border-[#87240E] hover:bg-white hover:text-[#87240E] transition-colors duration-300'
                        onClick={toggleExpand}>
                        {isExpanded ? "Ver menos" : "Ver mais"}
                    </button>
                </div>
                <hr className="w-full mx-auto border-[1px] border-[#680000]"/>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100 mt-0' : 'max-h-0 opacity-0'}`}>
                    <p className="w-full text-[14px] md:text-[17px] lg:text-[18px] text-justify leading-7 text-[#444]">
                        {expandedDescription}
                    </p>
                    <div className="mt-6">
                        <h3 className="text-[20px] md:text-[22px] text-[24px] font-bold leading-tight">
                            Como esse serviço pode <span className="text-[#87240E]">beneficiar</span> sua empresa?
                        </h3>
                        <ul className="mt-4 list-disc space-y-2 pl-6 text-[14px] md:text-[17px] lg:text-[18px]  text-[#444]">
                            {benefits.map((benefit) => (
                                <li key={benefit}>{benefit}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </article>
    );
};