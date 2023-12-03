import { ReactNode } from 'react';

// Import necessary components and types
// import Footer from '@/components/footer/footer';
// import { I18nParametersProps, Locale } from '@/pods/i18n/interfaces';
import Html from '@/pages/document/html';
import ServerStylesheet from '@/styled/server-stylesheet';

export const metadata = {
  icons: {
    icon: '/favicon.ico'
  }
};

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

const RootLayout = ({ children, ...props }: RootLayoutProps) => (
  <ServerStylesheet>
    {/* 
    Uncomment this if needed
    <LocaleClientProvider locale={props.params.lng}>
    */}
    <Html>
      <body>
        {children}
        {/* <Footer /> */}
        {/* <RouteChecker /> */}ç
        <footer>
          <p>Footer</p>
        </footer>
      </body>
    </Html>
    {/* 
    Uncomment this if needed
    </LocaleClientProvider>
    */}
  </ServerStylesheet>
);

export default RootLayout;
