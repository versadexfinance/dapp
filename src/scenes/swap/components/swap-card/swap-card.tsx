'use client';

import { Flex, Stack } from '@/components/box';
import { Container } from './styles';
import TabsComponent, { TabItem, TabPanelItem } from '@/components/tabs/tabs';
import Typography from '@/components/typography';
import CoinSelector from '@/components/coin-select';
import Button from '@/components/button';
import InputConversion from '@/components/input-conversion/input-conversion';
import CollapsibleCard from '@/components/collapsible-card';
import { useAccount, useBalance } from 'wagmi';
import {PulseLoader} from "react-spinners"

import { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { usePair, usePrices } from '@/web3/hooks/usePair';
import { useConversion } from '@/web3/hooks/useConversion';
import { roundToFirstNonZeroDecimal } from '@/pods/utils/number-format';
import useEthPrice from '@/web3/hooks/useEthPrice';
import { useEstimatedGasFee } from '@/web3/hooks/useGasPrice';
import { useSwap } from '@/web3/hooks/useSwap';
import { useTokenBalance } from '@/web3/hooks';
import { useRecoilState } from 'recoil';
import { amountState, maxSlippageState, tokenInState, tokenOutState } from '@/pods/atoms/swap-selected-tokens.atom';
import { usePriceImpact } from '@/web3/hooks/usePriceImpact';
import SwapSettings from '../swap-settings';
import { useAllowance } from '@/web3/hooks/useAllowance';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';
import { config } from '@/web3/config';
import { Tab } from '@/components/tabs/interfaces';

const SwapCard = () => {
  const { address, isDisconnected } = useAccount();

  const { data: balanceData } = useBalance({
    address: address,
    watch: true
  });
  const [conversionRate, setConversionRate] = useState<string | null | 0>(null);
  

  const [settingOpen, setSettingOpen] = useState(false)

  const [tokenOne, setTokenOne] = useRecoilState(tokenInState);
  const [tokenTwo, setTokenTwo] = useRecoilState(tokenOutState);
  const [amount, setAmount] = useRecoilState(amountState);

  const [maxSlippage, setMaxSlippage] = useRecoilState(maxSlippageState);
  const [buttonText, setButtonText] = useState("SWAP")

  const { openConnectModal } = useConnectModal();

  const usePairResponse = usePair(
    tokenOne ? tokenOne.address : '',
    tokenTwo ? tokenTwo.address : ''
  );
  const reserves = usePrices(usePairResponse);
  const ethPrice = useEthPrice();


  

  const tokenOneBalance =  useTokenBalance({
    address: address as `0x${string}`,
    token: tokenOne?.address as `0x${string}`,
    chainId: 5
  });


  const tokenTwoBalance = useTokenBalance({
    address: address as `0x${string}`,
    token: tokenTwo?.address as `0x${string}`,
    chainId: 5
  });

  const allowance = useAllowance(address as `0x${string}`)

  function getPriceUsd(ethAmount: number): string | null | 0 | 1 {
    if (ethPrice) {
      return `${(Number(ethPrice.ethusd) * ethAmount).toFixed(2)}`;
    }
    return '';
  }

  
  const {swap, isApproving, contract} = useSwap({
    tokenIn: tokenOne,
    tokenOut: tokenTwo,
    ethBalance: balanceData?.value || BigInt(0)
  });

  const onSwap = () => {
    swap();
  };

  

  function switchTokens() {
    const one = tokenOne;
    const two = tokenTwo;
    const oneAmount = amount.in;
    const twoAmount = amount.out;
    setAmount({ in: twoAmount == "0" ? "":twoAmount , out: oneAmount });
    setTokenOne(two);
    setTokenTwo(one);
  }

  useEffect(() => {
    async function calculateConversionRate() {
      if (reserves) {
        console.log("reserves", reserves);

        let ratio: number = 0;
        if (tokenOne?.ticker == 'WETH') {
          ratio = reserves?.tokenTwo / reserves?.tokenOne;
        } else {
          ratio = reserves?.tokenOne / reserves?.tokenTwo;
        }
        const rounded = roundToFirstNonZeroDecimal(String(ratio));
        setConversionRate(rounded ?? null);
      }
    }
    calculateConversionRate();
  }, [tokenOne, reserves]);

  const gas = useEstimatedGasFee(tokenOne, tokenTwo, address as string);

  async function changeAmount(e: ChangeEvent<HTMLInputElement>) {
    const inAmount = e.target.value;
    setAmount({ in: inAmount, out: '' });
  }

  const conversionResult = useConversion(
    amount,
    tokenOne,
    String(reserves?.tokenOne ?? 0),
    String(reserves?.tokenTwo ?? 0)
  );

  useEffect(() => {
    setAmount({ ...amount, out: conversionResult ?? "0"});
  }, [conversionResult]);

 const priceImpact =  usePriceImpact({
    inputAmount: amount.in,
    tokenAPoolSize: reserves?.tokenOne.toString() ?? '0',
    tokenBPoolSize: reserves?.tokenTwo.toString() ?? '0'
  });

  useEffect(() => {
    const getButtonString = async () =>{
      const resultAllowance = await contract.allowance(address, config.contract.routerV2)
      if(  tokenOne.ticker != "WETH" && resultAllowance.lt(ethers.utils.parseUnits( amount.in.length ? amount.in : "0",tokenOne.decimals) ) ){
        setButtonText("APPROVE")
      }else{
        setButtonText("SWAP")
      }

    }
    getButtonString();

  }, [allowance,amount.in]);

  "use client";



const tabs:Tab[] = [
  {
    label: 'Swap',
    content:   <Stack gap={3}>
    <Container
      css={{
        backgroundColor: '#090909'
      }}
    >
      <Flex justifyContent={'spaceBetween'}>
        <Typography
          css={{
            color: '#F7FFBB',
            fontSize: '16px',
            lineHeight: '24px'
          }}
        >
          From
        </Typography>
        <Flex gap={1} alignItems={'end'}>
          <Typography
            css={{
              fontSize: '14px',
              color: '#797979'
            }}
          >
            Balance
          </Typography>
          <Typography
            css={{
              color: '#AFAFAF'
            }}
          >
            {roundToFirstNonZeroDecimal(
              (tokenOneBalance
                ? tokenOneBalance?.data?.formatted
                : balanceData?.formatted) ?? '0'
            )}{' '}
            {tokenOne?.displayTicker}
          </Typography>
          <Typography
            css={{
              fontSize: '12px',
              lineHeight: '16px',
              color: '$primary',
              padding: '4px 8px',
              cursor: 'pointer',
              '&:hover': {
                scale: 1.1
              }
            }}
            onClick={() => {
              setAmount({
                ...amount,
                in:
                  (tokenOneBalance
                    ? tokenOneBalance.data?.formatted
                    : balanceData?.formatted) ?? '0'
              });
            }}
          >
            Max
          </Typography>
        </Flex>
      </Flex>
      <Flex
        css={{
          marginTop: '16px'
        }}
        gap={2}
        alignItems={'center'}
        justifyContent={'spaceBetween'}
      >
        <div style={{ flex: "1" }}>
          <CoinSelector
            css={{
              flex: 4,
              '@tablet': {
                flex: 3,
              }
            }}
            tokenPosition='in'
          />

        </div>
        <div style={{
          flex: "2"
        }}>
          <InputConversion
            css={{
              flex: 2,
              '@tablet': {
                flex: 1
              }
            }}
            step={0.000000000000000001}
            placeholder="0"
            value={amount.in}
            onChange={changeAmount}
            type="number"
            label={`~ ${getPriceUsd(
              Number(
                tokenOne?.ticker == 'WETH' ? amount.in : conversionResult
              )
            )} USD`}
          />
        </div>

      </Flex>
    </Container>
    <Flex direction={'row'} alignItems={'center'}>
      <div
        style={{
          width: '100%',
          height: '1px',
          opacity: '0.15',
          background: '#EBFE64'
        }}
      ></div>
      <Image
        alt="swap"
        onClick={switchTokens}
        height={32}
        width={32}
        style={{
          padding: '4px',
          cursor: 'pointer',
          background: '#252811',
          borderRadius: '50%'
        }}
        src="/icons/arrow-data-transfer-vertical-sharp.svg"
      />
      <div
        style={{
          width: '100%',
          height: '1px',
          opacity: '0.15',
          background: '#EBFE64'
        }}
      ></div>
    </Flex>
    <Container
      css={{
        backgroundColor: '#090909'
      }}
    >
      <Flex justifyContent={'spaceBetween'}>
        <Typography
          css={{
            color: '#F7FFBB',
            fontSize: '16px',
            lineHeight: '24px'
          }}
        >
          To
        </Typography>
        <Flex gap={1} alignItems={'end'}>
          <Typography
            css={{
              fontSize: '14px',
              color: '#797979'
            }}
          >
            Balance
          </Typography>
          <Typography
            css={{
              color: '#AFAFAF'
            }}
          >
            {roundToFirstNonZeroDecimal(
              (tokenTwoBalance
                ? tokenTwoBalance?.data?.formatted
                : balanceData?.formatted) ?? '0'
            )}{' '}
            {tokenTwo?.displayTicker}{' '}
          </Typography>
        </Flex>
      </Flex>
      <Flex
        css={{
          marginTop: '16px'
        }}
        alignItems={'center'}
        gap={2}
        justifyContent={'spaceBetween'}
      >
        <div style={{ flex: "1" }}>

          <CoinSelector
            css={{
              flex: 2,
              '@tablet': {
                flex: 1
              }
            }}
            tokenPosition='out'
          />
        </div>
        <div style={{
          flex: "2"
        }}>

        
        <InputConversion
          value={
            conversionResult
              ? roundToFirstNonZeroDecimal(conversionResult)
              : 'loading'
          }
          readOnly
          step={0.00000000001}
          label={`~ ${getPriceUsd(
            Number(
              tokenOne?.ticker == 'WETH' ? amount.in : conversionResult
            )
          )} USD`}
        />
        </div>
      </Flex>
    </Container>
    <CollapsibleCard
      title={
        <Flex
          fullWidth
          justifyContent={'spaceBetween'}
          alignItems={'center'}
        >
          <Flex
            css={{
              gap: 2
            }}
          >
            {
              <Typography>
                1 {tokenOne && tokenOne.displayTicker} ~ {conversionRate}{' '}
                {tokenTwo && tokenTwo.displayTicker}
              </Typography>
            }
            <Typography
              css={{
                color: '#BFBFBF'
              }}
            >
              ($
              {getPriceUsd(
                Number(
                  tokenOne?.ticker == 'WETH' ? 1 : conversionRate
                )
              )}
              )
            </Typography>
          </Flex>
          <Flex gap={1}>
            <img src="/icons/signal-full-02.svg" />
            <Typography
              css={{
                marginRight: '8px',
                color: '#BFBFBF'
              }}
            >
              ${roundToFirstNonZeroDecimal(getPriceUsd(gas?.gasFee ?? 0))}
            </Typography>
          </Flex>
        </Flex>
      }
    >
      <Stack gap={2}>
        <Flex justifyContent={'spaceBetween'} alignItems={'center'}>
          <Typography
            css={{
              fontSize: '14px',
              lineHeight: '16px',
              color: '#BFBFBF'
            }}
          >
            Max Slippage
          </Typography>
          <Typography
            css={{
              fontSize: '16px',
              lineHeight: '20px',
              color: '#E1E1E1'
            }}
          >
            {maxSlippage == "" ? "AUTO":maxSlippage + "%"} 
          </Typography>
        </Flex>

        <Flex justifyContent={'spaceBetween'} alignItems={'center'}>
          <Typography
            css={{
              fontSize: '14px',
              lineHeight: '16px',
              color: '#BFBFBF'
            }}
          >
            Price Impact
          </Typography>
          <Typography
            css={{
              fontSize: '16px',
              lineHeight: '20px',
              color: '#E1E1E1'
            }}
          >
            {roundToFirstNonZeroDecimal(priceImpact) ?? 0}%
          </Typography>
        </Flex>
        <Flex justifyContent={'spaceBetween'} alignItems={'center'}>
          <Typography
            css={{
              fontSize: '14px',
              lineHeight: '16px',
              color: '#BFBFBF'
            }}
          >
            Transaction fee
          </Typography>
          <Flex gap={1}>
            <img src="/icons/signal-full-02.svg" />
            <Typography
              css={{
                fontSize: '16px',
                lineHeight: '20px',
                color: '#E1E1E1'
              }}
            >
              ${roundToFirstNonZeroDecimal(getPriceUsd(gas?.gasFee ?? 0))}
            </Typography>
            <Typography
              css={{
                fontSize: '16px',
                lineHeight: '20px',
                color: '#E1E1E1'
              }}
            >
              ~ {roundToFirstNonZeroDecimal(String(gas?.gasFee))} ETH
              {/* {!gas ? '-' : roundToFirstNonZeroDecimal("0")} ETH */}
            </Typography>
          </Flex>
        </Flex>
      </Stack>
    </CollapsibleCard>
  </Stack>
  },
  {
    label: 'Cross Chain Swap',
    content: <Flex
    justifyContent={'center'}
    css={{
      fontSize: '25px'
    }}
  >
    <Typography
      css={{
        fontWeight: 800
      }}
    >
      coming soon
    </Typography>
    <Typography
      css={{
        fontWeight: 800,
        color: '$primary'
      }}
    >
      .
    </Typography>
  </Flex> ,
  }
];

  
  return (
    <Stack
      gap={3}
      css={{
        flex: '4'
      }}
    >
      <Container>
        
        <img
          onClick={()=>setSettingOpen(!settingOpen)}
          style={{
            position: 'absolute',
            right: '16px',
            cursor: 'pointer',
            
          }}
          src="/icons/setting.svg"
          width={24}
        />

       {settingOpen&& <SwapSettings closeSettings={()=>{
          setSettingOpen(false)
        }}/>}

        <TabsComponent tabs={tabs} /> 
          
  
      </Container>
      {!isDisconnected?
      <Button
        css={{
          color: '#020202',
          fontSize: '16px',
          lineHeight: '24px',
          background: 'linear-gradient(90deg, #EBFE64 -25.87%, #8CEA69 100%)',
          padding: '12px  40px'
        }}
        fullWidth
        disabled = {isApproving}
        onClick={onSwap}
        
      >
        
          
        {isApproving? <><PulseLoader color="#2D2C2C" size={10} />
 </> :  buttonText
 }
      </Button>:<Button
        css={{
          color: '#020202',
          fontSize: '16px',
          lineHeight: '24px',
          background: 'linear-gradient(90deg, #EBFE64 -25.87%, #8CEA69 100%)',
          padding: '12px  40px'
        }}
        fullWidth
        onClick={openConnectModal}
        
      >
        CONNECT WALLET
      </Button>
      }
    </Stack>
  );
};

export default SwapCard;
