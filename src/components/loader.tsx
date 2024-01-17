'use client'

import React from 'react'
import { PuffLoader } from 'react-spinners'
import Typography from './typography'
import { Stack } from './box'

function Loader() {
  return (
    <Stack
      alignItems={'center'}
      css={{
        padding: '200px 0px',
      }}
    >
      <PuffLoader size={66} color="#EBFE64" />
    </Stack>
  )
}

export default Loader
