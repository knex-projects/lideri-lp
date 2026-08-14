import type { ProjectCardProps } from '@/src/types';
import React, { SVGProps } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';



function IconLink(props: SVGProps<SVGSVGElement>) {
    return (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.13125 6.75H0V5.25H9.13125L4.93125 1.05L6 0L12 6L6 12L4.93125 10.95L9.13125 6.75Z" fill="#680000"/>
      </svg>
    )
}

export const ProjectCard = ({ title, description, imageSrc, slug, priority = false }: ProjectCardProps) => {
  return (
    <div className="group relative flex flex-col w-full max-w-90 min-[31.25rem]:min-w-100 min-[31.25rem]:max-w-100 min-[31.25rem]:w-100 md:min-w-100 md:max-w-100 md:w-100 lg:min-w-110 lg:max-w-110 lg:w-110 min-h-130   rounded-[0.5rem] shadow-[0.125rem_0.125rem_0.5rem_rgba(0,0,0,0.4)] hover:shadow-[0rem_0.0625rem_0.5rem_#87240E] transition-shadow duration-300 overflow-hidden shrink-0 bg-transparent cursor-pointer mb-4">
      <div className="absolute inset-0 border-[0.125rem] border-[#00000033] group-hover:border-[0.15625rem] group-hover:border-[#87240Ecc] transition-all duration-300 rounded-[0.5rem] pointer-events-none z-10"></div>

      <div className="relative w-full h-87.5 shrink-0 overflow-hidden bg-black/10">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 31.25rem) 100vw, (max-width: 48rem) 18.75rem, (max-width: 64rem) 25rem, 27.5rem"
          className="object-cover object-top"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-[#00000073]"></div>
      </div>

      <div className="w-full flex-1 md:flex-none  p-6 flex flex-col justify-between shrink-0 bg-white">
        <div className="flex flex-col gap-3 -mt-3 mb-3">
          <h3 className="text-[0.875rem] min-[31.25rem]:text-[0.9375rem] md:text-[1.0625rem] lg:text-[1.125rem] leading-[1.375rem] min-[31.25rem]:leading-[1.4375rem] md:leading-[1.625rem] lg:leading-[1.75rem] font-[540] text-N8 flex items-center gap-2 font-bold font-montserrat m-0 p-0">
            <span className="w-1.5 h-1 group-hover:w-4 font-bold group-hover:h-1 bg-R5 block shrink-0 transition-all duration-300 rounded-[0.0625rem]"></span>
            {title}
          </h3>
          <p className="text-N5 text-[0.875rem] leading-[1.25rem] m-0 p-0 line-clamp-none min-[31.25rem]:line-clamp-3 md:line-clamp-3 font-montserrat">
            {description}
          </p>
        </div>

          <Link href={`/cases/${slug}`} className="mt-auto flex justify-end items-center gap-2 text-R5 text-[0.875rem] min-[31.25rem]:text-[0.9375rem] md:text-[1.0625rem] lg:text-[1.125rem] leading-[1.375rem] min-[31.25rem]:leading-[1.4375rem] md:leading-[1.625rem] lg:leading-[1.75rem]">
              Saiba mais <div className="ml-2 h-3 w-3"><IconLink/></div>
          </Link>
      </div>
    </div>
  );
};
