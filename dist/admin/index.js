'use client';
import { ChevronRight, Check, Circle, X, LogOut, LayoutDashboard, FileText, FolderTree, UsersRound, Languages, Sun, Moon, Plus, Wand2, Loader2, Bold, Italic, Strikethrough, Heading2, List, ListOrdered, Quote, Code, Link as Link$1, Undo2, Redo2 } from 'lucide-react';
import * as React from 'react';
import { createContext, useMemo, useEffect, useState, useCallback, useContext } from 'react';
import { useForm, useController } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { jsx, jsxs } from 'react/jsx-runtime';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import { useReactTable, getSortedRowModel, getCoreRowModel, flexRender } from '@tanstack/react-table';

// #style-inject:#style-inject
function styleInject(css, { insertAt } = {}) {
  if (typeof document === "undefined") return;
  const head = document.head || document.getElementsByTagName("head")[0];
  const style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

// src/admin/styles/generated.css
styleInject('*,\n::before,\n::after {\n  --tw-border-spacing-x: 0;\n  --tw-border-spacing-y: 0;\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x: ;\n  --tw-pan-y: ;\n  --tw-pinch-zoom: ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-gradient-from-position: ;\n  --tw-gradient-via-position: ;\n  --tw-gradient-to-position: ;\n  --tw-ordinal: ;\n  --tw-slashed-zero: ;\n  --tw-numeric-figure: ;\n  --tw-numeric-spacing: ;\n  --tw-numeric-fraction: ;\n  --tw-ring-inset: ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur: ;\n  --tw-brightness: ;\n  --tw-contrast: ;\n  --tw-grayscale: ;\n  --tw-hue-rotate: ;\n  --tw-invert: ;\n  --tw-saturate: ;\n  --tw-sepia: ;\n  --tw-drop-shadow: ;\n  --tw-backdrop-blur: ;\n  --tw-backdrop-brightness: ;\n  --tw-backdrop-contrast: ;\n  --tw-backdrop-grayscale: ;\n  --tw-backdrop-hue-rotate: ;\n  --tw-backdrop-invert: ;\n  --tw-backdrop-opacity: ;\n  --tw-backdrop-saturate: ;\n  --tw-backdrop-sepia: ;\n  --tw-contain-size: ;\n  --tw-contain-layout: ;\n  --tw-contain-paint: ;\n  --tw-contain-style: ;\n}\n::backdrop {\n  --tw-border-spacing-x: 0;\n  --tw-border-spacing-y: 0;\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x: ;\n  --tw-pan-y: ;\n  --tw-pinch-zoom: ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-gradient-from-position: ;\n  --tw-gradient-via-position: ;\n  --tw-gradient-to-position: ;\n  --tw-ordinal: ;\n  --tw-slashed-zero: ;\n  --tw-numeric-figure: ;\n  --tw-numeric-spacing: ;\n  --tw-numeric-fraction: ;\n  --tw-ring-inset: ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur: ;\n  --tw-brightness: ;\n  --tw-contrast: ;\n  --tw-grayscale: ;\n  --tw-hue-rotate: ;\n  --tw-invert: ;\n  --tw-saturate: ;\n  --tw-sepia: ;\n  --tw-drop-shadow: ;\n  --tw-backdrop-blur: ;\n  --tw-backdrop-brightness: ;\n  --tw-backdrop-contrast: ;\n  --tw-backdrop-grayscale: ;\n  --tw-backdrop-hue-rotate: ;\n  --tw-backdrop-invert: ;\n  --tw-backdrop-opacity: ;\n  --tw-backdrop-saturate: ;\n  --tw-backdrop-sepia: ;\n  --tw-contain-size: ;\n  --tw-contain-layout: ;\n  --tw-contain-paint: ;\n  --tw-contain-style: ;\n}\n*,\n::before,\n::after {\n  box-sizing: border-box;\n  border-width: 0;\n  border-style: solid;\n  border-color: #e5e7eb;\n}\n::before,\n::after {\n  --tw-content: "";\n}\nhtml,\n:host {\n  line-height: 1.5;\n  -webkit-text-size-adjust: 100%;\n  -moz-tab-size: 4;\n  -o-tab-size: 4;\n  tab-size: 4;\n  font-family:\n    ui-sans-serif,\n    system-ui,\n    sans-serif,\n    "Apple Color Emoji",\n    "Segoe UI Emoji",\n    "Segoe UI Symbol",\n    "Noto Color Emoji";\n  font-feature-settings: normal;\n  font-variation-settings: normal;\n  -webkit-tap-highlight-color: transparent;\n}\nbody {\n  margin: 0;\n  line-height: inherit;\n}\nhr {\n  height: 0;\n  color: inherit;\n  border-top-width: 1px;\n}\nabbr:where([title]) {\n  -webkit-text-decoration: underline dotted;\n  text-decoration: underline dotted;\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: inherit;\n  font-weight: inherit;\n}\na {\n  color: inherit;\n  text-decoration: inherit;\n}\nb,\nstrong {\n  font-weight: bolder;\n}\ncode,\nkbd,\nsamp,\npre {\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    Monaco,\n    Consolas,\n    "Liberation Mono",\n    "Courier New",\n    monospace;\n  font-feature-settings: normal;\n  font-variation-settings: normal;\n  font-size: 1em;\n}\nsmall {\n  font-size: 80%;\n}\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsub {\n  bottom: -0.25em;\n}\nsup {\n  top: -0.5em;\n}\ntable {\n  text-indent: 0;\n  border-color: inherit;\n  border-collapse: collapse;\n}\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit;\n  font-feature-settings: inherit;\n  font-variation-settings: inherit;\n  font-size: 100%;\n  font-weight: inherit;\n  line-height: inherit;\n  letter-spacing: inherit;\n  color: inherit;\n  margin: 0;\n  padding: 0;\n}\nbutton,\nselect {\n  text-transform: none;\n}\nbutton,\ninput:where([type=button]),\ninput:where([type=reset]),\ninput:where([type=submit]) {\n  -webkit-appearance: button;\n  background-color: transparent;\n  background-image: none;\n}\n:-moz-focusring {\n  outline: auto;\n}\n:-moz-ui-invalid {\n  box-shadow: none;\n}\nprogress {\n  vertical-align: baseline;\n}\n::-webkit-inner-spin-button,\n::-webkit-outer-spin-button {\n  height: auto;\n}\n[type=search] {\n  -webkit-appearance: textfield;\n  outline-offset: -2px;\n}\n::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  font: inherit;\n}\nsummary {\n  display: list-item;\n}\nblockquote,\ndl,\ndd,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\nfigure,\np,\npre {\n  margin: 0;\n}\nfieldset {\n  margin: 0;\n  padding: 0;\n}\nlegend {\n  padding: 0;\n}\nol,\nul,\nmenu {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\ndialog {\n  padding: 0;\n}\ntextarea {\n  resize: vertical;\n}\ninput::-moz-placeholder,\ntextarea::-moz-placeholder {\n  opacity: 1;\n  color: #9ca3af;\n}\ninput::placeholder,\ntextarea::placeholder {\n  opacity: 1;\n  color: #9ca3af;\n}\nbutton,\n[role=button] {\n  cursor: pointer;\n}\n:disabled {\n  cursor: default;\n}\nimg,\nsvg,\nvideo,\ncanvas,\naudio,\niframe,\nembed,\nobject {\n  display: block;\n  vertical-align: middle;\n}\nimg,\nvideo {\n  max-width: 100%;\n  height: auto;\n}\n[hidden]:where(:not([hidden=until-found])) {\n  display: none;\n}\n:root {\n  --background: 0 0% 100%;\n  --foreground: 222.2 84% 4.9%;\n  --muted: 210 20% 96%;\n  --muted-foreground: 215.4 16.3% 46.9%;\n  --popover: 0 0% 100%;\n  --popover-foreground: 222.2 84% 4.9%;\n  --border: 214.3 31.8% 91.4%;\n  --input: 214.3 31.8% 91.4%;\n  --card: 0 0% 100%;\n  --card-foreground: 222.2 84% 4.9%;\n  --primary: 221.2 83.2% 53.3%;\n  --primary-foreground: 210 40% 98%;\n  --secondary: 210 40% 96.1%;\n  --secondary-foreground: 222.2 47.4% 11.2%;\n  --accent: 210 40% 96.1%;\n  --accent-foreground: 222.2 47.4% 11.2%;\n  --destructive: 0 72.2% 50.6%;\n  --destructive-foreground: 210 40% 98%;\n  --ring: 221.2 83.2% 53.3%;\n  --radius: 0.75rem;\n}\n.dark {\n  --background: 0 0% 9%;\n  --foreground: 0 0% 96%;\n  --muted: 0 0% 16%;\n  --muted-foreground: 0 0% 70%;\n  --popover: 0 0% 12%;\n  --popover-foreground: 0 0% 96%;\n  --border: 0 0% 25%;\n  --input: 0 0% 25%;\n  --card: 0 0% 16%;\n  --card-foreground: 0 0% 96%;\n  --primary: 0 0% 25%;\n  --primary-foreground: 0 0% 96%;\n  --secondary: 0 0% 16%;\n  --secondary-foreground: 0 0% 96%;\n  --accent: 0 0% 16%;\n  --accent-foreground: 0 0% 96%;\n  --destructive: 0 62% 30%;\n  --destructive-foreground: 0 0% 96%;\n  --ring: 0 0% 25%;\n}\n* {\n  border-color: hsl(var(--border));\n}\nbody {\n  background-color: hsl(var(--background));\n  color: hsl(var(--foreground));\n}\n.dark .bg-card {\n  border-color: hsl(var(--border) / 0.7);\n}\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n.pointer-events-none {\n  pointer-events: none;\n}\n.pointer-events-auto {\n  pointer-events: auto;\n}\n.fixed {\n  position: fixed;\n}\n.absolute {\n  position: absolute;\n}\n.relative {\n  position: relative;\n}\n.left-2 {\n  left: 0.5rem;\n}\n.right-2 {\n  right: 0.5rem;\n}\n.right-4 {\n  right: 1rem;\n}\n.top-2 {\n  top: 0.5rem;\n}\n.top-4 {\n  top: 1rem;\n}\n.z-50 {\n  z-index: 50;\n}\n.z-\\[100\\] {\n  z-index: 100;\n}\n.-mx-1 {\n  margin-left: -0.25rem;\n  margin-right: -0.25rem;\n}\n.my-1 {\n  margin-top: 0.25rem;\n  margin-bottom: 0.25rem;\n}\n.ml-auto {\n  margin-left: auto;\n}\n.mt-4 {\n  margin-top: 1rem;\n}\n.block {\n  display: block;\n}\n.flex {\n  display: flex;\n}\n.inline-flex {\n  display: inline-flex;\n}\n.table {\n  display: table;\n}\n.grid {\n  display: grid;\n}\n.hidden {\n  display: none;\n}\n.h-10 {\n  height: 2.5rem;\n}\n.h-11 {\n  height: 2.75rem;\n}\n.h-12 {\n  height: 3rem;\n}\n.h-16 {\n  height: 4rem;\n}\n.h-2 {\n  height: 0.5rem;\n}\n.h-24 {\n  height: 6rem;\n}\n.h-3\\.5 {\n  height: 0.875rem;\n}\n.h-4 {\n  height: 1rem;\n}\n.h-5 {\n  height: 1.25rem;\n}\n.h-6 {\n  height: 1.5rem;\n}\n.h-8 {\n  height: 2rem;\n}\n.h-9 {\n  height: 2.25rem;\n}\n.h-px {\n  height: 1px;\n}\n.min-h-\\[80px\\] {\n  min-height: 80px;\n}\n.min-h-screen {\n  min-height: 100vh;\n}\n.w-10 {\n  width: 2.5rem;\n}\n.w-11 {\n  width: 2.75rem;\n}\n.w-2 {\n  width: 0.5rem;\n}\n.w-3\\.5 {\n  width: 0.875rem;\n}\n.w-4 {\n  width: 1rem;\n}\n.w-40 {\n  width: 10rem;\n}\n.w-5 {\n  width: 1.25rem;\n}\n.w-6 {\n  width: 1.5rem;\n}\n.w-64 {\n  width: 16rem;\n}\n.w-9 {\n  width: 2.25rem;\n}\n.w-full {\n  width: 100%;\n}\n.min-w-\\[10rem\\] {\n  min-width: 10rem;\n}\n.min-w-\\[120px\\] {\n  min-width: 120px;\n}\n.min-w-\\[8rem\\] {\n  min-width: 8rem;\n}\n.max-w-md {\n  max-width: 28rem;\n}\n.max-w-sm {\n  max-width: 24rem;\n}\n.flex-1 {\n  flex: 1 1 0%;\n}\n.flex-none {\n  flex: none;\n}\n.shrink-0 {\n  flex-shrink: 0;\n}\n.caption-bottom {\n  caption-side: bottom;\n}\n.rotate-0 {\n  --tw-rotate: 0deg;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.rotate-90 {\n  --tw-rotate: 90deg;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.scale-0 {\n  --tw-scale-x: 0;\n  --tw-scale-y: 0;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.scale-100 {\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.animate-spin {\n  animation: spin 1s linear infinite;\n}\n.cursor-default {\n  cursor: default;\n}\n.cursor-pointer {\n  cursor: pointer;\n}\n.select-none {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  user-select: none;\n}\n.flex-row {\n  flex-direction: row;\n}\n.flex-col {\n  flex-direction: column;\n}\n.flex-wrap {\n  flex-wrap: wrap;\n}\n.items-start {\n  align-items: flex-start;\n}\n.items-end {\n  align-items: flex-end;\n}\n.items-center {\n  align-items: center;\n}\n.justify-start {\n  justify-content: flex-start;\n}\n.justify-end {\n  justify-content: flex-end;\n}\n.justify-center {\n  justify-content: center;\n}\n.justify-between {\n  justify-content: space-between;\n}\n.gap-1 {\n  gap: 0.25rem;\n}\n.gap-2 {\n  gap: 0.5rem;\n}\n.gap-3 {\n  gap: 0.75rem;\n}\n.gap-4 {\n  gap: 1rem;\n}\n.gap-6 {\n  gap: 1.5rem;\n}\n.space-x-2 > :not([hidden]) ~ :not([hidden]) {\n  --tw-space-x-reverse: 0;\n  margin-right: calc(0.5rem * var(--tw-space-x-reverse));\n  margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));\n}\n.space-y-0 > :not([hidden]) ~ :not([hidden]) {\n  --tw-space-y-reverse: 0;\n  margin-top: calc(0px * calc(1 - var(--tw-space-y-reverse)));\n  margin-bottom: calc(0px * var(--tw-space-y-reverse));\n}\n.space-y-1 > :not([hidden]) ~ :not([hidden]) {\n  --tw-space-y-reverse: 0;\n  margin-top: calc(0.25rem * calc(1 - var(--tw-space-y-reverse)));\n  margin-bottom: calc(0.25rem * var(--tw-space-y-reverse));\n}\n.space-y-1\\.5 > :not([hidden]) ~ :not([hidden]) {\n  --tw-space-y-reverse: 0;\n  margin-top: calc(0.375rem * calc(1 - var(--tw-space-y-reverse)));\n  margin-bottom: calc(0.375rem * var(--tw-space-y-reverse));\n}\n.space-y-2 > :not([hidden]) ~ :not([hidden]) {\n  --tw-space-y-reverse: 0;\n  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));\n  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));\n}\n.space-y-4 > :not([hidden]) ~ :not([hidden]) {\n  --tw-space-y-reverse: 0;\n  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));\n  margin-bottom: calc(1rem * var(--tw-space-y-reverse));\n}\n.space-y-6 > :not([hidden]) ~ :not([hidden]) {\n  --tw-space-y-reverse: 0;\n  margin-top: calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));\n  margin-bottom: calc(1.5rem * var(--tw-space-y-reverse));\n}\n.overflow-auto {\n  overflow: auto;\n}\n.overflow-hidden {\n  overflow: hidden;\n}\n.overflow-y-auto {\n  overflow-y: auto;\n}\n.whitespace-nowrap {\n  white-space: nowrap;\n}\n.rounded {\n  border-radius: 0.25rem;\n}\n.rounded-full {\n  border-radius: 9999px;\n}\n.rounded-lg {\n  border-radius: var(--radius);\n}\n.rounded-md {\n  border-radius: calc(var(--radius) - 2px);\n}\n.rounded-sm {\n  border-radius: calc(var(--radius) - 4px);\n}\n.border {\n  border-width: 1px;\n}\n.border-2 {\n  border-width: 2px;\n}\n.border-b {\n  border-bottom-width: 1px;\n}\n.border-r {\n  border-right-width: 1px;\n}\n.border-t {\n  border-top-width: 1px;\n}\n.border-blue-200 {\n  --tw-border-opacity: 1;\n  border-color: rgb(191 219 254 / var(--tw-border-opacity, 1));\n}\n.border-border {\n  border-color: hsl(var(--border));\n}\n.border-destructive {\n  border-color: hsl(var(--destructive));\n}\n.border-input {\n  border-color: hsl(var(--input));\n}\n.border-transparent {\n  border-color: transparent;\n}\n.bg-background {\n  background-color: hsl(var(--background));\n}\n.bg-blue-50 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(239 246 255 / var(--tw-bg-opacity, 1));\n}\n.bg-card {\n  background-color: hsl(var(--card));\n}\n.bg-card\\/40 {\n  background-color: hsl(var(--card) / 0.4);\n}\n.bg-card\\/60 {\n  background-color: hsl(var(--card) / 0.6);\n}\n.bg-destructive {\n  background-color: hsl(var(--destructive));\n}\n.bg-muted {\n  background-color: hsl(var(--muted));\n}\n.bg-muted\\/20 {\n  background-color: hsl(var(--muted) / 0.2);\n}\n.bg-muted\\/30 {\n  background-color: hsl(var(--muted) / 0.3);\n}\n.bg-muted\\/40 {\n  background-color: hsl(var(--muted) / 0.4);\n}\n.bg-popover {\n  background-color: hsl(var(--popover));\n}\n.bg-primary {\n  background-color: hsl(var(--primary));\n}\n.bg-secondary {\n  background-color: hsl(var(--secondary));\n}\n.fill-current {\n  fill: currentColor;\n}\n.p-0 {\n  padding: 0px;\n}\n.p-1 {\n  padding: 0.25rem;\n}\n.p-2 {\n  padding: 0.5rem;\n}\n.p-4 {\n  padding: 1rem;\n}\n.p-6 {\n  padding: 1.5rem;\n}\n.px-2 {\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n}\n.px-2\\.5 {\n  padding-left: 0.625rem;\n  padding-right: 0.625rem;\n}\n.px-3 {\n  padding-left: 0.75rem;\n  padding-right: 0.75rem;\n}\n.px-4 {\n  padding-left: 1rem;\n  padding-right: 1rem;\n}\n.px-5 {\n  padding-left: 1.25rem;\n  padding-right: 1.25rem;\n}\n.px-6 {\n  padding-left: 1.5rem;\n  padding-right: 1.5rem;\n}\n.py-0\\.5 {\n  padding-top: 0.125rem;\n  padding-bottom: 0.125rem;\n}\n.py-1 {\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n}\n.py-1\\.5 {\n  padding-top: 0.375rem;\n  padding-bottom: 0.375rem;\n}\n.py-2 {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n}\n.py-3 {\n  padding-top: 0.75rem;\n  padding-bottom: 0.75rem;\n}\n.pb-2 {\n  padding-bottom: 0.5rem;\n}\n.pl-8 {\n  padding-left: 2rem;\n}\n.pr-2 {\n  padding-right: 0.5rem;\n}\n.pt-0 {\n  padding-top: 0px;\n}\n.text-left {\n  text-align: left;\n}\n.text-center {\n  text-align: center;\n}\n.align-middle {\n  vertical-align: middle;\n}\n.text-2xl {\n  font-size: 1.5rem;\n  line-height: 2rem;\n}\n.text-3xl {\n  font-size: 1.875rem;\n  line-height: 2.25rem;\n}\n.text-base {\n  font-size: 1rem;\n  line-height: 1.5rem;\n}\n.text-lg {\n  font-size: 1.125rem;\n  line-height: 1.75rem;\n}\n.text-sm {\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n}\n.text-xs {\n  font-size: 0.75rem;\n  line-height: 1rem;\n}\n.font-medium {\n  font-weight: 500;\n}\n.font-semibold {\n  font-weight: 600;\n}\n.uppercase {\n  text-transform: uppercase;\n}\n.italic {\n  font-style: italic;\n}\n.leading-none {\n  line-height: 1;\n}\n.tracking-tight {\n  letter-spacing: -0.025em;\n}\n.tracking-widest {\n  letter-spacing: 0.1em;\n}\n.text-blue-700 {\n  --tw-text-opacity: 1;\n  color: rgb(29 78 216 / var(--tw-text-opacity, 1));\n}\n.text-card-foreground {\n  color: hsl(var(--card-foreground));\n}\n.text-destructive {\n  color: hsl(var(--destructive));\n}\n.text-destructive-foreground {\n  color: hsl(var(--destructive-foreground));\n}\n.text-foreground {\n  color: hsl(var(--foreground));\n}\n.text-foreground\\/60 {\n  color: hsl(var(--foreground) / 0.6);\n}\n.text-muted-foreground {\n  color: hsl(var(--muted-foreground));\n}\n.text-popover-foreground {\n  color: hsl(var(--popover-foreground));\n}\n.text-primary {\n  color: hsl(var(--primary));\n}\n.text-primary-foreground {\n  color: hsl(var(--primary-foreground));\n}\n.text-secondary-foreground {\n  color: hsl(var(--secondary-foreground));\n}\n.underline-offset-4 {\n  text-underline-offset: 4px;\n}\n.opacity-0 {\n  opacity: 0;\n}\n.opacity-70 {\n  opacity: 0.7;\n}\n.shadow {\n  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);\n  box-shadow:\n    var(--tw-ring-offset-shadow, 0 0 #0000),\n    var(--tw-ring-shadow, 0 0 #0000),\n    var(--tw-shadow);\n}\n.shadow-lg {\n  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);\n  box-shadow:\n    var(--tw-ring-offset-shadow, 0 0 #0000),\n    var(--tw-ring-shadow, 0 0 #0000),\n    var(--tw-shadow);\n}\n.shadow-md {\n  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);\n  box-shadow:\n    var(--tw-ring-offset-shadow, 0 0 #0000),\n    var(--tw-ring-shadow, 0 0 #0000),\n    var(--tw-shadow);\n}\n.shadow-sm {\n  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);\n  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);\n  box-shadow:\n    var(--tw-ring-offset-shadow, 0 0 #0000),\n    var(--tw-ring-shadow, 0 0 #0000),\n    var(--tw-shadow);\n}\n.outline-none {\n  outline: 2px solid transparent;\n  outline-offset: 2px;\n}\n.outline {\n  outline-style: solid;\n}\n.ring-0 {\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow:\n    var(--tw-ring-offset-shadow),\n    var(--tw-ring-shadow),\n    var(--tw-shadow, 0 0 #0000);\n}\n.ring-offset-background {\n  --tw-ring-offset-color: hsl(var(--background));\n}\n.blur {\n  --tw-blur: blur(8px);\n  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);\n}\n.filter {\n  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);\n}\n.transition-all {\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n.transition-colors {\n  transition-property:\n    color,\n    background-color,\n    border-color,\n    text-decoration-color,\n    fill,\n    stroke;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n.transition-opacity {\n  transition-property: opacity;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n.transition-transform {\n  transition-property: transform;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n@keyframes enter {\n  from {\n    opacity: var(--tw-enter-opacity, 1);\n    transform: translate3d(var(--tw-enter-translate-x, 0), var(--tw-enter-translate-y, 0), 0) scale3d(var(--tw-enter-scale, 1), var(--tw-enter-scale, 1), var(--tw-enter-scale, 1)) rotate(var(--tw-enter-rotate, 0));\n  }\n}\n@keyframes exit {\n  to {\n    opacity: var(--tw-exit-opacity, 1);\n    transform: translate3d(var(--tw-exit-translate-x, 0), var(--tw-exit-translate-y, 0), 0) scale3d(var(--tw-exit-scale, 1), var(--tw-exit-scale, 1), var(--tw-exit-scale, 1)) rotate(var(--tw-exit-rotate, 0));\n  }\n}\n.tiptap {\n  min-height: 240px;\n  outline: none;\n  white-space: pre-wrap;\n}\n.tiptap:focus {\n  outline: none;\n}\n.tiptap p {\n  margin: 0 0 1rem;\n}\n.tiptap p:last-child {\n  margin-bottom: 0;\n}\n.tiptap h2,\n.tiptap h3,\n.tiptap h4 {\n  font-weight: 600;\n  line-height: 1.2;\n  margin: 1.5rem 0 0.75rem;\n}\n.tiptap ul,\n.tiptap ol {\n  margin: 0 0 1rem;\n  padding-left: 1.25rem;\n}\n.tiptap li {\n  margin-bottom: 0.25rem;\n}\n.tiptap blockquote {\n  border-left: 2px solid hsl(var(--border));\n  color: hsl(var(--muted-foreground));\n  font-style: italic;\n  margin: 0 0 1rem;\n  padding-left: 1rem;\n}\n.tiptap pre {\n  background-color: hsl(var(--muted));\n  border-radius: 0.5rem;\n  color: hsl(var(--muted-foreground));\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    Monaco,\n    Consolas,\n    "Liberation Mono",\n    "Courier New",\n    monospace;\n  font-size: 0.875rem;\n  margin: 0 0 1rem;\n  overflow-x: auto;\n  padding: 0.75rem 1rem;\n}\n.dark .tiptap pre {\n  background-color: hsl(var(--muted) / 0.4);\n}\n.tiptap code {\n  background-color: hsl(var(--muted) / 0.4);\n  border-radius: 0.375rem;\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    Monaco,\n    Consolas,\n    "Liberation Mono",\n    "Courier New",\n    monospace;\n  font-size: 0.875rem;\n  padding: 0.125rem 0.375rem;\n}\n.tiptap pre code {\n  background-color: transparent;\n  padding: 0;\n}\n.tiptap a {\n  color: hsl(var(--primary));\n  text-decoration: underline;\n}\n.tiptap hr {\n  border: none;\n  border-top: 1px solid hsl(var(--border));\n  margin: 2rem 0;\n}\n.tiptap img {\n  border-radius: 0.5rem;\n  height: auto;\n  max-width: 100%;\n}\n.tiptap strong {\n  font-weight: 600;\n}\n.file\\:border-0::file-selector-button {\n  border-width: 0px;\n}\n.file\\:bg-transparent::file-selector-button {\n  background-color: transparent;\n}\n.file\\:text-sm::file-selector-button {\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n}\n.file\\:font-medium::file-selector-button {\n  font-weight: 500;\n}\n.placeholder\\:text-muted-foreground::-moz-placeholder {\n  color: hsl(var(--muted-foreground));\n}\n.placeholder\\:text-muted-foreground::placeholder {\n  color: hsl(var(--muted-foreground));\n}\n.hover\\:bg-accent:hover {\n  background-color: hsl(var(--accent));\n}\n.hover\\:bg-destructive\\/80:hover {\n  background-color: hsl(var(--destructive) / 0.8);\n}\n.hover\\:bg-destructive\\/90:hover {\n  background-color: hsl(var(--destructive) / 0.9);\n}\n.hover\\:bg-muted\\/50:hover {\n  background-color: hsl(var(--muted) / 0.5);\n}\n.hover\\:bg-primary\\/80:hover {\n  background-color: hsl(var(--primary) / 0.8);\n}\n.hover\\:bg-primary\\/90:hover {\n  background-color: hsl(var(--primary) / 0.9);\n}\n.hover\\:bg-secondary\\/80:hover {\n  background-color: hsl(var(--secondary) / 0.8);\n}\n.hover\\:text-accent-foreground:hover {\n  color: hsl(var(--accent-foreground));\n}\n.hover\\:text-foreground:hover {\n  color: hsl(var(--foreground));\n}\n.hover\\:underline:hover {\n  text-decoration-line: underline;\n}\n.focus\\:bg-accent:focus {\n  background-color: hsl(var(--accent));\n}\n.focus\\:text-accent-foreground:focus {\n  color: hsl(var(--accent-foreground));\n}\n.focus\\:opacity-100:focus {\n  opacity: 1;\n}\n.focus\\:outline-none:focus {\n  outline: 2px solid transparent;\n  outline-offset: 2px;\n}\n.focus\\:ring-2:focus {\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow:\n    var(--tw-ring-offset-shadow),\n    var(--tw-ring-shadow),\n    var(--tw-shadow, 0 0 #0000);\n}\n.focus\\:ring-ring:focus {\n  --tw-ring-color: hsl(var(--ring));\n}\n.focus\\:ring-offset-2:focus {\n  --tw-ring-offset-width: 2px;\n}\n.focus-visible\\:outline-none:focus-visible {\n  outline: 2px solid transparent;\n  outline-offset: 2px;\n}\n.focus-visible\\:ring-2:focus-visible {\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow:\n    var(--tw-ring-offset-shadow),\n    var(--tw-ring-shadow),\n    var(--tw-shadow, 0 0 #0000);\n}\n.focus-visible\\:ring-ring:focus-visible {\n  --tw-ring-color: hsl(var(--ring));\n}\n.focus-visible\\:ring-offset-2:focus-visible {\n  --tw-ring-offset-width: 2px;\n}\n.focus-visible\\:ring-offset-background:focus-visible {\n  --tw-ring-offset-color: hsl(var(--background));\n}\n.disabled\\:pointer-events-none:disabled {\n  pointer-events: none;\n}\n.disabled\\:cursor-not-allowed:disabled {\n  cursor: not-allowed;\n}\n.disabled\\:opacity-50:disabled {\n  opacity: 0.5;\n}\n.group:hover .group-hover\\:opacity-100 {\n  opacity: 1;\n}\n.group.destructive .group-\\[\\.destructive\\]\\:border-muted\\/40 {\n  border-color: hsl(var(--muted) / 0.4);\n}\n.group.destructive .group-\\[\\.destructive\\]\\:text-destructive-foreground\\/70 {\n  color: hsl(var(--destructive-foreground) / 0.7);\n}\n.group.destructive .group-\\[\\.destructive\\]\\:hover\\:border-destructive\\/30:hover {\n  border-color: hsl(var(--destructive) / 0.3);\n}\n.group.destructive .group-\\[\\.destructive\\]\\:hover\\:bg-destructive:hover {\n  background-color: hsl(var(--destructive));\n}\n.group.destructive .group-\\[\\.destructive\\]\\:hover\\:text-destructive-foreground:hover {\n  color: hsl(var(--destructive-foreground));\n}\n.peer:disabled ~ .peer-disabled\\:cursor-not-allowed {\n  cursor: not-allowed;\n}\n.peer:disabled ~ .peer-disabled\\:opacity-70 {\n  opacity: 0.7;\n}\n.data-\\[disabled\\]\\:pointer-events-none[data-disabled] {\n  pointer-events: none;\n}\n.data-\\[state\\=checked\\]\\:translate-x-5[data-state=checked] {\n  --tw-translate-x: 1.25rem;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.data-\\[state\\=unchecked\\]\\:-translate-x-0[data-state=unchecked] {\n  --tw-translate-x: -0px;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.data-\\[swipe\\=cancel\\]\\:translate-x-0[data-swipe=cancel] {\n  --tw-translate-x: 0px;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.data-\\[swipe\\=end\\]\\:translate-x-\\[var\\(--radix-toast-swipe-end-x\\)\\][data-swipe=end] {\n  --tw-translate-x: var(--radix-toast-swipe-end-x);\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.data-\\[swipe\\=move\\]\\:translate-x-\\[var\\(--radix-toast-swipe-move-x\\)\\][data-swipe=move] {\n  --tw-translate-x: var(--radix-toast-swipe-move-x);\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.data-\\[state\\=active\\]\\:bg-background[data-state=active] {\n  background-color: hsl(var(--background));\n}\n.data-\\[state\\=checked\\]\\:bg-primary[data-state=checked] {\n  background-color: hsl(var(--primary));\n}\n.data-\\[state\\=open\\]\\:bg-accent[data-state=open] {\n  background-color: hsl(var(--accent));\n}\n.data-\\[state\\=selected\\]\\:bg-muted[data-state=selected] {\n  background-color: hsl(var(--muted));\n}\n.data-\\[state\\=unchecked\\]\\:bg-input[data-state=unchecked] {\n  background-color: hsl(var(--input));\n}\n.data-\\[state\\=active\\]\\:text-foreground[data-state=active] {\n  color: hsl(var(--foreground));\n}\n.data-\\[disabled\\]\\:opacity-50[data-disabled] {\n  opacity: 0.5;\n}\n.data-\\[swipe\\=end\\]\\:opacity-0[data-swipe=end] {\n  opacity: 0;\n}\n.data-\\[state\\=active\\]\\:shadow-sm[data-state=active] {\n  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);\n  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);\n  box-shadow:\n    var(--tw-ring-offset-shadow, 0 0 #0000),\n    var(--tw-ring-shadow, 0 0 #0000),\n    var(--tw-shadow);\n}\n.data-\\[state\\=open\\]\\:animate-in[data-state=open] {\n  animation-name: enter;\n  animation-duration: 150ms;\n  --tw-enter-opacity: initial;\n  --tw-enter-scale: initial;\n  --tw-enter-rotate: initial;\n  --tw-enter-translate-x: initial;\n  --tw-enter-translate-y: initial;\n}\n.data-\\[state\\=closed\\]\\:animate-out[data-state=closed] {\n  animation-name: exit;\n  animation-duration: 150ms;\n  --tw-exit-opacity: initial;\n  --tw-exit-scale: initial;\n  --tw-exit-rotate: initial;\n  --tw-exit-translate-x: initial;\n  --tw-exit-translate-y: initial;\n}\n.data-\\[state\\=closed\\]\\:fade-out[data-state=closed] {\n  --tw-exit-opacity: 0;\n}\n.data-\\[state\\=open\\]\\:fade-in[data-state=open] {\n  --tw-enter-opacity: 0;\n}\n.data-\\[state\\=closed\\]\\:zoom-out-95[data-state=closed] {\n  --tw-exit-scale: .95;\n}\n.data-\\[state\\=open\\]\\:zoom-in-95[data-state=open] {\n  --tw-enter-scale: .95;\n}\n.data-\\[state\\=closed\\]\\:slide-out-to-left[data-state=closed] {\n  --tw-exit-translate-x: -100%;\n}\n.data-\\[state\\=closed\\]\\:slide-out-to-top[data-state=closed] {\n  --tw-exit-translate-y: -100%;\n}\n.data-\\[state\\=open\\]\\:slide-in-from-left[data-state=open] {\n  --tw-enter-translate-x: -100%;\n}\n.data-\\[state\\=open\\]\\:slide-in-from-top-1[data-state=open] {\n  --tw-enter-translate-y: -0.25rem;\n}\n.dark\\:-rotate-90:is(.dark *) {\n  --tw-rotate: -90deg;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.dark\\:rotate-0:is(.dark *) {\n  --tw-rotate: 0deg;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.dark\\:scale-0:is(.dark *) {\n  --tw-scale-x: 0;\n  --tw-scale-y: 0;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.dark\\:scale-100:is(.dark *) {\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.dark\\:border-blue-500\\/30:is(.dark *) {\n  border-color: rgb(59 130 246 / 0.3);\n}\n.dark\\:bg-blue-500\\/10:is(.dark *) {\n  background-color: rgb(59 130 246 / 0.1);\n}\n.dark\\:text-blue-200:is(.dark *) {\n  --tw-text-opacity: 1;\n  color: rgb(191 219 254 / var(--tw-text-opacity, 1));\n}\n@media (min-width: 640px) {\n  .sm\\:inline {\n    display: inline;\n  }\n  .sm\\:flex {\n    display: flex;\n  }\n  .sm\\:grid-cols-\\[200px\\,1fr\\,120px\\] {\n    grid-template-columns: 200px 1fr 120px;\n  }\n  .sm\\:flex-row {\n    flex-direction: row;\n  }\n  .sm\\:items-center {\n    align-items: center;\n  }\n  .sm\\:justify-between {\n    justify-content: space-between;\n  }\n  .sm\\:gap-3 {\n    gap: 0.75rem;\n  }\n  .sm\\:p-0 {\n    padding: 0px;\n  }\n}\n@media (min-width: 768px) {\n  .md\\:col-span-2 {\n    grid-column: span 2 / span 2;\n  }\n  .md\\:grid-cols-2 {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  .md\\:p-6 {\n    padding: 1.5rem;\n  }\n  .md\\:px-6 {\n    padding-left: 1.5rem;\n    padding-right: 1.5rem;\n  }\n  .md\\:text-xl {\n    font-size: 1.25rem;\n    line-height: 1.75rem;\n  }\n}\n@media (min-width: 1024px) {\n  .lg\\:flex {\n    display: flex;\n  }\n  .lg\\:hidden {\n    display: none;\n  }\n  .lg\\:flex-col {\n    flex-direction: column;\n  }\n  .lg\\:p-8 {\n    padding: 2rem;\n  }\n}\n@media (min-width: 1280px) {\n  .xl\\:grid-cols-4 {\n    grid-template-columns: repeat(4, minmax(0, 1fr));\n  }\n}\n.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pr-0:has([role=checkbox]) {\n  padding-right: 0px;\n}\n.\\[\\&_tr\\:last-child\\]\\:border-0 tr:last-child {\n  border-width: 0px;\n}\n.\\[\\&_tr\\]\\:border-b tr {\n  border-bottom-width: 1px;\n}\n');
var STORAGE_KEY = "next-blog-cms-theme";
var ThemeContext = React.createContext({
  theme: "system",
  resolvedTheme: "light",
  setTheme: () => void 0
});
function ThemeProvider({ children, primaryColor }) {
  const [theme, setThemeState] = React.useState("system");
  const [resolvedTheme, setResolvedTheme] = React.useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const initial = stored ?? "system";
    setThemeState(initial);
    setResolvedTheme(resolveTheme(initial));
  }, []);
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (theme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (event) => setResolvedTheme(event.matches ? "dark" : "light");
      setResolvedTheme(media.matches ? "dark" : "light");
      media.addEventListener("change", handleChange);
      return () => media.removeEventListener("change", handleChange);
    }
    setResolvedTheme(theme);
  }, [theme]);
  React.useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.classList.toggle("dark", resolvedTheme === "dark");
    root.style.colorScheme = resolvedTheme;
    if (primaryColor && resolvedTheme === "light") {
      const parsed = parseColor(primaryColor);
      if (parsed) {
        root.style.setProperty("--primary", parsed);
        root.style.setProperty("--ring", parsed);
        return;
      }
    }
    root.style.removeProperty("--primary");
    root.style.removeProperty("--ring");
  }, [resolvedTheme, primaryColor]);
  const setTheme = React.useCallback((nextTheme) => {
    setThemeState(nextTheme);
    if (typeof window === "undefined") {
      return;
    }
    if (nextTheme === "system") {
      window.localStorage.removeItem(STORAGE_KEY);
      setResolvedTheme(resolveTheme("system"));
    } else {
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
      setResolvedTheme(nextTheme);
    }
  }, []);
  const value = React.useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme
    }),
    [theme, resolvedTheme, setTheme]
  );
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value, children });
}
function useThemeMode() {
  return React.useContext(ThemeContext);
}
function resolveTheme(theme) {
  if (theme === "light" || theme === "dark") {
    return theme;
  }
  if (typeof window === "undefined") {
    return "light";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function parseColor(value) {
  const trimmed = value.trim();
  const hexMatch = trimmed.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hexMatch) {
    return hexToHsl(hexMatch[1]);
  }
  const hslMatch = trimmed.match(/^hsl\(([^)]+)\)$/i);
  if (hslMatch) {
    return hslMatch[1].replace(/,/g, " ").trim();
  }
  return null;
}
function hexToHsl(hex) {
  const short = hex.length === 3;
  const r = parseInt(short ? hex[0] + hex[0] : hex.slice(0, 2), 16) / 255;
  const g = parseInt(short ? hex[1] + hex[1] : hex.slice(2, 4), 16) / 255;
  const b = parseInt(short ? hex[2] + hex[2] : hex.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
var buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-5",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
var DropdownMenu = DropdownMenuPrimitive.Root;
var DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
var DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm font-medium outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto h-4 w-4" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
var DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
var DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[10rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top-1",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
var DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
var DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
var DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
var DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
var DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
function ThemeToggle({ className }) {
  const { theme, resolvedTheme, setTheme } = useThemeMode();
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", className: cn("h-10 w-10", className), children: [
      /* @__PURE__ */ jsx(Sun, { className: "h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" }),
      /* @__PURE__ */ jsx(Moon, { className: "absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" }),
      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Alternar tema" })
    ] }) }),
    /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", className: "w-40", children: [
      /* @__PURE__ */ jsx(
        DropdownMenuItem,
        {
          onClick: () => setTheme("light"),
          className: theme === "light" ? "font-semibold" : "",
          children: "Claro"
        }
      ),
      /* @__PURE__ */ jsx(
        DropdownMenuItem,
        {
          onClick: () => setTheme("dark"),
          className: theme === "dark" ? "font-semibold" : "",
          children: "Escuro"
        }
      ),
      /* @__PURE__ */ jsxs(
        DropdownMenuItem,
        {
          onClick: () => setTheme("system"),
          className: theme === "system" ? "font-semibold" : "",
          children: [
            "Sistema (",
            resolvedTheme === "dark" ? "Escuro" : "Claro",
            ")"
          ]
        }
      )
    ] })
  ] });
}
var Card = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("rounded-lg border bg-card text-card-foreground shadow-sm", className),
      ...props
    }
  )
);
Card.displayName = "Card";
var CardHeader = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("flex flex-col space-y-1.5 p-6", className),
      ...props
    }
  )
);
CardHeader.displayName = "CardHeader";
var CardTitle = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("h3", { ref, className: cn("text-2xl font-semibold leading-none tracking-tight", className), ...props })
);
CardTitle.displayName = "CardTitle";
var CardDescription = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("p", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
var CardContent = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
var CardFooter = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
var Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      className: cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ref,
      ...props
    }
  );
});
Input.displayName = "Input";
var Label2 = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  LabelPrimitive.Root,
  {
    ref,
    className: cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className),
    ...props
  }
));
Label2.displayName = LabelPrimitive.Root.displayName;
var Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      className: cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ref,
      ...props
    }
  );
});
Textarea.displayName = "Textarea";
var badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
var Table = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsx(
    "table",
    {
      ref,
      className: cn("w-full caption-bottom text-sm", className),
      ...props
    }
  ) })
);
Table.displayName = "Table";
var TableHeader = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props })
);
TableHeader.displayName = "TableHeader";
var TableBody = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("tbody", { ref, className: cn("[&_tr:last-child]:border-0", className), ...props })
);
TableBody.displayName = "TableBody";
var TableFooter = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "tfoot",
    {
      ref,
      className: cn("bg-primary font-medium text-primary-foreground", className),
      ...props
    }
  )
);
TableFooter.displayName = "TableFooter";
var TableRow = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "tr",
    {
      ref,
      className: cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className),
      ...props
    }
  )
);
TableRow.displayName = "TableRow";
var TableHead = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "th",
    {
      ref,
      className: cn(
        "h-12 px-4 text-left align-middle text-xs font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className
      ),
      ...props
    }
  )
);
TableHead.displayName = "TableHead";
var TableCell = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "td",
    {
      ref,
      className: cn("px-4 py-3 align-middle [&:has([role=checkbox])]:pr-0", className),
      ...props
    }
  )
);
TableCell.displayName = "TableCell";
var TableCaption = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "caption",
    {
      ref,
      className: cn("mt-4 text-sm text-muted-foreground", className),
      ...props
    }
  )
);
TableCaption.displayName = "TableCaption";
var Tabs = TabsPrimitive.Root;
var TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
var TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex min-w-[120px] items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
var TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
var Switch = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SwitchPrimitives.Root,
  {
    className: cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsx(
      SwitchPrimitives.Thumb,
      {
        className: cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:-translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = SwitchPrimitives.Root.displayName;
var ToastProvider = ToastPrimitives.Provider;
var ToastViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2 p-4 sm:gap-3 sm:p-0",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
var toastVariants = cva(
  "group pointer-events-auto relative flex w-full max-w-sm items-start gap-3 overflow-hidden rounded-lg border bg-card p-4 text-card-foreground shadow-lg transition-all data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=end]:opacity-0",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-card-foreground",
        destructive: "group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
var Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    ToastPrimitives.Root,
    {
      ref,
      className: cn(toastVariants({ variant }), className),
      ...props
    }
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;
var ToastAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
var ToastClose = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/60 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring group-hover:opacity-100 group-[.destructive]:text-destructive-foreground/70 group-[.destructive]:hover:text-destructive-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
var ToastTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitives.Title, { ref, className: cn("text-sm font-semibold leading-none tracking-tight", className), ...props }));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
var ToastDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitives.Description, { ref, className: cn("text-sm text-muted-foreground", className), ...props }));
ToastDescription.displayName = ToastPrimitives.Description.displayName;
var TOAST_LIMIT = 5;
var TOAST_REMOVE_DELAY = 1e3;
var actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST"
};
var count = 0;
function genId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}
var toastTimeouts = /* @__PURE__ */ new Map();
var addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({ type: actionTypes.REMOVE_TOAST, toastId });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
var reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map(
          (toast2) => toast2.id === action.toast.id ? { ...toast2, ...action.toast } : toast2
        )
      };
    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (toast2) => toast2.id === toastId || toastId === void 0 ? {
            ...toast2,
            open: false
          } : toast2
        )
      };
    }
    case actionTypes.REMOVE_TOAST:
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((toast2) => toast2.id !== action.toastId)
      };
  }
};
var listeners = [];
var memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const dismiss = () => dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id });
  const update = (props2) => dispatch({
    type: actionTypes.UPDATE_TOAST,
    toast: { ...props2, id }
  });
  dispatch({
    type: actionTypes.ADD_TOAST,
    toast: {
      ...props,
      id,
      duration: props.duration ?? 4e3,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId })
  };
}
function Toaster() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}
var defaultTranslate = (_key, defaultMessage, params) => applyParams(defaultMessage, params);
var I18nContext = createContext({
  locale: "en",
  translate: defaultTranslate
});
var activeTranslator = defaultTranslate;
function setActiveTranslator(translator) {
  activeTranslator = translator;
}
var I18nProvider = ({
  locale = "en",
  messages,
  translate,
  children
}) => {
  const translator = useMemo(() => {
    if (translate) {
      return translate;
    }
    return createTranslator(messages);
  }, [messages, translate]);
  useEffect(() => {
    setActiveTranslator(translator);
    return () => setActiveTranslator(defaultTranslate);
  }, [translator]);
  setActiveTranslator(translator);
  const value = useMemo(
    () => ({
      locale,
      translate: translator
    }),
    [locale, translator]
  );
  return /* @__PURE__ */ jsx(I18nContext.Provider, { value, children });
};
function useI18n() {
  return useContext(I18nContext);
}
function useTranslate() {
  const { translate } = useI18n();
  return translate;
}
function translateInstant(key, defaultMessage, params) {
  return activeTranslator(key, defaultMessage, params);
}
function createTranslator(messages) {
  return (key, defaultMessage, params) => {
    const template = messages?.[key] ?? defaultMessage;
    return applyParams(template, params);
  };
}
function applyParams(template, params) {
  if (!params) {
    return template;
  }
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, token) => {
    const value = params[token];
    return typeof value === "undefined" ? match : String(value);
  });
}
var emptyContent = "";
function RichTextEditor({
  id,
  value,
  onChange,
  onBlur,
  placeholder,
  disabled,
  className
}) {
  const t = useTranslate();
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4]
        }
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: "noopener noreferrer nofollow",
          target: "_blank"
        }
      }),
      Placeholder.configure({
        placeholder: placeholder ?? t("richText.placeholder", "Write the content...")
      })
    ],
    content: value || emptyContent,
    editable: !disabled,
    onUpdate: ({ editor: editor2 }) => {
      const isEmpty = editor2.isEmpty || !editor2.getText().trim();
      onChange(isEmpty ? emptyContent : editor2.getHTML());
    }
  });
  useEffect(() => {
    if (!editor) return;
    const normalizedValue = value || emptyContent;
    const current = editor.isEmpty ? emptyContent : editor.getHTML();
    if (current !== normalizedValue) {
      editor.commands.setContent(normalizedValue || emptyContent, false);
    }
  }, [editor, value]);
  useEffect(() => {
    if (!editor) return;
    editor.setEditable(!disabled);
  }, [editor, disabled]);
  useEffect(() => {
    if (!editor || !onBlur) return;
    const handler = () => onBlur();
    editor.on("blur", handler);
    return () => {
      editor.off("blur", handler);
    };
  }, [editor, onBlur]);
  const toolbarButtons = useMemo(
    () => [
      {
        label: t("richText.bold", "Bold"),
        icon: Bold,
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive("bold"),
        disabled: !editor?.can().chain().focus().toggleBold().run()
      },
      {
        label: t("richText.italic", "Italic"),
        icon: Italic,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("italic"),
        disabled: !editor?.can().chain().focus().toggleItalic().run()
      },
      {
        label: t("richText.strikethrough", "Strikethrough"),
        icon: Strikethrough,
        onClick: () => editor?.chain().focus().toggleStrike().run(),
        isActive: editor?.isActive("strike"),
        disabled: !editor?.can().chain().focus().toggleStrike().run()
      },
      {
        label: t("richText.heading", "Heading"),
        icon: Heading2,
        onClick: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: editor?.isActive("heading", { level: 2 }),
        disabled: !editor?.can().chain().focus().toggleHeading({ level: 2 }).run()
      },
      {
        label: t("richText.bulletList", "Bullet list"),
        icon: List,
        onClick: () => editor?.chain().focus().toggleBulletList().run(),
        isActive: editor?.isActive("bulletList"),
        disabled: !editor?.can().chain().focus().toggleBulletList().run()
      },
      {
        label: t("richText.orderedList", "Ordered list"),
        icon: ListOrdered,
        onClick: () => editor?.chain().focus().toggleOrderedList().run(),
        isActive: editor?.isActive("orderedList"),
        disabled: !editor?.can().chain().focus().toggleOrderedList().run()
      },
      {
        label: t("richText.blockquote", "Quote"),
        icon: Quote,
        onClick: () => editor?.chain().focus().toggleBlockquote().run(),
        isActive: editor?.isActive("blockquote"),
        disabled: !editor?.can().chain().focus().toggleBlockquote().run()
      },
      {
        label: t("richText.code", "Code block"),
        icon: Code,
        onClick: () => editor?.chain().focus().toggleCodeBlock().run(),
        isActive: editor?.isActive("codeBlock"),
        disabled: !editor?.can().chain().focus().toggleCodeBlock().run()
      },
      {
        label: t("richText.insertLink", "Insert link"),
        icon: Link$1,
        onClick: () => {
          if (!editor) return;
          const previousUrl = editor.getAttributes("link").href;
          const url = window.prompt(t("richText.linkPrompt", "Enter the URL"), previousUrl ?? "");
          if (url === null) {
            return;
          }
          if (url.trim() === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
          }
          editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
        },
        isActive: editor?.isActive("link"),
        disabled: !editor
      }
    ],
    [editor, t]
  );
  const historyButtons = useMemo(
    () => [
      {
        label: t("richText.undo", "Undo"),
        icon: Undo2,
        onClick: () => editor?.chain().focus().undo().run(),
        disabled: !editor?.can().chain().focus().undo().run()
      },
      {
        label: t("richText.redo", "Redo"),
        icon: Redo2,
        onClick: () => editor?.chain().focus().redo().run(),
        disabled: !editor?.can().chain().focus().redo().run()
      }
    ],
    [editor, t]
  );
  return /* @__PURE__ */ jsxs("div", { className: cn("rounded-md border border-input bg-background text-sm shadow-sm", className, disabled && "opacity-70"), children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 border-b border-border bg-muted/40 p-2", children: [
      toolbarButtons.map((button) => /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          ...button,
          disabled: disabled || button.disabled
        },
        button.label
      )),
      /* @__PURE__ */ jsx("div", { className: "ml-auto flex items-center gap-2", children: historyButtons.map((button) => /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          ...button,
          disabled: disabled || button.disabled
        },
        button.label
      )) })
    ] }),
    /* @__PURE__ */ jsx(
      EditorContent,
      {
        editor,
        id,
        className: cn("tiptap px-3 py-2", disabled && "pointer-events-none")
      }
    )
  ] });
}
function ToolbarButton({ label, icon: Icon, isActive, onClick, disabled }) {
  return /* @__PURE__ */ jsx(
    Button,
    {
      type: "button",
      variant: isActive ? "default" : "outline",
      size: "sm",
      className: "h-9 w-9 p-0",
      "aria-label": label,
      "aria-pressed": isActive,
      onClick,
      disabled,
      children: /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" })
    }
  );
}
function DataTable({
  columns,
  data,
  emptyMessage = "Nenhum registro encontrado.",
  className
}) {
  const [sorting, setSorting] = React.useState([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  });
  return /* @__PURE__ */ jsx("div", { className, children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-lg border bg-card", children: /* @__PURE__ */ jsxs(Table, { children: [
    /* @__PURE__ */ jsx(TableHeader, { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx(TableRow, { children: headerGroup.headers.map((header) => {
      return /* @__PURE__ */ jsx(TableHead, { children: header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext()) }, header.id);
    }) }, headerGroup.id)) }),
    /* @__PURE__ */ jsx(TableBody, { children: table.getRowModel().rows?.length ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx(TableRow, { "data-state": row.getIsSelected() ? "selected" : void 0, children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(TableCell, { children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id)) }, row.id)) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: columns.length, className: "h-24 text-center text-sm text-muted-foreground", children: emptyMessage }) }) })
  ] }) }) });
}
var API_BASE = "/api/blog";
var ApiError = class extends Error {
  constructor(status, payload) {
    super(payload?.message ?? `Erro na API (${status})`);
    this.name = "ApiError";
    this.status = status;
    this.code = payload?.code;
    this.details = payload?.details;
  }
};
async function apiRequest(path, init = {}, parseJson = true) {
  const headers = new Headers(init.headers ?? {});
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    credentials: init.credentials ?? "include",
    headers
  });
  if (!response.ok) {
    let payload;
    try {
      const data = await response.json();
      payload = data?.error;
    } catch {
    }
    throw new ApiError(response.status, payload);
  }
  if (!parseJson || response.status === 204) {
    return void 0;
  }
  return await response.json();
}
function buildLoginSchema(t) {
  return z.object({
    email: z.string().email(t("auth.login.validation.email", "Enter a valid email address")),
    password: z.string().min(6, t("auth.login.validation.passwordMin", "Password must be at least 6 characters long")),
    remember: z.boolean().optional()
  });
}
function buildSetupSchema(t) {
  return buildLoginSchema(t).extend({
    name: z.string().min(1, t("auth.setup.validation.name", "Enter the name")),
    role: z.literal("admin").or(z.literal("author")).optional()
  });
}
var datetimeSchema = z.string().optional().refine((value) => {
  if (!value) return true;
  return !Number.isNaN(Date.parse(value));
}, "Invalid datetime");
var AdminContext = createContext({
  state: { user: null, languages: [], features: { aiTranslation: false } },
  setUser: () => void 0,
  setLanguages: () => void 0,
  refreshLanguages: async () => void 0
});
function parseRoute(pathname) {
  const segments = pathname.replace(/(^\/+|\/+$)/g, "").split("/").filter(Boolean);
  const baseSegment = segments[0] ?? "blog-admin";
  const relative = segments.slice(1);
  if (relative.length === 0) {
    return { route: { type: "dashboard" }, basePath: `/${baseSegment}` };
  }
  const [first, second] = relative;
  if (first === "posts") {
    if (!second) return { route: { type: "posts-list" }, basePath: `/${baseSegment}` };
    if (second === "new") return { route: { type: "posts-create" }, basePath: `/${baseSegment}` };
    const id = Number(second);
    if (!Number.isNaN(id)) return { route: { type: "posts-edit", id }, basePath: `/${baseSegment}` };
  }
  if (first === "categories") {
    if (!second) return { route: { type: "categories-list" }, basePath: `/${baseSegment}` };
    if (second === "new") return { route: { type: "categories-create" }, basePath: `/${baseSegment}` };
    const id = Number(second);
    if (!Number.isNaN(id)) return { route: { type: "categories-edit", id }, basePath: `/${baseSegment}` };
  }
  if (first === "users") {
    if (!second) return { route: { type: "users-list" }, basePath: `/${baseSegment}` };
    if (second === "new") return { route: { type: "users-create" }, basePath: `/${baseSegment}` };
    const id = Number(second);
    if (!Number.isNaN(id)) return { route: { type: "users-edit", id }, basePath: `/${baseSegment}` };
  }
  if (first === "languages") {
    return { route: { type: "languages" }, basePath: `/${baseSegment}` };
  }
  return { route: { type: "dashboard" }, basePath: `/${baseSegment}` };
}
function useAdminRouter() {
  const [routerState, setRouterState] = useState(
    () => typeof window === "undefined" ? { route: { type: "dashboard" }, basePath: "/blog-admin" } : parseRoute(window.location.pathname)
  );
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = () => setRouterState(parseRoute(window.location.pathname));
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);
  const navigate = useCallback(
    (path) => {
      if (typeof window === "undefined") return;
      const base = routerState.basePath;
      const target = `${base}${path.startsWith("/") ? path : `/${path}`}`;
      window.history.pushState({}, "", target);
      setRouterState(parseRoute(target));
    },
    [routerState.basePath]
  );
  return { route: routerState.route, basePath: routerState.basePath, navigate };
}
async function fetchAuthStatus() {
  return apiRequest("/admin/auth/status");
}
async function loginRequest(data) {
  return apiRequest("/admin/auth/login", {
    method: "POST",
    body: JSON.stringify(data)
  });
}
async function logoutRequest() {
  await apiRequest("/admin/auth/logout", { method: "POST" }, false);
}
async function createUserRequest(payload) {
  return apiRequest("/admin/users", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}
async function fetchLanguages() {
  const data = await apiRequest("/admin/languages");
  return data.languages;
}
async function fetchPosts(query) {
  const searchParams = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value === void 0 || value === null || value === "") return;
    searchParams.set(key, String(value));
  });
  const suffix = searchParams.toString() ? `?${searchParams.toString()}` : "";
  return apiRequest(`/admin/posts${suffix}`);
}
async function fetchSinglePost(id) {
  return apiRequest(`/admin/posts/${id}`);
}
async function createPost(payload) {
  return apiRequest("/admin/posts", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}
async function updatePost(id, payload) {
  return apiRequest(`/admin/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  });
}
async function requestTranslation(payload) {
  return apiRequest("/admin/ai/translate", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}
async function deletePost(id) {
  await apiRequest(`/admin/posts/${id}`, { method: "DELETE" }, false);
}
async function fetchCategories() {
  return apiRequest("/admin/categories");
}
async function fetchCategory(id) {
  return apiRequest(`/admin/categories/${id}`);
}
async function createCategory(payload) {
  return apiRequest("/admin/categories", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}
async function updateCategory(id, payload) {
  return apiRequest(`/admin/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  });
}
async function deleteCategory(id) {
  await apiRequest(`/admin/categories/${id}`, { method: "DELETE" }, false);
}
async function fetchUsers() {
  return apiRequest("/admin/users");
}
async function fetchUser(id) {
  return apiRequest(`/admin/users/${id}`);
}
async function updateUser(id, payload) {
  return apiRequest(`/admin/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  });
}
async function deleteUser(id) {
  await apiRequest(`/admin/users/${id}`, { method: "DELETE" }, false);
}
async function upsertLanguage(payload) {
  if (!payload.code) {
    return apiRequest("/admin/languages", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  }
  return apiRequest(`/admin/languages/${payload.code}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  });
}
async function deleteLanguage(code) {
  await apiRequest(`/admin/languages/${code}`, { method: "DELETE" }, false);
}
function formatDate(value) {
  if (!value) return "\u2014";
  try {
    const date = new Date(value);
    return new Intl.DateTimeFormat(void 0, {
      dateStyle: "short",
      timeStyle: "short"
    }).format(date);
  } catch {
    return value;
  }
}
function notify(message, variant = "default", description) {
  toast({
    title: message,
    description,
    variant
  });
}
function buildNavigationItems(t) {
  return [
    { route: { type: "dashboard" }, label: t("nav.dashboard", "Dashboard"), icon: LayoutDashboard, path: "/" },
    { route: { type: "posts-list" }, label: t("nav.posts", "Posts"), icon: FileText, path: "/posts" },
    {
      route: { type: "categories-list" },
      label: t("nav.categories", "Categories"),
      icon: FolderTree,
      path: "/categories"
    },
    { route: { type: "users-list" }, label: t("nav.users", "Users"), icon: UsersRound, path: "/users" },
    { route: { type: "languages" }, label: t("nav.languages", "Languages"), icon: Languages, path: "/languages" }
  ];
}
function buildPostFilterButtons(t) {
  return [
    { label: t("posts.filters.all", "All"), value: "all" },
    { label: t("posts.filters.published", "Published"), value: "published" },
    { label: t("posts.filters.draft", "Drafts"), value: "draft" }
  ];
}
function buildPostFormSchema(t) {
  return z.object({
    slug: z.string().min(1, t("posts.form.validation.slug", "Slug is required")),
    status: z.enum(["draft", "published"]),
    categoryId: z.string(),
    featuredImage: z.string(),
    translations: z.record(
      z.object({
        title: z.string().min(1, t("posts.form.validation.title", "Title is required")),
        content: z.string().min(1, t("posts.form.validation.content", "Content is required")),
        excerpt: z.string().optional(),
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional()
      })
    ),
    publishedAt: datetimeSchema
  });
}
function generateSlug(input) {
  return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
var TranslationContentField = ({
  control,
  name,
  placeholder,
  id
}) => {
  const { field } = useController({
    control,
    name
  });
  return /* @__PURE__ */ jsx(
    RichTextEditor,
    {
      id,
      value: field.value ?? "",
      onChange: field.onChange,
      onBlur: field.onBlur,
      placeholder
    }
  );
};
var LoadingState = () => {
  const t = useTranslate();
  return /* @__PURE__ */ jsx("div", { className: "flex flex-1 items-center justify-center p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-muted-foreground", children: [
    /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }),
    /* @__PURE__ */ jsx("span", { children: t("common.loading", "Loading...") })
  ] }) });
};
var Sidebar = ({
  current,
  navigate,
  branding
}) => {
  const t = useTranslate();
  const navigationItems = useMemo(() => buildNavigationItems(t), [t]);
  const brandTitle = branding?.title?.trim() || t("nav.brandTitle", "Blog CMS");
  const brandTagline = branding?.tagline?.trim() || t("nav.tagline", "Multi-language content for Next.js");
  return /* @__PURE__ */ jsxs("aside", { className: "hidden w-64 flex-none border-r bg-card/40 shadow-sm lg:flex lg:flex-col", children: [
    /* @__PURE__ */ jsx("div", { className: "flex h-16 items-center border-b px-6", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold", children: brandTitle }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: brandTagline })
    ] }) }),
    /* @__PURE__ */ jsx("nav", { className: "flex-1 space-y-1 p-4", children: navigationItems.map((item) => {
      const Icon = item.icon;
      const isActive = current.type === item.route.type;
      return /* @__PURE__ */ jsxs(
        Button,
        {
          variant: isActive ? "secondary" : "ghost",
          className: cn("w-full justify-start gap-2", isActive && "font-semibold"),
          onClick: () => navigate(item.path),
          children: [
            /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" }),
            item.label
          ]
        },
        item.label
      );
    }) }),
    /* @__PURE__ */ jsx("div", { className: "border-t px-6 py-3 text-xs text-muted-foreground", children: "next-blog-cms v0.1.2" })
  ] });
};
var MobileNav = ({ current, navigate }) => {
  const t = useTranslate();
  const navigationItems = useMemo(() => buildNavigationItems(t), [t]);
  return /* @__PURE__ */ jsx("nav", { className: "flex items-center gap-2 border-b bg-card/60 p-2 lg:hidden", children: navigationItems.map((item) => {
    const Icon = item.icon;
    const isActive = current.type === item.route.type;
    return /* @__PURE__ */ jsxs(
      Button,
      {
        variant: isActive ? "secondary" : "ghost",
        size: "icon",
        className: cn("h-10 w-10", isActive && "bg-secondary font-semibold"),
        onClick: () => navigate(item.path),
        children: [
          /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: item.label })
        ]
      },
      item.label
    );
  }) });
};
var Header = ({ title, onLogout }) => {
  const {
    state: { user }
  } = useContext(AdminContext);
  const t = useTranslate();
  return /* @__PURE__ */ jsxs("div", { className: "flex h-16 items-center justify-between border-b bg-card/60 px-4 py-3 md:px-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-lg font-semibold md:text-xl", children: title }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: t("header.subtitle", "Manage your blog content with ease") })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "hidden items-center gap-2 rounded-full border px-3 py-1 text-sm text-muted-foreground sm:flex", children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium text-foreground", children: user?.name ?? t("header.userDefaultName", "User") }),
        /* @__PURE__ */ jsx("span", { className: "text-xs uppercase", children: user?.role })
      ] }),
      /* @__PURE__ */ jsx(ThemeToggle, {}),
      /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: onLogout, className: "gap-2", children: [
        /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: t("header.signOut", "Sign out") })
      ] })
    ] })
  ] });
};
var StatsCard = ({ title, value }) => /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardHeader, { className: "pb-2", children: [
  /* @__PURE__ */ jsx(CardDescription, { children: title }),
  /* @__PURE__ */ jsx(CardTitle, { className: "text-3xl font-semibold tracking-tight", children: value })
] }) });
var DashboardView = ({ navigate }) => {
  const t = useTranslate();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const [postsResponse, categoriesResponse, usersResponse] = await Promise.all([
          fetchPosts({ limit: 5 }),
          fetchCategories(),
          fetchUsers()
        ]);
        setPosts(postsResponse.posts);
        setCategories(categoriesResponse.categories);
        setUsers(usersResponse.users);
      } catch {
        notify(t("dashboard.loadError", "Unable to load dashboard data"), "destructive");
      } finally {
        setLoading(false);
      }
    })();
  }, [t]);
  if (loading) return /* @__PURE__ */ jsx(LoadingState, {});
  const publishedCount = posts.filter((post) => post.status === "published").length;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4", children: [
      /* @__PURE__ */ jsx(StatsCard, { title: t("dashboard.stats.published", "Published posts"), value: publishedCount }),
      /* @__PURE__ */ jsx(StatsCard, { title: t("dashboard.stats.drafts", "Drafts"), value: posts.length - publishedCount }),
      /* @__PURE__ */ jsx(StatsCard, { title: t("dashboard.stats.categories", "Categories"), value: categories.length }),
      /* @__PURE__ */ jsx(StatsCard, { title: t("dashboard.stats.users", "Users"), value: users.length })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-base", children: t("dashboard.latestPosts.title", "Latest posts") }),
          /* @__PURE__ */ jsx(CardDescription, { children: t("dashboard.latestPosts.description", "The five most recent posts.") })
        ] }),
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => navigate("/posts"), children: t("dashboard.latestPosts.viewAll", "View all") })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: t("posts.table.title", "Title") }),
          /* @__PURE__ */ jsx(TableHead, { children: t("posts.table.status", "Status") }),
          /* @__PURE__ */ jsx(TableHead, { children: t("posts.table.updatedAt", "Updated at") })
        ] }) }),
        /* @__PURE__ */ jsxs(TableBody, { children: [
          posts.slice(0, 5).map((post) => /* @__PURE__ */ jsxs(TableRow, { className: "cursor-pointer", onClick: () => navigate(`/posts/${post.id}`), children: [
            /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: post.translations[0]?.title ?? post.slug }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: post.status === "published" ? "default" : "secondary", children: post.status === "published" ? t("common.status.published", "Published") : t("common.status.draft", "Draft") }) }),
            /* @__PURE__ */ jsx(TableCell, { children: formatDate(post.updatedAt) })
          ] }, post.id)),
          posts.length === 0 && /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 3, className: "text-center text-sm text-muted-foreground", children: t("dashboard.latestPosts.empty", "No posts have been published yet.") }) })
        ] })
      ] }) })
    ] })
  ] });
};
var PostListView = ({ navigate }) => {
  const t = useTranslate();
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const filterButtons = useMemo(() => buildPostFilterButtons(t), [t]);
  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchPosts({ status: statusFilter === "all" ? void 0 : statusFilter, limit: 50 });
      setPosts(response.posts);
    } catch {
      notify(t("posts.loadError", "Unable to load posts"), "destructive");
    } finally {
      setLoading(false);
    }
  }, [statusFilter, t]);
  useEffect(() => {
    loadPosts();
  }, [loadPosts]);
  const handleDelete = useCallback(
    async (id) => {
      if (!window.confirm(t("posts.confirmDelete", "Are you sure you want to remove this post?"))) return;
      try {
        await deletePost(id);
        notify(t("posts.deleteSuccess", "Post removed successfully"), "default");
        loadPosts();
      } catch {
        notify(t("posts.deleteError", "Unable to remove the post"), "destructive");
      }
    },
    [loadPosts, t]
  );
  const columns = useMemo(
    () => [
      {
        accessorKey: "title",
        header: t("posts.table.title", "Title"),
        cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "font-medium", children: row.original.translations[0]?.title ?? t("posts.table.untitled", "Untitled") })
      },
      {
        accessorKey: "slug",
        header: t("posts.table.slug", "Slug")
      },
      {
        id: "status",
        header: t("posts.table.status", "Status"),
        cell: ({ row }) => /* @__PURE__ */ jsx(Badge, { variant: row.original.status === "published" ? "default" : "secondary", children: row.original.status === "published" ? t("common.status.published", "Published") : t("common.status.draft", "Draft") })
      },
      {
        accessorKey: "updatedAt",
        header: t("posts.table.updatedAt", "Updated at"),
        cell: ({ row }) => formatDate(row.original.updatedAt),
        enableSorting: false
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", onClick: () => navigate(`/posts/${row.original.id}`), children: t("common.edit", "Edit") }),
          /* @__PURE__ */ jsx(Button, { variant: "destructive", size: "sm", onClick: () => handleDelete(row.original.id), children: t("common.remove", "Remove") })
        ] }),
        enableSorting: false
      }
    ],
    [navigate, handleDelete, t]
  );
  if (loading) return /* @__PURE__ */ jsx(LoadingState, {});
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: filterButtons.map((filter) => /* @__PURE__ */ jsx(
        Button,
        {
          variant: statusFilter === filter.value ? "default" : "outline",
          onClick: () => setStatusFilter(filter.value),
          children: filter.label
        },
        filter.value
      )) }),
      /* @__PURE__ */ jsxs(Button, { onClick: () => navigate("/posts/new"), className: "gap-2", children: [
        /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
        " ",
        t("posts.actions.new", "New post")
      ] })
    ] }),
    /* @__PURE__ */ jsx(DataTable, { columns, data: posts })
  ] });
};
var fieldClass = "space-y-2";
var PostFormView = ({ postId, navigate }) => {
  const t = useTranslate();
  const {
    state: { languages, features }
  } = useContext(AdminContext);
  const enabledLanguages = useMemo(
    () => languages.filter((language) => language.enabled),
    [languages]
  );
  const defaultLanguage = useMemo(
    () => enabledLanguages.find((language) => language.isDefault) ?? (enabledLanguages.length ? enabledLanguages[0] : void 0),
    [enabledLanguages]
  );
  const [loading, setLoading] = useState(Boolean(postId));
  const [saving, setSaving] = useState(false);
  const [autoTranslating, setAutoTranslating] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(Boolean(postId));
  const [categories, setCategories] = useState([]);
  const [activeLanguage, setActiveLanguage] = useState("");
  const postFormSchema = useMemo(() => buildPostFormSchema(t), [t]);
  const form = useForm({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      slug: "",
      status: "draft",
      categoryId: "",
      featuredImage: "",
      translations: {},
      publishedAt: ""
    }
  });
  const translations = form.watch("translations");
  const defaultLanguageCode = defaultLanguage?.code;
  const slugField = form.register("slug");
  useEffect(() => {
    (async () => {
      try {
        const categoriesResponse = await fetchCategories();
        setCategories(categoriesResponse.categories);
      } catch {
        notify(t("categories.loadError", "Unable to load categories"), "destructive");
      }
    })();
  }, [t]);
  useEffect(() => {
    if (!postId) return;
    (async () => {
      try {
        setLoading(true);
        const { post } = await fetchSinglePost(postId);
        form.reset({
          slug: post.slug,
          status: post.status,
          categoryId: post.categoryId ? String(post.categoryId) : "",
          featuredImage: post.featuredImage ?? "",
          publishedAt: post.publishedAt ?? "",
          translations: post.translations.reduce((acc, translation) => {
            acc[translation.language] = {
              title: translation.title,
              content: translation.content,
              excerpt: translation.excerpt ?? "",
              metaTitle: translation.metaTitle ?? "",
              metaDescription: translation.metaDescription ?? ""
            };
            return acc;
          }, {})
        });
        setSlugManuallyEdited(true);
        if (post.translations.length > 0) {
          setActiveLanguage(post.translations[0].language);
        }
      } catch {
        notify(t("posts.loadSingleError", "Unable to load the post"), "destructive");
      } finally {
        setLoading(false);
      }
    })();
  }, [postId, form, t]);
  useEffect(() => {
    if (!enabledLanguages.length) return;
    const currentTranslations = form.getValues("translations");
    enabledLanguages.forEach((language) => {
      if (!currentTranslations[language.code]) {
        form.setValue(`translations.${language.code}`, {
          title: "",
          content: "",
          excerpt: "",
          metaTitle: "",
          metaDescription: ""
        });
      }
    });
    setActiveLanguage((current) => {
      if (current && enabledLanguages.some((language) => language.code === current)) {
        return current;
      }
      return defaultLanguage?.code ?? enabledLanguages[0].code;
    });
  }, [enabledLanguages, defaultLanguage, form]);
  useEffect(() => {
    if (!defaultLanguageCode) return;
    if (slugManuallyEdited) return;
    const title = translations?.[defaultLanguageCode]?.title ?? "";
    const generatedSlug = title ? generateSlug(title) : "";
    const currentSlug = form.getValues("slug");
    if (currentSlug !== generatedSlug) {
      form.setValue("slug", generatedSlug, { shouldDirty: false, shouldTouch: false });
    }
  }, [defaultLanguageCode, slugManuallyEdited, translations, form]);
  const handleAutoTranslate = useCallback(async () => {
    if (!features.aiTranslation) return;
    if (!defaultLanguage) {
      notify(
        t("posts.translation.noDefaultLanguage", "Set a default language before translating content."),
        "destructive"
      );
      return;
    }
    const source = form.getValues(`translations.${defaultLanguage.code}`);
    if (!source || !source.title.trim() || !source.content.trim()) {
      notify(
        t(
          "posts.translation.missingSource",
          "Fill in the default language title and content before requesting translations."
        ),
        "destructive"
      );
      return;
    }
    const targetLanguages = enabledLanguages.map((language) => language.code).filter((code) => code !== defaultLanguage.code);
    if (!targetLanguages.length) {
      notify(
        t("posts.translation.noTargets", "Add at least one additional language to translate into."),
        "destructive"
      );
      return;
    }
    setAutoTranslating(true);
    try {
      const response = await requestTranslation({
        sourceLanguage: defaultLanguage.code,
        targetLanguages,
        fields: {
          title: source.title,
          content: source.content,
          excerpt: source.excerpt,
          metaTitle: source.metaTitle,
          metaDescription: source.metaDescription
        }
      });
      Object.entries(response.translations).forEach(([languageCode, translation]) => {
        ["title", "content", "excerpt", "metaTitle", "metaDescription"].forEach(
          (fieldKey) => {
            const fieldValue = translation[fieldKey];
            if (typeof fieldValue === "string") {
              form.setValue(`translations.${languageCode}.${fieldKey}`, fieldValue, {
                shouldDirty: true,
                shouldValidate: false
              });
            }
          }
        );
      });
      notify(t("posts.translation.success", "Translations generated successfully"), "default");
    } catch (error) {
      if (error instanceof ApiError) {
        notify(error.message, "destructive");
      } else {
        notify(
          t("posts.translation.error", "Unable to generate translations automatically"),
          "destructive"
        );
      }
    } finally {
      setAutoTranslating(false);
    }
  }, [features.aiTranslation, defaultLanguage, enabledLanguages, form, t]);
  const onSubmit = form.handleSubmit(async (data) => {
    if (!enabledLanguages.length) {
      notify(
        t("posts.form.noLanguages", "Enable at least one language before publishing posts."),
        "destructive"
      );
      return;
    }
    setSaving(true);
    try {
      const translationsPayload = enabledLanguages.reduce(
        (acc, language) => {
          const translation = data.translations[language.code];
          if (!translation) {
            return acc;
          }
          acc.push({
            language: language.code,
            title: translation.title,
            content: translation.content,
            excerpt: translation.excerpt || null,
            metaTitle: translation.metaTitle || null,
            metaDescription: translation.metaDescription || null
          });
          return acc;
        },
        []
      );
      const payload = {
        slug: data.slug,
        status: data.status,
        categoryId: data.categoryId ? Number(data.categoryId) : null,
        featuredImage: data.featuredImage || null,
        publishedAt: data.publishedAt || null,
        translations: translationsPayload
      };
      if (postId) {
        await updatePost(postId, payload);
        notify(t("posts.updateSuccess", "Post updated successfully"), "default");
      } else {
        await createPost(payload);
        notify(t("posts.createSuccess", "Post created successfully"), "default");
      }
      navigate("/posts");
    } catch (error) {
      if (error instanceof ApiError) {
        notify(error.message, "destructive");
      } else {
        notify(
          postId ? t("posts.updateError", "Unable to update the post") : t("posts.createError", "Unable to save the post"),
          "destructive"
        );
      }
    } finally {
      setSaving(false);
    }
  });
  if (loading) return /* @__PURE__ */ jsx(LoadingState, {});
  return /* @__PURE__ */ jsxs("form", { onSubmit, className: "grid gap-6", children: [
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: postId ? t("posts.form.editTitle", "Edit post") : t("posts.form.newTitle", "New post") }),
        /* @__PURE__ */ jsx(CardDescription, { children: t("posts.form.description", "Configure the primary information for this post.") })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { className: "grid gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { className: fieldClass, children: [
          /* @__PURE__ */ jsx(Label2, { htmlFor: "post-slug", children: t("posts.form.slugLabel", "Slug *") }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "post-slug",
              ...slugField,
              onChange: (event) => {
                slugField.onChange(event);
                const next = event.target.value;
                setSlugManuallyEdited(Boolean(next.trim()));
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: fieldClass, children: [
          /* @__PURE__ */ jsx(Label2, { htmlFor: "post-status", children: t("posts.form.statusLabel", "Status") }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              id: "post-status",
              className: "h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              ...form.register("status"),
              children: [
                /* @__PURE__ */ jsx("option", { value: "draft", children: t("common.status.draft", "Draft") }),
                /* @__PURE__ */ jsx("option", { value: "published", children: t("common.status.published", "Published") })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: fieldClass, children: [
          /* @__PURE__ */ jsx(Label2, { htmlFor: "post-category", children: t("posts.form.categoryLabel", "Category") }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              id: "post-category",
              className: "h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              ...form.register("categoryId"),
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: t("posts.form.categoryNone", "No category") }),
                categories.map((category) => /* @__PURE__ */ jsx("option", { value: category.id, children: category.translations[0]?.name ?? category.slug }, category.id))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: fieldClass, children: [
          /* @__PURE__ */ jsx(Label2, { htmlFor: "post-featured", children: t("posts.form.featuredLabel", "Featured image (URL)") }),
          /* @__PURE__ */ jsx(Input, { id: "post-featured", ...form.register("featuredImage") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: fieldClass, children: [
          /* @__PURE__ */ jsx(Label2, { htmlFor: "post-published-at", children: t("posts.form.publishedAtLabel", "Publication date") }),
          /* @__PURE__ */ jsx(Input, { id: "post-published-at", type: "datetime-local", ...form.register("publishedAt") })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: t("posts.form.translationsTitle", "Content by language") }),
          /* @__PURE__ */ jsx(CardDescription, { children: t("posts.form.translationsDescription", "Manage every translation for this post.") })
        ] }),
        features.aiTranslation && /* @__PURE__ */ jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            className: "gap-2",
            onClick: handleAutoTranslate,
            disabled: autoTranslating,
            children: [
              /* @__PURE__ */ jsx(Wand2, { className: "h-4 w-4" }),
              autoTranslating ? t("posts.translation.loading", "Generating translations...") : t("posts.translation.button", "Auto-translate content")
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx(CardContent, { children: enabledLanguages.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: t(
        "posts.form.noLanguagesHint",
        "No languages available yet. Configure them in the Languages section."
      ) }) : /* @__PURE__ */ jsxs(Tabs, { value: activeLanguage, onValueChange: setActiveLanguage, className: "w-full", children: [
        /* @__PURE__ */ jsx(TabsList, { children: enabledLanguages.map((language) => /* @__PURE__ */ jsx(TabsTrigger, { value: language.code, children: language.name ? `${language.name} (${language.code.toUpperCase()})` : language.code.toUpperCase() }, language.code)) }),
        enabledLanguages.map((language) => /* @__PURE__ */ jsxs(TabsContent, { value: language.code, className: "mt-4 space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: fieldClass, children: [
            /* @__PURE__ */ jsx(Label2, { htmlFor: `title-${language.code}`, children: t("posts.form.titleLabel", "Title *") }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: `title-${language.code}`,
                ...form.register(`translations.${language.code}.title`)
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: fieldClass, children: [
            /* @__PURE__ */ jsx(Label2, { htmlFor: `content-${language.code}`, children: t("posts.form.contentLabel", "Content *") }),
            /* @__PURE__ */ jsx(
              TranslationContentField,
              {
                control: form.control,
                name: `translations.${language.code}.content`,
                placeholder: t("posts.form.contentPlaceholder", "Content for {{code}}", {
                  code: language.code.toUpperCase()
                }),
                id: `content-${language.code}`
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: fieldClass, children: [
            /* @__PURE__ */ jsx(Label2, { htmlFor: `excerpt-${language.code}`, children: t("posts.form.excerptLabel", "Excerpt") }),
            /* @__PURE__ */ jsx(
              Textarea,
              {
                id: `excerpt-${language.code}`,
                ...form.register(`translations.${language.code}.excerpt`)
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("div", { className: fieldClass, children: [
              /* @__PURE__ */ jsx(Label2, { htmlFor: `meta-title-${language.code}`, children: t("posts.form.metaTitleLabel", "Meta title") }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: `meta-title-${language.code}`,
                  ...form.register(`translations.${language.code}.metaTitle`)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: fieldClass, children: [
              /* @__PURE__ */ jsx(Label2, { htmlFor: `meta-description-${language.code}`, children: t("posts.form.metaDescriptionLabel", "Meta description") }),
              /* @__PURE__ */ jsx(
                Textarea,
                {
                  id: `meta-description-${language.code}`,
                  ...form.register(`translations.${language.code}.metaDescription`)
                }
              )
            ] })
          ] })
        ] }, language.code))
      ] }) }),
      /* @__PURE__ */ jsxs(CardFooter, { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: () => navigate("/posts"), children: t("common.cancel", "Cancel") }),
        /* @__PURE__ */ jsx(Button, { type: "submit", disabled: saving, children: saving ? t("common.saving", "Saving...") : postId ? t("posts.form.updateAction", "Update post") : t("posts.form.publishAction", "Publish post") })
      ] })
    ] })
  ] });
};
var CategoryFormView = ({
  categoryId,
  navigate
}) => {
  const {
    state: { languages, features }
  } = useContext(AdminContext);
  const t = useTranslate();
  const enabledLanguages = useMemo(
    () => languages.filter((language) => language.enabled),
    [languages]
  );
  const defaultLanguage = useMemo(
    () => enabledLanguages.find((language) => language.isDefault) ?? enabledLanguages[0] ?? languages[0],
    [enabledLanguages, languages]
  );
  const defaultLanguageCode = defaultLanguage?.code;
  const [translations, setTranslations] = useState({});
  const [activeLanguage, setActiveLanguage] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(Boolean(categoryId));
  const [loading, setLoading] = useState(Boolean(categoryId));
  const [saving, setSaving] = useState(false);
  const [autoTranslating, setAutoTranslating] = useState(false);
  useEffect(() => {
    if (!languages.length) return;
    const fallbackCode = defaultLanguageCode ?? languages[0].code;
    setActiveLanguage((current) => {
      if (current && languages.some((language) => language.code === current)) {
        return current;
      }
      return fallbackCode ?? "";
    });
    setTranslations((prev) => {
      const base = { ...prev };
      languages.forEach((language) => {
        if (!base[language.code]) {
          base[language.code] = { name: "" };
        }
      });
      return base;
    });
  }, [languages, defaultLanguageCode]);
  useEffect(() => {
    if (!categoryId) return;
    (async () => {
      try {
        setLoading(true);
        const { category } = await fetchCategory(categoryId);
        setSlug(category.slug);
        setSlugManuallyEdited(true);
        const map = category.translations.reduce(
          (acc, translation) => {
            acc[translation.language] = {
              name: translation.name
            };
            return acc;
          },
          {}
        );
        setTranslations((prev) => ({ ...prev, ...map }));
        if (category.translations.length > 0) {
          setActiveLanguage(category.translations[0].language);
        }
      } catch {
        notify(t("categories.loadErrorSingle", "Unable to load category"), "destructive");
      } finally {
        setLoading(false);
      }
    })();
  }, [categoryId, t]);
  useEffect(() => {
    if (!defaultLanguageCode) return;
    if (slugManuallyEdited) return;
    const sourceName = translations[defaultLanguageCode]?.name?.trim() ?? "";
    const generated = sourceName ? generateSlug(sourceName) : "";
    if (slug !== generated) {
      setSlug(generated);
    }
  }, [defaultLanguageCode, translations, slugManuallyEdited, slug]);
  const handleAutoTranslate = useCallback(async () => {
    if (!features.aiTranslation) return;
    if (!defaultLanguageCode) {
      notify(
        t(
          "categories.translation.noDefaultLanguage",
          "Set a default language before translating category names."
        ),
        "destructive"
      );
      return;
    }
    const sourceName = translations[defaultLanguageCode]?.name?.trim();
    if (!sourceName) {
      notify(
        t(
          "categories.translation.missingSource",
          "Fill in the default language name before translating."
        ),
        "destructive"
      );
      return;
    }
    const targetLanguages = enabledLanguages.map((language) => language.code).filter((code) => code !== defaultLanguageCode);
    if (!targetLanguages.length) {
      notify(
        t(
          "categories.translation.noTargets",
          "Enable at least one additional language to translate into."
        ),
        "destructive"
      );
      return;
    }
    setAutoTranslating(true);
    try {
      const response = await requestTranslation({
        sourceLanguage: defaultLanguageCode,
        targetLanguages,
        fields: { name: sourceName }
      });
      setTranslations((prev) => {
        const updated = { ...prev };
        Object.entries(response.translations).forEach(([languageCode, value]) => {
          if (languageCode === defaultLanguageCode) return;
          const translatedName = value.name;
          if (typeof translatedName === "string" && translatedName.trim()) {
            updated[languageCode] = { name: translatedName };
          } else if (!updated[languageCode]) {
            updated[languageCode] = { name: "" };
          }
        });
        return updated;
      });
      notify(
        t("categories.translation.success", "Category names translated successfully"),
        "default"
      );
    } catch (error) {
      if (error instanceof ApiError) {
        notify(error.message, "destructive");
      } else {
        notify(
          t(
            "categories.translation.error",
            "Unable to translate category names automatically"
          ),
          "destructive"
        );
      }
    } finally {
      setAutoTranslating(false);
    }
  }, [features.aiTranslation, defaultLanguageCode, translations, enabledLanguages, t]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!slug.trim()) {
      notify(t("categories.form.slugRequired", "Enter the category slug"), "destructive");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        slug,
        translations: Object.entries(translations).filter(([, value]) => value.name.trim()).map(([language, value]) => ({
          language,
          name: value.name,
          description: null
        }))
      };
      if (!payload.translations?.length) {
        notify(
          t("categories.form.translationRequired", "Add at least one language for this category"),
          "destructive"
        );
        setSaving(false);
        return;
      }
      if (categoryId) {
        await updateCategory(categoryId, payload);
        notify(t("categories.updateSuccess", "Category updated successfully"), "default");
      } else {
        await createCategory(payload);
        notify(t("categories.createSuccess", "Category created successfully"), "default");
      }
      navigate("/categories");
    } catch (error) {
      if (error instanceof ApiError) {
        notify(error.message, "destructive");
      } else {
        notify(t("categories.saveError", "Unable to save the category"), "destructive");
      }
    } finally {
      setSaving(false);
    }
  };
  if (loading) return /* @__PURE__ */ jsx(LoadingState, {});
  return /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, className: "grid gap-6", children: /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: categoryId ? t("categories.form.editTitle", "Edit category") : t("categories.form.newTitle", "New category") }),
        /* @__PURE__ */ jsx(CardDescription, { children: t("categories.form.description", "Organize the blog categories.") })
      ] }),
      features.aiTranslation && enabledLanguages.length > 1 && /* @__PURE__ */ jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "gap-2",
          onClick: handleAutoTranslate,
          disabled: autoTranslating,
          children: [
            /* @__PURE__ */ jsx(Wand2, { className: "h-4 w-4" }),
            autoTranslating ? t("categories.translation.loading", "Translating...") : t("categories.translation.button", "Auto-translate names")
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: fieldClass, children: [
        /* @__PURE__ */ jsx(Label2, { htmlFor: "category-slug", children: "Slug *" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "category-slug",
            value: slug,
            onChange: (event) => {
              const next = event.target.value;
              setSlug(next);
              setSlugManuallyEdited(Boolean(next.trim()));
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(Tabs, { value: activeLanguage, onValueChange: setActiveLanguage, children: [
        /* @__PURE__ */ jsx(TabsList, { children: languages.map((language) => /* @__PURE__ */ jsx(TabsTrigger, { value: language.code, children: language.code.toUpperCase() }, language.code)) }),
        languages.map((language) => /* @__PURE__ */ jsx(TabsContent, { value: language.code, className: "space-y-4", children: /* @__PURE__ */ jsxs("div", { className: fieldClass, children: [
          /* @__PURE__ */ jsxs(Label2, { htmlFor: `category-name-${language.code}`, children: [
            t("categories.form.nameLabel", "Name"),
            " (",
            language.code.toUpperCase(),
            ")"
          ] }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: `category-name-${language.code}`,
              value: translations[language.code]?.name ?? "",
              onChange: (event) => setTranslations((prev) => ({
                ...prev,
                [language.code]: {
                  name: event.target.value
                }
              }))
            }
          )
        ] }) }, language.code))
      ] })
    ] }),
    /* @__PURE__ */ jsxs(CardFooter, { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: () => navigate("/categories"), children: t("common.cancel", "Cancel") }),
      /* @__PURE__ */ jsx(Button, { type: "submit", disabled: saving, children: saving ? t("common.saving", "Saving...") : categoryId ? t("categories.form.updateAction", "Update category") : t("categories.form.createAction", "Create category") })
    ] })
  ] }) });
};
var CategoryListView = ({ navigate }) => {
  const t = useTranslate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchCategories();
      setCategories(response.categories);
    } catch {
      notify(t("categories.loadError", "Unable to load categories"), "destructive");
    } finally {
      setLoading(false);
    }
  }, [t]);
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);
  const handleDelete = useCallback(
    async (id) => {
      if (!window.confirm(t("categories.confirmDelete", "Remove this category?"))) return;
      try {
        await deleteCategory(id);
        notify(t("categories.deleteSuccess", "Category removed"), "default");
        loadCategories();
      } catch {
        notify(t("categories.deleteError", "Unable to remove category"), "destructive");
      }
    },
    [loadCategories, t]
  );
  const columns = useMemo(
    () => [
      {
        accessorKey: "slug",
        header: t("categories.table.slug", "Slug"),
        cell: ({ row }) => /* @__PURE__ */ jsx("span", { className: "font-medium", children: row.original.slug })
      },
      {
        accessorKey: "defaultName",
        header: t("categories.table.defaultName", "Name (default)")
      },
      {
        accessorKey: "createdAt",
        header: t("categories.table.createdAt", "Created at"),
        cell: ({ row }) => formatDate(row.original.createdAt),
        enableSorting: false
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", onClick: () => navigate(`/categories/${row.original.id}`), children: t("common.edit", "Edit") }),
          /* @__PURE__ */ jsx(Button, { variant: "destructive", size: "sm", onClick: () => handleDelete(row.original.id), children: t("common.remove", "Remove") })
        ] }),
        enableSorting: false
      }
    ],
    [navigate, handleDelete, t]
  );
  if (loading) return /* @__PURE__ */ jsx(LoadingState, {});
  const tableData = categories.map((category) => ({
    ...category,
    defaultName: category.translations[0]?.name ?? "\u2014"
  }));
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: t("categories.title", "Categories") }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: t("categories.subtitle", "Manage how your content is grouped.") })
      ] }),
      /* @__PURE__ */ jsxs(Button, { onClick: () => navigate("/categories/new"), className: "gap-2", children: [
        /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
        " ",
        t("categories.actions.new", "New category")
      ] })
    ] }),
    /* @__PURE__ */ jsx(DataTable, { columns, data: tableData })
  ] });
};
var UsersView = ({ navigate }) => {
  const t = useTranslate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchUsers();
      setUsers(response.users);
    } catch {
      notify(t("users.loadError", "Unable to load users"), "destructive");
    } finally {
      setLoading(false);
    }
  }, [t]);
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);
  const handleDelete = useCallback(
    async (id) => {
      if (!window.confirm(t("users.confirmDelete", "Remove this user?"))) return;
      try {
        await deleteUser(id);
        notify(t("users.deleteSuccess", "User removed"), "default");
        loadUsers();
      } catch {
        notify(t("users.deleteError", "Unable to remove user"), "destructive");
      }
    },
    [loadUsers, t]
  );
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: t("users.table.name", "Name"),
        cell: ({ row }) => /* @__PURE__ */ jsx("span", { className: "font-medium", children: row.original.name })
      },
      {
        accessorKey: "email",
        header: t("users.table.email", "Email")
      },
      {
        accessorKey: "role",
        header: t("users.table.role", "Role"),
        cell: ({ row }) => /* @__PURE__ */ jsx(Badge, { variant: row.original.role === "admin" ? "default" : "secondary", children: row.original.role === "admin" ? t("users.roles.admin", "Admin") : t("users.roles.author", "Author") })
      },
      {
        accessorKey: "createdAt",
        header: t("users.table.createdAt", "Created at"),
        cell: ({ row }) => formatDate(row.original.createdAt),
        enableSorting: false
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", onClick: () => navigate(`/users/${row.original.id}`), children: t("common.edit", "Edit") }),
          /* @__PURE__ */ jsx(Button, { variant: "destructive", size: "sm", onClick: () => handleDelete(row.original.id), children: t("common.remove", "Remove") })
        ] }),
        enableSorting: false
      }
    ],
    [navigate, handleDelete, t]
  );
  if (loading) return /* @__PURE__ */ jsx(LoadingState, {});
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: t("users.title", "Blog users") }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: t("users.subtitle", "Control who can access the admin area.") })
      ] }),
      /* @__PURE__ */ jsxs(Button, { onClick: () => navigate("/users/new"), className: "gap-2", children: [
        /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
        " ",
        t("users.actions.new", "New user")
      ] })
    ] }),
    /* @__PURE__ */ jsx(DataTable, { columns, data: users })
  ] });
};
var UserFormView = ({ userId, navigate }) => {
  const t = useTranslate();
  const [loading, setLoading] = useState(Boolean(userId));
  const [saving, setSaving] = useState(false);
  const form = useForm({
    resolver: zodResolver(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        password: z.string().optional(),
        role: z.enum(["admin", "author"])
      })
    ),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "author"
    }
  });
  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        setLoading(true);
        const { user } = await fetchUser(userId);
        form.reset({ name: user.name, email: user.email, password: "", role: user.role });
      } catch {
        notify(t("users.loadSingleError", "Unable to load user"), "destructive");
      } finally {
        setLoading(false);
      }
    })();
  }, [userId, form, t]);
  const onSubmit = form.handleSubmit(async (data) => {
    setSaving(true);
    try {
      if (userId) {
        await updateUser(userId, {
          name: data.name,
          email: data.email,
          role: data.role,
          password: data.password || void 0
        });
        notify(t("users.updateSuccess", "User updated"), "default");
      } else {
        await createUserRequest({
          name: data.name,
          email: data.email,
          password: data.password,
          remember: false,
          role: data.role
        });
        notify(t("users.createSuccess", "User created"), "default");
      }
      navigate("/users");
    } catch (error) {
      if (error instanceof ApiError) {
        notify(error.message, "destructive");
      } else {
        notify(t("users.saveError", "Unable to save user"), "destructive");
      }
    } finally {
      setSaving(false);
    }
  });
  if (loading) return /* @__PURE__ */ jsx(LoadingState, {});
  return /* @__PURE__ */ jsx("form", { onSubmit, className: "space-y-6", children: /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { children: userId ? t("users.form.editTitle", "Edit user") : t("users.form.newTitle", "New user") }),
      /* @__PURE__ */ jsx(CardDescription, { children: t("users.form.description", "Define who can access the admin area.") })
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { className: "grid gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { className: fieldClass, children: [
        /* @__PURE__ */ jsx(Label2, { htmlFor: "user-name", children: t("users.form.nameLabel", "Name") }),
        /* @__PURE__ */ jsx(Input, { id: "user-name", ...form.register("name") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: fieldClass, children: [
        /* @__PURE__ */ jsx(Label2, { htmlFor: "user-email", children: t("users.form.emailLabel", "Email") }),
        /* @__PURE__ */ jsx(Input, { id: "user-email", type: "email", ...form.register("email") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: fieldClass, children: [
        /* @__PURE__ */ jsx(Label2, { htmlFor: "user-password", children: userId ? t("users.form.newPasswordLabel", "New password (optional)") : t("users.form.passwordLabel", "Password") }),
        /* @__PURE__ */ jsx(Input, { id: "user-password", type: "password", ...form.register("password") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: fieldClass, children: [
        /* @__PURE__ */ jsx(Label2, { htmlFor: "user-role", children: t("users.form.roleLabel", "Role") }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            id: "user-role",
            className: "h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            ...form.register("role"),
            children: [
              /* @__PURE__ */ jsx("option", { value: "admin", children: t("users.roles.admin", "Admin") }),
              /* @__PURE__ */ jsx("option", { value: "author", children: t("users.roles.author", "Author") })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "md:col-span-2 rounded-md border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-200", children: t(
        "users.form.rolesHint",
        "Authors can edit only their own posts. Admins manage everything."
      ) })
    ] }),
    /* @__PURE__ */ jsxs(CardFooter, { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: () => navigate("/users"), children: t("common.cancel", "Cancel") }),
      /* @__PURE__ */ jsx(Button, { type: "submit", disabled: saving, children: saving ? t("common.saving", "Saving...") : userId ? t("users.form.updateAction", "Update user") : t("users.form.createAction", "Create user") })
    ] })
  ] }) });
};
var LanguagesView = ({ refreshLanguages }) => {
  const {
    state: { languages }
  } = useContext(AdminContext);
  const t = useTranslate();
  const [form, setForm] = useState({ code: "", name: "" });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.code || !form.name) {
      notify(t("languages.form.required", "Enter a language code and name"), "destructive");
      return;
    }
    if (!/^[a-z]{2,5}$/i.test(form.code)) {
      notify(t("languages.form.invalidCode", "Invalid language code"), "destructive");
      return;
    }
    setLoading(true);
    try {
      await upsertLanguage({ code: form.code.toLowerCase(), name: form.name });
      notify(t("languages.form.saveSuccess", "Language saved successfully"), "default");
      setForm({ code: "", name: "" });
      await refreshLanguages();
    } catch (error) {
      if (error instanceof ApiError) {
        notify(error.message, "destructive");
      } else {
        notify(t("languages.form.saveError", "Unable to save language"), "destructive");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleToggle = useCallback(
    async (language, prop) => {
      try {
        await upsertLanguage({
          code: language.code,
          name: language.name,
          enabled: prop === "enabled" ? !language.enabled : true,
          isDefault: prop === "isDefault" ? true : language.isDefault
        });
        notify(
          prop === "isDefault" ? t("languages.setDefaultSuccess", "{{name}} set as default", { name: language.name }) : t("languages.updateSuccess", "Language updated"),
          "default"
        );
        await refreshLanguages();
      } catch (error) {
        if (error instanceof ApiError) {
          notify(error.message, "destructive");
        } else {
          notify(t("languages.updateError", "Unable to update language"), "destructive");
        }
      }
    },
    [refreshLanguages, t]
  );
  const handleDelete = useCallback(
    async (code) => {
      if (!window.confirm(t("languages.confirmDelete", "Remove this language?"))) return;
      try {
        await deleteLanguage(code);
        notify(t("languages.deleteSuccess", "Language removed"), "default");
        await refreshLanguages();
      } catch (error) {
        if (error instanceof ApiError) {
          notify(error.message, "destructive");
        } else {
          notify(t("languages.deleteError", "Unable to remove language"), "destructive");
        }
      }
    },
    [refreshLanguages, t]
  );
  const columns = useMemo(
    () => [
      {
        accessorKey: "code",
        header: t("languages.table.code", "Code"),
        cell: ({ row }) => /* @__PURE__ */ jsx("span", { className: "font-medium uppercase", children: row.original.code })
      },
      {
        accessorKey: "name",
        header: t("languages.table.name", "Name")
      },
      {
        id: "isDefault",
        header: t("languages.table.default", "Default"),
        cell: ({ row }) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Badge, { variant: row.original.isDefault ? "default" : "secondary", children: row.original.isDefault ? t("languages.badges.default", "Default") : t("languages.badges.alternative", "Alternative") }),
          !row.original.isDefault && /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: () => handleToggle(row.original, "isDefault"), children: t("languages.actions.setDefault", "Set as default") })
        ] }),
        enableSorting: false
      },
      {
        id: "enabled",
        header: t("languages.table.enabled", "Enabled"),
        cell: ({ row }) => /* @__PURE__ */ jsx(Switch, { checked: row.original.enabled, onCheckedChange: () => handleToggle(row.original, "enabled") }),
        enableSorting: false
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
          Button,
          {
            variant: "destructive",
            size: "sm",
            onClick: () => handleDelete(row.original.code),
            disabled: row.original.isDefault,
            children: t("common.remove", "Remove")
          }
        ) }),
        enableSorting: false
      }
    ],
    [handleDelete, handleToggle, t]
  );
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: t("languages.form.title", "Add language") }),
        /* @__PURE__ */ jsx(CardDescription, { children: t("languages.form.description", "Choose which translations are available in the admin.") })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "grid gap-4 sm:grid-cols-[200px,1fr,120px]", children: [
        /* @__PURE__ */ jsxs("div", { className: fieldClass, children: [
          /* @__PURE__ */ jsx(Label2, { htmlFor: "language-code", children: t("languages.form.codeLabel", "Code (e.g., pt, en)") }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "language-code",
              value: form.code,
              onChange: (event) => setForm((prev) => ({ ...prev, code: event.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: fieldClass, children: [
          /* @__PURE__ */ jsx(Label2, { htmlFor: "language-name", children: t("languages.form.nameLabel", "Name") }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "language-name",
              value: form.name,
              onChange: (event) => setForm((prev) => ({ ...prev, name: event.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-end", children: /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", disabled: loading, children: loading ? t("common.saving", "Saving...") : t("languages.form.addAction", "Add") }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(DataTable, { columns, data: languages })
  ] });
};
var RouteView = ({ route, navigate }) => {
  const { refreshLanguages } = useContext(AdminContext);
  switch (route.type) {
    case "dashboard":
      return /* @__PURE__ */ jsx(DashboardView, { navigate });
    case "posts-list":
      return /* @__PURE__ */ jsx(PostListView, { navigate });
    case "posts-create":
      return /* @__PURE__ */ jsx(PostFormView, { navigate });
    case "posts-edit":
      return /* @__PURE__ */ jsx(PostFormView, { postId: route.id, navigate });
    case "categories-list":
      return /* @__PURE__ */ jsx(CategoryListView, { navigate });
    case "categories-create":
      return /* @__PURE__ */ jsx(CategoryFormView, { navigate });
    case "categories-edit":
      return /* @__PURE__ */ jsx(CategoryFormView, { categoryId: route.id, navigate });
    case "users-list":
      return /* @__PURE__ */ jsx(UsersView, { navigate });
    case "users-create":
      return /* @__PURE__ */ jsx(UserFormView, { navigate });
    case "users-edit":
      return /* @__PURE__ */ jsx(UserFormView, { userId: route.id, navigate });
    case "languages":
      return /* @__PURE__ */ jsx(LanguagesView, { refreshLanguages });
    default:
      return /* @__PURE__ */ jsx(DashboardView, { navigate });
  }
};
var AuthView = ({
  mode,
  onSwitchMode,
  onSuccess
}) => {
  const t = useTranslate();
  const setupSchema = useMemo(() => buildSetupSchema(t), [t]);
  const loginSchema = useMemo(() => buildLoginSchema(t), [t]);
  const setupForm = useForm({
    resolver: zodResolver(setupSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      remember: true,
      role: "admin"
    }
  });
  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: true
    }
  });
  const handleSetupSubmit = setupForm.handleSubmit(async (data) => {
    try {
      await createUserRequest({ ...data, role: "admin" });
      const loginResult = await loginRequest({ email: data.email, password: data.password, remember: true });
      notify(t("auth.setup.success", "First admin user created"), "default");
      onSuccess(loginResult.user);
    } catch (error) {
      if (error instanceof ApiError) {
        notify(error.message, "destructive");
      } else {
        notify(t("auth.setup.error", "Unable to create the first user"), "destructive");
      }
    }
  });
  const handleLoginSubmit = loginForm.handleSubmit(async (data) => {
    try {
      const response = await loginRequest(data);
      notify(t("auth.login.success", "Logged in successfully"), "default");
      onSuccess(response.user);
    } catch (error) {
      if (error instanceof ApiError) {
        notify(error.message, "destructive");
      } else {
        notify(t("auth.login.error", "Unable to sign in"), "destructive");
      }
    }
  });
  if (mode === "setup") {
    return /* @__PURE__ */ jsx("div", { className: "flex flex-1 items-center justify-center bg-muted/30 p-6", children: /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-md", children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: t("auth.setup.title", "Create the first admin user") }),
        /* @__PURE__ */ jsx(CardDescription, { children: t("auth.setup.subtitle", "Provide the initial administrator credentials.") })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", { className: "space-y-4", onSubmit: handleSetupSubmit, children: [
        /* @__PURE__ */ jsxs("div", { className: fieldClass, children: [
          /* @__PURE__ */ jsx(Label2, { htmlFor: "setup-name", children: t("auth.setup.nameLabel", "Name") }),
          /* @__PURE__ */ jsx(Input, { id: "setup-name", ...setupForm.register("name") }),
          setupForm.formState.errors.name && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: setupForm.formState.errors.name.message })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: fieldClass, children: [
          /* @__PURE__ */ jsx(Label2, { htmlFor: "setup-email", children: t("auth.setup.emailLabel", "Email") }),
          /* @__PURE__ */ jsx(Input, { id: "setup-email", type: "email", ...setupForm.register("email") }),
          setupForm.formState.errors.email && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: setupForm.formState.errors.email.message })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: fieldClass, children: [
          /* @__PURE__ */ jsx(Label2, { htmlFor: "setup-password", children: t("auth.setup.passwordLabel", "Password") }),
          /* @__PURE__ */ jsx(Input, { id: "setup-password", type: "password", ...setupForm.register("password") }),
          setupForm.formState.errors.password && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: setupForm.formState.errors.password.message })
        ] }),
        /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", disabled: setupForm.formState.isSubmitting, children: setupForm.formState.isSubmitting ? t("common.saving", "Saving...") : t("auth.setup.submit", "Create user") })
      ] }) }),
      /* @__PURE__ */ jsx(CardFooter, { className: "justify-center", children: /* @__PURE__ */ jsx(Button, { variant: "link", onClick: () => onSwitchMode("login"), children: t("auth.setup.switchToLogin", "I already have a user") }) })
    ] }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "flex flex-1 items-center justify-center bg-muted/30 p-6", children: /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { children: t("auth.login.title", "Access the blog admin") }),
      /* @__PURE__ */ jsx(CardDescription, { children: t("auth.login.subtitle", "Enter your credentials to manage the content.") })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", { className: "space-y-4", onSubmit: handleLoginSubmit, children: [
      /* @__PURE__ */ jsxs("div", { className: fieldClass, children: [
        /* @__PURE__ */ jsx(Label2, { htmlFor: "login-email", children: t("auth.login.emailLabel", "Email") }),
        /* @__PURE__ */ jsx(Input, { id: "login-email", type: "email", ...loginForm.register("email") }),
        loginForm.formState.errors.email && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: loginForm.formState.errors.email.message })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: fieldClass, children: [
        /* @__PURE__ */ jsx(Label2, { htmlFor: "login-password", children: t("auth.login.passwordLabel", "Password") }),
        /* @__PURE__ */ jsx(Input, { id: "login-password", type: "password", ...loginForm.register("password") }),
        loginForm.formState.errors.password && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: loginForm.formState.errors.password.message })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "remember",
            type: "checkbox",
            className: "h-4 w-4 rounded border border-input text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            ...loginForm.register("remember")
          }
        ),
        /* @__PURE__ */ jsx(Label2, { htmlFor: "remember", className: "text-sm text-muted-foreground", children: t("auth.login.rememberMe", "Keep me signed in") })
      ] }),
      /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", disabled: loginForm.formState.isSubmitting, children: loginForm.formState.isSubmitting ? t("auth.login.submitting", "Signing in...") : t("auth.login.submit", "Sign in") })
    ] }) }),
    /* @__PURE__ */ jsx(CardFooter, { className: "justify-center", children: /* @__PURE__ */ jsx(Button, { variant: "link", onClick: () => onSwitchMode("setup"), children: t("auth.login.switchToSetup", "Create first user") }) })
  ] }) });
};
var AdminShell = ({ branding }) => {
  const t = useTranslate();
  const router = useAdminRouter();
  const [authState, setAuthState] = useState("loading");
  const [authUser, setAuthUser] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [themeColor, setThemeColor] = useState();
  const [features, setFeatures] = useState({ aiTranslation: false });
  const resolvedBranding = useMemo(
    () => ({
      title: branding?.title?.trim() || t("nav.brandTitle", "Blog CMS"),
      tagline: branding?.tagline?.trim() || t("nav.tagline", "Multi-language content for Next.js")
    }),
    [branding?.title, branding?.tagline, t]
  );
  const refreshLanguages = useCallback(async () => {
    try {
      const response = await fetchLanguages();
      setLanguages(response);
    } catch {
      notify(t("languages.loadError", "Unable to load languages"), "destructive");
    }
  }, [t]);
  useEffect(() => {
    (async () => {
      try {
        const status = await fetchAuthStatus();
        setThemeColor(status.theme?.primaryColor ?? void 0);
        setFeatures({
          aiTranslation: status.features?.aiTranslation ?? false
        });
        if (!status.hasUsers) {
          setAuthState("setup");
          return;
        }
        if (!status.user) {
          setAuthState("login");
          return;
        }
        setAuthUser(status.user);
        setAuthState("ready");
      } catch {
        setAuthState("login");
      }
    })();
  }, []);
  useEffect(() => {
    if (authState === "ready") refreshLanguages();
  }, [authState, refreshLanguages]);
  const handleAuthSuccess = useCallback(
    async (user) => {
      setAuthUser(user);
      setAuthState("ready");
      try {
        const status = await fetchAuthStatus();
        setThemeColor(status.theme?.primaryColor ?? void 0);
        setFeatures({
          aiTranslation: status.features?.aiTranslation ?? false
        });
      } catch {
        setFeatures({ aiTranslation: false });
      }
      refreshLanguages();
    },
    [refreshLanguages]
  );
  const handleLogout = async () => {
    try {
      await logoutRequest();
      setAuthUser(null);
      setAuthState("login");
      setFeatures({ aiTranslation: false });
      notify(t("auth.logout.success", "Session closed"));
    } catch {
      notify(t("auth.logout.error", "Unable to end the session"), "destructive");
    }
  };
  const adminContextValue = useMemo(
    () => ({
      state: { user: authUser, languages, features },
      setUser: setAuthUser,
      setLanguages,
      refreshLanguages
    }),
    [authUser, languages, features, refreshLanguages]
  );
  let content;
  if (authState === "loading") {
    content = /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-muted/30", children: /* @__PURE__ */ jsx(Loader2, { className: "h-6 w-6 animate-spin text-muted-foreground" }) });
  } else if (authState === "setup" || authState === "login") {
    content = /* @__PURE__ */ jsx(AuthView, { mode: authState, onSwitchMode: setAuthState, onSuccess: handleAuthSuccess });
  } else {
    content = /* @__PURE__ */ jsx(AdminContext.Provider, { value: adminContextValue, children: /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen bg-background text-foreground", children: [
      /* @__PURE__ */ jsx(Sidebar, { current: router.route, navigate: router.navigate, branding: resolvedBranding }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col", children: [
        /* @__PURE__ */ jsx(MobileNav, { current: router.route, navigate: router.navigate }),
        /* @__PURE__ */ jsx(Header, { title: resolveTitle(router.route), onLogout: handleLogout }),
        /* @__PURE__ */ jsx("main", { className: "flex-1 overflow-y-auto bg-muted/20 p-4 md:p-6 lg:p-8", children: /* @__PURE__ */ jsx(RouteView, { route: router.route, navigate: router.navigate }) })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxs(ThemeProvider, { primaryColor: themeColor, children: [
    content,
    /* @__PURE__ */ jsx(Toaster, {})
  ] });
};
function resolveTitle(route) {
  switch (route.type) {
    case "dashboard":
      return translateInstant("nav.dashboard", "Dashboard");
    case "posts-list":
      return translateInstant("routes.posts.list", "Posts");
    case "posts-create":
      return translateInstant("routes.posts.create", "New post");
    case "posts-edit":
      return translateInstant("routes.posts.edit", "Edit post");
    case "categories-list":
      return translateInstant("routes.categories.list", "Categories");
    case "categories-create":
      return translateInstant("routes.categories.create", "New category");
    case "categories-edit":
      return translateInstant("routes.categories.edit", "Edit category");
    case "users-list":
      return translateInstant("routes.users.list", "Users");
    case "users-create":
      return translateInstant("routes.users.create", "New user");
    case "users-edit":
      return translateInstant("routes.users.edit", "Edit user");
    case "languages":
      return translateInstant("routes.languages", "Languages");
    default:
      return translateInstant("routes.default", "Blog Admin");
  }
}
function AdminApp({ branding } = {}) {
  return /* @__PURE__ */ jsx(AdminShell, { branding });
}
var BlogAdmin = ({ locale, messages, translate, branding }) => /* @__PURE__ */ jsx(I18nProvider, { locale, messages, translate, children: /* @__PURE__ */ jsx(AdminApp, { branding }) });
var BlogAdminPage = (props) => /* @__PURE__ */ jsx(BlogAdmin, { ...props });
var admin_default = BlogAdmin;

export { BlogAdmin, BlogAdminPage, admin_default as default };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map