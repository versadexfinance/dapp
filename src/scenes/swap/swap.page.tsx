// import DashboardHeader from '@/pages/dashboard/components/dashboard-header';
import React from 'react';
import Layout from '../dashboard/components/layout';

import { Flex } from '@/components/box';
import SwapGraph from './components/swap-graph';
import SwapCard from './components/swap-card';

function Dashboard() {
  return (
    <Layout >
      <Flex
        css={{
          marginTop: '$4',
          flexDirection: 'column',
          '@tabletLarge': {
            flexDirection: 'row',
            flex: 5
          }
        }}
        gap={8}
      >
        <SwapCard />
        <SwapGraph />
      </Flex>
    </Layout>
  );
}

export default Dashboard;
