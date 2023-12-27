'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from "axios"
import Typography from '@/components/typography';

import { Flex, Stack } from '../../../../components/box';

import { Container } from '../position-card/styles';
import CoinImagePair from '@/components/coin-image-pair/coin-image-pair';
import { useAccount } from 'wagmi';
import { Tokens, Transaction, tokenList } from '@/web3/types';
import Link from 'next/link';
import { roundToFirstNonZeroDecimal } from '@/pods/utils/number-format';

const NoTransactions = () => {
  return (
    <Stack css={{
      margin: "auto",
      marginTop: "10em",

    }}>

      <Stack css={{ width: '268px' }} alignItems={'center'} gap={3}>
        <Stack css={{ width: '146px' }} gap={2}>
          <img src="/sk/Green.svg" />
          <img src="/sk/Yellow.svg" />
        </Stack>

        <Typography
          css={{
            fontSize: '12px',
            textAlign: 'center',
            color: '#BFBFBF'
          }}
        >
          No recent transactions found, make a swap or create an LP position.
        </Typography>
      </Stack>

    </Stack>
  );
};
const TransactionItem = ({
  tx,
  lastItem
}: {
  tx: Transaction;
  lastItem?: boolean;
}) => {
  const [icon, setIcon] = useState("/icons/circle-arrow-reload.svg")
  const [text, setText] = useState("Transaction")
  const [subText, setSubText] = useState("")

  const [tokenIn, setTokenIn] = useState<Tokens>(null)
  const [tokenOut, setTokenOut] = useState<Tokens>(null)

  function getIcon(type, status) {

  }


  useEffect(() => {
    if (!tx.data) return

    if (tx.data.in?.tokenAddress) {
      let foundTokenIn = tokenList.find(t => {
        return t.address == tx.data.in.tokenAddress
      })
      setTokenIn(foundTokenIn)
    }

    if (tx.data.out?.tokenAddress) {
      let foundTokenOut = tokenList.find(t => {
        return t.address == tx.data.out.tokenAddress
      })
      setTokenOut(foundTokenOut)
    }

    if (tx.data.approve) {
      let foundTokenApprove = tokenList.find(t => {
        return t.address == tx.data.approve.tokenAddress
      })
      setTokenIn(foundTokenApprove)
    }


    if (tx.type == "approve") {
      setIcon("/icons/coins-01.svg")
      setText("Approved")
    }

    if (tx.type == "swap") {
      setText("Swapped")
    }

    if (tx.status == "failed") {
      setIcon("/icons/alert-02.svg")
      setText("Failed Transaction")
      if (tx.type == "approve") {
        setSubText("Attempted Approval")
      }
      if (tx.type == "swap") {
        setSubText("Attempted Swap")
      }
    }


  }, [])


  return (
    <Flex
      gap={1}
      fullWidth
      css={{
        padding: '16px 0',
        borderBottom: !lastItem ? '1px solid #1F1F1F' : 'none',
        paddingBottom: '32px'
      }}
    >
      <Flex
        css={{
          background: '#252811',
          height: '24px',
          width: '24px',
          // padding: '4px',
          alignItems: 'center',
          borderRadius: '50%',
          justifyContent: 'center'
          // padding: '4px'
        }}
      >
        <img
          height={'16px'}
          width={'16px'}
          style={{
            margin: '4px',
            background: '#252811'
          }}
          src={icon}
        />
      </Flex>
      <Stack fullWidth={true} gap={1} css={{
        marginRight: "10px"
      }}>
        <Flex gap={1} css={{
          flexWrap: "wrap"
        }}
          justifyContent={'spaceBetween'}>
          <Flex>
            <Typography
              css={{
                fontSize: '15px',
                lineHeight: '20px'
              }}
            >
              {text}
            </Typography>
            {subText && <Typography
              css={{
                fontSize: '15px',
                lineHeight: '20px',
                color: "#AFAFAF",
                marginLeft: "1em"
              }}
            >
              ~{subText}
            </Typography>}
          </Flex>
          {tx.type == "swap" ? <Flex><CoinImagePair
            coin1_src={tokenIn?.img}
            coin2_src={tokenOut?.img}
            size={20}
          />
            <Typography css={{
              fontSize: "14px"
            }}>{roundToFirstNonZeroDecimal(tx?.data?.in?.amount)} {tokenIn?.displayTicker}</Typography>
            <img src="/icons/arrow-right.svg" alt="" />
            <Typography css={{
              fontSize: "14px"
            }}>{roundToFirstNonZeroDecimal(tx?.data?.out?.amount)} {tokenIn?.displayTicker}</Typography></Flex> : tx.status !="failed" && tx.type == "approve"?
            <Flex
              gap={1}
            >
              <img src={tokenIn?.img} width="20" height="20" alt="" />
              <Typography css={{
                fontSize: "14px"
              }}>{roundToFirstNonZeroDecimal(tx?.data?.approve.amount)} {tokenIn?.displayTicker}</Typography>
            </Flex>:<></>
          }
        </Flex>
        <Flex justifyContent={'spaceBetween'} alignItems={'center'} >
          {<Typography
            css={{
              fontSize: '12px',
              lineHeight: '14px',
              color: '#BFBFBF'
            }}
          >
            {tx.status != "failed" || tx.type == "swap" ?  (tx.status == "failed" ? "":"Ethereum") : <Flex gap={1} alignItems={'center'}> <img src={tokenIn?.img} width="20" height="20" alt="" />
              <Typography css={{
                fontSize: "14px"
              }}>{roundToFirstNonZeroDecimal(tx?.data?.approve?.amount)} {tokenIn?.displayTicker}</Typography> </Flex>}
          </Typography>}
          <Typography
            css={{
              fontSize: '12px',
              lineHeight: '14px',
              color: '$primary'
            }}
          >
            <Link target='_blank' href={"https://goerli.etherscan.io/tx/" + tx.txHash}>
              {`${tx.txHash.substring(0, 4 + 2)}...${tx.txHash.substring(tx.txHash.length - 4)}`}
            </Link>
          </Typography>
        </Flex>
      </Stack>
    </Flex>
  );
};

