import type { ApiOptions } from '@/src/types';


async function request<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const { body, headers, ...init } = options;
  const response = await fetch(path, {
    ...init,
    headers: body instanceof FormData ? headers : { 'Content-Type': 'application/json', ...headers },
    body: body === undefined ? undefined : body instanceof FormData ? body : JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Não foi possível concluir a solicitação.');
  return data as T;
}

export const api = {
  publishScheduledPosts: () => request('/api/posts/publish-scheduled', { cache: 'no-store' }),
  savePost: (post: unknown, isEditing: boolean) => request<{ postId: string }>('/api/posts', { method: isEditing ? 'PUT' : 'POST', body: post }),
  deletePost: (id: string) => request(`/api/posts?id=${id}`, { method: 'DELETE' }),
  trackPostMetric: (id: string, metric: 'view' | 'share') => request(`/api/posts/${id}/metrics`, { method: 'POST', body: { metric }, keepalive: true }),
  createCategory: (title: string) => request<{ categoryId: string; title: string }>('/api/categories', { method: 'POST', body: { title } }),
  deleteCategory: (id: string) => request('/api/categories', { method: 'DELETE', body: { id } }),
  uploadImage: (file: File, title = file.name.split('.')[0]) => { const body = new FormData(); body.append('file', file); body.append('titulo', title); return request<{ docId: string }>('/api/upload/image', { method: 'POST', body }); },
  deleteImage: (id: string) => request(`/api/upload/image?id=${id}`, { method: 'DELETE' }),
  uploadAudio: (file: File) => { const body = new FormData(); body.append('file', file); return request<{ assetId: string }>('/api/upload/audio', { method: 'POST', body }); },
};
