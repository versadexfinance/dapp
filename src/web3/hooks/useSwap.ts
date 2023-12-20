import { useCallback, useState } from 'react';
import { erc20ABI, useAccount } from 'wagmi';
import {  waitForTransaction, writeContract } from 'wagmi/actions';
import { ethers } from 'ethers';


import { config } from '@/web3/config';
import { Tokens } from '@/web3/types';
import { routerAbi } from '@/web3/abis';
import { useRecoilState } from 'recoil';
import { amountState, maxSlippageState, transactionDeadlineState } from '@/pods/atoms/swap-selected-tokens.atom';
import { useAllowance } from './useAllowance';

const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/eth_goerli");


export function useSwap({
    tokenIn,
    tokenOut,
    ethBalance,
}: {
    tokenIn: Tokens;
    tokenOut: Tokens;
    ethBalance: bigint;
}) {
    const [maxSlippage, setMaxSlippage] = useRecoilState(maxSlippageState);
    const [transactionDeadline, setTransactionDeadline] = useRecoilState(transactionDeadlineState);
    const [amount,setAmount ] = useRecoilState(amountState);
    const [isApproving,setIsApproving ] = useState(false);
    const [isLoading,setIsLoading ] = useState(false);
    const [txHash,setTxHash ] = useState<{hash:string, typeTx:string}>({hash:"", typeTx:""});


    const { address } = useAccount();
    const allowance = useAllowance(address as `0x${string}`)
    const ethBalanceWei = ethers.BigNumber.from(ethBalance)
    const inWei = ethers.utils.parseEther(amount.in.length ? amount.in: "0");
    const outWei = ethers.utils.parseEther(amount.out.length ? amount.out: "0");
    

    const outSlippage = maxSlippage.length && maxSlippage != "0"? Number(amount.out) * (1-(Number(maxSlippage) / 100)):0

    
    

    const contract = new ethers.Contract(tokenIn ? tokenIn?.address:"", erc20ABI , provider);

    const swap = useCallback(async () => {
        try {
            if (!address) {
                console.error('Please connect your wallet.');
                return;
            }

            let balanceTokenIn = ethers.BigNumber.from(0);

           if(tokenIn?.ticker !== "WETH"){
            const balance = await  contract.balanceOf(address) ?? "0"
            balanceTokenIn = ethers.BigNumber.from(balance ?? 0)  // Wei

            if (balanceTokenIn.lt( inWei)) {
                console.error(`You don't have enough ${tokenIn?.ticker.toUpperCase()} for this swap.`);
                return;
            }
           } else{
            if (ethBalanceWei.lt(inWei)) {
                console.error(`You don't have enough ${tokenIn?.ticker.toUpperCase()}  for this swap.`);
                return;
            }
           }
           
           

            setIsLoading(true);
            if(tokenIn?.ticker === "WETH"){
                const {hash} = await writeContract({
                    address: config.contract.routerV2,
                    abi: routerAbi,
                    functionName: 'swapExactETHForTokens',
                    args: [ethers.utils.parseEther(outSlippage.toString()), [config.contract.weth, tokenOut?.address], address, Date.now() + Number(transactionDeadline) * 60 * 10],            
                    value: inWei.toBigInt()
                });
                setTxHash({hash:hash, typeTx:"swap"});


            }else if(tokenOut?.ticker === "WETH"){

                //Check Allowance

                const resultAllowance = await contract.allowance(address, config.contract.routerV2)

                // Handlear qcuando falla el allowance
                
                
                if(resultAllowance.lt(inWei)){
                    // No entrar si ya hay un aproval en curso
                    // setTimeout(() => {
                    // }, 500);
                    setIsApproving(true);    
                    
                    const {hash} = await writeContract({
                        address: tokenIn?.address as  `0x${string}`,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [config.contract.routerV2, inWei.toBigInt()],
                    });

                    //Rejectar si no se aprueba
                    // COmprobar estado de la transaccion
                    
                    //  const waitForTx =  await waitForTransaction({hash});
                    setTxHash({hash:hash, typeTx:"approve"}); 
                    if(allowance.lte(inWei)){
                        setIsApproving(false);
                    }


                }


                //Slippage 0 - 100
                
                if(resultAllowance.gte(inWei)){
                    const {hash} = await writeContract({
                        address: config.contract.routerV2,
                        abi: routerAbi,
                        functionName: 'swapExactTokensForETH',
                        args: [inWei, ethers.utils.parseEther(outSlippage.toString()), [ tokenIn?.address,config.contract.weth], address, Date.now() + Number(transactionDeadline) * 60 * 10],            
                    });
                    setTxHash({hash:hash, typeTx:"swap"});                }
            }else{
                //Allowance token in

                // TOKEN TO TOKEN



            }


            setIsLoading(false);

            return isApproving
        } catch (error: any) {
            
            setIsApproving(false);
            setIsLoading(false);
            console.error(error.message || error);
        }
    }, [address, allowance, contract, ethBalanceWei, inWei, tokenIn?.address, tokenIn?.ticker, tokenOut?.address, tokenOut?.ticker, isApproving, maxSlippage, outSlippage, transactionDeadline]);

    return {swap, isApproving, contract, isLoading, txHash};
}