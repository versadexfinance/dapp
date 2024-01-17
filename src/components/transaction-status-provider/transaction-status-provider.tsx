'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Flex, Stack } from '../box'
import CoinImagePair from '../coin-image-pair/coin-image-pair'
import Typography from '../typography'
import { roundToFirstNonZeroDecimal } from '@/pods/utils/number-format'
import { useRecoilState } from 'recoil'
import {
  amountState,
  tokenInState,
  tokenOutState,
  transactionHashState,
  transactionState,
} from '@/pods/atoms/swap-selected-tokens.atom'
import { useAccount, useWaitForTransaction } from 'wagmi'
import { ToastContainer, toast } from 'react-toastify'
import { useEffectOnce } from 'usehooks-ts'
import axios from 'axios'
import { Tokens, tokenList } from '@/web3/types'
import { lpsUpdatedState } from '@/pods/atoms/liquidity-pool-form.atom'

function TransactionStatusProvider({ children }) {
  const [tokenOne, setTokenOne] = useRecoilState(tokenInState)
  const [tokenTwo, setTokenTwo] = useRecoilState(tokenOutState)

  const [tokenOneLocal, setTokenOneLocal] = useState<Tokens>(null)
  const [tokenTwoLocal, setTokenTwoLocal] = useState<Tokens>(null)

  const [amount, setAmount] = useRecoilState(amountState)
  const [lpsUpdated, setLpsUpdated] = useRecoilState(lpsUpdatedState)

  const [txHash, setTransactionHash] = useRecoilState(transactionHashState)
  const [transaction, setTransaction] = useRecoilState(transactionState)

  const { address } = useAccount()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.API_URL}/transaction?address=${address}&status=pending`,
        )

        setTransaction({
          txHash: {
            hash: response.data[0].txHash,
            typeTx: response.data[0].type,
          },
          contract: null,
          isApproving: true,
          isLoading: true,
          amountIn:
            response.data[0].type == 'approve'
              ? response.data[0].data.approve.amount
              : response.data[0].data.in.amount,
          amountOut:
            response.data[0].type == 'approve'
              ? response.data[0].data.approve.amount
              : response.data[0].data.out.amount,
        })
        setTokenOneLocal(
          tokenList.find(
            t =>
              t.address ==
              (response.data[0].type == 'approve'
                ? response.data[0].data.approve.tokenAddress
                : response.data[0].data.in.tokenAddress),
          ),
        )
        setTokenTwoLocal(
          tokenList.find(
            t =>
              t.address ==
              (response.data[0].type == 'approve'
                ? response.data[0].data.approve.tokenAddress
                : response.data[0].data.out.tokenAddress),
          ),
        )
      } catch (error) {
        // Handle the error
      }
    }

    fetchData()
  }, [lpsUpdated])

  const {
    data,
    isError,
    isLoading: txLoading,
    status: txStatus,
  } = useWaitForTransaction({
    hash: transaction.txHash.hash as `0x${string}`,
  })

  useEffect(() => {}, [data, isError, transaction, txLoading, txStatus])

  const toastId = useRef<any>(null)

  useEffect(() => {
    if (
      txStatus !== 'success' &&
      txStatus !== 'loading' &&
      txStatus !== 'error'
    ) {
      return
    }

    if (txStatus === 'loading') {
      toastId.current = toast.loading(
        <Flex alignItems={'center'}>
          <CoinImagePair
            coin1_src={tokenOne.img}
            coin2_src={tokenTwo.img}
            size={32}
          />
          <Stack alignItems={'start'}>
            <Typography>
              {transaction.txHash.typeTx == 'approve'
                ? 'Approving...'
                : 'Swapping..'}
              .
            </Typography>
            <Typography
              css={{
                fontSize: '12px',
                color: '#BFBFBF',
              }}
            >
              <Flex alignItems={'center'} gap={1}>
                {roundToFirstNonZeroDecimal(
                  Number(amount.in) ? amount.in : transaction.amountIn,
                )}{' '}
                {tokenOne?.displayTicker ?? tokenOneLocal?.displayTicker}
                {transaction.txHash.typeTx != 'approve' && (
                  <>
                    <img src="/icons/arrow-right.svg" alt="" />
                    <span>
                      {roundToFirstNonZeroDecimal(
                        Number(amount.out) ? amount.out : transaction.amountOut,
                      )}
                    </span>
                    <span>
                      {tokenTwo?.displayTicker ?? tokenTwoLocal.displayTicker}
                    </span>
                  </>
                )}
              </Flex>
            </Typography>
          </Stack>
        </Flex>,
      )
    }

    if (txStatus === 'success') {
      toast.update(toastId.current, {
        render: (
          <Flex alignItems={'center'}>
            <CoinImagePair
              coin1_src={tokenOne.img}
              coin2_src={tokenTwo.img}
              size={32}
            />
            <Stack alignItems={'start'}>
              <Typography>
                {transaction.txHash.typeTx == 'approve'
                  ? 'Approval succesful!'
                  : 'Swap successful!'}
              </Typography>
              <Typography
                css={{
                  fontSize: '12px',
                  color: '#BFBFBF',
                }}
              >
                <Flex alignItems={'center'} gap={1}>
                  {roundToFirstNonZeroDecimal(
                    Number(amount.in) ? amount.in : transaction.amountIn,
                  )}
                  {tokenOne?.displayTicker ?? tokenOneLocal?.displayTicker}
                  {transaction.txHash.typeTx != 'approve' && (
                    <>
                      <img src="/icons/arrow-right.svg" alt="" />
                      <span>
                        {roundToFirstNonZeroDecimal(
                          Number(amount.out)
                            ? amount.out
                            : transaction.amountOut,
                        )}
                      </span>
                      <span>
                        {tokenTwo?.displayTicker ?? tokenTwoLocal.displayTicker}
                      </span>
                    </>
                  )}
                </Flex>
              </Typography>
            </Stack>
          </Flex>
        ),
        type: 'success',
        isLoading: false,
        autoClose: 5000,
      })
    } else if (txStatus === 'error') {
      toast.update(toastId.current, {
        render: 'Transaction failed',
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      })
    }
  }, [txStatus])

  return (
    <div>
      {children}
      <ToastContainer position="top-center" theme="dark" />
    </div>
  )
}

export default TransactionStatusProvider
