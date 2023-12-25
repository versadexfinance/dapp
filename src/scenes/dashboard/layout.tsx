'use client'

import { Flex } from '@/components/box'
import Header from '@/components/header'
import { styled } from '@/styled'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

const Container = styled(Flex, {
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
  padding: 10,
  maxWidth: 380,
  // background: 'red',
  mx: 'auto',
  py: 4,
})

const Layout = ({ children }: LayoutProps) => {
  return <Container mounted>{children}</Container>
}

export default Layout
