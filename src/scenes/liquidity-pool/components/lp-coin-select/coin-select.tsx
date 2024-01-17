import React, { useState } from 'react'
import { styled } from '@/styled'

import { TriangleDownIcon } from '@radix-ui/react-icons'
import { Tokens, tokenList } from '@/web3/types'
import { useRecoilState } from 'recoil'

import SearchToken from '@/scenes/swap/components/search-token'
import { RxTriangleDown } from 'react-icons/rx'
import { AnimatePresence } from 'framer-motion'
import Modal from '@/components/modal/modal'
import {
  lpPairOneState,
  lpPairTwoState,
} from '@/pods/atoms/liquidity-pool-form.atom'
import { Flex, Stack } from '@/components/box'
import Typography from '@/components/typography'
import CardContainer from '@/components/card-container/card-container'

const LpPairTokenSelect = ({ isIncrease }: { isIncrease?: boolean }) => {
  const [pairOne, setPairOneState] = useRecoilState(lpPairOneState)
  const [pairTwo, setPairTwoState] = useRecoilState(lpPairTwoState)
  const [modalOpen, setModalOpen] = useState(false)
  const [position, setPosition] = useState<'in' | 'out'>('in')

  return (
    <Flex gap={2} alignItems={'center'}>
      <CardContainer
        css={{
          cursor: 'not-allowed',
          flex: 1,
          opacity: '0.5',
        }}
        alignItems={'center'}
        justifyContent={'spaceBetween'}
        gap={1}
        onClick={() => {
          // setPosition('in')
          // setModalOpen(true)
        }}
      >
        <Flex alignItems={'center'} gap={1}>
          <img
            width={26}
            height={26}
            src={pairOne?.img}
            alt={pairOne?.ticker}
            style={{ marginRight: '8px', height: '26px' }}
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
              {pairOne?.displayTicker}
            </Typography>
          </Stack>
        </Flex>
        <RxTriangleDown size={20} />
      </CardContainer>
      <Typography
        css={{
          fontSize: '20px',
          lineHeight: '24px',
        }}
      >
        /
      </Typography>
      <CardContainer
        css={{
          flex: 1,
          cursor: isIncrease == true ? 'not-allowed' : 'pointer',
          opacity: isIncrease == true ? '0.5' : '1',
        }}
        alignItems={'center'}
        justifyContent={'spaceBetween'}
        gap={1}
        onClick={() => {
          setPosition('out')

          if (!isIncrease) {
            setModalOpen(true)
          }
        }}
      >
        <Flex alignItems={'center'} gap={1}>
          {pairTwo ? (
            <>
              <img
                width={26}
                height={26}
                src={pairTwo?.img}
                alt={pairTwo?.ticker}
                style={{ marginRight: '8px', height: '26px' }}
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
                  {pairTwo?.displayTicker}
                </Typography>
              </Stack>
            </>
          ) : (
            <Typography
              css={{
                fontSize: '18px',
                fontWeight: '600',
              }}
            >
              Select a token
            </Typography>
          )}
        </Flex>
        <RxTriangleDown size={20} />
      </CardContainer>
      <AnimatePresence>
        <Modal
          isOpen={modalOpen}
          onRequestClose={() => {
            setModalOpen(false)
          }}
        >
          <SearchToken
            recoilInState={lpPairOneState}
            recoilOutState={lpPairTwoState}
            tokens={tokenList}
            tokenPosition={position}
            closeModal={() => {
              setModalOpen(false)
            }}
          />
        </Modal>
      </AnimatePresence>
    </Flex>
  )
}

export default styled(LpPairTokenSelect, {})
