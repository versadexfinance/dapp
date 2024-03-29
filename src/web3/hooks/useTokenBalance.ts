import { FetchBalanceArgs, FetchBalanceResult } from '@wagmi/core'
import { log } from 'console'
import { useAccount, useBalance } from 'wagmi'
import { config } from '@/web3/config'

export function useTokenBalance(params: FetchBalanceArgs) {
  const { data, isError, isLoading } = useBalance({
    address: params.address,
    chainId: params.chainId,
    token: params.token,
    watch: true,
  })

  if (params.token == config.contract.weth) {
    return null
  }

  return { data, isError, isLoading }
}
