'use client';
import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@sanity/client';


const readClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-07-09',
  useCdn: false,
});

interface ImageUploadProps {
  onImageSelect: (docId: string, url: string) => void;
  initialPreviewUrl?: string | null;
}

interface UltimaMidia {
  _id: string;
  url: string;
  tituloImagem: string;
}

export default function ImageUpload({ onImageSelect, initialPreviewUrl = null }: ImageUploadProps) {
  const [imageLoading, setImageLoading] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(initialPreviewUrl);
  const [ultimasImagens, setUltimasImagens] = useState<UltimaMidia[]>([]);
  
  const imageInputRef = useRef<HTMLInputElement>(null);

  
  const carregarUltimosPreviews = async () => {
    try {
      const query = `*[_type == "galeria"] | order(_createdAt desc)[0..1] {
        _id,
        tituloImagem,
        "url": arquivo.asset->url
      }`;
      const resultado = await readClient.fetch(query);
      setUltimasImagens(resultado || []);
    } catch (error) {
      console.error("Erro ao carregar miniaturas da galeria:", error);
    }
  };

  
  useEffect(() => {
    carregarUltimosPreviews();
  }, []);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = event.target.files?.[0];
    if (!arquivo) return;

    if (!arquivo.type.startsWith('image/')) {
      alert('Por favor, selecione apenas arquivos de imagem válidos (PNG, JPG, WEBP).');
      return;
    }

    try {
      setImageLoading(true);

      const localUrl = URL.createObjectURL(arquivo);
      setImagePreviewUrl(localUrl);

      const formData = new FormData();
      formData.append('file', arquivo);
      formData.append('titulo', arquivo.name.split('.')[0]);

      const resposta = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.error || 'Erro desconhecido no servidor.');
      }

      onImageSelect(dados.docId, localUrl);
      alert('Imagem adicionada à galeria com sucesso!');
      
      
      carregarUltimosPreviews();

    } catch (error: any) {
      console.error('Erro ao subir imagem:', error);
      alert(`Falha no upload: ${error.message}`);
      setImagePreviewUrl(null);
    } finally {
      setImageLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-black font-medium text-lg md:text-xl">Mídia</label>
      <div className="flex gap-2 w-full">
        
        { }
        <input
          type="file"
          ref={imageInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />

        { }
        <button
          type="button"
          onClick={() => imageInputRef.current?.click()}
          disabled={imageLoading}
          className="w-[117px] h-[66px] bg-[#F0F0F0] border-2 border-dashed border-[#5E1504] rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors overflow-hidden relative group disabled:opacity-50 flex-shrink-0"
        >
          {imageLoading ? (
            <span className="text-[10px] text-gray-500 animate-pulse">Subindo...</span>
          ) : imagePreviewUrl ? (
            <>
              <img src={imagePreviewUrl} alt="Preview do post" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] text-white font-medium">Alterar</span>
              </div>
            </>
          ) : (
            <svg className="w-6 h-6 text-[#87240E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          )}
        </button>

        { }
        {[0, 1].map((index) => {
          const imagemExistente = ultimasImagens[index];

          return (
            <div 
              key={index}
              className="w-[117px] h-[66px] bg-gray-100 border border-gray-300 rounded-md overflow-hidden relative group flex-shrink-0"
            >
              {imagemExistente ? (
                <>
                  <img 
                    src={imagemExistente.url} 
                    alt={imagemExistente.tituloImagem} 
                    className="w-full h-full object-cover"
                  />
                  { }
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreviewUrl(imagemExistente.url);
                      onImageSelect(imagemExistente._id, imagemExistente.url);
                    }}
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] text-white font-medium px-1 text-center"
                  >
                    Usar esta
                  </button>
                </>
              ) : (
                 
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-[9px] text-gray-400">
                  Vazio
                </div>
              )}
            </div>
          );
        })}

      </div>
    </div>
  );
}