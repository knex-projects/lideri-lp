export default {
  name: 'post',
  title: 'Postagens',
  type: 'document',
  fields: [
    { name: 'titulo', title: 'Título', type: 'string' },
    { name: 'categoria', title: 'Categoria', type: 'string' },
    { name: 'autor', title: 'Autor', type: 'string' },
    { name: 'data', title: 'Data de Publicação', type: 'date' },
    { name: 'imagemUrl', title: 'Imagem de Capa', type: 'image' }, 
    { name: 'audioDescricao', title: 'Áudio Descrição', type: 'file', options: { accept: 'audio/*' } },
    { name: 'visualizacoes', title: 'Visualizações', type: 'number', initialValue: 0 },
    { name: 'compartilhamentos', title: 'Compartilhamentos', type: 'number', initialValue: 0 },
  ],
}