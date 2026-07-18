import { defineType, defineField } from 'sanity'
import { ImageIcon } from 'lucide-react'

export const galeriaType = defineType({
  name: 'galeria',
  title: 'Galeria de Mídia',
  type: 'document', 
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'tituloImagem',
      title: 'Identificador / Nome da Imagem',
      type: 'string',
    }),
    defineField({
      name: 'arquivo',
      title: 'Sua Imagem',
      type: 'image',
      options: { hotspot: true }
    })
  ]
})