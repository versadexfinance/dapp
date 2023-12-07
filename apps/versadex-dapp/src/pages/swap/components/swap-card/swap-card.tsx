'use client';

import { Flex, Stack } from '@/components/box';
import { Container } from './styles';
import TabsComponent, { TabItem, TabPanelItem } from '@/components/tabs/tabs';
import Typography from '@/components/typography';
import CoinSelector from '@/components/coin-select';
import Input from '@/components/input/input';
import Button from '@/components/button';
import InputConversion from '@/components/input-conversion/input-conversion';
import Dropdown from '@/components/select/drop-down';
import CollapsibleCard from '@/components/collapsible-card';

const SwapCard = () => {
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
                      0.23 ETH
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
                    options={[
                      { value: 'ETH', label: 'ETH', subLabel: 'Ethereum' },
                      { value: 'DAI', label: 'DAI', subLabel: 'DAI' }
                    ]}
                  />

                  <InputConversion label={'~ 3238 USD'} />
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
                  height={32}
                  width={32}
                  style={{
                    padding: '4px',
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
                      0.23 ETH
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
                    options={[
                      { value: 'ETH', label: 'ETH', subLabel: 'Ethereum' },
                      { value: 'DAI', label: 'DAI', subLabel: 'DAI' },
                      { value: 'FRAX', label: 'FRAX', subLabel: 'FRAX' },
                      { value: 'USDC', label: 'USDC', subLabel: 'USDC' }
                    ]}
                  />
                  <InputConversion label={'~ 3238 USD'} />
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
                      <Typography>1 DAI = 0.24 UNI</Typography>
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
                      Swap to
                    </Typography>
                    <Typography
                      css={{
                        fontSize: '16px',
                        lineHeight: '20px',
                        color: '#E1E1E1'
                      }}
                    >
                      791.72 UNI
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
                      <Typography>1 DAI = 0.24 UNI</Typography>
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
                      Cross-chain txn fee
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
      >
        SWAP
      </Button>
    </Stack>
  );
};

export default SwapCard;
