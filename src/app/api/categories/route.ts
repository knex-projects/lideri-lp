import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const privateSanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-07-09',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'O ID da categoria é obrigatório.' }, { status: 400 });
    }

    
    await privateSanityClient.delete(id);

    return NextResponse.json({ success: true, message: 'Categoria deletada com sucesso' });
  } catch (error: any) {
    console.error('Erro ao deletar categoria:', error);
    return NextResponse.json({ error: error.message || 'Erro ao deletar categoria' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title) {
      return NextResponse.json({ error: 'O nome da categoria é obrigatório.' }, { status: 400 });
    }

    
    const categorySlug = body.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-');

    
    const newCategory = await privateSanityClient.create({
      _type: 'category', 
      title: body.title,
      slug: { _type: 'slug', current: categorySlug }
    });

    return NextResponse.json({ success: true, categoryId: newCategory._id, title: newCategory.title });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Erro ao criar categoria' }, { status: 500 });
  }
}