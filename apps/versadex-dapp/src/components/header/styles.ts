import { styled } from '@/styled';

import { Flex, Stack } from '../box';

export const Hr = styled('hr', {
  borderColor: '$secondary-light-0',
  borderTop: 'none',
});

export const Container = styled('header', {
  // backgroundColor: '$secondary',
  pt: 16,
  pb: 8,
  maxWidth: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});

export const Content = styled(Stack, {
  width: 300,
  maxWidth: '100%',
  mx: 'auto',
});

export const ContainerHeader = styled('header', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  py: 0,
  borderBottom: '1px solid #1F1F1F', // [TODO] add to Template border-color
  // backgroundColor: '$bg',
  // position: 'fixed',
  top: 0,
  zIndex: '$header',
  // px: 4,
  '@desktop': {
    px: 12,
  },
  '@largeDesktop': {
    px: 17,
  },
});

export const ContainerHeaderNavbar = styled(Flex, {
  alignItems: 'center',
  justifyContent: 'spaceBetween',
  gap: 0,
  py: "16px",
  
  // backgroundColor: 'white',
  // '@laptopMini': {
  //   gap: 4,
  //   px: 1,
  //   position: 'relative',
  // },
});

export const ContainerFlex = styled(Flex, {
  gap: 2,
  '@laptopMini': {
    gap: 6,
  },
});
