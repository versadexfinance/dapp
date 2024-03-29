// 'use client';

import { Flex, Stack } from '@/components/box'
import Typography from '@/components/typography'
import Input from '@/components/input'
import { Tokens } from '@/web3/types'
import { useState } from 'react'
import { RecoilState, useRecoilState } from 'recoil'
import {
  tokenInState,
  tokenOutState,
} from '@/pods/atoms/swap-selected-tokens.atom'

type SearchTokenProps = {
  tokens: Tokens[]
  tokenPosition: 'in' | 'out'
  recoilInState: RecoilState<Tokens>
  recoilOutState: RecoilState<Tokens>
  closeModal: () => void
}

const SearchToken = (props: SearchTokenProps) => {
  const [searchTerm, setSearchTerm] = useState('')

  const [tokenOne, setTokenOne] = useRecoilState(props.recoilInState)
  const [tokenTwo, setTokenTwo] = useRecoilState(props.recoilOutState)

  const handleSelectedToken = (selectedToken: Tokens) => {
    if (
      tokenOne?.address === selectedToken?.address ||
      tokenTwo?.address === selectedToken?.address
    ) {
      const tempToken = { ...tokenOne }
      setTokenOne(tokenTwo)
      setTokenTwo(tempToken)
    }

    if (props.tokenPosition === 'in') {
      setTokenOne(selectedToken)
    } else {
      setTokenTwo(selectedToken)
    }

    props.closeModal()
  }

  const filteredTokens = props.tokens.filter((token: Tokens) => {
    const { address, ticker, name } = token
    const searchTermLower = searchTerm.toLowerCase()

    if (
      tokenOne?.address == token?.address ||
      tokenTwo?.address == token.address
    ) {
      return false
    }

    return (
      address.toLowerCase().includes(searchTermLower) ||
      ticker.toLowerCase().includes(searchTermLower) ||
      name.toLowerCase().includes(searchTermLower)
    )
  })

  return (
    <Stack
      gap={2}
      css={{
        minHeight: '400px',
      }}
    >
      <Typography
        css={{
          fontSize: '18px',
          fontWeight: '600',
        }}
      >
        Select a token
      </Typography>
      <Input
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        css={{
          width: '280px',
        }}
        size={'sm'}
        leftElement={<img src="/icons/MagnifyingGlass.svg" />}
        type="text"
        placeholder="search by name, symbol or address"
      />

      <Stack gap={1}>
        {filteredTokens.map((token: Tokens) => (
          <Flex
            onClick={() => handleSelectedToken(token)}
            css={{
              borderRadius: '4px',
              padding: '8px',
              cursor: 'pointer',
              '&:hover': {
                background: 'rgba(235, 254, 100, 0.10)',
              },
            }}
            alignItems={'center'}
            justifyContent={'spaceBetween'}
            key={token.address}
          >
            {token ? (
              <>
                <Flex gap={1}>
                  <img width={'24px'} height={'24px'} src={token.img} alt="" />
                  <Typography>{token.name}</Typography>
                </Flex>
                <Typography>{token.displayTicker}</Typography>
              </>
            ) : (
              <Flex gap={1}>
                <div
                  style={{
                    height: '20px',
                    width: '20px',
                    borderRadius: '50%',
                    background:
                      'linear-gradient(90deg, #EBFE64 0%, #8CEA69 100%)',
                  }}
                ></div>{' '}
                <Typography
                  css={{
                    fontSize: '18px',
                    fontWeight: '600',
                  }}
                >
                  Select a token
                </Typography>
              </Flex>
            )}
          </Flex>
        ))}
      </Stack>
    </Stack>
  )
}

export default SearchToken
