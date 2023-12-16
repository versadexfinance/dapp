import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { styled } from '@/styled'; // Import the 'styled' function from Stitches

const StyledDropdownMenu = styled(DropdownMenu.Root, {
  boxShadow: '0 0 0 1px #2D2C2C',
  border: '1px solid #2D2C2C', // Add border for a card-like appearance
  backgroundColor: '$bg',
  borderRadius: '4px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 2,
  padding: 0,
  appearance: 'none'
});

const StyledDropdownTrigger = styled(DropdownMenu.Trigger, {
  width: '100%',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '4px',
  boxShadow: '0 0 0 1px #2D2C2C'
});

const StyledDropdownMenuItem = styled(DropdownMenu.Item, {
  display: 'flex',
  padding: '8px', // Adjust padding for menu items
  cursor: 'pointer',
  color: 'black', // Default text color
  '&[data-disabled]': {
    cursor: 'not-allowed',
    color: 'gray'
  }
});

const StyledDropdownMenuContent = styled(DropdownMenu.Content, {
  width: '100%'
  // backgroundColor: 'blue'
});

const StyledButton = styled('button', {
  position: 'relative',
  padding: '8px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '4px',
  boxShadow: '0 0 0 1px #2D2C2C',
  cursor: 'pointer'
});

const DownArrowIcon = styled('span', {
  width: '0',
  height: '0',
  borderLeft: '6px solid transparent',
  borderRight: '6px solid transparent',
  borderTop: '6px solid black'
});

const Dropdown = ({ options }: DropdownProps) => {
  return (
    <StyledDropdownMenu>
      <StyledDropdownTrigger>
        <StyledButton>
          Open Dropdown
          <DownArrowIcon />
        </StyledButton>
      </StyledDropdownTrigger>

      <StyledDropdownMenuContent>
        {options.map((option) => (
          <StyledDropdownMenuItem
            key={option.value}
            data-disabled={!option.selectable}
          >
            {option.label}
          </StyledDropdownMenuItem>
        ))}
      </StyledDropdownMenuContent>
    </StyledDropdownMenu>
  );
};

export default Dropdown;
