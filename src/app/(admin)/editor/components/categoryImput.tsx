'use client';
import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@sanity/client';
import toast from 'react-hot-toast';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-07-09',
  useCdn: false,
});

interface CategoryInputProps {
  categoriasSelecionadas: string[];
  onChangeCategorias: (ids: string[]) => void;
}

interface Categoria {
  _id: string;
  title: string;
}

export default function CategoryInput({ categoriasSelecionadas, onChangeCategorias }: CategoryInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [todasCategorias, setTodasCategorias] = useState<Categoria[]>([]);
  const [novaCategoriaTexto, setNovaCategoriaTexto] = useState('');
  const [criandoCategoria, setCriandoCategoria] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const buscarCategorias = async () => {
      try {
        const dados = await client.fetch(`*[_type == "category"] | order(title asc) { _id, title }`);
        setTodasCategorias(dados || []);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
        toast.error('Não foi possível carregar as categorias.');
      }
    };
    buscarCategorias();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCriarNovaCategoria = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!novaCategoriaTexto.trim()) return;

    const toastId = toast.loading('Criando categoria...');
    try {
      setCriandoCategoria(true);
      const resposta = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: novaCategoriaTexto.trim() }),
      });

      const dados = await resposta.json();
      if (!resposta.ok) throw new Error(dados.error);

      const novaCat = { _id: dados.categoryId, title: dados.title };
      setTodasCategorias((prev) => [...prev, novaCat]);
      onChangeCategorias([...categoriasSelecionadas, dados.categoryId]);
      setNovaCategoriaTexto('');
      toast.success('Categoria criada com sucesso!', { id: toastId });
    } catch (error: any) {
      toast.error(`Erro ao criar categoria: ${error.message}`, { id: toastId });
    } finally {
      setCriandoCategoria(false);
    }
  };

  
  const handleDeletarCategoria = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); 

    if (!confirm('Tem certeza de que deseja deletar permanentemente esta categoria?')) return;

    const toastId = toast.loading('Excluindo categoria...');
    try {
      const resposta = await fetch('/api/categories', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const dados = await resposta.json();
      if (!resposta.ok) throw new Error(dados.error);

      
      setTodasCategorias((prev) => prev.filter((cat) => cat._id !== id));
      
      
      onChangeCategorias(categoriasSelecionadas.filter((catId) => catId !== id));
      toast.success('Categoria excluída com sucesso!', { id: toastId });
      
    } catch (error: any) {
      toast.error(`Erro ao excluir categoria: ${error.message}`, { id: toastId });
    }
  };

  const handleToggleCategoria = (id: string) => {
    const atualizadas = categoriasSelecionadas.includes(id)
      ? categoriasSelecionadas.filter((catId) => catId !== id)
      : [...categoriasSelecionadas, id];
    onChangeCategorias(atualizadas);
  };

  const obterTextoBotao = () => {
    if (categoriasSelecionadas.length === 0) return 'Geral';
    const nomesMarcados = todasCategorias
      .filter((c) => categoriasSelecionadas.includes(c._id))
      .map((c) => c.title);
    return nomesMarcados.length > 0 ? nomesMarcados.join(', ') : 'Geral';
  };

  return (
    <div ref={dropdownRef} className="relative w-full max-w-[368px] font-['Montserrat']">
      <label className="text-black font-medium text-sm mb-2 block">Categorias</label>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full max-w-[368px] min-h-[52px] bg-white border border-[rgb(108,108,108)] rounded-[8px] pt-[12px] pb-[12px] px-[16px] flex items-center justify-between gap-[8px] text-left transition-colors hover:bg-gray-50 focus:outline-none"
      >
        <span className="text-[20px] font-normal text-[rgb(17,17,17)] truncate max-w-[280px]">
          {obterTextoBotao()}
        </span>
        <span className={`text-[28px] leading-none font-normal text-[rgb(135,36,14)] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg width="23" height="14" viewBox="0 0 23 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.1111 8.28829L2.59259 0L0 2.52252L11.1111 13.3333L22.2222 2.52252L19.6296 0L11.1111 8.28829Z" fill="#87240E"/>
</svg>
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-[rgb(108,108,108)] rounded-[8px] p-[12px] shadow-lg z-50 flex flex-col gap-[12px]">
          
          <div className="flex flex-col gap-1 max-h-[160px] overflow-y-auto pr-1">
            
            <div className={`w-full text-left px-3 py-2 rounded-[6px] text-[16px] font-normal transition-colors select-none ${
              categoriasSelecionadas.length === 0 
                ? 'bg-[rgb(135,36,14)]/10 text-[rgb(135,36,14)] font-medium' 
                : 'text-[rgb(17,17,17)] opacity-50 cursor-not-allowed'
            }`}>
              Geral (Padrão)
            </div>

            {todasCategorias.map((cat) => {
              const estaAtivo = categoriasSelecionadas.includes(cat._id);
              return (
                <div 
                  key={cat._id}
                  className={`w-full flex items-center justify-between rounded-[6px] transition-all group ${
                    estaAtivo ? 'bg-[rgb(135,36,14)] text-white' : 'hover:bg-gray-100 text-[rgb(17,17,17)]'
                  }`}
                >
                  { }
                  <button
                    type="button"
                    onClick={() => handleToggleCategoria(cat._id)}
                    className={`flex-1 text-left px-3 py-2 rounded-l-[6px] text-[16px] select-none font-normal ${
                      estaAtivo ? 'font-medium' : 'hover:text-[rgb(135,36,14)]'
                    }`}
                  >
                    {cat.title}
                  </button>

                  { }
                  <button
                    type="button"
                    onClick={(e) => handleDeletarCategoria(e, cat._id)}
                    className={`px-3 py-2 rounded-r-[6px] transition-colors focus:outline-none flex items-center justify-center ${
                      estaAtivo 
                        ? 'hover:bg-red-700 text-white/80 hover:text-white' 
                        : 'text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100'
                    }`}
                    title="Deletar categoria"
                  >
                    { }
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>

          <hr className="border-gray-100" />

          <div className="flex gap-[8px] items-center">
            <input
              type="text"
              placeholder="Nova categoria..."
              value={novaCategoriaTexto}
              onChange={(e) => setNovaCategoriaTexto(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 border border-[rgb(108,108,108)] rounded-[6px] px-3 h-10 text-[14px] text-black focus:outline-none focus:border-[rgb(135,36,14)]"
            />
            <button
              type="button"
              onClick={handleCriarNovaCategoria}
              disabled={criandoCategoria || !novaCategoriaTexto.trim()}
              className="w-10 h-10 bg-[rgb(135,36,14)] text-white text-[22px] rounded-[6px] flex items-center justify-center hover:bg-opacity-90 disabled:opacity-40 transition-all"
            >
              {criandoCategoria ? '...' : '+'}
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
