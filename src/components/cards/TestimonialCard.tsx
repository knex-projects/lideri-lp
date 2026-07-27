import type { Testimonial } from '@/src/types';
import Image from "next/image";
import Aspas from "@/public/assets/icon/aspas.svg";



export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div
      className="
        flex flex-col w-full sm:w-85 lg:min-w-85 lg:w-85 min-h-106
        h-auto
        gap-6
        rounded-[0.5rem]
        border-[0.125rem] border-[#00000033]
        p-8
        bg-white
        transition-shadow duration-300
        hover:shadow-[0rem_0.25rem_1.5rem_rgba(0,0,0,0.1)]
      "
    >
      <Image
        src={Aspas}
        alt="Aspas"
        width={46}
        height={42.75}
        className="w-11.5 h-10.6875 shrink-0"
        style={{ height: "auto" }}
      />
      
      <div className="flex flex-col gap-4">
        <div className="w-6 h-1 bg-R5 rounded-full shrink-0" />
         <p className="font-montserrat font-normal text-[1rem] leading-[1.5] tracking-[0] text-N6 w-auto min-[31.25rem]:w-69">
          {testimonial.quote}
        </p>
      </div>
      

      <div className="flex flex-col gap-4 mt-auto">
        <div className="flex items-center gap-3 mt-2">
          <div className="relative w-20 h-20 shrink-0 rounded-full overflow-hidden border-2 border-R3">
            <Image
              src={testimonial.avatarUrl}
              alt={`Foto de ${testimonial.name}`}
              fill
              sizes="5rem"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col ">
            <span className="font-montserrat font-semibold text-[1rem] text-N8 leading-tight">
              {testimonial.name}
            </span>
            <span className="font-montserrat text-[0.875rem] text-N5 leading-tight">
              {testimonial.role}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
