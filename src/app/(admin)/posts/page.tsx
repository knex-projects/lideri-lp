"use client"

import type { AdminPost, AdminCategory } from '@/src/types';
import { api } from "@/src/services/api";
import { cms } from "@/src/services/cms";
import PostCardCMS from "@/src/components/cards/postCard";
import { ChevronDown, ChevronLeft, ChevronRight, Search, AlertTriangle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { LoadingScreen } from "@/src/components/layout/loading";







const POSTS_POR_PAGINA = 6;

export default function Posts() {
    const router = useRouter();
    const [posts, setPosts] = useState<AdminPost[]>([]);
    const [categorias, setCategorias] = useState<AdminCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);


    const [isModalAberto, setIsModalAberto] = useState(false);
    const [postParaDeletar, setPostParaDeletar] = useState<string | null>(null);

    const [categoriaAtiva, setCategoriaAtiva] = useState<string>("Todos");
    const [tipoAtivo, setTipoAtivo] = useState<'Todos' | 'posted' | 'scheduled' | 'draft'>('Todos');
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [termoBusca, setTermoBusca] = useState("");

    useEffect(() => {
        async function carregarDados() {
            try {
                setLoading(true);
                const [resultadoPosts, resultadoCategorias] = await Promise.all([cms.getAdminPosts(), cms.getCategories()]);

                setPosts(resultadoPosts || []);
                setCategorias(resultadoCategorias || []);
            } catch (error) {
                console.error("Erro ao carregar dados do Sanity:", error);
                toast.error('Não foi possível carregar as publicações.');
            } finally {
                setLoading(false);
            }
        }
        carregarDados();
    }, []);

    const alterarCategoria = (nomeCategoria: string) => {
        setCategoriaAtiva(nomeCategoria);
        setPaginaAtual(1);
    };

    const alterarTipo = (tipo: 'Todos' | 'posted' | 'scheduled' | 'draft') => {
        setTipoAtivo(tipo);
        setPaginaAtual(1);
    };

    const postTipo = {
        posted: 'Postado',
        scheduled:  'Agendado',
        draft: 'Rascunho',
    } as const

    const postTipos = Object.keys(postTipo) as (keyof typeof postTipo)[];


    const iniciarDelecao = (postId: string) => {
        setPostParaDeletar(postId);
        setIsModalAberto(true);
    };


    const confirmarDelecaoPost = async () => {
        if (!postParaDeletar) return;

        const idDoPost = postParaDeletar;
        setIsModalAberto(false);
        setPostParaDeletar(null);

        const toastId = toast.loading("Removendo publicação do blog...");

        try {
            setDeletingId(idDoPost);

            await api.deletePost(idDoPost);

            toast.success("Publicação excluída com sucesso!", { id: toastId });

            setPosts((prev) => prev.filter((post) => post._id !== idDoPost));
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erro ao excluir post.";
            console.error(error);
            toast.error(`Erro ao excluir post: ${message}`, { id: toastId });
        } finally {
            setDeletingId(null);
        }
    };


    const postsFiltrados = posts.filter(post => {
        const passaCategoria = categoriaAtiva === "Todos" || post.categoria === categoriaAtiva;
        const passaTipo = tipoAtivo === 'Todos' || post.status === tipoAtivo;
        const termo = termoBusca.toLowerCase().trim();
        const passaPesquisa = !termo ||
            post.titulo.toLowerCase().includes(termo) ||
            (post.autor && post.autor.toLowerCase().includes(termo)) ||
            post.status.toLowerCase().includes(termo) ||
            ({ posted: 'postado', scheduled: 'agendado', draft: 'rascunho' }[post.status]).includes(termo);

        return passaCategoria && passaTipo && passaPesquisa;
    });


    const totalDePaginas = Math.ceil(postsFiltrados.length / POSTS_POR_PAGINA) || 1;
    const indiceUltimoPost = paginaAtual * POSTS_POR_PAGINA;
    const indicePrimeiroPost = indiceUltimoPost - POSTS_POR_PAGINA;
    const postsExibidos = postsFiltrados.slice(indicePrimeiroPost, indiceUltimoPost);

    if (loading) {
    return <LoadingScreen />;
  }
    return (
        <main className="flex flex-col gap-6 w-dvw px-4 py-4 mb-6 sm:px-8 2xl:px-30 lg:py-10 md:bg-N2">

            { }
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4 sm:flex-row sm:justify-between md:px-8 md:py-4 md:bg-N1 md:border md:border-B9 md:rounded-2xl">
                { }
                <div className="relative flex justify-between  max-w-40">
                    <select
                        name="categoria"
                        value={categoriaAtiva}
                        onChange={(e) => alterarCategoria(e.target.value)}
                        className="appearance-none truncate w-full px-4 py-3 pr-8 border border-N5 rounded-lg font-montserrat text-N8 bg-white"
                    >
                        <option value="Todos">Todos</option>
                        {categorias.map((cat) => (
                            <option key={cat._id} value={cat.title}>
                                {cat.title}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 inset-y-1/2 -translate-y-1/2" />
                </div>

                <div className="relative xl:hidden flex justify-between max-w-40">
                    <select
                        name="tipo"
                        value={tipoAtivo}
                        onChange={(e) => alterarTipo(e.target.value as 'Todos' | 'posted' | 'scheduled' | 'draft')}
                        className="appearance-none md:text-[1rem] w-full px-4 py-3 pr-8 border border-N5 rounded-lg font-montserrat text-N8 bg-white"
                    >
                        <option value={'Todos'}  key={'Todos'} >Todos</option>
                         {postTipos.map((tipo) => (
                        <option value={tipo}  key={tipo} >{postTipo[tipo]}</option>
                         ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 inset-y-1/2 -translate-y-1/2" />
                </div>

                { }
                <div className="hidden xl:flex gap-4">
                    <button
                        type="button"
                        onClick={() => alterarTipo("Todos")}
                        className={`px-5 py-3 border rounded-lg font-montserrat font-medium transition-all ease-in-out duration-300 
                            ${tipoAtivo === "Todos"
                                ? "bg-R5 text-N1"
                                : "border-N5 text-N5 bg-white"
                            }`}
                    >
                        Todos
                    </button>
                    {postTipos.map((tipo) => (
                        <button
                            key={tipo}
                            type="button"
                            onClick={() => alterarTipo(tipo)}
                            className={`px-5 py-3 border rounded-lg font-montserrat font-medium transition-all ease-in-out duration-300 
                                ${tipoAtivo === tipo
                                    ? "bg-R5 text-N1"
                                    : "border-N5 text-N5 bg-white"
                                }`}
                        >
                            {postTipo[tipo]}
                        </button>
                    ))}
                </div>

                { }
                <div className="relative">
                    <input
                        type="text"
                        name="postagem"
                        placeholder="Buscar Postagens?"
                        value={termoBusca}
                        onChange={(e) => {
                            setTermoBusca(e.target.value);
                            setPaginaAtual(1);
                        }}
                        className="w-[clamp(13.5625rem,24vw,28.3125rem)] px-4 py-3 pl-10 border border-N5 rounded-lg font-montserrat text-N8 xl:pl-4 xl:pr-10 focus:outline-none"
                    />
                    <button type="button">
                        <Search size={16} className="absolute left-4 inset-y-1/2 -translate-y-1/2 text-N5 xl:left-auto xl:right-6" />
                    </button>
                </div>
            </form>

            { }
            <div className="flex flex-col gap-6 md:p-8 md:bg-N1 md:border md:border-B9 md:rounded-xl min-h-75">
                {loading ? (
                    <p className="text-gray-500 font-sans animate-pulse">Carregando publicações...</p>
                ) : postsExibidos.length > 0 ? (
                    postsExibidos.map((post: AdminPost, idx: number) => (
                        <div key={post._id || idx} className="relative group flex items-center justify-between w-full">

                            { }
                            <div className="flex-1">
                                <PostCardCMS
                                    slug={post.slug}
                                    titulo={post.titulo}
                                    categoria={post.categoria || "Geral"}
                                    autor={post.autor || "Anônimo"}
                                    data={new Date(post.data).toLocaleDateString('pt-BR')}
                                    imageSrc={post.imageSrc || ""}
                                    status={post.status}
                                    onDelete={() => iniciarDelecao(post._id)}
                                    onEdit={() => router.push(`/editor/${post._id}`)}
                                    isDeleting={deletingId === post._id}
                                />
                            </div>

                            { }

                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 font-sans">Nenhum post encontrado nesta categoria.</p>
                )}
            </div>

            { }
            <nav className="mt-auto py-4">
                <ul className="flex justify-center items-center gap-3 select-none">
                    <li
                        onClick={() => {
                            if (paginaAtual > 1) setPaginaAtual(paginaAtual - 1);
                        }}
                        className={`flex justify-center items-center border size-12 border-N4 rounded-full transition-all duration-200
                            ${paginaAtual === 1
                                ? "cursor-not-allowed bg-[#87240E] text-N1 hover:bg-[#87240E]/90"
                                : "cursor-pointer bg-[#87240E] text-N1 hover:bg-[#87240E]/90"
                            }`}
                    >
                        <ChevronLeft size={22} />
                    </li>
                    {
                        Array.from({ length: totalDePaginas }).map((_, index) => {
                            const numeroPagina = index + 1;
                            return (
                                <li key={index}>
                                    <button
                                        type="button"
                                        className={`flex justify-center items-center  border border-N4 size-12 rounded-full font-montserrat text-xl transition-all duration-200
                                            ${paginaAtual === numeroPagina
                                                ? "bg-R5 text-N1"
                                                : "bg-white text-N9 hover:bg-gray-50"
                                            }`}
                                        onClick={() => setPaginaAtual(numeroPagina)}
                                    >
                                        {numeroPagina}
                                    </button>
                                </li>
                            )
                        })
                    }
                    <li
                        onClick={() => {
                            if (paginaAtual < totalDePaginas) setPaginaAtual(paginaAtual + 1);
                        }}
                        className={`flex justify-center items-center border size-12 border-N4 rounded-full transition-all duration-200
                            ${paginaAtual === totalDePaginas
                                ? " cursor-not-allowed bg-[#87240E] text-N1 hover:bg-[#87240E]/90"
                                : "cursor-pointer bg-[#87240E] text-N1 hover:bg-[#87240E]/90"
                            }`}
                    >
                        <ChevronRight size={22} />
                    </li>
                </ul>
            </nav>

            { }
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
        </main>
    );
}
