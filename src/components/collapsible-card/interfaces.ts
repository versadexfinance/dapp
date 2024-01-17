interface Option {
  label: string
  value: string
  img?: string
  selectable: boolean
}

interface DropdownProps {
  options: Option[]
  onSelect: (value: string) => void
}
