'use client'

// import { dir } from 'i18next';
import { Poppins } from 'next/font/google'
// eslint-disable-next-line import/order
import { ReactNode } from 'react'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal'],
  display: 'swap',
})

import Head from 'next/head'
import { RecoilRoot } from 'recoil'

// import useCurrentLocale from '@/pods/i18n/hooks/use-current-locale';
// import { Locale } from '@/pods/i18n/interfaces';
import { getCssText } from '@/styled/styled'
import globalStyles from '@/styled/global-styles'
import '@rainbow-me/rainbowkit/styles.css'

import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiConfig } from 'wagmi'

import config from '@/web3/client'
import TransactionStatusProvider from '@/components/transaction-status-provider/transaction-status-provider'
import MyLpsProvider from '@/components/my-lps-provider/my-lps-provider'
interface HtmlProps {
  children: ReactNode
  // lng: Locale;
}

const Html = ({ children }: HtmlProps) => {
  // const locale = useCurrentLocale(lng);
  globalStyles()
  return (
    <html className={poppins.className}>
      <title> Versadex </title>
      <Head key={'123'}>
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
        <link rel="apple-touch-icon" href="/img/logo.svg" />
      </Head>
      <body>
        <WagmiConfig config={config.wagmiConfig}>
          <RainbowKitProvider
            theme={darkTheme({
              accentColor: '#EBFE64',
              accentColorForeground: '#0A0A0A',
              borderRadius: 'small',
              fontStack: 'system',
              overlayBlur: 'small',
            })}
            chains={config.chains}
          >
            <RecoilRoot>
              <TransactionStatusProvider>
                <MyLpsProvider>{children}</MyLpsProvider>
              </TransactionStatusProvider>
            </RecoilRoot>
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  )
}

export default Html
