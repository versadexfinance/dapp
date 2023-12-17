import { Tokens, tokenList } from '@/web3/types';
import { atom } from 'recoil';

export const tokenInState = atom({
  key: 'tokenInState',
  default: tokenList[0],
});

export const tokenOutState = atom({
    key: 'tokenOutState',
    default: tokenList[1],
  });