'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const inputVariants = cva(
  'flex w-full border border-input bg-background text-sm transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-8 rounded-md px-2.5 text-xs',
        default: 'h-9 rounded-lg px-3',
        lg: 'h-10 rounded-lg px-4',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  unstyled?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size, unstyled, ...props }, ref) => {
    if (unstyled) {
      return (
        <input
          type={type}
          className={className}
          ref={ref}
          {...props}
        />
      );
    }

    return (
      <input
        type={type}
        className={cn(inputVariants({ size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input, inputVariants };
