import { useMemo } from 'react';
import { BigNumber, ethers, utils } from 'ethers';

interface PriceImpactParams {
  inputAmount: string;
  outputAmount: string;
  tokenAPoolSize: string;
  tokenBPoolSize: string;
}

interface PriceImpactArgs {
  inputAmount: string;
  outputAmount: string;
  tokenAPoolSize: string;
  tokenBPoolSize: string;
}


// export function usePriceImpact({
//   inputAmount,
//   outputAmount,
//   tokenAPoolSize,
//   tokenBPoolSize,
// }: PriceImpactParams): string {
//     console.log("Price impact params",inputAmount,outputAmount,tokenAPoolSize,tokenBPoolSize);
    
//   const calculatePriceImpact = useMemo(() => {
//     if (!inputAmount || !outputAmount || !tokenAPoolSize || !tokenBPoolSize) {
//         console.log( "Price impact No pasa");
        
//       return '';
//     }

//     const tokenAPoolSizeBigNumber = BigNumber.from(tokenBPoolSize);
//     const tokenBPoolSizeBigNumber = BigNumber.from(tokenBPoolSize);
//     const constantProduct = tokenAPoolSizeBigNumber.mul(tokenBPoolSizeBigNumber);

//     const newTokenAPoolSize = tokenAPoolSizeBigNumber.add(BigNumber.from(inputAmount));
//     const newTokenBPoolSize = constantProduct.div(newTokenAPoolSize);

//     const newOutputAmountBigNumber = tokenBPoolSizeBigNumber.sub(newTokenBPoolSize);
//     const pricePaidPerTokenB = newOutputAmountBigNumber.mul(1e18).div(outputAmount);

//     const priceImpactBigNumber = pricePaidPerTokenB.sub(1e18).mul(100);
//     const priceImpact = utils.formatUnits(priceImpactBigNumber, 2); // 2 decimal places

//     console.log("Price impact",priceImpact);
    

//     return priceImpact;
//   }, [inputAmount, outputAmount, tokenAPoolSize, tokenBPoolSize]);

//   return calculatePriceImpact;
// }



import { useEffect, useState } from 'react';

export function usePriceImpact({inputAmount, outputAmount, tokenAPoolSize, tokenBPoolSize}:PriceImpactArgs) {
  const [priceImpact, setPriceImpact] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  console.log("Price impact params",inputAmount,outputAmount,tokenAPoolSize,tokenBPoolSize);
  
  return 0;

  useEffect(() => {
    const calculatePriceImpact = () => {
      try {
        setIsLoading(true);
        setIsError(false);

        if (!inputAmount || !outputAmount || !tokenAPoolSize || !tokenBPoolSize) {
          setPriceImpact(null);
          return;
        }

        const tokenAPoolSizeInt = ethers.utils.parseUnits(tokenAPoolSize, 18);
        const tokenBPoolSizeInt = ethers.utils.parseUnits(tokenBPoolSize, 18);

        // console.log("Constant product tokenApPoolSize",tokenApPoolSize.toString());

      const constantProductBN = BigNumber.from(tokenAPoolSizeInt).mul(BigNumber.from(tokenBPoolSizeInt));

        console.log("Constant product",constantProductBN.toString());
        

        // setPriceImpact(priceImpactPercentage);
      } catch (error) {
        console.error('Error calculating price impact:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    calculatePriceImpact();
  }, [inputAmount, outputAmount, tokenAPoolSize, tokenBPoolSize]);

  return priceImpact;
  // return { priceImpact, isLoading, isError };
}


// export function usePriceImpact({
//     inputAmount,
//     outputAmount,
//     tokenAPoolSize,
//     tokenBPoolSize,
//   }: PriceImpactArgs): string {
//     if (!inputAmount || !outputAmount || !tokenAPoolSize || !tokenBPoolSize) {
//         console.log( "Price impact No pasa");
        
//       return '';
//     }
//     try {
//       const inputAmountBigNumber = BigNumber.from(ethers.utils.parseUnits(inputAmount, 18));
//       const outputAmountBigNumber = BigNumber.from(ethers.utils.parseUnits(outputAmount, 18));
//       const tokenAPoolSizeBigNumber = BigNumber.from(ethers.utils.parseUnits(tokenAPoolSize, 18));
//       const tokenBPoolSizeBigNumber = BigNumber.from(ethers.utils.parseUnits(tokenBPoolSize, 18));

//       const constantProduct = tokenAPoolSizeBigNumber.mul(tokenBPoolSizeBigNumber);
//       const newProduct = constantProduct.mul(outputAmountBigNumber);
//       const denominator = newProduct.add(constantProduct);
//       const priceImpactBigNumber = inputAmountBigNumber.mul(constantProduct).div(denominator);

//       const priceImpact = priceImpactBigNumber.toString();
//       return priceImpact;
//     } catch (error) {
//       console.error('Error calculating price impact:', error);
//       return '0'; // Provide a default value or handle the error as needed
//     }
//   }



// interface PriceImpactArgs {
//   inputAmount: string;
//   outputAmount: string;
//   tokenAPoolSize: string;
//   tokenBPoolSize: string;
// }

// export function usePriceImpact({
//   inputAmount,
//   outputAmount,
//   tokenAPoolSize,
//   tokenBPoolSize,
// }: PriceImpactArgs): string {
//   try {
//     const inputAmountBigNumber = ethers.BigNumber.from(ethers.utils.parseUnits(inputAmount, 18));
//     const outputAmountBigNumber = ethers.BigNumber.from(ethers.utils.parseUnits(outputAmount, 18));
//     const tokenAPoolSizeBigNumber = ethers.BigNumber.from(ethers.utils.parseUnits(tokenAPoolSize));
//     const tokenBPoolSizeBigNumber = ethers.BigNumber.from(ethers.utils.parseUnits(tokenBPoolSize));

//     const constantProduct = tokenAPoolSizeBigNumber.mul(tokenBPoolSizeBigNumber);
//     const newProduct = constantProduct.mul(outputAmountBigNumber);
//     const denominator = newProduct.add(constantProduct);
//     const priceImpactBigNumber = inputAmountBigNumber.mul(constantProduct).div(denominator);

//     const priceImpact = priceImpactBigNumber.toString();
//     console.log("Price impact",priceImpact);
    
//     return priceImpact;
//   } catch (error) {
//     console.error('Error calculating price impact:', error);
//     return '0'; // Provide a default value or handle the error as needed
//   }
// }
