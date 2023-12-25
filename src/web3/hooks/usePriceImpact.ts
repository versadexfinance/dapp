interface PriceImpactArgs {
  inputAmount: string
  tokenAPoolSize: string
  tokenBPoolSize: string
}

import { useEffect, useState } from 'react'
import { tokenInState } from '@/pods/atoms/swap-selected-tokens.atom'
import { useRecoilState } from 'recoil'

export function usePriceImpact({
  inputAmount,
  tokenAPoolSize,
  tokenBPoolSize,
}: PriceImpactArgs) {
  const [priceImpact, setPriceImpact] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [tokenIn, setTokenInState] = useRecoilState(tokenInState)

  useEffect(() => {
    const calculatePriceImpact = () => {
      try {
        setIsLoading(true)
        setIsError(false)

        if (!inputAmount || !tokenAPoolSize || !tokenBPoolSize) {
          setPriceImpact('')
          return
        }

        if (tokenIn?.ticker != 'WETH') {
          ;[tokenAPoolSize, tokenBPoolSize] = [tokenBPoolSize, tokenAPoolSize]
        }

        const inputAmountFloat = parseFloat(inputAmount)
        const tokenAPoolSizeFloat = parseFloat(tokenAPoolSize)
        const tokenBPoolSizeFloat = parseFloat(tokenBPoolSize)
        const constantProduct = tokenAPoolSizeFloat * tokenBPoolSizeFloat
        const newTokenAPoolSize = tokenAPoolSizeFloat + inputAmountFloat
        const newTokenBPoolSize = constantProduct / newTokenAPoolSize
        const pricePerToken = tokenAPoolSizeFloat / tokenBPoolSizeFloat

        const amouthReceived = tokenBPoolSizeFloat - newTokenBPoolSize

        const pricePaidPerTokenB = inputAmountFloat / amouthReceived

        let priceImpact = 1 - pricePerToken / pricePaidPerTokenB
        priceImpact = priceImpact * 100

        setPriceImpact(priceImpact.toString())
      } catch (error) {
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }
    calculatePriceImpact()
  }, [inputAmount, tokenAPoolSize, tokenBPoolSize])

  return priceImpact
}
