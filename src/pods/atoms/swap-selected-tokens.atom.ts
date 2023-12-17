import { Tokens, tokenList } from '@/web3/types';
import { RecoilState, atom } from 'recoil';

export const tokenInState = atom({
  key: 'tokenInState',
  default: tokenList[0],
});

export const tokenOutState = atom({
    key: 'tokenOutState',
    default: tokenList[1],
});

export const maxSlippageState = atom({
  key: 'maxSlippageState',
  default: "",
});

export const transactionDeadlineState = atom({
  key: 'transactionDeadlineState',
  default: 0,
});
