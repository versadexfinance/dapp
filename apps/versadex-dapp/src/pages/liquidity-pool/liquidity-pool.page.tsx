'use client';

import React from 'react';
import { useAccount, useBalance, useBlockNumber, useFeeData } from 'wagmi';

import Layout from '../dashboard/components/layout';

function LiquidityPoolPage() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { data: balanceData } = useBalance({
    address: address
  });
  const { data: blockNumberData } = useBlockNumber();

  const { data } = useFeeData();

  return (
    <Layout>
      <h2>{address}</h2>
      <h2>Is Connecting: {isConnecting ? 'true' : 'false'}</h2>
      <h2>Is Disconnected: {isDisconnected ? 'true' : 'false'}</h2>
      <div>
        Balance: {balanceData?.formatted} {balanceData?.symbol}
      </div>
      <div>BlockNumber: {blockNumberData?.toString()}</div>
      return <div>Fee data: {JSON.stringify(data?.formatted)}</div>; return{' '}
    </Layout>
  );
}

export default LiquidityPoolPage;
