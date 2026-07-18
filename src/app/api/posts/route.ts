import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const privateSanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-07-09',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
}

function buildReferenceArray(ids: string[] = []) {
  return ids.length > 0
    ? ids.map((id: string) => ({
      _type: 'reference',
      _ref: id,
      _key: Math.random().toString(36).substring(2, 9),
    }))
    : [];
}

function buildPostPayload(body: any) {
  return {
    title: body.title,
    slug: {
      _type: 'slug',
      current: body.slug || generateSlug(body.title),
    },
    body: body.body,
    publishedAt: body.publishedAt || new Date().toISOString(),
    view: 0,
    shared: 0,
    authorRaw: body.autorTeste || 'Anônimo',
    categoryRaw: undefined,
    categories: buildReferenceArray(body.categoriasIds || []),
    audioDescricao: body.audioFileId
      ? {
        _type: 'file',
        asset: { _type: 'reference', _ref: body.audioFileId },
      }
      : undefined,
    imagemDaGaleria: body.imagemDocId
      ? {
        _type: 'reference',
        _ref: body.imagemDocId,
      }
      : undefined,
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title || !body.body) {
      return NextResponse.json({ error: 'Título e corpo são obrigatórios.' }, { status: 400 });
    }

    const result = await privateSanityClient.create({
      _type: 'post',
      ...buildPostPayload(body),
    });

    return NextResponse.json({ success: true, postId: result._id });
  } catch (error: any) {
    console.error('Erro na rota de criação do post:', error);
    return NextResponse.json({ error: error.message || 'Falha ao salvar postagem' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { postId, ...rest } = body;

    if (!postId) {
      return NextResponse.json({ error: 'O ID do post é obrigatório.' }, { status: 400 });
    }

    if (!rest.title || !rest.body) {
      return NextResponse.json({ error: 'Título e corpo são obrigatórios.' }, { status: 400 });
    }

    const patch = privateSanityClient.patch(postId);

    patch.set({
      title: rest.title,
      slug: {
        _type: 'slug',
        current: rest.slug || generateSlug(rest.title),
      },
      body: rest.body,
      publishedAt: rest.publishedAt || new Date().toISOString(),
      authorRaw: rest.autorTeste || 'Anônimo',
      categoryRaw: undefined,
      categories: buildReferenceArray(rest.categoriasIds || []),
    });

    if (rest.audioFileId) {
      patch.set({
        audioDescricao: {
          _type: 'file',
          asset: { _type: 'reference', _ref: rest.audioFileId },
        },
      });
    } else {
      patch.unset(['audioDescricao']);
    }

    if (rest.imagemDocId) {
      patch.set({
        imagemDaGaleria: {
          _type: 'reference',
          _ref: rest.imagemDocId,
        },
      });
    } else {
      patch.unset(['imagemDaGaleria']);
    }

    await patch.commit();

    return NextResponse.json({ success: true, message: 'Post atualizado com sucesso!' });
  } catch (error: any) {
    console.error('Erro na rota de atualização do post:', error);
    return NextResponse.json({ error: error.message || 'Falha ao atualizar postagem' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('id');

    if (!postId) {
      return NextResponse.json({ error: 'O ID do post é obrigatório.' }, { status: 400 });
    }

    await privateSanityClient.delete(postId);

    return NextResponse.json({ success: true, message: 'Post deletado com sucesso!' });
  } catch (error: any) {
    console.error('Erro ao deletar post:', error);
    return NextResponse.json({ error: error.message || 'Erro interno ao processar deleção.' }, { status: 500 });
  }
}

