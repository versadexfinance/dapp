import { useCallback, useState } from 'react'
import { erc20ABI, useAccount, useBalance } from 'wagmi'
import { writeContract } from 'wagmi/actions'
import { BigNumber, ethers } from 'ethers'
import axios from 'axios'
import { config } from '@/web3/config'
import { Pool_V2, Tokens, Transaction } from '@/web3/types'
import { routerAbi } from '@/web3/abis'
import { useRecoilState } from 'recoil'
import {
  maxSlippageState,
  transactionDeadlineState,
} from '@/pods/atoms/swap-selected-tokens.atom'
import { useTokenAllowance } from './useTokenAllowance'
import { PairSupply } from './usePair'
import { lpsUpdatedState } from '@/pods/atoms/liquidity-pool-form.atom'

const provider = new ethers.providers.JsonRpcProvider(
  'https://eth-sepolia.g.alchemy.com/v2/FPWZWj868XfD49MGxWZTlBBukppP04pz',
)

const logTransaction = async (transaction: Transaction, pool?: Pool_V2) => {
  try {
    axios.post(`${process.env.API_URL}/transaction`, { transaction, pool })
  } catch (error) {
    console.error('Error logging transaction:', error)
  }
}

export function useRemoveLiquidity({
  token1,
  token2,
  liquidityWei,
  pairAddress,
  reserves,
  poolShare,
  range,
}: {
  token1: Tokens
  token2: Tokens
  liquidityWei: string
  poolShare: number
  range: number
  reserves: PairSupply
  pairAddress: string
}) {
  //if any param is missing

  const maxSlippage = '1'

  const [transactionDeadline, setTransactionDeadline] = useRecoilState(
    transactionDeadlineState,
  )

  const [lpsUpdated, setLpsUpdated] = useRecoilState(lpsUpdatedState)

  // const [transaction, setTransaction] = useRecoilState(transactionState)
  const [isApproving, setIsApproving] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [txHash, setTxHash] = useState<{ hash: string; typeTx: string }>({
    hash: '',
    typeTx: '',
  })

  const { address } = useAccount()

  const allowanceToken1 = useTokenAllowance(
    address as `0x${string}`,
    token1?.address as `0x${string}`,
  )
  const allowanceToken2 = useTokenAllowance(
    address as `0x${string}`,
    token2?.address as `0x${string}`,
  )
  const { data: token1Balance } = useBalance({
    address: address as `0x${string}`,
    chainId: 5,
  })

  const removeLiquidity = useCallback(async () => {
    // if any param is missing return

    if (!token1 || !token2 || !pairAddress || !reserves) {
      return
    }
    let ercToken = ''
    let amountEthReceive = null
    let amountErcReceive = null

    if (token1 && reserves && token1.address === config.contract.weth) {
      ercToken = token2.address

      amountEthReceive = ethers.utils.parseUnits(
        String(
          (reserves?.tokenOne * poolShare * (range / 100)).toFixed(
            token1?.decimals,
          ) ?? 0,
        ),
        token1.decimals,
      )
      amountErcReceive = ethers.utils.parseUnits(
        String(
          (reserves?.tokenTwo * poolShare * (range / 100)).toFixed(
            token2.decimals,
          ) ?? 0,
        ),
        token2.decimals,
      )
    } else if (token2 && reserves && token2.address === config.contract.weth) {
      ercToken = token1.address
      amountEthReceive = ethers.utils.parseUnits(
        String(
          (reserves?.tokenTwo * poolShare * (range / 100)).toFixed(
            token2.decimals,
          ),
        ),
        token2.decimals,
      )
      amountErcReceive = ethers.utils.parseUnits(
        String(
          (reserves?.tokenOne * poolShare * (range / 100)).toFixed(
            token1.decimals,
          ),
        ),
        token1.decimals,
      )
    } else {
      return
    }

    const ercSlippage = amountErcReceive
      .mul(100 - Number(maxSlippage))
      .div(100)
      .toString()

    const ethSlippage = amountEthReceive
      .mul(100 - Number(maxSlippage))
      .div(100)
      .toString()

    const contractPairAddress = new ethers.Contract(
      pairAddress as `0x${string}`,
      erc20ABI,
      provider,
    )
    try {
      if (!address) {
        return
      }

      setIsLoading(true)

      if (token1?.ticker === 'WETH' && Boolean(token2)) {
        const resultAllowance = await contractPairAddress.allowance(
          address,
          config.contract.routerV2,
        )

        if (resultAllowance.lt(liquidityWei)) {
          setIsApproving(true)

          const { hash } = await writeContract({
            address: pairAddress as `0x${string}`,
            abi: erc20ABI,
            functionName: 'approve',
            args: [config.contract.routerV2, liquidityWei.toString()],
          })

          const transactionDetails: Transaction = {
            data: {
              approve: {
                amount: ethers.utils.formatEther(liquidityWei.toString()),
                tokenAddress: pairAddress,
              },
            },
            type: 'approve',
            fromAddress: address,
            txHash: hash,
            status: 'pending',
            initiatedAt: new Date(),
          }

          await logTransaction(transactionDetails)

          setTxHash({ hash: hash, typeTx: 'approve' })
          if (allowanceToken1.lte(liquidityWei)) {
            setIsApproving(false)
          }
        }

        //Slippage 0 - 100

        if (resultAllowance.gte(liquidityWei)) {
          const { hash } = await writeContract({
            address: config.contract.routerV2,
            abi: routerAbi,
            functionName: 'removeLiquidityETH',
            args: [
              ercToken,
              liquidityWei,
              ercSlippage,
              ethSlippage,
              address,
              Date.now() + Number(transactionDeadline) * 60 * 10,
            ],
          })

          const transactionDetails: Transaction = {
            data: {
              in: {
                tokenAddress: token1.address,
                amount: ethers.utils.formatEther(amountEthReceive.toString()),
              },
              out: {
                tokenAddress: token2.address,
                amount: ethers.utils.formatEther(amountErcReceive.toString()),
              },
            },
            type: 'remove_liquidity',
            fromAddress: address,
            txHash: hash,
            status: 'pending',
            initiatedAt: new Date(),
          }

          setLpsUpdated(!lpsUpdated)

          const pool: Pool_V2 = {
            pairAddress: pairAddress,
            token_0: token1.address,
            token_1: token2.address,
            fromAddress: address,
            txHash: hash,
            stakers: [],
            fee: 0.3,
            version: 'v2',
            initiatedAt: new Date(),
          }

          await logTransaction(transactionDetails, pool)

          setTxHash({ hash: hash, typeTx: 'add_liquidity' })
        }
      } else {
        //Allowance token in
        // TOKEN TO TOKEN
      }

      setIsLoading(false)

      return isApproving
    } catch (error: any) {
      console.error(error)

      setIsApproving(false)
      setIsLoading(false)
    }
  }, [
    address,
    token2,

    // token1?.decimals,
    // token1?.ticker,
    // token1?.address,
    reserves,
    isApproving,
    range,
    // allowanceToken1,

    // transactionDeadline,
    pairAddress,
  ])

  return {
    removeLiquidity,
    isApproving,
    isLoading,
    allowanceToken1,
    allowanceToken2,
    txHash,
  }
}
