'use client'

import React, { useEffect } from 'react'
import 'chartjs-adapter-moment'

import { Chart, registerables } from 'chart.js/auto'
import 'chartjs-chart-financial'

import CreateLiquidityPoolPage from '../create/create-liquidity-pool.page'
import { useRecoilState } from 'recoil'
import {
  lpAmountState,
  lpPairOneState,
  lpPairTwoState,
  myLpsState,
} from '@/pods/atoms/liquidity-pool-form.atom'
import { tokenList } from '@/web3/types'
import FormLiquidityPool from '../components/form-liquidity-pool'
import Loader from '@/components/loader'
import AnimatedPage from '@/components/animated-page'

Chart.register(...registerables)

function IncreaseLiquidityPoolPage({ params }) {
  const [pairOne, setPairOne] = useRecoilState(lpPairOneState)
  const [pairTwo, setPairTwo] = useRecoilState(lpPairTwoState)

  const [, setLpAmount] = useRecoilState(lpAmountState)

  const [myLps, setLiquidityPools] = useRecoilState(myLpsState)

  useEffect(() => {
    if (!myLps) return
    let foundLp = myLps.find(
      lp => lp.pairAddress.toLowerCase() == params.pairAddress.toLowerCase(),
    )

    setPairOne(
      tokenList.find(
        t => t.address?.toLowerCase() == foundLp?.tokenOne.toLowerCase(),
      ),
    )
    setPairTwo(
      tokenList.find(
        t => t.address?.toLowerCase() == foundLp?.tokenTwo.toLowerCase(),
      ),
    )

    setLpAmount({
      in: '',
      out: '',
    })
    // setCurrentLp(foundLp)
  }, [myLps, params.pairAddress])

  if (!pairOne || !pairTwo) return <Loader />

  return (
    <AnimatedPage>
      <FormLiquidityPool isIncrease={true} />
    </AnimatedPage>
  )
}

export default IncreaseLiquidityPoolPage
