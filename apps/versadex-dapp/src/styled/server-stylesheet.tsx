'use client';

import { useServerInsertedHTML } from 'next/navigation';
import { ReactNode, useRef } from 'react';

import { getCssText } from './styled';

interface ServerStylesheetProps {
  children: ReactNode;
}

const ServerStylesheet = ({ children }: ServerStylesheetProps) => {
  const mounted = useRef(false);
  useServerInsertedHTML(() => {
    if (!mounted.current) {
      mounted.current = true;
      return (
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      );
    }
    return null;
  });

  return children;
};

export default ServerStylesheet;
