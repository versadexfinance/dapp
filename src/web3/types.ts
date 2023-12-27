import { ethers } from 'ethers'
import { type } from 'os'

export type Contract = 'factoryV2' | 'routerV2' | 'versadex' | 'weth'

export type Token = Contract

export interface Amount {
  in: string
  out: string
}

export type Tokens = {
  ticker: string
  displayTicker: string
  img: string
  name: string
  address: string
  decimals: number
}

export type Transaction = {
  type: 'swap' | 'add_liquidity' | 'remove_liquidity' | 'approve'
  data: {
    in?: {
      tokenAddress: string
      amount: string
    }
    out?: {
      tokenAddress: string
      amount: string
    }
    approve?: {
      tokenAddress: string
      amount: string
    }
  }
  amount?: string
  fromAddress: string
  txHash: string
  status: 'pending' | 'completed' | 'failed'
  initiatedAt: Date
}

export const tokenList: Tokens[] = [
  {
    ticker: 'WETH',
    displayTicker: 'ETH',
    img: '/img/ETH.png',
    name: 'Ethereum',
    address: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    decimals: 18,
  },
  {
    ticker: 'VDX',
    displayTicker: 'VDX',
    img: '/img/logo.svg',
    name: 'Versadex',
    address: '0xFe16e49f711E3dbE1fF33635E2B335cAc4CBF520',
    decimals: 18,
  },
]

///////////
