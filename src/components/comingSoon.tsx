import React from 'react'
import { Flex } from './box'
import Typography from './typography'

function CoomingSoon() {
  return (
    <Flex
      justifyContent={'center'}
      css={{
        fontSize: '25px',
      }}
    >
      <Typography
        css={{
          fontWeight: 800,
        }}
      >
        coming soon
      </Typography>
      <Typography
        css={{
          fontWeight: 800,
          color: '$primary',
        }}
      >
        .
      </Typography>
    </Flex>
  )
}

export default CoomingSoon
