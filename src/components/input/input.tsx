'use client';
import { ReactNode, forwardRef } from 'react';

import { ComponentProps, VariantProps } from '@/styled';

import { InputBaseProps } from './input-base';
import { Container, InputComponent } from './styles';

export interface InputProps
  extends Omit<InputBaseProps, 'size'>,
    Pick<ComponentProps<typeof Container>, 'error'>,
    VariantProps<typeof InputComponent> {
  rightElement?: ReactNode;
  leftElement?: ReactNode;
  disabled?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ rightElement, leftElement, disabled = false, error, ...props }, ref) => (
    <Container disabled={disabled} tabIndex={-1} error={error}>
      {leftElement}
      <InputComponent disabled={disabled} ref={ref} {...props} />
      {rightElement}
    </Container>
  )
);

Input.displayName = 'Input';

export default Input;
