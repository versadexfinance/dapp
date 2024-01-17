'use client'

import React, { useEffect } from 'react'
import FormLiquidityPool from '../components/form-liquidity-pool'
import {
  lpPairOneState,
  lpPairTwoState,
} from '@/pods/atoms/liquidity-pool-form.atom'
import { tokenList } from '@/web3/types'
import { useRecoilState } from 'recoil'

function CreateLiquidityPoolPage() {
  const [pairOne, setPairOneState] = useRecoilState(lpPairOneState)
  const [pairTwo, setPairTwoState] = useRecoilState(lpPairTwoState)

  useEffect(() => {
    setPairOneState(tokenList[0])
    setPairTwoState(null)
  }, [])

  return <FormLiquidityPool isIncrease={false} />
}

export default CreateLiquidityPoolPage
