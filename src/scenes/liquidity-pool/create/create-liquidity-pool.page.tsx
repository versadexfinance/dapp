'use client'

import React, { useEffect } from 'react'
import FormLiquidityPool from '../components/form-liquidity-pool'
import {
  lpPairOneState,
  lpPairTwoState,
} from '@/pods/atoms/liquidity-pool-form.atom'
import { tokenList } from '@/web3/types'
import { useRecoilState } from 'recoil'
import AnimatedPage from '@/components/animated-page'

function CreateLiquidityPoolPage() {
  const [pairOne, setPairOneState] = useRecoilState(lpPairOneState)
  const [pairTwo, setPairTwoState] = useRecoilState(lpPairTwoState)

  useEffect(() => {
    setPairOneState(tokenList[0])
    setPairTwoState(null)
  }, [])

  return (
    <AnimatedPage>
      <FormLiquidityPool isIncrease={false} />
    </AnimatedPage>
  )
}

export default CreateLiquidityPoolPage
