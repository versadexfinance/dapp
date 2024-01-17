'use client'

import React, { useEffect, useState } from 'react'
import 'chartjs-adapter-moment'

import 'chartjs-chart-financial'
import { Crypto, CHAINS, NULL_ADDRESS } from '@/web3/types'
import CoinSelector from '@/components/coin-select'

import { styled } from '@/styled'

import { Flex, Stack } from '@/components/box'
import CardContainer from '@/components/card-container/card-container'
import Typography from '@/components/typography'
import LpFormControl from '../lp-form-control'
import SelectDropdown from '@/components/select'
import { Option } from '@/components/select/interfaces'
import LpCoinSelect from '../lp-coin-select'

import {
  lpAmountState,
  lpPairOneState,
  lpPairTwoState,
} from '@/pods/atoms/liquidity-pool-form.atom'
import { useRecoilState } from 'recoil'
import InputConversion from '@/components/input-conversion'
import useEthPrice from '@/web3/hooks/useEthPrice'
import Button from '@/components/button'
import { AnimatePresence } from 'framer-motion'
import Modal from '@/components/modal/modal'
import AddLiquidityModal from '../add-liquidity-modal'
import { usePair, usePrices } from '@/web3/hooks/usePair'
import { useCreateLiquidity } from '@/web3/hooks/useCreateLiquidity'
import { useTokenBalance } from '@/web3/hooks'
import { useAccount, useBalance, useWaitForTransaction } from 'wagmi'
import { BigNumber, ethers } from 'ethers'
import { roundToFirstNonZeroDecimal } from '@/pods/utils/number-format'
import { useConversionRatio } from '@/web3/hooks/useConversion'
import { PulseLoader } from 'react-spinners'

export type AppProps = {
  crypto: Crypto
  updateOwned: (crypto: Crypto, amount: number) => void
}

const Container = styled(Stack, {
  maxWidth: '900px',
  margin: '0 auto',
  gap: '2rem',
  marginTop: '2rem',
  padding: '1em',
  marginBottom: '4rem',
  '@tablet': {
    marginTop: '4rem',
  },
})

const CreateLiquidityPoolHeader = ({ isIncrease }: { isIncrease: boolean }) => (
  <CardContainer
    as={Flex}
    css={{
      display: 'flex',
      flexDirection: 'row',
      gap: '86px',
      padding: '24px',
    }}
  >
    <Stack gap={2}>
      <Typography
        css={{
          fontSize: '24px',
          lineHeight: '32px',
          fontWeight: 600,
        }}
      >
        {isIncrease ? 'Increase liquidity' : 'Create liquidity'}
      </Typography>
      <Typography
        css={{
          color: '#AFAFAF',
        }}
      >
        Create a new pool or add liquidity on an existing pool, to facilitate
        trading among pairs and earn fees in the process.
      </Typography>
    </Stack>
    <Stack
      css={{
        display: 'none',
        '@tablet': {
          display: 'flex',
        },
      }}
    >
      <img src="/icons/chart-line.svg" alt="" />
    </Stack>
  </CardContainer>
)

