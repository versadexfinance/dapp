'use client';

import { styled } from '@/styled';

import {
  decorationVariant,
  familyVariant,
  sizeVariant,
  textAlignVariant,
  textTransformVariant,
  weightVariant,
  whiteSpaceVariant,
} from './variants';

const Typography = styled('p', {
  color: '$foreground',
  defaultVariants: {
    weight: '300',
  },
  variants: {
    family: familyVariant,
    decoration: decorationVariant,
    size: sizeVariant,
    textAlign: textAlignVariant,
    weight: weightVariant,
    whiteSpace: whiteSpaceVariant,
    textTransform: textTransformVariant,
    selectable: {
      true: {
        userSelect: 'all',
      },
    },
  },
});

export default Typography;
