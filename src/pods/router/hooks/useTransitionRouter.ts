'use client';

import { useRouter } from 'next/navigation';

interface ExtendedDocument extends Document {
  startViewTransition?: any;
}

export default function useAnimatedRouter() {
  const router = useRouter();

  const checkStatus = () => {
    const extendedDocument = document as ExtendedDocument;
    return extendedDocument?.startViewTransition;
  };

  const push = (url: string, options?: any) => {
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
