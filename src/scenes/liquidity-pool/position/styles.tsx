import { Stack } from '@/components/box'
import { styled } from '@/styled'
import { table } from 'console'

export const Container = styled(Stack, {
  maxWidth: '900px',
  margin: '0 auto',
  gap: '2rem',
  padding: '1em',
  marginBottom: '4rem',
  marginTop: '4rem',
  minHeight: '72vh',
})
export const GridContainer = styled('div', {
  display: 'grid',
  height: '100%',
  width: '100%',
  gridGap: '20px',

  gridTemplateAreas: `
    'liquidity'
    'fees'
    'nft'
    'range'
    `,

  '@tablet': {
    gridTemplateAreas: `
  'liquidity fees'
  'liquidity fees'
  'range range'
  `,
  },
})

export const GridCardContainer = styled(Stack, {
  background: 'transparent',
  border: '1px solid #2D2C2C',
  borderRadius: '24px',
  padding: '24px',
  display: 'grid',
})
