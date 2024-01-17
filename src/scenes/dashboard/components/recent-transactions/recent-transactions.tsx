'use client'

import React, { cloneElement, useEffect, useState } from 'react'
import axios from 'axios'
import Typography from '@/components/typography'

import { Flex, Stack } from '../../../../components/box'

import { Container } from '../position-card/styles'
import CoinImagePair from '@/components/coin-image-pair/coin-image-pair'
import { useAccount } from 'wagmi'
import { Tokens, Transaction, tokenList } from '@/web3/types'
import Link from 'next/link'
import { roundToFirstNonZeroDecimal } from '@/pods/utils/number-format'
import useEthPrice from '@/web3/hooks/useEthPrice'

const NoTransactions = () => {
  return (
    <Stack
      css={{
        margin: 'auto',
        marginTop: '10em',
      }}
    >
      <Stack css={{ width: '268px' }} alignItems={'center'} gap={3}>
        <Stack css={{ width: '146px' }} gap={2}>
          <img src="/sk/Green.svg" />
          <img src="/sk/Yellow.svg" />
        </Stack>

        <Typography
          css={{
            fontSize: '12px',
            textAlign: 'center',
            color: '#BFBFBF',
          }}
        >
          No recent transactions found, make a swap or create an LP position.
        </Typography>
      </Stack>
    </Stack>
  )
}

const TransactionBase = ({ tx, lastItem, getPriceUsd }) => {
  const [tokenIn, setTokenIn] = useState<Tokens>(null)
  const [tokenOut, setTokenOut] = useState<Tokens>(null)

  useEffect(() => {
    if (!tx.data) return

    if (tx.data.in?.tokenAddress) {
      let foundTokenIn = tokenList.find(t => {
        return t.address == tx.data.in.tokenAddress
      })
      setTokenIn(foundTokenIn)
    }

    if (tx.data.out?.tokenAddress) {
      let foundTokenOut = tokenList.find(t => {
        return t.address == tx.data.out.tokenAddress
      })
      setTokenOut(foundTokenOut)
    }

    if (tx.data.approve) {
      let foundTokenApprove = tokenList.find(t => {
        return t.address == tx.data.approve.tokenAddress
      })
      setTokenIn(foundTokenApprove)
    }
  }, [])

  const renderTransaction = () => {
    switch (tx.type) {
      case 'swap':
        return <TransactionSwap tx={tx} tokenIn={tokenIn} tokenOut={tokenOut} />
      case 'add_liquidity':
        return (
          <TransactionAddLiquidity
            tx={tx}
            tokenIn={tokenIn}
            tokenOut={tokenOut}
            getPriceUsd={getPriceUsd}
          />
        )
      case 'remove_liquidity':
        return (
          <TransactionRemoveLiquidity
            tx={tx}
            tokenIn={tokenIn}
            tokenOut={tokenOut}
            getPriceUsd={getPriceUsd}
          />
        )
      case 'approve':
        return (
          <TransactionApprove tx={tx} tokenIn={tokenIn} tokenOut={tokenOut} />
        )
      default:
        return <></>
      // return <TransactionItem tx={tx} tokenIn={tokenIn} tokenOut={tokenOut} />;
    }
  }

  return (
    <Flex
      gap={1}
      fullWidth
      css={{
        padding: '16px 0',
        borderBottom: !lastItem ? '1px solid #1F1F1F' : 'none',
        paddingBottom: '32px',
      }}
    >
      {renderTransaction()}
    </Flex>
  )
}

