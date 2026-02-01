import type { NormalizedRequest } from '../types';

export function getQueryParam(req: NormalizedRequest, name: string): string | undefined {
  const value = req.query[name];
  if (Array.isArray(value)) {
    return value[0] ?? undefined;
  }

  if (typeof value === 'string') {
    return value;
  }

  return undefined;
}

export function getQueryParamBoolean(req: NormalizedRequest, name: string): boolean | undefined {
  const value = getQueryParam(req, name);
  if (typeof value === 'undefined') {
    return undefined;
  }

  if (value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  return undefined;
}

