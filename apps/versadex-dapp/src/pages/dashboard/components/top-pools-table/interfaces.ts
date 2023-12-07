import { ReactNode } from 'react';

export interface ProductTableProps {
  headers: string[];
  items: (JSX.Element | string)[][];
}

export interface PoolTableRowProps {
  pool: {
    coin_1: string;
    coin_2: string;
    changePercent: number;
  }
  tvl: number;
  volume_24h: number;
  APR: number; 
}
export interface PoolsTableProps {
  headers?: string[];
  items: PoolTableRowProps[];
}

export const mockPoolTableRow: PoolTableRowProps[] = 
 [{ pool: {
    coin_1: 'DAI',
    coin_2: 'ETH',
    changePercent: 5.0,
  },
  tvl: 1830000,
  volume_24h: 200000,
  APR: 10.5,},
  { pool: {
    coin_1: 'FRAX',
    coin_2: 'USDC',
    changePercent: 5.0,
  },
  tvl: 2630000,
  volume_24h: 260000,
  APR: 10.5,},{ pool: {
    coin_1: 'DAI',
    coin_2: 'ETH',
    changePercent: 5.0,
  },
  tvl: 4500000,
  volume_24h: 310000,
  APR: 10.5,},
  { pool: {
    coin_1: 'DAI',
    coin_2: 'ETH',
    changePercent: 5.0,
  },
  tvl: 1830000,
  volume_24h: 200000,
  APR: 10.5,},
  { pool: {
    coin_1: 'DAI',
    coin_2: 'ETH',
    changePercent: 5.0,
  },
  tvl: 2630000,
  volume_24h: 260000,
  APR: 20,},
];