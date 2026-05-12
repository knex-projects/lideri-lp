import React from 'react';
import Image, { StaticImageData } from 'next/image';

export interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc: string | StaticImageData;
}

export const ProjectCard = ({ title, description, imageSrc }: ProjectCardProps) => {
  return (
    <div className="group relative flex flex-col min-w-[440px] max-w-[440px] w-[440px] min-h-[311px] max-h-[311px] h-[311px] rounded-[8px] shadow-[2px_2px_8px_rgba(0,0,0,0.4)] hover:shadow-[0px_1px_8px_#87240E] transition-shadow duration-300 overflow-hidden shrink-0 mx-auto bg-transparent cursor-pointer">
      <div className="absolute inset-0 border-[2px] border-dashed border-[#00000033] group-hover:border-[2.5px] group-hover:border-[#87240Ecc] transition-all duration-300 rounded-[8px] pointer-events-none z-10"></div>
      
      <div className="relative w-full h-[112px] shrink-0 overflow-hidden bg-black/10">
        <Image src={imageSrc} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-[#00000073]"></div>
      </div>

      <div className="w-full h-[199px] p-[24px] flex flex-col justify-between shrink-0 bg-white">
        <div className="flex flex-col gap-[12px] mt-[-12px] mb-[12px]">
          <h3 className="text-[18px] leading-[28px] font-[540] text-N8 flex items-center gap-[8px] font-zodiak m-0 p-0">
            <span className="w-[6px] h-[4px] group-hover:w-[16px] group-hover:h-[4px] bg-R5 block shrink-0 transition-all duration-300 rounded-[1px]"></span>
            {title}
          </h3>
          <p className="text-N5 text-[14px] leading-[20px] m-0 p-0 line-clamp-3 font-poppins">
            {description}
          </p>
        </div>

        <div className="flex justify-end mt-auto">
          <button className="flex items-center justify-center h-[52px] pt-[12px] pr-[19px] pb-[12px] pl-[20px] border-2 border-R5 text-R5 rounded-[8px] shadow-[0px_1px_8px_#87240E] hover:bg-R5 hover:text-white transition-colors shrink-0">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
