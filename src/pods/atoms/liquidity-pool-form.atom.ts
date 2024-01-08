import { tokenList } from '@/web3/types'
import { atom } from 'recoil'

export const lpPairOneState = atom({
  key: 'lpPairOneState',
  default: tokenList[0],
})

export const lpPairTwoState = atom({
  key: 'lpPairTwoState',
  default: tokenList[1],
})
