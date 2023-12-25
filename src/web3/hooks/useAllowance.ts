import { ethers } from 'ethers'
import { erc20ABI, useContractRead } from 'wagmi'
import { config } from '../config'
import { useRecoilState } from 'recoil'
import {
  amountState,
  tokenInState,
} from '@/pods/atoms/swap-selected-tokens.atom'

export function useAllowance(ownerAddress: `0x${string}`) {
  const [tokenIn, setTokenInState] = useRecoilState(tokenInState)
  const [amount, setAmount] = useRecoilState(amountState)

  const result = useContractRead({
    address: tokenIn.address as `0x${string}`,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [ownerAddress, config.contract.routerV2],
    watch: true,
  })

  return ethers.BigNumber.from(result.data ?? 0)
}