const RecentTransactions = () => {
  const { address, isDisconnected } = useAccount()
  const [userTransactions, setUserTransactions] = useState<any>([])

  useEffect(() => {

    const fetchTransactions = async () => {
      if (address) {
        try {
          const response = await axios.get(`http://localhost:3000/api/transaction?address=${address}`);
          setUserTransactions(response.data);
        } catch (error) {
          console.error('Error fetching transactions:', error);
        }
      }
    };

    fetchTransactions();
  }, [address]);


  return (
    <Container css={{ flex: '1' }}>
      <Typography
        css={{
          fontSize: '20px',
          lineHeight: '24px',
          color: '#BFBFBF'
        }}
      >
        Recent transactions
      </Typography>
      <Stack
        css={{
          flex: '1',
          gap: '16px',
          // marginBottom: '3em',
          display: 'flex',
          maxHeight: "42em",
          overflowY: "scroll"
          // alignItems: 'center',
          // justifyContent: 'center'
        }}
      >
        {/* <TransactionItem icon={'/icons/circle-arrow-reload.svg'} />
        <TransactionItem icon={'/icons/circle-arrow-reload.svg'} />
        <TransactionItem icon={'/icons/resources-add.svg'} />
        <TransactionItem icon={'/icons/resources-remove.svg'} />
        <TransactionItem icon={'/icons/coins-01.svg'} />
        <TransactionItem icon={'/icons/alert-02.svg'} lastItem={true} /> */}
        {userTransactions.length ?
          userTransactions.map((tx, idx) => {

            return tx.data && <TransactionItem tx={tx} lastItem={idx == userTransactions.length - 1 ? true : false} />
          })


          : <NoTransactions />}
      </Stack>
    </Container>
  );
};

export default RecentTransactions;
