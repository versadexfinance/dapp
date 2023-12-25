'use client'

import Link from 'next/link'
import { ReactNode } from 'react'
import { ComponentProps, focus, styled } from '@/styled'
import useAnimatedRouter from '@/pods/router/hooks/useTransitionRouter'

const StyledLink = styled(Link, {
  '&:focus-visible': focus.outline,
  borderRadius: '$2',
})

interface NextLinkProps extends ComponentProps<typeof StyledLink> {
  children: ReactNode
  href: string
}

const NextLink = (props: NextLinkProps) => {
  const { push } = useAnimatedRouter()
  const url = `/${props.href}`

  return (
    <StyledLink {...props} onClick={() => push(url)}>
      {props.children}
    </StyledLink>
  )
}

export default NextLink
