import React, { useState } from 'react'
import { styled } from '@/styled'
import { TriangleDownIcon, TriangleUpIcon } from '@radix-ui/react-icons'
import { AnimatePresence, motion } from 'framer-motion'

// Styled components for the collapsible card
const CardWrapper = styled('div', {
  border: '1px solid #2D2C2C',
  borderRadius: '8px',
  overflow: 'hidden',
  padding: '16px',
})

const CardHeader = styled('div', {
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  variants: {
    isOpen: {
      true: {
        paddingBottom: '16px',
      },
      false: {
        paddingBottom: '0px',
      },
    },
  },
})

const CardContent = styled(motion.div, {
  borderTop: '1px solid #1F1F1F',
  paddingTop: '16px',
})

const StyledCardContent = styled(CardContent, {
  // variants: {
  //   isOpen: {
  //     true: {
  //       opacity: 1,
  //       // height: 'auto', // Adjust as needed
  //     },
  //     false: {
  //       opacity: 0,
  //       height: 0,
  //     },
  //   },
  // },
})

const CollapsibleCard = ({ title, children }: any) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleCard = () => {
    setIsOpen(!isOpen)
  }

  return (
    <CardWrapper>
      <CardHeader isOpen={isOpen} onClick={toggleCard}>
        {title}
        <div>
          <motion.div
            style={{ paddingTop: '3px' }}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <TriangleDownIcon
              style={{
                scale: 1.5,
              }}
            />
          </motion.div>
        </div>
      </CardHeader>
      <AnimatePresence>
        {isOpen && (
          <CardContent
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 1, height: 0 },
            }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </CardContent>
        )}
      </AnimatePresence>
    </CardWrapper>
  )
}

export default CollapsibleCard
