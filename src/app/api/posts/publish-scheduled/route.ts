import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

export const dynamic = 'force-dynamic';

const privateSanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-07-09',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

export async function GET() {
  try {
    const scheduledPostIds = await privateSanityClient.fetch<string[]>(
      `*[_type == "post" && status == "scheduled" && publishedAt <= now()]._id`
    );

    if (scheduledPostIds.length > 0) {
      const transaction = privateSanityClient.transaction();
      scheduledPostIds.forEach((postId) => transaction.patch(postId, { set: { status: 'posted' } }));
      await transaction.commit();
    }

    return NextResponse.json({ success: true, published: scheduledPostIds.length });
  } catch (error: unknown) {
    console.error('Erro ao publicar posts agendados:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Falha ao publicar posts agendados.' },
      { status: 500 }
    );
  }
}
