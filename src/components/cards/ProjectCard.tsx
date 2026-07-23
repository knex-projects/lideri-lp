import React, { SVGProps } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

export interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc: string | StaticImageData;
  slug: string;
  priority?: boolean;
}

function IconLink(props: SVGProps<SVGSVGElement>) {
    return (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.13125 6.75H0V5.25H9.13125L4.93125 1.05L6 0L12 6L6 12L4.93125 10.95L9.13125 6.75Z" fill="#680000"/>
      </svg>
    )
}

export const ProjectCard = ({ title, description, imageSrc, slug, priority = false }: ProjectCardProps) => {
  return (
    <div className="group relative flex flex-col w-full max-w-[360px] min-[500px]:min-w-[400px] min-[500px]:max-w-[400px] min-[500px]:w-[400px] md:min-w-[400px] md:max-w-[400px] md:w-[400px] lg:min-w-[440px] lg:max-w-[440px] lg:w-[440px] min-h-[520px]   rounded-[8px] shadow-[2px_2px_8px_rgba(0,0,0,0.4)] hover:shadow-[0px_1px_8px_#87240E] transition-shadow duration-300 overflow-hidden shrink-0 bg-transparent cursor-pointer mb-4">
      <div className="absolute inset-0 border-[2px] border-[#00000033] group-hover:border-[2.5px] group-hover:border-[#87240Ecc] transition-all duration-300 rounded-[8px] pointer-events-none z-10"></div>

      <div className="relative w-full h-[350px] shrink-0 overflow-hidden bg-black/10">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 500px) 100vw, (max-width: 768px) 300px, (max-width: 1024px) 400px, 440px"
          className="object-cover object-top"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-[#00000073]"></div>
      </div>

      <div className="w-full flex-1 md:flex-none  p-[24px] flex flex-col justify-between shrink-0 bg-white">
        <div className="flex flex-col gap-[12px] mt-[-12px] mb-[12px]">
          <h3 className="text-[14px] min-[500px]:text-[15px] md:text-[17px] lg:text-[18px] leading-[22px] min-[500px]:leading-[23px] md:leading-[26px] lg:leading-[28px] font-[540] text-N8 flex items-center gap-[8px] font-bold font-montserrat m-0 p-0">
            <span className="w-[6px] h-[4px] group-hover:w-[16px] font-bold group-hover:h-[4px] bg-R5 block shrink-0 transition-all duration-300 rounded-[1px]"></span>
            {title}
          </h3>
          <p className="text-N5 text-[16px] leading-[20px] m-0 p-0 line-clamp-none min-[500px]:line-clamp-3 md:line-clamp-3 font-montserrat">
            {description}
          </p>
        </div>

          <Link href={`/cases/${slug}`} className="mt-auto flex justify-end items-center gap-[8px] text-R5 text-[14px] min-[500px]:text-[15px] md:text-[17px] lg:text-[16px] leading-[22px] min-[500px]:leading-[23px] md:leading-[26px] lg:leading-[28px]">
              Saiba mais <div className="ml-[8px] h-[12px] w-[12px]"><IconLink/></div>
          </Link>
      </div>
    </div>
  );
};
