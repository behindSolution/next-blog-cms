'use client';

import * as React from 'react';

export type ThemePreference = 'light' | 'dark' | 'system';

interface ThemeProviderProps {
  children: React.ReactNode;
  primaryColor?: string;
}

interface ThemeContextValue {
  theme: ThemePreference;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: ThemePreference) => void;
}

const STORAGE_KEY = 'next-blog-cms-theme';

const ThemeContext = React.createContext<ThemeContextValue>({
  theme: 'system',
  resolvedTheme: 'light',
  setTheme: () => undefined
});

export function ThemeProvider({ children, primaryColor }: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<ThemePreference>('system');
  const [resolvedTheme, setResolvedTheme] = React.useState<'light' | 'dark'>(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem(STORAGE_KEY) as ThemePreference | null;
    const initial = stored ?? 'system';
    setThemeState(initial);
    setResolvedTheme(resolveTheme(initial));
  }, []);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    if (theme === 'system') {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (event: MediaQueryListEvent) => setResolvedTheme(event.matches ? 'dark' : 'light');
      setResolvedTheme(media.matches ? 'dark' : 'light');
      media.addEventListener('change', handleChange);
      return () => media.removeEventListener('change', handleChange);
    }

    setResolvedTheme(theme);
  }, [theme]);

  React.useEffect(() => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    root.classList.toggle('dark', resolvedTheme === 'dark');
    root.style.colorScheme = resolvedTheme;

    if (primaryColor && resolvedTheme === 'light') {
      const parsed = parseColor(primaryColor);
      if (parsed) {
        root.style.setProperty('--primary', parsed);
        root.style.setProperty('--ring', parsed);
        return;
      }
    }

    root.style.removeProperty('--primary');
    root.style.removeProperty('--ring');
  }, [resolvedTheme, primaryColor]);

  const setTheme = React.useCallback((nextTheme: ThemePreference) => {
    setThemeState(nextTheme);
    if (typeof window === 'undefined') {
      return;
    }

    if (nextTheme === 'system') {
      window.localStorage.removeItem(STORAGE_KEY);
      setResolvedTheme(resolveTheme('system'));
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

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeMode() {
  return React.useContext(ThemeContext);
}

function resolveTheme(theme: ThemePreference): 'light' | 'dark' {
  if (theme === 'light' || theme === 'dark') {
    return theme;
  }

  if (typeof window === 'undefined') {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function parseColor(value: string): string | null {
  const trimmed = value.trim();
  const hexMatch = trimmed.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hexMatch) {
    return hexToHsl(hexMatch[1]);
  }

  const hslMatch = trimmed.match(/^hsl\(([^)]+)\)$/i);
  if (hslMatch) {
    return hslMatch[1].replace(/,/g, ' ').trim();
  }

  return null;
}

function hexToHsl(hex: string): string {
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
      default:
        break;
    }
    h /= 6;
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}
