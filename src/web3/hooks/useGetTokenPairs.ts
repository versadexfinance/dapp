import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { factoryAbi, pairAbi } from '../abis'
import { config } from '../config'
import { NULL_ADDRESS } from '../types'

const provider = new ethers.providers.JsonRpcProvider(
  'https://eth-sepolia.g.alchemy.com/v2/FPWZWj868XfD49MGxWZTlBBukppP04pz',
)

export function useGetTokenPairs(pairAddress: string) {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [pairs, setPairs] = useState({
    tokenOne: NULL_ADDRESS,
    tokenTwo: NULL_ADDRESS,
  })

  let pairContract = null

  try {
    pairContract = new ethers.Contract(pairAddress, pairAbi, provider)
  } catch (error) {
    console.error("Couldn't get pair contract", error)
  }

  useEffect(() => {
    const getPairs = async () => {
      try {
        if (!pairContract) {
          setIsLoading(false)
          setIsError(false)
          return
        }
        const token0Address = await pairContract.token0()
        //Get token two
        const token1Address = await pairContract.token1()

        let tokenOne, tokenTwo
        if (token0Address.toLowerCase() === config.contract.weth) {
          tokenOne = token0Address
          tokenTwo = token1Address
        } else if (token1Address.toLowerCase() === config.contract.weth) {
          tokenOne = token1Address
          tokenTwo = token0Address
        } else {
          tokenOne = token0Address
          tokenTwo = token1Address
        }

        // connect to factory contract

        const factoryContract = new ethers.Contract(
          config.contract.factoryV2,
          factoryAbi,
          provider,
        )

        // get pair address
        const pair = await factoryContract.getPair(tokenOne, tokenTwo)

        // if pair address is 0, then there is no pair
        if (pair === pairAddress) {
          setIsLoading(false)
          setIsError(false)
          setPairs({
            tokenOne,
            tokenTwo,
          })
          return
        } else {
          console.error("Couldn't get pair contract")
          setIsLoading(false)
          setIsError(true)
          return
        }
      } catch (error) {
        console.error("Couldn't get pair contract", error)
        setIsLoading(false)
        setIsError(true)
      }
    }

    getPairs()
  }, [])

  return { isLoading, isError, pairs }
}

export async function fetchTokenPairs(pairAddress: string) {
  try {
    const pairContract = new ethers.Contract(pairAddress, pairAbi, provider)
    if (!pairContract) {
      return
    }

    //Get token one
    const token0Address = await pairContract.token0()
    //Get token two
    const token1Address = await pairContract.token1()

    let tokenOne, tokenTwo
    if (token0Address.toLowerCase() === config.contract.weth.toLowerCase()) {
      tokenOne = token0Address
      tokenTwo = token1Address
    } else if (
      token1Address.toLowerCase() === config.contract.weth.toLowerCase()
    ) {
      tokenOne = token1Address
      tokenTwo = token0Address
    } else {
      tokenOne = token0Address
      tokenTwo = token1Address
    }

    const factoryContract = new ethers.Contract(
      config.contract.factoryV2,
      factoryAbi,
      provider,
    )

    // get pair address
    const pair = await factoryContract.getPair(tokenOne, tokenTwo)

    // if pair address is 0, then there is no pair
    if (pair === pairAddress) {
      return {
        tokenOne,
        tokenTwo,
        pairAddress,
      }
    } else {
      return
    }
  } catch (error) {}
}
