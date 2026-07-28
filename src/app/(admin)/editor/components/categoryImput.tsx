'use client';
import type { CategoryInputProps, AdminCategory } from '@/src/types';
import React, { useState, useEffect, useRef } from 'react';
import { api } from '@/src/services/api';
import { cms } from '@/src/services/cms';
import toast from 'react-hot-toast';

export default function CategoryInput({ categoriasSelecionadas, onChangeCategorias }: CategoryInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [todasCategorias, setTodasCategorias] = useState<AdminCategory[]>([]);
  const [novaCategoriaTexto, setNovaCategoriaTexto] = useState('');
  const [criandoCategoria, setCriandoCategoria] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const buscarCategorias = async () => {
      try {
        const dados = await cms.getCategories();
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
      const dados = await api.createCategory(novaCategoriaTexto.trim());

      const novaCat = { _id: dados.categoryId, title: dados.title };
      setTodasCategorias((prev) => [...prev, novaCat]);


      onChangeCategorias([dados.categoryId]);
      setNovaCategoriaTexto('');
      setIsOpen(false);
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
      await api.deleteCategory(id);

      setTodasCategorias((prev) => prev.filter((cat) => cat._id !== id));

      // Se a categoria deletada for a atualmente selecionada, reseta para vazio
      if (categoriasSelecionadas.includes(id)) {
        onChangeCategorias([]);
      }

      toast.success('Categoria excluída com sucesso!', { id: toastId });
    } catch (error: any) {
      toast.error(`Erro ao excluir categoria: ${error.message}`, { id: toastId });
    }
  };


  const handleSelecionarCategoria = (id: string) => {

    if (categoriasSelecionadas.includes(id)) {
      onChangeCategorias([]);
    } else {
      onChangeCategorias([id]);
    }
    setIsOpen(false);
  };


  const handleSelecionarGeral = () => {
    onChangeCategorias([]);
    setIsOpen(false);
  };


  const obterTextoBotao = () => {
    if (!categoriasSelecionadas || categoriasSelecionadas.length === 0) return 'Geral';


    const categoriaAtualId = categoriasSelecionadas[0];
    const catEncontrada = todasCategorias.find((c) => c._id === categoriaAtualId);

    return catEncontrada ? catEncontrada.title : 'Geral';
  };

  return (
    <div ref={dropdownRef} className="relative w-full max-w-92 font-['Montserrat']">
      <label className="text-black font-medium text-sm mb-2 block">Categoria</label>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full max-w-92 min-h-13 bg-white border border-[rgb(108,108,108)] rounded-[0.5rem] pt-3 pb-3 px-4 flex items-center justify-between gap-2 text-left transition-colors hover:bg-gray-50 focus:outline-none"
      >
        <span className="text-[1.25rem] font-normal text-[rgb(17,17,17)] truncate max-w-70">
          {obterTextoBotao()}
        </span>
        <span className={`text-[1.75rem] leading-none font-normal text-[rgb(135,36,14)] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg width="23" height="14" viewBox="0 0 23 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.1111 8.28829L2.59259 0L0 2.52252L11.1111 13.3333L22.2222 2.52252L19.6296 0L11.1111 8.28829Z" fill="#87240E" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-[rgb(108,108,108)] rounded-[0.5rem] p-3 shadow-lg z-50 flex flex-col gap-3">

          <div className="flex flex-col gap-1 max-h-40 overflow-y-auto pr-1">

            {/* Opção Geral / Padrão */}
            <button
              type="button"
              onClick={handleSelecionarGeral}
              className={`w-full text-left px-3 py-2 rounded-[0.375rem] text-[1rem] transition-colors select-none ${categoriasSelecionadas.length === 0
                  ? 'bg-[rgb(135,36,14)] text-white font-medium'
                  : 'text-[rgb(17,17,17)] hover:bg-gray-100 font-normal'
                }`}
            >
              Geral (Padrão)
            </button>

            {todasCategorias.map((cat) => {
              // Verifica se esta é a única categoria selecionada
              const estaAtivo = categoriasSelecionadas.includes(cat._id);
              return (
                <div
                  key={cat._id}
                  className={`w-full flex items-center justify-between rounded-[0.375rem] transition-all group ${estaAtivo ? 'bg-[rgb(135,36,14)] text-white' : 'hover:bg-gray-100 text-[rgb(17,17,17)]'
                    }`}
                >
                  <button
                    type="button"
                    onClick={() => handleSelecionarCategoria(cat._id)}
                    className={`flex-1 text-left px-3 py-2 rounded-l-[0.375rem] text-[1rem] select-none font-normal ${estaAtivo ? 'font-medium' : 'hover:text-[rgb(135,36,14)]'
                      }`}
                  >
                    {cat.title}
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleDeletarCategoria(e, cat._id)}
                    className={`px-3 py-2 rounded-r-[0.375rem] transition-colors focus:outline-none flex items-center justify-center ${estaAtivo
                        ? 'hover:bg-red-700 text-white/80 hover:text-white'
                        : 'text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100'
                      }`}
                    title="Deletar categoria"
                  >
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>

          <hr className="border-gray-100" />

          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Nova categoria..."
              value={novaCategoriaTexto}
              onChange={(e) => setNovaCategoriaTexto(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 border border-[rgb(108,108,108)] rounded-[0.375rem] px-3 h-10 text-[0.875rem] text-black focus:outline-none focus:border-[rgb(135,36,14)]"
            />
            <button
              type="button"
              onClick={handleCriarNovaCategoria}
              disabled={criandoCategoria || !novaCategoriaTexto.trim()}
              className="w-10 h-10 bg-[rgb(135,36,14)] text-white text-[1.375rem] rounded-[0.375rem] flex items-center justify-center hover:bg-opacity-90 disabled:opacity-40 transition-all"
            >
              {criandoCategoria ? '...' : '+'}
            </button>
          </div>

        </div>
      )}
    </div>
  );
}