import typography from '@/components/typography';
import { styled } from '@/styled';


export const Thead = styled('thead', {
  textAlign: 'left',
});

export const Th = styled(typography, {
  p: 2,
  pb: 4,
});

export const Td = styled('td', {
  display: 'flex',
  gap:1,
  borderTop: '1px solid $colors$neutral',
  p: 2,
  '& p': {
    color: '$neutral-dark-2',
  },
  '& svg': {
    color: '$primary',
  },
});
