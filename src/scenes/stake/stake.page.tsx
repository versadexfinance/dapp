'use client'
import React from 'react'
// import Layout from '../dashboard/components/layout'

import { Flex } from '@/components/box'

import SwapCard from './components/stake-card'
import AnimatedPage from '@/components/animated-page'

function Dashboard() {
  return (
    <AnimatedPage>
      <Flex
        css={{
          mt: '$1',
          flexDirection: 'column',
          minHeight: '80vh',
          '@tabletLarge': {
            marginTop: '$4',
          },
          position: 'relative',
        }}
        gap={8}
      >
        <div
          style={{
            position: 'absolute',
            borderRadius: '658px',
            width: '658px',
            height: '208px',
            top: '99px',
            left: '50%',
            transform: 'translateX(-50%)',
            background:
              'var(--Gradient---90deg, linear-gradient(180deg, #EBFE64 0%, #8CEA69 100%))',
            filter: 'blur(100px)',
          }}
        ></div>
        <SwapCard />
      </Flex>
    </AnimatedPage>
  )
}

export default Dashboard
