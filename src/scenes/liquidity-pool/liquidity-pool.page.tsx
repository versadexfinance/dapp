'use client'

import React, { useRef, useEffect, useState } from 'react'
import 'chartjs-adapter-moment'
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js/auto'
import 'chartjs-chart-financial'
import { Crypto } from '@/web3/types'
import axios from 'axios'
import MyPositions from '../dashboard/components/my-positions'
import { styled } from '@/styled'
import Link from 'next/link'
import { Stack } from '@/components/box'

Chart.register(...registerables)

export type AppProps = {
  crypto: Crypto
  updateOwned: (crypto: Crypto, amount: number) => void
}

const Container = styled(Stack, {
  maxWidth: '1180px',
  margin: '0 auto',
  gap: '2rem',
  marginTop: '2rem',

  '@tablet': {
    marginTop: '4rem',
  },
})

function LiquidityPoolPage() {
  return (
    <Container>
      <MyPositions button="add-liquidity" />
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
