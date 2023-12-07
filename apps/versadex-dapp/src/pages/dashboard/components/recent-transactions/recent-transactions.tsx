'use client';

import Image from 'next/image';
import { useState } from 'react';

import Typography from '@/components/typography';

import { Flex, Stack } from '../../../../components/box';

import { Container } from '../position-card/styles';
import CoinImagePair from '@/components/coin-image-pair/coin-image-pair';

const NoTransactions = () => {
  return (
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
  );
};

const RecentTransactionItem = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Flex
      alignItems="center"
      gap="2"
      justifyContent="center"
      direction="row"
      css={{
        position: 'relative',
        width: 'fit-content',
        backgroundColor: '$background',
        p: 4,
        borderRadius: '$2'
      }}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <Image
        alt="Product"
        width="75"
        height="60"
        src={isHovered ? props.image.hover : props.image.default}
        style={{
          transition: 'opacity 0.3s ease-in-out',
          opacity: isHovered ? 0.8 : 1
        }}
      />
      <Stack>
        <Typography css={{ fontWeight: '$400' }}>{props.name}</Typography>
        <Typography
          css={{
            fontWeight: '$500',
            mb: '$0',
            textTransform: 'uppercase',
            fontSize: '$2'
          }}
        >
          {props.price.original.toLocaleString('es-ES', {
            minimumFractionDigits: 2
          })}
          €
        </Typography>
        <Typography>
          {/* {props.price.discount.toLocaleString('es-ES', { minimumFractionDigits: 2 })}€ */}
        </Typography>
      </Stack>
    </Flex>
  );
};

const TransactionItem = ({
  icon,
  lastItem
}: {
  icon: string;
  lastItem?: boolean;
}) => {
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
      <Stack gap={1}>
        <Flex gap={1}>
          <Typography
            css={{
              fontSize: '16px',
              lineHeight: '20px'
            }}
          >
            Swapped
          </Typography>
          <CoinImagePair
            coin1_src="/img/DAI.png"
            coin2_src="/img/ETH.png"
            size={16}
          />
          <Typography>100 ETH</Typography>
          <img src="/icons/arrow-right.svg" alt="" />
          <Typography>99.98 DAI</Typography>
        </Flex>
        <Flex justifyContent={'spaceBetween'}>
          <Typography
            css={{
              fontSize: '12px',
              lineHeight: '14px',
              color: '#BFBFBF'
            }}
          >
            Ethereum
          </Typography>
          <Typography
            css={{
              fontSize: '12px',
              lineHeight: '14px',
              color: '$primary'
            }}
          >
            0x3b6c...a6f7
          </Typography>
        </Flex>
      </Stack>
    </Flex>
  );
};

const RecentTransactions = () => {
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
          display: 'flex'
          // alignItems: 'center',
          // justifyContent: 'center'
        }}
      >
        {false && <NoTransactions />}
        <TransactionItem icon={'/icons/circle-arrow-reload.svg'} />
        <TransactionItem icon={'/icons/circle-arrow-reload.svg'} />
        <TransactionItem icon={'/icons/resources-add.svg'} />
        <TransactionItem icon={'/icons/resources-remove.svg'} />
        <TransactionItem icon={'/icons/coins-01.svg'} />
        <TransactionItem icon={'/icons/alert-02.svg'} lastItem={true} />
      </Stack>
    </Container>
  );
};

export default RecentTransactions;
