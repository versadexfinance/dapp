'use client';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';

interface ExtendedDocument extends Document {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  startViewTransition?: any;
}

export default function useAnimatedRouter() {
  const router = useRouter();

  const checkStatus = () => {
    const extendedDocument = document as ExtendedDocument;
    return extendedDocument?.startViewTransition;
  };

  const push = (url: string, options?: NavigateOptions) => {
    const extendedDocument = document as ExtendedDocument;
    if (!extendedDocument.startViewTransition) {
      return router.push(url, options);
    } else {
      extendedDocument.startViewTransition(() => {
        router.push(url, options);
      });
    }
  };
  return { push, checkStatus };
}
