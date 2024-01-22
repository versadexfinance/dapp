'use client'

import React from 'react'
import 'chartjs-adapter-moment'
import { Chart, registerables } from 'chart.js/auto'
import 'chartjs-chart-financial'
import { Crypto, tokenList } from '@/web3/types'
import MyPositions from '../dashboard/components/my-positions'
import { styled } from '@/styled'
import Link from 'next/link'
import { Stack } from '@/components/box'
import PositionCard from '../dashboard/components/position-card/position-card'
import { useRecoilState } from 'recoil'
import { myLpsState } from '@/pods/atoms/liquidity-pool-form.atom'
import NoPosition from './components/no-position'

export type AppProps = {
  crypto: Crypto
  updateOwned: (crypto: Crypto, amount: number) => void
}

const Container = styled(Stack, {
  maxWidth: '1180px',
  margin: '0 auto',
  gap: '2rem',
  marginTop: '2rem',
  minHeight: '79vh',
  padding: '0 1rem',
  '@tablet': {
    marginTop: '4rem',
  },
})

function LiquidityPoolPage() {
  const [liquidityPools, setLiquidityPools] = useRecoilState(myLpsState)
  return (
    <Container>
      <MyPositions button="add-liquidity">
        {liquidityPools.length ? (
          liquidityPools.map((pool, index) => (
            <PositionCard
              key={index}
              pairAddress={pool.pairAddress}
              pairOne={tokenList.find(t => t.address == pool.tokenOne)}
              pairTwo={tokenList.find(t => t.address == pool.tokenTwo)}
            />
          ))
        ) : (
          <NoPosition />
        )}
      </MyPositions>

      <Link
        style={{
          color: '#EBFE64',
          marginLeft: '1em',
          fontSize: '14px',
          display: 'flex',
          gap: '0.2em',
        }}
        href={'/liquidity-pool'}
      >
        Explore Top pools by community
        <img src="/icons/arrow-up-right-01-round.svg" alt="" />
      </Link>
    </Container>
  )
}

export default LiquidityPoolPage
