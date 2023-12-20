// "use client";


// import { ethers } from 'ethers';

import { routerAbi } from '@/web3/abis';
import { config } from '@/web3/config';
import { Tokens } from '@/web3/types';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';



const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/eth_goerli");
const contract = new ethers.Contract(config.contract.routerV2, routerAbi, provider);

export function useEstimatedGasFee(tokenIn: Tokens, tokenOut: Tokens, address: string) {
  const [gasFee, setGasFee] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const calculateGasFee = async () => {
      try {
        if (!address) {
          setGasFee(null);
          setIsLoading(false);
          setIsError(false);
          return;
        }


        const gasPrice = await provider.getGasPrice();
        let functionGasFees;

        // 1 VERSA = 100000000000
        // 1 ETH  = 100000000000 wei


        if (tokenIn?.ticker === 'WETH') {
          functionGasFees = await contract.estimateGas.swapExactETHForTokens(
            '0',
            [config.contract.weth, config.contract.versadex],
            address,
            Date.now() + 1000 * 60 * 10,
            { value: '100000000000000000' }
          );
        } else {
        //   functionGasFees = await contract.estimateGas.swapExactTokensForETH(
        //     '0',
        //     [config.contract.versadex, config.contract.weth],
        //     address,
        //     Date.now() + 1000 * 60 * 10
        //   );

        functionGasFees = await contract.estimateGas.swapExactETHForTokens(
            '0',
            [config.contract.weth, config.contract.versadex],
            address,
            Date.now() + 1000 * 60 * 10,
            { value: '' }
          );
        }

        const gasFeeWei = gasPrice.mul(functionGasFees);
        

        const gasFeeEthPrice = ethers.utils.formatUnits(gasFeeWei, 'ether');

        setGasFee(Number(gasFeeEthPrice));
        setIsError(false);
      } catch (error) {
        console.error('Error calculating gas fee:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    calculateGasFee();
  }, [tokenIn, tokenOut, address]);

  return { gasFee, isLoading, isError };
}
