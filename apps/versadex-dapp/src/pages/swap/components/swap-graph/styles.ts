import { Stack } from '@/components/box';
import NextLink from '@/components/next-link';
import { styled } from '@/styled';

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  gap: 32,
  px: 6,
  marginTop: 38,
  borderRadius:"$2",
  py: 8,
  backgroundImage: 'linear-gradient(to right, black,black,  transparent), url("/img/header.png")',
  
  backgroundRepeat: 'no-repeat',
  
  
  backgroundPosition: '0px 0',
  backgroundColor:"black",
  
});

export const Menu = styled(Stack, {
  gap: 2,
});

export const MenuLink = styled(NextLink, {
  variants: {
    active: {
      true: {
        fontWeight: '$600',
        color: '$foreground',
      },
    },
  },
  fontSize: '$0',
  color: '$neutral-dark-2',
  width: '100%',
  transition: 'all $transitions$1 ease-in-out',
  borderBottom: '1px solid $colors$neutral',
  py: 1.5,
  display: 'block',
  '@laptopMini': {
    width: 55,
  },
});
