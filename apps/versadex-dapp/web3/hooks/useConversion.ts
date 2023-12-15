import { useMemo } from 'react';
import { ethers, Contract } from 'ethers';

import { config } from 'web3/config';
import { routerAbi } from 'web3/abis';
import { useContractRead } from 'wagmi';

interface Amount {
  in: string;
  out: string;
}

interface ConversionResult {
  status: 'success' | 'error';
  data: string | null;
}

export function useConversion(
  amount: Amount,
  tokenTicker: string,
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

  const args: bigint[] = tokenTicker === 'WETH' ? args1 : args2;

  const result = useContractRead({
    address: config.contract.routerV2, // Replace with your contract address
    abi: routerAbi, // Replace with your contract ABI
    functionName: 'getAmountOut',
    args,
  });

  const formattedResult: string | null = useMemo(() => {
    if (result.status === 'success' && result.data !== null) {
      return ethers.utils.formatEther(result.data);
    }
    // Handle errors or return a default value
    return null;
  }, [result.status, result.data]);

  console.log('result', formattedResult);

  return formattedResult;
}

  

// export function usePrices(pairAddress: string | null) {

    
//     const [prices, setPrices] = useState<PairSupply | null>(null);
  
    
//     useEffect(() => {
//       const fetchPrices = async () => {
//         try {
//             if (!pairAddress) return;
//           const contractPair = new ethers.Contract(pairAddress, pairAbi, provider);
          
//           const totalReserves = await contractPair.getReserves();
//           const token1 = Number(ethers.utils.formatUnits(totalReserves[0], "ether"));
//           const token2 = Number(ethers.utils.formatUnits(totalReserves[1], "ether"));
  
//           setPrices({
//             tokenOne: token1,
//             tokenTwo: token2,
//             ratio: Big(token1).div(token2).toNumber(),
            
//           });
//         } catch (error) {
//           console.error('Error fetching prices:', error);
//         }
//       };
  
//       fetchPrices();
//     }, [pairAddress]);
  
//     console.log("Prices",prices);

//     return prices;
//   }






// publicClient

// export async function getConversion(
//   amount: Amount,
//   tokenTicker: string,
//   supply1: string,
//   supply2: string
// ) {
//   console.log("tokenFrom", amount.in, "tokenTicker", tokenTicker, "supply1", supply1, "supply2", supply2);
  
//   try {
//     if (Number(amount.in) <= 0) return '0';

//     let result;
//     if (tokenTicker === "WETH") {
//       result = await contract.getAmountOut(
//         ethers.utils.parseEther(amount.in),
//         ethers.utils.parseEther(supply1),
//         ethers.utils.parseEther(supply2)
//       );
//     } else {
//       result = await contract.getAmountOut(
//         ethers.utils.parseEther(amount.in),
//         ethers.utils.parseEther(supply2),
//         ethers.utils.parseEther(supply1)
//       );
//     }

//     return ethers.utils.formatEther(result);
//   } catch (error) {
//     console.error('Error fetching pair:', error);
//     return '0';
//   }
// }
  
  
  