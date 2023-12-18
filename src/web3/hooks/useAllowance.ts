import { ethers } from 'ethers';
import { erc20ABI, useContractRead } from 'wagmi';
import { config } from '../config';
import { useRecoilState } from 'recoil';
import { amountState, tokenInState } from '@/pods/atoms/swap-selected-tokens.atom';
import { useTokenBalance } from '.';
import { fetchTransaction } from '@wagmi/core'





export function useAllowance(
    ownerAddress: `0x${string}`,
){
    
 
    // const transaction = await fetchTransaction({
    //   hash: '0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204ef84bfed1be16dfba1b22060',
    // })
    
    const [tokenIn, setTokenInState] = useRecoilState(tokenInState);
    const [amount, setAmount] = useRecoilState(amountState);
    


    const result = useContractRead({
      address: tokenIn.address as `0x${string}`, 
      abi: erc20ABI,
      functionName: 'allowance',
      args:[ ownerAddress, config.contract.routerV2],
      watch: true,
      
    });

  
    return ethers.BigNumber.from(result.data ?? 0)
}
  