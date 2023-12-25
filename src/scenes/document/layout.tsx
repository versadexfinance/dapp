import { ReactNode, Suspense } from 'react'

import Html from '@/scenes/document/html'
import ServerStylesheet from '@/styled/server-stylesheet'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Footer from '@/components/footer/footer'

interface RootLayoutProps {
  children: ReactNode
}

export const generateStaticParams = async () => {}

const RootLayout = ({ children, ...props }: RootLayoutProps) => {
  return (
    <ServerStylesheet>
      <Html>
        {children}
        <Footer />
        <ToastContainer position="top-center" theme="dark" />
      </Html>
    </ServerStylesheet>
  )
}

export default RootLayout
