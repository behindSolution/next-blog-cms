export interface CookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  path?: string;
  maxAge?: number;
  sameSite?: 'lax' | 'strict' | 'none';
}

export interface SerializedCookie {
  name: string;
  value: string;
  options?: CookieOptions;
}

export function parseCookies(cookieHeader: string | undefined): Record<string, string> {
  if (!cookieHeader) {
    return {};
  }

  return cookieHeader.split(';').reduce<Record<string, string>>((acc, part) => {
    const [name, ...rest] = part.trim().split('=');
    if (!name) {
      return acc;
    }

    const value = rest.join('=');
    acc[name] = decodeURIComponent(value);
    return acc;
  }, {});
}

export function serializeCookie(name: string, value: string, options: CookieOptions = {}): string {
  const segments = [`${name}=${encodeURIComponent(value)}`];

  if (options.maxAge !== undefined) {
    segments.push(`Max-Age=${Math.floor(options.maxAge)}`);
  }

  if (options.path) {
    segments.push(`Path=${options.path}`);
  }

  if (options.httpOnly) {
    segments.push('HttpOnly');
  }

  if (options.secure) {
    segments.push('Secure');
  }

  if (options.sameSite) {
    segments.push(`SameSite=${capitalize(options.sameSite)}`);
  }

  return segments.join('; ');
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

