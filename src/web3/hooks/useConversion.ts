import { readContract } from 'wagmi/actions'
import { ethers, BigNumber, BigNumberish } from 'ethers'
import { use, useEffect, useState } from 'react'
import { routerAbi } from '@/web3/abis'
import { config } from '@/web3/config'
import { Tokens } from '../types' // Assuming this is the correct import for your Tokens type

interface Amount {
  in: string
  out: string
}

// Utility function using readContract with types
async function fetchConversionRate(
  amountIn: BigNumber,
  supply1: BigNumber,
  supply2: BigNumber,
  token: Tokens,
): Promise<string | null> {
  const args =
    token.ticker === 'WETH'
      ? [amountIn, supply1, supply2]
      : [amountIn, supply2, supply1]

  try {
    const data = await readContract({
      address: config.contract.routerV2,
      abi: routerAbi,
      functionName: 'getAmountOut',
      args: args,
    })
    return ethers.utils.formatEther(data as BigNumberish)
  } catch (error) {
    console.error('Error fetching conversion:', error)
    return null
  }
}

export function useConversion(
  amount: Amount,
  token: Tokens,
  supply1: string,
  supply2: string,
  outIsIn?: boolean,
): string | null {
  const [conversionRate, setConversionRate] = useState<string | null>(null)

  useEffect(() => {
    const amountIn = outIsIn
      ? ethers.utils.parseEther(amount.out || '0')
      : ethers.utils.parseEther(amount.in || '0')
    if (amountIn.isZero()) {
      setConversionRate(null)
      return
    }

    const supply1Parsed = ethers.utils.parseEther(supply1)
    const supply2Parsed = ethers.utils.parseEther(supply2)

    fetchConversionRate(amountIn, supply1Parsed, supply2Parsed, token)
      .then(rate => setConversionRate(rate))
      .catch(() => setConversionRate(null))
  }, [amount, token, supply1, supply2])

  return conversionRate
}

export function useConversionRatio(
  amount: Amount,
  token: Tokens,
  ratio: number,

  outIsIn?: boolean,
): string | null {
  const [conversionRate, setConversionRate] = useState<string | null>(null)

  useEffect(() => {
    const amountIn = outIsIn
      ? amount.out
        ? String(Number(amount.out) * ratio)
        : '0'
      : amount.in
        ? String(Number(amount.in) * ratio)
        : '0'

    if (amountIn === '0') {
      setConversionRate(null)
      return
    }

    setConversionRate(amountIn)
  }, [amount, token, ratio])

  return conversionRate
}
