import type { CaseCardProps } from '@/src/types';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';



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
        <article className='group mb-8.5 flex h-153 w-full flex-col gap-4 font-montserrat md:basis-[calc(50%-0.9375rem)] md:max-w-[calc(50%-0.9375rem)] xl:basis-[calc(33.333%-1.25rem)] xl:max-w-[calc(33.333%-1.25rem)]'>
            <Image src={imageSrc} alt={""} width={672} height={512} className="min-h-90.5 max-h-90.5 w-full object-cover object-[100%_25%] rounded-[0.5rem] shadow-[0rem_0.25rem_0.25rem_0rem_#08166D40]"/>
            <h3 className='flex text-[1.125rem] md:text-[1.5rem] items-center gap-2 font-semibold mt-1.25'>
                <span className="h-1 w-1.5 rounded-[0.0625rem] bg-[#0A266B]"/>
                {title}
            </h3>
            <p className='text-[0.875rem] md:text-[1rem] overflow-y-auto text-[#2D2D2D]'>
                {description}
            </p>
            <Link href={`/cases/${slug}`} className="mt-auto flex justify-end">
                <button className="flex w-full items-center justify-center h-13 rounded-[0.5rem] border-2 border-[#87240E] bg-[#87240E] px-1.25 text-white shadow-[0rem_0.0625rem_0.5rem_#87240E] transition-colors duration-300 hover:bg-R4">
                    Explorar resultados <div className="ml-2 h-3.75 w-3.5"><IconLink/></div>
                </button>
            </Link>
        </article>
    )
};