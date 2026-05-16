import Image from "next/image";
import Aspas from "@/public/assets/icon/aspas.svg";

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatarUrl: string;
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div
      className="
        max-[359px]:flex-[0_0_100%] min-[360px]:flex-[0_0_340px]
        flex flex-col justify-between
        max-[359px]:w-full min-[360px]:w-[340px]
        h-[491px]
        rounded-[8px]
        border-[2px] border-[#00000033]
        p-8
        bg-white
        transition-shadow duration-300
        hover:shadow-[0px_4px_24px_rgba(0,0,0,0.1)]
      "
    >
      <Image
        src={Aspas}
        alt="Aspas"
        width={46}
        height={42.75}
        className="w-[46px] h-[42.75px]"
        style={{ height: "auto" }}
      />

      <div className="flex flex-col gap-4">
        <div className="w-5 h-0.5 bg-R5 rounded-full" />
        <p className="font-poppins font-normal text-[16px] leading-[1] tracking-[0] text-N6 w-[276px] max-h-[144px] overflow-hidden">
          {testimonial.quote}
        </p>

        <div className="flex items-center gap-3 mt-2">
          <div className="relative w-20 h-20 shrink-0 rounded-full overflow-hidden border-2 border-R3">
            <Image
              src={testimonial.avatarUrl}
              alt={`Foto de ${testimonial.name}`}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-poppins font-semibold text-[16px] text-N8 leading-tight">
              {testimonial.name}
            </span>
            <span className="font-poppins text-[14px] text-N5 leading-tight">
              {testimonial.role}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
