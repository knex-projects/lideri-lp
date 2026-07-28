import type { ComponentType, SVGProps } from 'react';
import type { StaticImageData } from 'next/image';

export interface BlogPost {
    _id: string;
    title: string;
    body: string;
    publishedAt: string;
    authorName: string;
    imageUrl: string | null;
    audioUrl: string | null;
    categories: string[];
}

export interface EditorFormProps {
  postId?: string; // Se vier preenchido, é EDIÇÃO. Se não, é CRIAÇÃO.
}

export type CasePageProps = {
  params: {
    slug: string;
  };
};

export interface LoginFormData {
  email: string;
  password: string;
}

export interface AdminPost {
  _id: string;
  titulo: string;
  categoria?: string;
  autor?: string;
  data: string;
  imageSrc?: string;
  status: 'posted' | 'scheduled' | 'draft';
}

export interface DashboardPostMetric {
  publishedAt?: string;
  view?: number;
  shared?: number;
  viewsThisMonth?: number;
  sharesThisMonth?: number;
  metricsMonth?: string;
}

export interface DashboardMetrics {
  totalPublicacoes: number;
  publicacoesNoMes: number;
  totalVisualizacoes: number;
  visualizacoesNoMes: number;
  totalCompartilhamentos: number;
  compartilhamentosNoMes: number;
}

export interface AudioPlayerUploadProps {
  audioAssetRef: string | null;
  onAudioUploaded: (assetId: string) => void;
  audioLoading: boolean;
  setAudioLoading: (loading: boolean) => void;
}

export interface CategoryInputProps {
  categoriasSelecionadas: string[];
  onChangeCategorias: (ids: string[]) => void;
}

export interface AdminCategory {
  _id: string;
  title: string;
}

export interface PainelProps {
  autoria: string;
  title: string;
  categoriasIds: string[];
  imagePreviewUrl: string | null;
  audioAssetRef: string | null;
  audioLoading: boolean;
  imageLoading: boolean;
  loading: boolean;
  isEditing: boolean;
  postStatus: 'posted' | 'scheduled' | 'draft';
  scheduledAt: string;
  onAutoriaChange: (value: string) => void;
  onTitleChange: (value: string) => void;
  onCategoriasChange: (ids: string[]) => void;
  onImageSelect: (documentId: string, url: string) => void;
  onAudioUploaded: (assetRef: string | null) => void;
  setAudioLoading: (loading: boolean) => void;
  onScheduledAtChange: (value: string) => void;
  onPublish: () => void;
  onSchedule: () => void;
  onCancel: () => void;
  onClose?: () => void;
  popup?: boolean;
}

export interface RichTextEditorProps {
    content: string;
    onChange: (html: string) => void;
}

export interface ImageUploadProps {
  onImageSelect: (docId: string, url: string) => void;
  initialPreviewUrl?: string | null;
}

export interface UltimaMidia {
  _id: string;
  url: string;
  tituloImagem: string;
}

export interface SanitySpan {
  _type: 'span';
  _key: string;
  text: string;
  marks: string[];
}

export interface SanityBlock {
  _type: 'block';
  _key: string;
  style: 'normal' | 'h1' | 'h2' | 'h3' | 'blockquote';
  markDefs: any[];
  children: SanitySpan[];
}

export type SanityBlockContent = SanityBlock[];

export type PostStatus = 'posted' | 'scheduled' | 'draft';

export interface GalleryImage {
  _id: string;
  tituloImagem: string;
  url: string;
}

export type Metric = 'view' | 'share';

export interface BlogUser {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: 'admin' | 'reader';
}

export interface CaseCardProps {
  title: string;
  slug: string;
  description: string;
  imageSrc: string | StaticImageData;
}

export interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc: string | StaticImageData;
  slug: string;
  priority?: boolean;
}

export interface ServiceCardProps {
    title: string;
    description: string;
    expandedDescription: string;
    benefits: string[];
    icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatarUrl: string;
}

export interface PostCardProps {
  titulo: string;
  categoria: string;
  autor: string;
  data: string;
  imageSrc: string;
  status?: 'posted' | 'scheduled' | 'draft';
  onDelete?: () => void;
  onEdit?: () => void;
  isDeleting?: boolean;
}

export interface HeaderProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export interface SidebarCMSProps {
  isOpen: boolean;
  onClose: () => void;
}

export type CountrySelectProps = {
    value: string,
    onChange: (value: string | undefined) => void,
    options: { value: string; label: string } []
}

export type InputProps = {
    value: string | undefined,
    onChange: (value: string | undefined) => void
}

export type Partner = {
    name: string;
    src: string;
    width: number;
    height: number;
    className?: string;
};

export interface ProcessCard {
        id: number;
        icon: StaticImageData;
        title: string;
        descrição: string;
    }

export type SolutionItem = {
    title: string;
    description: string;
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export interface ServiceItem {
    title: string;
    description: string;
    extendedDescription: string;
    benefits: string[];
    icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface ServiceGroup {
    title: string;
    services: ServiceItem[];
}

export type ApiOptions = Omit<RequestInit, 'body'> & { body?: unknown };

export interface PostListItem {
  _id: string;
  title?: string | null;
  slug?: string | null;
  publishedAt?: string | null;
  imageUrl?: string | null;
  categories?: Array<string | null> | null;
  authorName?: string | null;
}

export interface Category { _id: string; title: string }
