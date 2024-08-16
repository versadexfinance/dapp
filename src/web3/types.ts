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

export type Chain = {
  img: string
  name: string
  chainId: number
}

export type Crypto = {
  ath: number
  atl: number
  current_price: number
  id: string
  name: string
  symbol: string
  high_24h: number
  low_24h: number
  owned: number
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
    lp?: {
      token_0: `0x${string}`
      token_1: `0x${string}`
      tvl: string
    }
  }
  amount?: string
  fromAddress: string
  txHash: string
  status: 'pending' | 'completed' | 'failed'
  initiatedAt: Date
}

export type Pool_V2 = {
  token_0: string
  token_1: string
  pairAddress: string
  txHash: string
  fee: number
  fromAddress?: string
  stakers?: string[]
  initiatedAt: Date
  version: 'v2'
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
  // {
  //   ticker: 'UNI',
  //   displayTicker: 'UNI',
  //   img: '/img/UNI.png',
  //   name: 'UNI Token',
  //   address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
  //   decimals: 18,
  // },
  // {
  //   ticker: 'DAI',
  //   displayTicker: 'DAI',
  //   img: '/img/DAI.png',
  //   name: 'Dai Stablecoin',
  //   address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  //   decimals: 18,
  // },
  // {
  //   ticker: 'USDC',
  //   displayTicker: 'USDC',
  //   img: '/img/USDC.png',
  //   name: 'USD Coin',
  //   address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  //   decimals: 6,
  // },
]

export const CHAINS: Chain[] = [
  {
    img: '/img/eth-chain.png',
    name: 'Sepolia Ethereum Chain',
    chainId: 5,
  },
]

export const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'

///////////
