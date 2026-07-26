import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';

export interface CaseCardProps {
  title: string;
  slug: string;
  description: string;
  imageSrc: string | StaticImageData;
}

function IconLink() {
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
}: CaseCardProps) => {
    return(
        <article className='group mb-[34px] flex w-full flex-col gap-[16px] font-montserrat md:basis-[calc(50%-15px)] md:max-w-[calc(50%-15px)] xl:basis-[calc(33.333%-20px)] xl:max-w-[calc(33.333%-20px)]'>
            <Image src={imageSrc} alt={""} width={672} height={512} className="min-h-[362px] max-h-[362px] w-full object-cover object-[100%_25%] rounded-[8px] shadow-[0px_4px_4px_0px_#08166D40]"/>
            <h3 className='flex text-[18px] md:text-[24px] items-center gap-[8px] font-semibold text-B9 mt-[5px]'>
                <span className="h-[4px] w-[6px] rounded-[1px] bg-[#0A266B]"/>
                {title}
            </h3>
            <p className='text-[14px] md:text-[16px] overflow-y-auto text-[#2D2D2D]'>
                {description}
            </p>
            <Link href={`/cases/${slug}`} className="mt-auto flex justify-end">
                <button className="flex w-full items-center justify-center h-[52px] rounded-[8px] border-2 border-[#87240E] bg-[#87240E] px-[20px] text-sm font-medium text-white shadow-[0px_1px_8px_#87240E] transition-colors duration-300 hover:bg-R4 md:text-base">
                    Explorar resultados <div className="ml-[8px] h-[15px] w-[14px]"><IconLink/></div>
                </button>
            </Link>
        </article>
    )
};