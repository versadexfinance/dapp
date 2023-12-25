import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { factoryAbi, pairAbi } from '@/web3/abis'
import { config } from '@/web3/config'

import Big from 'big.js'
import { useContractRead } from 'wagmi'

type PairSupply = {
  tokenOne: number
  tokenTwo: number
  ratio: number
}

export function usePair(address1: string, address2: string) {
  const [pair, setPair] = useState<string | null>(null)

  const { data, isError, isLoading } = useContractRead({
    address: config.contract.factoryV2,
    abi: factoryAbi,
    functionName: 'getPair',
    args: [address1, address2],
    watch: true,
  })

  useEffect(() => {
    if (data && !isError && !isLoading) {
      setPair(data.toString())
    }
  }, [data, isError, isLoading])

  return pair
}

export function usePrices(pairAddress: string | null) {
  const [prices, setPrices] = useState<PairSupply | null>(null)

  const { data: totalReserves } = useContractRead({
    address: pairAddress as `0x{${string}}`,
    abi: pairAbi,
    functionName: 'getReserves',
    watch: pairAddress != null,
  })

  useEffect(() => {
    if (totalReserves && pairAddress) {
      const token1 = Number(ethers.utils.formatUnits(totalReserves[0], 'ether')) // Adjust based on the token's decimals
      const token2 = Number(ethers.utils.formatUnits(totalReserves[1], 'ether')) // Adjust based on the token's decimals

      setPrices({
        tokenOne: token1,
        tokenTwo: token2,
        ratio: Big(token1).div(token2).toNumber(),
      })
    }
  }, [totalReserves, pairAddress])

  return prices
}
