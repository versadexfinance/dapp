import { Flex } from '@/components/box'
import Typography from '@/components/typography'
import { roundToFirstNonZeroDecimal } from '@/pods/utils/number-format'

export const PriceRow = ({ token, value }) => {
  return (
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
      <Flex gap={'1'}>
        <img width="24px" height="24px" src={token.img} alt="" />

        <Typography
          css={{
            fontSize: '20px',
            lineHeight: '24px',
          }}
        >
          {token.displayTicker}
        </Typography>
      </Flex>
      <Flex>
        <Typography
          css={{
            fontSize: '24px',
            lineHeight: '32px',
            color: '#AFAFAF',
          }}
        >
          {roundToFirstNonZeroDecimal(value)} {token.displayTicker}
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
  )
}

export const PriceRowPair = () => {
  return (
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
          0.03 ETH
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
  )
}
