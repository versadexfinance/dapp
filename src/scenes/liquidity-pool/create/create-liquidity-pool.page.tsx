'use client'

import React, { useRef, useEffect, useState } from 'react'
import 'chartjs-adapter-moment'

import { Chart, ChartData, ChartOptions, registerables } from 'chart.js/auto'
import 'chartjs-chart-financial'
import { Crypto, CHAINS } from '@/web3/types'
import CoinSelector from '@/components/coin-select'

import { styled } from '@/styled'

import { Flex, Stack } from '@/components/box'
import CardContainer from '@/components/card-container/card-container'
import Typography from '@/components/typography'
import LpFormControl from '../components/lp-form-control'
import SelectDropdown from '@/components/select'
import { Option } from '@/components/select/interfaces'
import LpCoinSelect from '../components/lp-coin-select'
import RadioSelect from '@/components/radios/radios'
import Input from '@/components/input'

import {
  lpPairOneState,
  lpPairTwoState,
} from '@/pods/atoms/liquidity-pool-form.atom'
import { useRecoilState } from 'recoil'
import InputNumber from '@/components/input-number'
import ToggleSwitch from '@/components/toggle-switch'
import InputConversion from '@/components/input-conversion'
import useEthPrice from '@/web3/hooks/useEthPrice'
import Button from '@/components/button'
import { AnimatePresence } from 'framer-motion'
import Modal from '@/components/modal/modal'
import AddLiquidityModal from '../components/add-liquidity-modal'

Chart.register(...registerables)

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

const CreateLiquidityPoolHeader = () => (
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
        Add liquidity
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

function LiquidityPoolPage() {
  const [pairOne, setPairOneState] = useRecoilState(lpPairOneState)
  const [pairTwo, setPairTwoState] = useRecoilState(lpPairTwoState)

  const [modalOneOpen, setModalOneOpen] = useState(false)
  const [modalTwoOpen, setModalTwoOpen] = useState(false)

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
      img: c.img,
    }
  })

  return (
    <Container>
      <Stack gap={6}>
        <CreateLiquidityPoolHeader />
        <Stack gap="8">
          <LpFormControl
            label="Network"
            descripion="Select the blockchain network (e.g., Ethereum, Binance Smart Chain) where you want to create the liquidity position."
          >
            <SelectDropdown
              options={chains}
              onSelect={e => {
                console.log('selected', e)
              }}
            />
          </LpFormControl>

          <LpFormControl
            label="Token Pair"
            descripion="Choose the specific cryptocurrencies or tokens you want to pair in the liquidity pool. This pairing determines which assets traders can exchange, and your earnings depend on the trading activity within this selected pair."
          >
            <LpCoinSelect />
          </LpFormControl>
          <LpFormControl
            label="Fee tier"
            descripion="Opt for an appropriate fee tier, which determines the transaction fees users pay for trading in your liquidity pool. Higher fee tiers can potentially yield more profits but might also attract fewer traders, so it's crucial to strike a balance based on your goals and market demand."
          >
            <RadioSelect />
          </LpFormControl>

          <LpFormControl
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
          </LpFormControl>
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
                <CoinSelector
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
                  step={0.000000000000000001}
                  placeholder="0"
                  // value={amount.in}
                  // onChange={()=>changeAmount}
                  type="number"
                  label={`~ ${getPriceUsd(
                    Number(),
                    // pairOne?.ticker == 'WETH' ? amount.in : conversionResult,
                  )} USD`}
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
                <CoinSelector
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
                  step={0.000000000000000001}
                  placeholder="0"
                  // value={amount.in}
                  // onChange={()=>changeAmount}
                  type="number"
                  label={`~ ${getPriceUsd(
                    Number(),
                    // pairOne?.ticker == 'WETH' ? amount.in : conversionResult,
                  )} USD`}
                />
              </div>
            </Flex>
          </LpFormControl>
        </Stack>
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
        onClick={() => setModalOneOpen(true)}
      >
        Approve
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

export default LiquidityPoolPage
