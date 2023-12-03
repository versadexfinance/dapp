'use client';
import Link from 'next/link';
import { ReactNode } from 'react';

// import { Locale } from '@/pods/i18n/interfaces';
// import { useLocaleClient } from '@/pods/i18n/locale-client-provider';
// import useAnimatedRouter from '@/pods/router/hooks/useTransitionRouter';
import { ComponentProps, focus, styled } from '@/styled';
import useAnimatedRouter from '@/pods/router/hooks/useTransitionRouter';

const StyledLink = styled(Link, {
  '&:focus-visible': focus.outline,
  borderRadius: '$2'
});

interface NextLinkProps extends ComponentProps<typeof StyledLink> {
  children: ReactNode;
  // locale?: Locale;
}

const NextLink = (props: NextLinkProps) => {
  // const locale = useLocaleClient();
  const { push } = useAnimatedRouter();

  // const url = `/${props.locale ?? locale}/${props.href}`;
  const url = `/${props.href}`;

  return <StyledLink {...props} onClick={() => push(url)} />;
};

export default NextLink;
