import { ReactNode } from "react";

export interface TabsProps {
  tabs: { label: string; content: ReactNode }[];
}