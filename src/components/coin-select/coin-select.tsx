import React, { useState } from 'react'
import { styled } from '@/styled'
import Typography from '../typography'
import { Flex, Stack } from '../box'
import { TriangleDownIcon } from '@radix-ui/react-icons'
import { Tokens, tokenList } from '@/web3/types'
import { RecoilState, useRecoilState } from 'recoil'
import {
  tokenInState,
  tokenOutState,
} from '@/pods/atoms/swap-selected-tokens.atom'
import Modal from '../modal/modal'
import SearchToken from '@/scenes/swap/components/search-token'
import { RxTriangleDown } from 'react-icons/rx'
import { AnimatePresence } from 'framer-motion'

type ToekenSelectProps = {
  tokenPosition: 'in' | 'out'
  disabled?: boolean
  stateTokenIn: RecoilState<Tokens>
  stateTokenOut: RecoilState<Tokens>
}

const CoinSelector = (props: ToekenSelectProps) => {
  const [tokenIn, setTokenInState] = useRecoilState(props.stateTokenIn)
  const [tokenOut, setTokenOutState] = useRecoilState(props.stateTokenOut)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Flex
        css={{
          cursor: props.disabled ? 'inherit' : 'pointer',
        }}
        alignItems={'center'}
        justifyContent={'spaceBetween'}
        gap={1}
        onClick={() => !props.disabled && setModalOpen(true)}
      >
        <Flex>
          <img
            width={36}
            height={36}
            src={
              (props.tokenPosition == 'in' ? tokenIn?.img : tokenOut?.img) ??
              '/img/default-token.png'
            }
            alt={
              props.tokenPosition == 'in' ? tokenIn?.ticker : tokenOut?.ticker
            }
            style={{ marginRight: '8px', height: '36px' }}
          />
          <Stack
            css={{
              gap: '4px',
            }}
          >
            <Typography
              css={{
                fontSize: '20px',
                lineHeight: '24px',
                color: 'white', // Add text color
              }}
            >
              {props.tokenPosition == 'in'
                ? tokenIn?.displayTicker
                : tokenOut?.displayTicker}
            </Typography>
            <Typography
              css={{
                fontSize: '12px',
                lineHeight: '16px',
                color: '#AFAFAF',
              }}
            >
              {props.tokenPosition == 'in' ? tokenIn?.name : tokenOut?.name}
            </Typography>
          </Stack>
        </Flex>
        {!props.disabled && <RxTriangleDown size={20} />}
      </Flex>

      <AnimatePresence>
        <Modal
          isOpen={modalOpen}
          onRequestClose={() => {
            setModalOpen(false)
          }}
        >
          <SearchToken
            tokens={tokenList}
            recoilInState={tokenInState}
            recoilOutState={tokenOutState}
            tokenPosition={props.tokenPosition}
            closeModal={() => {
              setModalOpen(false)
            }}
          />
        </Modal>
      </AnimatePresence>
    </>
  )
}

export default styled(CoinSelector, {})
