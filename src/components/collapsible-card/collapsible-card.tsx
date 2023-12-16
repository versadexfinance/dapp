import React, { useState } from 'react';
import { styled } from '@/styled';
import { TriangleDownIcon, TriangleUpIcon } from '@radix-ui/react-icons';

// Styled components for the collapsible card
const CardWrapper = styled('div', {
  border: '1px solid #2D2C2C',
  borderRadius: '8px',
  overflow: 'hidden',
  padding: '16px'
});

const CardHeader = styled('div', {
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  variants: {
    isOpen: {
      true: {
        paddingBottom: '16px'
      },
      false: {
        paddingBottom: '0px'
      }
    }
  }
});

const CardContent = styled('div', {
  borderTop: '1px solid #1F1F1F',
  paddingTop: '16px'
});

const StyledCardContent = styled(CardContent, {
  variants: {
    isOpen: {
      true: {
        display: 'block'
      },
      false: {
        display: 'none'
      }
    }
  }
});

const CollapsibleCard = ({ title, children }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };
  console.log(title);

  return (
    <CardWrapper>
      <CardHeader isOpen={isOpen} onClick={toggleCard}>
        {title}
        {isOpen ? <TriangleUpIcon /> : <TriangleDownIcon />}
      </CardHeader>
      <StyledCardContent isOpen={isOpen}>{children}</StyledCardContent>
    </CardWrapper>
  );
};

export default CollapsibleCard;
