'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:ring-primary',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 focus-visible:ring-destructive',
        'destructive-outline':
          'border border-destructive/50 text-destructive bg-transparent hover:bg-destructive/10 focus-visible:ring-destructive',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 focus-visible:ring-secondary',
        ghost:
          'hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring',
        link: 'text-primary underline-offset-4 hover:underline focus-visible:ring-primary',
      },
      size: {
        xs: 'h-7 rounded-md px-2 text-xs',
        sm: 'h-8 rounded-md px-3 text-xs',
        default: 'h-9 rounded-lg px-4',
        lg: 'h-10 rounded-lg px-5',
        xl: 'h-11 rounded-lg px-6 text-base',
        'icon-xs': 'h-7 w-7 rounded-md',
        'icon-sm': 'h-8 w-8 rounded-md',
        icon: 'h-9 w-9 rounded-lg',
        'icon-lg': 'h-10 w-10 rounded-lg',
        'icon-xl': 'h-11 w-11 rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild: _asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
