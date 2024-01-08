// 'use client';

import { Flex, Stack } from '@/components/box'
import Typography from '@/components/typography'
import Input from '@/components/input'
import { Tokens } from '@/web3/types'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import {
  maxSlippageState,
  tokenInState,
  tokenOutState,
  transactionDeadlineState,
} from '@/pods/atoms/swap-selected-tokens.atom'
import useOutsideClick from '@/pods/utils/useClickOutside'
import CoinImagePair from '@/components/coin-image-pair/coin-image-pair'
import {
  lpPairOneState,
  lpPairTwoState,
} from '@/pods/atoms/liquidity-pool-form.atom'
import CardContainer from '@/components/card-container/card-container'
import Button from '@/components/button'
import ToggleSwitch from '@/components/toggle-switch'
import { PuffLoader } from 'react-spinners'
import Link from 'next/link'

type AddLiquidityModalProps = {
  closeSettings: () => void
}

const WaitingForConfirmationModal = () => {
  return (
    <Stack
      gap={2}
      alignItems={'center'}
      css={{
        padding: 8,
      }}
    >
      <Flex
        justifyContent={'center'}
        css={{
          margin: '12px',
        }}
      >
        <PuffLoader size={66} color="#EBFE64" />
      </Flex>
      <Typography
        css={{
          fontSize: '20px',
          fontWeight: 500,
          color: 'white',
        }}
      >
        Waiting for confirmation
      </Typography>
      <Typography
        css={{
          fontSize: '18px',
          // fontWeight: 500,
          color: '#F7FFBB',
        }}
      >
        {' '}
        Deposition 1.245 ETH and 15,900 VDX
      </Typography>
      <Typography
        css={{
          fontSize: '16px',
          color: '#797979',
        }}
      >
        {' '}
        Confirm the transaction in your walletloa
      </Typography>
    </Stack>
  )
}

const SuccessModal = () => {
  return (
    <Stack
      gap={2}
      alignItems={'center'}
      css={{
        // padding: '16px',
        paddingY: '16px',
        width: '350px',
      }}
    >
      <Flex
        justifyContent={'center'}
        css={{
          margin: '12px',
        }}
      >
        <img src="/img/resources-add.svg" height={120} width={120} />
      </Flex>
      <Typography
        css={{
          fontSize: '20px',
          fontWeight: 500,
          color: 'white',
        }}
      >
        Added liquidity
      </Typography>
      <Button
        onClick={() => {}}
        css={{
          color: '#020202',
          mt: '12px',
          fontSize: '16px',
          lineHeight: '24px',
          background: 'linear-gradient(90deg, #EBFE64 -25.87%, #8CEA69 100%)',
          padding: '12px  40px',
        }}
        fullWidth
      >
        Close
      </Button>

      <Link
        href={'https://etherscan.com'}
        style={{
          color: '#EBFE64',
          fontSize: '16px',
        }}
      >
        View on Block Explorer
      </Link>
    </Stack>
  )
}

