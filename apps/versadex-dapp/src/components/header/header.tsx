'use client';
import Image from 'next/image';
import { Flex } from '@/components/box';
import { ContainerHeader, ContainerHeaderNavbar } from './styles';
import NextLink from '../next-link';
import { styled } from '@/styled';
import { usePathname } from 'next/navigation';
import media from '@/styled/media';
import { useMediaQuery } from 'usehooks-ts';
// import { start } from 'repl';
import ConnectWalletButton from '../connect-button/connect-button';
import Link from 'next/link';

// Common components

const StyledNextLink = styled(Link, {
  fontSize: '18px',
  textDecoration: 'none',
  color: 'inherit',
  borderRadius: '4px',
  padding: '0.5rem 1rem',

  variants: {
    active: {
      true: {
        background: 'rgba(235, 254, 100, 0.10)',
        color: '$primary'
      }
    }
  }
});

const NavigationLinks = ({
  gtThanTablet,
  pathname
}: {
  gtThanTablet: boolean;
  pathname: string | null;
}) => (
  <Flex
    fullWidth={!gtThanTablet}
    css={{
      gap: gtThanTablet ? 4 : 0
    }}
    justifyContent={gtThanTablet ? 'start' : 'spaceBetween'}
  >
    <StyledNextLink href="dashboard" active={pathname === '/dashboard'} shallow>
      Dashboard
    </StyledNextLink>
    <StyledNextLink href="swap" active={pathname === '/swap'} shallow>
      Swap
    </StyledNextLink>
    <StyledNextLink
      href="liquidity-pool"
      active={pathname === '/liquidity-pool'}
      shallow
    >
      Liquidity Pool
    </StyledNextLink>
  </Flex>
);

// Refactored Header component

const Header = () => {
  const pathname = usePathname();
  const gtThanTablet = useMediaQuery(media.tablet);

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
              gap: 10
            }
          }}
        >
          <NextLink css={{ height: 7.5 }} href="/dashboard">
            <Image src="/img/logo.svg" alt="logo" width={50} height={40} />
          </NextLink>
          {!gtThanTablet && <Flex>{<ConnectWalletButton />}</Flex>}
          {gtThanTablet && (
            <NavigationLinks gtThanTablet={gtThanTablet} pathname={pathname} />
          )}
        </Flex>
        {gtThanTablet && (
          <Flex>
            <ConnectWalletButton />
          </Flex>
        )}
        {!gtThanTablet && (
          <NavigationLinks gtThanTablet={gtThanTablet} pathname={pathname} />
        )}
      </ContainerHeaderNavbar>
    </ContainerHeader>
  );
};

export default Header;
