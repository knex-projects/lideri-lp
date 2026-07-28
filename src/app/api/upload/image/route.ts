import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const privateSanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-07-09',
  token: process.env.SANITY_API_WRITE_TOKEN, 
  useCdn: false,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const arquivo = formData.get('file') as File;
    const titulo = (formData.get('titulo') as string) || arquivo?.name.split('.')[0] || 'Imagem sem título';

    if (!arquivo) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado.' }, { status: 400 });
    }

    const assetType = arquivo.type.startsWith('image/') ? 'image' : 'file';

    const asset = await privateSanityClient.assets.upload(assetType, arquivo, {
      filename: arquivo.name,
      contentType: arquivo.type,
    });

    const documentoGaleria = await privateSanityClient.create({
      _type: 'galeria',
      tituloImagem: titulo,
      arquivo: {
        _type: assetType === 'image' ? 'image' : 'file',
        asset: {
          _type: 'reference',
          _ref: asset._id,
        },
      },
    });

    return NextResponse.json({
      success: true,
      docId: documentoGaleria._id,
      assetId: asset._id,
    });
  } catch (error: any) {
    console.error('Erro na rota de upload:', error);
    return NextResponse.json({ error: error.message || 'Erro ao processar upload.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const docId = searchParams.get('id');

    if (!docId) {
      return NextResponse.json({ error: 'O ID do documento é obrigatório.' }, { status: 400 });
    }

    const documentoGaleria = await privateSanityClient.getDocument(docId);

    if (!documentoGaleria) {
      return NextResponse.json({ error: 'Documento não encontrado no Sanity.' }, { status: 404 });
    }

    const assetRef = documentoGaleria.arquivo?.asset?._ref;

    await privateSanityClient.delete(docId);

    if (assetRef) {
      try {
        await privateSanityClient.delete(assetRef);
      } catch (assetError: any) {
        console.warn('O asset físico não pôde ser deletado (pode estar em uso em outro documento):', assetError.message);
      }
    }

    return NextResponse.json({ success: true, message: 'Upload e arquivos removidos com sucesso!' });
  } catch (error: any) {
    console.error('Erro ao deletar imagem:', error);
    return NextResponse.json({ error: error.message || 'Erro interno ao processar deleção.' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    const docId = formData.get('id') as string | null;
    const titulo = formData.get('titulo') as string | null;
    const arquivo = formData.get('file');

    if (!docId) {
      return NextResponse.json({ error: 'O ID da mídia é obrigatório.' }, { status: 400 });
    }

    if (!titulo?.trim() && !(arquivo instanceof File)) {
      return NextResponse.json(
        { error: 'Informe um novo título ou arquivo para atualizar a mídia.' },
        { status: 400 }
      );
    }

    const media = await privateSanityClient.getDocument(docId);

    if (!media) {
      return NextResponse.json({ error: 'Mídia não encontrada no Sanity.' }, { status: 404 });
    }

    const patch = privateSanityClient.patch(docId);
    let assetId: string | undefined;

    if (titulo?.trim()) {
      patch.set({ tituloImagem: titulo.trim() });
    }

    if (arquivo instanceof File) {
      if (!arquivo.type.startsWith('image/')) {
        return NextResponse.json({ error: 'O arquivo enviado deve ser uma imagem.' }, { status: 400 });
      }

      const asset = await privateSanityClient.assets.upload('image', arquivo, {
        filename: arquivo.name,
        contentType: arquivo.type,
      });

      assetId = asset._id;
      patch.set({
        arquivo: {
          _type: 'image',
          asset: { _type: 'reference', _ref: asset._id },
        },
      });
    }

    const updatedMedia = await patch.commit();

    return NextResponse.json({
      success: true,
      docId: updatedMedia._id,
      assetId,
      message: 'Mídia atualizada com sucesso!',
    });
  } catch (error: any) {
    console.error('Erro ao atualizar mídia:', error);
    return NextResponse.json(
      { error: error.message || 'Erro interno ao atualizar mídia.' },
      { status: 500 }
    );
  }
}
