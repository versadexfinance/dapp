import { Flex, Stack } from '@/components/box'
import Typography from '@/components/typography'
import React from 'react'

function NoPosition() {
  return (
    <Flex
      css={{
        margin: '0 auto',
      }}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Stack
        alignItems={'center'}
        justifyContent={'center'}
        gap={2}
        css={{
          textAlign: 'center',
          maxWidth: '250px',
        }}
      >
        <img src="/icons/resources-add-big.svg" alt="" />
        <Typography>Your active Liquidity Position will appear here</Typography>
      </Stack>
    </Flex>
  )
}

export default NoPosition
