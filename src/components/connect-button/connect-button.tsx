'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import Button from '../button'
import { TriangleDownIcon } from '@radix-ui/react-icons'
import { useMediaQuery } from 'usehooks-ts'
import media from '@/styled/media'

import { Flex } from '../box'

const CustomConnectButton = (props: any) => (
  <Button
    {...props}
    css={{
      color: 'white',
      fontSize: '16px',
      textTransform: 'capitalize',
      fontWeight: 300,
      borderRadius: '4px',
      padding: '10px 16px',
    }}
  >
    <div
      style={{
        height: '20px',
        width: '20px',
        borderRadius: '50%',
        background: 'linear-gradient(90deg, #EBFE64 0%, #8CEA69 100%)',
      }}
    ></div>
    {props.children}
  </Button>
)

const ConnectWalletButton = () => {
  const gtThanMobile = useMediaQuery(media.mobile)

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading'
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated')

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                display: 'hidden',
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <CustomConnectButton onClick={openConnectModal} type="button">
                    Connect
                  </CustomConnectButton>
                )
              }
              if (chain.unsupported) {
                return (
                  <Button
                    css={{ background: '$error', color: '$bg-dark-0' }}
                    onClick={openChainModal}
                    size="md"
                    type="button"
                  >
                    Wrong network
                  </Button>
                )
              }
              return (
                <Flex css={{ gap: 8 }}>
                  <Button
                    onClick={openChainModal}
                    css={{
                      display: 'flex !important',
                      alignItems: 'center !important',
                      color: 'white !important',
                      textTransform: 'capitalize !important ',
                      background: 'transparent !important',
                      borderRadius: '4px !important',
                      border: '1px solid #424242 !important',
                      fontWeight: '500 !important',
                      padding: '10px 12px !important',
                      fontSize: '16px !important',
                    }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 20,
                          height: 20,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: gtThanMobile ? 4 : 0,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {gtThanMobile && chain.name}
                    <TriangleDownIcon />
                  </Button>
                  <CustomConnectButton
                    css={{
                      color: 'white',
                      fontSize: '16px',
                      textTransform: 'capitalize',
                      fontWeight: 300,
                      borderRadius: '4px',
                      padding: '10px 16px',
                    }}
                    onClick={openAccountModal}
                    type="button"
                  >
                    {account.displayName}

                    {account.displayBalance && gtThanMobile
                      ? ` (${account.displayBalance})`
                      : ''}
                  </CustomConnectButton>
                </Flex>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
export default ConnectWalletButton
