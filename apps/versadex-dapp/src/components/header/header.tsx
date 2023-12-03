'use client';
import Image from 'next/image';

import { Flex } from '@/components/box';
//

import { ContainerHeader, ContainerHeaderNavbar } from './styles';
import NextLink from '../next-link';

import { styled } from '@/styled';
import { usePathname } from 'next/navigation';

const StyledNextLink = styled(NextLink, {
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

const Header = () => {
  const pathname = usePathname();

  return (
    <ContainerHeader>
      <ContainerHeaderNavbar
        alignItems="center"
        justifyContent="spaceBetween"
        fullWidth
      >
        <Flex alignItems="center" justifyContent="end" gap="10">
          <NextLink css={{ height: 7.5 }} href="/home" shallow>
            <Image src="/img/logo.svg" alt="logo" width={50} height={40} />
          </NextLink>

          <Flex gap={4}>
            <StyledNextLink
              href="dashboard"
              active={pathname === '/dashboard'}
              shallow
            >
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
        </Flex>
      </ContainerHeaderNavbar>
      {/* <NavbarBottom /> */}
    </ContainerHeader>
  );
};

export default Header;
