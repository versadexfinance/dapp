import React, { useState } from 'react'
import { styled } from '@stitches/react'
import { ToggleProps } from './interfaces'

const SwitchContainer = styled('div', {
  backgroundColor: '#000',
  borderRadius: '8px',
  color: '#595959',
  padding: '4px',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '16px',
  fontWeight: '500',
  cursor: 'pointer',
  border: '1px solid #2D2C2C',
})

const Option = styled('div', {
  padding: '2px 4px',
  borderRadius: '8px',
  userSelect: 'none',
  transition: 'background-color 300ms',
  variants: {
    active: {
      true: {
        backgroundColor: '#131313',
        color: '#BFBFBF',
      },
      false: {
        backgroundColor: 'transparent',
      },
    },
  },
})

const ToggleSwitch: React.FC<ToggleProps> = ({ option1, option2 }) => {
  const [active, setActive] = useState(option1)

  const toggleActive = () => {
    setActive(active === option1 ? option2 : option1)
  }

  return (
    <SwitchContainer
      role="button"
      tabIndex={0}
      onClick={toggleActive}
      onKeyDown={e => e.key === 'Enter' && toggleActive()}
    >
      <Option active={active === option1}>{option1}</Option>
      <Option active={active === option2}>{option2}</Option>
    </SwitchContainer>
  )
}

export default ToggleSwitch
