"use client";

import type { AdminPost, DashboardPostMetric, DashboardMetrics } from '@/src/types';
import React, { useEffect, useState } from 'react';
import PostCardCMS from '@/src/components/cards/postCard';
import { api } from '@/src/services/api';
import { cms } from '@/src/services/cms';
import toast from 'react-hot-toast';
import { AlertTriangle, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { LoadingScreen } from '@/src/components/layout/loading';








export default function Dashboard() {
  const router = useRouter();
    const [loading, setLoading] = useState(true);
  const [postsRecentes, setPostsRecentes] = useState<AdminPost[]>([]);
  const [totalPublicacoes, setTotalPublicacoes] = useState(0);
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalPublicacoes: 0,
    publicacoesNoMes: 0,
    totalVisualizacoes: 0,
    visualizacoesNoMes: 0,
    totalCompartilhamentos: 0,
    compartilhamentosNoMes: 0,
  });
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isModalAberto, setIsModalAberto] = useState(false);
  const [postParaDeletar, setPostParaDeletar] = useState<string | null>(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [posts, total, metricPosts] = await cms.getDashboardData();
        setLoading(true)
        setPostsRecentes(posts || []);
        setTotalPublicacoes(total || 0);
        const now = new Date();
        const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const metricTotals = (metricPosts || []).reduce((acc:DashboardMetrics, post:DashboardPostMetric) => {
          acc.totalPublicacoes += 1;
          acc.totalVisualizacoes += post.view || 0;
          acc.totalCompartilhamentos += post.shared || 0;
          acc.publicacoesNoMes += post.publishedAt && new Date(post.publishedAt) >= monthStart ? 1 : 0;
          if (post.metricsMonth === monthKey) {
            acc.visualizacoesNoMes += post.viewsThisMonth || 0;
            acc.compartilhamentosNoMes += post.sharesThisMonth || 0;
          }
          return acc;
        }, {
          totalPublicacoes: 0,
          publicacoesNoMes: 0,
          totalVisualizacoes: 0,
          visualizacoesNoMes: 0,
          totalCompartilhamentos: 0,
          compartilhamentosNoMes: 0,
        } as DashboardMetrics);
        setMetrics(metricTotals);
      } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
        toast.error('Não foi possível carregar os dados do dashboard.');
      }
      finally{
        setLoading(false)
      }
    }

    carregarDados();
  }, []);

  const iniciarDelecao = (postId: string) => {
    setPostParaDeletar(postId);
    setIsModalAberto(true);
  };

  const confirmarDelecaoPost = async () => {
    if (!postParaDeletar) return;

    const idDoPost = postParaDeletar;
    setIsModalAberto(false);
    setPostParaDeletar(null);

    const toastId = toast.loading('Removendo publicação...');

    try {
      setDeletingId(idDoPost);

      await api.deletePost(idDoPost);

      toast.success('Publicação excluída com sucesso!', { id: toastId });
      setPostsRecentes((prev) => prev.filter((post) => post._id !== idDoPost));
      setTotalPublicacoes((prev) => Math.max(prev - 1, 0));
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erro ao excluir post.';
      console.error(error);
      toast.error(`Erro ao excluir post: ${message}`, { id: toastId });
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
        return <LoadingScreen />;
      }
  

  return (
    <div className="min-h-screen w-full bg-[rgb(255,255,255)] font-sans flex flex-col items-start justify-start">

      <main className="w-full min-h-[calc(100vh-6.125rem)] bg-[rgb(240,240,240)] p-4 md:p-8 flex flex-col gap-8">


        <section className="w-full grid grid-cols-2 xl:grid-cols-3 gap-2   md:gap-8.5 items-stretch">

          { }
          <div className="w-full min-h-43 md:min-h-54.25 h-auto bg-white border-2 border-[rgb(218,218,218)] rounded-lg p-4 md:p-8 flex flex-col justify-between gap-4">
            <h3 className=" w-full font-['Montserrat'] text-[clamp(1.25rem,2.5vw,2rem)] font-normal wrap-break-word   text-black ">
              Total de
              Comparti
              lhamentos
            </h3>
            <div className="flex flex-wrap items-start  gap-4 md:gap-8">
              <span className="font-['Impact'] text-[clamp(2.5rem,7vw,5.5rem)]   flex leading-none font-normal text-[rgb(135,36,14)]">
                {metrics.totalCompartilhamentos}
              </span>
              <div className="w-full flex flex-col justify-center">
                <span className="font-['Montserrat'] sm:text-[clamp(1rem,1.8vw,1.5rem)] text-[0.625rem] w-full font-normal text-black  wrap-break-word">Compartilhamentos</span>
                <span className="font-['Montserrat'] sm:text-[clamp(0.875rem,1.5vw,1.25rem)] text-[0.625rem] font-normal text-[rgb(28,0,0)]">+{metrics.compartilhamentosNoMes} no mês</span>
              </div>
            </div>
          </div>


          <div className="w-full min-h-43 md:min-h-54.25 h-auto bg-white border-2 border-[rgb(218,218,218)] rounded-lg p-4 md:p-8 flex flex-col justify-between gap-4">
            <h3 className="font-['Montserrat']  text-[clamp(1.25rem,2.5vw,2rem)] font-normal text-black break-words">
              Total de publicações
            </h3>
            <div className="flex flex-col items-start  gap-4 md:gap-8">
              <span className="font-['Impact'] text-[clamp(2.5rem,7vw,5.5rem)] leading-none font-normal text-[rgb(135,36,14)]">
                {metrics.totalPublicacoes || totalPublicacoes}
              </span>
              <div className="flex flex-col justify-center">
                <span className="font-['Montserrat'] sm:text-[clamp(1rem,1.8vw,1.5rem)] text-[0.625rem] font-normal text-[rgb(28,0,0)] leading-none">Publicações</span>
                <span className="font-['Montserrat'] sm:text-[clamp(0.875rem,1.5vw,1.25rem)] text-[0.625rem] font-normal text-[rgb(28,0,0)] mt-1">+{metrics.publicacoesNoMes} no mês</span>
              </div>
            </div>
          </div>

          <div className="w-full min-h-43 md:min-h-54.25 max-xl:col-span-2  h-auto bg-white border-2 border-[rgb(218,218,218)] rounded-lg p-5 md:p-8 flex flex-col justify-between gap-4">
            <h3 className="font-['Montserrat'] text-[clamp(1.25rem,2.5vw,2rem)] font-normal text-black break-words">
              Total de visualizações
            </h3>
            <div className="flex xl:flex-col flex-wrap items-start gap-4 md:gap-8">
              <span className="font-['Impact'] text-[clamp(2.5rem,6vw,5.5rem)] leading-none font-normal text-[rgb(135,36,14)]">
                {metrics.totalVisualizacoes}
              </span>
              <div className="flex flex-col justify-center">
                <span className="font-['Montserrat'] sm:text-[clamp(1rem,1.8vw,1.5rem)] text-[0.625rem] font-normal text-black leading-none">Visualizações</span>
                <span className="font-['Montserrat'] sm:text-[clamp(0.875rem,1.5vw,1.25rem)] text-[0.625rem] font-normal text-[rgb(28,0,0)] ">+{metrics.visualizacoesNoMes} no mês</span>
              </div>
            </div>
          </div>

        </section>
        <section className="w-full bg-white border-2 border-[rgb(218,218,218)] rounded-lg p-5 md:p-8 flex flex-col gap-8">
          <h2 className="font-['Impact'] text-[2rem] md:text-[3rem] font-normal text-black">
            Postagens <span className='text-R5'>recentes</span>
          </h2>

          <div className="w-full flex flex-col gap-6">
            {postsRecentes && postsRecentes.length > 0 ? (
              postsRecentes.map((post: AdminPost) => (
                <PostCardCMS
                  key={post._id}
                  titulo={post.titulo}
                  categoria={post.categoria || "Geral"}
                  autor={post.autor || "Anônimo"}
                  data={new Date(post.data).toLocaleDateString('pt-BR')}
                  imageSrc={post.imageSrc || ""}
                  status={post.status}
                  onDelete={() => iniciarDelecao(post._id)}
                  isDeleting={deletingId === post._id}
                  onEdit={() => router.push(`/editor/${post._id}`)}
                />
              ))
            ) : (
              <p className="text-gray-500 font-sans">Nenhum post encontrado no Sanity.</p>
            )}
          </div>

        </section>
      </main>

      {isModalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setIsModalAberto(false)} />

          <div className="relative bg-white w-full max-w-110 rounded-lg p-6 shadow-2xl z-10 border border-gray-200 animate-[scaleUp_0.2s_ease-out] flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-[#87240E]">
                <AlertTriangle className="w-6 h-6" />
                <h3 className="font-semibold text-lg">Excluir Postagem?</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalAberto(false)}
                className="p-1 hover:bg-gray-100 rounded-full text-gray-500 hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-gray-800 font-medium text-base">Deseja mesmo remover este artigo?</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Ao confirmar, o post será deletado permanentemente do blog e não poderá ser restaurado pelos leitores.
              </p>
            </div>

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
                onClick={confirmarDelecaoPost}
                className="px-4 py-2.5 bg-[#87240E] hover:bg-[#87240E]/90 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all"
              >
                Confirmar exclusão
              </button>
            </div>
          </div>
        </div>
      )}

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
