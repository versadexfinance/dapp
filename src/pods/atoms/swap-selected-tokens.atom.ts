import { Amount, Tokens, tokenList } from '@/web3/types'
import { RecoilState, atom } from 'recoil'

export const tokenInState = atom({
  key: 'tokenInState',
  default: tokenList[0],
})

export const amountState = atom({
  key: 'amountState',
  default: {
    in: '',
    out: '',
  } as Amount,
})

export const tokenOutState = atom({
  key: 'tokenOutState',
  default: tokenList[1],
})

export const maxSlippageState = atom({
  key: 'maxSlippageState',
  default: '',
})

export const transactionDeadlineState = atom({
  key: 'transactionDeadlineState',
  default: 10,
})

export const transactionState = atom({
  key: 'transactionState',
  default: {
    isApproving: false,
    contract: null,
    isLoading: false,
    txHash: { hash: '', typeTx: '' },
  },
})

export const transactionHashState = atom({
  key: 'transactionHashState',
  default: { hash: '', typeTx: '' },
})
