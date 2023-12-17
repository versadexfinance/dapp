import { ReactNode } from "react";

export interface ModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    children: ReactNode;
  }