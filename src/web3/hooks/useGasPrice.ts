// "use client";


// import { ethers } from 'ethers';

import { routerAbi } from '@/web3/abis';
import { config } from '@/web3/config';
import { Tokens } from '@/web3/types';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// export async function getEstimatedGasFee(tokenIn: Tokens, tokenOut: Tokens, address:string) {
//     if (!address) return { data: null, isError: false, isLoading: true };
    
//     console.log("ADDRESS",address);
    
//     const gasPrice = await provider.getGasPrice();
//     let functionGasFees
//     if(tokenIn?.ticker == "WETH"){
//          functionGasFees = await  contract.estimateGas.swapExactETHForTokens(
//             "0",[config.contract.weth, config.contract.versadex], address, Date.now() + 1000 * 60 * 10, { value: "10000000000000000" }
//         )
//     }else{

//         functionGasFees = await  contract.estimateGas.swapExactETHForTokens(
//             "0",[config.contract.weth, config.contract.versadex], address, Date.now() + 1000 * 60 * 10, { value: "10000000000000000" }
//         )
//         //  functionGasFees = await  contract.estimateGas.swapExactTokensForETH(
//         //     "0",[config.contract.weth, config.contract.versadex], address, Date.now() + 1000 * 60 * 10
//         // )
//     }
    

// console.log("FUNCTION GAS FEES",functionGasFees.toNumber());


//     const finalGasFee = gasPrice.mul(functionGasFees)

//     // console.log("data",data);

//     // console.log("Token address",config.contract.versadex);
//     console.log("Precio ,",finalGasFee);
        
    

//     const gasFeeEthPrice = ethers.utils.formatUnits(finalGasFee.toString(), "ether");

//     console.log("Precio en ETH",gasFeeEthPrice);

//     return gasFeeEthPrice;
    
//     if (!address) return { data: Number(gasFeeEthPrice), isError: false, isLoading: true };    
// }






// export const useEstimatedGasFee = (tokenOne: Tokens, tokenTwo: Tokens, address: string) => {
//   const [gas, setGas] = useState<string | {
//     data: null;
//     isError: boolean;
//     isLoading: boolean;
// } >({ data: null, isError: false, isLoading: true });

//   // useEffect(() => {
//   //   const fetchGas = async () => {
//   //     const gasValue = await getEstimatedGasFee(tokenOne, tokenTwo, address);
//   //     setGas({
//   //       data: gasValue,
//   //       isError: false,
//   //       isLoading: false
//   //     });
//   //   };

//   //   fetchGas();
//   // }, [tokenOne, tokenTwo, address]);

  
//    console.log("GAS", gas);
     
//   return gas;
// };



// import { ethers } from "ethers";
// import { useEffect, useState } from "react";
// import { useAccount, useContractRead, usePublicClient, useWalletClient } from "wagmi";
// import { getContract, getWalletClient } from "wagmi/actions";
// import { routerAbi } from "web3/abis";
// import { config } from "web3/config";

// export const useEstimatedGasFee = (tokenOne: Tokens, tokenTwo: Tokens, address: string) => {
//     const [gas, setGas] = useState(null);



//         const provider = usePublicClient();

//         // const sendEthRequest = {
//         //     to: '0x5F70Ddd9908B04f952b9cB2A6F8E4D451725ceDC',
//         //     value: ethers.utils.parseEther('0.1'),
//         //     signer
//         //   };


//         //   console.log("Signer",signer.data?.account);
//           console.log("Provider",provider);
          
        
//     // useContractRead()

//     console.log(address);
    
 

//     // useEffect(() => {
//     //     async function estimateGasAmount() {
//     //         const signer = await getWalletClient({
//     //             chainId: 5            
//     //         });
    
//     //         const contract = await getContract({
//     //             address: config.contract.routerV2, // Replace with your contract address
//     //             abi: routerAbi, // Replace with your contract ABI
//     //             walletClient: signer
//     //           })
        
//     //         const amount = await contract.estimateGas.swapExactETHForTokens(
//     //             [ "10000000", [config.contract.weth, config.contract.versadex], "0xe7b922dca9e20d320386F957c56eA999a0AaF0F7",  Date.now() + 1000 * 60 * 10]
//     //         )
//     //         console.log("GAS", amount);
            
//     //         return amount        
//     //     }
        
//     //     if (true) {
//     //             estimateGasAmount()
          
            
//     //     }
//     // }, [provider])


//     useEffect(() => {
//         async function estimateGasAmount() {
//             const amount = await provider.estimateGas({
//                 to: '0x5F70Ddd9908B04f952b9cB2A6F8E4D451725ceDC',
//                 value: utils.parseEther('0.1')
//             })
//         }
//         const result = estimateGasAmount()
//         console.log("GAS", result);
        
//     }, [provider])
//     // const result = useContractRead({
//     //   address: config.contract.routerV2, // Replace with your contract address
//     //   abi: routerAbi, // Replace with your contract ABI
//     //   functionName: 'getAmountOut',
//     //   args:,
//     // });
  
  
  
    
  
//     return gas;
//   };
  
  
  



// export function useEstimatedGasFee(tokenIn: Tokens, tokenOut: Tokens, address: string) {
//   const [gasFee, setGasFee] = useState<number | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState(false);

//   useEffect(() => {
//     const calculateGasFee = async () => {
//       try {
//         if (!address) {
//           setGasFee(null);
//           setIsLoading(true);
//           setIsError(false);
//           return;
//         }

//         console.log('ADDRESS', address);

//         const gasPrice = await provider.getGasPrice();
//         let functionGasFees;

//         if (tokenIn?.ticker === 'WETH') {
//           functionGasFees = await contract.estimateGas.swapExactETHForTokens(
//             '0',
//             [config.contract.weth, config.contract.versadex],
//             address,
//             Date.now() + 1000 * 60 * 10,
//             { value: '10000000000000000' }
//           );
//         } else {
//           functionGasFees = await contract.estimateGas.swapExactETHForTokens(
//             '0',
//             [config.contract.weth, config.contract.versadex],
//             address,
//             Date.now() + 1000 * 60 * 10,
//             { value: '10000000000000000' }
//           );
//           // Uncomment the following block if you want to handle swapExactTokensForETH as well
//           // functionGasFees = await contract.estimateGas.swapExactTokensForETH(
//           //   '0',
//           //   [config.contract.weth, config.contract.versadex],
//           //   address,
//           //   Date.now() + 1000 * 60 * 10
//           // );
//         }

//         console.log('FUNCTION GAS FEES', functionGasFees.toNumber());

//         const finalGasFee = gasPrice.mul(functionGasFees);

//         console.log('Precio ,', finalGasFee);

//         const gasFeeEthPrice = ethers.utils.formatUnits(finalGasFee.toString(), 'ether');

//         console.log('Precio en ETH', gasFeeEthPrice);

//         setGasFee(Number(gasFeeEthPrice));
//         setIsError(false);
//       } catch (error) {
//         console.error('Error calculating gas fee:', error);
//         setIsError(true);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     calculateGasFee();
//   }, [tokenIn, tokenOut, address]);

//   return { gasFee, isLoading, isError };
// }

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

        console.log('ADDRESS', address);

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

        console.log('FUNCTION GAS FEES', functionGasFees.toNumber());

        const gasFeeWei = gasPrice.mul(functionGasFees);

        console.log("Gas",gasPrice.toString());
        

        console.log('Gas Fee in Wei:', gasFeeWei.toString());

        const gasFeeEthPrice = ethers.utils.formatUnits(gasFeeWei, 'ether');

        console.log('Gas Fee in ETH:', gasFeeEthPrice);

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
