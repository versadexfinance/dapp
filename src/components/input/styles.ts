import { focus, styled } from '@/styled';

import { InputBase } from './input-base';

export const InputComponent = styled(InputBase, {
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      sm: {
        height: 8,
      },
      md: {
        height: 10,
      },
    },
  },
  color: '$foreground',
  borderRadius: '$2',
  backgroundColor: 'transparent',
  width: '100%',
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },

  '&::placeholder': {
    color: '#424242',
    lineHeight: "20px",
    fontSize: "14px",
    fontWeight: 400,
    
  },
  '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
    appearance: 'none',
    margin: 0
  },
  '&[type=number]': {
    MozAppearance: 'textfield',
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      margin: 0
    }
  }
});

export const Container = styled('div', {
  variants: {
    error: {
      true: {
        '&&': {
          boxShadow: '0 0 0 $borderWidths$1 $colors$error',
        },
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
      false: {
        '&:active': {
          backgroundColor: '$neutral',
        },
        '&:focus-within': {
          ...focus.outline,
        },
      },
    },
  },
  
  boxShadow: '0 0 0 1px #2D2C2C',
  border: 'none',
  backgroundColor: '$bg',
  borderRadius: "4px",
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 2,
  padding: 0,
  appearance: 'none',
  '& *:last-child': {
    pr: 2,
  },
  '& *:first-child': {
    pl: 2,
  },
});
