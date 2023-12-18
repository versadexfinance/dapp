'use client';
import ReactModal from 'react-modal';
import { Cross1Icon } from '@radix-ui/react-icons';

import { styled } from '@/styled';

import { ModalProps } from './interfaces';
import Typography from '../typography/typography';
import { Flex } from '../box';


ReactModal.setAppElement('html');

const ModalOverlay = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
   background: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(1px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 999
});

const ModalContent = styled('div', {
  background:"#131313",
  border: '1px solid #424242',
  padding: '16px',
  borderRadius: '8px',
  maxWidth: '80%',
  maxHeight: '80%',
  // overflow: 'auto',
  zIndex: 999,
  position: 'relative',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)'
});

const Modal = ({ isOpen, onRequestClose, children }: ModalProps) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9999
        },
        content: {
          background: 'transparent',
          border: 'none',
          zIndex: 999
        }
      }}
    >
      <ModalOverlay>
        <ModalContent css={{
          minHeight: "500px",
        }}>
            {children}

            <ModalContent css={{
              position: 'absolute',
              top: "-40px",
              right: 0,
              padding:"0 6px"
            }}>
              <Flex alignItems={"center"} gap={1} css={{
                cursor: 'pointer',
              }}>
                <Typography>
                  Close
                </Typography>
                <Cross1Icon
                  onClick={onRequestClose}
                />  
              </Flex>
            </ModalContent>
            
        </ModalContent>
      </ModalOverlay>
    </ReactModal>
  );
};

export default Modal;
