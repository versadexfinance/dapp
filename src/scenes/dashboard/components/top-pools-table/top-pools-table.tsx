'use client'
import { styled } from '@stitches/react'
import { useMediaQuery } from 'usehooks-ts'

import { Thead } from './styles'
import { PoolTableRowProps, PoolsTableProps } from './interfaces'
import CoinImagePair from '@/components/coin-image-pair/coin-image-pair'
import Typography from '@/components/typography'
import { Flex, Stack } from '@/components/box'
import Input from '@/components/input'
import { formatNumber } from '@/pods/utils/number-format'
import { Container } from '../position-card/styles'
import Button from '@/components/button'
import media from '@/styled/media'

const Table = styled('table', {
  width: '100%',
  // borderCollapse: 'collapse',
  fontSize: '14px',
  borderSpacing: '0 12px',

  overflowX: 'auto', // Enable horizontal scrolling on small screens
})

const ProductTable = styled('tbody', {
  // gap: '16px'
  // [media.tablet]: {
  //   tr: {
  //     display: 'flex',
  //     marginBottom: '16px',
  //     borderBottom: '1px solid #ddd',
  //     paddingBottom: '8px',
  //     '&:last-child': {
  //       marginBottom: '0'
  //     }
  //   }
  // }
})

const Td = styled('td', {
  padding: '$2',
})

const ResponsiveTh = styled('td', {
  // padding: '$2',
  paddingLeft: '$2',
  fontWeight: '500',
  fontStyle: 'normal',
  color: '#797979',
  fontSize: '14px',
})
const ResponsiveTr = styled('tr', {
  backgroundColor: '#131313',
  // fontSize: '$-1',
  borderSpacing: '20px',
  marginBottom: '16px',
  display: 'table-row-group',
  borderRadius: '4px',
})

const ProductTableDesktop = ({ headers, items }: PoolsTableProps) => (
  <Stack
    css={{
      marginTop: '$4',
    }}
  >
    <Flex
      justifyContent={'spaceBetween'}
      css={{
        marginBottom: '24px',
      }}
    >
      <Typography
        css={{
          fontSize: '20px',
          lineHeight: '24px',
          color: '#BFBFBF',
          verticalAlign: 'middle',
        }}
      >
        Top Pools
      </Typography>
      <Input
        css={{
          width: '280px',
        }}
        size={'sm'}
        leftElement={<img src="/icons/MagnifyingGlass.svg" />}
        type="text"
        placeholder="search by name, symbol or address"
      />
    </Flex>
    <Table>
      <Thead>
        {[...headers, null].map(header => (
          <ResponsiveTh key={header}>{header}</ResponsiveTh>
        ))}
      </Thead>
      <ProductTable>
        {items.map((item: PoolTableRowProps, idx: number) => (
          <ResponsiveTr
            css={{
              display: 'table-row',
            }}
            key={`row-${idx}`}
          >
            <Td
              css={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                borderRadius: '4px 0px 0px 4px',
              }}
            >
              <CoinImagePair
                size={18}
                coin1_src={`/img/${item.pool.coin_1}.png`}
                coin2_src={`/img/${item.pool.coin_2}.png`}
              />
              {item.pool.coin_1} / {item.pool.coin_2}
              <Typography
                css={{
                  color: '#E1E1E1',
                  fontSize: '12px',
                  lineHeight: '16px',
                  p: '2px 4px',
                  borderRadius: '4px',
                  background: '#020202',
                }}
              >
                0.3%
              </Typography>
            </Td>
            <Td>
              <Typography>{formatNumber(item.tvl)}</Typography>
            </Td>
            <Td>
              <Typography>{formatNumber(item.volume_24h)}</Typography>
            </Td>
            <Td>
              <Typography>{item.APR}%</Typography>
            </Td>
            <Td css={{ borderRadius: '0px 4px 4px 0px' }}>
              <Typography css={{ color: '$primary', textAlign: 'right' }}>
                Deposit
              </Typography>
            </Td>
          </ResponsiveTr>
        ))}
      </ProductTable>
    </Table>
  </Stack>
)

