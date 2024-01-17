// 'use client';

import { Flex, Stack } from '@/components/box'

import Typography from '@/components/typography'
import PositionCard from '../position-card'
import Button from '@/components/button'
import Link from 'next/link'
import { styled } from '@/styled'

const StyledLink = styled(Link, {})

const MyPositions = props => {
  return (
    <Stack gap={props.button == 'add-liquidity' ? 4 : 2} css={{}}>
      <Flex
        gap={4}
        justifyContent={'spaceBetween'}
        alignItems={'center'}
        fullWidth
      >
        <Typography
          css={{
            fontSize: '20px',
            lineHeight: '24px',
            color: '#BFBFBF',
            // verticalAlign: 'bottom'
            // display: 'flex',
            // flexDirection: 'column',
            // justifyContent: 'center'
          }}
        >
          My Positions
        </Typography>
        {props.button !== 'add-liquidity' ? (
          <Button
            css={{
              backgroundColor: 'transparent',
              color: '$primary',
              textTransform: 'capitalize',
              fontWeight: 300,
              fontSize: '16px',
              fontHeight: '20px',
            }}
          >
            <img src="/icons/resources-add.svg" />
            New Position
          </Button>
        ) : (
          <StyledLink
            css={{
              // backgroundColor: 'transparent',
              fontWeight: 500,
              textTransform: 'capitalize',
              display: 'flex',
              alignItems: 'center',
              fontSize: '16px',
              gap: '0.5em',
              fontHeight: '20px',
              color: '#020202',
              lineHeight: '24px',
              width: 'auto',
              background: 'linear-gradient(90deg, #EBFE64 0%, #8CEA69 100%)',
              padding: '12px  40px',
            }}
            href={'/liquidity-pool/create'}
          >
            <>
              <img
                src="/icons/resources-add-black.svg"
                width={16}
                height={16}
              />
              Add liquidity
            </>
          </StyledLink>
        )}
      </Flex>
      <Flex
        css={{
          flexDirection: 'column',
          '@tablet': {
            flexDirection: 'row',
          },
        }}
        justifyContent={'spaceBetween'}
        gap={3}
        fullWidth
      >
        {props.children}
      </Flex>
    </Stack>
  )
}

export default MyPositions
