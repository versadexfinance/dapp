import { Flex } from '@/components/box'
import Button from '@/components/button'
import CoinImagePair from '@/components/coin-image-pair/coin-image-pair'
import Typography from '@/components/typography'
import Link from 'next/link'

export const PositionHeader = ({ pairAddress, pairOne, pairTwo }) => {
  return (
    <Flex
      justifyContent={'spaceBetween'}
      wrap={'wrap'}
      gap={2}
      style={{ marginBottom: '12px' }}
    >
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
          {/* <Typography
            css={{
              fontSize: '12px',
              color: '#009851',
            }}
          >
            In Range
          </Typography>
          <img src="/icons/Ellipse.svg" height={8} width={8} /> */}
        </Flex>
      </Flex>
      <Flex
        gap={'2'}
        css={{
          flexDirection: 'column',
          width: '100%',
          '@tablet': {
            width: 'auto',
            flexDirection: 'row',
          },
        }}
      >
        <Button
          size={'sm'}
          css={{
            mt: '12px',
            textTransform: 'capitalize',
            fontSize: '16px',
            lineHeight: '24px',
            fontWeight: 400,
            color: 'white',
            background: 'transparent',
            border: '1px solid #424242',
            // background: 'linear-gradient(90deg, #EBFE64 -25.87%, #8CEA69 100%)',
            padding: '10px  16px',
            '&:hover': {
              border: '1px solid #424242 !important ',
            },
          }}
          fullWidth
          as={Link}
          href={'/liquidity-pool/' + pairAddress + '/increase'}
        >
          Increase Liquidity
        </Button>
        <Button
          size={'sm'}
          css={{
            color: '#020202',
            mt: '0px',
            fontSize: '16px',
            textTransform: 'capitalize',
            lineHeight: '24px',
            fontWeight: 400,
            background: 'linear-gradient(90deg, #EBFE64 -25.87%, #8CEA69 100%)',
            padding: '10px  12px',
            '@tablet': {
              mt: '12px',
            },
          }}
          as={Link}
          href={'/liquidity-pool/' + pairAddress + '/exit'}
          fullWidth
        >
          <img src="/icons/resources-remove-black.svg" />
          Exit Liquidity
        </Button>
      </Flex>
    </Flex>
  )
}
