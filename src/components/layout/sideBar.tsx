'use client';

import type { SidebarCMSProps } from '@/src/types';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FileText, User, FolderDown, LogOut, Pencil } from 'lucide-react';
import { signOut } from 'next-auth/react';



export default function SidebarCMS({ isOpen, onClose }: SidebarCMSProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isEditor = pathname.startsWith('/editor');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const menuItens = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { label: 'Postagens', icon: FileText, href: '/posts' },
    { label: 'Mídia', icon: FolderDown, href: '/midias' },
    { label: 'Novo Post', icon:Pencil , href: '/editor' },
    
  ];

  return (
    <>
     
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden top-24.5" 
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed top-24.5 left-0 h-[calc(100vh-6.125rem)] w-72 bg-N1 p-6 z-40 flex flex-col justify-between border-r border-gray-800 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        
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
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg font-medium text-xl lg:text-2xl transition-all duration-200 ${
                  isActive
                    ? 'bg-[rgb(135,36,14)] text-white shadow-lg'
                    : 'text-N8 border hover:border-R5 border-dashed border-white hover:text-white'
                },${item.label === 'Novo Post' ? 'flex lg:hidden border-2 border-[rgb(135,36,14,1)] text-[rgb(135,36,14)]':''},
                ${item.label === 'Novo Post' && isEditor?'hidden absolute':''}`
                
              }
              >
                <Icon className="size-7 lg:size-8 flex-shrink-0" />
                <span className="text-base">{item.label}</span>
              </Link>
            );
          })}

          {isEditor && (
            <div className="lg:hidden mt-4 pt-4 border-t border-gray-200 flex flex-col gap-2">
              <button type="button" onClick={() => window.dispatchEvent(new Event('editor:save-draft'))} className=" border-2 border-[#87240E] flex items-center gap-3 px-3 py-3 rounded-lg font-medium text-xl lg:text-2xl transition-all duration-200  text-[#87240E] hover:bg-gray-800 ">
                Salvar rascunho
              </button>
              <button type="button" onClick={() => router.push('/dashboard')} className=" border-2 border-[#87240E] flex items-center gap-3 px-3 py-3 rounded-lg font-medium text-xl lg:text-2xl transition-all duration-200  text-[#87240E] hover:bg-gray-800 ">
                Sair
              </button>
            </div>
          )}
        </nav>

    
        <div className="relative flex lg:flex-col lg:gap-4 lg:border-[0.0625rem] lg:rounded-[0.5rem] lg:py-3 lg:px-4 lg:border-N4 lg:w-full">
          <button
            type="button"
            onClick={() => setIsProfileMenuOpen((isOpen) => !isOpen)}
            className="flex items-center gap-3 lg:px-2 text-left"
            aria-expanded={isProfileMenuOpen}
            aria-controls="profile-menu"
          >
            <div className="w-10 h-10 rounded-full border-[0.0625rem] border-N4 bg-N8 flex items-center justify-center text-white font-bold flex-shrink-0">
              <User className="w-5 h-5 text-gray-300" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-N8 truncate">Admin Líderi</span>
              <span className="text-xs text-gray-500 truncate">Redator</span>
            </div>
          </button>

          {isProfileMenuOpen && (
            <div id="profile-menu" className="absolute bottom-full left-0 mb-2 w-full rounded-lg border border-gray-200 bg-white p-2 shadow-lg lg:bottom-auto lg:top-full lg:mt-2 lg:mb-0">
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-[#87240E] hover:bg-[#87240E]/10 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Sair da conta
              </button>
            </div>
          )}
        </div>

      </aside>
    </>
  );
}
