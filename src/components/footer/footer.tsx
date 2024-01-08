'use client'
import React from 'react'
import { Flex } from '../box'
import Typography from '../typography'
import { useBlockNumber } from 'wagmi'

function Footer() {
  const {
    data: blockNumberData,
    isError: blockNumberIsError,
    isLoading: blockNumberIsLoading,
  } = useBlockNumber()

  return (
    <Flex
      as={'footer'}
      fullWidth
      css={{
        maxWidth: 380,
        margin: 'auto',
        padding: 20,
        // py: 10,
      }}
      justifyContent={'spaceBetween'}
      alignItems={'center'}
    >
      <Typography
        css={{
          fontSize: '14px',
          color: '#BFBFBF',
        }}
      >
        VersaDex 2023
      </Typography>

      <Flex gap={1} alignItems={'center'}>
        <Typography
          css={{
            fontSize: '12px',
            color: '#009851',
          }}
        >
          {String(blockNumberIsLoading ? 'Loading...' : blockNumberData)}
        </Typography>
        <img src="/icons/Ellipse.svg" />
      </Flex>
    </Flex>
  )
}

export default Footer
