import {  FetchBalanceArgs } from '@wagmi/core';
import { log } from 'console';
import { useAccount, useBalance } from 'wagmi';
import { config } from 'web3/config';

export function useTokenBalance(params : FetchBalanceArgs) {
    const { address } = useAccount();
    console.log("params",params);

    
    
    const { data, isError, isLoading } = useBalance({
        address: params.address,
        chainId: params.chainId,
        token:params.token,
        watch: !!params,
    });


    if(params.token == config.contract.weth){
        return null
    }
    console.log("data use token balance",data);

    console.log("Token address",config.contract.versadex);
    
    if (!address) return { data: null, isError: false, isLoading: true };

    return { data, isError, isLoading };
}