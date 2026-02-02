'use client';

import * as React from 'react';
import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

const Dialog = BaseDialog.Root;

interface DialogTriggerProps extends React.ComponentPropsWithoutRef<typeof BaseDialog.Trigger> {
  asChild?: boolean;
}

const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ asChild, children, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      return (
        <BaseDialog.Trigger ref={ref} render={children} {...props} />
      );
    }
    return (
      <BaseDialog.Trigger ref={ref} {...props}>
        {children}
      </BaseDialog.Trigger>
    );
  }
);
DialogTrigger.displayName = 'DialogTrigger';

const DialogPortal = BaseDialog.Portal;

interface DialogCloseProps extends React.ComponentPropsWithoutRef<typeof BaseDialog.Close> {
  asChild?: boolean;
}

const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ asChild, children, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      return (
        <BaseDialog.Close ref={ref} render={children} {...props} />
      );
    }
    return (
      <BaseDialog.Close ref={ref} {...props}>
        {children}
      </BaseDialog.Close>
    );
  }
);
DialogClose.displayName = 'DialogClose';

const DialogBackdrop = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Backdrop>
>(({ className, ...props }, ref) => (
  <BaseDialog.Backdrop
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity data-[ending-style]:opacity-0 data-[starting-style]:opacity-0',
      className
    )}
    {...props}
  />
));
DialogBackdrop.displayName = 'DialogBackdrop';

const DialogOverlay = DialogBackdrop;

interface DialogPopupProps
  extends React.ComponentPropsWithoutRef<typeof BaseDialog.Popup> {
  showCloseButton?: boolean;
}

const DialogPopup = React.forwardRef<HTMLDivElement, DialogPopupProps>(
  ({ className, children, showCloseButton = true, ...props }, ref) => (
    <DialogPortal>
      <DialogBackdrop />
      <BaseDialog.Popup
        ref={ref}
        className={cn(
          'fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl border border-border bg-card p-6 shadow-lg transition-all duration-200 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        )}
      </BaseDialog.Popup>
    </DialogPortal>
  )
);
DialogPopup.displayName = 'DialogPopup';

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}
    {...props}
  />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Title>
>(({ className, ...props }, ref) => (
  <BaseDialog.Title
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
DialogTitle.displayName = 'DialogTitle';

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Description>
>(({ className, ...props }, ref) => (
  <BaseDialog.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
DialogDescription.displayName = 'DialogDescription';

const DialogPanel = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('grid gap-4', className)} {...props} />
);
DialogPanel.displayName = 'DialogPanel';

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogBackdrop,
  DialogClose,
  DialogTrigger,
  DialogPopup,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogPanel,
};