const AddLiquidityModal = (props: AddLiquidityModalProps) => {
  const [pairOne, setPairOneState] = useRecoilState(lpPairOneState)
  const [pairTwo, setPairTwoState] = useRecoilState(lpPairTwoState)
  const [status, setStatus] = useState<
    'confirmation' | 'loading' | 'confirmed'
  >('confirmation')

  const ref = useOutsideClick(() => {
    props.closeSettings()
  })

  useEffect(() => {
    if (status == 'loading') {
      setTimeout(() => {
        setStatus('confirmed')
      }, 5000)
    }
  }, [status])

  if (status == 'confirmed') return <SuccessModal />
  if (status == 'loading') return <WaitingForConfirmationModal />

  return (
    status == 'confirmation' && (
      <Stack
        ref={ref}
        gap={2}
        css={{
          minWidth: '368px',
        }}
      >
        <Typography
          css={{
            fontSize: '18px',
            textAlign: 'center',
            color: '#E1E1E1',
            fontWeight: '600',
            lineHeight: '24px',
            paddingBottom: '8px',
          }}
        >
          Add Liquidity
        </Typography>

        <Flex justifyContent={'spaceBetween'} style={{ marginBottom: '12px' }}>
          <Flex alignItems={'end'}>
            <CoinImagePair
              size={32}
              coin1_src={pairOne.img}
              coin2_src={pairTwo.img}
            />
            <Typography
              css={{
                fontSize: '24px',
                lineHeight: '32px',
                color: '#E1E1E1',
                fontWeight: '400',
              }}
            >
              {pairOne.displayTicker} / {pairTwo.displayTicker}
            </Typography>
          </Flex>
          <Flex gap={1} alignItems={'center'}>
            <Typography
              css={{
                fontSize: '12px',
                color: '#009851',
              }}
            >
              In Range
            </Typography>
            <img src="/icons/Ellipse.svg" height={8} width={8} />
          </Flex>
        </Flex>

        <Stack gap={1}>
          <Flex alignItems={'center'} justifyContent={'spaceBetween'}>
            <Typography
              css={{
                fontWeight: '500',
                fontSize: '14px',
                lineHeight: '20px',
                color: '#AFAFAF',
              }}
            >
              Fee tier
            </Typography>
            <Typography
              css={{
                fontWeight: '500',
                fontSize: '16px',
                lineHeight: '20px',
                color: '#F7FFBB',
              }}
            >
              0.3%
            </Typography>
          </Flex>
          <Flex gap={2}>
            <CardContainer
              as={Stack}
              alignItems={'center'}
              gap={3}
              css={{
                flex: 1,
                padding: '16px',
              }}
            >
              <Typography
                css={{
                  fontWeight: '500',
                  fontSize: '24px',
                  lineHeight: '32px',
                  color: 'white',
                }}
              >
                1.245
              </Typography>

              <div
                style={{
                  width: '100%',
                  height: '1px',
                  background: '#1F1F1F',
                }}
              ></div>

              <Flex>
                <img src={pairOne.img} width={24} height={24} />{' '}
                <Typography
                  css={{
                    fontSize: '20px',
                    lineHeight: '24px',
                    color: '#BFBFBF',
                    fontWeight: '400',
                  }}
                >
                  {pairOne.displayTicker}
                </Typography>
              </Flex>
            </CardContainer>

            <CardContainer
              as={Stack}
              alignItems={'center'}
              gap={3}
              css={{
                flex: 1,
                padding: '16px',
              }}
            >
              <Typography
                css={{
                  fontWeight: '500',
                  fontSize: '24px',
                  lineHeight: '32px',
                  color: 'white',
                }}
              >
                15.900
              </Typography>

              <div
                style={{
                  width: '100%',
                  height: '1px',
                  background: '#1F1F1F',
                }}
              ></div>

              <Flex gap={1}>
                <img src={pairTwo.img} width={24} height={24} />{' '}
                <Typography
                  css={{
                    fontSize: '20px',
                    lineHeight: '24px',
                    color: '#BFBFBF',
                    fontWeight: '400',
                  }}
                >
                  {pairTwo.displayTicker}
                </Typography>
              </Flex>
            </CardContainer>
          </Flex>
        </Stack>

        <Stack gap={1}>
          <Flex alignItems={'center'} justifyContent={'spaceBetween'}>
            <Typography
              css={{
                fontWeight: '500',
                fontSize: '14px',
                lineHeight: '20px',
                color: '#AFAFAF',
              }}
            >
              Selected Range
            </Typography>
            <ToggleSwitch
              option1={pairOne.displayTicker}
              option2={pairTwo.displayTicker}
            />
          </Flex>
          <Flex gap={2}>
            <CardContainer
              as={Stack}
              alignItems={'center'}
              gap={3}
              css={{
                flex: 1,
                padding: '16px',
              }}
            >
              <Typography
                css={{
                  fontWeight: '500',
                  fontSize: '24px',
                  lineHeight: '32px',
                  color: 'white',
                }}
              >
                1.245
              </Typography>

              <div
                style={{
                  width: '100%',
                  height: '1px',
                  background: '#1F1F1F',
                }}
              ></div>

              <Flex>
                <img src={pairOne.img} width={24} height={24} />{' '}
                <Typography
                  css={{
                    fontSize: '20px',
                    lineHeight: '24px',
                    color: '#BFBFBF',
                    fontWeight: '400',
                  }}
                >
                  {pairOne.displayTicker}
                </Typography>
              </Flex>
            </CardContainer>

            <CardContainer
              as={Stack}
              alignItems={'center'}
              gap={3}
              css={{
                flex: 1,
                padding: '16px',
              }}
            >
              <Typography
                css={{
                  fontWeight: '500',
                  fontSize: '24px',
                  lineHeight: '32px',
                  color: 'white',
                }}
              >
                15.900
              </Typography>

              <div
                style={{
                  width: '100%',
                  height: '1px',
                  background: '#1F1F1F',
                }}
              ></div>

              <Flex gap={1}>
                <img src={pairTwo.img} width={24} height={24} />{' '}
                <Typography
                  css={{
                    fontSize: '20px',
                    lineHeight: '24px',
                    color: '#BFBFBF',
                    fontWeight: '400',
                  }}
                >
                  {pairTwo.displayTicker}
                </Typography>
              </Flex>
            </CardContainer>
          </Flex>
        </Stack>
        <Button
          onClick={() => {
            setStatus('loading')
          }}
          css={{
            color: '#020202',
            mt: '12px',
            fontSize: '16px',
            lineHeight: '24px',
            background: 'linear-gradient(90deg, #EBFE64 -25.87%, #8CEA69 100%)',
            padding: '12px  40px',
          }}
          fullWidth
        >
          ADD
        </Button>
      </Stack>
    )
  )
}

export default AddLiquidityModal
