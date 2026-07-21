import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const privateSanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-07-09',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

type Metric = 'view' | 'share';

function getMonthKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json() as { metric?: unknown };
    const metric = body.metric;

    if (metric !== 'view' && metric !== 'share') {
      return NextResponse.json({ error: 'Indicador inválido.' }, { status: 400 });
    }

    const post = await privateSanityClient.fetch<{
      metricsMonth?: string;
      view?: number;
      shared?: number;
      viewsThisMonth?: number;
      sharesThisMonth?: number;
    } | null>(
      `*[_type == "post" && _id == $id][0]{ metricsMonth, view, shared, viewsThisMonth, sharesThisMonth }`,
      { id }
    );

    if (!post) {
      return NextResponse.json({ error: 'Post não encontrado.' }, { status: 404 });
    }

    const monthKey = getMonthKey();
    const totalField = metric === 'view' ? 'view' : 'shared';
    const monthlyField = metric === 'view' ? 'viewsThisMonth' : 'sharesThisMonth';
    const currentTotal = metric === 'view' ? post.view : post.shared;
    const currentMonthlyTotal = metric === 'view' ? post.viewsThisMonth : post.sharesThisMonth;
    const patch = privateSanityClient.patch(id);

    if (typeof currentTotal === 'number') {
      patch.inc({ [totalField]: 1 });
    } else {
      patch.set({ [totalField]: 1 });
    }

    if (post.metricsMonth === monthKey && typeof currentMonthlyTotal === 'number') {
      patch.inc({ [monthlyField]: 1 });
    } else {
      patch.set({ metricsMonth: monthKey, [monthlyField]: 1 });
    }

    await patch.commit();
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Erro ao registrar indicador do post:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Falha ao registrar indicador.' },
      { status: 500 }
    );
  }
}
