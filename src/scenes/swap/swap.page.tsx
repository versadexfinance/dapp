import React from 'react'
// import Layout from '../dashboard/components/layout'

import { Flex } from '@/components/box'
import SwapGraph from './components/swap-graph'
import SwapCard from './components/swap-card'

function Dashboard() {
  return (
    <Flex
      css={{
        mt: '$1',
        flexDirection: 'column',
        minHeight: '80vh',
        '@tabletLarge': {
          marginTop: '$4',
          flexDirection: 'row',
          flex: 5,
        },
      }}
      gap={8}
    >
      <SwapCard />
      <SwapGraph />
    </Flex>
  )
}

export default Dashboard
