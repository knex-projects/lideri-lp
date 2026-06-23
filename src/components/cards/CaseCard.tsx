import React, { SVGProps } from 'react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';

export interface CaseCardProps {
  title: string;
  slug: string;
  description: string;
  imageSrc: string | StaticImageData;
  priority?: boolean;
}

function IconLink(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.29231 12L0 10.7077L8.86154 1.84615H0.923077V0H12V11.0769H10.1538V3.13846L1.29231 12Z" fill="white"/>
        </svg>
    )
}

export const CaseCard = ({
  title,
  description,
  imageSrc,
  slug,
  priority = false,
}: CaseCardProps) => {
  return (
    <article className="group relative flex flex-col w-full max-w-[450px] min-h-[500px] overflow-hidden rounded-[8px] shadow-[2px_2px_8px_rgba(0,0,0,0.4)] transition-shadow duration-300 hover:shadow-[0px_1px_8px_#87240E] mb-4 cursor-pointer">
      <div className="absolute inset-0 rounded-[8px] border-[2px] border-[#00000033] transition-all duration-300 pointer-events-none" />

      <figure className="relative h-[280px] sm:h-[300px] md:h-[320px] overflow-hidden bg-black/10">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 500px) 100vw, (max-width: 768px) 300px, (max-width: 1024px) 400px, 440px"
          className="object-cover object-top"
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
        />
        <div className="absolute inset-0 bg-[#00000073]" />
      </figure>

      <div className="flex flex-col flex-1 p-[24px] bg-white">
        <div className="flex flex-col gap-[12px] mb-[12px]">
          <h3 className="m-0 p-0 flex items-center gap-[8px] text-[14px] min-[500px]:text-[15px] md:text-[17px] lg:text-[18px] leading-[22px] min-[500px]:leading-[23px] md:leading-[26px] lg:leading-[28px] font-bold font-montserrat text-N8">
            <span className="block shrink-0 h-[4px] w-[6px] rounded-[1px] bg-R5 transition-all duration-300 group-hover:w-[16px]" />
            {title}
          </h3>
          <p className="m-0 p-0 text-[14px] leading-[20px] text-N5 font-montserrat min-[400px]:line-clamp-3 md:line-clamp-3">
            {description}
          </p>
        </div>

        <Link href={`/cases/${slug}`} className="mt-auto flex justify-end">
          <button className="flex w-full items-center justify-center h-[46px] rounded-[8px] border-2 border-R5 bg-R5 px-[20px] text-white shadow-[0px_1px_8px_#87240E] transition-colors duration-300 hover:bg-white hover:text-R5">
            Explorar resultados <div className="ml-[8px] h-[12px] w-[12px]"><IconLink/></div>
          </button>
        </Link>
      </div>
    </article>
  );
};