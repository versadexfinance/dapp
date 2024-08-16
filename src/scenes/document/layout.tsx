import { ReactNode, Suspense } from 'react'

import Html from '@/scenes/document/html'
import ServerStylesheet from '@/styled/server-stylesheet'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from '@/components/header/header'

import Footer from '@/components/footer/footer'
import { Flex } from '@/components/box'
import { styled } from '@/styled'
import { AnimatePresence } from 'framer-motion'

interface RootLayoutProps {
  children: ReactNode
}

export const generateStaticParams = async () => {}

const Container = styled('div', {
  transition: 'all 0.5s ease-in-out',
  display: 'flex',
  flexDirection: 'column',

  opacity: 0,
  variants: {
    mounted: {
      true: {
        opacity: 1,
      },
    },
  },
  width: '100%',
  maxWidth: 380,

  mx: 'auto',

  py: 4,
})

const RootLayout = ({ children, ...props }: RootLayoutProps) => {
  return (
    <ServerStylesheet>
      <Html>
        <Header />

        <Container>{children}</Container>
        <Footer />
        <ToastContainer position="top-center" theme="dark" />
      </Html>
    </ServerStylesheet>
  )
}

export default RootLayout
