
export interface BlogUser {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: 'admin' | 'reader';
}
