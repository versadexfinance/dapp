import type { NextApiRequest, NextApiResponse } from 'next';
import Moralis from 'moralis';

type UsdPrices = {
  tokenOne: number;
  tokenTwo: number;
  ratio: number;
};

type ResponseData = {
  usdPrices?: UsdPrices;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const { query } = req;

    const responseOne = await Moralis.EvmApi.token.getTokenPrice({
      address: query.addressOne as string,
    });

    const responseTwo = await Moralis.EvmApi.token.getTokenPrice({
      address: query.addressTwo as string,
    });

    const usdPrices: UsdPrices = {
      tokenOne: responseOne.raw.usdPrice,
      tokenTwo: responseTwo.raw.usdPrice,
      ratio: responseOne.raw.usdPrice / responseTwo.raw.usdPrice,
    };

    res.status(200).json({ usdPrices });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

Moralis.start({
  apiKey: process.env.MORALIS_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjQzZDI0ZjgwLTk4YjgtNDA3Ni05ZjFkLWMzOWE4ZjIzNGJkOCIsIm9yZ0lkIjoiMzY3NDA0IiwidXNlcklkIjoiMzc3NTk3IiwidHlwZUlkIjoiMTAzZTMyMmItOTM4OC00ZTljLWE4MTItYWUwYjAxNDVhMjI5IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDIwMzU0MTksImV4cCI6NDg1Nzc5NTQxOX0.4w2cbS-PFi2SGHGYUIgQEVOVQC48MD5uwSFf6Nw5oKk",
});

// import { NextApiRequest, NextApiResponse } from 'next';
// import { ethers } from 'ethers';

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

//     const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/eth_goerli");
    
//     // Replace the following lines with your actual contract ABI and addresses
//     const tokenOneContract = new ethers.Contract(query.addressOne as string, ['function getPrice() view returns (uint256)'], provider);
//     const tokenTwoContract = new ethers.Contract(query.addressTwo as string, ['function getPrice() view returns (uint256)'], provider);
//     tokenOneContract.
//     const responseOne = await tokenOneContract.getPrice().catch((error) => {
//       console.error('Error calling getPrice on tokenOne:', error.message);
//       throw new Error('Failed to fetch price for tokenOne');
//     });
    
//     const responseTwo = await tokenTwoContract.getPrice().catch((error) => {
//       console.error('Error calling getPrice on tokenTwo:', error.message);
//       throw new Error('Failed to fetch price for tokenTwo');
//     });
//     const usdPrices: UsdPrices = {
//       tokenOne: parseFloat(ethers.utils.formatUnits(responseOne, 18)), // Assuming 18 decimals, adjust as needed
//       tokenTwo: parseFloat(ethers.utils.formatUnits(responseTwo, 18)), // Assuming 18 decimals, adjust as needed
//       ratio: parseFloat(ethers.utils.formatUnits(responseOne, 18)) / parseFloat(ethers.utils.formatUnits(responseTwo, 18)),
//     };

//     res.status(200).json({ usdPrices });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }
