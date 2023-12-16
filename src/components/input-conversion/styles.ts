import { focus, styled } from '@/styled';
import { InputBase } from '../input/input-base';
import { Flex, Stack } from '../box';



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
  paddingRight: "8px",
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  fontSize:"24px",
  lineHeight:"30px",
  textAlign:'right',
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

export const Container = styled(Stack, {
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
  background:"#101010",
  textAlign:"right",
  flex:"2",
  boxShadow: '0 0 0 1px #2D2C2C',
  border: 'none',
  borderRadius: "4px",
  padding:"4px",
  // justifyContent: 'right',
  alignItems: 'right',
  gap: 1,
  appearance: 'none',
  
});


export const Label = styled(Stack, {
  fontSize:"12px",
  lineHeight:"20px",
  color:"#AFAFAF",
  paddingRight:"8px",
});
