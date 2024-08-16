'use client'
import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { fetchUserLiquidityPools } from '@/web3/hooks/fetchUserLiquidityPools'
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
      setLiquidityPools(null)

      // Fetch liquidity pools
      fetchUserLiquidityPools(address)
        .then(myLps => {
          return Promise.all(myLps.map(lp => fetchTokenPairs(lp.pairAddress)))
        })
        .then(liquidityPoolsInfo => {
          setLiquidityPools(liquidityPoolsInfo)
        })
        .catch(error => {
          console.error('Error fetching liquidity pools: ', error)
        })
    } else {
      setLiquidityPools([])
    }
  }, [address])

  // useEffect(() => {
  //   if (address) {

  //   }
  // }, [])

  return <>{children}</>
}

export default MyLpsProvider
