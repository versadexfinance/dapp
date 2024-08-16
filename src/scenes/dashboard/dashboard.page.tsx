'use client'

import React from 'react'
import DashboardHeader from './components/dashboard-header'

import MyPositions from './components/my-positions'
import { Flex, Stack } from '@/components/box'
import TopPoolsTable from './components/top-pools-table'
import { mockPoolTableRow } from './components/top-pools-table/interfaces'
import RecentTransactions from './components/recent-transactions'
import PositionCard from './components/position-card'
import NoPosition from '../liquidity-pool/components/no-position'
import { Coming_Soon } from 'next/font/google'
import CoomingSoon from '@/components/comingSoon'
import AnimatedPage from '@/components/animated-page'

function Dashboard() {
  return (
    <AnimatedPage>
      <DashboardHeader
        totalValue={19697.26}
        lpTokensvalue={19697.26}
        changePercent={0.2301}
        totalRewards={282.23}
      />
      <Flex
        gap={4}
        css={{
          marginTop: '40px',
          flexDirection: 'column',
          '@tablet': {
            flexDirection: 'row',
            flex: 5,
          },
          position: 'relative',
        }}
      >
        <Stack
          css={{
            zIndex: 1000,
            position: 'absolute',
            filter: 'none',
            top: '45%',
            left: '30%',
            visibility: 'hidden',
            ':hover': {
              visibility: 'visible',
            },
          }}
        >
          <CoomingSoon />
        </Stack>
        <Stack
          gap={4}
          css={{
            // marginTop: '40px',
            flexDirection: 'row-reverse',
            filter: 'blur(2px)',
            userSelect: 'none',
            '@tablet': {
              flexDirection: 'column',
              flex: 8,
            },
          }}
        >
          <MyPositions>
            <NoPosition />
          </MyPositions>

          <TopPoolsTable
            headers={['Pool', 'TVL', '24h volume', 'APR']}
            items={mockPoolTableRow}
          />
        </Stack>

        <Stack css={{ flex: 3 }}>
          <RecentTransactions />
        </Stack>
      </Flex>
    </AnimatedPage>
  )
}

export default Dashboard
