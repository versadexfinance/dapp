// 'use client';

import { Flex, Stack } from '@/components/box';

import Typography from '@/components/typography';
import PositionCard from '../position-card';
import Button from '@/components/button';

const MyPositions = () => {
  return (
    <Stack gap={2} css={{}}>
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
            color: '#BFBFBF'
            // verticalAlign: 'bottom'
            // display: 'flex',
            // flexDirection: 'column',
            // justifyContent: 'center'
          }}
        >
          My Positions
        </Typography>
        <Button
          css={{
            backgroundColor: 'transparent',
            color: '$primary',
            textTransform: 'capitalize',
            fontWeight: 300,
            fontSize: '16px',
            fontHeight: '20px'
          }}
        >
          <img src="/icons/resources-add.svg" />
          New Position
        </Button>
      </Flex>
      <Flex
        css={{
          flexDirection: 'column',
          '@tablet': {
            flexDirection: 'row'
          }
        }}
        justifyContent={'spaceBetween'}
        gap={3}
        fullWidth
      >
        <div
          style={{
            flex: 1
          }}
        >
          <PositionCard />
        </div>
        <div
          style={{
            flex: 1
          }}
        >
          <PositionCard />
        </div>
      </Flex>
    </Stack>
  );
};

export default MyPositions;
