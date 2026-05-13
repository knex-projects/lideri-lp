import React from 'react';
import Image, { StaticImageData } from 'next/image';

export interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc: string | StaticImageData;
}

export const ProjectCard = ({ title, description, imageSrc }: ProjectCardProps) => {
  return (
    <div className="group relative flex flex-col w-full max-w-[360px] min-[500px]:min-w-[300px] min-[500px]:max-w-[300px] min-[500px]:w-[300px] md:min-w-[400px] md:max-w-[400px] md:w-[400px] lg:min-w-[440px] lg:max-w-[440px] lg:w-[440px] min-h-[353px] h-auto min-[412px]:min-h-[317px] min-[412px]:max-h-[317px] min-[412px]:h-[317px] min-[500px]:min-h-[317px] min-[500px]:max-h-[317px] min-[500px]:h-[317px] md:min-h-[330px] md:max-h-[330px] md:h-[330px] lg:min-h-[311px] lg:max-h-[311px] lg:h-[311px] rounded-[8px] shadow-[2px_2px_8px_rgba(0,0,0,0.4)] hover:shadow-[0px_1px_8px_#87240E] transition-shadow duration-300 overflow-hidden shrink-0 bg-transparent cursor-pointer">
      <div className="absolute inset-0 border-[2px] border-dashed border-[#00000033] group-hover:border-[2.5px] group-hover:border-[#87240Ecc] transition-all duration-300 rounded-[8px] pointer-events-none z-10"></div>
      
      <div className="relative w-full h-[112px] shrink-0 overflow-hidden bg-black/10">
        <Image src={imageSrc} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-[#00000073]"></div>
      </div>

      <div className="w-full flex-1 md:flex-none md:h-[218px] lg:h-[199px] p-[24px] flex flex-col justify-between shrink-0 bg-white">
        <div className="flex flex-col gap-[12px] mt-[-12px] mb-[12px]">
          <h3 className="text-[14px] min-[500px]:text-[15px] md:text-[17px] lg:text-[18px] leading-[22px] min-[500px]:leading-[23px] md:leading-[26px] lg:leading-[28px] font-[540] text-N8 flex items-center gap-[8px] font-bold font-zodiak m-0 p-0">
            <span className="w-[6px] h-[4px] group-hover:w-[16px] group-hover:h-[4px] bg-R5 block shrink-0 transition-all duration-300 rounded-[1px]"></span>
            {title}
          </h3>
          <p className="text-N5 text-[14px] leading-[20px] m-0 p-0 line-clamp-none min-[500px]:line-clamp-3 md:line-clamp-3 font-poppins">
            {description}
          </p>
        </div>

        <div className="flex justify-end mt-auto">
          <button className="flex items-center justify-center w-[54px] md:w-[60px] lg:w-auto h-[40px] md:h-[46px] lg:h-[52px] pt-[12px] pr-[19px] pb-[12px] pl-[20px] border-2 border-R5 text-R5 rounded-[8px] shadow-[0px_1px_8px_#87240E] hover:bg-R5 hover:text-white transition-colors shrink-0">
            <svg
              className="w-[16px] h-[16px] lg:w-[24px] lg:h-[24px] shrink-0"
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
