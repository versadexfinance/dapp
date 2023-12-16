import { makeSolidVariant } from './utils';

export const variantVariant = {
  solid: makeSolidVariant('secondary', {
    // hover: {
    //   backgroundColor: `$primary`,
    //   borderColor: `$primary-dark-0`,
    // },
    active: {
      backgroundColor: `$primary-dark-0`,
      borderColor: `$primary-dark-1`,
    },
    focusVisible: {
      backgroundColor: `$primary-dark-0`,
      borderColor: `$primary-dark-1`,
      outlineColor: `$primary-dark-1`,
      outlineOffset: 2,
    },
  }),
  'solid-primary': makeSolidVariant('primary'),
  'solid-error': makeSolidVariant('error'),
  'solid-warning': makeSolidVariant('warning'),
  'solid-success': makeSolidVariant('success'),
  'solid-info': makeSolidVariant('info'),
  'solid-foreground': makeSolidVariant('foreground'),
  link: {
    backgroundColor: 'none',
    border: 'none',
    color: '$foreground',
    px: 1,
  },
} as const;

export const sizeVariant = {
  xs: {
    fontSize: '$-1',
    px: 3,
    height: 8,
    '&:svg': {
      dimensions: 3,
    },
  },
  sm: {
    fontSize: '$-1',
    px: 4,
    height: 10,
    '&:svg': {
      dimensions: 3,
    },
  },
  md: {
    height: 11,
    fontSize: '$-1',
    px: 6,
    '& svg': {
      dimensions: 4,
    },
  },
  lg: {
    fontSize: '$2',
    px: 8,
    height: 13,
  },
} as const;
