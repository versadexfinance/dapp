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

import { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { usePair, usePrices } from '@/web3/hooks/usePair';
import { useConversion } from '@/web3/hooks/useConversion';
import { roundToFirstNonZeroDecimal } from '@/pods/utils/number-format';
import { Amount, Tokens, tokenList } from '@/web3/types';
import useEthPrice from '@/web3/hooks/useEthPrice';
import { useEstimatedGasFee } from '@/web3/hooks/useGasPrice';
import { useSwap } from '@/web3/hooks/useSwap';
import { useTokenBalance } from '@/web3/hooks';
// import { usePriceImpact } from '@/web3/hooks/usePriceImpact';

const SwapCard = () => {
  const { address, isDisconnected } = useAccount();

  const { data: balanceData } = useBalance({
    address: address
  });

  // useEffect(() => {
  //   async function fetchTokenBalance() {
  //     const balance = await getTokenBalance(tokenOne);
  //     setTokenOneBalance(balance);
  //   }
  //   fetchTokenBalance();
  // },[tokenOne, tokenTwo]])

  const [conversionRate, setConversionRate] = useState<string | null | 0>(null);

  const [amount, setAmount] = useState<Amount>({ in: '', out: '' });

  const [tokenOne, setTokenOne] = useState<Tokens>(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState<Tokens>(tokenList[1]);

  const usePairResponse = usePair(
    tokenOne ? tokenOne.address : '',
    tokenTwo ? tokenTwo.address : ''
  );
  const reserves = usePrices(usePairResponse);
  const ethPrice = useEthPrice();

  const tokenOneBalance = useTokenBalance({
    address: address as `0x${string}`,
    token: tokenOne?.address as `0x${string}`,
    chainId: 5
  });

  const tokenTwoBalance = useTokenBalance({
    address: address as `0x${string}`,
    token: tokenTwo?.address as `0x${string}`,
    chainId: 5
  });

  function getPriceUsd(ethAmount: number): string | null | 0 | 1 {
    if (ethPrice) {
      return `${(Number(ethPrice.ethusd) * ethAmount).toFixed(2)}`;
    }
    return '';
  }

  const swap = useSwap({
    tokenIn: tokenOne,
    tokenOut: tokenTwo,
    amount: amount.in,
    ethBalance: balanceData?.value || BigInt(0)
  });

  const onSwap = () => {
    swap();
  };

  function switchTokens() {
    setAmount({ in: '', out: '' });
    const one = tokenOne;
    const two = tokenTwo;
    setTokenOne(two);
    setTokenTwo(one);
  }

  useEffect(() => {
    async function calculateConversionRate() {
      if (reserves) {
        let ratio:number = 0;
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
    tokenOne ? tokenOne.ticker : '',
    String(reserves?.tokenOne ?? 0),
    String(reserves?.tokenTwo ?? 0)
  );

  const priceImpact = "0"
  // usePriceImpact({
  //   inputAmount: amount.in,
  //   outputAmount: conversionResult || '0', // Provide a default value for outputAmount
  //   tokenAPoolSize: String(reserves?.tokenOne ?? 0),
  //   tokenBPoolSize: String(reserves?.tokenTwo ?? 0)
  // });

  // function getConversionUnit = (token:Tokens) => {

  // }

  return (
    <Stack
      gap={3}
      css={{
        flex: '4'
      }}
    >
      {/* <h2>ETHPRICE: {ethPrice && JSON.stringify(ethPrice.ethusd)}</h2>
      <h2>CONV RESULT: {String(JSON.stringify(conversionResult))}</h2>
      <h2>GAS: {gas}</h2> */}
      {/* <h2>TOKEN ONE BALANCE: {tokenOneBalance?.data?.formatted}</h2>
      <h2>TOKEN TWO BALANCE: {tokenTwoBalance?.data?.formatted}</h2> */}
      <Container>
        <img
          style={{
            position: 'absolute',
            right: '16px'
          }}
          src="/icons/setting.svg"
          width={24}
        />

        <TabsComponent defaultTabLabel="Swap">
          <TabItem label="Swap">Tab 1</TabItem>
          <TabItem label="Cross Chain Swap">Tab 2</TabItem>

          <TabPanelItem label="Swap">
            <Stack gap={3}>
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
                      {/* {tokenOne?.ticker == 'WETH'
                        ? balanceData?.formatted
                        : '21'}{' '} */}
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
                  <CoinSelector
                    css={{
                      flex: 2,
                      '@tablet': {
                        flex: 1
                      }
                    }}
                    onChange={() => {
                      // setTokenOne(e);
                      // fetchPrices(e.address, tokenTwo.address);
                    }}
                    value={tokenOne}
                    options={[tokenList[0], tokenList[1]].filter((t) => {
                      return (t && t.address) !== tokenTwo?.address;
                    })}
                  />

                  <InputConversion
                    max={Number(balanceData?.formatted)}
                    step={0.000000000000000001}
                    placeholder="0"
                    value={amount.in}
                    onChange={changeAmount}
                    type="number"
                    label={`~ ${getPriceUsd(
                      Number(
                        tokenOne?.ticker == 'WETH' ? amount.in : amount.out
                      )
                    )} USD`}
                  />
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
                    {/* <Typography
                      css={{
                        fontSize: '12px',
                        lineHeight: '16px',
                        color: '$primary',
                        padding: '4px 8px'
                      }}
                    >
                      Max
                    </Typography> */}
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
                  <CoinSelector
                    css={{
                      flex: 2,
                      '@tablet': {
                        flex: 1
                      }
                    }}
                    options={[tokenList[0], tokenList[1]].filter((t) => {
                      return (t && t.address) !== tokenOne?.address;
                    })}
                    value={tokenTwo}
                  />
                  {/* <pre>{amount.out}</pre> */}
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
                        tokenTwo?.ticker == 'WETH' ? amount.out : amount.in
                      )
                    )} USD`}
                  />
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
                          1 {tokenOne && tokenOne.ticker} ~ {conversionRate}{' '}
                          {tokenTwo && tokenTwo.ticker}
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
                        ${getPriceUsd(0 ?? 0)}
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
                      Price From
                    </Typography>
                    <Typography
                      css={{
                        fontSize: '16px',
                        lineHeight: '20px',
                        color: '#E1E1E1'
                      }}
                    >
                      {amount.in ?? 0} {tokenOne && tokenOne.ticker}
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
                      Swap to
                    </Typography>
                    <Typography
                      css={{
                        fontSize: '16px',
                        lineHeight: '20px',
                        color: '#E1E1E1'
                      }}
                    >
                      {roundToFirstNonZeroDecimal(conversionResult) ?? 0}{' '}
                      {tokenTwo && tokenTwo.ticker}
                    </Typography>
                  </Flex>
                  {/* <Flex justifyContent={'spaceBetween'} alignItems={'center'}>
                    <Typography
                      css={{
                        fontSize: '14px',
                        lineHeight: '16px',
                        color: '#BFBFBF'
                      }}
                    >
                      Exchange rate
                    </Typography>
                    {/* <Flex
                      css={{
                        fontSize: '16px',
                        lineHeight: '20px',
                        color: '#E1E1E1'
                      }}
                      gap={1}
                    >
                      <Typography>
                        1 {tokenOne.ticker} = {conversionRate}
                        {tokenTwo.ticker}
                      </Typography>

                      <Typography
                        css={{
                          fontSize: '16px',
                          color: '#F7FFBB'
                        }}
                      >
                        ($98)
                      </Typography>
                    </Flex>                   </Flex> 
*/}
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
                      AUTO
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
                      {priceImpact ?? 0}%
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
                      Estimated Gas fee
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
                        ${getPriceUsd(0 ?? 0)}
                      </Typography>
                      <Typography
                        css={{
                          fontSize: '16px',
                          lineHeight: '20px',
                          color: '#E1E1E1'
                        }}
                      >
                        ~ {!gas ? '-' : roundToFirstNonZeroDecimal("0")} ETH
                      </Typography>
                    </Flex>
                  </Flex>
                </Stack>
              </CollapsibleCard>
            </Stack>
          </TabPanelItem>
          <TabPanelItem label="Cross Chain Swap">
            <Flex
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
            </Flex>
          </TabPanelItem>
        </TabsComponent>
      </Container>
      <Button
        css={{
          color: '#020202',
          fontSize: '16px',
          lineHeight: '24px',
          background: 'linear-gradient(90deg, #EBFE64 -25.87%, #8CEA69 100%)',
          padding: '12px  40px'
        }}
        fullWidth
        onClick={onSwap}
        disabled={!address || isDisconnected}
      >
        {!isDisconnected ? 'SWAP' : 'CONNECT WALLET'}
      </Button>
    </Stack>
  );
};

export default SwapCard;
