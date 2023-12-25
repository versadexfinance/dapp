'use client'
import Image from 'next/image'
import { Flex } from '@/components/box'
import { ContainerHeader, ContainerHeaderNavbar } from './styles'
import NextLink from '../next-link'
import { styled } from '@/styled'
import { usePathname } from 'next/navigation'
import media from '@/styled/media'
// import { start } from 'repl';
import ConnectWalletButton from '../connect-button/connect-button'
import Link from 'next/link'
import { Fragment } from 'react'

// Common components

const StyledNextLink = styled(Link, {
  fontSize: '16px',
  textDecoration: 'none',
  color: 'inherit',
  borderRadius: '4px',
  padding: '0.5rem 1rem',
  '@mobile': {
    fontSize: '18px',
  },

  variants: {
    active: {
      true: {
        background: 'rgba(235, 254, 100, 0.10)',
        color: '$primary',
      },
    },
  },
})

const ResponsiveNavLinksContainer = styled(Flex, {
  gap: 1,
  width: '100%',
  justifyContent: 'space-between',
  '@tablet': {
    gap: 4,
    justifyContent: 'start',
  },
})

const NavigationLinks = ({ pathname }: { pathname: string | null }) => (
  <ResponsiveNavLinksContainer>
    <StyledNextLink href="dashboard" active={pathname === '/dashboard'} shallow>
      Dashboard
    </StyledNextLink>
    <StyledNextLink href="swap" active={pathname === '/swap'} shallow>
      Swap
    </StyledNextLink>
    <StyledNextLink
      href=""
      css={{
        color: 'gray',
      }}
      active={pathname === '/liquidity-pool'}
      shallow
    >
      Liquidity Pool
    </StyledNextLink>
  </ResponsiveNavLinksContainer>
)

// Refactored Header component
const HiddenOnMobile = styled(Flex, {
  display: 'none',
  '@tablet': {
    display: 'block',
  },
})

const HiddenOnDesktop = styled(Flex, {
  display: 'block',
  '@tablet': {
    display: 'none',
  },
})

const Header = () => {
  const pathname = usePathname()

  return (
    <ContainerHeader>
      <ContainerHeaderNavbar alignItems="center" justifyContent="spaceBetween">
        <Flex
          css={{
            width: '100%',
            justifyContent: 'space-between',
            '@tablet': {
              alignItems: 'center',
              justifyContent: 'start',
              gap: 10,
            },
          }}
        >
          <NextLink css={{ height: 7.5 }} href="/dashboard">
            <Image src="/img/logo.svg" alt="logo" width={50} height={40} />
          </NextLink>
          <HiddenOnMobile>
            <NavigationLinks pathname={pathname} />
          </HiddenOnMobile>
          <HiddenOnDesktop>
            <Flex>{<ConnectWalletButton />}</Flex>{' '}
          </HiddenOnDesktop>
        </Flex>
        <HiddenOnDesktop>
          <NavigationLinks pathname={pathname} />
        </HiddenOnDesktop>
        <HiddenOnMobile>
          <Flex>
            <ConnectWalletButton />
          </Flex>
        </HiddenOnMobile>
      </ContainerHeaderNavbar>
    </ContainerHeader>
  )
}

export default Header
