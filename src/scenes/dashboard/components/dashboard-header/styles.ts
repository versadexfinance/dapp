import { Stack } from '@/components/box';
import NextLink from '@/components/next-link';
import { styled } from '@/styled';

export const Container = styled('div', {
  display: 'flex',
  backgroundColor:"black",
  flexDirection: 'column',
  gap:5,
  backgroundImage: 'linear-gradient(to bottom, black, black, black, transparent), url("/img/header.png")',
  py: 8,
  px: 6,
  paddingBottom: 90,
  backgroundSize: '130%',
  backgroundPositionX: '90%',
  backgroundRepeat: 'no-repeat',
  backgroundPositionY: '100%',  
  "@tablet":{
    display: 'flex',
    backgroundSize: '43% 100%',  // Set the width to cover 50%
    backgroundPositionY: 'unset',
    backgroundPositionX: '100%',  // Start the background image from the right edge
    py: 8,
    px: 6,
    width: '100%',
    marginTop: 38,
    borderRadius: "8px",
    backgroundImage: 'linear-gradient(to right, black, transparent), url("/img/header.png")',
    backgroundRepeat: 'no-repeat',
    flexDirection: 'row',
    gap: 32,
    
  }

  
});

export const TotalValueSection = styled(Stack, {
  "@tablet":{
    alignItems:"space-between"
  }
})

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
