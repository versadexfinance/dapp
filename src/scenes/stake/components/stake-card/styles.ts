'use client'

import { Stack } from '@/components/box'
import { styled } from '@/styled'

export const Container = styled(Stack, {
  p: 4,
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  gap: 4,
  borderRadius: '8px',
  backgroundColor: '#131313',
})
