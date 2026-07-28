import { Suspense } from 'react';
import { EditorForm } from '../components/editorForm';
import { LoadingScreen } from '@/src/components/layout/loading';

interface Props {
  params: {
    id: string;
  };
}

export default async function EditPostPage({ params }: Props) {
    const { id } = await params;
  return (
    <Suspense fallback={<LoadingScreen />}>
      <EditorForm postId={id} />
    </Suspense>
  );
}
