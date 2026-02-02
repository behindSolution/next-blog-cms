'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var lucideReact = require('lucide-react');
var React = require('react');
var reactHookForm = require('react-hook-form');
var zod$1 = require('@hookform/resolvers/zod');
var zod = require('zod');
var jsxRuntime = require('react/jsx-runtime');
var classVarianceAuthority = require('class-variance-authority');
var clsx = require('clsx');
var tailwindMerge = require('tailwind-merge');
var DropdownMenuPrimitive = require('@radix-ui/react-dropdown-menu');
var LabelPrimitive = require('@radix-ui/react-label');
var tabs = require('@base-ui/react/tabs');
var SheetPrimitive = require('@radix-ui/react-dialog');
var dialog = require('@base-ui/react/dialog');
var SwitchPrimitives = require('@radix-ui/react-switch');
var ToastPrimitives = require('@radix-ui/react-toast');
var react = require('@tiptap/react');
var StarterKit = require('@tiptap/starter-kit');
var Placeholder = require('@tiptap/extension-placeholder');
var Link = require('@tiptap/extension-link');
var reactTable = require('@tanstack/react-table');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);
var DropdownMenuPrimitive__namespace = /*#__PURE__*/_interopNamespace(DropdownMenuPrimitive);
var LabelPrimitive__namespace = /*#__PURE__*/_interopNamespace(LabelPrimitive);
var SheetPrimitive__namespace = /*#__PURE__*/_interopNamespace(SheetPrimitive);
var SwitchPrimitives__namespace = /*#__PURE__*/_interopNamespace(SwitchPrimitives);
var ToastPrimitives__namespace = /*#__PURE__*/_interopNamespace(ToastPrimitives);
var StarterKit__default = /*#__PURE__*/_interopDefault(StarterKit);
var Placeholder__default = /*#__PURE__*/_interopDefault(Placeholder);
var Link__default = /*#__PURE__*/_interopDefault(Link);

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
styleInject('/*! tailwindcss v4.1.18 | MIT License | https://tailwindcss.com */\n@layer properties;\n@layer theme, base, components, utilities;\n@layer theme {\n  :root,\n  :host {\n    --font-sans:\n      ui-sans-serif,\n      system-ui,\n      sans-serif,\n      "Apple Color Emoji",\n      "Segoe UI Emoji",\n      "Segoe UI Symbol",\n      "Noto Color Emoji";\n    --font-mono:\n      ui-monospace,\n      SFMono-Regular,\n      Menlo,\n      Monaco,\n      Consolas,\n      "Liberation Mono",\n      "Courier New",\n      monospace;\n    --color-blue-50: oklch(97% 0.014 254.604);\n    --color-blue-200: oklch(88.2% 0.059 254.128);\n    --color-blue-500: oklch(62.3% 0.214 259.815);\n    --color-blue-700: oklch(48.8% 0.243 264.376);\n    --color-slate-800: oklch(27.9% 0.041 260.031);\n    --color-slate-900: oklch(20.8% 0.042 265.755);\n    --color-black: #000;\n    --color-white: #fff;\n    --spacing: 0.25rem;\n    --container-sm: 24rem;\n    --container-md: 28rem;\n    --container-lg: 32rem;\n    --text-xs: 0.75rem;\n    --text-xs--line-height: calc(1 / 0.75);\n    --text-sm: 0.875rem;\n    --text-sm--line-height: calc(1.25 / 0.875);\n    --text-base: 1rem;\n    --text-base--line-height: calc(1.5 / 1);\n    --text-lg: 1.125rem;\n    --text-lg--line-height: calc(1.75 / 1.125);\n    --text-xl: 1.25rem;\n    --text-xl--line-height: calc(1.75 / 1.25);\n    --text-2xl: 1.5rem;\n    --text-2xl--line-height: calc(2 / 1.5);\n    --text-3xl: 1.875rem;\n    --text-3xl--line-height: calc(2.25 / 1.875);\n    --font-weight-medium: 500;\n    --font-weight-semibold: 600;\n    --font-weight-bold: 700;\n    --tracking-tight: -0.025em;\n    --tracking-wider: 0.05em;\n    --tracking-widest: 0.1em;\n    --leading-relaxed: 1.625;\n    --radius-sm: 0.375rem;\n    --radius-md: 0.5rem;\n    --radius-lg: 0.75rem;\n    --radius-xl: 1rem;\n    --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);\n    --animate-spin: spin 1s linear infinite;\n    --blur-sm: 8px;\n    --default-transition-duration: 150ms;\n    --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    --default-font-family: var(--font-sans);\n    --default-mono-font-family: var(--font-mono);\n    --radius: 0.5rem;\n    --shadow-card-hover: 0 8px 30px -12px rgba(0, 0, 0, 0.15);\n    --animate-scale-in: scale-in 0.2s ease-out;\n  }\n}\n@layer base {\n  *,\n  ::after,\n  ::before,\n  ::backdrop,\n  ::file-selector-button {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n    border: 0 solid;\n  }\n  html,\n  :host {\n    line-height: 1.5;\n    -webkit-text-size-adjust: 100%;\n    tab-size: 4;\n    font-family: var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");\n    font-feature-settings: var(--default-font-feature-settings, normal);\n    font-variation-settings: var(--default-font-variation-settings, normal);\n    -webkit-tap-highlight-color: transparent;\n  }\n  hr {\n    height: 0;\n    color: inherit;\n    border-top-width: 1px;\n  }\n  abbr:where([title]) {\n    -webkit-text-decoration: underline dotted;\n    text-decoration: underline dotted;\n  }\n  h1,\n  h2,\n  h3,\n  h4,\n  h5,\n  h6 {\n    font-size: inherit;\n    font-weight: inherit;\n  }\n  a {\n    color: inherit;\n    -webkit-text-decoration: inherit;\n    text-decoration: inherit;\n  }\n  b,\n  strong {\n    font-weight: bolder;\n  }\n  code,\n  kbd,\n  samp,\n  pre {\n    font-family: var(--default-mono-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);\n    font-feature-settings: var(--default-mono-font-feature-settings, normal);\n    font-variation-settings: var(--default-mono-font-variation-settings, normal);\n    font-size: 1em;\n  }\n  small {\n    font-size: 80%;\n  }\n  sub,\n  sup {\n    font-size: 75%;\n    line-height: 0;\n    position: relative;\n    vertical-align: baseline;\n  }\n  sub {\n    bottom: -0.25em;\n  }\n  sup {\n    top: -0.5em;\n  }\n  table {\n    text-indent: 0;\n    border-color: inherit;\n    border-collapse: collapse;\n  }\n  :-moz-focusring {\n    outline: auto;\n  }\n  progress {\n    vertical-align: baseline;\n  }\n  summary {\n    display: list-item;\n  }\n  ol,\n  ul,\n  menu {\n    list-style: none;\n  }\n  img,\n  svg,\n  video,\n  canvas,\n  audio,\n  iframe,\n  embed,\n  object {\n    display: block;\n    vertical-align: middle;\n  }\n  img,\n  video {\n    max-width: 100%;\n    height: auto;\n  }\n  button,\n  input,\n  select,\n  optgroup,\n  textarea,\n  ::file-selector-button {\n    font: inherit;\n    font-feature-settings: inherit;\n    font-variation-settings: inherit;\n    letter-spacing: inherit;\n    color: inherit;\n    border-radius: 0;\n    background-color: transparent;\n    opacity: 1;\n  }\n  :where(select:is([multiple], [size])) optgroup {\n    font-weight: bolder;\n  }\n  :where(select:is([multiple], [size])) optgroup option {\n    padding-inline-start: 20px;\n  }\n  ::file-selector-button {\n    margin-inline-end: 4px;\n  }\n  ::placeholder {\n    opacity: 1;\n  }\n  @supports (not (-webkit-appearance: -apple-pay-button)) or (contain-intrinsic-size: 1px) {\n    ::placeholder {\n      color: currentcolor;\n      @supports (color: color-mix(in lab, red, red)) {\n        color: color-mix(in oklab, currentcolor 50%, transparent);\n      }\n    }\n  }\n  textarea {\n    resize: vertical;\n  }\n  ::-webkit-search-decoration {\n    -webkit-appearance: none;\n  }\n  ::-webkit-date-and-time-value {\n    min-height: 1lh;\n    text-align: inherit;\n  }\n  ::-webkit-datetime-edit {\n    display: inline-flex;\n  }\n  ::-webkit-datetime-edit-fields-wrapper {\n    padding: 0;\n  }\n  ::-webkit-datetime-edit,\n  ::-webkit-datetime-edit-year-field,\n  ::-webkit-datetime-edit-month-field,\n  ::-webkit-datetime-edit-day-field,\n  ::-webkit-datetime-edit-hour-field,\n  ::-webkit-datetime-edit-minute-field,\n  ::-webkit-datetime-edit-second-field,\n  ::-webkit-datetime-edit-millisecond-field,\n  ::-webkit-datetime-edit-meridiem-field {\n    padding-block: 0;\n  }\n  ::-webkit-calendar-picker-indicator {\n    line-height: 1;\n  }\n  :-moz-ui-invalid {\n    box-shadow: none;\n  }\n  button,\n  input:where([type=button], [type=reset], [type=submit]),\n  ::file-selector-button {\n    appearance: button;\n  }\n  ::-webkit-inner-spin-button,\n  ::-webkit-outer-spin-button {\n    height: auto;\n  }\n  [hidden]:where(:not([hidden=until-found])) {\n    display: none !important;\n  }\n}\n@layer utilities {\n  .pointer-events-auto {\n    pointer-events: auto;\n  }\n  .pointer-events-none {\n    pointer-events: none;\n  }\n  .sr-only {\n    position: absolute;\n    width: 1px;\n    height: 1px;\n    padding: 0;\n    margin: -1px;\n    overflow: hidden;\n    clip-path: inset(50%);\n    white-space: nowrap;\n    border-width: 0;\n  }\n  .absolute {\n    position: absolute;\n  }\n  .fixed {\n    position: fixed;\n  }\n  .relative {\n    position: relative;\n  }\n  .inset-0 {\n    inset: calc(var(--spacing) * 0);\n  }\n  .inset-x-0 {\n    inset-inline: calc(var(--spacing) * 0);\n  }\n  .inset-y-0 {\n    inset-block: calc(var(--spacing) * 0);\n  }\n  .top-0 {\n    top: calc(var(--spacing) * 0);\n  }\n  .top-1 {\n    top: calc(var(--spacing) * 1);\n  }\n  .top-1\\/2 {\n    top: calc(1/2 * 100%);\n  }\n  .top-2 {\n    top: calc(var(--spacing) * 2);\n  }\n  .top-4 {\n    top: calc(var(--spacing) * 4);\n  }\n  .right-0 {\n    right: calc(var(--spacing) * 0);\n  }\n  .right-2 {\n    right: calc(var(--spacing) * 2);\n  }\n  .right-4 {\n    right: calc(var(--spacing) * 4);\n  }\n  .bottom-0 {\n    bottom: calc(var(--spacing) * 0);\n  }\n  .bottom-4 {\n    bottom: calc(var(--spacing) * 4);\n  }\n  .left-0 {\n    left: calc(var(--spacing) * 0);\n  }\n  .left-1 {\n    left: calc(var(--spacing) * 1);\n  }\n  .left-1\\/2 {\n    left: calc(1/2 * 100%);\n  }\n  .left-2 {\n    left: calc(var(--spacing) * 2);\n  }\n  .z-10 {\n    z-index: 10;\n  }\n  .z-50 {\n    z-index: 50;\n  }\n  .z-\\[100\\] {\n    z-index: 100;\n  }\n  .container {\n    width: 100%;\n    @media (width >= 40rem) {\n      max-width: 40rem;\n    }\n    @media (width >= 48rem) {\n      max-width: 48rem;\n    }\n    @media (width >= 64rem) {\n      max-width: 64rem;\n    }\n    @media (width >= 80rem) {\n      max-width: 80rem;\n    }\n    @media (width >= 96rem) {\n      max-width: 96rem;\n    }\n  }\n  .-mx-1 {\n    margin-inline: calc(var(--spacing) * -1);\n  }\n  .my-1 {\n    margin-block: calc(var(--spacing) * 1);\n  }\n  .my-auto {\n    margin-block: auto;\n  }\n  .mt-2 {\n    margin-top: calc(var(--spacing) * 2);\n  }\n  .mt-4 {\n    margin-top: calc(var(--spacing) * 4);\n  }\n  .mt-6 {\n    margin-top: calc(var(--spacing) * 6);\n  }\n  .mb-4 {\n    margin-bottom: calc(var(--spacing) * 4);\n  }\n  .mb-8 {\n    margin-bottom: calc(var(--spacing) * 8);\n  }\n  .ml-1 {\n    margin-left: calc(var(--spacing) * 1);\n  }\n  .ml-auto {\n    margin-left: auto;\n  }\n  .block {\n    display: block;\n  }\n  .contents {\n    display: contents;\n  }\n  .flex {\n    display: flex;\n  }\n  .grid {\n    display: grid;\n  }\n  .hidden {\n    display: none;\n  }\n  .inline-flex {\n    display: inline-flex;\n  }\n  .table {\n    display: table;\n  }\n  .aspect-square {\n    aspect-ratio: 1 / 1;\n  }\n  .h-1 {\n    height: calc(var(--spacing) * 1);\n  }\n  .h-1\\.5 {\n    height: calc(var(--spacing) * 1.5);\n  }\n  .h-2 {\n    height: calc(var(--spacing) * 2);\n  }\n  .h-3 {\n    height: calc(var(--spacing) * 3);\n  }\n  .h-3\\.5 {\n    height: calc(var(--spacing) * 3.5);\n  }\n  .h-4 {\n    height: calc(var(--spacing) * 4);\n  }\n  .h-5 {\n    height: calc(var(--spacing) * 5);\n  }\n  .h-6 {\n    height: calc(var(--spacing) * 6);\n  }\n  .h-7 {\n    height: calc(var(--spacing) * 7);\n  }\n  .h-8 {\n    height: calc(var(--spacing) * 8);\n  }\n  .h-9 {\n    height: calc(var(--spacing) * 9);\n  }\n  .h-10 {\n    height: calc(var(--spacing) * 10);\n  }\n  .h-11 {\n    height: calc(var(--spacing) * 11);\n  }\n  .h-12 {\n    height: calc(var(--spacing) * 12);\n  }\n  .h-16 {\n    height: calc(var(--spacing) * 16);\n  }\n  .h-20 {\n    height: calc(var(--spacing) * 20);\n  }\n  .h-24 {\n    height: calc(var(--spacing) * 24);\n  }\n  .h-full {\n    height: 100%;\n  }\n  .h-px {\n    height: 1px;\n  }\n  .min-h-\\[80px\\] {\n    min-height: 80px;\n  }\n  .min-h-screen {\n    min-height: 100vh;\n  }\n  .w-1 {\n    width: calc(var(--spacing) * 1);\n  }\n  .w-1\\.5 {\n    width: calc(var(--spacing) * 1.5);\n  }\n  .w-2 {\n    width: calc(var(--spacing) * 2);\n  }\n  .w-3 {\n    width: calc(var(--spacing) * 3);\n  }\n  .w-3\\.5 {\n    width: calc(var(--spacing) * 3.5);\n  }\n  .w-3\\/4 {\n    width: calc(3/4 * 100%);\n  }\n  .w-4 {\n    width: calc(var(--spacing) * 4);\n  }\n  .w-5 {\n    width: calc(var(--spacing) * 5);\n  }\n  .w-6 {\n    width: calc(var(--spacing) * 6);\n  }\n  .w-7 {\n    width: calc(var(--spacing) * 7);\n  }\n  .w-8 {\n    width: calc(var(--spacing) * 8);\n  }\n  .w-9 {\n    width: calc(var(--spacing) * 9);\n  }\n  .w-10 {\n    width: calc(var(--spacing) * 10);\n  }\n  .w-11 {\n    width: calc(var(--spacing) * 11);\n  }\n  .w-12 {\n    width: calc(var(--spacing) * 12);\n  }\n  .w-40 {\n    width: calc(var(--spacing) * 40);\n  }\n  .w-64 {\n    width: calc(var(--spacing) * 64);\n  }\n  .w-80 {\n    width: calc(var(--spacing) * 80);\n  }\n  .w-full {\n    width: 100%;\n  }\n  .max-w-lg {\n    max-width: var(--container-lg);\n  }\n  .max-w-md {\n    max-width: var(--container-md);\n  }\n  .max-w-sm {\n    max-width: var(--container-sm);\n  }\n  .min-w-\\[8rem\\] {\n    min-width: 8rem;\n  }\n  .min-w-\\[10rem\\] {\n    min-width: 10rem;\n  }\n  .min-w-\\[100px\\] {\n    min-width: 100px;\n  }\n  .flex-1 {\n    flex: 1;\n  }\n  .flex-none {\n    flex: none;\n  }\n  .flex-shrink {\n    flex-shrink: 1;\n  }\n  .shrink-0 {\n    flex-shrink: 0;\n  }\n  .caption-bottom {\n    caption-side: bottom;\n  }\n  .border-collapse {\n    border-collapse: collapse;\n  }\n  .-translate-x-1 {\n    --tw-translate-x: calc(var(--spacing) * -1);\n    translate: var(--tw-translate-x) var(--tw-translate-y);\n  }\n  .-translate-x-1\\/2 {\n    --tw-translate-x: calc(calc(1/2 * 100%) * -1);\n    translate: var(--tw-translate-x) var(--tw-translate-y);\n  }\n  .-translate-y-1 {\n    --tw-translate-y: calc(var(--spacing) * -1);\n    translate: var(--tw-translate-x) var(--tw-translate-y);\n  }\n  .-translate-y-1\\/2 {\n    --tw-translate-y: calc(calc(1/2 * 100%) * -1);\n    translate: var(--tw-translate-x) var(--tw-translate-y);\n  }\n  .scale-0 {\n    --tw-scale-x: 0%;\n    --tw-scale-y: 0%;\n    --tw-scale-z: 0%;\n    scale: var(--tw-scale-x) var(--tw-scale-y);\n  }\n  .scale-100 {\n    --tw-scale-x: 100%;\n    --tw-scale-y: 100%;\n    --tw-scale-z: 100%;\n    scale: var(--tw-scale-x) var(--tw-scale-y);\n  }\n  .rotate-0 {\n    rotate: 0deg;\n  }\n  .rotate-90 {\n    rotate: 90deg;\n  }\n  .transform {\n    transform: var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,);\n  }\n  .animate-scale-in {\n    animation: var(--animate-scale-in);\n  }\n  .animate-spin {\n    animation: var(--animate-spin);\n  }\n  .cursor-default {\n    cursor: default;\n  }\n  .cursor-pointer {\n    cursor: pointer;\n  }\n  .resize {\n    resize: both;\n  }\n  .flex-col {\n    flex-direction: column;\n  }\n  .flex-col-reverse {\n    flex-direction: column-reverse;\n  }\n  .flex-row {\n    flex-direction: row;\n  }\n  .flex-wrap {\n    flex-wrap: wrap;\n  }\n  .items-center {\n    align-items: center;\n  }\n  .items-end {\n    align-items: flex-end;\n  }\n  .items-start {\n    align-items: flex-start;\n  }\n  .justify-between {\n    justify-content: space-between;\n  }\n  .justify-center {\n    justify-content: center;\n  }\n  .justify-end {\n    justify-content: flex-end;\n  }\n  .justify-start {\n    justify-content: flex-start;\n  }\n  .gap-1 {\n    gap: calc(var(--spacing) * 1);\n  }\n  .gap-2 {\n    gap: calc(var(--spacing) * 2);\n  }\n  .gap-2\\.5 {\n    gap: calc(var(--spacing) * 2.5);\n  }\n  .gap-3 {\n    gap: calc(var(--spacing) * 3);\n  }\n  .gap-4 {\n    gap: calc(var(--spacing) * 4);\n  }\n  .gap-6 {\n    gap: calc(var(--spacing) * 6);\n  }\n  .space-y-0 {\n    :where(& > :not(:last-child)) {\n      --tw-space-y-reverse: 0;\n      margin-block-start: calc(calc(var(--spacing) * 0) * var(--tw-space-y-reverse));\n      margin-block-end: calc(calc(var(--spacing) * 0) * calc(1 - var(--tw-space-y-reverse)));\n    }\n  }\n  .space-y-1 {\n    :where(& > :not(:last-child)) {\n      --tw-space-y-reverse: 0;\n      margin-block-start: calc(calc(var(--spacing) * 1) * var(--tw-space-y-reverse));\n      margin-block-end: calc(calc(var(--spacing) * 1) * calc(1 - var(--tw-space-y-reverse)));\n    }\n  }\n  .space-y-1\\.5 {\n    :where(& > :not(:last-child)) {\n      --tw-space-y-reverse: 0;\n      margin-block-start: calc(calc(var(--spacing) * 1.5) * var(--tw-space-y-reverse));\n      margin-block-end: calc(calc(var(--spacing) * 1.5) * calc(1 - var(--tw-space-y-reverse)));\n    }\n  }\n  .space-y-2 {\n    :where(& > :not(:last-child)) {\n      --tw-space-y-reverse: 0;\n      margin-block-start: calc(calc(var(--spacing) * 2) * var(--tw-space-y-reverse));\n      margin-block-end: calc(calc(var(--spacing) * 2) * calc(1 - var(--tw-space-y-reverse)));\n    }\n  }\n  .space-y-4 {\n    :where(& > :not(:last-child)) {\n      --tw-space-y-reverse: 0;\n      margin-block-start: calc(calc(var(--spacing) * 4) * var(--tw-space-y-reverse));\n      margin-block-end: calc(calc(var(--spacing) * 4) * calc(1 - var(--tw-space-y-reverse)));\n    }\n  }\n  .space-y-5 {\n    :where(& > :not(:last-child)) {\n      --tw-space-y-reverse: 0;\n      margin-block-start: calc(calc(var(--spacing) * 5) * var(--tw-space-y-reverse));\n      margin-block-end: calc(calc(var(--spacing) * 5) * calc(1 - var(--tw-space-y-reverse)));\n    }\n  }\n  .space-y-6 {\n    :where(& > :not(:last-child)) {\n      --tw-space-y-reverse: 0;\n      margin-block-start: calc(calc(var(--spacing) * 6) * var(--tw-space-y-reverse));\n      margin-block-end: calc(calc(var(--spacing) * 6) * calc(1 - var(--tw-space-y-reverse)));\n    }\n  }\n  .space-y-8 {\n    :where(& > :not(:last-child)) {\n      --tw-space-y-reverse: 0;\n      margin-block-start: calc(calc(var(--spacing) * 8) * var(--tw-space-y-reverse));\n      margin-block-end: calc(calc(var(--spacing) * 8) * calc(1 - var(--tw-space-y-reverse)));\n    }\n  }\n  .space-x-2 {\n    :where(& > :not(:last-child)) {\n      --tw-space-x-reverse: 0;\n      margin-inline-start: calc(calc(var(--spacing) * 2) * var(--tw-space-x-reverse));\n      margin-inline-end: calc(calc(var(--spacing) * 2) * calc(1 - var(--tw-space-x-reverse)));\n    }\n  }\n  .truncate {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n  .overflow-auto {\n    overflow: auto;\n  }\n  .overflow-hidden {\n    overflow: hidden;\n  }\n  .overflow-y-auto {\n    overflow-y: auto;\n  }\n  .rounded {\n    border-radius: var(--radius);\n  }\n  .rounded-full {\n    border-radius: calc(infinity * 1px);\n  }\n  .rounded-lg {\n    border-radius: var(--radius-lg);\n  }\n  .rounded-md {\n    border-radius: var(--radius-md);\n  }\n  .rounded-sm {\n    border-radius: var(--radius-sm);\n  }\n  .rounded-xl {\n    border-radius: var(--radius-xl);\n  }\n  .rounded-t-full {\n    border-top-left-radius: calc(infinity * 1px);\n    border-top-right-radius: calc(infinity * 1px);\n  }\n  .rounded-r-full {\n    border-top-right-radius: calc(infinity * 1px);\n    border-bottom-right-radius: calc(infinity * 1px);\n  }\n  .border {\n    border-style: var(--tw-border-style);\n    border-width: 1px;\n  }\n  .border-2 {\n    border-style: var(--tw-border-style);\n    border-width: 2px;\n  }\n  .border-t {\n    border-top-style: var(--tw-border-style);\n    border-top-width: 1px;\n  }\n  .border-r {\n    border-right-style: var(--tw-border-style);\n    border-right-width: 1px;\n  }\n  .border-b {\n    border-bottom-style: var(--tw-border-style);\n    border-bottom-width: 1px;\n  }\n  .border-l {\n    border-left-style: var(--tw-border-style);\n    border-left-width: 1px;\n  }\n  .border-blue-200 {\n    border-color: var(--color-blue-200);\n  }\n  .border-border {\n    border-color: hsl(var(--border));\n  }\n  .border-destructive {\n    border-color: hsl(var(--destructive));\n  }\n  .border-input {\n    border-color: hsl(var(--input));\n  }\n  .border-primary {\n    border-color: hsl(var(--primary));\n  }\n  .border-sidebar-border {\n    border-color: hsl(var(--sidebar-border));\n  }\n  .border-transparent {\n    border-color: transparent;\n  }\n  .bg-accent-amber {\n    background-color: hsl(var(--accent-amber));\n  }\n  .bg-accent-blue {\n    background-color: hsl(var(--accent-blue));\n  }\n  .bg-accent-green {\n    background-color: hsl(var(--accent-green));\n  }\n  .bg-accent-purple {\n    background-color: hsl(var(--accent-purple));\n  }\n  .bg-background {\n    background-color: hsl(var(--background));\n  }\n  .bg-black {\n    background-color: var(--color-black);\n  }\n  .bg-black\\/50 {\n    background-color: color-mix(in srgb, #000 50%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-black) 50%, transparent);\n    }\n  }\n  .bg-blue-50 {\n    background-color: var(--color-blue-50);\n  }\n  .bg-card {\n    background-color: hsl(var(--card));\n  }\n  .bg-destructive {\n    background-color: hsl(var(--destructive));\n  }\n  .bg-info {\n    background-color: hsl(var(--info));\n  }\n  .bg-muted {\n    background-color: hsl(var(--muted));\n  }\n  .bg-popover {\n    background-color: hsl(var(--popover));\n  }\n  .bg-primary {\n    background-color: hsl(var(--primary));\n  }\n  .bg-secondary {\n    background-color: hsl(var(--secondary));\n  }\n  .bg-sidebar {\n    background-color: hsl(var(--sidebar));\n  }\n  .bg-success {\n    background-color: hsl(var(--success));\n  }\n  .bg-transparent {\n    background-color: transparent;\n  }\n  .bg-warning {\n    background-color: hsl(var(--warning));\n  }\n  .bg-white {\n    background-color: var(--color-white);\n  }\n  .bg-white\\/20 {\n    background-color: color-mix(in srgb, #fff 20%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-white) 20%, transparent);\n    }\n  }\n  .bg-gradient-to-br {\n    --tw-gradient-position: to bottom right in oklab;\n    background-image: linear-gradient(var(--tw-gradient-stops));\n  }\n  .bg-gradient-brand {\n    background-image:\n      linear-gradient(\n        135deg,\n        hsl(var(--gradient-start)),\n        hsl(var(--gradient-end)));\n  }\n  .bg-gradient-subtle {\n    background-image:\n      linear-gradient(\n        135deg,\n        hsl(var(--gradient-start) / 0.1),\n        hsl(var(--gradient-end) / 0.1));\n  }\n  .from-slate-900 {\n    --tw-gradient-from: var(--color-slate-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  .via-slate-800 {\n    --tw-gradient-via: var(--color-slate-800);\n    --tw-gradient-via-stops:\n      var(--tw-gradient-position),\n      var(--tw-gradient-from) var(--tw-gradient-from-position),\n      var(--tw-gradient-via) var(--tw-gradient-via-position),\n      var(--tw-gradient-to) var(--tw-gradient-to-position);\n    --tw-gradient-stops: var(--tw-gradient-via-stops);\n  }\n  .to-slate-900 {\n    --tw-gradient-to: var(--color-slate-900);\n    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));\n  }\n  .fill-current {\n    fill: currentcolor;\n  }\n  .p-0 {\n    padding: calc(var(--spacing) * 0);\n  }\n  .p-1 {\n    padding: calc(var(--spacing) * 1);\n  }\n  .p-2 {\n    padding: calc(var(--spacing) * 2);\n  }\n  .p-2\\.5 {\n    padding: calc(var(--spacing) * 2.5);\n  }\n  .p-4 {\n    padding: calc(var(--spacing) * 4);\n  }\n  .p-6 {\n    padding: calc(var(--spacing) * 6);\n  }\n  .p-12 {\n    padding: calc(var(--spacing) * 12);\n  }\n  .px-2 {\n    padding-inline: calc(var(--spacing) * 2);\n  }\n  .px-2\\.5 {\n    padding-inline: calc(var(--spacing) * 2.5);\n  }\n  .px-3 {\n    padding-inline: calc(var(--spacing) * 3);\n  }\n  .px-4 {\n    padding-inline: calc(var(--spacing) * 4);\n  }\n  .px-5 {\n    padding-inline: calc(var(--spacing) * 5);\n  }\n  .px-6 {\n    padding-inline: calc(var(--spacing) * 6);\n  }\n  .py-0 {\n    padding-block: calc(var(--spacing) * 0);\n  }\n  .py-0\\.5 {\n    padding-block: calc(var(--spacing) * 0.5);\n  }\n  .py-1 {\n    padding-block: calc(var(--spacing) * 1);\n  }\n  .py-1\\.5 {\n    padding-block: calc(var(--spacing) * 1.5);\n  }\n  .py-2 {\n    padding-block: calc(var(--spacing) * 2);\n  }\n  .py-2\\.5 {\n    padding-block: calc(var(--spacing) * 2.5);\n  }\n  .py-3 {\n    padding-block: calc(var(--spacing) * 3);\n  }\n  .py-4 {\n    padding-block: calc(var(--spacing) * 4);\n  }\n  .pt-0 {\n    padding-top: calc(var(--spacing) * 0);\n  }\n  .pr-2 {\n    padding-right: calc(var(--spacing) * 2);\n  }\n  .pb-2 {\n    padding-bottom: calc(var(--spacing) * 2);\n  }\n  .pl-8 {\n    padding-left: calc(var(--spacing) * 8);\n  }\n  .text-center {\n    text-align: center;\n  }\n  .text-left {\n    text-align: left;\n  }\n  .align-middle {\n    vertical-align: middle;\n  }\n  .text-2xl {\n    font-size: var(--text-2xl);\n    line-height: var(--tw-leading, var(--text-2xl--line-height));\n  }\n  .text-3xl {\n    font-size: var(--text-3xl);\n    line-height: var(--tw-leading, var(--text-3xl--line-height));\n  }\n  .text-base {\n    font-size: var(--text-base);\n    line-height: var(--tw-leading, var(--text-base--line-height));\n  }\n  .text-lg {\n    font-size: var(--text-lg);\n    line-height: var(--tw-leading, var(--text-lg--line-height));\n  }\n  .text-sm {\n    font-size: var(--text-sm);\n    line-height: var(--tw-leading, var(--text-sm--line-height));\n  }\n  .text-xl {\n    font-size: var(--text-xl);\n    line-height: var(--tw-leading, var(--text-xl--line-height));\n  }\n  .text-xs {\n    font-size: var(--text-xs);\n    line-height: var(--tw-leading, var(--text-xs--line-height));\n  }\n  .text-\\[10px\\] {\n    font-size: 10px;\n  }\n  .leading-none {\n    --tw-leading: 1;\n    line-height: 1;\n  }\n  .leading-relaxed {\n    --tw-leading: var(--leading-relaxed);\n    line-height: var(--leading-relaxed);\n  }\n  .font-bold {\n    --tw-font-weight: var(--font-weight-bold);\n    font-weight: var(--font-weight-bold);\n  }\n  .font-medium {\n    --tw-font-weight: var(--font-weight-medium);\n    font-weight: var(--font-weight-medium);\n  }\n  .font-semibold {\n    --tw-font-weight: var(--font-weight-semibold);\n    font-weight: var(--font-weight-semibold);\n  }\n  .tracking-tight {\n    --tw-tracking: var(--tracking-tight);\n    letter-spacing: var(--tracking-tight);\n  }\n  .tracking-wider {\n    --tw-tracking: var(--tracking-wider);\n    letter-spacing: var(--tracking-wider);\n  }\n  .tracking-widest {\n    --tw-tracking: var(--tracking-widest);\n    letter-spacing: var(--tracking-widest);\n  }\n  .whitespace-nowrap {\n    white-space: nowrap;\n  }\n  .text-blue-700 {\n    color: var(--color-blue-700);\n  }\n  .text-card-foreground {\n    color: hsl(var(--card-foreground));\n  }\n  .text-current {\n    color: currentcolor;\n  }\n  .text-destructive {\n    color: hsl(var(--destructive));\n  }\n  .text-destructive-foreground {\n    color: hsl(var(--destructive-foreground));\n  }\n  .text-foreground {\n    color: hsl(var(--foreground));\n  }\n  .text-info-foreground {\n    color: hsl(var(--info-foreground));\n  }\n  .text-muted-foreground {\n    color: hsl(var(--muted-foreground));\n  }\n  .text-popover-foreground {\n    color: hsl(var(--popover-foreground));\n  }\n  .text-primary {\n    color: hsl(var(--primary));\n  }\n  .text-primary-foreground {\n    color: hsl(var(--primary-foreground));\n  }\n  .text-secondary-foreground {\n    color: hsl(var(--secondary-foreground));\n  }\n  .text-sidebar-foreground {\n    color: hsl(var(--sidebar-foreground));\n  }\n  .text-success-foreground {\n    color: hsl(var(--success-foreground));\n  }\n  .text-warning-foreground {\n    color: hsl(var(--warning-foreground));\n  }\n  .text-white {\n    color: var(--color-white);\n  }\n  .uppercase {\n    text-transform: uppercase;\n  }\n  .italic {\n    font-style: italic;\n  }\n  .underline {\n    text-decoration-line: underline;\n  }\n  .underline-offset-4 {\n    text-underline-offset: 4px;\n  }\n  .opacity-0 {\n    opacity: 0%;\n  }\n  .opacity-10 {\n    opacity: 10%;\n  }\n  .opacity-60 {\n    opacity: 60%;\n  }\n  .opacity-70 {\n    opacity: 70%;\n  }\n  .opacity-90 {\n    opacity: 90%;\n  }\n  .shadow-lg {\n    --tw-shadow: 0 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 4px 6px -4px var(--tw-shadow-color, rgb(0 0 0 / 0.1));\n    box-shadow:\n      var(--tw-inset-shadow),\n      var(--tw-inset-ring-shadow),\n      var(--tw-ring-offset-shadow),\n      var(--tw-ring-shadow),\n      var(--tw-shadow);\n  }\n  .shadow-md {\n    --tw-shadow: 0 4px 6px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 2px 4px -2px var(--tw-shadow-color, rgb(0 0 0 / 0.1));\n    box-shadow:\n      var(--tw-inset-shadow),\n      var(--tw-inset-ring-shadow),\n      var(--tw-ring-offset-shadow),\n      var(--tw-ring-shadow),\n      var(--tw-shadow);\n  }\n  .shadow-sm {\n    --tw-shadow: 0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1));\n    box-shadow:\n      var(--tw-inset-shadow),\n      var(--tw-inset-ring-shadow),\n      var(--tw-ring-offset-shadow),\n      var(--tw-ring-shadow),\n      var(--tw-shadow);\n  }\n  .ring-0 {\n    --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);\n    box-shadow:\n      var(--tw-inset-shadow),\n      var(--tw-inset-ring-shadow),\n      var(--tw-ring-offset-shadow),\n      var(--tw-ring-shadow),\n      var(--tw-shadow);\n  }\n  .ring-offset-background {\n    --tw-ring-offset-color: hsl(var(--background));\n  }\n  .outline {\n    outline-style: var(--tw-outline-style);\n    outline-width: 1px;\n  }\n  .blur {\n    --tw-blur: blur(8px);\n    filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);\n  }\n  .filter {\n    filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);\n  }\n  .backdrop-blur-sm {\n    --tw-backdrop-blur: blur(var(--blur-sm));\n    -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);\n    backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);\n  }\n  .backdrop-filter {\n    -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);\n    backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);\n  }\n  .transition {\n    transition-property:\n      color,\n      background-color,\n      border-color,\n      outline-color,\n      text-decoration-color,\n      fill,\n      stroke,\n      --tw-gradient-from,\n      --tw-gradient-via,\n      --tw-gradient-to,\n      opacity,\n      box-shadow,\n      transform,\n      translate,\n      scale,\n      rotate,\n      filter,\n      -webkit-backdrop-filter,\n      backdrop-filter,\n      display,\n      content-visibility,\n      overlay,\n      pointer-events;\n    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));\n    transition-duration: var(--tw-duration, var(--default-transition-duration));\n  }\n  .transition-all {\n    transition-property: all;\n    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));\n    transition-duration: var(--tw-duration, var(--default-transition-duration));\n  }\n  .transition-colors {\n    transition-property:\n      color,\n      background-color,\n      border-color,\n      outline-color,\n      text-decoration-color,\n      fill,\n      stroke,\n      --tw-gradient-from,\n      --tw-gradient-via,\n      --tw-gradient-to;\n    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));\n    transition-duration: var(--tw-duration, var(--default-transition-duration));\n  }\n  .transition-opacity {\n    transition-property: opacity;\n    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));\n    transition-duration: var(--tw-duration, var(--default-transition-duration));\n  }\n  .transition-shadow {\n    transition-property: box-shadow;\n    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));\n    transition-duration: var(--tw-duration, var(--default-transition-duration));\n  }\n  .transition-transform {\n    transition-property:\n      transform,\n      translate,\n      scale,\n      rotate;\n    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));\n    transition-duration: var(--tw-duration, var(--default-transition-duration));\n  }\n  .duration-200 {\n    --tw-duration: 200ms;\n    transition-duration: 200ms;\n  }\n  .ease-in-out {\n    --tw-ease: var(--ease-in-out);\n    transition-timing-function: var(--ease-in-out);\n  }\n  .outline-none {\n    --tw-outline-style: none;\n    outline-style: none;\n  }\n  .select-none {\n    -webkit-user-select: none;\n    user-select: none;\n  }\n  .group-hover\\:opacity-100 {\n    &:is(:where(.group):hover *) {\n      @media (hover: hover) {\n        opacity: 100%;\n      }\n    }\n  }\n  .peer-disabled\\:cursor-not-allowed {\n    &:is(:where(.peer):disabled ~ *) {\n      cursor: not-allowed;\n    }\n  }\n  .peer-disabled\\:opacity-70 {\n    &:is(:where(.peer):disabled ~ *) {\n      opacity: 70%;\n    }\n  }\n  .file\\:border-0 {\n    &::file-selector-button {\n      border-style: var(--tw-border-style);\n      border-width: 0px;\n    }\n  }\n  .file\\:bg-transparent {\n    &::file-selector-button {\n      background-color: transparent;\n    }\n  }\n  .file\\:text-sm {\n    &::file-selector-button {\n      font-size: var(--text-sm);\n      line-height: var(--tw-leading, var(--text-sm--line-height));\n    }\n  }\n  .file\\:font-medium {\n    &::file-selector-button {\n      --tw-font-weight: var(--font-weight-medium);\n      font-weight: var(--font-weight-medium);\n    }\n  }\n  .placeholder\\:text-muted-foreground {\n    &::placeholder {\n      color: hsl(var(--muted-foreground));\n    }\n  }\n  .checked\\:border-primary {\n    &:checked {\n      border-color: hsl(var(--primary));\n    }\n  }\n  .checked\\:bg-primary {\n    &:checked {\n      background-color: hsl(var(--primary));\n    }\n  }\n  .hover\\:bg-accent {\n    &:hover {\n      @media (hover: hover) {\n        background-color: hsl(var(--accent));\n      }\n    }\n  }\n  .hover\\:bg-muted {\n    &:hover {\n      @media (hover: hover) {\n        background-color: hsl(var(--muted));\n      }\n    }\n  }\n  .hover\\:text-accent-foreground {\n    &:hover {\n      @media (hover: hover) {\n        color: hsl(var(--accent-foreground));\n      }\n    }\n  }\n  .hover\\:text-destructive {\n    &:hover {\n      @media (hover: hover) {\n        color: hsl(var(--destructive));\n      }\n    }\n  }\n  .hover\\:text-foreground {\n    &:hover {\n      @media (hover: hover) {\n        color: hsl(var(--foreground));\n      }\n    }\n  }\n  .hover\\:underline {\n    &:hover {\n      @media (hover: hover) {\n        text-decoration-line: underline;\n      }\n    }\n  }\n  .hover\\:opacity-100 {\n    &:hover {\n      @media (hover: hover) {\n        opacity: 100%;\n      }\n    }\n  }\n  .hover\\:shadow-md {\n    &:hover {\n      @media (hover: hover) {\n        --tw-shadow: 0 4px 6px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 2px 4px -2px var(--tw-shadow-color, rgb(0 0 0 / 0.1));\n        box-shadow:\n          var(--tw-inset-shadow),\n          var(--tw-inset-ring-shadow),\n          var(--tw-ring-offset-shadow),\n          var(--tw-ring-shadow),\n          var(--tw-shadow);\n      }\n    }\n  }\n  .group-\\[\\.destructive\\]\\:hover\\:bg-destructive {\n    &:is(:where(.group):is(.destructive) *) {\n      &:hover {\n        @media (hover: hover) {\n          background-color: hsl(var(--destructive));\n        }\n      }\n    }\n  }\n  .group-\\[\\.destructive\\]\\:hover\\:text-destructive-foreground {\n    &:is(:where(.group):is(.destructive) *) {\n      &:hover {\n        @media (hover: hover) {\n          color: hsl(var(--destructive-foreground));\n        }\n      }\n    }\n  }\n  .focus\\:bg-accent {\n    &:focus {\n      background-color: hsl(var(--accent));\n    }\n  }\n  .focus\\:text-accent-foreground {\n    &:focus {\n      color: hsl(var(--accent-foreground));\n    }\n  }\n  .focus\\:opacity-100 {\n    &:focus {\n      opacity: 100%;\n    }\n  }\n  .focus\\:ring-2 {\n    &:focus {\n      --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);\n      box-shadow:\n        var(--tw-inset-shadow),\n        var(--tw-inset-ring-shadow),\n        var(--tw-ring-offset-shadow),\n        var(--tw-ring-shadow),\n        var(--tw-shadow);\n    }\n  }\n  .focus\\:ring-ring {\n    &:focus {\n      --tw-ring-color: hsl(var(--ring));\n    }\n  }\n  .focus\\:ring-offset-2 {\n    &:focus {\n      --tw-ring-offset-width: 2px;\n      --tw-ring-offset-shadow: var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n    }\n  }\n  .focus\\:outline-none {\n    &:focus {\n      --tw-outline-style: none;\n      outline-style: none;\n    }\n  }\n  .focus-visible\\:border-primary {\n    &:focus-visible {\n      border-color: hsl(var(--primary));\n    }\n  }\n  .focus-visible\\:ring-2 {\n    &:focus-visible {\n      --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);\n      box-shadow:\n        var(--tw-inset-shadow),\n        var(--tw-inset-ring-shadow),\n        var(--tw-ring-offset-shadow),\n        var(--tw-ring-shadow),\n        var(--tw-shadow);\n    }\n  }\n  .focus-visible\\:ring-ring {\n    &:focus-visible {\n      --tw-ring-color: hsl(var(--ring));\n    }\n  }\n  .focus-visible\\:ring-offset-0 {\n    &:focus-visible {\n      --tw-ring-offset-width: 0px;\n      --tw-ring-offset-shadow: var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n    }\n  }\n  .focus-visible\\:ring-offset-2 {\n    &:focus-visible {\n      --tw-ring-offset-width: 2px;\n      --tw-ring-offset-shadow: var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n    }\n  }\n  .focus-visible\\:ring-offset-background {\n    &:focus-visible {\n      --tw-ring-offset-color: hsl(var(--background));\n    }\n  }\n  .focus-visible\\:outline-none {\n    &:focus-visible {\n      --tw-outline-style: none;\n      outline-style: none;\n    }\n  }\n  .active\\:scale-\\[0\\.98\\] {\n    &:active {\n      scale: 0.98;\n    }\n  }\n  .disabled\\:pointer-events-none {\n    &:disabled {\n      pointer-events: none;\n    }\n  }\n  .disabled\\:cursor-not-allowed {\n    &:disabled {\n      cursor: not-allowed;\n    }\n  }\n  .disabled\\:opacity-50 {\n    &:disabled {\n      opacity: 50%;\n    }\n  }\n  .data-\\[checked\\]\\:border-primary {\n    &[data-checked] {\n      border-color: hsl(var(--primary));\n    }\n  }\n  .data-\\[checked\\]\\:bg-primary {\n    &[data-checked] {\n      background-color: hsl(var(--primary));\n    }\n  }\n  .data-\\[checked\\]\\:text-primary-foreground {\n    &[data-checked] {\n      color: hsl(var(--primary-foreground));\n    }\n  }\n  .data-\\[disabled\\]\\:pointer-events-none {\n    &[data-disabled] {\n      pointer-events: none;\n    }\n  }\n  .data-\\[disabled\\]\\:opacity-50 {\n    &[data-disabled] {\n      opacity: 50%;\n    }\n  }\n  .data-\\[ending-style\\]\\:scale-95 {\n    &[data-ending-style] {\n      --tw-scale-x: 95%;\n      --tw-scale-y: 95%;\n      --tw-scale-z: 95%;\n      scale: var(--tw-scale-x) var(--tw-scale-y);\n    }\n  }\n  .data-\\[ending-style\\]\\:opacity-0 {\n    &[data-ending-style] {\n      opacity: 0%;\n    }\n  }\n  .data-\\[selected\\]\\:bg-background {\n    &[data-selected] {\n      background-color: hsl(var(--background));\n    }\n  }\n  .data-\\[selected\\]\\:text-foreground {\n    &[data-selected] {\n      color: hsl(var(--foreground));\n    }\n  }\n  .data-\\[selected\\]\\:shadow-sm {\n    &[data-selected] {\n      --tw-shadow: 0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1));\n      box-shadow:\n        var(--tw-inset-shadow),\n        var(--tw-inset-ring-shadow),\n        var(--tw-ring-offset-shadow),\n        var(--tw-ring-shadow),\n        var(--tw-shadow);\n    }\n  }\n  .data-\\[starting-style\\]\\:scale-95 {\n    &[data-starting-style] {\n      --tw-scale-x: 95%;\n      --tw-scale-y: 95%;\n      --tw-scale-z: 95%;\n      scale: var(--tw-scale-x) var(--tw-scale-y);\n    }\n  }\n  .data-\\[starting-style\\]\\:opacity-0 {\n    &[data-starting-style] {\n      opacity: 0%;\n    }\n  }\n  .data-\\[state\\=checked\\]\\:translate-x-5 {\n    &[data-state=checked] {\n      --tw-translate-x: calc(var(--spacing) * 5);\n      translate: var(--tw-translate-x) var(--tw-translate-y);\n    }\n  }\n  .data-\\[state\\=checked\\]\\:bg-primary {\n    &[data-state=checked] {\n      background-color: hsl(var(--primary));\n    }\n  }\n  .data-\\[state\\=closed\\]\\:duration-300 {\n    &[data-state=closed] {\n      --tw-duration: 300ms;\n      transition-duration: 300ms;\n    }\n  }\n  .data-\\[state\\=open\\]\\:bg-accent {\n    &[data-state=open] {\n      background-color: hsl(var(--accent));\n    }\n  }\n  .data-\\[state\\=open\\]\\:bg-secondary {\n    &[data-state=open] {\n      background-color: hsl(var(--secondary));\n    }\n  }\n  .data-\\[state\\=open\\]\\:duration-500 {\n    &[data-state=open] {\n      --tw-duration: 500ms;\n      transition-duration: 500ms;\n    }\n  }\n  .data-\\[state\\=selected\\]\\:bg-muted {\n    &[data-state=selected] {\n      background-color: hsl(var(--muted));\n    }\n  }\n  .data-\\[state\\=unchecked\\]\\:-translate-x-0 {\n    &[data-state=unchecked] {\n      --tw-translate-x: calc(var(--spacing) * -0);\n      translate: var(--tw-translate-x) var(--tw-translate-y);\n    }\n  }\n  .data-\\[swipe\\=cancel\\]\\:translate-x-0 {\n    &[data-swipe=cancel] {\n      --tw-translate-x: calc(var(--spacing) * 0);\n      translate: var(--tw-translate-x) var(--tw-translate-y);\n    }\n  }\n  .data-\\[swipe\\=end\\]\\:translate-x-\\[var\\(--radix-toast-swipe-end-x\\)\\] {\n    &[data-swipe=end] {\n      --tw-translate-x: var(--radix-toast-swipe-end-x);\n      translate: var(--tw-translate-x) var(--tw-translate-y);\n    }\n  }\n  .data-\\[swipe\\=end\\]\\:opacity-0 {\n    &[data-swipe=end] {\n      opacity: 0%;\n    }\n  }\n  .data-\\[swipe\\=move\\]\\:translate-x-\\[var\\(--radix-toast-swipe-move-x\\)\\] {\n    &[data-swipe=move] {\n      --tw-translate-x: var(--radix-toast-swipe-move-x);\n      translate: var(--tw-translate-x) var(--tw-translate-y);\n    }\n  }\n  .sm\\:flex {\n    @media (width >= 40rem) {\n      display: flex;\n    }\n  }\n  .sm\\:inline {\n    @media (width >= 40rem) {\n      display: inline;\n    }\n  }\n  .sm\\:max-w-md {\n    @media (width >= 40rem) {\n      max-width: var(--container-md);\n    }\n  }\n  .sm\\:max-w-sm {\n    @media (width >= 40rem) {\n      max-width: var(--container-sm);\n    }\n  }\n  .sm\\:flex-row {\n    @media (width >= 40rem) {\n      flex-direction: row;\n    }\n  }\n  .sm\\:items-center {\n    @media (width >= 40rem) {\n      align-items: center;\n    }\n  }\n  .sm\\:justify-between {\n    @media (width >= 40rem) {\n      justify-content: space-between;\n    }\n  }\n  .sm\\:justify-end {\n    @media (width >= 40rem) {\n      justify-content: flex-end;\n    }\n  }\n  .sm\\:gap-3 {\n    @media (width >= 40rem) {\n      gap: calc(var(--spacing) * 3);\n    }\n  }\n  .sm\\:space-x-2 {\n    @media (width >= 40rem) {\n      :where(& > :not(:last-child)) {\n        --tw-space-x-reverse: 0;\n        margin-inline-start: calc(calc(var(--spacing) * 2) * var(--tw-space-x-reverse));\n        margin-inline-end: calc(calc(var(--spacing) * 2) * calc(1 - var(--tw-space-x-reverse)));\n      }\n    }\n  }\n  .sm\\:p-0 {\n    @media (width >= 40rem) {\n      padding: calc(var(--spacing) * 0);\n    }\n  }\n  .sm\\:p-12 {\n    @media (width >= 40rem) {\n      padding: calc(var(--spacing) * 12);\n    }\n  }\n  .sm\\:text-left {\n    @media (width >= 40rem) {\n      text-align: left;\n    }\n  }\n  .md\\:col-span-2 {\n    @media (width >= 48rem) {\n      grid-column: span 2 / span 2;\n    }\n  }\n  .md\\:grid-cols-2 {\n    @media (width >= 48rem) {\n      grid-template-columns: repeat(2, minmax(0, 1fr));\n    }\n  }\n  .md\\:p-6 {\n    @media (width >= 48rem) {\n      padding: calc(var(--spacing) * 6);\n    }\n  }\n  .md\\:px-6 {\n    @media (width >= 48rem) {\n      padding-inline: calc(var(--spacing) * 6);\n    }\n  }\n  .md\\:text-xl {\n    @media (width >= 48rem) {\n      font-size: var(--text-xl);\n      line-height: var(--tw-leading, var(--text-xl--line-height));\n    }\n  }\n  .lg\\:flex {\n    @media (width >= 64rem) {\n      display: flex;\n    }\n  }\n  .lg\\:hidden {\n    @media (width >= 64rem) {\n      display: none;\n    }\n  }\n  .lg\\:flex-1 {\n    @media (width >= 64rem) {\n      flex: 1;\n    }\n  }\n  .lg\\:flex-col {\n    @media (width >= 64rem) {\n      flex-direction: column;\n    }\n  }\n  .lg\\:p-8 {\n    @media (width >= 64rem) {\n      padding: calc(var(--spacing) * 8);\n    }\n  }\n  .lg\\:text-left {\n    @media (width >= 64rem) {\n      text-align: left;\n    }\n  }\n  .xl\\:grid-cols-4 {\n    @media (width >= 80rem) {\n      grid-template-columns: repeat(4, minmax(0, 1fr));\n    }\n  }\n  .dark\\:scale-0 {\n    @media (prefers-color-scheme: dark) {\n      --tw-scale-x: 0%;\n      --tw-scale-y: 0%;\n      --tw-scale-z: 0%;\n      scale: var(--tw-scale-x) var(--tw-scale-y);\n    }\n  }\n  .dark\\:scale-100 {\n    @media (prefers-color-scheme: dark) {\n      --tw-scale-x: 100%;\n      --tw-scale-y: 100%;\n      --tw-scale-z: 100%;\n      scale: var(--tw-scale-x) var(--tw-scale-y);\n    }\n  }\n  .dark\\:-rotate-90 {\n    @media (prefers-color-scheme: dark) {\n      rotate: calc(90deg * -1);\n    }\n  }\n  .dark\\:rotate-0 {\n    @media (prefers-color-scheme: dark) {\n      rotate: 0deg;\n    }\n  }\n  .dark\\:border-blue-500\\/30 {\n    @media (prefers-color-scheme: dark) {\n      border-color: color-mix(in srgb, oklch(62.3% 0.214 259.815) 30%, transparent);\n      @supports (color: color-mix(in lab, red, red)) {\n        border-color: color-mix(in oklab, var(--color-blue-500) 30%, transparent);\n      }\n    }\n  }\n  .dark\\:bg-blue-500\\/10 {\n    @media (prefers-color-scheme: dark) {\n      background-color: color-mix(in srgb, oklch(62.3% 0.214 259.815) 10%, transparent);\n      @supports (color: color-mix(in lab, red, red)) {\n        background-color: color-mix(in oklab, var(--color-blue-500) 10%, transparent);\n      }\n    }\n  }\n  .dark\\:text-blue-200 {\n    @media (prefers-color-scheme: dark) {\n      color: var(--color-blue-200);\n    }\n  }\n  .\\[\\&_svg\\]\\:pointer-events-none {\n    & svg {\n      pointer-events: none;\n    }\n  }\n  .\\[\\&_svg\\]\\:size-4 {\n    & svg {\n      width: calc(var(--spacing) * 4);\n      height: calc(var(--spacing) * 4);\n    }\n  }\n  .\\[\\&_svg\\]\\:shrink-0 {\n    & svg {\n      flex-shrink: 0;\n    }\n  }\n  .\\[\\&_tr\\]\\:border-b {\n    & tr {\n      border-bottom-style: var(--tw-border-style);\n      border-bottom-width: 1px;\n    }\n  }\n  .\\[\\&_tr\\:last-child\\]\\:border-0 {\n    & tr:last-child {\n      border-style: var(--tw-border-style);\n      border-width: 0px;\n    }\n  }\n  .\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pr-0 {\n    &:has([role=checkbox]) {\n      padding-right: calc(var(--spacing) * 0);\n    }\n  }\n  .\\[\\&\\>tr\\]\\:last\\:border-b-0 {\n    & > tr {\n      &:last-child {\n        border-bottom-style: var(--tw-border-style);\n        border-bottom-width: 0px;\n      }\n    }\n  }\n}\n:root {\n  --background: 0 0% 100%;\n  --foreground: 222.2 84% 4.9%;\n  --muted: 210 20% 96%;\n  --muted-foreground: 215.4 16.3% 46.9%;\n  --popover: 0 0% 100%;\n  --popover-foreground: 222.2 84% 4.9%;\n  --border: 214.3 31.8% 91.4%;\n  --input: 214.3 31.8% 91.4%;\n  --card: 0 0% 100%;\n  --card-foreground: 222.2 84% 4.9%;\n  --primary: 221.2 83.2% 53.3%;\n  --primary-foreground: 210 40% 98%;\n  --secondary: 210 40% 96.1%;\n  --secondary-foreground: 222.2 47.4% 11.2%;\n  --accent: 210 40% 96.1%;\n  --accent-foreground: 222.2 47.4% 11.2%;\n  --destructive: 0 72.2% 50.6%;\n  --destructive-foreground: 210 40% 98%;\n  --ring: 221.2 83.2% 53.3%;\n  --accent-blue: 217 91% 60%;\n  --accent-blue-foreground: 210 40% 98%;\n  --accent-green: 142 76% 36%;\n  --accent-green-foreground: 210 40% 98%;\n  --accent-amber: 38 92% 50%;\n  --accent-amber-foreground: 26 83% 14%;\n  --accent-purple: 262 83% 58%;\n  --accent-purple-foreground: 210 40% 98%;\n  --success: 142 76% 36%;\n  --success-foreground: 210 40% 98%;\n  --warning: 38 92% 50%;\n  --warning-foreground: 26 83% 14%;\n  --info: 199 89% 48%;\n  --info-foreground: 210 40% 98%;\n  --sidebar: 0 0% 98%;\n  --sidebar-foreground: 222.2 84% 4.9%;\n  --sidebar-border: 214.3 31.8% 91.4%;\n  --sidebar-accent: 221.2 83.2% 53.3%;\n  --gradient-start: 221.2 83.2% 53.3%;\n  --gradient-end: 262 83% 58%;\n}\n.dark {\n  --background: 0 0% 9%;\n  --foreground: 0 0% 96%;\n  --muted: 0 0% 16%;\n  --muted-foreground: 0 0% 70%;\n  --popover: 0 0% 12%;\n  --popover-foreground: 0 0% 96%;\n  --border: 0 0% 25%;\n  --input: 0 0% 25%;\n  --card: 0 0% 12%;\n  --card-foreground: 0 0% 96%;\n  --primary: 221.2 83.2% 53.3%;\n  --primary-foreground: 0 0% 100%;\n  --secondary: 0 0% 16%;\n  --secondary-foreground: 0 0% 96%;\n  --accent: 0 0% 16%;\n  --accent-foreground: 0 0% 96%;\n  --destructive: 0 62% 30%;\n  --destructive-foreground: 0 0% 96%;\n  --ring: 221.2 83.2% 53.3%;\n  --accent-blue: 217 91% 60%;\n  --accent-blue-foreground: 0 0% 100%;\n  --accent-green: 142 71% 45%;\n  --accent-green-foreground: 0 0% 100%;\n  --accent-amber: 38 92% 50%;\n  --accent-amber-foreground: 26 83% 14%;\n  --accent-purple: 262 83% 65%;\n  --accent-purple-foreground: 0 0% 100%;\n  --success: 142 71% 45%;\n  --success-foreground: 0 0% 100%;\n  --warning: 38 92% 50%;\n  --warning-foreground: 26 83% 14%;\n  --info: 199 89% 48%;\n  --info-foreground: 0 0% 100%;\n  --sidebar: 0 0% 7%;\n  --sidebar-foreground: 0 0% 96%;\n  --sidebar-border: 0 0% 20%;\n  --sidebar-accent: 221.2 83.2% 53.3%;\n  --gradient-start: 221.2 83.2% 53.3%;\n  --gradient-end: 262 83% 65%;\n}\n@layer base {\n  * {\n    border-color: hsl(var(--border));\n  }\n  body {\n    background-color: hsl(var(--background));\n    color: hsl(var(--foreground));\n  }\n}\n.tiptap {\n  min-height: 240px;\n  outline: none;\n  white-space: pre-wrap;\n}\n.tiptap:focus {\n  outline: none;\n}\n.tiptap p {\n  margin: 0 0 1rem;\n}\n.tiptap p:last-child {\n  margin-bottom: 0;\n}\n.tiptap h2,\n.tiptap h3,\n.tiptap h4 {\n  font-weight: 600;\n  line-height: 1.2;\n  margin: 1.5rem 0 0.75rem;\n}\n.tiptap ul,\n.tiptap ol {\n  margin: 0 0 1rem;\n  padding-left: 1.25rem;\n}\n.tiptap li {\n  margin-bottom: 0.25rem;\n}\n.tiptap blockquote {\n  border-left: 2px solid hsl(var(--border));\n  color: hsl(var(--muted-foreground));\n  font-style: italic;\n  margin: 0 0 1rem;\n  padding-left: 1rem;\n}\n.tiptap pre {\n  background-color: hsl(var(--muted));\n  border-radius: 0.5rem;\n  color: hsl(var(--muted-foreground));\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    Monaco,\n    Consolas,\n    "Liberation Mono",\n    "Courier New",\n    monospace;\n  font-size: 0.875rem;\n  margin: 0 0 1rem;\n  overflow-x: auto;\n  padding: 0.75rem 1rem;\n}\n.dark .tiptap pre {\n  background-color: hsl(var(--muted) / 0.4);\n}\n.tiptap code {\n  background-color: hsl(var(--muted) / 0.4);\n  border-radius: 0.375rem;\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    Monaco,\n    Consolas,\n    "Liberation Mono",\n    "Courier New",\n    monospace;\n  font-size: 0.875rem;\n  padding: 0.125rem 0.375rem;\n}\n.tiptap pre code {\n  background-color: transparent;\n  padding: 0;\n}\n.tiptap a {\n  color: hsl(var(--primary));\n  text-decoration: underline;\n}\n.tiptap hr {\n  border: none;\n  border-top: 1px solid hsl(var(--border));\n  margin: 2rem 0;\n}\n.tiptap img {\n  border-radius: 0.5rem;\n  height: auto;\n  max-width: 100%;\n}\n.tiptap strong {\n  font-weight: 600;\n}\n@property --tw-translate-x { syntax: "*"; inherits: false; initial-value: 0; }\n@property --tw-translate-y { syntax: "*"; inherits: false; initial-value: 0; }\n@property --tw-translate-z { syntax: "*"; inherits: false; initial-value: 0; }\n@property --tw-scale-x { syntax: "*"; inherits: false; initial-value: 1; }\n@property --tw-scale-y { syntax: "*"; inherits: false; initial-value: 1; }\n@property --tw-scale-z { syntax: "*"; inherits: false; initial-value: 1; }\n@property --tw-rotate-x { syntax: "*"; inherits: false; }\n@property --tw-rotate-y { syntax: "*"; inherits: false; }\n@property --tw-rotate-z { syntax: "*"; inherits: false; }\n@property --tw-skew-x { syntax: "*"; inherits: false; }\n@property --tw-skew-y { syntax: "*"; inherits: false; }\n@property --tw-space-y-reverse { syntax: "*"; inherits: false; initial-value: 0; }\n@property --tw-space-x-reverse { syntax: "*"; inherits: false; initial-value: 0; }\n@property --tw-border-style { syntax: "*"; inherits: false; initial-value: solid; }\n@property --tw-gradient-position { syntax: "*"; inherits: false; }\n@property --tw-gradient-from { syntax: "<color>"; inherits: false; initial-value: #0000; }\n@property --tw-gradient-via { syntax: "<color>"; inherits: false; initial-value: #0000; }\n@property --tw-gradient-to { syntax: "<color>"; inherits: false; initial-value: #0000; }\n@property --tw-gradient-stops { syntax: "*"; inherits: false; }\n@property --tw-gradient-via-stops { syntax: "*"; inherits: false; }\n@property --tw-gradient-from-position { syntax: "<length-percentage>"; inherits: false; initial-value: 0%; }\n@property --tw-gradient-via-position { syntax: "<length-percentage>"; inherits: false; initial-value: 50%; }\n@property --tw-gradient-to-position { syntax: "<length-percentage>"; inherits: false; initial-value: 100%; }\n@property --tw-leading { syntax: "*"; inherits: false; }\n@property --tw-font-weight { syntax: "*"; inherits: false; }\n@property --tw-tracking { syntax: "*"; inherits: false; }\n@property --tw-shadow { syntax: "*"; inherits: false; initial-value: 0 0 #0000; }\n@property --tw-shadow-color { syntax: "*"; inherits: false; }\n@property --tw-shadow-alpha { syntax: "<percentage>"; inherits: false; initial-value: 100%; }\n@property --tw-inset-shadow { syntax: "*"; inherits: false; initial-value: 0 0 #0000; }\n@property --tw-inset-shadow-color { syntax: "*"; inherits: false; }\n@property --tw-inset-shadow-alpha { syntax: "<percentage>"; inherits: false; initial-value: 100%; }\n@property --tw-ring-color { syntax: "*"; inherits: false; }\n@property --tw-ring-shadow { syntax: "*"; inherits: false; initial-value: 0 0 #0000; }\n@property --tw-inset-ring-color { syntax: "*"; inherits: false; }\n@property --tw-inset-ring-shadow { syntax: "*"; inherits: false; initial-value: 0 0 #0000; }\n@property --tw-ring-inset { syntax: "*"; inherits: false; }\n@property --tw-ring-offset-width { syntax: "<length>"; inherits: false; initial-value: 0px; }\n@property --tw-ring-offset-color { syntax: "*"; inherits: false; initial-value: #fff; }\n@property --tw-ring-offset-shadow { syntax: "*"; inherits: false; initial-value: 0 0 #0000; }\n@property --tw-outline-style { syntax: "*"; inherits: false; initial-value: solid; }\n@property --tw-blur { syntax: "*"; inherits: false; }\n@property --tw-brightness { syntax: "*"; inherits: false; }\n@property --tw-contrast { syntax: "*"; inherits: false; }\n@property --tw-grayscale { syntax: "*"; inherits: false; }\n@property --tw-hue-rotate { syntax: "*"; inherits: false; }\n@property --tw-invert { syntax: "*"; inherits: false; }\n@property --tw-opacity { syntax: "*"; inherits: false; }\n@property --tw-saturate { syntax: "*"; inherits: false; }\n@property --tw-sepia { syntax: "*"; inherits: false; }\n@property --tw-drop-shadow { syntax: "*"; inherits: false; }\n@property --tw-drop-shadow-color { syntax: "*"; inherits: false; }\n@property --tw-drop-shadow-alpha { syntax: "<percentage>"; inherits: false; initial-value: 100%; }\n@property --tw-drop-shadow-size { syntax: "*"; inherits: false; }\n@property --tw-backdrop-blur { syntax: "*"; inherits: false; }\n@property --tw-backdrop-brightness { syntax: "*"; inherits: false; }\n@property --tw-backdrop-contrast { syntax: "*"; inherits: false; }\n@property --tw-backdrop-grayscale { syntax: "*"; inherits: false; }\n@property --tw-backdrop-hue-rotate { syntax: "*"; inherits: false; }\n@property --tw-backdrop-invert { syntax: "*"; inherits: false; }\n@property --tw-backdrop-opacity { syntax: "*"; inherits: false; }\n@property --tw-backdrop-saturate { syntax: "*"; inherits: false; }\n@property --tw-backdrop-sepia { syntax: "*"; inherits: false; }\n@property --tw-duration { syntax: "*"; inherits: false; }\n@property --tw-ease { syntax: "*"; inherits: false; }\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes scale-in {\n  from {\n    transform: scale(0.95);\n    opacity: 0;\n  }\n  to {\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n@layer properties {\n  @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))) {\n    *,\n    ::before,\n    ::after,\n    ::backdrop {\n      --tw-translate-x: 0;\n      --tw-translate-y: 0;\n      --tw-translate-z: 0;\n      --tw-scale-x: 1;\n      --tw-scale-y: 1;\n      --tw-scale-z: 1;\n      --tw-rotate-x: initial;\n      --tw-rotate-y: initial;\n      --tw-rotate-z: initial;\n      --tw-skew-x: initial;\n      --tw-skew-y: initial;\n      --tw-space-y-reverse: 0;\n      --tw-space-x-reverse: 0;\n      --tw-border-style: solid;\n      --tw-gradient-position: initial;\n      --tw-gradient-from: #0000;\n      --tw-gradient-via: #0000;\n      --tw-gradient-to: #0000;\n      --tw-gradient-stops: initial;\n      --tw-gradient-via-stops: initial;\n      --tw-gradient-from-position: 0%;\n      --tw-gradient-via-position: 50%;\n      --tw-gradient-to-position: 100%;\n      --tw-leading: initial;\n      --tw-font-weight: initial;\n      --tw-tracking: initial;\n      --tw-shadow: 0 0 #0000;\n      --tw-shadow-color: initial;\n      --tw-shadow-alpha: 100%;\n      --tw-inset-shadow: 0 0 #0000;\n      --tw-inset-shadow-color: initial;\n      --tw-inset-shadow-alpha: 100%;\n      --tw-ring-color: initial;\n      --tw-ring-shadow: 0 0 #0000;\n      --tw-inset-ring-color: initial;\n      --tw-inset-ring-shadow: 0 0 #0000;\n      --tw-ring-inset: initial;\n      --tw-ring-offset-width: 0px;\n      --tw-ring-offset-color: #fff;\n      --tw-ring-offset-shadow: 0 0 #0000;\n      --tw-outline-style: solid;\n      --tw-blur: initial;\n      --tw-brightness: initial;\n      --tw-contrast: initial;\n      --tw-grayscale: initial;\n      --tw-hue-rotate: initial;\n      --tw-invert: initial;\n      --tw-opacity: initial;\n      --tw-saturate: initial;\n      --tw-sepia: initial;\n      --tw-drop-shadow: initial;\n      --tw-drop-shadow-color: initial;\n      --tw-drop-shadow-alpha: 100%;\n      --tw-drop-shadow-size: initial;\n      --tw-backdrop-blur: initial;\n      --tw-backdrop-brightness: initial;\n      --tw-backdrop-contrast: initial;\n      --tw-backdrop-grayscale: initial;\n      --tw-backdrop-hue-rotate: initial;\n      --tw-backdrop-invert: initial;\n      --tw-backdrop-opacity: initial;\n      --tw-backdrop-saturate: initial;\n      --tw-backdrop-sepia: initial;\n      --tw-duration: initial;\n      --tw-ease: initial;\n    }\n  }\n}\n');
var STORAGE_KEY = "next-blog-cms-theme";
var ThemeContext = React__namespace.createContext({
  theme: "system",
  resolvedTheme: "light",
  setTheme: () => void 0
});
function ThemeProvider({ children, primaryColor }) {
  const [theme, setThemeState] = React__namespace.useState("system");
  const [resolvedTheme, setResolvedTheme] = React__namespace.useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );
  React__namespace.useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const initial = stored ?? "system";
    setThemeState(initial);
    setResolvedTheme(resolveTheme(initial));
  }, []);
  React__namespace.useEffect(() => {
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
  React__namespace.useEffect(() => {
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
  const setTheme = React__namespace.useCallback((nextTheme) => {
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
  const value = React__namespace.useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme
    }),
    [theme, resolvedTheme, setTheme]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(ThemeContext.Provider, { value, children });
}
function useThemeMode() {
  return React__namespace.useContext(ThemeContext);
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
  return tailwindMerge.twMerge(clsx.clsx(inputs));
}
var buttonVariants = classVarianceAuthority.cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:ring-primary",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 focus-visible:ring-destructive",
        "destructive-outline": "border border-destructive/50 text-destructive bg-transparent hover:bg-destructive/10 focus-visible:ring-destructive",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 focus-visible:ring-secondary",
        ghost: "hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
        link: "text-primary underline-offset-4 hover:underline focus-visible:ring-primary"
      },
      size: {
        xs: "h-7 rounded-md px-2 text-xs",
        sm: "h-8 rounded-md px-3 text-xs",
        default: "h-9 rounded-lg px-4",
        lg: "h-10 rounded-lg px-5",
        xl: "h-11 rounded-lg px-6 text-base",
        "icon-xs": "h-7 w-7 rounded-md",
        "icon-sm": "h-8 w-8 rounded-md",
        icon: "h-9 w-9 rounded-lg",
        "icon-lg": "h-10 w-10 rounded-lg",
        "icon-xl": "h-11 w-11 rounded-lg"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Button = React__namespace.forwardRef(
  ({ className, variant, size, asChild: _asChild = false, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
var DropdownMenu = DropdownMenuPrimitive__namespace.Root;
var DropdownMenuTrigger = DropdownMenuPrimitive__namespace.Trigger;
var DropdownMenuSubTrigger = React__namespace.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsxs(
  DropdownMenuPrimitive__namespace.SubTrigger,
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
      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRight, { className: "ml-auto h-4 w-4" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive__namespace.SubTrigger.displayName;
var DropdownMenuSubContent = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  DropdownMenuPrimitive__namespace.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive__namespace.SubContent.displayName;
var DropdownMenuContent = React__namespace.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(DropdownMenuPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
  DropdownMenuPrimitive__namespace.Content,
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
DropdownMenuContent.displayName = DropdownMenuPrimitive__namespace.Content.displayName;
var DropdownMenuItem = React__namespace.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  DropdownMenuPrimitive__namespace.Item,
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
DropdownMenuItem.displayName = DropdownMenuPrimitive__namespace.Item.displayName;
var DropdownMenuCheckboxItem = React__namespace.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsxs(
  DropdownMenuPrimitive__namespace.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(DropdownMenuPrimitive__namespace.ItemIndicator, { children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive__namespace.CheckboxItem.displayName;
var DropdownMenuRadioItem = React__namespace.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsxs(
  DropdownMenuPrimitive__namespace.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(DropdownMenuPrimitive__namespace.ItemIndicator, { children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive__namespace.RadioItem.displayName;
var DropdownMenuLabel = React__namespace.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  DropdownMenuPrimitive__namespace.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive__namespace.Label.displayName;
var DropdownMenuSeparator = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  DropdownMenuPrimitive__namespace.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive__namespace.Separator.displayName;
function ThemeToggle({ className }) {
  const { theme, resolvedTheme, setTheme } = useThemeMode();
  return /* @__PURE__ */ jsxRuntime.jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsxs(Button, { variant: "ghost", size: "icon", className: cn("h-10 w-10", className), children: [
      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Sun, { className: "h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" }),
      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Moon, { className: "absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" }),
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: "Toggle theme" })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(DropdownMenuContent, { align: "end", className: "w-40", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        DropdownMenuItem,
        {
          onClick: () => setTheme("light"),
          className: theme === "light" ? "font-semibold" : "",
          children: "Light"
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        DropdownMenuItem,
        {
          onClick: () => setTheme("dark"),
          className: theme === "dark" ? "font-semibold" : "",
          children: "Dark"
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsxs(
        DropdownMenuItem,
        {
          onClick: () => setTheme("system"),
          className: theme === "system" ? "font-semibold" : "",
          children: [
            "System (",
            resolvedTheme === "dark" ? "Dark" : "Light",
            ")"
          ]
        }
      )
    ] })
  ] });
}
var Card = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  "div",
  {
    ref,
    className: cn(
      "rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-shadow duration-200 hover:shadow-md",
      className
    ),
    ...props
  }
));
Card.displayName = "Card";
var CardHeader = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
var CardTitle = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  "h3",
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
var CardDescription = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  "p",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
var CardAction = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  "div",
  {
    ref,
    className: cn("ml-auto flex items-center gap-2", className),
    ...props
  }
));
CardAction.displayName = "CardAction";
var CardContent = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
var CardPanel = CardContent;
CardPanel.displayName = "CardPanel";
var CardFooter = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";
var inputVariants = classVarianceAuthority.cva(
  "flex w-full border border-input bg-background text-sm transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-8 rounded-md px-2.5 text-xs",
        default: "h-9 rounded-lg px-3",
        lg: "h-10 rounded-lg px-4"
      }
    },
    defaultVariants: {
      size: "default"
    }
  }
);
var Input = React__namespace.forwardRef(
  ({ className, type, size, unstyled, ...props }, ref) => {
    if (unstyled) {
      return /* @__PURE__ */ jsxRuntime.jsx(
        "input",
        {
          type,
          className,
          ref,
          ...props
        }
      );
    }
    return /* @__PURE__ */ jsxRuntime.jsx(
      "input",
      {
        type,
        className: cn(inputVariants({ size, className })),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
var Label2 = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  LabelPrimitive__namespace.Root,
  {
    ref,
    className: cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className),
    ...props
  }
));
Label2.displayName = LabelPrimitive__namespace.Root.displayName;
var Textarea = React__namespace.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
var badgeVariants = classVarianceAuthority.cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow-sm",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow-sm",
        error: "border-transparent bg-destructive text-destructive-foreground shadow-sm",
        outline: "border-border text-foreground",
        success: "border-transparent bg-success text-success-foreground shadow-sm",
        warning: "border-transparent bg-warning text-warning-foreground shadow-sm",
        info: "border-transparent bg-info text-info-foreground shadow-sm"
      },
      size: {
        sm: "px-2 py-0 text-[10px]",
        default: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Badge({ className, variant, size, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn(badgeVariants({ variant, size }), className), ...props });
}
var Table = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx("div", { className: "relative w-full overflow-auto rounded-lg", children: /* @__PURE__ */ jsxRuntime.jsx(
  "table",
  {
    ref,
    className: cn("w-full caption-bottom text-sm", className),
    ...props
  }
) }));
Table.displayName = "Table";
var TableHeader = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  "thead",
  {
    ref,
    className: cn("[&_tr]:border-b bg-muted/30", className),
    ...props
  }
));
TableHeader.displayName = "TableHeader";
var TableBody = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  "tbody",
  {
    ref,
    className: cn("[&_tr:last-child]:border-0", className),
    ...props
  }
));
TableBody.displayName = "TableBody";
var TableFooter = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  "tfoot",
  {
    ref,
    className: cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    ),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
