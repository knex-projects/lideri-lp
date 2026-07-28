import { Suspense } from 'react';
import { EditorForm } from './components/editorForm';
import { LoadingScreen } from '@/src/components/layout/loading';


export default function CreatePostPage() {
  return (
    <Suspense fallback={<LoadingScreen/>}>
      <EditorForm />
    </Suspense>
  );
}

