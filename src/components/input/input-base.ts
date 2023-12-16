import { ComponentProps, styled } from '@/styled';

export const InputBase = styled('input', {
  appearance: 'none',
  borderStyle: 'none',
  fontSize: '$1'
});

export type InputBaseProps = ComponentProps<typeof InputBase>;
