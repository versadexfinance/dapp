import { useCallback } from 'react';
import { erc20ABI, useAccount } from 'wagmi';
import {  writeContract } from 'wagmi/actions';
import { ethers } from 'ethers';


import { config } from '@/web3/config';
import { Tokens } from '@/web3/types';
import { routerAbi } from '@/web3/abis';

const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/eth_goerli");


export function useSwap({
    amount,
    tokenIn,
    tokenOut,
    ethBalance,
}: {
    amount: string;
    tokenIn: Tokens;
    tokenOut: Tokens;
    ethBalance: bigint;
}) {
    const { address } = useAccount();
    const ethBalanceWei = ethers.BigNumber.from(ethBalance)
    console.log("1232");
    const inWei = ethers.utils.parseEther(amount.length ? amount: "0");
    console.log("asdasd");

    const contract = new ethers.Contract(tokenIn ?tokenIn?.address:"", erc20ABI , provider);

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
                    args: ["0", [config.contract.weth, tokenOut?.address], address, Date.now() + 1000 * 60 * 10],            
                    value: inWei.toBigInt()
                });
    

                console.log(result);
                
                // await waitWriteContract();

            }else if(tokenOut?.ticker === "WETH"){

                //Check Allowance

                const resultAllowance = await contract.allowance(address, config.contract.routerV2)

                // Handlear qcuando falla el allowance
                console.log("Allowance",resultAllowance.toString());
                
                if(resultAllowance.lt(inWei)){
                    // No entrar si ya hay un aproval en curso
                    const resultApprove = await writeContract({
                        address: tokenIn?.address as  `0x${string}`,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [config.contract.routerV2, inWei.toBigInt()],
                    });

                    //Rejectar si no se aprueba
                    // COmprobar estado de la transaccion
                    console.log(resultApprove);
                }

                if(resultAllowance.gte(inWei)){
                    const resultSwap = await writeContract({
                        address: config.contract.routerV2,
                        abi: routerAbi,
                        functionName: 'swapExactTokensForETH',
                        //EL 0 deberia considerar slippage
                        args: [inWei, "0", [ tokenIn?.address,config.contract.weth], address, Date.now() + 1000 * 60 * 10],            
                    });
                    console.log("resultSwap",resultSwap);
                }
                // Solo en el caso de que el result allowance sea mayor o igual que in wei
            
        
                


                // const { wait: waitWriteContract } = await writeContract({
                //     addressOrName: tokenIn?.address as  `0x${string}`,
                //     functionName: 'swapTokensForExactETH',
                //     args: [config.contract.routerV2, amountBN],
                // });
    
                // await waitWriteContract();
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
        } catch (error: any) {
            console.error(error.message || error);
        }
    }, [address, amount, tokenIn, tokenOut]);

    return swap;
}