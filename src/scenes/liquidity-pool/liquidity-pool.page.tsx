'use client';

import React from 'react';

import Layout from '../dashboard/components/layout';

function LiquidityPoolPage() {
  // const { address, isConnecting, isDisconnected } = useAccount();
  // const { data: balanceData } = useBalance({
  //   address: address
  // });
  // // const token = fetchToken(address);
  // const { data: blockNumberData } = useBlockNumber();
  // const data1 = useTokenBalance('0xB86BA39646270B1B546165d14cEe005d5466b18B');
  // const { data } = useFeeData();

  // const usePairResponse = usePair(
  //   config.contract.versadex,
  //   config.contract.weth
  // );
  // const usePricesResponse = usePrices(usePairResponse);

  return (
    <Layout>
      <h2>Liquidity pool</h2>
      {/* <h2>{address}</h2>
      {!data1.data && <pre>{JSON.stringify(data1)}</pre>}
      {usePairResponse && <pre>{JSON.stringify(usePairResponse)}</pre>}
      <h2>Use Prices response</h2>
      {<pre>{JSON.stringify(usePricesResponse)}</pre>}
      <h2>Is Connecting: {isConnecting ? 'true' : 'false'}</h2>
      <h2>Is Disconnected: {isDisconnected ? 'true' : 'false'}</h2>
      <div>
        Balance: {balanceData?.formatted} {balanceData?.symbol}
      </div>
      <div>BlockNumber: {blockNumberData?.toString()}</div>
      return <div>Fee data: {JSON.stringify(data?.formatted)}</div>; */}
    </Layout>
  );
}

export default LiquidityPoolPage;
