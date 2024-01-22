import { styled } from '@/styled'

import { Flex, Stack } from '../box'

export const Hr = styled('hr', {
  borderColor: '$secondary-light-0',
  borderTop: 'none',
})

export const Container = styled('header', {
  // backgroundColor: '$secondary',
  pt: 16,
  pb: 8,
  maxWidth: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
})

export const Content = styled(Stack, {
  width: 300,
  maxWidth: '100%',
  mx: 'auto',
})

export const ContainerHeader = styled('header', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  margin: '0 auto',
  backgroundColor: '#0A0A0A',
  py: 0,
  borderBottom: '1px solid #1F1F1F', // [TODO] add to Template border-color
  top: 0,
  zIndex: '$header',
  position: 'sticky',
})

export const ContainerHeaderNavbar = styled(Flex, {
  maxWidth: 380,
  width: '100%',
  margin: '0 auto',
  padding: 10,
  alignItems: 'center',
  justifyContent: 'spaceBetween',
  gap: 5,
  py: '16px',
  flexDirection: 'column',
  '@tablet': {
    flexDirection: 'row',
    gap: 0,
  },
  // backgroundColor: 'white',
  // '@laptopMini': {
  //   gap: 4,
  //   px: 1,
  //   position: 'relative',
  // },
})

export const ContainerFlex = styled(Flex, {
  gap: 2,
  '@laptopMini': {
    gap: 6,
  },
})
