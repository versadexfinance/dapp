'use client';

import { Flex, Stack } from '@/components/box';
import { Container, TotalValueSection } from './styles';
import Typography from '@/components/typography';
import { ChevronUpIcon } from '@radix-ui/react-icons';
import { formatNumber } from '@/pods/utils/number-format';
interface ValueLabelProps {
  label: string;
  value: number | string;
  valueFontSize?: string;
  valueColor?: string;
}

const ValueLabel = ({
  label,
  value,
  valueFontSize = '24px',
  valueColor = '#FFFFFF'
}: ValueLabelProps) => (
  <Stack justifyContent="end" gap={1}>
    <Typography
      css={{
        fontSize: '14px',
        lineHeight: '24px',
        color: '#AFAFAF'
      }}
    >
      {label}
    </Typography>
    <Typography
      css={{
        fontSize: valueFontSize,
        lineHeight: '32px',
        color: valueColor
      }}
    >
      {value}
    </Typography>
  </Stack>
);

interface DashboardHeaderProps {
  totalValue: number;
  lpTokensvalue: number;
  totalRewards: number;
  changePercent: number;
}

const DashboardHeader = ({
  totalValue,
  lpTokensvalue,
  totalRewards,
  changePercent
}: DashboardHeaderProps) => (
  <Container>
    <TotalValueSection gap={1}>
      <Typography
        weight={'500'}
        css={{
          color: '#F7FFBB',
          fontSize: '16px',
          lineHeight: '24px'
        }}
      >
        Total Value
      </Typography>
      <Flex gap={2} alignItems={'end'}>
        <Typography
          css={{
            fontSize: '40px',
            lineHeight: '48px'
          }}
        >
          {formatNumber(totalValue, true)}
        </Typography>
        <Typography
          css={{
            fontSize: '14px',
            fontWeight: '500',
            color: '$success',
            backgroundColor: '#01170D',
            borderRadius: '4px',
            padding: '2px 4px'
          }}
        >
          <ChevronUpIcon
            style={{
              verticalAlign: 'middle',
              marginRight: '2px'
            }}
          />
          {changePercent * 100}%
        </Typography>
      </Flex>
    </TotalValueSection>
    <Flex gap={4} alignItems={'end'}>
      <ValueLabel
        label="LP Tokens Value"
        value={formatNumber(lpTokensvalue, true)}
      />
      <Typography
        css={{
          height: '65%',
          width: '1px',
          backgroundColor: '#FFFFFF',
          marginBottom: '2px'
        }}
      ></Typography>
      <ValueLabel label="Total Rewards" value={formatNumber(totalRewards)} />
    </Flex>
  </Container>
);

export default DashboardHeader;
