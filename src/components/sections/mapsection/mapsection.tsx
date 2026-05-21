"use client";
import InteractiveWorldMap from './InteractiveWorldMap';


export default function MapWrapper() {
  return (
    <div className=" w-full sm:h-[1014px] min-h-[860px] flex flex-col justify-baseline text-center sm:justify-center sm:items-center py-[40px] sm:py-20 px-[12.5%] max-sm:px-[26px]">

      <h1 className='sm:text-[48px]  text-[36px] max-w-[361px] font-zodiac font-normal leading-14 text-N8 w-fit sm:max-w-[553px] leading-snug '>Países prospectados em <strong className='text-R5 font-normal'>mapa.</strong></h1>
      <p className='sm:text-[16px] text-[14px] w-fit pb-[81px] max-w-[361px]  sm:max-w-[553px] text-N5 font-montserrat '>Veja a seguir os países em que já trabalhamos representados em mapa.</p>
      <div className='w-full  sm:h-[576px] h-[500px]'>
        <InteractiveWorldMap/>
      </div>

    </div>
  );
}