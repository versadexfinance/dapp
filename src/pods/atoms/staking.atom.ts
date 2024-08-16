import { Amount, tokenList } from '@/web3/types'
import { atom } from 'recoil'

export const stakingTokenState = atom({
  key: 'stakingTokenState',
  default: tokenList[0],
})

export const stakingAmountState = atom({
  key: 'stakingAmountState',
  default: '',
})
