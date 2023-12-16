'use client';

import React, { FC, ReactNode } from 'react';
import { styled } from '@stitches/react';
import * as Tabs from '@radix-ui/react-tabs';

const TabsRoot = styled(Tabs.Root, {
  display: 'flex',
  flexDirection: 'column',
  width: '100%'
});

const TabsList = styled(Tabs.List, {
  display: 'flex',
  gap: '$2',
  marginBottom: '16px'
});

const TabsTrigger = styled(Tabs.Trigger, {
  boxSizing: 'border-box',
  backgroundColor: 'transparent',
  border: 'none',
  fontSize: '$-1',
  textTransform: 'capitalize',
  cursor: 'pointer',
  userSelect: 'none',
  fontWeight: 500,
  color: '#595959',
  '&:hover': {
    color: 'white'
  },
  '&[data-state="active"]': {
    color: 'white'
  }
});

const TabsContent = styled(Tabs.Content, {
  padding: '16px',
  paddingLeft: '0px',
  paddingRight: '0px'
});

interface TabsProps {
  children: ReactNode;
  defaultTabLabel: string;
}

const TabsComponent: FC<TabsProps> = ({ children, defaultTabLabel }) => {
  return (
    <TabsRoot defaultValue={defaultTabLabel}>
      <TabsList>
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child) && child.type === TabItem) {
            return (
              <TabsTrigger key={index} value={child.props.label}>
                {child.props.label}
              </TabsTrigger>
            );
          }
          return null;
        })}
      </TabsList>

      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && child.type === TabPanelItem) {
          return (
            <TabsContent key={index} value={child.props.label}>
              {child.props.children}
            </TabsContent>
          );
        }
        return null;
      })}
    </TabsRoot>
  );
};

export default TabsComponent;

interface TabItemProps {
  label: string;
  children: ReactNode;
}

export const TabItem: FC<TabItemProps> = ({ label, children }) => {
  return <>{children}</>;
};

export const TabPanelItem: FC<TabItemProps> = ({ children }) => {
  return <>{children}</>;
};
