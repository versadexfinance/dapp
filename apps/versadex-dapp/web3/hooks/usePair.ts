import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { factoryAbi, pairAbi } from 'web3/abis';
import { config } from 'web3/config';

import Big from 'big.js';



type PairSupply = {
    tokenOne: number;
    tokenTwo: number;
    ratio: number;
  };

const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/eth_goerli");
const contract = new ethers.Contract(config.contract.factoryV2, factoryAbi, provider);

export function usePair(address1: string, address2: string) {
    const [pair, setPair] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchPair = async () => {
        try {
          const result = await contract.getPair(address1, address2);
          setPair(result);
        } catch (error) {
          console.error('Error fetching pair:', error);
        }
      };
  
      fetchPair();
    }, [address1, address2]);
  
    return pair;
}

export function usePrices(pairAddress: string | null) {

    
    const [prices, setPrices] = useState<PairSupply | null>(null);
  
    
    useEffect(() => {
      const fetchPrices = async () => {
        try {
            if (!pairAddress) return;
          const contractPair = new ethers.Contract(pairAddress, pairAbi, provider);
          
          const totalReserves = await contractPair.getReserves();
          const token1 = Number(ethers.utils.formatUnits(totalReserves[0], "ether"));
          const token2 = Number(ethers.utils.formatUnits(totalReserves[1], "ether"));
  
          setPrices({
            tokenOne: token1,
            tokenTwo: token2,
            ratio: Big(token1).div(token2).toNumber(),
            
          });
        } catch (error) {
          console.error('Error fetching prices:', error);
        }
      };
  
      fetchPrices();
    }, [pairAddress]);
  
    console.log("Prices",prices);

    return prices;
  }
  
  
  