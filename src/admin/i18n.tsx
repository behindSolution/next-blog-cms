import { createContext, useContext, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';

export type TranslateParams = Record<string, string | number>;

export type TranslateFn = (key: string, defaultMessage: string, params?: TranslateParams) => string;

interface I18nContextValue {
  locale: string;
  translate: TranslateFn;
}

const defaultTranslate: TranslateFn = (_key, defaultMessage, params) =>
  applyParams(defaultMessage, params);

const I18nContext = createContext<I18nContextValue>({
  locale: 'en',
  translate: defaultTranslate
});

let activeTranslator: TranslateFn = defaultTranslate;

function setActiveTranslator(translator: TranslateFn) {
  activeTranslator = translator;
}

export interface I18nProviderProps {
  locale?: string;
  messages?: Record<string, string>;
  translate?: TranslateFn;
  children: ReactNode;
}

export const I18nProvider = ({
  locale = 'en',
  messages,
  translate,
  children
}: I18nProviderProps) => {
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

  // Ensure synchronous consumers also see the translator on initial render (useful for SSR).
  setActiveTranslator(translator);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      translate: translator
    }),
    [locale, translator]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export function useI18n() {
  return useContext(I18nContext);
}

export function useTranslate(): TranslateFn {
  const { translate } = useI18n();
  return translate;
}

export function translateInstant(
  key: string,
  defaultMessage: string,
  params?: TranslateParams
): string {
  return activeTranslator(key, defaultMessage, params);
}

function createTranslator(messages?: Record<string, string>): TranslateFn {
  return (key, defaultMessage, params) => {
    const template = messages?.[key] ?? defaultMessage;
    return applyParams(template, params);
  };
}

function applyParams(template: string, params?: TranslateParams): string {
  if (!params) {
    return template;
  }

  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, token) => {
    const value = params[token];
    return typeof value === 'undefined' ? match : String(value);
  });
}

