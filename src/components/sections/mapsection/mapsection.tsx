"use client";
import InteractiveWorldMap from './InteractiveWorldMap';


export default function MapWrapper() {
  return (
    <div className=" w-full sm:h-253.5 min-h-215 bg-N1 flex flex-col justify-baseline text-center sm:justify-center sm:items-center py-10 sm:py-20 px-[12.5%] max-sm:px-6.5">

      <h1 className='sm:text-[3rem]  text-[2.25rem] max-w-90.25 font-zodiac font-normal leading-14 text-N8 w-fit sm:max-w-138.25 leading-snug '>Países prospectados em <strong className='text-R5 font-normal'>mapa.</strong></h1>
      <p className='sm:text-[1rem] text-[0.875rem] w-fit pb-20.25 max-w-90.25  sm:max-w-138.25 text-N5 font-montserrat '>Veja a seguir os países em que já trabalhamos representados em mapa.</p>
      <div className='w-full  sm:h-144 h-125'>
        <InteractiveWorldMap/>
      </div>

    </div>
  );
}