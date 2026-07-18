'use client';
import React, { useState, useRef, useEffect } from 'react';
import { createClient } from '@sanity/client';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import ImageUpload from '@/src/app/(admin)/editor/components/uploadImageCard';
import CategoryInput from '@/src/app/(admin)/editor/components/categoryImput';
import RichTextEditor from './components/textEditor';

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ID_DE_BACKUP',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-07-09',
  useCdn: false,
});




interface SanitySpan {
  _type: 'span';
  _key: string;
  text: string;
  marks: string[];
}

interface SanityBlock {
  _type: 'block';
  _key: string;
  style: 'normal' | 'h1' | 'h2' | 'h3' | 'blockquote';
  markDefs: any[];
  children: SanitySpan[];
}

type SanityBlockContent = SanityBlock[];


export default function EditorPostagem() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams<{ id?: string }>();

  const [autoria, setAutoria] = useState('');
  const [title, setTitle] = useState('');
  const [editorHtml, setEditorHtml] = useState('<p>Comece a escrever o seu post...</p>');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);


  const [audioLoading, setAudioLoading] = useState(false);
  const [audioAssetRef, setAudioAssetRef] = useState<string | null>(null);


  const [imageLoading, setImageLoading] = useState(false);
  const [imageAssetRef, setImageAssetRef] = useState<string | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);


  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [categoriasIds, setCategoriasIds] = useState<string[]>([]);






  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const convertToBlockContent = (text: string): SanityBlockContent => {
    const paragraphs = text.split('\n').filter((p) => p.trim() !== '');
    return paragraphs.map((para) => ({
      _type: 'block',
      _key: Math.random().toString(36).substring(2, 11),
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: Math.random().toString(36).substring(2, 11),
          text: para,
          marks: [],
        },
      ],
    }));
  };






  const handleAudioUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = event.target.files?.[0];
    if (!arquivo) return;

    if (!arquivo.type.startsWith('audio/')) {
      alert('Por favor, selecione apenas arquivos de áudio válidos.');
      return;
    }

    try {
      setAudioLoading(true);
      const audioAsset = await sanityClient.assets.upload('file', arquivo, {
        filename: arquivo.name,
        contentType: arquivo.type,
      });
      setAudioAssetRef(audioAsset._id);
      alert(`Áudio "${arquivo.name}" carregado com sucesso!`);
    } catch (error) {
      console.error('Erro ao subir áudio:', error);
      alert('Falha no upload do áudio.');
    } finally {
      setAudioLoading(false);
    }
  };


  const [listaGaleria, setListaGaleria] = useState<{ _id: string; tituloImagem: string; url: string }[]>([]);


  const carregarImagensDaGaleria = async () => {
    try {
      const query = `*[_type == "galeria"] | order(_createdAt desc) {
      _id,
      tituloImagem,
      "url": arquivo.asset->url
    }`;
      const resultado = await sanityClient.fetch(query);
      setListaGaleria(resultado);
    } catch (error) {
      console.error("Erro ao carregar galeria no editor:", error);
    }
  };

  const handleGaleriaVinculo = (docId: string, url: string) => {
    setImageAssetRef(docId);
    setImagePreviewUrl(url);
  };


  useEffect(() => {
    carregarImagensDaGaleria();
  }, []);

  useEffect(() => {
    const postId = searchParams.get('postId') || params.id || null;

    if (!postId) {
      setIsEditing(false);
      setEditingPostId(null);
      return;
    }

    const carregarPostParaEdicao = async () => {
      try {
        setLoading(true);
        const query = `*[_type == "post" && _id == $postId][0]{
          _id,
          title,
          "slug": slug.current,
          body,
          "autoria": coalesce(authorRaw, "Anônimo"),
          "categoriasIds": categories[]->_id,
          "audioFileId": coalesce(audioDescricao.asset->_id, null),
          "imagemDocId": coalesce(imagemDaGaleria._ref, null)
        }`;
        const post = await sanityClient.fetch(query, { postId });

        if (!post) {
          throw new Error('Post não encontrado.');
        }

        setEditingPostId(post._id);
        setIsEditing(true);
        setTitle(post.title || '');
        setAutoria(post.autoria || '');
        setEditorHtml(typeof post.body === 'string' ? post.body : '<p>Comece a escrever o seu post...</p>');
        setCategoriasIds(post.categoriasIds || []);
        setAudioAssetRef(post.audioFileId || null);
        setImageAssetRef(post.imagemDocId || null);
      } catch (error: any) {
        console.error('Erro ao carregar post para edição:', error);
        alert('Não foi possível carregar a publicação para edição.');
      } finally {
        setLoading(false);
      }
    };

    carregarPostParaEdicao();
  }, [params.id, searchParams]);

  const handleSavePost = async () => {
    if (!title.trim()) {
      alert('O campo "Título da publicação" é obrigatório.');
      return;
    }

    if (!editorHtml.trim() || editorHtml === '<p><br></p>') {
      alert('O corpo da publicação é obrigatório. Digite o conteúdo do seu post antes de enviar.');
      return;
    }

    setLoading(true);

    try {
      const postPayload = {
        ...(editingPostId ? { postId: editingPostId } : {}),
        title,
        slug: generateSlug(title),
        body: editorHtml,
        autorTeste: autoria,
        categoriasIds,
        audioFileId: audioAssetRef,
        imagemDocId: imageAssetRef,
      };

      const resposta = await fetch('/api/posts', {
        method: editingPostId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postPayload),
      });

      const dados = await resposta.json();

      if (!resposta.ok) throw new Error(dados.error || 'Falha ao salvar postagem');

      if (editingPostId) {
        alert('Postagem atualizada com sucesso através do servidor!');
        router.push('/posts');
        return;
      }

      alert('Postagem criada com sucesso através do servidor!');
    } catch (error: any) {
      console.error(error);
      alert(`Erro ao salvar postagem: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-black font-['Montserrat'] antialiased">
      <main className="w-full h-full flex flex-col md:flex-row-reverse">

        { }
        <aside className="hidden md:flex w-full h-full md:w-[480px] bg-[#F0F0F0] border-l border-[#2D2D2D] p-6 md:p-8 flex-col items-center">
          <div className="w-full max-w-[416px] bg-white border border-[#2D2D2D] rounded-lg p-6 flex flex-col gap-6 shadow-sm">

            { }
            <div className="flex flex-col gap-2">
              <label className="text-black font-medium text-lg md:text-xl">Titulo</label>
              <div className="w-full border border-[#6C6C6C] rounded-lg px-4 py-3 bg-white flex items-center">
                <input
                  type="text"
                  value={title}
                  placeholder='Digite o título da publicação'
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-transparent text-[#111111] font-normal text-base focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-black font-medium text-lg md:text-xl">Autoria</label>
              <div className="w-full border border-[#6C6C6C] rounded-lg px-4 py-3 bg-white flex items-center">
                <input
                  type="text"
                  value={autoria}
                  placeholder='Digite o nome do autor'
                  onChange={(e) => setAutoria(e.target.value)}
                  className="w-full bg-transparent text-[#111111] font-normal text-base focus:outline-none"
                />
              </div>
            </div>

            { }
            <CategoryInput
              categoriasSelecionadas={categoriasIds}
              onChangeCategorias={setCategoriasIds}
            />

            { }
            <ImageUpload onImageSelect={handleGaleriaVinculo} initialPreviewUrl={imagePreviewUrl} />
            { }
            <div className="w-full">
              <input
                type="file"
                ref={fileInputRef}
                accept="audio/*"
                className="hidden"
                onChange={handleAudioUpload}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={audioLoading}
                className={`w-full h-12 border-2 rounded-lg flex items-center justify-center gap-2 font-medium text-sm transition-all duration-200
                  ${audioAssetRef
                    ? 'bg-green-50 border-green-600 text-green-600'
                    : 'bg-white border-[#87240E] text-[#87240E] hover:bg-[#87240E]/5'
                  } disabled:opacity-50`}
              >
                {audioLoading ? (
                  <span>Carregando áudio...</span>
                ) : audioAssetRef ? (
                  <span>✓ Áudio Vinculado</span>
                ) : (
                  <>
                    <svg className="w-5 h-5 text-[#87240E]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
                    </svg>
                    <span>Adicionar Áudio</span>
                  </>
                )}
              </button>
            </div>

            <hr className="border-[#2D2D2D] my-1" />

            <div className="flex gap-4 w-full">
              <button onClick={handleSavePost}
                disabled={loading || audioLoading || imageLoading} className="flex-1 h-12 bg-R5 rounded-[8px] text-N1 font-medium text-sm hover:text-black transition-colors hidden md:block">
                {loading ? (isEditing ? 'Atualizando...' : 'Enviando...') : (isEditing ? 'Salvar alterações' : 'Publicar')}
              </button>
              <button
                onClick={isEditing ? () => router.push('/posts') : handleSavePost}
                disabled={loading || audioLoading || imageLoading}
                className="flex-1 h-12 bg-white border-2 border-[#87240E] rounded-lg text-[#87240E] font-medium text-sm hover:bg-[#87240E] hover:text-white transition-all disabled:opacity-50"
              >
                {loading ? (isEditing ? 'Atualizando...' : 'Enviando...') : (isEditing ? 'Cancelar' : 'Agendar')}
              </button>
            </div>

          </div>
        </aside>

        { }
        <section className="flex-1 relative bg-white p-6 md:py-8 px-5 flex flex-col  mx-auto max-w-full w-full">

          <RichTextEditor
            content={editorHtml}
            onChange={setEditorHtml}

          />
        </section>

      </main>
    </div>
  );
}