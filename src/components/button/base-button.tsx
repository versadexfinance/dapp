import { HTMLProps } from 'react';

// import { mediaQueries } from '@/styled';
import focus from '@/styled/focus';
import { ComponentProps, styled } from '@/styled/styled';

export const BaseButton = styled('button', {
  display: 'flex',
  padding: 0,
  background: 'transparent',
  border: 'none',
  minWidth: 'fit-content',
  '&:disabled': {
    cursor: 'not-allowed',
    opacity: 0.5
  },
  '&:not(:disabled)': {
    '&:focus-visible': focus.outline
  },
  borderRadius: '$3',

  variants: {
    pointer: {
      true: {
        '&:not(:disabled)': {
          cursor: 'pointer'
        }
      }
    }
    // hover: {
    //   true: {
    //     opacity: 0.7,
    //     transition: 'opacity $transitions$1 ease-in-out',
    //     [mediaQueries.hoverAvailable]: {
    //       '&:hover': {
    //         opacity: 1
    //       }
    //     }
    //   }
    // }
  }
});

export type BaseButtonProps = ComponentProps<typeof BaseButton> &
  HTMLProps<HTMLButtonElement>;
