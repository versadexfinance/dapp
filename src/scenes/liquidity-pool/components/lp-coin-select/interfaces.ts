import { HTMLProps } from 'react';

export interface SelectItem {
  label: string;
  subLabel?: string;
  value: string;

}

export interface SelectProps extends HTMLProps<HTMLSelectElement> {
  options?: SelectItem[];
}
