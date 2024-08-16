'use client'

import { Flex, Stack } from '@/components/box'
import { Container } from './styles'
import TabsComponent from '@/components/tabs/tabs'
import Typography from '@/components/typography'
import Button from '@/components/button'
import InputConversion from '@/components/input-conversion/input-conversion'
import CollapsibleCard from '@/components/collapsible-card'
import { useAccount, useBalance } from 'wagmi'

import { ChangeEvent, useEffect, useState } from 'react'
import { roundToFirstNonZeroDecimal } from '@/pods/utils/number-format'
import useEthPrice from '@/web3/hooks/useEthPrice'
import { useTokenBalance } from '@/web3/hooks'
import { useRecoilState } from 'recoil'
import {
  maxSlippageState,
  transactionState,
} from '@/pods/atoms/swap-selected-tokens.atom'
import SwapSettings from '../swap-settings'
import { useAllowance } from '@/web3/hooks/useAllowance'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Tab } from '@/components/tabs/interfaces'

import { AnimatePresence, motion } from 'framer-motion'
import Modal from '@/components/modal/modal'
import { tokenList } from '@/web3/types'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import Input from '@/components/input'
import BadgeRadios from '@/components/badge-radios'
import { styled } from '@/styled'
import {
  stakingAmountState,
  stakingTokenState,
} from '@/pods/atoms/staking.atom'
import SearchToken from '@/scenes/swap/components/search-token'

const RadioCardWrapper = styled(motion.div, {
  border: '1px solid #262626',
  borderRadius: '8px',
  padding: '8px',
  flex: 1,
  alignItems: 'center',
  cursor: 'pointer',

  variants: {
    selected: {
      true: {
        borderColor: '$primary',
      },
    },
  },
})

const RadioCard = ({ label, subLabel, isSelected, ...props }) => {
  return (
    <RadioCardWrapper
      whileHover={{ scale: 1.05 }} // Framer Motion hover animation
      transition={{ type: 'linear', stiffness: 500 }}
      selected={isSelected}
      {...props}
    >
      <Typography
        css={{
          color: '#E5E5E5',
          textAlign: 'center',
          fontWeight: '700',
          lineHeight: '24px',
        }}
      >
        {label}
      </Typography>
      <Typography
        css={{
          textAlign: 'center',
          fontSize: '14px',
          color: '#A3A3A3',
        }}
      >
        {subLabel}
      </Typography>
    </RadioCardWrapper>
  )
}

