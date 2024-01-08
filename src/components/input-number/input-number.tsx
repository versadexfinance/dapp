import React, { useState } from 'react'
import { Stack } from '../box'
import CardContainer from '../card-container/card-container'
import Input from '../input'

const InputNumber = () => {
  const [value, setValue] = useState('0')

  const handleDecrement = () => {
    setValue(prevValue => {
      const newValue = parseFloat(prevValue) - 0.01
      return newValue.toFixed(2) // Keeps two decimal places
    })
  }

  const handleIncrement = () => {
    setValue(prevValue => {
      const newValue = parseFloat(prevValue) + 0.01
      return newValue.toFixed(2) // Keeps two decimal places
    })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value

    // Only update if the new value is a number (including decimal point)
    if (/^\d*\.?\d*$/.test(newValue)) {
      setValue(newValue)
    }
  }

  // Ensure that the value is properly formatted as a decimal when the input is blurred
  const handleBlur = () => {
    if (value) {
      setValue(parseFloat(value).toFixed(2))
    }
  }

  return (
    <Stack>
      <Input
        pattern="[0-9]*"
        inputMode="decimal"
        type="text" // Change to text to allow for decimal points
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        cssContainer={{
          padding: '8px',
          borderRadius: '8px',
          background: 'transparent',
        }}
        css={{
          textAlign: 'center',
          background: 'transparent',
          fontSize: '20px',
          lineHeight: '24px',
          fontWeight: '500',
        }}
        leftElement={
          <CardContainer
            as="button"
            type="button" // Specify button type to prevent form submission
            css={{ padding: '8px', background: '#202020', cursor: 'pointer' }}
            onClick={handleDecrement}
          >
            <img
              src="/icons/minus.svg"
              alt="Decrement"
              style={{ padding: '0' }}
            />
          </CardContainer>
        }
        rightElement={
          <CardContainer
            as="button"
            type="button" // Specify button type to prevent form submission
            css={{ padding: '8px', background: '#202020', cursor: 'pointer' }}
            onClick={handleIncrement}
          >
            <img
              src="/icons/plus.svg"
              alt="Increment"
              style={{ padding: '0' }}
            />
          </CardContainer>
        }
      />
    </Stack>
  )
}

export default InputNumber
