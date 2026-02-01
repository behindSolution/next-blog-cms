import type { ReactNode } from 'react';

export type ToastProps = {
  id?: string;
  title?: ReactNode;
  description?: ReactNode;
  action?: ToastActionElement;
  variant?: 'default' | 'destructive';
  duration?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export type ToastActionElement = ReactNode;

export type Toast = ToastProps;
