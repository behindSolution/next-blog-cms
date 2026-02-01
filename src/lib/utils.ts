export interface PaginationInput {
  page?: number;
  limit?: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  offset: number;
}

export function resolvePagination(input: PaginationInput = {}): PaginationMeta {
  const limit = clampNumber(input.limit ?? 20, 1, 100);
  const page = clampNumber(input.page ?? 1, 1, Number.MAX_SAFE_INTEGER);

  return {
    page,
    limit,
    offset: (page - 1) * limit
  };
}

export function clampNumber(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function ensureArray<T>(value: T | T[] | undefined | null): T[] {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === 'undefined' || value === null) {
    return [];
  }

  return [value];
}

export function pick<T extends object, K extends keyof T>(obj: T, keys: readonly K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;

  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }

  return result;
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

