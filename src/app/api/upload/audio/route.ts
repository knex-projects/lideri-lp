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

    if (!arquivo) {
      return NextResponse.json({ error: 'Nenhum arquivo de áudio enviado.' }, { status: 400 });
    }

    if (!arquivo.type.startsWith('audio/')) {
      return NextResponse.json({ error: 'O arquivo enviado não é um áudio válido.' }, { status: 400 });
    }

    const asset = await privateSanityClient.assets.upload('file', arquivo, {
      filename: arquivo.name,
      contentType: arquivo.type,
    });

    return NextResponse.json({ success: true, assetId: asset._id, url: asset.url });
  } catch (error: any) {
    console.error('Erro no upload de áudio:', error);
    return NextResponse.json({ error: error.message || 'Erro ao processar áudio.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const assetId = searchParams.get('id');

    if (!assetId) {
      return NextResponse.json({ error: 'O ID do asset de áudio é obrigatório.' }, { status: 400 });
    }

    await privateSanityClient.delete(assetId);

    return NextResponse.json({ success: true, message: 'Arquivo de áudio removido com sucesso!' });
  } catch (error: any) {
    console.error('Erro ao deletar áudio:', error);
    return NextResponse.json({ error: error.message || 'Erro ao deletar áudio.' }, { status: 500 });
  }
}
