import React from 'react'
import DashboardHeader from './components/dashboard-header'

import MyPositions from './components/my-positions'
import { Flex, Stack } from '@/components/box'
import TopPoolsTable from './components/top-pools-table'
import { mockPoolTableRow } from './components/top-pools-table/interfaces'
import RecentTransactions from './components/recent-transactions'
import PositionCard from './components/position-card'

function Dashboard() {
  return (
    <>
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
        }}
      >
        <Stack
          gap={4}
          css={{
            // marginTop: '40px',
            flexDirection: 'row-reverse',
            filter: 'blur(2px)',
            '@tablet': {
              flexDirection: 'column',
              flex: 8,
            },
          }}
        >
          <MyPositions>
            <div
              style={{
                flex: 1,
              }}
            >
              {/* <PositionCard /> */}
            </div>
            <div
              style={{
                flex: 1,
              }}
            >
              {/* <PositionCard /> */}
            </div>
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
    </>
  )
}

export default Dashboard
