import { styled } from '@/styled'

// Define your styled slider
const StyledSlider = styled('input', {
  // base styles for your slider
  appearance: 'none',
  width: '100%',
  height: '2px',
  background: '#EBFE64',
  borderRadius: '5px',
  outline: 'none',
  flex: 1,

  // styles for the thumb
  '&::-webkit-slider-thumb': {
    appearance: 'none',
    width: '25px',
    height: '25px',
    borderRadius: '50%',
    background: '#EBFE64',
    cursor: 'pointer',
    transition: 'background 0.3s ease-in-out',

    '&:hover': {
      background: '#555',
    },
  },

  '&::-moz-range-thumb': {
    width: '25px',
    height: '25px',
    borderRadius: '50%',
    background: '#EBFE64',
    cursor: 'pointer',
    border: 'none',

    '&:hover': {
      background: '#555',
    },
  },
})

function RangeSlider({ value, onChange }) {
  return (
    <StyledSlider
      css={{
        width: '100%',
      }}
      type="range"
      min="0"
      max="100"
      value={value}
      onChange={onChange}
    />
  )
}

export default styled(RangeSlider, {})
