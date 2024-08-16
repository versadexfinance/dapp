import { styled } from '@/styled'
import React, { useState } from 'react'
import { Flex, Stack } from '../box'
import Typography from '../typography'
import { motion } from 'framer-motion'

const Wrapper = styled('div', {
  borderRadius: '8px',

  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
})

const RadioOption = styled(motion.label, {
  // Convert to motion component
  display: 'flex',
  alignItems: 'center',
  padding: '4px 8px',
  borderRadius: '6px',
  flex: 1,
  color: '#BFBFBF',
  cursor: 'pointer',
  fontSize: '12px',
  border: '0.5px solid #262626',
  // Remove the &:hover style since we'll use Framer Motion for this
  variants: {
    checked: {
      true: {
        background: '#EBFE64',
        color: 'black !important',
      },
    },
  },
})

const RadioInput = styled('input', {
  display: 'none',
  visibility: 'hidden',
  marginRight: '12px',
  // accentColor: '#2D2C2C',
})

const BadgeRadios = ({ options }) => {
  const [selectedValue, setSelectedValue] = useState('0.05')

  const handleChange = value => {
    setSelectedValue(value)
  }

  return (
    <>
      {options.map(option => (
        <RadioOption
          key={option.value}
          whileHover={{ scale: 1.1 }} // Add hover animation here
          transition={{ type: 'spring', stiffness: 400 }} // Optional: Customize the transition
          checked={selectedValue === option.value}
        >
          <Typography
            css={{
              color: selectedValue === option.value ? 'black' : '#BFBFBF',
              fontWeight: 600,
            }}
          >
            {option.label}
          </Typography>
          <RadioInput
            type="radio"
            name="fees"
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => handleChange(option.value)}
          />
        </RadioOption>
      ))}
    </>
  )
}

export default BadgeRadios
