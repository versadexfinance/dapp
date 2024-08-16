import { ReactNode, forwardRef } from 'react'
import { ComponentProps, VariantProps } from '@/styled'
import { Container, InputComponent, Label } from './styles'
import { InputBaseProps } from '../input/input-base'
import { Flex } from '../box'

export interface InputProps
  extends Omit<InputBaseProps, 'size'>,
    Pick<ComponentProps<typeof Container>, 'error'>,
    VariantProps<typeof InputComponent> {
  rightElement?: ReactNode
  leftElement?: ReactNode
  disabled?: boolean
  label?: ReactNode
  styleContainer?: React.CSSProperties
}

const InputConversion = forwardRef<HTMLInputElement, InputProps>(
  (
    { rightElement, leftElement, label, disabled = false, error, ...props },
    ref,
  ) => (
    <Container css={...props.styleContainer} disabled={disabled} tabIndex={-1} error={error}>
      <Flex>
        <InputComponent
          pattern="[0-9]*"
          inputMode="decimal"
          type="number"
          disabled={disabled}
          ref={ref}
          {...props}
        />
        {rightElement && <Flex>{rightElement}</Flex>}
      </Flex>

      {label && <Label>{label}</Label>}
    </Container>
  ),
)

InputConversion.displayName = 'InputConversion'

export default InputConversion
