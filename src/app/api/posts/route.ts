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

function getPublishedAt(value?: string) {
  if (!value) return new Date().toISOString();

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error('A data de publicação é inválida.');
  }

  return date.toISOString();
}

function getPostStatus(publishedAt: string, requestedStatus?: string) {
  if (requestedStatus === 'draft') return 'draft';
  return new Date(publishedAt).getTime() > Date.now() ? 'scheduled' : 'posted';
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      title,
      body: bodyText,
      autorTeste = 'Anônimo',
      categoriasIds = [],
      audioFileId,
      imagemDocId,
      slug,
      publishedAt,
      status,
    } = body;

    const isDraft = status === 'draft';
    if (!isDraft && (!title || !bodyText)) {
      return NextResponse.json(
        { error: 'Título e corpo são obrigatórios.' },
        { status: 400 }
      );
    }

    const publicationDate = getPublishedAt(publishedAt);
    const postTitle = title?.trim() || 'Rascunho sem título';
    const postPayload = {
      _type: 'post',
      title: postTitle,
      slug: {
        _type: 'slug',
        current: slug || generateSlug(postTitle),
      },
      body: bodyText || '',
      publishedAt: publicationDate,
      status: getPostStatus(publicationDate, status),
      view: 0,
      shared: 0,
      viewsThisMonth: 0,
      sharesThisMonth: 0,
      authorRaw: autorTeste,
      categories: buildReferenceArray(categoriasIds),
      audioDescricao: audioFileId
        ? {
            _type: 'file',
            asset: { _type: 'reference', _ref: audioFileId },
          }
        : undefined,
      imagemDaGaleria: imagemDocId
        ? {
            _type: 'reference',
            _ref: imagemDocId,
          }
        : undefined,
    };

    const result = await privateSanityClient.create(postPayload);

    return NextResponse.json({ success: true, postId: result._id });
  } catch (error: any) {
    console.error('Erro na rota de criação do post:', error);
    return NextResponse.json(
      { error: error.message || 'Falha ao salvar postagem' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { postId, ...rest } = body;

    if (!postId) {
      return NextResponse.json(
        { error: 'O ID do post é obrigatório.' },
        { status: 400 }
      );
    }

    const isDraft = rest.status === 'draft';
    if (!isDraft && (!rest.title || !rest.body)) {
      return NextResponse.json(
        { error: 'Título e corpo são obrigatórios.' },
        { status: 400 }
      );
    }

    const patch = privateSanityClient.patch(postId);

    const publicationDate = getPublishedAt(rest.publishedAt);
    const postTitle = rest.title?.trim() || 'Rascunho sem título';
    patch.set({
      title: postTitle,
      slug: {
        _type: 'slug',
        current: rest.slug || generateSlug(postTitle),
      },
      body: rest.body || '',
      publishedAt: publicationDate,
      status: getPostStatus(publicationDate, rest.status),
      authorRaw: rest.autorTeste || 'Anônimo',
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

    return NextResponse.json({
      success: true,
      message: 'Post atualizado com sucesso!',
    });
  } catch (error: any) {
    console.error('Erro na rota de atualização do post:', error);
    return NextResponse.json(
      { error: error.message || 'Falha ao atualizar postagem' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('id');

    if (!postId) {
      return NextResponse.json(
        { error: 'O ID do post é obrigatório.' },
        { status: 400 }
      );
    }

    await privateSanityClient.delete(postId);

    return NextResponse.json({
      success: true,
      message: 'Post deletado com sucesso!',
    });
  } catch (error: any) {
    console.error('Erro ao deletar post:', error);
    return NextResponse.json(
      { error: error.message || 'Erro interno ao processar deleção.' },
      { status: 500 }
    );
  }
}