function FormLiquidtyPool({ isIncrease }: { isIncrease?: boolean }) {
  const [pairOne, setPairOneState] = useRecoilState(lpPairOneState)
  const [pairTwo, setPairTwoState] = useRecoilState(lpPairTwoState)
  const [lpAmount, setLpAmount] = useRecoilState(lpAmountState)
  const [ratioEthToToken, setRatioEthToToken] = useState(0)
  const [ratioTokenToEth, setRatioTokenToEth] = useState(0)

  const { address } = useAccount()
  const [modalOneOpen, setModalOneOpen] = useState(false)
  const [modalTwoOpen, setModalTwoOpen] = useState(false)
  const [invalid, setInvalid] = useState(false)

  const usePairResponse = usePair(
    pairOne ? pairOne.address : '',
    pairTwo ? pairTwo.address : '',
  )
  const reserves = usePrices(usePairResponse, pairOne, pairTwo)

  useEffect(() => {
    if (reserves) {
      setRatioEthToToken(reserves.tokenTwo / reserves.tokenOne)
    }
  }, [pairOne, reserves])

  useEffect(() => {
    if (reserves) {
      setRatioTokenToEth(reserves.tokenOne / reserves.tokenTwo)
    }
  }, [pairTwo, reserves])

  // const usePricesResult = usePrices(usePairResponse, pairOne, pairTwo)

  const tokenOneBalance = useBalance({
    address: address as `0x${string}`,
    chainId: 5,
  })

  const tokenTwoBalance = useTokenBalance({
    address: address as `0x${string}`,
    token: pairTwo?.address as `0x${string}`,
    chainId: 5,
  })

  const conversionResultETHtoToken = useConversionRatio(
    lpAmount,
    pairOne,
    ratioEthToToken,
  )
  const conversionResultTokenToEth = useConversionRatio(
    lpAmount,
    pairTwo,
    ratioTokenToEth,
    true,
  )

  const [lastUpdated, setLastUpdated] = useState('in') // Initialize with either 'in' or 'out'

  useEffect(() => {
    if (usePairResponse == NULL_ADDRESS || !usePairResponse) {
      return
    }

    if (lastUpdated === 'in') {
      setLpAmount(prev => ({ ...prev, out: conversionResultETHtoToken ?? '' }))
    } else if (lastUpdated === 'out') {
      setLpAmount(prev => ({ ...prev, in: conversionResultTokenToEth ?? '' }))
    }
  }, [lastUpdated, conversionResultETHtoToken, conversionResultTokenToEth])

  // useEffect(() => {
  //   if (txHash.hash.length > 0) {
  //     setTransaction({
  //       isApproving,
  //       contract: null,
  //       isLoading,
  //       txHash,
  //       amountIn: amount.in,
  //       amountOut: amount.out,
  //     })
  //   }
  // }, [txHash, isLoading, isApproving])

  // Handler functions
  const handleInChange = e => {
    if (
      e.target.value.split('.')[1]?.length > pairOne.decimals ||
      e.target.value.split(',')[1]?.length > pairOne.decimals
    ) {
      return
    }
    setLpAmount({ ...lpAmount, in: e.target.value ?? 0 })
    setLastUpdated('in')
    // check balance and set to invalid if needed
    if (
      ethers.utils
        .parseUnits(e.target.value, 18)
        .gt(BigNumber.from(tokenOneBalance?.data?.value))
    ) {
      setInvalid(true)
    } else {
      setInvalid(false)
    }
  }

  const handleOutChange = e => {
    if (
      e.target.value.split('.')[1]?.length > pairTwo.decimals ||
      e.target.value.split(',')[1]?.length > pairTwo.decimals
    ) {
      return
    }

    setLpAmount({ ...lpAmount, out: e.target.value ?? 0 })
    setLastUpdated('out')

    if (
      ethers.utils
        .parseUnits(e.target.value, 18)
        .gt(BigNumber.from(tokenTwoBalance?.data?.value))
    ) {
      setInvalid(true)
    } else {
      setInvalid(false)
    }
  }

  const {
    createLiquidity,
    isApproving,
    contractTokenOut,
    isLoading,

    txHash,
    allowanceIn,
    allowanceOut,
  } = useCreateLiquidity({
    tokenIn: pairOne,
    tokenOut: pairTwo,

    // tokenInBalance: tokenOneBalance,
    // tokenOutBalance: tokenTwoBalance,
    pairAddress: usePairResponse,
  })
  const {
    data,
    isError,
    isLoading: txLoading,
    status: txStatus,
  } = useWaitForTransaction({
    hash: txHash.hash as `0x${string}`,
  })

  const onClickCreateliquidity = async () => {
    await createLiquidity()
  }

  // useEffect(() => {
  //   const getButtonString = async () => {
  //     const resultAllowance = await contract.allowance(
  //       address,
  //       config.contract.routerV2,
  //     )
  //     if (
  //       tokenOne.ticker != 'WETH' &&
  //       resultAllowance.lt(
  //         ethers.utils.parseUnits(
  //           amount.in.length ? amount.in : '0',
  //           tokenOne.decimals,
  //         ),
  //       )
  //     ) {
  //       setButtonText('APPROVE')
  //     } else {
  //       setButtonText('SWAP')
  //     }
  //   }
  //   getButtonString()
  // }, [allowance, amount.in])

  const ethPrice = useEthPrice()

  function getPriceUsd(ethAmount: number): string | null | 0 | 1 {
    if (ethPrice) {
      return `${(Number(ethPrice.ethusd) * ethAmount).toFixed(2)}`
    }
    return ''
  }
  const chains: Option[] = CHAINS.map(c => {
    return {
      label: c.name,
      value: c.name,
      selectable: true,
      img: c.img,
    }
  })

  return (
    <Container>
      <Stack gap={6}>
        <CreateLiquidityPoolHeader isIncrease={isIncrease} />

        <Stack gap="8">
          <LpFormControl
            label="Network"
            descripion="Select the blockchain network (e.g., Ethereum, Binance Smart Chain) where you want to create the liquidity position."
          >
            <SelectDropdown options={chains} onSelect={e => {}} />
          </LpFormControl>

          <LpFormControl
            label="Token Pair"
            descripion="Choose the specific cryptocurrencies or tokens you want to pair in the liquidity pool. This pairing determines which assets traders can exchange, and your earnings depend on the trading activity within this selected pair."
          >
            <LpCoinSelect isIncrease={isIncrease} />
          </LpFormControl>
          {/* <LpFormControl
            label="Fee tier"
            descripion="Opt for an appropriate fee tier, which determines the transaction fees users pay for trading in your liquidity pool. Higher fee tiers can potentially yield more profits but might also attract fewer traders, so it's crucial to strike a balance based on your goals and market demand."
          >
            <RadioSelect />
          </LpFormControl> */}

          {/* <LpFormControl
            label="Price range"
            descripion="Set a price range within which trades can occur in your liquidity pool. Setting a reasonable price range ensures stability and prevents extreme market fluctuations, making your pool more attractive to traders."
          >
            <Stack gap="4">
              <CardContainer as={Flex} alignItems={'start'} gap={2}>
                <img
                  width={20}
                  height={20}
                  src="/icons/warning.svg"
                  alt=""
                  style={{
                    marginTop: '8px',
                  }}
                />
                <Typography
                  css={{
                    color: '#FFDA85',
                    fontSize: '14px',
                    fontWeight: '500',
                    lineHeight: '24px',
                  }}
                >
                  This pool must be initialized before you can add liquidity. To
                  initialize, select a starting price for the pool. Then, enter
                  your liquidity price range and deposit amount. Gas fees will
                  be higher than usual due to the initialization transaction.
                </Typography>
              </CardContainer>

              <Stack gap={1}>
                <Flex justifyContent={'spaceBetween'} wrap={'wrap'}>
                  <Typography
                    css={{
                      fontSize: '16px',
                      lineHeight: '20px',
                      fontWeight: '500',
                      color: '#BFBFBF',
                    }}
                  >
                    Start price
                  </Typography>
                  <Typography
                    css={{
                      color: '#797979',
                      fontSize: '14px',
                      lineHeight: '20px',
                    }}
                  >
                    Your pool needs a starting price between the min. and max.
                    price
                  </Typography>
                </Flex>
                <Input
                  pattern="[0-9]*"
                  inputMode="decimal"
                  type="number"
                  cssContainer={{
                    backgroundColor: '#131313',
                    padding: '16px',
                  }}
                  css={{
                    fontSize: '20px',
                  }}
                  size={'xl'}
                  rightElement={
                    <Typography
                      css={{
                        minWidth: '140px',
                        fontSize: '20px',
                        color: '#797979',
                        fontWeight: '500',
                      }}
                    >
                      {pairOne.displayTicker} per {pairTwo.displayTicker}
                    </Typography>
                  }
                />
              </Stack>

              <Stack
                gap={1}
                css={{
                  userSelect: 'none',
                }}
              >
                <Flex alignItems={'center'} justifyContent={'spaceBetween'}>
                  <Typography
                    css={{
                      fontSize: '16px',
                      lineHeight: '20px',
                      color: '#EBFE64 !important',
                      padding: '4px 8px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      height: 'fit-content',
                      borderRadius: '8px',
                      background: 'rgba(235, 254, 100, 0.10)',
                    }}
                  >
                    Full range
                  </Typography>
                  <ToggleSwitch
                    option1={pairOne.displayTicker}
                    option2={pairTwo.displayTicker}
                  />
                </Flex>
                <Flex
                  gap={3}
                  css={{
                    flexDirection: 'column',
                    '@tablet': {
                      flexDirection: 'row',
                    },
                  }}
                >
                  <CardContainer
                    as={Stack}
                    gap={2}
                    css={{
                      flex: 1,
                      border: 'none',
                    }}
                  >
                    <Flex alignItems={'center'} justifyContent={'spaceBetween'}>
                      <Typography
                        css={{
                          fontWeight: '500',
                          fontSize: '16px',
                          lineHeight: '20px',
                          color: 'white',
                        }}
                      >
                        Min Price
                      </Typography>
                      <Typography
                        css={{
                          fontWeight: '500',
                          fontSize: '16px',
                          lineHeight: '20px',
                          color: '#F7FFBB',
                        }}
                      >
                        {pairOne.displayTicker} per {pairTwo.displayTicker}
                      </Typography>
                    </Flex>

                    <InputNumber />
                  </CardContainer>
                  <CardContainer
                    as={Stack}
                    gap={2}
                    css={{
                      flex: 1,
                      border: 'none',
                    }}
                  >
                    <Flex alignItems={'center'} justifyContent={'spaceBetween'}>
                      <Typography
                        css={{
                          fontWeight: '500',
                          fontSize: '16px',
                          lineHeight: '20px',
                          color: 'white',
                        }}
                      >
                        Max Price
                      </Typography>
                      <Typography
                        css={{
                          fontWeight: '500',
                          fontSize: '16px',
                          lineHeight: '20px',
                          color: '#F7FFBB',
                        }}
                      >
                        {pairOne.displayTicker} per {pairTwo.displayTicker}
                      </Typography>
                    </Flex>

                    <InputNumber />
                  </CardContainer>
                </Flex>
              </Stack>
            </Stack>
          </LpFormControl> */}
          <LpFormControl
            label="Liquidity"
            descripion="Specify the quantity of both tokens you want to provide as liquidity. This involves supplying an equal value of both tokens into the pool, allowing traders to swap between them."
          >
            <Flex
              css={{
                marginTop: '16px',
                border: '1px solid #1F1F1F',
                padding: '12px',
                borderRadius: '8px',
              }}
              gap={2}
              alignItems={'center'}
              justifyContent={'spaceBetween'}
            >
              <div style={{ flex: '1' }}>
                <Flex
                  alignItems={'center'}
                  gap={1}
                  css={{ marginBottom: '4px' }}
                >
                  <Typography
                    css={{
                      fontSize: '14px',
                      color: '#797979',
                    }}
                  >
                    Balance:
                  </Typography>
                  <Typography
                    css={{
                      color: '#AFAFAF',
                    }}
                  >
                    {roundToFirstNonZeroDecimal(
                      tokenOneBalance.data?.formatted ?? '0',
                    )}
                  </Typography>
                </Flex>

                <CoinSelector
                  stateTokenIn={lpPairOneState}
                  stateTokenOut={lpPairTwoState}
                  disabled
                  css={{
                    flex: 4,
                    '@tablet': {
                      flex: 3,
                    },
                  }}
                  tokenPosition="in"
                />
              </div>
              <div
                style={{
                  flex: '2',
                }}
              >
                <InputConversion
                  css={{
                    flex: 2,
                    '@tablet': {
                      flex: 1,
                    },
                  }}
                  placeholder="0"
                  value={lpAmount.in}
                  onChange={handleInChange}
                  type="number"
                  label={`~ ${getPriceUsd(Number(lpAmount.in))} USD`}
                />
              </div>
            </Flex>

            <Flex
              css={{
                marginTop: '16px',
                border: '1px solid #1F1F1F',
                padding: '12px',
                borderRadius: '8px',
              }}
              gap={2}
              alignItems={'center'}
              justifyContent={'spaceBetween'}
            >
              <div style={{ flex: '1' }}>
                <Flex
                  alignItems={'center'}
                  gap={1}
                  css={{ marginBottom: '4px' }}
                >
                  <Typography
                    css={{
                      fontSize: '14px',
                      color: '#797979',
                    }}
                  >
                    Balance:
                  </Typography>
                  <Typography
                    css={{
                      color: '#AFAFAF',
                    }}
                  >
                    {pairTwo?.address
                      ? roundToFirstNonZeroDecimal(
                          tokenTwoBalance?.data?.formatted ?? '0',
                        )
                      : '-'}
                  </Typography>
                </Flex>

                <CoinSelector
                  stateTokenIn={lpPairOneState}
                  stateTokenOut={lpPairTwoState}
                  disabled
                  css={{
                    flex: 4,
                    '@tablet': {
                      flex: 3,
                    },
                  }}
                  tokenPosition="out"
                />
              </div>
              <div
                style={{
                  flex: '2',
                }}
              >
                <InputConversion
                  css={{
                    flex: 2,
                    '@tablet': {
                      flex: 1,
                    },
                  }}
                  placeholder="0"
                  value={lpAmount.out}
                  onChange={handleOutChange}
                  type="number"
                  label={`~ ${getPriceUsd(Number(lpAmount.in))} USD`}
                />
              </div>
            </Flex>
          </LpFormControl>
        </Stack>
        {/* <pre>
          {'Allowance In:' +
            JSON.stringify(ethers.utils.formatEther(allowanceIn))}
        </pre> */}
        {/* <pre>{'Reserves:' + JSON.stringify(usePricesResult)}</pre> */}
        {/* <pre>
          {'Allowance Out:' +
            JSON.stringify(ethers.utils.formatEther(allowanceOut))}
        </pre>

        <pre>
          {'Conversion result ETH to Token:' +
            JSON.stringify(conversionResultETHtoToken)}
        </pre>
        <pre>
          {'Conversion result Token to Eth:' +
            JSON.stringify(conversionResultTokenToEth)}
        </pre> */}

        {!isIncrease &&
          pairTwo &&
          (usePairResponse == NULL_ADDRESS || !usePairResponse) && (
            <CardContainer as={Flex} alignItems={'start'} gap={2}>
              <img
                width={20}
                height={20}
                src="/icons/warning.svg"
                alt=""
                style={{
                  marginTop: '8px',
                }}
              />
              <Typography
                css={{
                  color: '#FFDA85',
                  fontSize: '14px',
                  fontWeight: '500',
                  lineHeight: '24px',
                }}
              >
                This pool will be initialized before adding liquidity. Gas fees
                will be higher than usual due to the initialization transaction.
              </Typography>
            </CardContainer>
          )}
        {invalid && (
          <CardContainer as={Flex} alignItems={'start'} gap={2}>
            <img
              width={20}
              height={20}
              src="/icons/warning.svg"
              alt=""
              style={{
                marginTop: '8px',
              }}
            />
            <Typography
              css={{
                color: '#FFDA85',
                fontSize: '14px',
                fontWeight: '500',
                lineHeight: '24px',
              }}
            >
              You don't have enough balance
            </Typography>
          </CardContainer>
        )}
      </Stack>

      <Button
        css={{
          color: '#020202',
          fontSize: '16px',
          lineHeight: '24px',
          background: 'linear-gradient(90deg, #EBFE64 -25.87%, #8CEA69 100%)',
          padding: '12px  40px',
        }}
        fullWidth
        disabled={isApproving || isLoading || txLoading}
        onClick={() => onClickCreateliquidity()}
      >
        {isApproving || isLoading || txLoading ? (
          <PulseLoader color="#2D2C2C" size={10} />
        ) : allowanceOut?.lt(
            ethers.utils.parseUnits(
              lpAmount.out.length ? lpAmount.out : '0',
              pairTwo?.decimals,
            ),
          ) ? (
          'Approve'
        ) : !isIncrease &&
          pairTwo &&
          (usePairResponse == NULL_ADDRESS || !usePairResponse) ? (
          'Create pair'
        ) : (
          'Add liquidity'
        )}
      </Button>

      <AnimatePresence>
        <Modal
          isOpen={modalOneOpen}
          onRequestClose={() => {
            setModalOneOpen(false)
          }}
        >
          <AddLiquidityModal
            closeSettings={() => {
              setModalOneOpen(false)
            }}
          />
        </Modal>
      </AnimatePresence>

      <AnimatePresence>
        <Modal
          isOpen={modalTwoOpen}
          onRequestClose={() => {
            setModalTwoOpen(false)
          }}
        >
          <h2>Hi</h2>
        </Modal>
      </AnimatePresence>
    </Container>
  )
}

export default FormLiquidtyPool
