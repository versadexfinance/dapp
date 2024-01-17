import React from 'react'
import { GridCardContainer } from '../styles'
import { Flex, Stack } from '@/components/box'
import Typography from '@/components/typography'

function PositionGraph() {
  return (
    <GridCardContainer
      css={{
        margin: 'auto',
        display: 'flex',
        opacity: 0.9,

        backgroundImage: 'url(/img/nft.png)',
        backgroundSize: 'contain',
        border: '1px solid #424242',
        height: '538px',
        width: '350px',
        position: 'relative',
        flexDirection: 'row',
        borderRadius: '40px',
      }}
    >
      <Typography
        css={{
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          position: 'absolute',
          fontSize: '12px',
          lineHeight: '14px',
          left: '5px',
          bottom: '41px',
          color: '#E1E1E1',
          letterSpacing: '2.34px',
        }}
      >
        2c85572D6925E3c538af011dA
      </Typography>
      <GridCardContainer
        css={{
          borderColor: 'rgba(255, 255, 255, 0.50)',
          height: '100%',
          // width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Stack gap={1}>
          <Typography
            css={{
              fontSize: '32px',
              lineHeight: '30px',
              color: '#E1E1E1',
              fontWeight: '600',
            }}
          >
            {'ETH'} / {'VDX'}
          </Typography>
          <Typography
            css={{
              fontSize: '24px',
              lineHeight: '32px',
              color: '#E1E1E1',
              fontWeight: '400',
            }}
          >
            0.3%
          </Typography>
        </Stack>

        <Stack
          css={{
            gap: '4px',
          }}
        >
          <Flex
            css={{
              borderRadius: '8px',

              fontSize: '16px',
              lineHeight: '24px',
            }}
          >
            <div
              style={{
                borderRadius: '8px',
                background: 'rgba(10, 10, 10, 0.50)',
                display: 'flex',
                gap: '8px',
                padding: '4px 12px',
              }}
            >
              <Typography
                css={{
                  color: '#AFAFAF',
                }}
              >
                ID:
              </Typography>
              <Typography>234</Typography>
            </div>
          </Flex>
          <Flex
            css={{
              borderRadius: '8px',

              fontSize: '16px',
              lineHeight: '24px',
            }}
          >
            <div
              style={{
                borderRadius: '8px',
                background: 'rgba(10, 10, 10, 0.50)',
                display: 'flex',
                gap: '8px',
                padding: '4px 12px',
              }}
            >
              <Typography
                css={{
                  color: '#AFAFAF',
                }}
              >
                Min Tick:
              </Typography>
              <Typography>87190</Typography>
            </div>
          </Flex>
          <Flex
            css={{
              borderRadius: '8px',

              fontSize: '16px',
              lineHeight: '24px',
            }}
          >
            <div
              style={{
                borderRadius: '8px',
                background: 'rgba(10, 10, 10, 0.50)',
                display: 'flex',
                gap: '8px',
                padding: '4px 12px',
              }}
            >
              <Typography
                css={{
                  color: '#AFAFAF',
                }}
              >
                Max Tick:
              </Typography>
              <Typography>762190</Typography>
            </div>
          </Flex>
        </Stack>
      </GridCardContainer>
      <Typography
        css={{
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          position: 'absolute',
          fontSize: '12px',
          lineHeight: '14px',
          right: '5px',
          top: '41px',
          color: '#E1E1E1',
          letterSpacing: '2.34px',
        }}
      >
        0x76eCA5648453A962c85572D6925E3c538af011dA
      </Typography>
    </GridCardContainer>
  )
}

export default PositionGraph
