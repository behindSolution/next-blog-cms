'use client';

import * as React from 'react';
import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import { cn } from '../../lib/utils';

interface TabsProps extends React.ComponentPropsWithoutRef<typeof BaseTabs.Root> {
  value?: string;
  onValueChange?: (value: string) => void;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ value, onValueChange, defaultValue, ...props }, ref) => (
    <BaseTabs.Root
      ref={ref}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange as (value: string | number | null, event: Event | undefined) => void}
      {...props}
    />
  )
);
Tabs.displayName = 'Tabs';

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseTabs.List>
>(({ className, ...props }, ref) => (
  <BaseTabs.List
    ref={ref}
    className={cn(
      'inline-flex h-10 items-center justify-center gap-1 rounded-lg bg-muted p-1 text-muted-foreground',
      className
    )}
    {...props}
  />
));
TabsList.displayName = 'TabsList';

interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof BaseTabs.Tab> {
  value: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, ...props }, ref) => (
    <BaseTabs.Tab
      ref={ref}
      value={value}
      className={cn(
        'inline-flex min-w-[100px] items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        'data-[selected]:bg-background data-[selected]:text-foreground data-[selected]:shadow-sm',
        'aria-[selected=true]:bg-background aria-[selected=true]:text-foreground aria-[selected=true]:shadow-sm',
        className
      )}
      {...props}
    />
  )
);
TabsTrigger.displayName = 'TabsTrigger';

interface TabsContentProps extends React.ComponentPropsWithoutRef<typeof BaseTabs.Panel> {
  value: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, ...props }, ref) => (
    <BaseTabs.Panel
      ref={ref}
      value={value}
      keepMounted={false}
      className={cn(
        'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
      {...props}
    />
  )
);
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };
