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
    const file = formData.get('file') as File;
    const titulo = formData.get('titulo') as string;

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado.' }, { status: 400 });
    }

    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    
    const imageAsset = await privateSanityClient.assets.upload('image', buffer, {
      filename: file.name,
      contentType: file.type,
    });

    
    const novoDocumento = await privateSanityClient.create({
      _type: 'galeria',
      tituloImagem: titulo || file.name.split('.')[0],
      arquivo: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset._id,
        },
      },
    });

    return NextResponse.json({ success: true, docId: novoDocumento._id });
  } catch (error: any) {
    console.error('Erro na rota interna de upload:', error);
    return NextResponse.json({ error: error.message || 'Falha no servidor' }, { status: 500 });
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