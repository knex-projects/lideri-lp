'use client';

import type { PostStatus, EditorFormProps } from '@/src/types';
import React, { useState, useRef, useEffect } from 'react';
import { api } from '@/src/services/api';
import { cms } from '@/src/services/cms';
import { useRouter } from 'next/navigation';
import RichTextEditor from './textEditor';
import Painel from './painel';
import toast from 'react-hot-toast';

export function EditorForm({ postId }: EditorFormProps) {
    const router = useRouter();

    const [autoria, setAutoria] = useState('');
    const [title, setTitle] = useState('');
    const [editorHtml, setEditorHtml] = useState('<p>Comece a escrever o seu post...</p>');
    const [loading, setLoading] = useState(false);
    
    
    const [editingPostId, setEditingPostId] = useState<string | null>(postId || null);
    const isEditing = Boolean(editingPostId);

    const [scheduledAt, setScheduledAt] = useState('');
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [postStatus, setPostStatus] = useState<PostStatus>('posted');

    const [audioLoading, setAudioLoading] = useState(false);
    const [audioAssetRef, setAudioAssetRef] = useState<string | null>(null);

    const [imageLoading, setImageLoading] = useState(false);
    const [imageAssetRef, setImageAssetRef] = useState<string | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

    const [categoriasIds, setCategoriasIds] = useState<string[]>([]);
    const [listaGaleria, setListaGaleria] = useState<{ _id: string; tituloImagem: string; url: string }[]>([]);

    // Ref para manter sempre os valores atualizados do formulário sem re-renderizar o evento global
    const formDataRef = useRef({
        title,
        editorHtml,
        autoria,
        categoriasIds,
        audioAssetRef,
        imageAssetRef,
        scheduledAt,
        postStatus,
        editingPostId
    });

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

    const carregarImagensDaGaleria = async () => {
        try {
            const resultado = await cms.getGallery();
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
        formDataRef.current = {
            title,
            editorHtml,
            autoria,
            categoriasIds,
            audioAssetRef,
            imageAssetRef,
            scheduledAt,
            postStatus,
            editingPostId
        };
    }, [title, editorHtml, autoria, categoriasIds, audioAssetRef, imageAssetRef, scheduledAt, postStatus, editingPostId]);

   
    useEffect(() => {
        if (!postId) return;

        let isMounted = true;
        setLoading(true);

        const carregarPostParaEdicao = async () => {
            try {
                const post = await cms.getPostForEditor(postId);

                if (!post) throw new Error('Post não encontrado.');

                if (isMounted && post) {
                    setEditingPostId(post._id);
                    setTitle(post.title || '');
                    setAutoria(post.autoria || '');
                    setEditorHtml(typeof post.body === 'string' ? post.body : '<p>Comece a escrever o seu post...</p>');
                    setCategoriasIds(post.categoriasIds || []);
                    setAudioAssetRef(post.audioFileId || null);
                    setImageAssetRef(post.imagemDocId || null);
                    setScheduledAt(toDateTimeLocal(post.publishedAt));
                    setPostStatus(post.status);
                }
            } catch (error: any) {
                if (isMounted) {
                    console.error('Erro ao carregar post para edição:', error);
                    toast.error('Não foi possível carregar a publicação para edição.');
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        carregarPostParaEdicao();

        return () => {
            isMounted = false;
        };
    }, [postId]);

    const handleSavePost = async (mode: 'now' | 'schedule' | 'keep' | 'draft' = 'now') => {
        const isDraft = mode === 'draft';
        
   
        const currentData = formDataRef.current;

        if (!isDraft && !currentData.title.trim()) {
            toast.error('O campo "Título da publicação" é obrigatório.');
            return;
        }

        if (!isDraft && (!currentData.editorHtml.trim() || currentData.editorHtml === '<p><br></p>')) {
            toast.error('O corpo da publicação é obrigatório. Digite o conteúdo antes de enviar.');
            return;
        }

        let publishedAt: string | undefined;
        if (mode === 'schedule') {
            if (!currentData.scheduledAt) {
                toast.error('Escolha a data e o horário do agendamento.');
                return;
            }

            const scheduledDate = new Date(currentData.scheduledAt);
            if (Number.isNaN(scheduledDate.getTime()) || scheduledDate.getTime() <= Date.now()) {
                toast.error('A data de agendamento deve estar no futuro.');
                return;
            }

            publishedAt = scheduledDate.toISOString();
        } else if ((mode === 'keep' || mode === 'draft') && currentData.scheduledAt) {
            const currentPublishedDate = new Date(currentData.scheduledAt);
            if (!Number.isNaN(currentPublishedDate.getTime())) {
                publishedAt = currentPublishedDate.toISOString();
            }
        }

        setLoading(true);
        const toastId = toast.loading(isDraft ? 'Salvando rascunho...' : (currentData.editingPostId ? 'Atualizando publicação...' : 'Publicando...'));

        try {
            const postPayload = {
                ...(currentData.editingPostId ? { postId: currentData.editingPostId } : {}),
                title: currentData.title.trim() || 'Rascunho sem título',
                slug: generateSlug(currentData.title.trim() || 'rascunho'),
                body: currentData.editorHtml || '',
                autorTeste: currentData.autoria,
                categoriasIds: currentData.categoriasIds,
                audioFileId: currentData.audioAssetRef,
                imagemDocId: currentData.imageAssetRef,
                publishedAt,
                status: mode === 'draft' ? 'draft' : (mode === 'keep' ? currentData.postStatus : undefined),
            };

            const dados = await api.savePost(postPayload, Boolean(currentData.editingPostId));

            if (currentData.editingPostId) {
                toast.success(isDraft ? 'Rascunho salvo com sucesso!' : 'Publicação atualizada com sucesso!', { id: toastId });
                if (!isDraft) router.push('/posts');
                return;
            }

            if (isDraft) {
                toast.success('Rascunho salvo com sucesso!', { id: toastId });
                setEditingPostId(dados.postId);
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
        const saveDraftHandler = () => {
            void handleSavePost('draft');
        };

        window.addEventListener('editor:save-draft', saveDraftHandler);
        return () => window.removeEventListener('editor:save-draft', saveDraftHandler);
    }, []);

    return (
        <div className="min-h-screen w-full bg-white text-black font-['Montserrat'] antialiased">
            <main className="w-full h-full flex flex-col lg:flex-row-reverse">
                <aside className="hidden 2xl:flex w-full h-full lg:w-120 bg-[#F0F0F0] border-l border-[#2D2D2D] p-8 flex-col items-center">
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

                <section className="flex-1 relative bg-white p-6 md:py-8 px-5 flex flex-col mx-auto max-w-full w-full">
                    <header className="flex items-center justify-between gap-4 mb-6 xl:hidden">
                        <h1 className="text-xl font-semibold">
                            {isEditing ? 'Editar publicação' : 'Criar publicação'}
                        </h1>
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
                    <div className="2xl:hidden fixed inset-0 z-50 overflow-y-auto flex justify-end bg-black/45" role="dialog" aria-modal="true">
                        <div className="w-full max-w-120 h-[115vh] overflow-y-auto bg-[#F0F0F0] p-5 sm:p-8 flex justify-center">
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