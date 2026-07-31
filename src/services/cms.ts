import type { PostListItem, Category, GalleryImage } from '@/src/types';
import { client } from '@/src/sanity/lib/client';






const postListProjection = `{
  _id, title, "slug": slug.current, publishedAt,
  "imageUrl": coalesce(imagemDaGaleria->arquivo.asset->url, null),
  "categories": categories[]->title, "authorName": author->name
}`;

export const cms = {
  getLatestPosts: () => client.fetch<PostListItem[]>(
    `*[_type == "post" && status == "posted"] | order(publishedAt desc, _createdAt desc)[0...3] ${postListProjection}`,
    {}, { useCdn: false },
  ),
  getPublishedPosts: () => client.fetch<PostListItem[]>(
    `*[_type == "post" && status == "posted"] | order(publishedAt desc, _createdAt desc) ${postListProjection}`,
    {}, { useCdn: false },
  ),
  getPostPage: (slug: string) => Promise.all([
    client.fetch(`*[_type == "post" && slug.current == $slug && (!defined(publishedAt) || publishedAt <= now())][0]{
      _id, title, body, publishedAt, "authorName": coalesce(authorRaw, "Anônimo"),
      "imageUrl": coalesce(imagemDaGaleria->arquivo.asset->url, null),
      "audioUrl": coalesce(audioDescricao.asset->url, null), "categories": categories[]->title
    }`, { slug }, { useCdn: false }),
    client.fetch<PostListItem[]>(`*[_type == "post" && slug.current != $slug && (!defined(publishedAt) || publishedAt <= now())] | order(publishedAt desc)[0...3] ${postListProjection}`, { slug }, { useCdn: false }),
  ]),
  getCategories: () => client.fetch<Category[]>('*[_type == "category"] | order(title asc){ _id, title }', {}, { useCdn: false }),
  getGallery: (limit?: number) => client.fetch<GalleryImage[]>(`*[_type == "galeria"] | order(_createdAt desc)${limit ? `[0...${limit}]` : ''}{ _id, tituloImagem, "url": arquivo.asset->url }`, {}, { useCdn: false }),
  getPostForEditor: (postId: string) => client.fetch(`*[_type == "post" && _id == $postId][0]{
    _id, title, "slug": slug.current, body, "autoria": coalesce(authorRaw, "Anônimo"),
    "categoriasIds": categories[]->_id, "audioFileId": coalesce(audioDescricao.asset->_id, null),
    "imagemDocId": coalesce(imagemDaGaleria._ref, null), publishedAt, "status": coalesce(status, "posted")
  }`, { postId }, { useCdn: false }),
  getAdminPosts: () => client.fetch(`*[_type == "post"] | order(_createdAt desc){
    "_id": _id, "titulo": title,"slug":slug.current, "categoria": coalesce(categoryRaw, categories[0]->title, categoria->title, "Geral"),
    "autor": coalesce(authorRaw, author->name, "Anônimo"), "data": _createdAt,
    "status": coalesce(status, "posted"), "imageSrc": coalesce(imagemDaGaleria->arquivo.asset->url, mainImage.asset->url, null)
  }`, {}, { useCdn: false }),
  getDashboardData: () => Promise.all([
    client.fetch(`*[_type == "post"] | order(_createdAt desc)[0...5]{ "_id": _id, "titulo": title, "categoria": categories[]->title, "autor": coalesce(authorRaw, author->name, "Anônimo"), "data": _createdAt, "status": coalesce(status, "posted"), "imageSrc": coalesce(imagemDaGaleria->arquivo.asset->url, mainImage.asset->url, null) }`, {}, { useCdn: false }),
    client.fetch<number>('count(*[_type == "post"])', {}, { useCdn: false }),
    client.fetch(`*[_type == "post"]{ publishedAt, "view": coalesce(view, 0), "shared": coalesce(shared, 0), "viewsThisMonth": coalesce(viewsThisMonth, 0), "sharesThisMonth": coalesce(sharesThisMonth, 0), metricsMonth }`, {}, { useCdn: false }),
  ]),
};