var TableRow = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  "tr",
  {
    ref,
    className: cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    ),
    ...props
  }
));
TableRow.displayName = "TableRow";
var TableHead = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  "th",
  {
    ref,
    className: cn(
      "h-11 px-4 text-left align-middle text-xs font-semibold uppercase tracking-wider text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
var TableCell = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  "td",
  {
    ref,
    className: cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className),
    ...props
  }
));
TableCell.displayName = "TableCell";
var TableCaption = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  "caption",
  {
    ref,
    className: cn("mt-4 text-sm text-muted-foreground", className),
    ...props
  }
));
TableCaption.displayName = "TableCaption";
var Tabs = React__namespace.forwardRef(
  ({ value, onValueChange, defaultValue, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
    tabs.Tabs.Root,
    {
      ref,
      value,
      defaultValue,
      onValueChange,
      ...props
    }
  )
);
Tabs.displayName = "Tabs";
var TabsList = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  tabs.Tabs.List,
  {
    ref,
    className: cn(
      "inline-flex h-10 items-center justify-center gap-1 rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = "TabsList";
var TabsTrigger = React__namespace.forwardRef(
  ({ className, value, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
    tabs.Tabs.Tab,
    {
      ref,
      value,
      className: cn(
        "inline-flex min-w-[100px] items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[selected]:bg-background data-[selected]:text-foreground data-[selected]:shadow-sm",
        className
      ),
      ...props
    }
  )
);
TabsTrigger.displayName = "TabsTrigger";
var TabsContent = React__namespace.forwardRef(
  ({ className, value, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
    tabs.Tabs.Panel,
    {
      ref,
      value,
      keepMounted: false,
      className: cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      ),
      ...props
    }
  )
);
TabsContent.displayName = "TabsContent";
var Sheet = SheetPrimitive__namespace.Root;
var SheetPortal = SheetPrimitive__namespace.Portal;
var SheetOverlay = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  SheetPrimitive__namespace.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = SheetPrimitive__namespace.Overlay.displayName;
var sheetVariants = classVarianceAuthority.cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
var SheetContent = React__namespace.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsxRuntime.jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxRuntime.jsxs(
    SheetPrimitive__namespace.Content,
    {
      ref,
      className: cn(sheetVariants({ side }), className),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntime.jsxs(SheetPrimitive__namespace.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
SheetContent.displayName = SheetPrimitive__namespace.Content.displayName;
var SheetHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxRuntime.jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    ),
    ...props
  }
);
SheetHeader.displayName = "SheetHeader";
var SheetTitle = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  SheetPrimitive__namespace.Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = SheetPrimitive__namespace.Title.displayName;
var SheetDescription = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  SheetPrimitive__namespace.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = SheetPrimitive__namespace.Description.displayName;
var Dialog = dialog.Dialog.Root;
var DialogTrigger = React__namespace.forwardRef(
  ({ asChild, children, ...props }, ref) => {
    if (asChild && React__namespace.isValidElement(children)) {
      return /* @__PURE__ */ jsxRuntime.jsx(dialog.Dialog.Trigger, { ref, render: children, ...props });
    }
    return /* @__PURE__ */ jsxRuntime.jsx(dialog.Dialog.Trigger, { ref, ...props, children });
  }
);
DialogTrigger.displayName = "DialogTrigger";
var DialogPortal = dialog.Dialog.Portal;
var DialogClose = React__namespace.forwardRef(
  ({ asChild, children, ...props }, ref) => {
    if (asChild && React__namespace.isValidElement(children)) {
      return /* @__PURE__ */ jsxRuntime.jsx(dialog.Dialog.Close, { ref, render: children, ...props });
    }
    return /* @__PURE__ */ jsxRuntime.jsx(dialog.Dialog.Close, { ref, ...props, children });
  }
);
DialogClose.displayName = "DialogClose";
var DialogBackdrop = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  dialog.Dialog.Backdrop,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
      className
    ),
    ...props
  }
));
DialogBackdrop.displayName = "DialogBackdrop";
var DialogPopup = React__namespace.forwardRef(
  ({ className, children, showCloseButton = true, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsxs(DialogPortal, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(DialogBackdrop, {}),
    /* @__PURE__ */ jsxRuntime.jsxs(
      dialog.Dialog.Popup,
      {
        ref,
        className: cn(
          "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl border border-border bg-card p-6 shadow-lg transition-all duration-200 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntime.jsxs(DialogClose, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none", children: [
            /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] })
);
DialogPopup.displayName = "DialogPopup";
var DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxRuntime.jsx(
  "div",
  {
    className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
    ...props
  }
);
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxRuntime.jsx(
  "div",
  {
    className: cn(
      "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
      className
    ),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
var DialogTitle = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  dialog.Dialog.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = "DialogTitle";
var DialogDescription = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  dialog.Dialog.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = "DialogDescription";
var DialogPanel = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn("grid gap-4", className), ...props });
DialogPanel.displayName = "DialogPanel";
var Switch = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  SwitchPrimitives__namespace.Root,
  {
    className: cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsxRuntime.jsx(
      SwitchPrimitives__namespace.Thumb,
      {
        className: cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:-translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = SwitchPrimitives__namespace.Root.displayName;
var ToastProvider = ToastPrimitives__namespace.Provider;
var ToastViewport = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  ToastPrimitives__namespace.Viewport,
  {
    ref,
    className: cn(
      "fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col-reverse gap-2 p-4 sm:gap-3 sm:p-0",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives__namespace.Viewport.displayName;
var toastVariants = classVarianceAuthority.cva(
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
var Toast = React__namespace.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntime.jsx(
    ToastPrimitives__namespace.Root,
    {
      ref,
      className: cn(toastVariants({ variant }), className),
      ...props
    }
  );
});
Toast.displayName = ToastPrimitives__namespace.Root.displayName;
var ToastAction = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  ToastPrimitives__namespace.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives__namespace.Action.displayName;
var ToastClose = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  ToastPrimitives__namespace.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/60 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring group-hover:opacity-100 group-[.destructive]:text-destructive-foreground/70 group-[.destructive]:hover:text-destructive-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives__namespace.Close.displayName;
var ToastTitle = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(ToastPrimitives__namespace.Title, { ref, className: cn("text-sm font-semibold leading-none tracking-tight", className), ...props }));
ToastTitle.displayName = ToastPrimitives__namespace.Title.displayName;
var ToastDescription = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(ToastPrimitives__namespace.Description, { ref, className: cn("text-sm text-muted-foreground", className), ...props }));
ToastDescription.displayName = ToastPrimitives__namespace.Description.displayName;
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
  const [state, setState] = React__namespace.useState(memoryState);
  React__namespace.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntime.jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxRuntime.jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsxRuntime.jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsxRuntime.jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsxRuntime.jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsxRuntime.jsx(ToastViewport, {})
  ] });
}
var defaultTranslate = (_key, defaultMessage, params) => applyParams(defaultMessage, params);
var I18nContext = React.createContext({
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
  const translator = React.useMemo(() => {
    if (translate) {
      return translate;
    }
    return createTranslator(messages);
  }, [messages, translate]);
  React.useEffect(() => {
    setActiveTranslator(translator);
    return () => setActiveTranslator(defaultTranslate);
  }, [translator]);
  setActiveTranslator(translator);
  const value = React.useMemo(
    () => ({
      locale,
      translate: translator
    }),
    [locale, translator]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(I18nContext.Provider, { value, children });
};
function useI18n() {
  return React.useContext(I18nContext);
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
  const editor = react.useEditor({
    extensions: [
      StarterKit__default.default.configure({
        heading: {
          levels: [2, 3, 4]
        }
      }),
      Link__default.default.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: "noopener noreferrer nofollow",
          target: "_blank"
        }
      }),
      Placeholder__default.default.configure({
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
  React.useEffect(() => {
    if (!editor) return;
    const normalizedValue = value || emptyContent;
    const current = editor.isEmpty ? emptyContent : editor.getHTML();
    if (current !== normalizedValue) {
      editor.commands.setContent(normalizedValue || emptyContent, false);
    }
  }, [editor, value]);
  React.useEffect(() => {
    if (!editor) return;
    editor.setEditable(!disabled);
  }, [editor, disabled]);
  React.useEffect(() => {
    if (!editor || !onBlur) return;
    const handler = () => onBlur();
    editor.on("blur", handler);
    return () => {
      editor.off("blur", handler);
    };
  }, [editor, onBlur]);
  const toolbarButtons = React.useMemo(
    () => [
      {
        label: t("richText.bold", "Bold"),
        icon: lucideReact.Bold,
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive("bold"),
        disabled: !editor?.can().chain().focus().toggleBold().run()
      },
      {
        label: t("richText.italic", "Italic"),
        icon: lucideReact.Italic,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("italic"),
        disabled: !editor?.can().chain().focus().toggleItalic().run()
      },
      {
        label: t("richText.strikethrough", "Strikethrough"),
        icon: lucideReact.Strikethrough,
        onClick: () => editor?.chain().focus().toggleStrike().run(),
        isActive: editor?.isActive("strike"),
        disabled: !editor?.can().chain().focus().toggleStrike().run()
      },
      {
        label: t("richText.heading", "Heading"),
        icon: lucideReact.Heading2,
        onClick: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: editor?.isActive("heading", { level: 2 }),
        disabled: !editor?.can().chain().focus().toggleHeading({ level: 2 }).run()
      },
      {
        label: t("richText.bulletList", "Bullet list"),
        icon: lucideReact.List,
        onClick: () => editor?.chain().focus().toggleBulletList().run(),
        isActive: editor?.isActive("bulletList"),
        disabled: !editor?.can().chain().focus().toggleBulletList().run()
      },
      {
        label: t("richText.orderedList", "Ordered list"),
        icon: lucideReact.ListOrdered,
        onClick: () => editor?.chain().focus().toggleOrderedList().run(),
        isActive: editor?.isActive("orderedList"),
        disabled: !editor?.can().chain().focus().toggleOrderedList().run()
      },
      {
        label: t("richText.blockquote", "Quote"),
        icon: lucideReact.Quote,
        onClick: () => editor?.chain().focus().toggleBlockquote().run(),
        isActive: editor?.isActive("blockquote"),
        disabled: !editor?.can().chain().focus().toggleBlockquote().run()
      },
      {
        label: t("richText.code", "Code block"),
        icon: lucideReact.Code,
        onClick: () => editor?.chain().focus().toggleCodeBlock().run(),
        isActive: editor?.isActive("codeBlock"),
        disabled: !editor?.can().chain().focus().toggleCodeBlock().run()
      },
      {
        label: t("richText.insertLink", "Insert link"),
        icon: lucideReact.Link,
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
  const historyButtons = React.useMemo(
    () => [
      {
        label: t("richText.undo", "Undo"),
        icon: lucideReact.Undo2,
        onClick: () => editor?.chain().focus().undo().run(),
        disabled: !editor?.can().chain().focus().undo().run()
      },
      {
        label: t("richText.redo", "Redo"),
        icon: lucideReact.Redo2,
        onClick: () => editor?.chain().focus().redo().run(),
        disabled: !editor?.can().chain().focus().redo().run()
      }
    ],
    [editor, t]
  );
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("rounded-md border border-input bg-background text-sm shadow-sm", className, disabled && "opacity-70"), children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap items-center gap-2 border-b border-border bg-muted/40 p-2", children: [
      toolbarButtons.map((button) => /* @__PURE__ */ jsxRuntime.jsx(
        ToolbarButton,
        {
          ...button,
          disabled: disabled || button.disabled
        },
        button.label
      )),
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "ml-auto flex items-center gap-2", children: historyButtons.map((button) => /* @__PURE__ */ jsxRuntime.jsx(
        ToolbarButton,
        {
          ...button,
          disabled: disabled || button.disabled
        },
        button.label
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(
      react.EditorContent,
      {
        editor,
        id,
        className: cn("tiptap px-3 py-2", disabled && "pointer-events-none")
      }
    )
  ] });
}
function ToolbarButton({ label, icon: Icon, isActive, onClick, disabled }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
      children: /* @__PURE__ */ jsxRuntime.jsx(Icon, { className: "h-4 w-4" })
    }
  );
}
function DataTable({
  columns,
  data,
  emptyMessage = "Nenhum registro encontrado.",
  className
}) {
  const [sorting, setSorting] = React__namespace.useState([]);
  const table = reactTable.useReactTable({
    data,
    columns,
    state: {
      sorting
    },
    onSortingChange: setSorting,
    getCoreRowModel: reactTable.getCoreRowModel(),
    getSortedRowModel: reactTable.getSortedRowModel()
  });
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className, children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "overflow-hidden rounded-lg border bg-card", children: /* @__PURE__ */ jsxRuntime.jsxs(Table, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(TableHeader, { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsxRuntime.jsx(TableRow, { children: headerGroup.headers.map((header) => {
      return /* @__PURE__ */ jsxRuntime.jsx(TableHead, { children: header.isPlaceholder ? null : reactTable.flexRender(header.column.columnDef.header, header.getContext()) }, header.id);
    }) }, headerGroup.id)) }),
    /* @__PURE__ */ jsxRuntime.jsx(TableBody, { children: table.getRowModel().rows?.length ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsxRuntime.jsx(TableRow, { "data-state": row.getIsSelected() ? "selected" : void 0, children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsxRuntime.jsx(TableCell, { children: reactTable.flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id)) }, row.id)) : /* @__PURE__ */ jsxRuntime.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntime.jsx(TableCell, { colSpan: columns.length, className: "h-24 text-center text-sm text-muted-foreground", children: emptyMessage }) }) })
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
  return zod.z.object({
    email: zod.z.string().email(t("auth.login.validation.email", "Enter a valid email address")),
    password: zod.z.string().min(6, t("auth.login.validation.passwordMin", "Password must be at least 6 characters long")),
    remember: zod.z.boolean().optional()
  });
}
function buildSetupSchema(t) {
  return buildLoginSchema(t).extend({
    name: zod.z.string().min(1, t("auth.setup.validation.name", "Enter the name")),
    role: zod.z.literal("admin").or(zod.z.literal("author")).optional()
  });
}
var datetimeSchema = zod.z.string().optional().refine((value) => {
  if (!value) return true;
  return !Number.isNaN(Date.parse(value));
}, "Invalid datetime");
var AdminContext = React.createContext({
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
  const [routerState, setRouterState] = React.useState(
    () => typeof window === "undefined" ? { route: { type: "dashboard" }, basePath: "/blog-admin" } : parseRoute(window.location.pathname)
  );
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = () => setRouterState(parseRoute(window.location.pathname));
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);
  const navigate = React.useCallback(
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
    { route: { type: "dashboard" }, label: t("nav.dashboard", "Dashboard"), icon: lucideReact.LayoutDashboard, path: "/" },
    { route: { type: "posts-list" }, label: t("nav.posts", "Posts"), icon: lucideReact.FileText, path: "/posts" },
    {
      route: { type: "categories-list" },
      label: t("nav.categories", "Categories"),
      icon: lucideReact.FolderTree,
      path: "/categories"
    },
    { route: { type: "users-list" }, label: t("nav.users", "Users"), icon: lucideReact.UsersRound, path: "/users" },
    { route: { type: "languages" }, label: t("nav.languages", "Languages"), icon: lucideReact.Languages, path: "/languages" }
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
  return zod.z.object({
    slug: zod.z.string().min(1, t("posts.form.validation.slug", "Slug is required")),
    status: zod.z.enum(["draft", "published"]),
    categoryId: zod.z.string(),
    featuredImage: zod.z.string(),
    translations: zod.z.record(
      zod.z.object({
        title: zod.z.string().min(1, t("posts.form.validation.title", "Title is required")),
        content: zod.z.string().min(1, t("posts.form.validation.content", "Content is required")),
        excerpt: zod.z.string().optional(),
        metaTitle: zod.z.string().optional(),
        metaDescription: zod.z.string().optional()
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
  const { field } = reactHookForm.useController({
    control,
    name
  });
  return /* @__PURE__ */ jsxRuntime.jsx(
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
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex flex-1 items-center justify-center p-6", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-3 text-muted-foreground", children: [
    /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Loader2, { className: "h-4 w-4 animate-spin" }),
    /* @__PURE__ */ jsxRuntime.jsx("span", { children: t("common.loading", "Loading...") })
  ] }) });
};
var Sidebar = ({
  current,
  navigate,
  branding
}) => {
  const t = useTranslate();
  const navigationItems = React.useMemo(() => buildNavigationItems(t), [t]);
  const brandTitle = branding?.title?.trim() || t("nav.brandTitle", "Blog CMS");
  const brandTagline = branding?.tagline?.trim() || t("nav.tagline", "Multi-language content for Next.js");
  return /* @__PURE__ */ jsxRuntime.jsxs("aside", { className: "hidden w-64 flex-none border-r border-sidebar-border bg-sidebar shadow-sm lg:flex lg:flex-col", children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex h-20 items-center gap-3 border-b border-sidebar-border px-6", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex-1 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntime.jsx("p", { className: "truncate text-sm font-bold text-sidebar-foreground", children: brandTitle }),
      /* @__PURE__ */ jsxRuntime.jsx("p", { className: "truncate text-xs text-muted-foreground", children: brandTagline })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsx("nav", { className: "flex-1 space-y-1 p-4", children: navigationItems.map((item) => {
      const Icon = item.icon;
      const isActive = current.type === item.route.type;
      return /* @__PURE__ */ jsxRuntime.jsxs(
        "button",
        {
          type: "button",
          className: cn(
            "relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
            isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
          ),
          onClick: () => navigate(item.path),
          children: [
            isActive && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "absolute inset-y-0 left-0 my-auto h-6 w-1 rounded-r-full bg-primary" }),
            /* @__PURE__ */ jsxRuntime.jsx(Icon, { className: cn("h-4 w-4", isActive && "text-primary") }),
            item.label
          ]
        },
        item.label
      );
    }) }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "border-t border-sidebar-border bg-muted/30 px-6 py-3 text-xs text-muted-foreground", children: "next-blog-cms v0.1.2" })
  ] });
};
var MobileNav = ({ current, navigate }) => {
  const t = useTranslate();
  const navigationItems = React.useMemo(() => buildNavigationItems(t), [t]);
  return /* @__PURE__ */ jsxRuntime.jsx("nav", { className: "flex items-center gap-1 border-b bg-sidebar p-2 lg:hidden", children: navigationItems.map((item) => {
    const Icon = item.icon;
    const isActive = current.type === item.route.type;
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "button",
      {
        type: "button",
        className: cn(
          "relative flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-200",
          isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
        ),
        onClick: () => navigate(item.path),
        children: [
          isActive && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "absolute bottom-0 left-1/2 h-1 w-6 -translate-x-1/2 rounded-t-full bg-primary" }),
          /* @__PURE__ */ jsxRuntime.jsx(Icon, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: item.label })
        ]
      },
      item.label
    );
  }) });
};
var Header = ({ title, onLogout }) => {
  const {
    state: { user }
  } = React.useContext(AdminContext);
  const t = useTranslate();
  const userInitial = (user?.name?.[0] ?? "U").toUpperCase();
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex h-16 items-center justify-between border-b bg-card/80 px-4 py-3 backdrop-blur-sm md:px-6", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntime.jsx("h1", { className: "text-lg font-semibold md:text-xl", children: title }),
      /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground", children: t("header.subtitle", "Manage your blog content with ease") })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "hidden items-center gap-2.5 rounded-full border bg-background/50 px-3 py-1.5 text-sm shadow-sm sm:flex", children: [
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex h-7 w-7 items-center justify-center rounded-full bg-gradient-brand text-xs font-bold text-white", children: userInitial }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium text-foreground", children: user?.name ?? t("header.userDefaultName", "User") }),
        /* @__PURE__ */ jsxRuntime.jsx(Badge, { variant: "secondary", className: "text-[10px] uppercase", children: user?.role })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(ThemeToggle, {}),
      /* @__PURE__ */ jsxRuntime.jsxs(
        Button,
        {
          variant: "outline",
          onClick: onLogout,
          className: "gap-2 transition-colors hover:border-destructive/50 hover:bg-destructive/10 hover:text-destructive",
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(lucideReact.LogOut, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "hidden sm:inline", children: t("header.signOut", "Sign out") })
          ]
        }
      )
    ] })
  ] });
};
var StatsCard = ({ title, value, icon: Icon, colorClass = "bg-accent-blue" }) => /* @__PURE__ */ jsxRuntime.jsx(Card, { className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntime.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-start justify-between", children: [
  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-1", children: [
    /* @__PURE__ */ jsxRuntime.jsx(CardDescription, { children: title }),
    /* @__PURE__ */ jsxRuntime.jsx(CardTitle, { className: "text-3xl font-bold tracking-tight", children: value })
  ] }),
  Icon && /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn("rounded-xl p-2.5 shadow-sm", colorClass), children: /* @__PURE__ */ jsxRuntime.jsx(Icon, { className: "h-5 w-5 text-white" }) })
] }) }) });
var DashboardView = ({ navigate }) => {
  const t = useTranslate();
  const [loading, setLoading] = React.useState(true);
  const [posts, setPosts] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
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
  if (loading) return /* @__PURE__ */ jsxRuntime.jsx(LoadingState, {});
  const publishedCount = posts.filter((post) => post.status === "published").length;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        StatsCard,
        {
          title: t("dashboard.stats.published", "Published posts"),
          value: publishedCount,
          icon: lucideReact.FileText,
          colorClass: "bg-accent-blue"
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        StatsCard,
        {
          title: t("dashboard.stats.drafts", "Drafts"),
          value: posts.length - publishedCount,
          icon: lucideReact.FileText,
          colorClass: "bg-accent-amber"
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        StatsCard,
        {
          title: t("dashboard.stats.categories", "Categories"),
          value: categories.length,
          icon: lucideReact.FolderTree,
          colorClass: "bg-accent-green"
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        StatsCard,
        {
          title: t("dashboard.stats.users", "Users"),
          value: users.length,
          icon: lucideReact.UsersRound,
          colorClass: "bg-accent-purple"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx(CardTitle, { className: "text-base", children: t("dashboard.latestPosts.title", "Latest posts") }),
          /* @__PURE__ */ jsxRuntime.jsx(CardDescription, { children: t("dashboard.latestPosts.description", "The five most recent posts.") })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(Button, { variant: "outline", onClick: () => navigate("/posts"), children: t("dashboard.latestPosts.viewAll", "View all") })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntime.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntime.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(TableHead, { children: t("posts.table.title", "Title") }),
          /* @__PURE__ */ jsxRuntime.jsx(TableHead, { children: t("posts.table.status", "Status") }),
          /* @__PURE__ */ jsxRuntime.jsx(TableHead, { children: t("posts.table.updatedAt", "Updated at") })
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(TableBody, { children: [
          posts.slice(0, 5).map((post) => /* @__PURE__ */ jsxRuntime.jsxs(TableRow, { className: "cursor-pointer", onClick: () => navigate(`/posts/${post.id}`), children: [
            /* @__PURE__ */ jsxRuntime.jsx(TableCell, { className: "font-medium", children: post.translations[0]?.title ?? post.slug }),
            /* @__PURE__ */ jsxRuntime.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntime.jsx(Badge, { variant: post.status === "published" ? "success" : "warning", children: post.status === "published" ? t("common.status.published", "Published") : t("common.status.draft", "Draft") }) }),
            /* @__PURE__ */ jsxRuntime.jsx(TableCell, { children: formatDate(post.updatedAt) })
          ] }, post.id)),
          posts.length === 0 && /* @__PURE__ */ jsxRuntime.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntime.jsx(TableCell, { colSpan: 3, className: "text-center text-sm text-muted-foreground", children: t("dashboard.latestPosts.empty", "No posts have been published yet.") }) })
        ] })
      ] }) })
    ] })
  ] });
};
var PostListView = ({ navigate }) => {
  const t = useTranslate();
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [loading, setLoading] = React.useState(true);
  const [posts, setPosts] = React.useState([]);
  const [filterOpen, setFilterOpen] = React.useState(false);
  const filterButtons = React.useMemo(() => buildPostFilterButtons(t), [t]);
  const activeFilterCount = statusFilter !== "all" ? 1 : 0;
  const loadPosts = React.useCallback(async () => {
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
  React.useEffect(() => {
    loadPosts();
  }, [loadPosts]);
  const handleDelete = React.useCallback(
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
  const columns = React.useMemo(
    () => [
      {
        accessorKey: "title",
        header: t("posts.table.title", "Title"),
        cell: ({ row }) => /* @__PURE__ */ jsxRuntime.jsx("div", { className: "font-medium", children: row.original.translations[0]?.title ?? t("posts.table.untitled", "Untitled") })
      },
      {
        accessorKey: "slug",
        header: t("posts.table.slug", "Slug")
      },
      {
        id: "status",
        header: t("posts.table.status", "Status"),
        cell: ({ row }) => /* @__PURE__ */ jsxRuntime.jsx(Badge, { variant: row.original.status === "published" ? "success" : "warning", children: row.original.status === "published" ? t("common.status.published", "Published") : t("common.status.draft", "Draft") })
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
        cell: ({ row }) => /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex justify-end gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(Button, { variant: "outline", size: "sm", onClick: () => navigate(`/posts/${row.original.id}`), children: t("common.edit", "Edit") }),
          /* @__PURE__ */ jsxRuntime.jsx(Button, { variant: "destructive", size: "sm", onClick: () => handleDelete(row.original.id), children: t("common.remove", "Remove") })
        ] }),
        enableSorting: false
      }
    ],
    [navigate, handleDelete, t]
  );
  if (loading) return /* @__PURE__ */ jsxRuntime.jsx(LoadingState, {});
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(
          Button,
          {
            variant: "outline",
            onClick: () => setFilterOpen(true),
            className: "gap-2",
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Filter, { className: "h-4 w-4" }),
              t("posts.filters.button", "Filters"),
              activeFilterCount > 0 && /* @__PURE__ */ jsxRuntime.jsx(Badge, { variant: "default", className: "ml-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-[10px]", children: activeFilterCount })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "hidden gap-2 sm:flex", children: filterButtons.map((filter) => /* @__PURE__ */ jsxRuntime.jsx(
          Button,
          {
            variant: statusFilter === filter.value ? "default" : "outline",
            size: "sm",
            onClick: () => setStatusFilter(filter.value),
            children: filter.label
          },
          filter.value
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(Button, { onClick: () => navigate("/posts/new"), className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Plus, { className: "h-4 w-4" }),
        " ",
        t("posts.actions.new", "New post")
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(Sheet, { open: filterOpen, onOpenChange: setFilterOpen, children: /* @__PURE__ */ jsxRuntime.jsxs(SheetContent, { side: "right", className: "w-80", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(SheetHeader, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(SheetTitle, { children: t("posts.filters.title", "Filter Posts") }),
        /* @__PURE__ */ jsxRuntime.jsx(SheetDescription, { children: t("posts.filters.description", "Refine the posts list by status.") })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "mt-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(Label2, { className: "text-sm font-medium", children: t("posts.filters.statusLabel", "Status") }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex flex-col gap-2", children: filterButtons.map((filter) => /* @__PURE__ */ jsxRuntime.jsxs(
            "button",
            {
              type: "button",
              className: cn(
                "flex items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-all duration-200",
                statusFilter === filter.value ? "border-primary bg-primary/10 text-primary" : "border-border bg-background hover:bg-muted"
              ),
              onClick: () => {
                setStatusFilter(filter.value);
                setFilterOpen(false);
              },
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(
                  "div",
                  {
                    className: cn(
                      "h-4 w-4 rounded-full border-2",
                      statusFilter === filter.value ? "border-primary bg-primary" : "border-muted-foreground/50"
                    ),
                    children: statusFilter === filter.value && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex h-full items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "h-1.5 w-1.5 rounded-full bg-white" }) })
                  }
                ),
                filter.label
              ]
            },
            filter.value
          )) })
        ] }),
        statusFilter !== "all" && /* @__PURE__ */ jsxRuntime.jsx(
          Button,
          {
            variant: "outline",
            className: "w-full",
            onClick: () => {
              setStatusFilter("all");
              setFilterOpen(false);
            },
            children: t("posts.filters.clearAll", "Clear all filters")
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsx(DataTable, { columns, data: posts })
  ] });
};
var fieldClass = "space-y-2";
var PostFormView = ({ postId, navigate }) => {
  const t = useTranslate();
  const {
    state: { languages, features }
  } = React.useContext(AdminContext);
  const enabledLanguages = React.useMemo(
    () => languages.filter((language) => language.enabled),
    [languages]
  );
  const defaultLanguage = React.useMemo(
    () => enabledLanguages.find((language) => language.isDefault) ?? (enabledLanguages.length ? enabledLanguages[0] : void 0),
    [enabledLanguages]
  );
  const [loading, setLoading] = React.useState(Boolean(postId));
  const [saving, setSaving] = React.useState(false);
  const [autoTranslating, setAutoTranslating] = React.useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = React.useState(Boolean(postId));
  const [categories, setCategories] = React.useState([]);
  const [activeLanguage, setActiveLanguage] = React.useState("");
  const postFormSchema = React.useMemo(() => buildPostFormSchema(t), [t]);
  const form = reactHookForm.useForm({
    resolver: zod$1.zodResolver(postFormSchema),
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
  React.useEffect(() => {
    (async () => {
      try {
        const categoriesResponse = await fetchCategories();
        setCategories(categoriesResponse.categories);
      } catch {
        notify(t("categories.loadError", "Unable to load categories"), "destructive");
      }
    })();
  }, [t]);
  React.useEffect(() => {
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
  React.useEffect(() => {
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
  React.useEffect(() => {
    if (!defaultLanguageCode) return;
    if (slugManuallyEdited) return;
    const title = translations?.[defaultLanguageCode]?.title ?? "";
    const generatedSlug = title ? generateSlug(title) : "";
    const currentSlug = form.getValues("slug");
    if (currentSlug !== generatedSlug) {
      form.setValue("slug", generatedSlug, { shouldDirty: false, shouldTouch: false });
    }
  }, [defaultLanguageCode, slugManuallyEdited, translations, form]);
  const handleAutoTranslate = React.useCallback(async () => {
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
  if (loading) return /* @__PURE__ */ jsxRuntime.jsx(LoadingState, {});
  return /* @__PURE__ */ jsxRuntime.jsxs("form", { onSubmit, className: "grid gap-6", children: [
    /* @__PURE__ */ jsxRuntime.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(CardTitle, { children: postId ? t("posts.form.editTitle", "Edit post") : t("posts.form.newTitle", "New post") }),
        /* @__PURE__ */ jsxRuntime.jsx(CardDescription, { children: t("posts.form.description", "Configure the primary information for this post.") })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(CardContent, { className: "grid gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: fieldClass, children: [
          /* @__PURE__ */ jsxRuntime.jsx(Label2, { htmlFor: "post-slug", children: t("posts.form.slugLabel", "Slug *") }),
          /* @__PURE__ */ jsxRuntime.jsx(
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
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: fieldClass, children: [
          /* @__PURE__ */ jsxRuntime.jsx(Label2, { htmlFor: "post-status", children: t("posts.form.statusLabel", "Status") }),
          /* @__PURE__ */ jsxRuntime.jsxs(
            "select",
            {
              id: "post-status",
              className: "h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm transition-all duration-200 hover:border-muted-foreground/50 focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-0",
              ...form.register("status"),
              children: [
                /* @__PURE__ */ jsxRuntime.jsx("option", { value: "draft", children: t("common.status.draft", "Draft") }),
                /* @__PURE__ */ jsxRuntime.jsx("option", { value: "published", children: t("common.status.published", "Published") })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: fieldClass, children: [
          /* @__PURE__ */ jsxRuntime.jsx(Label2, { htmlFor: "post-category", children: t("posts.form.categoryLabel", "Category") }),
          /* @__PURE__ */ jsxRuntime.jsxs(
            "select",
            {
              id: "post-category",
              className: "h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm transition-all duration-200 hover:border-muted-foreground/50 focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-0",
              ...form.register("categoryId"),
              children: [
                /* @__PURE__ */ jsxRuntime.jsx("option", { value: "", children: t("posts.form.categoryNone", "No category") }),
                categories.map((category) => /* @__PURE__ */ jsxRuntime.jsx("option", { value: category.id, children: category.translations[0]?.name ?? category.slug }, category.id))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: fieldClass, children: [
          /* @__PURE__ */ jsxRuntime.jsx(Label2, { htmlFor: "post-featured", children: t("posts.form.featuredLabel", "Featured image (URL)") }),
          /* @__PURE__ */ jsxRuntime.jsx(Input, { id: "post-featured", ...form.register("featuredImage") })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: fieldClass, children: [
          /* @__PURE__ */ jsxRuntime.jsx(Label2, { htmlFor: "post-published-at", children: t("posts.form.publishedAtLabel", "Publication date") }),
          /* @__PURE__ */ jsxRuntime.jsx(Input, { id: "post-published-at", type: "datetime-local", ...form.register("publishedAt") })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(CardHeader, { className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx(CardTitle, { children: t("posts.form.translationsTitle", "Content by language") }),
          /* @__PURE__ */ jsxRuntime.jsx(CardDescription, { children: t("posts.form.translationsDescription", "Manage every translation for this post.") })
        ] }),
        features.aiTranslation && /* @__PURE__ */ jsxRuntime.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            className: "gap-2",
            onClick: handleAutoTranslate,
            disabled: autoTranslating,
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Wand2, { className: "h-4 w-4" }),
              autoTranslating ? t("posts.translation.loading", "Generating translations...") : t("posts.translation.button", "Auto-translate content")
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(CardContent, { children: enabledLanguages.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground", children: t(
        "posts.form.noLanguagesHint",
        "No languages available yet. Configure them in the Languages section."
      ) }) : /* @__PURE__ */ jsxRuntime.jsxs(Tabs, { value: activeLanguage, onValueChange: setActiveLanguage, className: "w-full", children: [
        /* @__PURE__ */ jsxRuntime.jsx(TabsList, { children: enabledLanguages.map((language) => /* @__PURE__ */ jsxRuntime.jsx(TabsTrigger, { value: language.code, children: language.name ? `${language.name} (${language.code.toUpperCase()})` : language.code.toUpperCase() }, language.code)) }),
        enabledLanguages.map((language) => /* @__PURE__ */ jsxRuntime.jsxs(TabsContent, { value: language.code, className: "mt-4 space-y-4", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: fieldClass, children: [
            /* @__PURE__ */ jsxRuntime.jsx(Label2, { htmlFor: `title-${language.code}`, children: t("posts.form.titleLabel", "Title *") }),
            /* @__PURE__ */ jsxRuntime.jsx(
              Input,
              {
                id: `title-${language.code}`,
                ...form.register(`translations.${language.code}.title`)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: fieldClass, children: [
            /* @__PURE__ */ jsxRuntime.jsx(Label2, { htmlFor: `content-${language.code}`, children: t("posts.form.contentLabel", "Content *") }),
            /* @__PURE__ */ jsxRuntime.jsx(
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
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: fieldClass, children: [
            /* @__PURE__ */ jsxRuntime.jsx(Label2, { htmlFor: `excerpt-${language.code}`, children: t("posts.form.excerptLabel", "Excerpt") }),
            /* @__PURE__ */ jsxRuntime.jsx(
              Textarea,
              {
                id: `excerpt-${language.code}`,
                ...form.register(`translations.${language.code}.excerpt`)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: fieldClass, children: [
              /* @__PURE__ */ jsxRuntime.jsx(Label2, { htmlFor: `meta-title-${language.code}`, children: t("posts.form.metaTitleLabel", "Meta title") }),
              /* @__PURE__ */ jsxRuntime.jsx(
                Input,
                {
                  id: `meta-title-${language.code}`,
                  ...form.register(`translations.${language.code}.metaTitle`)
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: fieldClass, children: [
              /* @__PURE__ */ jsxRuntime.jsx(Label2, { htmlFor: `meta-description-${language.code}`, children: t("posts.form.metaDescriptionLabel", "Meta description") }),
              /* @__PURE__ */ jsxRuntime.jsx(
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
      /* @__PURE__ */ jsxRuntime.jsxs(CardFooter, { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntime.jsx(Button, { type: "button", variant: "outline", onClick: () => navigate("/posts"), children: t("common.cancel", "Cancel") }),
        /* @__PURE__ */ jsxRuntime.jsx(Button, { type: "submit", disabled: saving, children: saving ? t("common.saving", "Saving...") : postId ? t("posts.form.updateAction", "Update post") : t("posts.form.publishAction", "Publish post") })
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
  } = React.useContext(AdminContext);
  const t = useTranslate();
  const enabledLanguages = React.useMemo(
    () => languages.filter((language) => language.enabled),
    [languages]
  );
  const defaultLanguage = React.useMemo(
    () => enabledLanguages.find((language) => language.isDefault) ?? enabledLanguages[0] ?? languages[0],
    [enabledLanguages, languages]
  );
  const defaultLanguageCode = defaultLanguage?.code;
  const [translations, setTranslations] = React.useState({});
  const [activeLanguage, setActiveLanguage] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = React.useState(Boolean(categoryId));
  const [loading, setLoading] = React.useState(Boolean(categoryId));
  const [saving, setSaving] = React.useState(false);
  const [autoTranslating, setAutoTranslating] = React.useState(false);
  React.useEffect(() => {
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
  React.useEffect(() => {
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
  React.useEffect(() => {
    if (!defaultLanguageCode) return;
    if (slugManuallyEdited) return;
    const sourceName = translations[defaultLanguageCode]?.name?.trim() ?? "";
    const generated = sourceName ? generateSlug(sourceName) : "";
    if (slug !== generated) {
      setSlug(generated);
    }
  }, [defaultLanguageCode, translations, slugManuallyEdited, slug]);
  const handleAutoTranslate = React.useCallback(async () => {
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
  if (loading) return /* @__PURE__ */ jsxRuntime.jsx(LoadingState, {});
  return /* @__PURE__ */ jsxRuntime.jsx("form", { onSubmit: handleSubmit, className: "grid gap-6", children: /* @__PURE__ */ jsxRuntime.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(CardHeader, { className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntime.jsx(CardTitle, { children: categoryId ? t("categories.form.editTitle", "Edit category") : t("categories.form.newTitle", "New category") }),
        /* @__PURE__ */ jsxRuntime.jsx(CardDescription, { children: t("categories.form.description", "Organize the blog categories.") })
      ] }),
      features.aiTranslation && enabledLanguages.length > 1 && /* @__PURE__ */ jsxRuntime.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "gap-2",
          onClick: handleAutoTranslate,
          disabled: autoTranslating,
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Wand2, { className: "h-4 w-4" }),
            autoTranslating ? t("categories.translation.loading", "Translating...") : t("categories.translation.button", "Auto-translate names")
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(CardContent, { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: fieldClass, children: [
        /* @__PURE__ */ jsxRuntime.jsx(Label2, { htmlFor: "category-slug", children: "Slug *" }),
        /* @__PURE__ */ jsxRuntime.jsx(
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
      /* @__PURE__ */ jsxRuntime.jsxs(Tabs, { value: activeLanguage, onValueChange: setActiveLanguage, children: [
        /* @__PURE__ */ jsxRuntime.jsx(TabsList, { children: languages.map((language) => /* @__PURE__ */ jsxRuntime.jsx(TabsTrigger, { value: language.code, children: language.code.toUpperCase() }, language.code)) }),
        languages.map((language) => /* @__PURE__ */ jsxRuntime.jsx(TabsContent, { value: language.code, className: "space-y-4", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: fieldClass, children: [
          /* @__PURE__ */ jsxRuntime.jsxs(Label2, { htmlFor: `category-name-${language.code}`, children: [
            t("categories.form.nameLabel", "Name"),
            " (",
            language.code.toUpperCase(),
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(
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
    /* @__PURE__ */ jsxRuntime.jsxs(CardFooter, { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ jsxRuntime.jsx(Button, { type: "button", variant: "outline", onClick: () => navigate("/categories"), children: t("common.cancel", "Cancel") }),
      /* @__PURE__ */ jsxRuntime.jsx(Button, { type: "submit", disabled: saving, children: saving ? t("common.saving", "Saving...") : categoryId ? t("categories.form.updateAction", "Update category") : t("categories.form.createAction", "Create category") })
    ] })
  ] }) });
};
var CategoryListView = ({ navigate }) => {
  const t = useTranslate();
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const loadCategories = React.useCallback(async () => {
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
  React.useEffect(() => {
    loadCategories();
  }, [loadCategories]);
  const handleDelete = React.useCallback(
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
  const columns = React.useMemo(
    () => [
      {
        accessorKey: "slug",
        header: t("categories.table.slug", "Slug"),
        cell: ({ row }) => /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: row.original.slug })
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
        cell: ({ row }) => /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex justify-end gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(Button, { variant: "outline", size: "sm", onClick: () => navigate(`/categories/${row.original.id}`), children: t("common.edit", "Edit") }),
          /* @__PURE__ */ jsxRuntime.jsx(Button, { variant: "destructive", size: "sm", onClick: () => handleDelete(row.original.id), children: t("common.remove", "Remove") })
        ] }),
        enableSorting: false
      }
    ],
    [navigate, handleDelete, t]
  );
  if (loading) return /* @__PURE__ */ jsxRuntime.jsx(LoadingState, {});
  const tableData = categories.map((category) => ({
    ...category,
    defaultName: category.translations[0]?.name ?? "\u2014"
  }));
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntime.jsx("h2", { className: "text-lg font-semibold", children: t("categories.title", "Categories") }),
        /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground", children: t("categories.subtitle", "Manage how your content is grouped.") })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(Button, { onClick: () => navigate("/categories/new"), className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Plus, { className: "h-4 w-4" }),
        " ",
        t("categories.actions.new", "New category")
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(DataTable, { columns, data: tableData })
  ] });
};
var UsersView = ({ navigate }) => {
  const t = useTranslate();
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const loadUsers = React.useCallback(async () => {
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
  React.useEffect(() => {
    loadUsers();
  }, [loadUsers]);
  const handleDelete = React.useCallback(
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
  const columns = React.useMemo(
    () => [
      {
        accessorKey: "name",
        header: t("users.table.name", "Name"),
        cell: ({ row }) => /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: row.original.name })
      },
      {
        accessorKey: "email",
        header: t("users.table.email", "Email")
      },
      {
        accessorKey: "role",
        header: t("users.table.role", "Role"),
        cell: ({ row }) => /* @__PURE__ */ jsxRuntime.jsx(Badge, { variant: row.original.role === "admin" ? "default" : "secondary", children: row.original.role === "admin" ? t("users.roles.admin", "Admin") : t("users.roles.author", "Author") })
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
        cell: ({ row }) => /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex justify-end gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(Button, { variant: "outline", size: "sm", onClick: () => navigate(`/users/${row.original.id}`), children: t("common.edit", "Edit") }),
          /* @__PURE__ */ jsxRuntime.jsx(Button, { variant: "destructive", size: "sm", onClick: () => handleDelete(row.original.id), children: t("common.remove", "Remove") })
        ] }),
        enableSorting: false
      }
    ],
    [navigate, handleDelete, t]
  );
  if (loading) return /* @__PURE__ */ jsxRuntime.jsx(LoadingState, {});
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntime.jsx("h2", { className: "text-lg font-semibold", children: t("users.title", "Blog users") }),
        /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground", children: t("users.subtitle", "Control who can access the admin area.") })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(Button, { onClick: () => navigate("/users/new"), className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Plus, { className: "h-4 w-4" }),
        " ",
        t("users.actions.new", "New user")
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(DataTable, { columns, data: users })
  ] });
};
var UserFormView = ({ userId, navigate }) => {
  const t = useTranslate();
  const [loading, setLoading] = React.useState(Boolean(userId));
  const [saving, setSaving] = React.useState(false);
  const form = reactHookForm.useForm({
    resolver: zod$1.zodResolver(
      zod.z.object({
        name: zod.z.string().min(1),
        email: zod.z.string().email(),
        password: zod.z.string().optional(),
        role: zod.z.enum(["admin", "author"])
      })
    ),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "author"
    }
  });
  React.useEffect(() => {
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
  if (loading) return /* @__PURE__ */ jsxRuntime.jsx(LoadingState, {});
  return /* @__PURE__ */ jsxRuntime.jsx("form", { onSubmit, className: "space-y-6", children: /* @__PURE__ */ jsxRuntime.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(CardTitle, { children: userId ? t("users.form.editTitle", "Edit user") : t("users.form.newTitle", "New user") }),
      /* @__PURE__ */ jsxRuntime.jsx(CardDescription, { children: t("users.form.description", "Define who can access the admin area.") })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(CardContent, { className: "grid gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: fieldClass, children: [
        /* @__PURE__ */ jsxRuntime.jsx(Label2, { htmlFor: "user-name", children: t("users.form.nameLabel", "Name") }),
        /* @__PURE__ */ jsxRuntime.jsx(Input, { id: "user-name", ...form.register("name") })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: fieldClass, children: [
        /* @__PURE__ */ jsxRuntime.jsx(Label2, { htmlFor: "user-email", children: t("users.form.emailLabel", "Email") }),
        /* @__PURE__ */ jsxRuntime.jsx(Input, { id: "user-email", type: "email", ...form.register("email") })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: fieldClass, children: [
        /* @__PURE__ */ jsxRuntime.jsx(Label2, { htmlFor: "user-password", children: userId ? t("users.form.newPasswordLabel", "New password (optional)") : t("users.form.passwordLabel", "Password") }),
        /* @__PURE__ */ jsxRuntime.jsx(Input, { id: "user-password", type: "password", ...form.register("password") })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: fieldClass, children: [
        /* @__PURE__ */ jsxRuntime.jsx(Label2, { htmlFor: "user-role", children: t("users.form.roleLabel", "Role") }),
        /* @__PURE__ */ jsxRuntime.jsxs(
          "select",
          {
            id: "user-role",
            className: "h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm transition-all duration-200 hover:border-muted-foreground/50 focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-0",
            ...form.register("role"),
            children: [
              /* @__PURE__ */ jsxRuntime.jsx("option", { value: "admin", children: t("users.roles.admin", "Admin") }),
              /* @__PURE__ */ jsxRuntime.jsx("option", { value: "author", children: t("users.roles.author", "Author") })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "md:col-span-2 rounded-md border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-200", children: t(
        "users.form.rolesHint",
        "Authors can edit only their own posts. Admins manage everything."
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(CardFooter, { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ jsxRuntime.jsx(Button, { type: "button", variant: "outline", onClick: () => navigate("/users"), children: t("common.cancel", "Cancel") }),
      /* @__PURE__ */ jsxRuntime.jsx(Button, { type: "submit", disabled: saving, children: saving ? t("common.saving", "Saving...") : userId ? t("users.form.updateAction", "Update user") : t("users.form.createAction", "Create user") })
    ] })
  ] }) });
};
var LanguagesView = ({ refreshLanguages }) => {
  const {
    state: { languages }
  } = React.useContext(AdminContext);
  const t = useTranslate();
  const [form, setForm] = React.useState({ code: "", name: "" });
  const [loading, setLoading] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
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
      setDialogOpen(false);
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
  const handleToggle = React.useCallback(
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
  const handleDelete = React.useCallback(
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
  const columns = React.useMemo(
    () => [
      {
        accessorKey: "code",
        header: t("languages.table.code", "Code"),
        cell: ({ row }) => /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "inline-flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold uppercase text-primary", children: row.original.code }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: row.original.name })
        ] })
      },
      {
        id: "isDefault",
        header: t("languages.table.default", "Default"),
        cell: ({ row }) => /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center gap-2", children: row.original.isDefault ? /* @__PURE__ */ jsxRuntime.jsx(Badge, { variant: "default", children: t("languages.badges.default", "Default") }) : /* @__PURE__ */ jsxRuntime.jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => handleToggle(row.original, "isDefault"),
            children: t("languages.actions.setDefault", "Set as default")
          }
        ) }),
        enableSorting: false
      },
      {
        id: "enabled",
        header: t("languages.table.enabled", "Enabled"),
        cell: ({ row }) => /* @__PURE__ */ jsxRuntime.jsx(
          Switch,
          {
            checked: row.original.enabled,
            onCheckedChange: () => handleToggle(row.original, "enabled")
          }
        ),
        enableSorting: false
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntime.jsx(
          Button,
          {
            variant: "destructive-outline",
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
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxRuntime.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntime.jsx(CardTitle, { children: t("languages.title", "Languages") }),
        /* @__PURE__ */ jsxRuntime.jsx(CardDescription, { children: t("languages.description", "Manage available languages for your blog content.") })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: [
        /* @__PURE__ */ jsxRuntime.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsxs(Button, { className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Plus, { className: "h-4 w-4" }),
          t("languages.actions.add", "Add Language")
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(DialogPopup, { className: "sm:max-w-md", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(DialogTitle, { children: t("languages.form.title", "Add new language") }),
            /* @__PURE__ */ jsxRuntime.jsx(DialogDescription, { children: t("languages.form.description", "Enter the language code and display name.") })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("form", { onSubmit: handleSubmit, children: [
            /* @__PURE__ */ jsxRuntime.jsxs(DialogPanel, { className: "grid gap-4 py-4", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: fieldClass, children: [
                /* @__PURE__ */ jsxRuntime.jsx(Label2, { htmlFor: "language-code", children: t("languages.form.codeLabel", "Language code") }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  Input,
                  {
                    id: "language-code",
                    placeholder: "pt, en, es...",
                    value: form.code,
                    onChange: (event) => setForm((prev) => ({ ...prev, code: event.target.value }))
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-muted-foreground", children: t("languages.form.codeHint", "Use ISO 639-1 codes (2-5 letters)") })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: fieldClass, children: [
                /* @__PURE__ */ jsxRuntime.jsx(Label2, { htmlFor: "language-name", children: t("languages.form.nameLabel", "Display name") }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  Input,
                  {
                    id: "language-name",
                    placeholder: "Portugu\xEAs, English...",
                    value: form.name,
                    onChange: (event) => setForm((prev) => ({ ...prev, name: event.target.value }))
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs(DialogFooter, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(DialogClose, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(Button, { type: "button", variant: "outline", children: t("common.cancel", "Cancel") }) }),
              /* @__PURE__ */ jsxRuntime.jsx(Button, { type: "submit", disabled: loading, children: loading ? t("common.saving", "Saving...") : t("languages.form.addAction", "Add language") })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntime.jsx(DataTable, { columns, data: languages }) })
  ] }) });
};
var RouteView = ({ route, navigate }) => {
  const { refreshLanguages } = React.useContext(AdminContext);
  switch (route.type) {
    case "dashboard":
      return /* @__PURE__ */ jsxRuntime.jsx(DashboardView, { navigate });
    case "posts-list":
      return /* @__PURE__ */ jsxRuntime.jsx(PostListView, { navigate });
    case "posts-create":
      return /* @__PURE__ */ jsxRuntime.jsx(PostFormView, { navigate });
    case "posts-edit":
      return /* @__PURE__ */ jsxRuntime.jsx(PostFormView, { postId: route.id, navigate });
    case "categories-list":
      return /* @__PURE__ */ jsxRuntime.jsx(CategoryListView, { navigate });
    case "categories-create":
      return /* @__PURE__ */ jsxRuntime.jsx(CategoryFormView, { navigate });
    case "categories-edit":
      return /* @__PURE__ */ jsxRuntime.jsx(CategoryFormView, { categoryId: route.id, navigate });
    case "users-list":
      return /* @__PURE__ */ jsxRuntime.jsx(UsersView, { navigate });
    case "users-create":
      return /* @__PURE__ */ jsxRuntime.jsx(UserFormView, { navigate });
    case "users-edit":
      return /* @__PURE__ */ jsxRuntime.jsx(UserFormView, { userId: route.id, navigate });
    case "languages":
      return /* @__PURE__ */ jsxRuntime.jsx(LanguagesView, { refreshLanguages });
    default:
      return /* @__PURE__ */ jsxRuntime.jsx(DashboardView, { navigate });
  }
};
var AuthBrandPanel = ({ title, tagline }) => {
  const t = useTranslate();
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "hidden lg:flex lg:flex-1 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900", children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "absolute inset-0 opacity-10", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "absolute inset-0", style: {
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
    } }) }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative z-10 flex flex-col justify-between p-12 text-white", children: [
      /* @__PURE__ */ jsxRuntime.jsx("div", { children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center gap-3 mb-4", children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-2xl font-bold tracking-tight", children: title }) }) }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntime.jsx("blockquote", { className: "text-xl font-medium leading-relaxed opacity-90", children: t("auth.brand.quote", '"Manage your content with elegance and simplicity."') }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "h-px flex-1 bg-white/20" }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-sm opacity-70", children: tagline || t("auth.brand.tagline", "Your content, your way") }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "h-px flex-1 bg-white/20" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-sm opacity-60", children: [
        "All rights reserved \xA9 ",
        (/* @__PURE__ */ new Date()).getFullYear()
      ] })
    ] })
  ] });
};
var AuthFormContainer = ({ title, children }) => /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex flex-1 flex-col items-center justify-center bg-background p-6 sm:p-12", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "w-full max-w-md space-y-8 animate-scale-in", children: [
  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex lg:hidden items-center justify-center gap-3 mb-8", children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.BookOpen, { className: "h-5 w-5" }) }),
    /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-xl font-bold", children: title })
  ] }),
  children
] }) });
var AuthView = ({
  mode,
  onSwitchMode,
  onSuccess,
  branding
}) => {
  const t = useTranslate();
  const setupSchema = React.useMemo(() => buildSetupSchema(t), [t]);
  const loginSchema = React.useMemo(() => buildLoginSchema(t), [t]);
  const setupForm = reactHookForm.useForm({
    resolver: zod$1.zodResolver(setupSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      remember: true,
      role: "admin"
    }
  });
  const loginForm = reactHookForm.useForm({
    resolver: zod$1.zodResolver(loginSchema),
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
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-1 min-h-screen", children: [
      /* @__PURE__ */ jsxRuntime.jsx(AuthBrandPanel, { title: branding.title, tagline: branding.tagline }),
      /* @__PURE__ */ jsxRuntime.jsxs(AuthFormContainer, { title: branding.title, children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2 text-center lg:text-left", children: [
          /* @__PURE__ */ jsxRuntime.jsx("h1", { className: "text-2xl font-bold tracking-tight", children: t("auth.setup.title", "Create the first admin user") }),
          /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-muted-foreground", children: t("auth.setup.subtitle", "Provide the initial administrator credentials.") })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("form", { className: "space-y-5", onSubmit: handleSetupSubmit, children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: fieldClass, children: [
            /* @__PURE__ */ jsxRuntime.jsx(Label2, { htmlFor: "setup-name", children: t("auth.setup.nameLabel", "Name") }),
            /* @__PURE__ */ jsxRuntime.jsx(
              Input,
              {
                id: "setup-name",
                placeholder: t("auth.setup.namePlaceholder", "John Doe"),
                ...setupForm.register("name")
              }
            ),
            setupForm.formState.errors.name && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-destructive", children: setupForm.formState.errors.name.message })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: fieldClass, children: [
            /* @__PURE__ */ jsxRuntime.jsx(Label2, { htmlFor: "setup-email", children: t("auth.setup.emailLabel", "Email") }),
            /* @__PURE__ */ jsxRuntime.jsx(
              Input,
              {
                id: "setup-email",
                type: "email",
                placeholder: t("auth.setup.emailPlaceholder", "admin@example.com"),
                ...setupForm.register("email")
              }
            ),
            setupForm.formState.errors.email && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-destructive", children: setupForm.formState.errors.email.message })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: fieldClass, children: [
            /* @__PURE__ */ jsxRuntime.jsx(Label2, { htmlFor: "setup-password", children: t("auth.setup.passwordLabel", "Password") }),
            /* @__PURE__ */ jsxRuntime.jsx(
              Input,
              {
                id: "setup-password",
                type: "password",
                placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
                ...setupForm.register("password")
              }
            ),
            setupForm.formState.errors.password && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-destructive", children: setupForm.formState.errors.password.message })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(Button, { type: "submit", size: "lg", className: "w-full", disabled: setupForm.formState.isSubmitting, children: setupForm.formState.isSubmitting ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Loader2, { className: "h-4 w-4 animate-spin" }),
            t("common.saving", "Saving...")
          ] }) : t("auth.setup.submit", "Create user") })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntime.jsx(Button, { variant: "ghost", onClick: () => onSwitchMode("login"), children: t("auth.setup.switchToLogin", "I already have a user") }) })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-1 min-h-screen", children: [
    /* @__PURE__ */ jsxRuntime.jsx(AuthBrandPanel, { title: branding.title, tagline: branding.tagline }),
    /* @__PURE__ */ jsxRuntime.jsxs(AuthFormContainer, { title: branding.title, children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2 text-center lg:text-left", children: [
        /* @__PURE__ */ jsxRuntime.jsx("h1", { className: "text-2xl font-bold tracking-tight", children: t("auth.login.title", "Welcome back") }),
        /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-muted-foreground", children: t("auth.login.subtitle", "Enter your credentials to access the admin panel.") })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("form", { className: "space-y-5", onSubmit: handleLoginSubmit, children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: fieldClass, children: [
          /* @__PURE__ */ jsxRuntime.jsx(Label2, { htmlFor: "login-email", children: t("auth.login.emailLabel", "Email") }),
          /* @__PURE__ */ jsxRuntime.jsx(
            Input,
            {
              id: "login-email",
              type: "email",
              placeholder: t("auth.login.emailPlaceholder", "you@example.com"),
              ...loginForm.register("email")
            }
          ),
          loginForm.formState.errors.email && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-destructive", children: loginForm.formState.errors.email.message })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: fieldClass, children: [
          /* @__PURE__ */ jsxRuntime.jsx(Label2, { htmlFor: "login-password", children: t("auth.login.passwordLabel", "Password") }),
          /* @__PURE__ */ jsxRuntime.jsx(
            Input,
            {
              id: "login-password",
              type: "password",
              placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
              ...loginForm.register("password")
            }
          ),
          loginForm.formState.errors.password && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-destructive", children: loginForm.formState.errors.password.message })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            "input",
            {
              id: "remember",
              type: "checkbox",
              className: "h-4 w-4 rounded border border-input bg-background text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 checked:bg-primary checked:border-primary",
              ...loginForm.register("remember")
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(Label2, { htmlFor: "remember", className: "text-sm text-muted-foreground cursor-pointer", children: t("auth.login.rememberMe", "Keep me signed in") })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(Button, { type: "submit", size: "lg", className: "w-full", disabled: loginForm.formState.isSubmitting, children: loginForm.formState.isSubmitting ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Loader2, { className: "h-4 w-4 animate-spin" }),
          t("auth.login.submitting", "Signing in...")
        ] }) : t("auth.login.submit", "Sign in") })
      ] })
    ] })
  ] });
};
var AdminShell = ({ branding }) => {
  const t = useTranslate();
  const router = useAdminRouter();
  const [authState, setAuthState] = React.useState("loading");
  const [authUser, setAuthUser] = React.useState(null);
  const [languages, setLanguages] = React.useState([]);
  const [themeColor, setThemeColor] = React.useState();
  const [features, setFeatures] = React.useState({ aiTranslation: false });
  const resolvedBranding = React.useMemo(
    () => ({
      title: branding?.title?.trim() || t("nav.brandTitle", "Blog CMS"),
      tagline: branding?.tagline?.trim() || t("nav.tagline", "Multi-language content for Next.js")
    }),
    [branding?.title, branding?.tagline, t]
  );
  const refreshLanguages = React.useCallback(async () => {
    try {
      const response = await fetchLanguages();
      setLanguages(response);
    } catch {
      notify(t("languages.loadError", "Unable to load languages"), "destructive");
    }
  }, [t]);
  React.useEffect(() => {
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
  React.useEffect(() => {
    if (authState === "ready") refreshLanguages();
  }, [authState, refreshLanguages]);
  const handleAuthSuccess = React.useCallback(
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
  const adminContextValue = React.useMemo(
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
    content = /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex min-h-screen items-center justify-center bg-gradient-subtle", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand shadow-lg", children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.BookOpen, { className: "h-6 w-6 text-white" }) }),
      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Loader2, { className: "h-5 w-5 animate-spin text-primary" })
    ] }) });
  } else if (authState === "setup" || authState === "login") {
    content = /* @__PURE__ */ jsxRuntime.jsx(AuthView, { mode: authState, onSwitchMode: setAuthState, onSuccess: handleAuthSuccess, branding: resolvedBranding });
  } else {
    content = /* @__PURE__ */ jsxRuntime.jsx(AdminContext.Provider, { value: adminContextValue, children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex min-h-screen bg-background text-foreground", children: [
      /* @__PURE__ */ jsxRuntime.jsx(Sidebar, { current: router.route, navigate: router.navigate, branding: resolvedBranding }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-1 flex-col", children: [
        /* @__PURE__ */ jsxRuntime.jsx(MobileNav, { current: router.route, navigate: router.navigate }),
        /* @__PURE__ */ jsxRuntime.jsx(Header, { title: resolveTitle(router.route), onLogout: handleLogout }),
        /* @__PURE__ */ jsxRuntime.jsx("main", { className: "flex-1 overflow-y-auto bg-gradient-to-br from-background via-background to-muted/30 p-4 md:p-6 lg:p-8", children: /* @__PURE__ */ jsxRuntime.jsx(RouteView, { route: router.route, navigate: router.navigate }) })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(ThemeProvider, { primaryColor: themeColor, children: [
    content,
    /* @__PURE__ */ jsxRuntime.jsx(Toaster, {})
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
  return /* @__PURE__ */ jsxRuntime.jsx(AdminShell, { branding });
}
var BlogAdmin = ({ locale, messages, translate, branding }) => /* @__PURE__ */ jsxRuntime.jsx(I18nProvider, { locale, messages, translate, children: /* @__PURE__ */ jsxRuntime.jsx(AdminApp, { branding }) });
var BlogAdminPage = (props) => /* @__PURE__ */ jsxRuntime.jsx(BlogAdmin, { ...props });
var admin_default = BlogAdmin;

exports.BlogAdmin = BlogAdmin;
exports.BlogAdminPage = BlogAdminPage;
exports.default = admin_default;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map