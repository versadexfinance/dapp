'use client'

import React, { useEffect, useState } from 'react'
import 'chartjs-adapter-moment'

import 'chartjs-chart-financial'
import { Crypto, tokenList } from '@/web3/types'

import { Flex, Stack } from '@/components/box'
import Typography from '@/components/typography'

import useEthPrice from '@/web3/hooks/useEthPrice'
import { AnimatePresence } from 'framer-motion'
import Modal from '@/components/modal/modal'
import AddLiquidityModal from '../components/add-liquidity-modal'
import { PositionHeader } from './components/position-header'
import { Container, GridCardContainer, GridContainer } from './styles'
import { PriceRow } from './components/price-row'
import { myLpsState } from '@/pods/atoms/liquidity-pool-form.atom'
import { useRecoilState } from 'recoil'
import { usePrices } from '@/web3/hooks/usePair'
import { useTotalSupply } from '@/web3/hooks/useTotalSupply'
import { useAccount } from 'wagmi'
import { useTokenBalance } from '@/web3/hooks'
import { BigNumber } from 'ethers'
import { roundToFirstNonZeroDecimal } from '@/pods/utils/number-format'
import Loader from '@/components/loader'

export type AppProps = {
  crypto: Crypto
  updateOwned: (crypto: Crypto, amount: number) => void
}

function PositionPage({ params }) {
  const ethPrice = useEthPrice()
  const { address } = useAccount()
  const [currentLp, setCurrentLp] = useState(null)
  const [myLps, setLiquidityPools] = useRecoilState(myLpsState)

  const [pairOne, setPairOne] = useState(null)
  const [pairTwo, setPairTwo] = useState(null)

  useEffect(() => {
    if (!myLps) return
    let foundLp = myLps.find(
      lp => lp.pairAddress.toLowerCase() == params.id.toLowerCase(),
    )

    setPairOne(
      tokenList.find(
        t => t.address?.toLowerCase() == foundLp?.tokenOne.toLowerCase(),
      ),
    )
    setPairTwo(
      tokenList.find(
        t => t.address?.toLowerCase() == foundLp?.tokenTwo.toLowerCase(),
      ),
    )
    setCurrentLp(foundLp)
  }, [myLps, params.id])

  const reserves = usePrices(params.id, pairOne, pairTwo)
  const totalSupply = useTotalSupply(params.id as `0x${string}`)
  const pairBalance = useTokenBalance({
    address: address as `0x${string}`,
    token: params.id as `0x${string}`,
    chainId: 5,
  })

  const poolShare =
    Number(pairBalance?.data?.value?.toString()) /
    Number(totalSupply?.toString())

  function getPriceUsd(ethAmount: number): string | null | 0 | 1 {
    if (ethPrice) {
      return `${(Number(ethPrice.ethusd) * ethAmount).toFixed(2)}`
    }
    return ''
  }

  if (!pairOne || !pairTwo) {
    return <Loader />
  }
  return (
    <Container>
      <Stack gap={6}>
        <PositionHeader
          pairOne={pairOne}
          pairTwo={pairTwo}
          pairAddress={params.id}
        />
      </Stack>
      <GridContainer>
        <GridCardContainer
          css={{
            gap: '$2',
            gridArea: 'liquidity',
          }}
        >
          <Typography
            css={{
              color: '#F7FFBB',
              fontSize: '18px',
              lineHeight: '24px',
            }}
          >
            Liquidity
          </Typography>
          <Typography
            css={{
              fontSize: '32px',
              lineHeight: '40px',
            }}
          >
            ${getPriceUsd(reserves?.tokenOne * 2 * poolShare)}
          </Typography>
          <PriceRow token={pairOne} value={reserves?.tokenOne * poolShare} />
          <PriceRow token={pairTwo} value={reserves?.tokenTwo * poolShare} />
        </GridCardContainer>

        {/* <GridCardContainer
          css={{
            gridArea: 'nft',
          }}
        >
          <PositionGraph />
        </GridCardContainer> */}
        <GridCardContainer
          css={{
            gap: '$2',
            gridArea: 'fees',
          }}
        >
          <Typography
            css={{
              color: '#F7FFBB',
              fontSize: '18px',
              lineHeight: '24px',
            }}
          >
            Liquidity Pool Info
          </Typography>
          <Typography
            css={{
              fontSize: '32px',
              lineHeight: '40px',
              height: '40px',
            }}
          >
            {''}
          </Typography>
          <Flex
            justifyContent={'spaceBetween'}
            css={{
              padding: '16px',
              background: '#1f1f1f',
              borderRadius: '4px',
              gap: '24px',
              alignItems: 'center',
            }}
          >
            <Flex gap={'1'}>LP tokens</Flex>
            <Flex>
              <Typography
                css={{
                  fontSize: '24px',
                  lineHeight: '32px',
                  color: '#AFAFAF',
                }}
              >
                {roundToFirstNonZeroDecimal(pairBalance.data.formatted)}{' '}
                VERSA-V2
              </Typography>
              {/* <Typography
          css={{
            fontSize: '24px',
            lineHeight: '32px',
            color: '#AFAFAF',
          }}
        >
          $55.25
        </Typography> */}
            </Flex>
          </Flex>
          <Flex
            justifyContent={'spaceBetween'}
            css={{
              padding: '16px',
              background: '#1f1f1f',
              borderRadius: '4px',
              gap: '24px',
              alignItems: 'center',
            }}
          >
            <Flex gap={'1'}>Pool Share</Flex>
            <Flex>
              <Typography
                css={{
                  fontSize: '24px',
                  lineHeight: '32px',
                  color: '#AFAFAF',
                }}
              >
                {roundToFirstNonZeroDecimal(poolShare * 100)} %
              </Typography>
              {/* <Typography
          css={{
            fontSize: '24px',
            lineHeight: '32px',
            color: '#AFAFAF',
          }}
        >
          $55.25
        </Typography> */}
            </Flex>
          </Flex>
        </GridCardContainer>
        {/* <GridCardContainer css={{ gridArea: 'range' }}>
          <Typography>Price range</Typography>
        </GridCardContainer> */}
      </GridContainer>
      {/* 
      <pre>{JSON.stringify(currentLp, null, 2)}</pre>
      <pre>reserves : {JSON.stringify(reserves, null, 2)}</pre>
      <pre>totalSupply : {JSON.stringify(totalSupply.toString(), null, 2)}</pre>
      <pre>
        pairBalance : {JSON.stringify(pairBalance.data.formatted, null, 2)}
      </pre>
      <pre>poolShare : {JSON.stringify(poolShare, null, 2)}</pre>

      <pre>Token One : {JSON.stringify(pairOne, null, 2)}</pre>
      <pre>Token Two : {JSON.stringify(pairTwo, null, 2)}</pre> */}
      <AnimatePresence></AnimatePresence>
    </Container>
  )
}

export default PositionPage
