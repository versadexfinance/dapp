import { Amount, tokenList } from '@/web3/types'
import { atom } from 'recoil'

export const lpPairOneState = atom({
  key: 'lpPairOneState',
  default: tokenList[0],
})

export const lpPairTwoState = atom({
  key: 'lpPairTwoState',
  default: null,
})

export const lpAmountState = atom({
  key: 'lpAmountState',
  default: {
    in: '',
    out: '',
  } as Amount,
})

export const removeLiquidityPairOneState = atom({
  key: 'removeLiquidityPairOneState',
  default: tokenList[0],
})

export const removeLiquidityPairTwoState = atom({
  key: 'removeLiquidityPairTwoState',
  default: null,
})

export const myLpsState = atom({
  key: 'myLpsState',
  default: [],
})

export const lpsUpdatedState = atom({
  key: 'lpsUpdatedState',
  default: false,
})

export const removeLiquidityAmountState = atom({
  key: 'removeLiquidityAmountState',
  default: {
    in: '',
    out: '',
  } as Amount,
})
