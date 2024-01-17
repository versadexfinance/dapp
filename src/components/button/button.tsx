'use client'

import { styled } from '@/styled/styled'

import { BaseButton } from './base-button'
import { sizeVariant, variantVariant } from './styles'

const Button = styled(BaseButton, {
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
  variants: {
    variant: variantVariant,
    fullWidth: {
      true: {
        width: '100%',
      },
    },
    rounded: {
      true: {
        borderRadius: '50%',
        dimensions: 12,
        px: 0,
      },
    },
    size: sizeVariant,
  },
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  fontFamily: 'unset',
  textTransform: 'uppercase',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '$1',
  borderRadius: '$2',
  fontWeight: '$600',
  transition: 'background-color $transitions$1',
  border: 'none',
  color: '$bg',
  width: 'fit-content',
  height: 'fit-content',

  '&:not(:disabled)': {
    cursor: 'pointer',
  },
})

export default Button
