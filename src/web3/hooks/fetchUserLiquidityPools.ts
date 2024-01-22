import { ethers } from 'ethers'
import { factoryAbi } from '../abis'
import { config } from '../config'
import { erc20ABI } from 'wagmi'

const provider = new ethers.providers.JsonRpcProvider(
  'https://eth-goerli.g.alchemy.com/v2/FPLZvzEhuo4jMdGjuTqWrtAsaFUpID3t',
)

export const fetchUserLiquidityPools = async userAddress => {
  const factoryContract = new ethers.Contract(
    config.contract.factoryV2,
    factoryAbi,
    provider,
  )

  try {
    const pairCount = await factoryContract.allPairsLength()
    const pairAddresses = await Promise.all(
      Array.from({ length: pairCount }, (_, i) => factoryContract.allPairs(i)),
    )

    const userPools = await Promise.all(
      pairAddresses.map(async pairAddress => {
        const pairContract = new ethers.Contract(
          pairAddress,
          erc20ABI,
          provider,
        )
        const userLiquidity = await pairContract.balanceOf(userAddress)

        if (
          !userLiquidity.isZero() &&
          pairAddress == '0x681c4F436951266BFcFC3b95923292dcCeAD3bca'
        ) {
          return {
            pairAddress,
            userLiquidity: userLiquidity.toString(),
            userAddress,
          }
        }
        return null
      }),
    )

    return userPools.filter(pool => pool !== null)
  } catch (error) {
    console.error('Error fetching liquidity pools: ', error)
    return []
  }
}
