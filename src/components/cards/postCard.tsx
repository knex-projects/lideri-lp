'use client';

import type { PostCardProps } from '@/src/types';
import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';




const statusLabels = {
  posted: 'Postado',
  scheduled: 'Agendado',
  draft: 'Rascunho',
};

const statusStyles = {
  posted: 'bg-green-100 text-green-800',
  scheduled: 'bg-amber-100 text-amber-800',
  draft: 'bg-gray-200 text-gray-700',
};

export default function PostCardCMS({ titulo, categoria, autor, data, imageSrc, status = 'posted', onDelete, onEdit, isDeleting = false }: PostCardProps) {
  return (
    <div className="group relative
      w-full h-auto h-2.5 lg:min-h-20 bg-white border-b border-gray-100 max-lg:pr-14 last:border-0 last:pb-0
      flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 
    ">


      <div className="flex items-center gap-2 lg:gap-6 w-full lg:max-w-197.25">


        {imageSrc ? (
          <img
            src={imageSrc}
            alt={titulo}
            className="w-full max-w-35.5 h-20 object-cover rounded-[0.5rem]"
          />
        ) : (

          <div className="w-full max-w-35.5 h-20 object-cover rounded-[0.5rem] bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
            Sem imagem
          </div>
        )}



        <div className="flex flex-col gap-1 lg:gap-3 w-full min-w-0">

          <h4 className="
            font-['Montserrat'] font-medium text-black text-left  leading-tight
            text-[0.875rem] sm:tex-[1.5rem] lg:text-[2rem] line-clamp-1
          ">
            {titulo}
          </h4>


          <div className="flex flex-wrap items-center gap-2 lg:gap-4">
            <span className="
              font-['Montserrat'] font-normal text-[rgb(45,45,45)]
              text-[0.5rem] sm:text-[1rem] lg:text-[1.5rem]
            ">
              Categoria: {categoria}
            </span>
            <span className="
              font-['Montserrat'] font-normal text-[rgb(45,45,45)]
              text-[0.5rem] sm:text-[1rem] lg:text-[1.5rem]
            ">
              Autor: {autor}
            </span>
            <span className={`rounded-full px-2 py-1 font-['Montserrat'] text-[0.5rem] lg:text-xs font-semibold ${statusStyles[status]}`}>
              {statusLabels[status]}
            </span>
          </div>
        </div>

      </div>

      <div className="
        flex flex-row lg:flex-col items-end  justify-between lg:justify-center gap-2 lg:gap-4 
        w-full lg:w-33.5 h-full pt-y-2 lg:pt-0 border-t lg:border-0 border-gray-50 
      ">

        <span className=" max-lg:absolute right-0 top-0
          font-['Montserrat'] font-semibold text-[rgb(135,36,14)]
          text-[0.5rem] lg:text-[1.5rem] lg:font-normal
        ">
          {data}
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={`Excluir ${titulo}`}
            onClick={onDelete}
            disabled={isDeleting}
            className="
              w-8 h-8 bg-N1 border-R5 border-2 rounded-lg 
              flex max-lg:absolute right-0 top-5 justify-center p-2 transition-all duration-200 
              opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 max-lg:opacity-100 max-lg:translate-y-0
              group-hover:bg-R5 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed
            "
          >
            <Trash2 className="w-4 h-4 text-R5 group-hover:text-N1 flex-shrink-0" />
          </button>

          <button
            type="button"
            aria-label={`Editar ${titulo}`}
            onClick={onEdit}
            className="
              w-8 h-8 bg-[rgb(135,36,14)] border border-[rgb(94,21,4)] rounded-lg 
              flex max-lg:absolute right-0 top-5 justify-center p-2 transition-all duration-200 
              hover:bg-[rgb(94,21,4)] active:scale-95
            "
          >
            <Pencil className="w-4 h-4 text-white flex-shrink-0" />
          </button>
        </div>
      </div>

    </div>
  );
}
