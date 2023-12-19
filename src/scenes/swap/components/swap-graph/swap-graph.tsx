'use client';

import { Stack } from '@/components/box';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';

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
      <TradingViewWidget width={"100%"}  theme={Themes.DARK} symbol={"ETHUSDT"}/>
    </Stack>
  );
};

export default SwapGraph;
