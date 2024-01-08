import { styled } from '@/styled'
import React, { useState } from 'react'
import { Stack } from '../box'

const Wrapper = styled('div', {
  borderRadius: '8px',

  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
})

const RadioOption = styled('label', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#111',
  borderRadius: '8px',
  padding: '12px 24px',
  color: '#BFBFBF',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '#1a1a1a',
  },

  variants: {
    checked: {
      true: {
        boxShadow: '0 0 0 1px #EBFE64',
      },
    },
  },
})

const RadioInput = styled('input', {
  visibility: 'hidden',
  marginRight: '12px',
  accentColor: '#2D2C2C',
})

const RadioLabel = styled('span', {
  fontSize: '20px',
  lineHeight: '32px',
  fontWeight: '500',
})

const RadioDescription = styled('span', {
  fontSize: '16px',
  lineHeight: '20px',
  color: '#797979',
})

const Checkmark = styled('span', {
  color: '#2D2C2C',
  backgroundColor: '#EBFE64',
  borderRadius: '50%',
  height: '24px',
  width: '24px',
  padding: '4px',
  display: 'flex',
  fontSize: '18px',
})

const RadioSelect = () => {
  const [selectedValue, setSelectedValue] = useState('0.05')

  const handleChange = value => {
    setSelectedValue(value)
  }

  const feeOptions = [
    {
      value: '0.01',
      label: '0.01% Fees',
      description: 'Best for very stable pairs.',
    },
    {
      value: '0.05',
      label: '0.05% Fees',
      description: 'Best for less volatile pairs.',
    },
    { value: '0.3', label: '0.3% Fees', description: 'Best for most pairs.' },
    { value: '1', label: '1% Fees', description: 'Best for volatile pairs.' },
  ]

  return (
    <Wrapper>
      {feeOptions.map(option => (
        <RadioOption
          key={option.value}
          checked={selectedValue === option.value}
        >
          <Stack>
            <RadioLabel>{option.label}</RadioLabel>
            <RadioDescription>{option.description}</RadioDescription>
          </Stack>
          <RadioInput
            type="radio"
            name="fees"
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => handleChange(option.value)}
          />
          {selectedValue === option.value ? (
            <Checkmark>
              <img src="/icons/tick-01.svg" width={16} height={16} />
            </Checkmark>
          ) : (
            <Checkmark
              css={{ background: 'none', border: '1px solid #424242' }}
            ></Checkmark>
          )}
        </RadioOption>
      ))}
    </Wrapper>
  )
}

export default RadioSelect
