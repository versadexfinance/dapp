// SwapButton.js
import React from 'react';
import Button from '@/components/button';

const SwapButton = ({
  address,
  isDisconnected,
  fetchDexSwap
}: {
  address: string;
  isDisconnected: boolean;
  fetchDexSwap: () => void;
}) => {
  return (
    <Button
      css={{
        color: '#020202',
        fontSize: '16px',
        lineHeight: '24px',
        background: 'linear-gradient(90deg, #EBFE64 -25.87%, #8CEA69 100%)',
        padding: '12px  40px'
      }}
      fullWidth
      onClick={fetchDexSwap}
      disabled={!address || isDisconnected}
    >
      {!isDisconnected ? 'SWAP' : 'CONNECT WALLET'}
    </Button>
  );
};

export default SwapButton;
