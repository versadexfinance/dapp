// Import necessary dependencies
import { ReactNode, forwardRef } from 'react';
import { ComponentProps, VariantProps } from '@/styled';
import { Container, InputComponent, Label } from './styles'; // Assuming you have a separate styled component for the label
import { InputBaseProps } from '../input/input-base';

// Define the modified props interface
export interface InputProps
  extends Omit<InputBaseProps, 'size'>,
    Pick<ComponentProps<typeof Container>, 'error'>,
    VariantProps<typeof InputComponent> {
  rightElement?: ReactNode;
  leftElement?: ReactNode;
  disabled?: boolean;
  label?: ReactNode; // New prop for the label
}

// Define the modified component
const InputConversion = forwardRef<HTMLInputElement, InputProps>(
  (
    { rightElement, leftElement, label, disabled = false, error, ...props },
    ref
  ) => (
    <Container disabled={disabled} tabIndex={-1} error={error}>
      <InputComponent type="number" disabled={disabled} ref={ref} {...props} />
      {label && <Label>{label}</Label>} {/* Render the label if provided */}
    </Container>
  )
);

InputConversion.displayName = 'InputConversion';

export default InputConversion;
