'use client';

import { styled } from '@/styled';

export const directionVariant = {
  row: {
    flexDirection: 'row'
  },
  rowReverse: {
    flexDirection: 'row-reverse'
  },
  column: {
    flexDirection: 'column'
  },
  columnReverse: {
    flexDirection: 'column-reverse'
  }
} as const;

export const Flex = styled('div', {
  variants: {
    fullWidth: {
      true: {
        width: '100%'
      }
    },
    fullHeight: {
      true: {
        height: '100%'
      }
    },
    direction: directionVariant,
    wrap: {
      wrap: {
        flexWrap: 'wrap'
      },
      noWrap: {
        flexWrap: 'nowrap'
      }
    },
    justifyContent: {
      center: {
        justifyContent: 'center'
      },
      end: {
        justifyContent: 'end'
      },
      start: {
        justifyContent: 'start'
      },
      spaceAround: {
        justifyContent: 'space-around'
      },
      spaceBetween: {
        justifyContent: 'space-between'
      },
      spaceEvenly: {
        justifyContent: 'space-evenly'
      }
    },
    alignItems: {
      center: {
        alignItems: 'center'
      },
      end: {
        alignItems: 'end'
      },
      start: {
        alignItems: 'start'
      }
    },
    gap: {
      1: {
        gap: '$1'
      },
      2: {
        gap: '$2'
      },
      3: {
        gap: '$3'
      },
      4: {
        gap: '$4'
      },
      5: {
        gap: '$5'
      },
      6: {
        gap: '$6'
      },
      7: {
        gap: '$7'
      },
      8: {
        gap: '$8'
      },
      9: {
        gap: '$9'
      },
      10: {
        gap: '$10'
      }
    }
  },
  display: 'flex'
});

export const Stack = styled(Flex, {
  '&&': {
    flexDirection: 'column'
  }
});