const TransactionSwap = ({ tx, tokenIn, tokenOut }) => {
  const subText = tx.status == 'failed' ? 'Attempted Swap' : ''

  return (
    <>
      <Flex
        css={{
          background: '#252811',
          height: '24px',
          width: '24px',
          alignItems: 'center',
          borderRadius: '50%',
          justifyContent: 'center',
        }}
      >
        <img
          height={'16px'}
          width={'16px'}
          style={{
            margin: '4px',
            background: '#252811',
          }}
          src={'/icons/circle-arrow-reload.svg'}
        />
      </Flex>
      <Stack
        fullWidth={true}
        gap={1}
        css={{
          marginRight: '10px',
        }}
      >
        <Flex
          gap={1}
          css={{
            flexWrap: 'wrap',
          }}
          justifyContent={'spaceBetween'}
        >
          <Flex>
            <Typography
              css={{
                fontSize: '15px',
                lineHeight: '20px',
              }}
            >
              Swapped
            </Typography>
            {subText && (
              <Typography
                css={{
                  fontSize: '15px',
                  lineHeight: '20px',
                  color: '#AFAFAF',
                  marginLeft: '1em',
                }}
              >
                ~{subText}
              </Typography>
            )}
          </Flex>

          <Flex>
            <CoinImagePair
              coin1_src={tokenIn?.img}
              coin2_src={tokenOut?.img}
              size={20}
            />

            <Typography
              css={{
                fontSize: '14px',
              }}
            >
              {roundToFirstNonZeroDecimal(tx?.data?.in?.amount)}{' '}
              {tokenIn?.displayTicker}
            </Typography>
            <img src="/icons/arrow-right.svg" alt="" />
            <Typography
              css={{
                fontSize: '14px',
              }}
            >
              {roundToFirstNonZeroDecimal(tx?.data?.out?.amount)}{' '}
              {tokenOut?.displayTicker}
            </Typography>
          </Flex>
        </Flex>
        <Flex justifyContent={'spaceBetween'} alignItems={'center'}>
          {
            <Typography
              css={{
                fontSize: '12px',
                lineHeight: '14px',
                color: '#BFBFBF',
              }}
            >
              Ethereum
            </Typography>
          }
          <Typography
            css={{
              fontSize: '12px',
              lineHeight: '14px',
              color: '$primary',
            }}
          >
            <Link
              target="_blank"
              href={'https://goerli.etherscan.io/tx/' + tx.txHash}
            >
              {`${tx.txHash.substring(0, 4 + 2)}...${tx.txHash.substring(
                tx.txHash.length - 4,
              )}`}
            </Link>
          </Typography>
        </Flex>
      </Stack>
    </>
  )
}

const TransactionAddLiquidity = ({ tx, tokenIn, tokenOut, getPriceUsd }) => {
  const subText = tx.status == 'failed' ? 'Attempted liquidty deposit' : ''

  return (
    <>
      <Flex
        css={{
          background: '#252811',
          height: '24px',
          width: '24px',
          // padding: '4px',
          alignItems: 'center',
          borderRadius: '50%',
          justifyContent: 'center',
          // padding: '4px'
        }}
      >
        <img
          height={'16px'}
          width={'16px'}
          style={{
            margin: '4px',
            background: '#252811',
          }}
          src={'/icons/resources-add.svg'}
        />
      </Flex>
      <Stack
        fullWidth={true}
        gap={1}
        css={{
          marginRight: '10px',
        }}
      >
        <Flex
          gap={1}
          css={{
            flexWrap: 'wrap',
          }}
          justifyContent={'spaceBetween'}
        >
          <Flex>
            <Typography
              css={{
                fontSize: '15px',
                lineHeight: '20px',
              }}
            >
              Deposited Liquidity
            </Typography>
            {subText && (
              <Typography
                css={{
                  fontSize: '15px',
                  lineHeight: '20px',
                  color: '#AFAFAF',
                  marginLeft: '1em',
                }}
              >
                ~{subText}
              </Typography>
            )}
          </Flex>
          {/* {tx.status != 'failed' ? (
            <Flex gap={1}>
              <img src={tokenIn?.img} width="20" height="20" alt="" />
              <Typography
                css={{
                  fontSize: '14px',
                }}
              >
                {roundToFirstNonZeroDecimal(tx?.data?.approve.amount)}{' '}
                {tokenIn?.displayTicker}
              </Typography>
            </Flex>
          ) : (
            <></>
          )} */}
        </Flex>
        <Flex justifyContent={'spaceBetween'} alignItems={'center'}>
          <Flex alignItems={'center'}>
            <CoinImagePair
              coin1_src={tokenIn?.img}
              coin2_src={tokenOut?.img}
              size={20}
            />
            <Typography
              css={{
                color: '#BFBFBF',
              }}
            >
              {tokenIn?.displayTicker} / {tokenOut?.displayTicker}
            </Typography>
          </Flex>

          <Flex gap={1}>
            <Typography
              css={{
                color: '#BFBFBF',
                fontSize: '14px',
                lineHeight: '20px',
              }}
            >
              TVL:
            </Typography>

            <Typography
              css={{
                fontSize: '14px',
                color: '#F7FFBB',
              }}
            >
              ${getPriceUsd(tx?.data?.in?.amount) * 2}
            </Typography>
          </Flex>
        </Flex>
      </Stack>
    </>
  )
}

