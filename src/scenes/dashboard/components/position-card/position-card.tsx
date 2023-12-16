// 'use client';

import { Flex, Stack } from '@/components/box';
import CoinImagePair from '@/components/coin-image-pair/coin-image-pair';

import Typography from '@/components/typography';
import { Container } from './styles';

const PositionCard = () => {
  return (
    <Container>
      <Flex
        gap={4}
        justifyContent={'spaceBetween'}
        alignItems={'center'}
        fullWidth
      >
        <Flex alignItems={'end'}>
          <CoinImagePair
            coin1_src="/img/DAI.png"
            coin2_src="/img/ETH.png"
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
                  lineHeight: '32px'
                }
              }}
            >
              {'DAI'} / {'ETH'}
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
              background: '#020202'
            }}
          >
            0.3%
          </Typography>
        </Flex>
        <Flex gap={1}>
          <Typography
            css={{
              fontSize: '12px',
              color: '#009851'
            }}
          >
            In Range
          </Typography>
          <img src="/icons/Ellipse.svg" />
        </Flex>
      </Flex>
      <Flex
        gap={1}
        justifyContent={'spaceBetween'}
        css={{
          flexWrap: 'wrap',
          paddingBottom: '16px',
          borderBottom: '1px solid #333'
        }}
        fullWidth
      >
        <Flex gap={'1'}>
          <Typography
            css={{
              color: '#797979',
              fontSize: '16px',
              lineHeight: '24px'
            }}
          >
            My APR:
          </Typography>
          <Typography>30.69%</Typography>
        </Flex>
        <Flex gap={1}>
          <Typography
            css={{
              color: '#797979',
              fontSize: '16px',
              lineHeight: '24px'
            }}
          >
            Total value locked:
          </Typography>
          <Typography
            css={{
              color: '#80DCB1',
              textAlign: 'right',
              fontSize: '16px',

              lineHeight: '24px'
            }}
          >
            $12,000
          </Typography>
        </Flex>
      </Flex>
      <Flex
        justifyContent={'spaceBetween'}
        css={{
          flexWrap: 'wrap',
          gap: 1,
          paddingTop: '16px'
        }}
      >
        <Flex alignItems={'center'} justifyContent={'start'} gap={1}>
          <img src="/img/DAI.png" width={'16px'} height={'16px'} />
          <Typography
            css={{
              color: '#F7FFBB',
              fontSize: '14px',
              fontHeight: '24px'
            }}
          >
            {1} {'DAI'} = {'<' + 0.0001} {'ETH'}
          </Typography>
        </Flex>
        <Flex alignItems={'center'} gap={1}>
          <img src="/img/ETH.png" width={'16px'} height={'16px'} />
          <Typography
            css={{
              color: '#F7FFBB',
              fontSize: '14px',
              fontHeight: '24px'
            }}
          >
            {1} {'ETH'} = {'<' + 0.0001} {'ETH'}
          </Typography>
        </Flex>
      </Flex>
    </Container>
  );
};

export default PositionCard;
