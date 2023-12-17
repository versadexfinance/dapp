import React, { useState } from 'react';
import Select, { Props as SelectProps } from 'react-select';
import { styled } from '@/styled';
import Typography from '../typography';
import { Flex, Stack } from '../box';
import { TriangleDownIcon } from '@radix-ui/react-icons';
import { Tokens, tokenList } from '@/web3/types';
import { useRecoilState } from 'recoil';
import { tokenInState, tokenOutState } from '@/pods/atoms/swap-selected-tokens.atom';
import Modal from '../modal/modal';
import SearchToken from '@/scenes/swap/components/search-token';

type ToekenSelectProps = {
  tokenPosition: 'in' | 'out';
};

const CustomDropdownIndicator: React.FC = () => (
  <TriangleDownIcon style={{ width: 16, height: 16, color: 'white' }} />
);

const CoinSelector = (props:ToekenSelectProps) => {
  const [tokenIn, setTokenInState] = useRecoilState(tokenInState);
  const [tokenOut, setTokenOutState] = useRecoilState(tokenOutState);
  const [modalOpen, setModalOpen] = useState(false)

  // const customStyles = {
  //   control: (provided: any, state: unknown) => ({
  //     ...provided,
  //     backgroundColor: 'transparent',
  //     borderRadius: '4px',
  //     border: '0',
  //     boxShadow: 'none',
  //     borderColor: 'transparent',
  //     focus: 'none',
  //     minHeight: '36px'
  //   }),
  //   menu: (provided: any) => ({
  //     ...provided,
  //     backgroundColor: 'black',
  //     focus: 'none',
  //     borderRadius: '4px',
  //     marginTop: '2px' // Adjust the menu position
  //   }),
  //   option: (provided: any, state: any) => ({
  //     ...provided,
  //     padding: '8px',
  //     cursor: 'pointer',
  //     focus: 'none',
  //     '&:hover': {
  //       backgroundColor: 'darkgray'
  //     }
  //   }),
  //   indicatorSeparator: (provided: any) => ({
  //     ...provided,
  //     display: 'none' // Hide the indicator separator
  //   })
  // };



  return (
      <>
       <Flex alignItems={'center'} gap={1} onClick={()=>setModalOpen(true)}>
            <img
              src={props.tokenPosition == "in" ? tokenIn?.img:tokenOut?.img}
              alt={props.tokenPosition == "in" ? tokenIn?.ticker:tokenOut?.ticker}
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
                {props.tokenPosition == "in" ? tokenIn?.displayTicker:tokenOut?.displayTicker}
              </Typography>
              <Typography
                css={{
                  fontSize: '12px',
                  lineHeight: '16px',
                  color: '#AFAFAF'
                }}
              >
                {props.tokenPosition == "in" ? tokenIn?.name: tokenOut?.name}
              </Typography>
            </Stack>
          </Flex>


      <Modal isOpen={modalOpen} onRequestClose={()=>{
        setModalOpen(false)
      }}>
        <SearchToken tokens={tokenList} tokenPosition={props.tokenPosition} closeModal={()=>{
          setModalOpen(false)
        }}/>
      </Modal>
      </>
  );
};

export default styled(CoinSelector, {});