const TransactionApprove = ({ tx, tokenIn, tokenOut }) => {
  const subText = tx.status == 'failed' ? 'Attempted Approval' : ''

  return (
    <>
      <Flex
        css={{
          background: '#252811',
          height: '24px',
          width: '24px',
          // padding: '4px',
          alignItems: 'center',
          borderRadius: '50%',
          justifyContent: 'center',
          // padding: '4px'
        }}
      >
        <img
          height={'16px'}
          width={'16px'}
          style={{
            margin: '4px',
            background: '#252811',
          }}
          src={'/icons/coins-01.svg'}
        />
      </Flex>
      <Stack
        fullWidth={true}
        gap={1}
        css={{
          marginRight: '10px',
        }}
      >
        <Flex
          gap={1}
          css={{
            flexWrap: 'wrap',
          }}
          justifyContent={'spaceBetween'}
        >
          <Flex>
            <Typography
              css={{
                fontSize: '15px',
                lineHeight: '20px',
              }}
            >
              Approval
            </Typography>
            {subText && (
              <Typography
                css={{
                  fontSize: '15px',
                  lineHeight: '20px',
                  color: '#AFAFAF',
                  marginLeft: '1em',
                }}
              >
                ~{subText}
              </Typography>
            )}
          </Flex>
          {tx.status != 'failed' ? (
            <Flex gap={1}>
              <img
                src={tokenIn?.img ?? '/img/default-token.png'}
                width="20"
                height="20"
                alt=""
              />

              <Typography
                css={{
                  fontSize: '14px',
                }}
              >
                {roundToFirstNonZeroDecimal(tx?.data?.approve.amount)}{' '}
                {tokenIn?.displayTicker}
              </Typography>
            </Flex>
          ) : (
            <></>
          )}
        </Flex>
        <Flex justifyContent={'spaceBetween'} alignItems={'center'}>
          {
            <Typography
              css={{
                fontSize: '12px',
                lineHeight: '14px',
                color: '#BFBFBF',
              }}
            >
              {tx.status != 'failed' || tx.type == 'swap' ? (
                tx.status == 'failed' ? (
                  ''
                ) : (
                  'Ethereum'
                )
              ) : (
                <Flex gap={1} alignItems={'center'}>
                  {' '}
                  <img src={tokenIn?.img} width="20" height="20" alt="" />
                  <Typography
                    css={{
                      fontSize: '14px',
                    }}
                  >
                    {roundToFirstNonZeroDecimal(tx?.data?.approve?.amount)}{' '}
                    {tokenIn?.displayTicker}
                  </Typography>{' '}
                </Flex>
              )}
            </Typography>
          }
          <Typography
            css={{
              fontSize: '12px',
              lineHeight: '14px',
              color: '$primary',
            }}
          >
            <Link
              target="_blank"
              href={'https://goerli.etherscan.io/tx/' + tx.txHash}
            >
              {`${tx.txHash.substring(0, 4 + 2)}...${tx.txHash.substring(
                tx.txHash.length - 4,
              )}`}
            </Link>
          </Typography>
        </Flex>
      </Stack>
    </>
  )
}

