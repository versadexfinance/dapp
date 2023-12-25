'use client'
import ReactModal from 'react-modal'
import { Cross1Icon } from '@radix-ui/react-icons'

import { styled } from '@/styled'

import { ModalProps } from './interfaces'
import Typography from '../typography/typography'
import { Flex } from '../box'

import { motion, AnimatePresence } from 'framer-motion'
import { useMediaQuery } from 'usehooks-ts'
import media from '@/styled/media'

ReactModal.setAppElement('html')

const ModalOverlay = styled(motion.div, {
  // position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(1px)',
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const ModalContent = styled(motion.div, {
  background: '#131313',
  zIndex: 999,
  position: 'relative',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
  border: '1px solid #424242',
  padding: '16px',
  borderRadius: '8px',
  width: '100%',
  '@tablet': {
    width: 'fit-content',
    maxWidth: '80%',
    maxHeight: '80%',
  },
})

const Modal = ({ isOpen, onRequestClose: close, children }: ModalProps) => {
  const gtThanTablet = useMediaQuery(media.tablet)

  return (
    <AnimatePresence>
      <ReactModal
        shouldCloseOnEsc={true}
        isOpen={isOpen}
        onRequestClose={() => {
          close()
        }}
        shouldCloseOnOverlayClick={true}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            background: 'transparent',
            border: 'none',
            zIndex: 999,
          },
        }}
      >
        {
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => close()}
            css={{}}
          >
            <ModalContent
              initial={{ translateY: '100%' }}
              animate={{ translateY: gtThanTablet ? '0%' : '50%' }}
              exit={{ y: '-100%', transition: { duration: 4 } }}
              css={{
                minHeight: '500px',
              }}
              onClick={e => {
                e.stopPropagation()
              }}
            >
              {children}

              <div
                style={{
                  width: 'fit-content !important',
                  position: 'absolute',
                  top: gtThanTablet ? '-40px' : '15px',
                  right: gtThanTablet ? '0px' : '15px',
                  border: gtThanTablet ? '1px solid #424242' : 'none',
                  background: gtThanTablet ? '#131313' : 'transparent',
                  padding: '0 6px',
                  borderRadius: '4px',
                }}
              >
                <Flex
                  onClick={close}
                  alignItems={'center'}
                  gap={1}
                  css={{ cursor: 'pointer' }}
                >
                  <Typography>Close</Typography>
                  <Cross1Icon />
                </Flex>
              </div>
            </ModalContent>
          </ModalOverlay>
        }
      </ReactModal>
    </AnimatePresence>
  )
}

export default Modal
