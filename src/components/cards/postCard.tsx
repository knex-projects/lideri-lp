'use client';

import React from 'react';
import { Pencil } from 'lucide-react';
import Image from 'next/image';


interface PostCardProps {
  titulo: string;
  categoria: string;
  autor: string;
  data: string;
  imageSrc: string;
}

export default function PostCardCMS({ titulo, categoria, autor, data, imageSrc }: PostCardProps) {
  return (
    <div className=" relative
      w-full h-auto min-h-[10px] lg:min-h-[80px] bg-white border-b border-gray-100 max-lg:pr-14 last:border-0 last:pb-0
      flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-[386px]
    ">


      <div className="flex items-center gap-2 lg:gap-6 w-full lg:max-w-[789px]">

        <Image
          src={imageSrc}
          alt={titulo}
          sizes="(max-width: 1024px) 77px, 142px"
          className="object-cover  bg-gray-200 rounded-lg   w-[77px] h-[44px] lg:w-[142px] lg:h-[80px] "
        />



        <div className="flex flex-col gap-1 lg:gap-3 w-full min-w-0">

          <h4 className="
            font-['Montserrat'] font-medium text-black text-left break-words leading-tight
            text-[14px] lg:text-[32px]
          ">
            {titulo}
          </h4>


          <div className="flex flex-wrap items-center gap-2 lg:gap-4">
            <span className="
              font-['Arial'] font-normal text-[rgb(45,45,45)]
              text-[8px] lg:text-[24px]
            ">
              Categoria: {categoria}
            </span>
            <span className="
              font-['Arial'] font-normal text-[rgb(45,45,45)]
              text-[8px] lg:text-[24px]
            ">
              Autor: {autor}
            </span>
          </div>
        </div>

      </div>

      <div className="
        flex flex-row lg:flex-col items-end  justify-between lg:justify-center gap-2 lg:gap-4 
        w-full lg:w-[134px] h-full pt-y-2 lg:pt-0 border-t lg:border-0 border-gray-50 
      ">

        <span className=" max-lg:absolute right-0 top-0
          font-['Montserrat'] font-semibold text-[rgb(135,36,14)]
          text-[8px] lg:text-[24px] lg:font-normal
        ">
          {data}
        </span>

        <button className="
          w-8 h-8 bg-[rgb(135,36,14)] border border-[rgb(94,21,4)] rounded-lg 
          flex max-lg:absolute right-0 top-5  justify-center p-2 transition-all duration-200 
          hover:bg-[rgb(94,21,4)] active:scale-95
        ">
          <Pencil className="w-4 h-4 text-white flex-shrink-0" />
        </button>
      </div>

    </div>
  );
}