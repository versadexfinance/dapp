// import DashboardHeader from '@/pages/dashboard/components/dashboard-header';
import React from 'react';
import Layout from '../dashboard/components/layout';
import SwapCard from './components/swap-card';
import { Flex, Stack } from '@/components/box';
import Typography from '@/components/typography/typography';
import SwapGraph from './components/swap-graph';

function Dashboard() {
  return (
    <Layout>
      <Flex
        css={{
          marginTop: '$8',
          flexDirection: 'column',
          '@tablet': {
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
