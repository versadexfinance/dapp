import { ReactNode } from 'react';

// Import necessary components and types
// import Footer from '@/components/footer/footer';
// import { I18nParametersProps, Locale } from '@/pods/i18n/interfaces';
import Html from '@/pages/document/html';
import ServerStylesheet from '@/styled/server-stylesheet';
import { Flex } from '@/components/box';
import Typography from '@/components/typography';

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
        {/* <RouteChecker /> */}
        <Flex
          as={'footer'}
          fullWidth
          css={{
            maxWidth: 380,
            margin: 'auto',
            padding: 20,
            py: 10
          }}
          justifyContent={'spaceBetween'}
          alignItems={'center'}
        >
          <Typography
            css={{
              fontSize: '14px',
              color: '#BFBFBF'
            }}
          >
            VersaDex 2023
          </Typography>

          <Flex gap={1} alignItems={'center'}>
            <Typography
              css={{
                fontSize: '12px',
                color: '#009851'
              }}
            >
              2665839
            </Typography>
            <img src="/icons/Ellipse.svg" />
          </Flex>
        </Flex>
      </body>
    </Html>
    {/* 
    Uncomment this if needed
    </LocaleClientProvider>
    */}
  </ServerStylesheet>
);

export default RootLayout;
