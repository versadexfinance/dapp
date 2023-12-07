import mediaQueries from '@/styled/media-queries';

interface MakeSolidVariantOptions {
  hover?: Record<string, unknown>;
  active?: Record<string, unknown>;
  focusVisible?: Record<string, unknown>;
}

export const makeSolidVariant = (
  color: string,
  options: MakeSolidVariantOptions = {}
) => ({
  backgroundColor: `$${color}`,
  borderColor: `$${color}-dark-1`,
  color: '$bg',

  '&:not(:disabled)': {
    [mediaQueries.hoverAvailable]: {
      '&:hover': options.hover ?? {
        backgroundColor: `$${color}-dark-0`,
        borderColor: `$${color}-dark-1`
      }
    },
    '&:focus-visible': options.focusVisible ?? {
      backgroundColor: `$${color}-dark-0`,
      borderColor: `$${color}-dark-1`,
      outlineColor: `$${color}-dark-1`
    },
    '&:active': options.active ?? {
      borderColor: `$${color}-dark-2`,
      backgroundColor: `$${color}-dark-1`
    }
  }
});
