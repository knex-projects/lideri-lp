import Image from "next/image";
import { lideriIcon } from "@/public/assets"

export function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0D1122]">
           
            <div className="relative flex flex-col items-center gap-6">
                
                
                <div className="relative w-45 h-15 md:w-55 md:h-17.5 animate-pulse">
                    <Image
                        src={lideriIcon}
                        alt="Logo Líderi"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

               
                <div className="relative flex items-center justify-center mt-2">
                    
                    <div className="w-10 h-10 border-4 border-[#87240E]/20 rounded-full" />
                    
                  
                    <div className="absolute w-10 h-10 border-4 border-transparent border-t-[#87240E] border-r-[#87240E] rounded-full animate-spin" />
                </div>

              
                <p className="font-montserrat font-medium text-[0.875rem] md:text-[1rem] text-white/80 tracking-widest uppercase mt-1 animate-pulse">
                    Carregando...
                </p>

            </div>
        </div>
    );
}