'use client';
import React, { useState, useEffect, useRef } from 'react';
import { client as sanityClient } from '@/src/sanity/lib/client';
import { Upload, Loader2, Trash2, AlertTriangle, X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface ImagemGaleria {
  _id: string;
  tituloImagem: string;
  url: string;
}

export default function GaleriaMidiaResponsiva() {
  const [imagens, setImagens] = useState<ImagemGaleria[]>([]);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [loadingLista, setLoadingLista] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const [isModalAberto, setIsModalAberto] = useState(false);
  const [imagemParaDeletar, setImagemParaDeletar] = useState<string | null>(null);

  const carregarMidias = async () => {
    try {
      const query = `*[_type == "galeria"] | order(_createdAt desc) {
        _id,
        tituloImagem,
        "url": arquivo.asset->url
      }`;
      const resultado = await sanityClient.fetch(query);
      setImagens(resultado || []);
    } catch (error) {
      console.error("Erro ao rodar GROQ:", error);
    } finally {
      setLoadingLista(false);
    }
  };

  useEffect(() => {
    carregarMidias();
  }, []);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = event.target.files?.[0];
    if (!arquivo) return;

    const toastUploadId = toast.loading('Enviando mídia...');

    try {
      setUploading(true);

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

      toast.success('Mídia salva com sucesso!', { id: toastUploadId });
      carregarMidias();
    } catch (error: any) {
      console.error(error);
      toast.error(`Falha no upload: ${error.message}`, { id: toastUploadId });
    } finally {
      setUploading(false);
    }
  };


  const iniciarDelecao = (docId: string) => {
    setImagemParaDeletar(docId);
    setIsModalAberto(true);
  };


  const confirmarDelecao = async () => {
    if (!imagemParaDeletar) return;

    const docId = imagemParaDeletar;
    setIsModalAberto(false);
    setImagemParaDeletar(null);

    const toastDeleteId = toast.loading('Excluindo mídia...');

    try {
      setDeletingId(docId);

      const resposta = await fetch(`/api/upload?id=${docId}`, {
        method: 'DELETE',
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        if (resposta.status === 409 || dados.error?.includes('references')) {
          toast.error(
            'Não foi possível apagar! Esta imagem está vinculada a uma publicação ativa do blog.',
            {
              id: toastDeleteId,
              duration: 5000,
              style: {
                border: '1px solid #87240E',
                padding: '12px',
                color: '#87240E',
                fontFamily: 'Montserrat, sans-serif'
              }
            }
          );
          return;
        }
        throw new Error(dados.error || 'Erro ao tentar deletar.');
      }

      toast.success('Imagem removida da galeria!', { id: toastDeleteId });
      setImagens((prev) => prev.filter((img) => img._id !== docId));
    } catch (error: any) {
      console.error(error);
      toast.error(`Erro ao excluir: ${error.message}`, { id: toastDeleteId });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F0F0F0] px-4 py-10 md:px-8 md:py-10 antialiased font-['Montserrat'] text-black">

      { }
      <Toaster position="bottom-right" reverseOrder={false} />

      <div className="max-w-[1444px] mx-auto flex flex-col gap-8">

        { }
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />

        { }
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">

          { }
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-[198px] border-2 border-dashed border-[#5E1504] rounded-lg bg-white flex flex-col items-center justify-center gap-4 transition-all hover:bg-[#87240E]/5 group disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 className="w-12 h-12 text-[#87240E] animate-spin" />
            ) : (
              <>
                <div className="w-16 h-16 bg-[#87240E]/10 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Upload className="w-8 h-8 text-[#87240E]" strokeWidth={2} />
                </div>
                <span className="text-sm md:text-base font-semibold text-[#87240E] tracking-wide uppercase">
                  Upar mídia
                </span>
              </>
            )}
          </button>

          { }
          {loadingLista ? (
            <div className="h-[198px] bg-[#04194D]/10 rounded-lg animate-pulse flex items-center justify-center text-sm font-medium">
              Sincronizando banco...
            </div>
          ) : (
            imagens.map((img) => (
              <div
                key={img._id}
                className="w-full h-[198px] bg-[#04194D] border border-[#6C6C6C] rounded-lg overflow-hidden relative shadow-md group"
              >
                <img
                  src={img.url}
                  alt={img.tituloImagem}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                { }
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    type="button"
                    disabled={deletingId === img._id}
                    onClick={(e) => {
                      e.stopPropagation();
                      iniciarDelecao(img._id);
                    }}
                    className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-transform transform scale-90 group-hover:scale-100 duration-300 shadow-lg disabled:opacity-50"
                  >
                    {deletingId === img._id ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <Trash2 className="w-6 h-6" />
                    )}
                  </button>
                </div>

                { }
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pointer-events-none">
                  <p className="text-white text-xs font-semibold truncate">
                    {img.tituloImagem}
                  </p>
                </div>
              </div>
            ))
          )}

        </div>
      </div>

      { }
      {isModalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

          { }
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalAberto(false)}
          />

          { }
          <div className="relative bg-white w-full max-w-[440px] rounded-lg p-6 shadow-2xl z-10 border border-gray-200 animate-[scaleUp_0.2s_ease-out] flex flex-col gap-4">

            { }
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-[#87240E]">
                <AlertTriangle className="w-6 h-6" />
                <h3 className="font-semibold text-lg">Atenção!</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalAberto(false)}
                className="p-1 hover:bg-gray-100 rounded-full text-gray-500 hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            { }
            <div className="flex flex-col gap-1">
              <p className="text-gray-800 font-medium text-base">Deseja mesmo excluir esta imagem?</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Esta ação é definitiva e removerá a imagem permanentemente da galeria do seu servidor.
              </p>
            </div>

            { }
            <div className="flex gap-3 justify-end mt-2">
              <button
                type="button"
                onClick={() => setIsModalAberto(false)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmarDelecao}
                className="px-4 py-2.5 bg-[#87240E] hover:bg-[#87240E]/90 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all"
              >
                Sim, excluir
              </button>
            </div>
          </div>
        </div>
      )}

      { }
      <style jsx global>{`
        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}