'use client'
import React, { useEffect, useRef } from 'react'
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
import { useWaitForTransaction } from 'wagmi'
import { ToastContainer, toast } from 'react-toastify'
import { useEffectOnce } from 'usehooks-ts'
import axios from 'axios'

function TransactionStatusProvider({ children }) {
  const [tokenOne, setTokenOne] = useRecoilState(tokenInState)
  const [tokenTwo, setTokenTwo] = useRecoilState(tokenOutState)
  const [amount, setAmount] = useRecoilState(amountState)
  const [txHash, setTransactionHash] = useRecoilState(transactionHashState)
  const [transaction, setTransaction] = useRecoilState(transactionState)

  //   useEffectOnce(() => {
  //     axios.get(`/api/transaction/${txHash.hash}`).then((res) => {

  //     })
  //   })

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
                : 'Swaping..'}
              .
            </Typography>
            <Typography
              css={{
                fontSize: '12px',
                color: '#BFBFBF',
              }}
            >
              <Flex alignItems={'center'} gap={1}>
                {roundToFirstNonZeroDecimal(amount.in)}{' '}
                {tokenOne?.displayTicker}
                {transaction.txHash.typeTx != 'approve' && (
                  <>
                    <img src="/icons/arrow-right.svg" alt="" />
                    <span>{roundToFirstNonZeroDecimal(amount.out)}</span>
                    <span>{tokenTwo?.displayTicker}</span>
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
                  {roundToFirstNonZeroDecimal(amount.in)}
                  {tokenOne?.displayTicker}
                  {transaction.txHash.typeTx != 'approve' && (
                    <>
                      <img src="/icons/arrow-right.svg" alt="" />
                      <span>{roundToFirstNonZeroDecimal(amount.out)}</span>
                      <span>{tokenTwo?.displayTicker}</span>
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
