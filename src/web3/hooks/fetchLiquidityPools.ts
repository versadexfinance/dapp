import { ethers } from 'ethers'
import { factoryAbi } from '../abis'
import { config } from '../config'
import { erc20ABI } from 'wagmi'

const provider = new ethers.providers.JsonRpcProvider(
  'https://eth-goerli.g.alchemy.com/v2/FPLZvzEhuo4jMdGjuTqWrtAsaFUpID3t',
)

export const fetchLiquidityPools = async userAddress => {
  const factoryContract = new ethers.Contract(
    config.contract.factoryV2,
    factoryAbi,
    provider,
  )

  let userPools = []

  try {
    const pairCount = await factoryContract.allPairsLength()

    for (let i = 0; i < pairCount; i++) {
      const pairAddress = await factoryContract.allPairs(i)
      const pairContract = new ethers.Contract(pairAddress, erc20ABI, provider)

      const userLiquidity = await pairContract.balanceOf(userAddress)

      if (
        !userLiquidity.isZero() &&
        pairAddress == '0x681c4F436951266BFcFC3b95923292dcCeAD3bca'
      ) {
        userPools.push({
          pairAddress,
          userLiquidity: userLiquidity.toString(),
          userAddress,
        })
      }
    }
  } catch (error) {
    console.error('Error fetching liquidity pools: ', error)
  }

  return userPools
}
