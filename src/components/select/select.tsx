import React from 'react'
import Select, {
  components,
  SingleValueProps,
  StylesConfig,
} from 'react-select'
import Typography from '../typography/typography'
import { Flex } from '../box'

// Define the type for the crypto chain options

// Define your crypto chain options

const selectStyles: StylesConfig<Option> = {
  control: styles => ({
    ...styles,
    backgroundColor: '#131313',
    border: '1px solid #1F1F1F',
    borderRadius: '8px',
    padding: '4px',
    color: '#E1E1E1 !important',
    '&:hover': {
      borderColor: '#1F1F1F',
    },
  }),
  option: (styles, { isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isSelected
        ? 'rgba(235, 254, 100, 0.10)'
        : isFocused
          ? undefined
          : undefined,
      color: '#E1E1E1',
    }
  },
  input: styles => ({ ...styles, color: '#E1E1E1' }),
  placeholder: styles => ({ ...styles }),
  singleValue: styles => ({ ...styles, color: '#E1E1E1' }),
  dropdownIndicator: styles => ({
    ...styles,
    color: 'white',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  menu: styles => ({
    ...styles,
    boxShadow: '0 0 0 1px #2D2C2C',
    borderRadius: '4px',
    backgroundColor: '#131313',
  }),
}
const CustomOption = props => (
  <components.Option {...props}>
    <Flex gap={1}>
      <img
        src={props.data.img}
        style={{ width: 24, height: 24, marginRight: 10 }}
        alt=""
      />
      <Typography>{props.data.label}</Typography>
    </Flex>
  </components.Option>
)
const CustomSingleValue = (props: SingleValueProps<Option, false>) => (
  <components.SingleValue {...props}>
    <Flex gap={1}>
      <img
        src={props.data?.img}
        style={{ width: 24, height: 24, marginRight: 10 }}
        alt={props.data.label}
      />
      {props.children}
    </Flex>
  </components.SingleValue>
)

const CustomSelect = ({
  options,
  onSelect,
}: {
  options: Option[]
  onSelect: (option: Option) => void
}) => (
  <Select
    components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
    defaultValue={options[0]}
    options={options}
    styles={selectStyles}
  />
)

export default CustomSelect
