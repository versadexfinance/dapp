'use client'
import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { fetchLiquidityPools } from '@/web3/hooks/fetchLiquidityPools'
import { useRecoilState } from 'recoil'
import { myLpsState } from '@/pods/atoms/liquidity-pool-form.atom'
import { fetchTokenPairs } from '@/web3/hooks/useGetTokenPairs'

function MyLpsProvider({ children }) {
  const { address } = useAccount({
    onDisconnect: () => {
      setLiquidityPools([])
    },
  })
  const [myLps, setLiquidityPools] = useRecoilState(myLpsState)

  // fetchTokenPairs()

  useEffect(() => {
    if (address) {
      // Fetch liquidity pools
      fetchLiquidityPools(address)
        .then(myLps => {
          return Promise.all(myLps.map(lp => fetchTokenPairs(lp.pairAddress)))
        })
        .then(liquidityPoolsInfo => {
          setLiquidityPools(liquidityPoolsInfo)
        })
        .catch(error => {
          console.error('Error fetching liquidity pools: ', error)
        })
    }
  }, [address])

  // useEffect(() => {
  //   if (address) {

  //   }
  // }, [])

  return <>{children}</>
}

export default MyLpsProvider
