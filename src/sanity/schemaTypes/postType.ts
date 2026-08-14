
import { Text } from 'lucide-react'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: Text,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: { type: 'author' },
    }),
   
    defineField({
      name: 'audioDescricao',
      title: 'Áudio Descrição',
      type: 'file',
      options: {
        accept: 'audio/*'
      }
    }),
    defineField({
      name: 'imagemDaGaleria',
      type: 'reference',
      to: { type: 'galeria' } 
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: { type: 'category' } })],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
    defineField({
      name: 'status',
      title: 'Tipo de publicação',
      type: 'string',
      initialValue: 'draft',
      options: {
        list: [
          { title: 'Postado', value: 'posted' },
          { title: 'Agendado', value: 'scheduled' },
          { title: 'Rascunho', value: 'draft' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'view',
      title: 'Visualização',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'viewsThisMonth',
      title: 'Visualizações no mês',
      type: 'number',
      initialValue: 0,
      readOnly: true,
    }),
    defineField({
      name: 'shared',
      title: 'Compartilhamentos',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'sharesThisMonth',
      title: 'Compartilhamentos no mês',
      type: 'number',
      initialValue: 0,
      readOnly: true,
    }),
    defineField({
      name: 'metricsMonth',
      title: 'Mês dos indicadores',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})
