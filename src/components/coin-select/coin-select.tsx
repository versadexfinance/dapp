import React from 'react';
import Select, { Props as SelectProps } from 'react-select';
import { styled } from '@/styled';
import Typography from '../typography';
import { Flex, Stack } from '../box';
import { TriangleDownIcon } from '@radix-ui/react-icons';
import { Tokens } from '@/web3/types';

type CustomSelectProps = SelectProps<any, false> & {
  options: Tokens[];
};

const CustomDropdownIndicator: React.FC = () => (
  <TriangleDownIcon style={{ width: 16, height: 16, color: 'white' }} />
);

const CoinSelector = ({ options, ...props }: CustomSelectProps) => {
  const customStyles = {
    control: (provided: any, state: unknown) => ({
      ...provided,
      backgroundColor: 'transparent',
      borderRadius: '4px',
      border: '0',
      boxShadow: 'none',
      borderColor: 'transparent',
      focus: 'none',
      minHeight: '36px'
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: 'black',
      focus: 'none',
      borderRadius: '4px',
      marginTop: '2px' // Adjust the menu position
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      padding: '8px',
      cursor: 'pointer',
      focus: 'none',
      '&:hover': {
        backgroundColor: 'darkgray'
      }
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      display: 'none' // Hide the indicator separator
    })
  };

  return (
    <Select
      options={options}
      isSearchable={false}
      getOptionLabel={(option: Tokens) =>
        (
          <Flex alignItems={'center'} gap={1}>
            <img
              src={option?.img}
              alt={option?.ticker}
              style={{ marginRight: '8px', height: '36px' }}
            />
            <Stack
              css={{
                gap: '4px'
              }}
            >
              <Typography
                css={{
                  fontSize: '20px',
                  lineHeight: '24px',
                  color: 'white' // Add text color
                }}
              >
                {option?.displayTicker}
              </Typography>
              <Typography
                css={{
                  fontSize: '12px',
                  lineHeight: '16px',
                  color: '#AFAFAF'
                }}
              >
                {option && option.name}
              </Typography>
            </Stack>
          </Flex>
        ) as any
      }
      styles={customStyles}
      components={{ DropdownIndicator: CustomDropdownIndicator }}
      {...props}
    />
  );
};

export default styled(CoinSelector, {});
