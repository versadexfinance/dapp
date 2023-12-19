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
    

    const { address } = useAccount();
    const allowance = useAllowance(address as `0x${string}`)
    const ethBalanceWei = ethers.BigNumber.from(ethBalance)
    const inWei = ethers.utils.parseEther(amount.in.length ? amount.in: "0");
    const outWei = ethers.utils.parseEther(amount.out.length ? amount.out: "0");
    

    const outSlippage = maxSlippage.length && maxSlippage != "0"? Number(amount.out) * (1-(Number(maxSlippage) / 100)):0

    console.log("Out wei",amount.out);
    console.log("Out wei slippage", outSlippage);
    

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
           
           

            console.log("Balance token in",balanceTokenIn, "ETH",ethers.utils.formatEther(ethBalanceWei));
            
            if(tokenIn?.ticker === "WETH"){
                const result = await writeContract({
                    address: config.contract.routerV2,
                    abi: routerAbi,
                    functionName: 'swapExactETHForTokens',
                    args: [ethers.utils.parseEther(outSlippage.toString()), [config.contract.weth, tokenOut?.address], address, Date.now() + Number(transactionDeadline) * 60 * 10],            
                    value: inWei.toBigInt()
                });
            }else if(tokenOut?.ticker === "WETH"){

                //Check Allowance

                const resultAllowance = await contract.allowance(address, config.contract.routerV2)

                // Handlear qcuando falla el allowance
                console.log("Allowance",resultAllowance.toString());
                
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
                    
                    const waitForTx =  await waitForTransaction({hash});

                    if(allowance.lte(inWei)){
                        setIsApproving(false);
                    }

                    console.log("waitForTx",waitForTx);

                }


                //Slippage 0 - 100
                console.log("Value with slippage", inWei.mul( ethers.BigNumber.from(1-(Number(maxSlippage) / 100))));
                
                if(resultAllowance.gte(inWei)){
                    const resultSwap = await writeContract({
                        address: config.contract.routerV2,
                        abi: routerAbi,
                        functionName: 'swapExactTokensForETH',
                        args: [inWei, ethers.utils.parseEther(outSlippage.toString()), [ tokenIn?.address,config.contract.weth], address, Date.now() + Number(transactionDeadline) * 60 * 10],            
                    });
                    console.log("resultSwap",resultSwap);
                }
            }else{
                //Allowance token in

                // TOKEN TO TOKEN



            }


            // const { wait: waitSwap } = await writeContract({
            //     addressOrName: config.contract.routerV2,
            //     functionName: 'buy',
            //     args: [0, amountBN],
            // });

            // await waitSwap();

            // const pool = await readContract({
            //     addressOrName: config.contract.TokenSwap,
            //     functionName: 'pools',
            //     args: [0],
            // });

            // const swappedAmount = new Big(amount)
            //     .div(new Big(pool.exchageRate))
            //     .times(PPM)
            //     .toPrecision(2);


            // console.log(`Congrats! You got ${swappedAmount} ${tokenOut.toUpperCase()}.`);
            return isApproving
        } catch (error: any) {
            setIsApproving(false);
            console.error(error.message || error);
        }
    }, [address,allowance, contract, ethBalanceWei, inWei, tokenIn?.address, tokenIn?.ticker, tokenOut?.address, tokenOut?.ticker]);

    return {swap, isApproving, contract};
}