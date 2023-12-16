// 'use client';

import { Flex, Stack } from '@/components/box';

import Typography from '@/components/typography';

import Button from '@/components/button';

const SwapGraph = () => {
  return (
    <Stack
      css={{
        // flexDirection: 'column',
        position: 'relative',
        height: '220px',

        '@tablet': {
          height: 'auto',
          flex: 7,
          // maxHeight: '650px',
          aspectRatio: '100% / 65%',
          position: 'relative'
        }
      }}
    >
      <Stack
        css={{
          flex: 7,
          backgroundImage: "url('/img/swap-graph.png')",
          width: '100%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          height: '100%',
          aspectRatio: '100% / 65%',

          filter: 'blur(8px)'
        }}
      >
        x
      </Stack>
      <Flex
        css={{
          textTransform: 'uppercase',
          fontWeight: 'bold',
          color: '$secondary',
          fontSize: '48px',
          zIndex: 2,
          position: 'absolute',
          top: '50%', // Center the text vertically
          left: '50%', // Center the text horizontally
          transform: 'translate(-50%, -50%)', // Center the text precisely
          textAlign: 'center'
        }}
      >
        <Typography
          css={{
            fontWeight: 800
          }}
        >
          coming soon
          <Typography
            css={{
              fontWeight: 800,
              color: '$primary',
              display: 'inline'
            }}
          >
            .
          </Typography>
        </Typography>{' '}
      </Flex>
    </Stack>
  );
};

export default SwapGraph;
