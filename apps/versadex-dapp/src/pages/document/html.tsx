'use client';

// import { dir } from 'i18next';
import { Poppins } from 'next/font/google';
// eslint-disable-next-line import/order
import { ReactNode } from 'react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal'],
  display: 'swap'
});

import Head from 'next/head';
import { RecoilRoot } from 'recoil';

// import useCurrentLocale from '@/pods/i18n/hooks/use-current-locale';
// import { Locale } from '@/pods/i18n/interfaces';
import { getCssText } from '@/styled/styled';
import globalStyles from '@/styled/global-styles';

interface HtmlProps {
  children: ReactNode;
  // lng: Locale;
}
const Html = ({ children }: HtmlProps) => {
  // const locale = useCurrentLocale(lng);
  globalStyles();
  return (
    <html className={poppins.className}>
      <Head>
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      </Head>
      <RecoilRoot>{children}</RecoilRoot>
    </html>
  );
};

export default Html;