const TopPoolsTableMobile = ({ items, headers }: PoolsTableProps) => (
  <Stack gap={2}>
    <Stack
      gap={2}
      justifyContent={'spaceBetween'}
      css={{
        marginBottom: '24px',
      }}
    >
      <Typography
        css={{
          fontSize: '20px',
          lineHeight: '24px',
          color: '#BFBFBF',
          verticalAlign: 'middle',
        }}
      >
        Top Pools
      </Typography>
      <Input
        size={'sm'}
        leftElement={<img src="/icons/MagnifyingGlass.svg" />}
        type="text"
        placeholder="search by name, symbol or address"
      />
    </Stack>
    {items.map((item: PoolTableRowProps, idx: number) => (
      <MobileTableRow
        key={`row-${idx}`}
        item={item}
        headers={headers}
        idx={idx}
      />
    ))}
  </Stack>
)

const MobileTableRow = ({
  item,
  headers,
  idx,
}: {
  item: PoolTableRowProps
  headers: string[] | undefined
  idx: number
}) => (
  <Container gap={2}>
    <Flex gap={1} alignItems={'center'}>
      <CoinImagePair
        size={18}
        coin1_src={`/img/${item.pool.coin_1}.png`}
        coin2_src={`/img/${item.pool.coin_2}.png`}
      />
      {item.pool.coin_1} / {item.pool.coin_2}
      <Typography
        css={{
          color: '#E1E1E1',
          fontSize: '12px',
          lineHeight: '16px',
          p: '2px 4px',
          borderRadius: '4px',
          background: '#020202',
        }}
      >
        0.3%
      </Typography>
    </Flex>
    <Flex
      gap={1}
      css={{
        flexWrap: 'wrap',
      }}
    >
      <Flex
        gap={1}
        css={{
          marginRight: 12,
          // flex: 1
        }}
      >
        <Typography
          css={{
            fontSize: '18px',
            lineHeight: '24px',
            color: '#797979',
          }}
        >
          TVL:
        </Typography>
        <Typography
          css={{
            fontSize: '18px',
            lineHeight: '24px',
            color: '#80DCB1',
          }}
        >
          {formatNumber(item.tvl)}
        </Typography>
      </Flex>
      <Flex gap={1}>
        <Typography
          css={{
            fontSize: '18px',
            lineHeight: '24px',
            color: '#797979',
          }}
          size="-1"
        >
          24h Volume:
        </Typography>
        <Typography
          css={{
            fontSize: '18px',
            lineHeight: '24px',
            color: 'white',
          }}
        >
          {formatNumber(item.volume_24h)}
        </Typography>
      </Flex>

      <Flex
        css={{
          flexBasis: '100%',
        }}
        gap={1}
      >
        <Typography
          css={{
            fontSize: '18px',
            lineHeight: '24px',
            color: '#797979',
          }}
          size="-1"
        >
          APR:
        </Typography>
        <Typography
          css={{
            fontSize: '18px',
            lineHeight: '24px',
            color: 'white',
          }}
        >
          {item.APR}%
        </Typography>
      </Flex>
    </Flex>
    <Button
      fullWidth
      css={{
        fontSize: '14px',
        textTransform: 'capitalize',
        borderRadius: '4px',
        padding: '0.5rem 1rem',
        background: 'rgba(235, 254, 100, 0.10)',
        color: '$primary',
      }}
    >
      Deposit
    </Button>
  </Container>
)

const MobileTableField = ({
  element,
  lastField,
}: {
  element: any
  lastField?: boolean
}) => (
  <Flex css={{ padding: '$4' }} justifyContent={'center'}>
    {typeof element === 'object' ? (
      element
    ) : (
      <Typography
        css={{
          fontWeight: lastField ? '$600' : 'inherit',
        }}
        size="-1"
      >
        {element}
      </Typography>
    )}
  </Flex>
)

const TopPoolsTable = ({ headers, items }: PoolsTableProps) => {
  const gtThanTablet = useMediaQuery(media.tablet)

  return gtThanTablet ? (
    <ProductTableDesktop headers={headers} items={items} />
  ) : (
    <TopPoolsTableMobile items={items} />
  )
}

export default TopPoolsTable
