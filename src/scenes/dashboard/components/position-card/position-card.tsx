// 'use client';

import { Flex } from '@/components/box'
import CoinImagePair from '@/components/coin-image-pair/coin-image-pair'

import Typography from '@/components/typography'
import { Container } from './styles'
import Link from 'next/link'
import { usePrices } from '@/web3/hooks/usePair'
import { useConversion } from '@/web3/hooks/useConversion'
import { roundToFirstNonZeroDecimal } from '@/pods/utils/number-format'
import { useTokenBalance } from '@/web3/hooks'
import useEthPrice from '@/web3/hooks/useEthPrice'
import { useAccount } from 'wagmi'
import { useTotalSupply } from '@/web3/hooks/useTotalSupply'
import Loader from '@/components/loader'

const PositionCard = ({ pairAddress, pairOne, pairTwo }) => {
  const reserves = usePrices(pairAddress, pairOne, pairTwo)
  const { address } = useAccount()

  const conversionResultETHtoToken = useConversion(
    { in: '1', out: '1' },
    pairOne,
    String(reserves?.tokenOne ?? 0),
    String(reserves?.tokenTwo ?? 0),
  )
  const conversionResultTokenToEth = useConversion(
    { in: '1', out: '1' },
    pairTwo,
    String(reserves?.tokenOne ?? 0),
    String(reserves?.tokenTwo ?? 0),
  )

  const pairBalance = useTokenBalance({
    address: address as `0x${string}`,
    token: pairAddress as `0x${string}`,
    chainId: 5,
  })
  const totalSupply = useTotalSupply(pairAddress as `0x${string}`)

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

  if (!pairOne || !pairTwo) return <Loader />
  return (
    <Link href={'position/' + pairAddress} style={{ flex: 1 }}>
      <Container>
        <Flex
          gap={4}
          justifyContent={'spaceBetween'}
          alignItems={'center'}
          fullWidth
        >
          <Flex alignItems={'end'}>
            <CoinImagePair
              coin1_src={pairOne?.img}
              coin2_src={pairTwo?.img}
              size={32}
            />
            <Flex alignItems={'end'}>
              <Typography
                css={{
                  marginLeft: '-5px',
                  fontSize: '16px',
                  lineHeight: '24px',
                  marginRight: '8px',
                  verticalAlign: 'bottom',
                  '@tablet': {
                    verticalAlign: 'center',

                    fontSize: '24px',
                    lineHeight: '32px',
                  },
                }}
              >
                {pairOne.displayTicker} / {pairTwo.displayTicker}
              </Typography>
            </Flex>

            <Typography
              css={{
                color: '#E1E1E1',
                fontSize: '12px',
                lineHeight: '16px',
                marginBottom: '4px',
                p: '2px 4px',
                borderRadius: '4px',
                background: '#020202',
              }}
            >
              0.3%
            </Typography>
          </Flex>
          <Flex gap={1}>
            {/* <Typography
            css={{
              fontSize: '12px',
              color: '#009851',
            }}
          >
            In Range
          </Typography>
          <img src="/icons/Ellipse.svg" /> */}
          </Flex>
        </Flex>
        <Flex
          gap={1}
          justifyContent={'spaceBetween'}
          css={{
            flexWrap: 'wrap',
            paddingBottom: '16px',
            borderBottom: '1px solid #333',
          }}
          fullWidth
        >
          <Flex gap={'1'}>
            <Typography
              css={{
                color: '#797979',
                fontSize: '16px',
                lineHeight: '24px',
              }}
            >
              Pool Share:
            </Typography>
            <Typography>
              {roundToFirstNonZeroDecimal(poolShare * 100)} %
            </Typography>
          </Flex>
          <Flex gap={1}>
            <Typography
              css={{
                color: '#797979',
                fontSize: '16px',
                lineHeight: '24px',
              }}
            >
              Total value locked:
            </Typography>
            <Typography
              css={{
                color: '#80DCB1',
                textAlign: 'right',
                fontSize: '16px',

                lineHeight: '24px',
              }}
            >
              ${getPriceUsd(reserves?.tokenOne * 2 * poolShare)}
            </Typography>
          </Flex>
        </Flex>
        <Flex
          justifyContent={'spaceBetween'}
          css={{
            flexWrap: 'wrap',
            gap: 1,
            paddingTop: '16px',
          }}
        >
          <Flex alignItems={'center'} justifyContent={'start'} gap={1}>
            <img src={pairOne.img} width={'16px'} height={'16px'} />
            <Typography
              css={{
                color: '#F7FFBB',
                fontSize: '14px',
                fontHeight: '24px',
              }}
            >
              {1} {pairOne.displayTicker} ={' '}
              {roundToFirstNonZeroDecimal(conversionResultETHtoToken)}{' '}
              {pairTwo.displayTicker}
            </Typography>
          </Flex>
          <Flex alignItems={'center'} gap={1}>
            <img src={pairTwo.img} width={'16px'} height={'16px'} />
            <Typography
              css={{
                color: '#F7FFBB',
                fontSize: '14px',
                fontHeight: '24px',
              }}
            >
              {1} {pairTwo.displayTicker} ={' '}
              {roundToFirstNonZeroDecimal(conversionResultTokenToEth)}{' '}
              {pairOne.displayTicker}
            </Typography>
          </Flex>
        </Flex>
      </Container>
    </Link>
  )
}

export default PositionCard