const StakeCard = () => {
  const [selectedValue, setSelectedValue] = useState('option1')
  const { address, isDisconnected } = useAccount()

  const { data: balanceData } = useBalance({
    address: address,
    watch: true,
  })

  const [settingOpen, setSettingOpen] = useState(false)

  const [tokenOne, setTokenOne] = useRecoilState(stakingTokenState)

  const [amount, setAmount] = useRecoilState(stakingAmountState)
  const [transaction, setTransaction] = useRecoilState(transactionState)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [maxSlippage, setMaxSlippage] = useRecoilState(maxSlippageState)
  const [buttonText, setButtonText] = useState('SWAP')

  const { openConnectModal } = useConnectModal()

  // const usePairResponse = usePair(
  //   tokenOne ? tokenOne.address : '',
  //   tokenTwo ? tokenTwo.address : '',
  // )

  // const reserves = usePrices(usePairResponse, tokenOne, tokenTwo)
  const ethPrice = useEthPrice()

  const tokenOneBalance = useTokenBalance({
    address: address as `0x${string}`,
    token: tokenOne?.address as `0x${string}`,
    chainId: 5,
  })

  // const tokenTwoBalance = useTokenBalance({
  //   address: address as `0x${string}`,
  //   token: tokenTwo?.address as `0x${string}`,
  //   chainId: 5,
  // })

  const allowance = useAllowance(address as `0x${string}`)

  function getPriceUsd(ethAmount: number): string | null | 0 | 1 {
    if (ethPrice) {
      return `${(Number(ethPrice.ethusd) * ethAmount).toFixed(2)}`
    }
    return ''
  }

  // const { swap, isApproving, contract, isLoading, txHash } = useSwap({
  //   tokenIn: tokenOne,
  //   tokenOut: tokenTwo,
  //   ethBalance: balanceData?.value || BigInt(0),
  // })

  // const {
  //   data,
  //   isError,
  //   isLoading: txLoading,
  //   status: txStatus,
  // } = useWaitForTransaction({
  //   hash: txHash.hash as `0x${string}`,
  // })

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

  // const onSwap = async () => {
  //   swap()
  // }

  // const gas = useEstimatedGasFee(tokenOne, tokenTwo, address as string)

  function changeAmount(e: ChangeEvent<HTMLInputElement>) {
    const amount = e.target.value
    setAmount(amount)
  }

  // const conversionResult = useConversion(
  //   amount,
  //   tokenOne,
  //   String(reserves?.tokenOne ?? 0),
  //   String(reserves?.tokenTwo ?? 0),
  // )

  useEffect(() => {
    const getButtonString = async () => {
      // const resultAllowance = await contract.allowance(
      //   address,
      //   config.contract.routerV2,
      // )
      // if (
      //   tokenOne.ticker != 'WETH' &&
      //   resultAllowance.lt(
      //     ethers.utils.parseUnits(
      //       amount.in.length ? amount.in : '0',
      //       tokenOne.decimals,
      //     ),
      //   )
      // ) {
      //   setButtonText('APPROVE')
      // } else {
      setButtonText('STAKE')
      // }
    }
    getButtonString()
  }, [allowance, amount])
  ;('use client')

  const tabs: Tab[] = [
    {
      label: 'Stake',
      content: (
        <Stack gap={2}>
          <Container
            css={{
              backgroundColor: '#090909',
            }}
          >
            <Flex justifyContent={'spaceBetween'}>
              <Typography
                css={{
                  color: '#D4D4D4',
                  fontSize: '16px',
                  lineHeight: '24px',
                }}
              >
                Locked Amount
              </Typography>
              <Flex gap={1} alignItems={'end'}>
                <Typography
                  css={{
                    fontSize: '14px',
                    color: '#797979',
                  }}
                >
                  Balance
                </Typography>
                <Typography
                  css={{
                    color: '#AFAFAF',
                  }}
                >
                  {roundToFirstNonZeroDecimal(
                    (tokenOneBalance
                      ? tokenOneBalance?.data?.formatted
                      : balanceData?.formatted) ?? '0',
                  )}{' '}
                  {tokenOne?.displayTicker}
                </Typography>
                <Typography
                  css={{
                    fontSize: '12px',
                    lineHeight: '16px',
                    color: '$primary',
                    padding: '4px 8px',
                    cursor: 'pointer',
                    '&:hover': {
                      scale: 1.1,
                    },
                  }}
                  onClick={() => {
                    setAmount(
                      (tokenOneBalance
                        ? tokenOneBalance.data?.formatted
                        : balanceData?.formatted) ?? '0',
                    )
                  }}
                >
                  Use Max
                </Typography>
              </Flex>
            </Flex>
            <Flex
              css={
                {
                  // marginTop: '16px',
                }
              }
              gap={2}
              alignItems={'center'}
              justifyContent={'spaceBetween'}
            >
              {/* <div
                style={{
                  flex: '2',
                }}
              > */}
              <InputConversion
                css={{
                  flex: 2,
                  fontSize: '32px',
                  padding: '8px',
                  textAlign: 'left',
                  '@tablet': {
                    flex: 1,
                  },
                  '::placeholder': {
                    fontSize: '32px !important',
                  },
                }}
                styleContainer={{
                  padding: '8px',
                  background: 'transparent',
                }}
                step={0.01}
                placeholder="0"
                value={amount}
                onChange={changeAmount}
                rightElement={
                  <Flex
                    css={{
                      background: '#262626',
                      fontWeight: 'bold',
                      borderRadius: '7px',
                      gap: '8px',
                      padding: '8px',
                      cursor: 'pointer',
                      '&:hover': {
                        scale: 1.05,
                      },
                      transition: 'all 0.2s ease',
                    }}
                    onClick={() => setIsModalOpen(true)}
                    alignItems={'center'}
                  >
                    <img src={tokenOne.img} width={24} height={24}></img>
                    <Typography
                      css={{
                        color: '#AFAFAF',
                        fontSize: '20px',
                        lineHeight: '24px',
                      }}
                    >
                      ETH
                    </Typography>
                    <ChevronDownIcon />
                  </Flex>
                }
                type="number"
              />
              {/* </div> */}
            </Flex>
          </Container>

          <Container
            css={{
              backgroundColor: '#090909',
            }}
          >
            <Flex justifyContent={'spaceBetween'}>
              <Typography
                css={{
                  color: '#D4D4D4',
                  fontSize: '16px',
                  lineHeight: '24px',
                }}
              >
                Duration
              </Typography>
            </Flex>
            <Flex
              justifyContent={'spaceBetween'}
              css={{
                gap: '16px',
              }}
            >
              <RadioCard
                label="30 days"
                subLabel="42% APY"
                isSelected={selectedValue === 'option1'}
                onClick={() => setSelectedValue('option1')}
              />
              <RadioCard
                label="60 days"
                subLabel="45% APY"
                isSelected={selectedValue === 'option2'}
                onClick={() => setSelectedValue('option2')}
              />
              <RadioCard
                label="90 days"
                subLabel="50% APY"
                isSelected={selectedValue === 'option3'}
                onClick={() => setSelectedValue('option3')}
              />
            </Flex>
          </Container>
          <CollapsibleCard
            title={
              <Flex
                fullWidth
                justifyContent={'spaceBetween'}
                alignItems={'center'}
              >
                <Flex
                  css={{
                    gap: 2,
                  }}
                >
                  {
                    <Typography
                      css={{
                        fontSize: '16px',
                        '@mobile': {
                          fontSize: '$1',
                        },
                      }}
                    >
                      Summary
                    </Typography>
                  }
                </Flex>
              </Flex>
            }
          >
            <Stack gap={2}>
              <Flex
                justifyContent={'spaceBetween'}
                alignItems={'center'}
                gap={2}
              >
                <Input
                  min={0}
                  max={0}
                  type="number"
                  rightElement="%"
                  size={'sm'}
                  cssContainer={{
                    flex: 10,
                    background: 'transparent',
                  }}
                  css={{
                    fontSize: '12px',
                    height: '20px',
                  }}
                />
                <BadgeRadios
                  options={[
                    {
                      label: '0.5%',
                      value: 0.5,
                    },
                    {
                      label: '1%',
                      value: 1,
                    },
                    {
                      label: '3%',
                      value: 3,
                    },
                    {
                      label: '5%',
                      value: 5,
                    },
                    {
                      label: '8%',
                      value: 8,
                    },
                  ]}
                />
              </Flex>
            </Stack>
          </CollapsibleCard>
        </Stack>
      ),
    },
  ]

  return (
    <Stack
      gap={3}
      css={{
        margin: '0 auto',
        maxWidth: '520px',
      }}
    >
      <Container>
        <motion.img
          onClick={() => setSettingOpen(!settingOpen)}
          whileHover={{ scale: 1.2, rotate: 15 }}
          whileTap={{
            scale: 0.8,
            rotate: 90,
            borderRadius: '100%',
          }}
          style={{
            position: 'absolute',
            right: '16px',
            cursor: 'pointer',
          }}
          src="/icons/setting.svg"
          width={24}
        />
        <Modal
          isOpen={settingOpen}
          onRequestClose={() => {
            setSettingOpen(false)
          }}
        >
          <SwapSettings
            closeSettings={() => {
              setSettingOpen(false)
            }}
          />
        </Modal>
        <AnimatePresence>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => {
              setIsModalOpen(false)
            }}
          >
            <SearchToken
              recoilInState={stakingTokenState}
              recoilOutState={stakingTokenState}
              tokens={tokenList}
              tokenPosition={'in'}
              closeModal={() => {
                setIsModalOpen(false)
              }}
            />
          </Modal>
        </AnimatePresence>

        <TabsComponent tabs={tabs} />
      </Container>
      {!isDisconnected ? (
        <Button
          css={{
            color: '#020202',
            fontSize: '16px',
            lineHeight: '24px',
            background: 'linear-gradient(90deg, #EBFE64 -25.87%, #8CEA69 100%)',
            padding: '12px  40px',
          }}
          fullWidth
          disabled={
            false
            // isApproving ||
            // isLoading ||
            // txLoading ||
            // usePairResponse === NULL_ADDRESS
          }
          // onClick={onSwap}
        >
          {/* {isApproving || isLoading || txLoading ? (
            <>
              <PulseLoader color="#2D2C2C" size={10} />
            </>
          ) : (
            buttonText
          )} */}
          {buttonText}
        </Button>
      ) : (
        <Button
          css={{
            color: '#020202',
            fontSize: '16px',
            lineHeight: '24px',
            background: 'linear-gradient(90deg, #EBFE64 -25.87%, #8CEA69 100%)',
            padding: '12px  40px',
          }}
          fullWidth
          onClick={openConnectModal}
        >
          CONNECT WALLET
        </Button>
      )}
    </Stack>
  )
}

export default StakeCard
