'use client'

import { Flex } from '@/components/box'

import { styled } from '@/styled'
import { ReactNode } from 'react'

// import { Flex } from '@/components/box';
// import Header from '@/components/header';
// import TitleSection from '@/components/title-section';
// import useClientTranslation from '@/pods/i18n/hooks/use-client-translation';
// import { styled } from '@/styled';

// import DashboardMenu from './dashboard-menu';

interface LayoutProps {
  children: ReactNode
}

// const TRANSLATIONS = {
//   account: 'userSection.account'
// } as const;

const Container = styled(Flex, {
  transition: 'all 0.5s ease-in-out',
  display: 'flex',
  flexDirection: 'column',
  opacity: 1,
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
  p: 2,
})

const Layout = ({ children }: LayoutProps) => {
  return <Container mounted={'true'}>{children}</Container>
}

export default Layout
