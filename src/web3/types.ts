
export type Contract = 'factoryV2' | 'routerV2' | 'versadex' | 'weth';

export type Token = Contract


export interface Amount {
    in: string;
    out: string;
}


export type Tokens =  {
    ticker: string;
    displayTicker: string;
    img: string;
    name: string;
    address: string;
    decimals: number;
} | null


export const tokenList: Tokens[] =[
    {
        "ticker": "WETH",
        "displayTicker": "ETH",
        "img": "/img/ETH.png",
        "name": "Ethereum",
        "address": "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
        "decimals": 18
    },
    {
        "ticker": "VERSA",
        "displayTicker": "VERSA",
        "img": "/img/logo.svg",
        "name": "Versadex",
        "address": "0xB86BA39646270B1B546165d14cEe005d5466b18B",
        "decimals": 18
    },

]