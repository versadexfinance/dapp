// 'use client';

import { Flex, Stack } from '@/components/box';
import Typography from '@/components/typography';
import Input from '@/components/input';
import { Tokens } from '@/web3/types';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import {  maxSlippageState, tokenInState, tokenOutState, transactionDeadlineState,  } from '@/pods/atoms/swap-selected-tokens.atom';

type SwapSettingsProps = {
  closeSettings: () => void;
};

const SwapSettings = (props: SwapSettingsProps) => {

  const [maxSlippage, setMaxSlippage] = useRecoilState(maxSlippageState);
  const [transactionDeadline, setTransactionDeadline] = useRecoilState(transactionDeadlineState);





  return (
    
    <Stack gap={2} css={
      {
        background:"#131313",
        border: '1px solid #424242',
        padding: '16px',
        borderRadius: '8px',
        width:'fit-content',
        position: 'absolute',
        right:16,
        top: 71,
        zIndex: 100,
      }
    }>
      <Flex justifyContent={"spaceBetween"}>
        <Typography>Max Slippage</Typography>
        <Typography
            css={{
              fontSize: '12px',
              lineHeight: '16px',
              color: '$primary',
              padding: '4px 8px',
              borderRadius: '12px',
              cursor: 'pointer',
              background: maxSlippage === "" ? 'rgba(235, 254, 100, 0.10)' : 'transparent',
              '&:hover': {
                scale: 1.1
              }
            }}
            onClick={() => {
              setMaxSlippage("");
            }}
          >
            AUTO
        </Typography>
      </Flex>

      
      <Input
        value={maxSlippage}
        
        onChange={(e) => setMaxSlippage(Number(e.target.value)>100?maxSlippage:e.target.value)}
        max={100}
        size={'sm'}
        rightElement={<Typography>%</Typography>}
        type="number"
        placeholder="0.5"/>
      
      <Typography>Transaction deadline</Typography>
      <Input
        value={transactionDeadline}
        
        onChange={(e) => setTransactionDeadline(Number(e.target.value))}
        
        size={'sm'}
        rightElement={<Typography>minutes</Typography>}
        type="number"
        placeholder="10"/>
      </Stack>

  );
};

export default SwapSettings;
