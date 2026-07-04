'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, User, FolderDown } from 'lucide-react';

interface SidebarCMSProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SidebarCMS({ isOpen, onClose }: SidebarCMSProps) {
  const pathname = usePathname();

  const menuItens = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { label: 'Postagens', icon: FileText, href: '/posts' },
    { label: 'Mídia', icon: FolderDown, href: '/midias' },
  ];

  return (
    <>
     
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden top-[98px]" 
          onClick={onClose}
        />
      )}

      <aside className={`
        /* Comportamento Mobile (Slide lateral controlado por props) */
        fixed top-[98px] left-0 h-[calc(100vh-98px)] w-72 bg-N1 p-6 z-40 flex flex-col justify-between border-r border-gray-800 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        
        /* Comportamento Desktop (Sempre visível a partir de lg) */
        lg:translate-x-0 lg:relative lg:top-auto lg:w-64 lg:py-6 lg:px-8 lg:flex flex-shrink-0
        xl:h-[110vh] 2xl:h-[100vh] lg:h-[122vh]
      `}>
        
     
        <nav className="flex flex-col gap-2 w-full justify-start">
          {menuItens.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose} // Fecha o menu automaticamente no mobile ao trocar de página
                className={`flex items-center gap-3 px-3 py-3 rounded-lg font-medium text-xl lg:text-2xl transition-all duration-200 ${
                  isActive
                    ? 'bg-[rgb(135,36,14)] text-white shadow-lg'
                    : 'text-N8 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className="size-[28px] lg:size-[32px] flex-shrink-0" />
                <span className="text-base">{item.label}</span>
              </Link>
            );
          })}
        </nav>

    
        <div className="flex lg:flex-col lg:gap-4 lg:border-[1px] lg:rounded-[8px] lg:py-3 lg:px-4 lg:border-N4 lg:w-full">
          <div className="flex items-center gap-3 lg:px-2">
            <div className="w-10 h-10 rounded-full border-[1px] border-N4 bg-N8 flex items-center justify-center text-white font-bold flex-shrink-0">
              <User className="w-5 h-5 text-gray-300" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-N8 truncate">Admin Líderi</span>
              <span className="text-xs text-gray-500 truncate">Redator</span>
            </div>
          </div>
        </div>

      </aside>
    </>
  );
}