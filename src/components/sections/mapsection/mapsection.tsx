"use client";

import dynamic from 'next/dynamic';
import Image from 'next/image';
import barco from '@/public/assets/icon/barcoicon.svg'

const Map = dynamic(
  () => import('./MapComponent'), 
  { 
    ssr: false,
    loading: () => <div className="h-full w-full bg-gray-100 animate-pulse" />
  }
);

export default function MapWrapper() {
  return (
    <div className=" w-full sm:h-[1014px] min-h-[860px] flex flex-col justify-baseline  sm:justify-center sm:items-center py-[40px] sm:py-20 px-[12.5%] max-sm:px-[26px]">
      
        <Image src={barco} alt='logo barco' className='max-sm:w-[192px] max-sm:h-[49px]'/>
        <h1 className='sm:text-[48px] pt-[30px] sm:pt-[40px] text-[36px] max-w-[361px] font-zodiac font-bold leading-14 text-N8 w-fit sm:max-w-[553px] leading-snug '>Países prospectados em <strong className='text-R5'>mapa.</strong></h1>
        <p className='sm:text-[16px] text-[14px] w-fit pb-[40px] max-w-[361px]  sm:max-w-[553px] text-N5 font-poppins '>Veja a seguir os países em que já trabalhamos representados em mapa.</p>
      <div className='w-full sm:h-[576px] h-[500px]'>
         <Map />
      </div>
      
    </div>
  );
}