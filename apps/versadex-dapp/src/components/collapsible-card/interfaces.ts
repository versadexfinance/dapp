
interface Option {
  label: string;
  value: string;
  selectable: boolean;
}

interface DropdownProps {
  options: Option[];
  onSelect: (value: string) => void;
}