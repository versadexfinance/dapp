import { useCallback, useState } from 'react'
import { erc20ABI, useAccount, useBalance } from 'wagmi'
import { waitForTransaction, writeContract } from 'wagmi/actions'
import { ethers } from 'ethers'
import axios from 'axios'
import { config } from '@/web3/config'
import { Pool_V2, Tokens, Transaction } from '@/web3/types'
import { routerAbi } from '@/web3/abis'
import { useRecoilState } from 'recoil'
import {
  amountState,
  maxSlippageState,
  transactionDeadlineState,
  transactionState,
} from '@/pods/atoms/swap-selected-tokens.atom'
import { useAllowance } from './useAllowance'
import { lpAmountState } from '@/pods/atoms/liquidity-pool-form.atom'
import { useTokenBalance } from '.'
import { useTokenAllowance } from './useTokenAllowance'

const provider = new ethers.providers.JsonRpcProvider(
  'https://eth-goerli.g.alchemy.com/v2/FPWZWj868XfD49MGxWZTlBBukppP04pz',
)

const logTransaction = async (transaction: Transaction, pool?: Pool_V2) => {
  try {
    axios.post(`${process.env.API_URL}/transaction`, { transaction, pool })
  } catch (error) {
    console.error('Error logging transaction:', error)
  }
}

export function useCreateLiquidity({
  tokenIn,
  tokenOut,
  //tokenOutBalance,
  pairAddress,
  //tokenInBalance,
}: {
  tokenIn: Tokens
  tokenOut: Tokens
  // tokenOutBalance: string
  // tokenInBalance: string
  pairAddress: string
}) {
  // const [maxSlippage, setMaxSlippage] = useRecoilState(maxSlippageState)

  const maxSlippage = '10'

  const [transactionDeadline, setTransactionDeadline] = useRecoilState(
    transactionDeadlineState,
  )

  // const [transaction, setTransaction] = useRecoilState(transactionState)

  const [amount, setAmount] = useRecoilState(lpAmountState)
  const [isApproving, setIsApproving] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [txHash, setTxHash] = useState<{ hash: string; typeTx: string }>({
    hash: '',
    typeTx: '',
  })

  const { address } = useAccount()
  const allowanceIn = useTokenAllowance(
    address as `0x${string}`,
    tokenIn?.address as `0x${string}`,
  )
  const allowanceOut = useTokenAllowance(
    address as `0x${string}`,
    tokenOut?.address as `0x${string}`,
  )
  const { data: tokenInBalance } = useBalance({
    address: address as `0x${string}`,
    chainId: 5,
  })

  // parseFloat(
  //   maxSlippage.length
  //     ? (Number(amount.out) * (100 - parseFloat(maxSlippage))) / 100 + ''
  //     : amount.out,
  // ).toLocaleString('fullwide', { useGrouping: false })

  // const inSlippage =
  // parseFloat(
  //   maxSlippage.length
  //     ? (Number(amount.in) * (100 - parseFloat(maxSlippage))) / 100 + ''
  //     : amount.in,
  // ).toLocaleString('fullwide', { useGrouping: false })

  // [TODO] Check if tokenIn is WETH or viceversa

  // const contractTokenIn = new ethers.Contract(
  //   tokenIn ? tokenIn?.address : '',
  //   erc20ABI,
  //   provider,
  // )

  const contractTokenOut = new ethers.Contract(
    tokenOut ? tokenOut?.address : '',
    erc20ABI,
    provider,
  )

  const createLiquidity = useCallback(async () => {
    try {
      const outSlippage = ethers.utils
        .parseUnits(amount.out.length ? amount.out : '0', tokenOut.decimals)
        .mul(100 - Number(maxSlippage))
        .div(100)
        .toString()

      const inSlippage = ethers.utils
        .parseUnits(amount.in.length ? amount.in : '0', tokenIn.decimals)
        .mul(100 - Number(maxSlippage))
        .div(100)
        .toString()

      if (!address) {
        return
      }

      if (!tokenOut) {
        return
      }

      const inWei = ethers.utils.parseUnits(
        amount.in.length ? amount.in : '0',
        tokenIn?.decimals,
      )
      const outWei = ethers.utils.parseUnits(
        amount.out.length ? amount.out : '0',
        tokenOut?.decimals,
      )

      // const tokenInBalance = (await contractTokenIn.balanceOf(address)) ?? '0'
      const tokenOutBalance = (await contractTokenOut.balanceOf(address)) ?? '0'

      const balanceInWei = ethers.utils.parseUnits(
        tokenInBalance.value.toString() ?? '0',
        tokenIn?.decimals,
      )
      const balanceOutWei = ethers.utils.parseUnits(
        tokenOutBalance.toString() ?? '0',
        tokenOut.decimals,
      )
      //let balanceTokenIn = ethers.BigNumber.from(0)

      //

      //balanceTokenIn = ethers.BigNumber.from(balance ?? 0) // Wei
      //balanceTokenI = ethers.BigNumber.from(balance ?? 0) // Wei

      if (balanceInWei.lt(inWei)) {
        return
      }

      if (balanceOutWei.lt(outWei)) {
        return
      }

      setIsLoading(true)

      if (tokenIn?.ticker === 'WETH' && Boolean(tokenOut)) {
        const resultAllowance = await contractTokenOut.allowance(
          address,
          config.contract.routerV2,
        )

        if (resultAllowance.lt(outWei)) {
          setIsApproving(true)

          const { hash } = await writeContract({
            address: tokenOut?.address as `0x${string}`,
            abi: erc20ABI,
            functionName: 'approve',
            args: [config.contract.routerV2, outWei.toString()],
          })

          const transactionDetails: Transaction = {
            data: {
              approve: {
                amount: ethers.utils.formatEther(outWei.toString()),
                tokenAddress: tokenOut.address,
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
          if (allowanceIn.lte(outWei)) {
            setIsApproving(false)
          }
        }

        //Slippage 0 - 100

        if (resultAllowance.gte(inWei)) {
          const result = await writeContract({
            address: config.contract.routerV2,
            abi: routerAbi,
            functionName: 'addLiquidityETH',
            args: [
              tokenOut?.address,
              outWei.toString(),
              outSlippage,
              inSlippage,
              address,
              Date.now() + Number(transactionDeadline) * 60 * 10,
            ],
            value: inWei.toString(),
          })

          const hash = result.hash

          const transactionDetails: Transaction = {
            data: {
              in: {
                tokenAddress: tokenIn.address,
                amount: amount.in,
              },
              out: {
                tokenAddress: tokenOut.address,
                amount: amount.out,
              },
            },
            type: 'add_liquidity',
            fromAddress: address,
            txHash: hash,
            status: 'pending',
            initiatedAt: new Date(),
          }

          const pool: Pool_V2 = {
            pairAddress: pairAddress,
            token_0: tokenIn?.address,
            token_1: tokenOut?.address,
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
    tokenOut,
    amount.in,
    amount.out,
    tokenIn.decimals,
    tokenIn?.ticker,
    tokenIn?.address,
    contractTokenOut,
    isApproving,
    allowanceIn,
    transactionDeadline,
    pairAddress,
  ])

  return {
    createLiquidity,
    isApproving,
    contractTokenOut,
    isLoading,
    allowanceIn,
    allowanceOut,
    txHash,
  }
}
