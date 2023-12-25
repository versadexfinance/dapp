import { Amount, Tokens, tokenList } from '@/web3/types';
import { RecoilState, atom } from 'recoil';




export const connectedState = atom({
  key: 'connectedState',
  default: false,
});