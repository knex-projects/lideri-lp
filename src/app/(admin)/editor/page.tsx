'use client';
import React, { useState, useRef, useEffect } from 'react';
import { createClient } from '@sanity/client';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import RichTextEditor from './components/textEditor';
import Painel from './components/painel';
import toast from 'react-hot-toast';

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
type PostStatus = 'posted' | 'scheduled' | 'draft';


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
  const [scheduledAt, setScheduledAt] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [postStatus, setPostStatus] = useState<PostStatus>('posted');


  const [audioLoading, setAudioLoading] = useState(false);
  const [audioAssetRef, setAudioAssetRef] = useState<string | null>(null);


  const [imageLoading, setImageLoading] = useState(false);
  const [imageAssetRef, setImageAssetRef] = useState<string | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);


  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [categoriasIds, setCategoriasIds] = useState<string[]>([]);

  const toDateTimeLocal = (value?: string | null) => {
    if (!value) return '';

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';

    const offset = date.getTimezoneOffset() * 60_000;
    return new Date(date.getTime() - offset).toISOString().slice(0, 16);
  };






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
          "imagemDocId": coalesce(imagemDaGaleria._ref, null),
          publishedAt,
          "status": coalesce(status, "posted")
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
        setScheduledAt(toDateTimeLocal(post.publishedAt));
        setPostStatus(post.status);
    } catch (error: any) {
      console.error('Erro ao carregar post para edição:', error);
      toast.error('Não foi possível carregar a publicação para edição.');
      } finally {
        setLoading(false);
      }
    };

    carregarPostParaEdicao();
  }, [params.id, searchParams]);

  const handleSavePost = async (mode: 'now' | 'schedule' | 'keep' | 'draft' = 'now') => {
    const isDraft = mode === 'draft';

    if (!isDraft && !title.trim()) {
      toast.error('O campo "Título da publicação" é obrigatório.');
      return;
    }

    if (!isDraft && (!editorHtml.trim() || editorHtml === '<p><br></p>')) {
      toast.error('O corpo da publicação é obrigatório. Digite o conteúdo antes de enviar.');
      return;
    }

    let publishedAt: string | undefined;
    if (mode === 'schedule') {
      if (!scheduledAt) {
        toast.error('Escolha a data e o horário do agendamento.');
        return;
      }

      const scheduledDate = new Date(scheduledAt);
      if (Number.isNaN(scheduledDate.getTime()) || scheduledDate.getTime() <= Date.now()) {
        toast.error('A data de agendamento deve estar no futuro.');
        return;
      }

      publishedAt = scheduledDate.toISOString();
    } else if ((mode === 'keep' || mode === 'draft') && scheduledAt) {
      const currentPublishedDate = new Date(scheduledAt);
      if (!Number.isNaN(currentPublishedDate.getTime())) {
        publishedAt = currentPublishedDate.toISOString();
      }
    }

    setLoading(true);
    const toastId = toast.loading(isDraft ? 'Salvando rascunho...' : (editingPostId ? 'Atualizando publicação...' : 'Publicando...'));

    try {
      const postPayload = {
        ...(editingPostId ? { postId: editingPostId } : {}),
        title: title.trim() || 'Rascunho sem título',
        slug: generateSlug(title.trim() || 'rascunho'),
        body: editorHtml || '',
        autorTeste: autoria,
        categoriasIds,
        audioFileId: audioAssetRef,
        imagemDocId: imageAssetRef,
        publishedAt,
        status: mode === 'draft' ? 'draft' : (mode === 'keep' ? postStatus : undefined),
      };

      const resposta = await fetch('/api/posts', {
        method: editingPostId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postPayload),
      });

      const dados = await resposta.json();

      if (!resposta.ok) throw new Error(dados.error || 'Falha ao salvar postagem');

      if (editingPostId) {
        toast.success(isDraft ? 'Rascunho salvo com sucesso!' : 'Publicação atualizada com sucesso!', { id: toastId });
        if (!isDraft) router.push('/posts');
        return;
      }

      if (isDraft) {
        toast.success('Rascunho salvo com sucesso!', { id: toastId });
        setEditingPostId(dados.postId);
        setIsEditing(true);
        setPostStatus('draft');
        router.replace(`/editor/${dados.postId}`);
        return;
      }

      toast.success(mode === 'schedule' ? 'Publicação agendada com sucesso!' : 'Publicação criada com sucesso!', { id: toastId });
      setIsPanelOpen(false);
    } catch (error: any) {
      console.error(error);
      toast.error(`Erro ao salvar publicação: ${error.message}`, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saveDraft = () => {
      void handleSavePost('draft');
    };

    window.addEventListener('editor:save-draft', saveDraft);
    return () => window.removeEventListener('editor:save-draft', saveDraft);
  });

  return (
    <div className="min-h-screen w-full bg-white text-black font-['Montserrat'] antialiased">
      <main className="w-full h-full flex flex-col lg:flex-row-reverse">
        <aside className="hidden 2xl:flex w-full h-full lg:w-[480px] bg-[#F0F0F0] border-l border-[#2D2D2D] p-8 flex-col items-center">
          <Painel
            autoria={autoria}
            title={title}
            categoriasIds={categoriasIds}
            imagePreviewUrl={imagePreviewUrl}
            audioAssetRef={audioAssetRef}
            audioLoading={audioLoading}
            imageLoading={imageLoading}
            loading={loading}
            isEditing={isEditing}
            postStatus={postStatus}
            scheduledAt={scheduledAt}
            onAutoriaChange={setAutoria}
            onTitleChange={setTitle}
            onCategoriasChange={setCategoriasIds}
            onImageSelect={handleGaleriaVinculo}
            onAudioUploaded={setAudioAssetRef}
            setAudioLoading={setAudioLoading}
            onScheduledAtChange={setScheduledAt}
            onPublish={() => handleSavePost('now')}
            onSchedule={() => handleSavePost(isEditing ? 'keep' : 'schedule')}
            onCancel={() => router.push('/posts')}
          />
        </aside>

        { }
        <section className="flex-1 relative bg-white p-6 md:py-8 px-5 flex flex-col mx-auto max-w-full w-full">
          <header className="flex items-center justify-between gap-4 mb-6 xl:hidden">
            <h1 className="text-xl font-semibold">Editor de publicação</h1>
            <button
              type="button"
              onClick={() => setIsPanelOpen(true)}
              className="h-11 px-5 rounded-lg bg-[#87240E] text-white font-medium hover:bg-[#6d1d0b] transition-colors"
            >
              Avançar
            </button>
          </header>

          <RichTextEditor
            content={editorHtml}
            onChange={setEditorHtml}

          />
        </section>

        {isPanelOpen && (
          <div className="2xl:hidden fixed inset-0 z-50  overflow-y-auto flex justify-end bg-black/45" role="dialog" aria-modal="true" aria-label="Detalhes da publicação">
            <div className="w-full max-w-[480px] h-[115vh] overflow-y-auto bg-[#F0F0F0] p-5 sm:p-8 flex justify-center">
              <Painel
                autoria={autoria}
                title={title}
                categoriasIds={categoriasIds}
                imagePreviewUrl={imagePreviewUrl}
                audioAssetRef={audioAssetRef}
                audioLoading={audioLoading}
                imageLoading={imageLoading}
                loading={loading}
                isEditing={isEditing}
                postStatus={postStatus}
                scheduledAt={scheduledAt}
                onAutoriaChange={setAutoria}
                onTitleChange={setTitle}
                onCategoriasChange={setCategoriasIds}
                onImageSelect={handleGaleriaVinculo}
                onAudioUploaded={setAudioAssetRef}
                setAudioLoading={setAudioLoading}
                onScheduledAtChange={setScheduledAt}
                onPublish={() => handleSavePost('now')}
                onSchedule={() => handleSavePost(isEditing ? 'keep' : 'schedule')}
                onCancel={() => router.push('/posts')}
                onClose={() => setIsPanelOpen(false)}
                popup
              />
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
