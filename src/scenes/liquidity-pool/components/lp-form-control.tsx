import { Stack } from '@/components/box'
import CardContainer from '@/components/card-container/card-container'
import Typography from '@/components/typography'
import React from 'react'

function LpFormControl({
  label,
  descripion,
  children,
}: {
  label: string
  descripion: string
  children?: React.ReactNode
}) {
  return (
    <CardContainer
      css={{
        background: 'transparent',
        border: 'none',
        flexDirection: 'column',
        gap: '1em',
        padding: '0',
      }}
    >
      <Stack
        gap={1}
        css={{
          maxWidth: '100%',
          '@tablet': {
            maxWidth: '70%',
          },
        }}
      >
        <Typography
          css={{
            fontSize: '20px',
            lineHeight: '32px',
            fontWeight: 600,
          }}
        >
          {label}
        </Typography>
        <Typography
          css={{
            color: '#AFAFAF',
            fontSize: '14px',
            lineHeight: '20px',
          }}
        >
          {descripion}
        </Typography>
      </Stack>
      {children}
    </CardContainer>
  )
}

export default LpFormControl
