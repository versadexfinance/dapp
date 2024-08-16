// components/LoadingBar.js

import { styled, keyframes } from '@/styled'

const slide = keyframes({
  '0%': { left: '-100%' },
  '100%': { left: '100%' },
})

const LoadingBarContainer = styled('div', {
  position: 'fixed',
  top: 'YourNavbarHeight', // Replace with your actual navbar height
  left: 0,
  width: '100%',
  height: '2px',
  visibility: 'hidden',
  zIndex: 1000, // Ensure it's above other elements
})

const LoadingBarProgress = styled('div', {
  height: '100%',
  backgroundColor: '#0070f3', // Customize color as needed
  animation: `${slide} 2s linear infinite`, // Adjust animation as needed
  visibility: 'visible',
})

export const LoadingBar = ({ loading }) => (
  <LoadingBarContainer style={{ visibility: loading ? 'visible' : 'hidden' }}>
    {loading && <LoadingBarProgress />}
  </LoadingBarContainer>
)
