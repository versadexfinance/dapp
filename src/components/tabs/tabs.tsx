'use client'

import React, { FC, ReactNode, useState } from 'react'
import { styled } from '@stitches/react'

import { TabsProps } from './interfaces'

const TabsRoot = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
})

const TabsList = styled('div', {
  display: 'flex',
  gap: 20,
  marginBottom: '16px',
})

const TabsTrigger = styled('span', {
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
    color: 'white',
  },
})

const TabsContent = styled('div', {
  padding: '16px',
  paddingLeft: '0px',
  paddingRight: '0px',
})

const TabsComponent: FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<number>(0)

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  return (
    <TabsRoot>
      <TabsList>
        {tabs.map((tab, index) => {
          return (
            <TabsTrigger
              css={{
                color: activeTab === index ? 'white' : '#595959',
              }}
              onClick={() => handleTabClick(index)}
              key={index}
            >
              {tab.label}
            </TabsTrigger>
          )
        })}
      </TabsList>

      <TabsContent>{tabs[activeTab].content}</TabsContent>
    </TabsRoot>
  )
}

export default TabsComponent

interface TabItemProps {
  label: string
  children: ReactNode
}

export const TabItem: FC<TabItemProps> = ({ label, children }) => {
  return <>{children}</>
}

export const TabPanelItem: FC<TabItemProps> = ({ children }) => {
  return <>{children}</>
}
