'use client'

import React, { useEffect, useState } from 'react'
import 'chartjs-adapter-moment'

import { Chart, registerables } from 'chart.js/auto'
import 'chartjs-chart-financial'
import { Crypto, tokenList } from '@/web3/types'

import { styled } from '@/styled'

import { Flex, Stack } from '@/components/box'
import CardContainer from '@/components/card-container/card-container'
import Typography from '@/components/typography'

import useEthPrice from '@/web3/hooks/useEthPrice'
import { usePair, usePrices } from '@/web3/hooks/usePair'
import { useTokenBalance } from '@/web3/hooks'
import { useAccount, useWaitForTransaction } from 'wagmi'
import CoinImagePair from '@/components/coin-image-pair/coin-image-pair'
import RangeSlider from '@/components/range-slider'
import Button from '@/components/button'
import { roundToFirstNonZeroDecimal } from '@/pods/utils/number-format'
import { useTotalSupply } from '@/web3/hooks/useTotalSupply'
import { useGetTokenPairs } from '@/web3/hooks/useGetTokenPairs'
import { BigNumber } from 'ethers'
import { useRemoveLiquidity } from '@/web3/hooks/useRemoveLiquidity'
import { useTokenAllowance } from '@/web3/hooks/useTokenAllowance'
import { PulseLoader } from 'react-spinners'
import Loader from '@/components/loader'

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

const Card = styled(Stack, {
  border: '1px solid #1F1F1F',
  padding: '16px',
  backgroundColor: '#101010',
  borderRadius: '8px',
})

const Badge = styled(Typography, {
  background: 'rgba(235, 254, 100, 0.10)',
  fontSize: '16px',
  color: '#EBFE64',
  cursor: 'pointer',
  padding: '8px 16px',
  borderRadius: '8px',
  textAlign: 'center',
})

