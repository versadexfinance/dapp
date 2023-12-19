import { useMemo } from 'react';
import { ethers, Contract, BigNumberish } from 'ethers';

import { config } from '@/web3/config';
import { routerAbi } from '@/web3/abis';
import { useContractRead } from 'wagmi';
import { Token, Tokens } from '../types';

interface Amount {
  in: string;
  out: string;
}


export function useConversion(
  amount: Amount,
  token: Tokens,
  supply1: string,
  supply2: string
): string | null {
  const args1: bigint[] = [
    ethers.utils.parseEther(amount.in.length ? amount.in : '0').toBigInt(),
    ethers.utils.parseEther(supply1).toBigInt(),
    ethers.utils.parseEther(supply2).toBigInt(),
  ];

  const args2: bigint[] = [
    ethers.utils.parseEther(amount.in.length ? amount.in : '0').toBigInt(),
    ethers.utils.parseEther(supply2).toBigInt(),
    ethers.utils.parseEther(supply1).toBigInt(),
  ];
  
  const args: bigint[] = token.ticker === 'WETH' ? args1 : args2;

  const result = useContractRead({
    address: config.contract.routerV2, // Replace with your contract address
    abi: routerAbi, // Replace with your contract ABI
    functionName: 'getAmountOut',
    args,
  });

  const formattedResult: string | null = useMemo(() => {
    if (result.status === 'success' && result.data !== null) {
      return ethers.utils.formatEther(result.data as BigNumberish);
    }
    // Handle errors or return a default value
    return null;
  }, [result.status, result.data]);


  return formattedResult;
}

  
  