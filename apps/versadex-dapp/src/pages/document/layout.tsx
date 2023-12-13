import { ReactNode } from 'react';

// Import necessary components and types
// import Footer from '@/components/footer/footer';
// import { I18nParametersProps, Locale } from '@/pods/i18n/interfaces';
import Html from '@/pages/document/html';
import ServerStylesheet from '@/styled/server-stylesheet';

import Footer from '@/components/footer/footer';

// export const metadata = {
//   icons: {
//     icon: '/favicon.ico'
//   }
// };

// Uncomment the interface if you need it
// interface RootLayoutProps extends I18nParametersProps {
//   children: ReactNode;
// }

interface RootLayoutProps {
  children: ReactNode;
}

export const generateStaticParams = async () => {
  // Uncomment this if needed
  // Object.values(Locale).map((lng) => ({ lng }));
};

const RootLayout = ({ children, ...props }: RootLayoutProps) => {
  return (
    <ServerStylesheet>
      {/* 
    Uncomment this if needed
    <LocaleClientProvider locale={props.params.lng}>
    */}
      <Html>
        <body>
          {children}
          {/* <Footer /> */}
          {/* <RouteChecker /> */}
          <Footer />
        </body>
      </Html>
      {/* 
    Uncomment this if needed
    </LocaleClientProvider>
    */}
    </ServerStylesheet>
  );
};

export default RootLayout;
