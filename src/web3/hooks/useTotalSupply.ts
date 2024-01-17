import { erc20ABI, useContractRead } from 'wagmi'

export function useTotalSupply(pairAddress: `0x${string}`) {
  const result = useContractRead({
    address: pairAddress as `0x${string}`,
    abi: erc20ABI,
    functionName: 'totalSupply',
    watch: false,
  })

  return result.data
}