const TransactionRemoveLiquidity = ({ tx, tokenIn, tokenOut, getPriceUsd }) => {
  const subText = tx.status == 'failed' ? 'Attempted liquidty deposit' : ''

  return (
    <>
      <Flex
        css={{
          background: '#252811',
          height: '24px',
          width: '24px',
          // padding: '4px',
          alignItems: 'center',
          borderRadius: '50%',
          justifyContent: 'center',
          // padding: '4px'
        }}
      >
        <img
          height={'16px'}
          width={'16px'}
          style={{
            margin: '4px',
            background: '#252811',
          }}
          src={'/icons/resources-remove.svg'}
        />
      </Flex>
      <Stack
        fullWidth={true}
        gap={1}
        css={{
          marginRight: '10px',
        }}
      >
        <Flex
          gap={1}
          css={{
            flexWrap: 'wrap',
          }}
          justifyContent={'spaceBetween'}
        >
          <Flex>
            <Typography
              css={{
                fontSize: '15px',
                lineHeight: '20px',
              }}
            >
              Removed Liquidity
            </Typography>
            {subText && (
              <Typography
                css={{
                  fontSize: '15px',
                  lineHeight: '20px',
                  color: '#AFAFAF',
                  marginLeft: '1em',
                }}
              >
                ~{subText}
              </Typography>
            )}
          </Flex>
          {/* {tx.status != 'failed' ? (
            <Flex gap={1}>
              <img src={tokenIn?.img} width="20" height="20" alt="" />
              <Typography
                css={{
                  fontSize: '14px',
                }}
              >
                {roundToFirstNonZeroDecimal(tx?.data?.approve.amount)}{' '}
                {tokenIn?.displayTicker}
              </Typography>
            </Flex>
          ) : (
            <></>
          )} */}
        </Flex>
        <Flex justifyContent={'spaceBetween'} alignItems={'center'}>
          <Flex alignItems={'center'}>
            <CoinImagePair
              coin1_src={tokenIn?.img}
              coin2_src={tokenOut?.img}
              size={20}
            />
            <Typography
              css={{
                color: '#BFBFBF',
              }}
            >
              {tokenIn?.displayTicker} / {tokenOut?.displayTicker}
            </Typography>
          </Flex>

          <Flex gap={1}>
            <Typography
              css={{
                color: '#BFBFBF',
                fontSize: '14px',
                lineHeight: '20px',
              }}
            >
              TVL:
            </Typography>

            <Typography
              css={{
                fontSize: '14px',
                color: '#F7FFBB',
              }}
            >
              ${getPriceUsd(tx?.data?.in?.amount) * 2}
            </Typography>
          </Flex>
        </Flex>
      </Stack>
    </>
  )
}

const RecentTransactions = () => {
  const { address, isDisconnected } = useAccount()
  const [userTransactions, setUserTransactions] = useState<any>([])
  const ethPrice = useEthPrice()

  function getPriceUsd(ethAmount: number): string | null | 0 | 1 {
    if (ethPrice) {
      return `${(Number(ethPrice.ethusd) * ethAmount).toFixed(2)}`
    }
    return ''
  }

  useEffect(() => {
    const fetchTransactions = async () => {
      if (address) {
        try {
          const response = await axios.get(
            `${process.env.API_URL}/transaction?address=${address}`,
          )
          setUserTransactions(response.data)
        } catch (error) {
          console.error('Error fetching transactions:', error)
        }
      }
    }

    fetchTransactions()
  }, [address])

  return (
    <Container css={{ flex: '1' }}>
      <Typography
        css={{
          fontSize: '20px',
          lineHeight: '24px',
          color: '#BFBFBF',
        }}
      >
        Recent transactions
      </Typography>
      <Stack
        css={{
          flex: '1',
          gap: '16px',

          display: 'flex',
          maxHeight: '42em',
          overflowY: 'scroll',
        }}
      >
        {userTransactions.length ? (
          userTransactions.map((tx, idx) => {
            return (
              tx.data && (
                <TransactionBase
                  tx={tx}
                  getPriceUsd={getPriceUsd}
                  lastItem={idx == userTransactions.length - 1 ? true : false}
                />
              )
            )
          })
        ) : (
          <NoTransactions />
        )}
      </Stack>
    </Container>
  )
}

export default RecentTransactions