const ExitLiquidityPoolHeader = () => (
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
        Exit Liquidity
      </Typography>
      <Typography
        css={{
          color: '#AFAFAF',
        }}
      >
        Exiting a liquidity position involves withdrawing both your tokens and
        the fees you&apos;ve earned back to your wallet.
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

function LiquidityPoolPage({ params }) {
  const [pairOne, setPairOne] = useState(null)
  const [pairTwo, setPairTwo] = useState(null)
  const { address } = useAccount()
  const [range, setRange] = useState(0)

  const {
    isError,
    isLoading: pairsLoading,
    pairs,
  } = useGetTokenPairs(params.pairAddress)

  useEffect(() => {
    if (pairs) {
      setPairOne(tokenList.find(t => t.address == pairs?.tokenOne))
      setPairTwo(tokenList.find(t => t.address == pairs?.tokenTwo))
    }
  }, [pairs])

  const usePairResponse = usePair(
    pairOne ? pairOne.address : '',
    pairTwo ? pairTwo.address : '',
  )

  const reserves = usePrices(usePairResponse, pairOne, pairTwo)

  const pairBalance = useTokenBalance({
    address: address as `0x${string}`,
    token: usePairResponse as `0x${string}`,
    chainId: 5,
  })

  // const usePricesResult = usePrices(usePairResponse, pairOne, pairTwo)

  const totalSupply = useTotalSupply(usePairResponse as `0x${string}`)

  const ethPrice = useEthPrice()

  function getPriceUsd(ethAmount: number): string | null | 0 | 1 {
    if (ethPrice) {
      return `${(Number(ethPrice.ethusd) * ethAmount).toFixed(2)}`
    }
    return ''
  }

  const poolShare =
    Number(pairBalance?.data?.value?.toString()) /
    Number(totalSupply?.toString())

  // const { id } = router.query

  //Params hook

  const liquidity = BigNumber.from(pairBalance?.data?.value ?? '0')
    .mul(range)
    .div(100) //liquidity pool balance

  const { removeLiquidity, isLoading, isApproving, txHash } =
    useRemoveLiquidity({
      token1: pairOne,
      token2: pairTwo,
      liquidityWei: liquidity.toString(),
      range,
      pairAddress: params.pairAddress,
      reserves,
      poolShare,
    })

  const tokenAllowance = useTokenAllowance(address, params.pairAddress)
  const {
    data,
    isError: txError,
    isLoading: txLoading,
    status: txStatus,
  } = useWaitForTransaction({
    hash: txHash.hash as `0x${string}`,
  })

  const handleCLick = async () => {
    await removeLiquidity()
  }
  if (!(pairOne && pairTwo)) {
    return <Loader />
  }
  if (isError || !Boolean(Number(pairBalance?.data?.value?.toString()))) {
    return <div>Not found</div>
  }

  return (
    <Container>
      {
        // <pre>
        //   TOKEN ALLOWNACE: {JSON.stringify(tokenAllowance.toString())} <br />
        //   {JSON.stringify(liquidity.toString())}
        //   <br />
        //   {JSON.stringify(pairs)}
        //   <br />
        //   {/* {JSON.stringify(router)} */}
        //   <br />
        //   {JSON.stringify(params.pairAddress)}
        //   <br />
        //   {JSON.stringify(reserves)}
        //   <br />
        //   {JSON.stringify(pairBalance.data.value.toString())}
        //   <br />
        //   {JSON.stringify(totalSupply?.toString())}
        //   <br />
        //   poolShare: {poolShare}
        // </pre>
      }

      <Stack gap={6}>
        <ExitLiquidityPoolHeader />
        <Flex
          css={{
            width: '100%',
            justifyContent: 'space-between',
            '@tablet': {
              justifyContent: 'flex-start',
              width: 'auto',
            },
          }}
          alignItems={'center'}
          gap={2}
        >
          <Flex alignItems={'end'}>
            <CoinImagePair
              size={32}
              coin1_src={pairOne?.img}
              coin2_src={pairTwo?.img}
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
          {/* <Flex gap={1} alignItems={'center'}>
            <Typography
              css={{
                fontSize: '12px',
                color: '#009851',
              }}
            >
              In Range
            </Typography>
            <img src="/icons/Ellipse.svg" height={8} width={8} />
          </Flex> */}
        </Flex>

        <Stack gap={3}>
          <Card gap={2}>
            <Typography
              css={{
                color: '#AFAFAF',
                fontSize: '16px',
                fontWeight: 600,
                textAlign: 'center',
              }}
            >
              Amount
            </Typography>
            <Flex
              css={{
                backgroundColor: '#090909',
                fontSize: '36px',
                borderRadius: '8px',
                justifyContent: 'center',
              }}
            >
              {range}%
            </Flex>

            <Flex alignItems={'center'} gap={1}>
              <RangeSlider
                value={range}
                onChange={e => {
                  setRange(Number(e.target.value))
                }}
              />

              <Flex css={{ flex: '1' }} justifyContent={'end'} gap={2}>
                <Badge
                  onClick={() => {
                    setRange(25)
                  }}
                >
                  25%
                </Badge>
                <Badge
                  onClick={() => {
                    setRange(50)
                  }}
                >
                  50%
                </Badge>
                <Badge
                  onClick={() => {
                    setRange(75)
                  }}
                >
                  75%
                </Badge>
                <Badge
                  onClick={() => {
                    setRange(100)
                  }}
                >
                  100%
                </Badge>
              </Flex>
            </Flex>
          </Card>
          <Flex fullWidth="true" gap={3}>
            <Card css={{ flex: '1' }} gap={2}>
              <Typography
                css={{
                  color: '#AFAFAF',
                  fontSize: '16px',
                  fontWeight: 600,
                  textAlign: 'center',
                }}
              >
                Pooled {pairOne.displayTicker}
              </Typography>
              <Flex
                gap={2}
                css={{
                  backgroundColor: '#090909',
                  fontSize: '20px',
                  borderRadius: '8px',
                  lineHeight: '24px',
                  padding: '16px 0',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img src={pairOne?.img} height={24} width={24} />
                {roundToFirstNonZeroDecimal(
                  reserves?.tokenOne * poolShare,
                )}{' '}
                {pairOne?.displayTicker}
              </Flex>
            </Card>
            <Card css={{ flex: '1' }} gap={2}>
              <Typography
                css={{
                  color: '#AFAFAF',
                  fontSize: '16px',
                  fontWeight: 600,
                  textAlign: 'center',
                }}
              >
                Pooled {pairTwo.displayTicker}
              </Typography>
              <Flex
                gap={2}
                css={{
                  backgroundColor: '#090909',
                  fontSize: '20px',
                  borderRadius: '8px',
                  lineHeight: '24px',
                  padding: '16px 0',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img src={pairTwo.img} height={24} width={24} />
                {roundToFirstNonZeroDecimal(
                  reserves?.tokenTwo * poolShare,
                )}{' '}
                {pairTwo.displayTicker}
              </Flex>
            </Card>
          </Flex>
          <Flex fullWidth="true" gap={3}>
            <Card css={{ flex: '1' }} gap={2}>
              <Typography
                css={{
                  color: '#AFAFAF',
                  fontSize: '16px',
                  fontWeight: 600,
                  textAlign: 'center',
                }}
              >
                You will receive
              </Typography>
              <Flex
                gap={2}
                css={{
                  backgroundColor: '#090909',
                  fontSize: '20px',
                  borderRadius: '8px',
                  lineHeight: '24px',
                  padding: '16px 0',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img src={pairOne?.img} height={24} width={24} />
                {roundToFirstNonZeroDecimal(
                  reserves?.tokenOne * poolShare * (range / 100),
                )}{' '}
                {pairOne.displayTicker}
              </Flex>
            </Card>
            <Card css={{ flex: '1' }} gap={2}>
              <Typography
                css={{
                  color: '#AFAFAF',
                  fontSize: '16px',
                  fontWeight: 600,
                  textAlign: 'center',
                }}
              >
                You will receive
              </Typography>
              <Flex
                gap={2}
                css={{
                  backgroundColor: '#090909',
                  fontSize: '20px',
                  borderRadius: '8px',
                  lineHeight: '24px',
                  padding: '16px 0',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img src={pairTwo.img} height={24} width={24} />
                {roundToFirstNonZeroDecimal(
                  reserves?.tokenTwo * poolShare * (range / 100),
                )}{' '}
                {pairTwo.displayTicker}
              </Flex>
            </Card>
          </Flex>
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
        disabled={isLoading || isApproving || liquidity.isZero() || txLoading}
        fullWidth
        onClick={() => {
          handleCLick()
        }}
      >
        {isApproving || isLoading || txLoading ? (
          <PulseLoader color="#2D2C2C" size={10} />
        ) : liquidity.isZero() ? (
          'Select amount'
        ) : tokenAllowance.lt(liquidity) ? (
          'Approve'
        ) : (
          'Remove'
        )}
      </Button>
    </Container>
  )
}

export default LiquidityPoolPage
