// import type { NextApiRequest, NextApiResponse } from 'next';
// import Moralis from 'moralis';

// type UsdPrices = {
//   tokenOne: number;
//   tokenTwo: number;
//   ratio: number;
// };

// type ResponseData = {
//   usdPrices?: UsdPrices;
//   error?: string;
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   try {
//     const { query } = req;

//     const responseOne = await Moralis.EvmApi.token.getTokenPrice({
//       address: query.addressOne as string,
//     });

//     const responseTwo = await Moralis.EvmApi.token.getTokenPrice({
//       address: query.addressTwo as string,
//     });

//     const usdPrices: UsdPrices = {
//       tokenOne: responseOne.raw.usdPrice,
//       tokenTwo: responseTwo.raw.usdPrice,
//       ratio: responseOne.raw.usdPrice / responseTwo.raw.usdPrice,
//     };

//     res.status(200).json({ usdPrices });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }

// Moralis.start({
//   apiKey: process.env.MORALIS_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjQzZDI0ZjgwLTk4YjgtNDA3Ni05ZjFkLWMzOWE4ZjIzNGJkOCIsIm9yZ0lkIjoiMzY3NDA0IiwidXNlcklkIjoiMzc3NTk3IiwidHlwZUlkIjoiMTAzZTMyMmItOTM4OC00ZTljLWE4MTItYWUwYjAxNDVhMjI5IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDIwMzU0MTksImV4cCI6NDg1Nzc5NTQxOX0.4w2cbS-PFi2SGHGYUIgQEVOVQC48MD5uwSFf6Nw5oKk",
// });

// // import { NextApiRequest, NextApiResponse } from 'next';
// // import { ethers } from 'ethers';

// // type UsdPrices = {
// //   tokenOne: number;
// //   tokenTwo: number;
// //   ratio: number;
// // };

// // type ResponseData = {
// //   usdPrices?: UsdPrices;
// //   error?: string;
// // };

// // export default async function handler(
// //   req: NextApiRequest,
// //   res: NextApiResponse<ResponseData>
// // ) {
// //   try {
// //     const { query } = req;

// //     const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/eth_goerli");
    
// //     // Replace the following lines with your actual contract ABI and addresses
// //     const tokenOneContract = new ethers.Contract(query.addressOne as string, ['function getPrice() view returns (uint256)'], provider);
// //     const tokenTwoContract = new ethers.Contract(query.addressTwo as string, ['function getPrice() view returns (uint256)'], provider);
// //     tokenOneContract.
// //     const responseOne = await tokenOneContract.getPrice().catch((error) => {
// //       console.error('Error calling getPrice on tokenOne:', error.message);
// //       throw new Error('Failed to fetch price for tokenOne');
// //     });
    
// //     const responseTwo = await tokenTwoContract.getPrice().catch((error) => {
// //       console.error('Error calling getPrice on tokenTwo:', error.message);
// //       throw new Error('Failed to fetch price for tokenTwo');
// //     });
// //     const usdPrices: UsdPrices = {
// //       tokenOne: parseFloat(ethers.utils.formatUnits(responseOne, 18)), // Assuming 18 decimals, adjust as needed
// //       tokenTwo: parseFloat(ethers.utils.formatUnits(responseTwo, 18)), // Assuming 18 decimals, adjust as needed
// //       ratio: parseFloat(ethers.utils.formatUnits(responseOne, 18)) / parseFloat(ethers.utils.formatUnits(responseTwo, 18)),
// //     };

// //     res.status(200).json({ usdPrices });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ error: 'Internal Server Error' });
// //   }
// // }




import type { NextApiRequest, NextApiResponse } from 'next';
// import Moralis from 'moralis';



import { ContractInterface, ethers } from 'ethers';
import { factoryAbi, pairAbi } from 'web3/abis';


type UsdPrices = {
  tokenOne: number;
  tokenTwo: number;
  ratio: number;
};

type ResponseData = {
  usdPrices?: UsdPrices;
  error?: string;
};

const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/eth_goerli");
const contract = new ethers.Contract("0xe025B985F5afEFF91C3FF8689Ecbeb05145D3872",factoryAbi , provider);


export  async function getPair(
  address1:string,
  address2:string
) {
  return await contract.getPair(address1, address2)
}


export  async function getPrices(
  pairAddress:string
) {
  const contractPair = new ethers.Contract(pairAddress, pairAbi , provider);

  const reserves = await contractPair.getReserves()

  console.log(ethers.utils.formatUnits(reserves[0], "ether"));
  console.log(ethers.utils.formatUnits(reserves[1], "ether"));
  const token1 = Number(ethers.utils.formatUnits(reserves[0], "ether"))
  const token2 = Number(ethers.utils.formatUnits(reserves[1], "ether"))
  // [TODO]

  console.log("Precio de un versadex en ETH", token1/token2);

  return {
    tokenOneReserve: token1,
    tokenTwoReserve: token2,
    ratio: token1/token2
  }
  
  //return await contract.getPair(address1, address2)
}

export async function swap(){

  //
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  
}