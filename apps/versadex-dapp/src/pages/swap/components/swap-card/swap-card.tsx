'use client';

import { Flex, Stack } from '@/components/box';
import { Container } from './styles';
import TabsComponent, { TabItem, TabPanelItem } from '@/components/tabs/tabs';
import Typography from '@/components/typography';
import CoinSelector from '@/components/coin-select';
import Button from '@/components/button';
import InputConversion from '@/components/input-conversion/input-conversion';
import CollapsibleCard from '@/components/collapsible-card';
import {
  useAccount,
  useBalance,
  useSendTransaction,
  useWaitForTransaction
} from 'wagmi';
import { useEffect, useState } from 'react';
import { tokenList } from '@/pods/web3/tokenList';
import axios from 'axios';

const SwapCard = () => {
  const { address, isConnecting, isDisconnected } = useAccount();

  const {
    data: balanceData,
    isError: balanceIsError,
    isLoading: balanceIsLoading
  } = useBalance({
    address: address
  });

  const [slippage, setSlippage] = useState(2.5);
  const [tokenOneAmount, setTokenOneAmount] = useState(0);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(0);
  const [tokenOne, setTokenOne] = useState(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
  const [isOpen, setIsOpen] = useState(false);
  const [prices, setPrices] = useState(null);
  const [txDetails, setTxDetails] = useState({
    to: null,
    data: null,
    value: null
  });

  const { data, sendTransaction } = useSendTransaction({
    request: {
      from: address,
      to: String(txDetails.to),
      data: String(txDetails.data),
      value: String(txDetails.value)
    }
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash
  });

  function handleSlippageChange(e) {
    setSlippage(e.target.value);
  }

  function changeAmount(e) {
    console.log('Chnage amount', e.target.value);
    const amount = Number(e.target.value);
    console.log('Prices', prices);

    setTokenOneAmount(amount);
    if (amount && prices) {
      setTokenTwoAmount(Number((amount * prices.ratio).toFixed(4)));
    } else {
      setTokenTwoAmount(null);
    }
  }

  function switchTokens() {
    setPrices(null);
    setTokenOneAmount(null);
    setTokenTwoAmount(null);
    const one = tokenOne;
    const two = tokenTwo;
    setTokenOne(two);
    setTokenTwo(one);
    fetchPrices(two.address, one.address);
  }

  async function getGasPrices() {
    try {
      const response = await axios.get(
        'https://ethgasstation.info/api/ethgasAPI.json'
      );
      const gasPrices = response.data;

      console.log('Gas Prices (in Gwei):');
      console.log('Low: ', gasPrices.safeLow);
      console.log('Standard: ', gasPrices.average);
      console.log('Fast: ', gasPrices.fast);
      console.log('Fastest: ', gasPrices.fastest);

      return gasPrices;
    } catch (error) {
      console.error('Error fetching gas prices:', error);
      return null;
    }
  }

  function openModal(asset) {
    setChangeToken(asset);
    setIsOpen(true);
  }

  function modifyToken(i, changeToken) {
    console.log('modify token', i);

    setPrices(null);
    setTokenOneAmount(null);
    setTokenTwoAmount(null);
    if (changeToken === 1) {
      setTokenOne(tokenList.find((t) => t.address === i.address));
      fetchPrices(
        tokenList.find((t) => t.address === i.address).address,
        tokenTwo.address
      );
    } else {
      setTokenTwo(tokenList.find((t) => t.address === i.address));
      fetchPrices(
        tokenOne.address,
        tokenList.find((t) => t.address === i.address).address
      );
    }
    setIsOpen(false);
  }

  useEffect(() => {
    fetchPrices(tokenList[0].address, tokenList[1].address);
  }, []);

  useEffect(() => {
    if (txDetails.to && !isConnecting) {
      sendTransaction();
    }
  }, [txDetails]);

  useEffect(() => {
    // messageApi.destroy();
    // if (isLoading) {
    //   messageApi.open({
    //     type: 'loading',
    //     content: 'Transaction is Pending...',
    //     duration: 0
    //   });
    // }
  }, [isLoading]);

  useEffect(() => {
    // messageApi.destroy();
    // if (isSuccess) {
    //   messageApi.open({
    //     type: 'success',
    //     content: 'Transaction Successful',
    //     duration: 1.5
    //   });
    // } else if (txDetails.to) {
    //   messageApi.open({
    //     type: 'error',
    //     content: 'Transaction Failed',
    //     duration: 1.5
    //   });
    // }
  }, [isSuccess]);

  async function fetchPrices(one: string, two: string) {
    const res = await axios.get(`http://localhost:4200/api/tokenPrice`, {
      params: { addressOne: one, addressTwo: two }
    });

    setPrices(res.data.usdPrices);
  }

  async function fetchDexSwap() {
    const allowance = await axios.get(
      `https://api.1inch.io/v5.0/1/approve/allowance?tokenAddress=${tokenOne.address}&walletAddress=${address}`
    );

    if (allowance.data.allowance === '0') {
      const approve = await axios.get(
        `https://api.1inch.io/v5.0/1/approve/transaction?tokenAddress=${tokenOne.address}`
      );

      setTxDetails(approve.data);
      console.log('not approved');
      return;
    }

    const tx = await axios.get(
      `https://api.1inch.io/v5.0/1/swap?fromTokenAddress=${
        tokenOne.address
      }&toTokenAddress=${tokenTwo.address}&amount=${tokenOneAmount.padEnd(
        tokenOne.decimals + tokenOneAmount.length,
        '0'
      )}&fromAddress=${address}&slippage=${slippage}`
    );

    const decimals = Number(`1E${tokenTwo.decimals}`);
    setTokenTwoAmount((Number(tx.data.toTokenAmount) / decimals).toFixed(4));

    setTxDetails(tx.data.tx);
  }

  return (
    <Stack
      gap={3}
      css={{
        flex: '4'
      }}
    >
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
                      {balanceData?.formatted} {balanceData?.symbol}
                    </Typography>
                    <Typography
                      css={{
                        fontSize: '12px',
                        lineHeight: '16px',
                        color: '$primary',
                        padding: '4px 8px'
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
                    onChange={(e) => {
                      modifyToken(e, 1);
                      // setTokenOne(e);
                      // fetchPrices(e.address, tokenTwo.address);
                    }}
                    value={tokenOne}
                    options={[tokenList[0], tokenList[1]]}
                  />

                  <InputConversion
                    max={Number(balanceData?.formatted)}
                    step={0.000000000000000001}
                    value={tokenOneAmount}
                    onChange={changeAmount}
                    type="number"
                    label={`~ ${(
                      tokenOneAmount * (prices ? prices.tokenOne : 0)
                    ).toFixed(2)}USD`}
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
                <img
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
                      {balanceData?.formatted} {balanceData?.symbol}
                    </Typography>
                    <Typography
                      css={{
                        fontSize: '12px',
                        lineHeight: '16px',
                        color: '$primary',
                        padding: '4px 8px'
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
                    options={
                      [tokenList[0], tokenList[1]]

                      // .filter((t) => {
                      // return t.address !== from.tokenAddress;
                      // })
                    }
                    onChange={(e) => {
                      modifyToken(e, 2);

                      // setTokenTwo(e);
                      // fetchPrices(e.address, tokenOne.address);
                    }}
                    value={tokenTwo}
                  />
                  <InputConversion
                    value={tokenTwoAmount ?? 0}
                    step={0.00000000001}
                    label={`~ ${(
                      tokenTwoAmount * (prices ? prices.tokenTwo : 0)
                    ).toFixed(2)} USD`}
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
                      {prices && (
                        <Typography>
                          1 {tokenOne.ticker} ={' '}
                          {(prices.tokenTwo * prices.ratio).toFixed(2)}{' '}
                          {tokenTwo.ticker}
                        </Typography>
                      )}
                      <Typography
                        css={{
                          color: '#BFBFBF'
                        }}
                      >
                        {'($0.98)'}
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
                        $0.15
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
                      {tokenOneAmount ?? 0} {tokenOne.ticker}
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
                      {tokenTwoAmount ?? 0} {tokenTwo.ticker}
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
                      Exchange rate
                    </Typography>
                    <Flex
                      css={{
                        fontSize: '16px',
                        lineHeight: '20px',
                        color: '#E1E1E1'
                      }}
                      gap={1}
                    >
                      {prices && (
                        <Typography>
                          {' '}
                          1 {tokenOne.ticker} ={' '}
                          {(prices.tokenTwo * prices.ratio).toFixed(2)}{' '}
                          {tokenTwo.ticker}
                        </Typography>
                      )}
                      <Typography
                        css={{
                          fontSize: '16px',
                          color: '#F7FFBB'
                        }}
                      >
                        ($98)
                      </Typography>
                    </Flex>
                  </Flex>
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
                      3238.0 DAI
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
                        $0.15
                      </Typography>
                      <Typography
                        css={{
                          fontSize: '16px',
                          lineHeight: '20px',
                          color: '#E1E1E1'
                        }}
                      >
                        3238.0 DAI
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
        onClick={fetchDexSwap}
        disabled={!address || isDisconnected}
      >
        {!isDisconnected ? 'SWAP' : 'CONNECT WALLET'}
      </Button>
    </Stack>
  );
};

export default SwapCard;
