import { ButtonHTMLAttributes, ReactNode } from "react";

export interface buttonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  apperanse?: "big" | "small"
}