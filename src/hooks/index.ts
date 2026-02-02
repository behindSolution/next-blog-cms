import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { BlogStatus, Language } from '../types';

export type LanguageCode = string;

export interface BlogPostCategory {
  id: number;
  slug: string;
  name: string;
  description?: string | null;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  featuredImage?: string | null;
  status: BlogStatus;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  readingTimeMinutes: number;
  category: BlogPostCategory | null;
}

export interface UsePostsOptions {
  lang?: LanguageCode;
  limit?: number;
  page?: number;
  category?: string;
  status?: 'draft' | 'published';
}

export interface UsePostsResult<TPost = BlogPost> {
  posts: TPost[];
  total: number;
  page: number;
  pages: number;
  loading: boolean;
  error: unknown;
  hasMore: boolean;
  loadMore: () => void;
  reset: () => void;
}

export function usePosts<TPost = BlogPost>(options: UsePostsOptions = {}): UsePostsResult<TPost> {
  const limit = options.limit ?? 10;
  const isControlled = typeof options.page === 'number';
  const [internalPage, setInternalPage] = useState<number>(options.page ?? 1);
  const page = isControlled ? options.page! : internalPage;
  const [items, setItems] = useState<TPost[]>([]);
  const [meta, setMeta] = useState<{ total: number; pages: number }>({ total: 0, pages: 0 });

  const filters = useMemo(
    () => ({
      lang: options.lang ?? null,
      category: options.category ?? null,
      status: options.status ?? null,
      limit
    }),
    [options.lang, options.category, options.status, limit]
  );

  const filtersKey = useMemo(() => JSON.stringify(filters), [filters]);
  const filtersKeyRef = useRef(filtersKey);

  useEffect(() => {
    if (filtersKeyRef.current !== filtersKey) {
      filtersKeyRef.current = filtersKey;
      setMeta({ total: 0, pages: 0 });
      setItems([]);
      if (!isControlled) {
        setInternalPage(1);
      }
    }
  }, [filtersKey, isControlled]);

  useEffect(() => {
    if (isControlled && typeof options.page === 'number') {
      setInternalPage(options.page);
    }
  }, [isControlled, options.page]);

  const url = buildUrl('/api/blog/posts', {
    lang: filters.lang ?? undefined,
    category: filters.category ?? undefined,
    status: filters.status ?? undefined,
    limit,
    page
  });

  const { data, error, loading } = useApiFetch<PostsResponse<TPost>>(url);

  useEffect(() => {
    if (!data) return;
    setMeta({ total: data.total, pages: data.pages });

    if (isControlled) {
      setItems(data.posts);
      return;
    }

    setItems((previous) => {
      if (page === 1) {
        return data.posts;
      }

      const deduped = [...previous];
      const existingKeys = new Set(
        previous.map((item) => {
          const candidate = item as unknown as { id?: number; slug?: string };
          return candidate.id ?? candidate.slug ?? JSON.stringify(item);
        })
      );

      data.posts.forEach((post) => {
        const candidate = post as unknown as { id?: number; slug?: string };
        const key = candidate.id ?? candidate.slug ?? JSON.stringify(post);
        if (!existingKeys.has(key)) {
          existingKeys.add(key);
          deduped.push(post);
        }
      });

      return deduped;
    });
  }, [data, isControlled, page]);

  const hasMore = meta.pages > 0 ? page < meta.pages : false;

  const loadMore = useCallback(() => {
    if (isControlled) return;
    if (hasMore && !loading) {
      setInternalPage((current) => current + 1);
    }
  }, [hasMore, isControlled, loading]);

  const reset = useCallback(() => {
    if (!isControlled) {
      setInternalPage(1);
    }
    setItems([]);
    setMeta({ total: 0, pages: 0 });
  }, [isControlled]);

  return {
    posts: items,
    total: meta.total,
    page,
    pages: meta.pages,
    loading,
    error,
    hasMore,
    loadMore,
    reset
  };
}

export interface UsePostOptions {
  lang?: LanguageCode;
}

export interface UsePostResult<TPost = BlogPost> {
  post: TPost | null;
  loading: boolean;
  error: unknown;
}

export function usePost<TPost = BlogPost>(slug: string, options: UsePostOptions = {}): UsePostResult<TPost> {
  const sanitizedSlug = slug?.trim();
  const url = sanitizedSlug
    ? buildUrl(`/api/blog/posts/${encodeURIComponent(sanitizedSlug)}`, {
        lang: options.lang
      })
    : null;

  const { data, error, loading } = useApiFetch<PostResponse<TPost>>(url);

  return {
    post: data?.post ?? null,
    loading: url ? loading : false,
    error
  };
}

export interface UseCategoriesOptions {
  lang?: LanguageCode;
}

export interface UseCategoriesResult<TCategory = BlogPostCategory> {
  categories: TCategory[];
  loading: boolean;
  error: unknown;
}

export function useCategories<TCategory = BlogPostCategory>(
  options: UseCategoriesOptions = {}
): UseCategoriesResult<TCategory> {
  const url = buildUrl('/api/blog/categories', { lang: options.lang });
  const { data, error, loading } = useApiFetch<CategoriesResponse<TCategory>>(url);

  return {
    categories: data?.categories ?? [],
    loading,
    error
  };
}

export interface UseLanguagesResult<TLanguage = Language> {
  languages: TLanguage[];
  loading: boolean;
  error: unknown;
}

export function useLanguages<TLanguage = Language>(): UseLanguagesResult<TLanguage> {
  const url = '/api/blog/languages';
  const { data, error, loading } = useApiFetch<LanguagesResponse<TLanguage>>(url);

  return {
    languages: data?.languages ?? [],
    loading,
    error
  };
}

interface PostsResponse<TPost> {
  posts: TPost[];
  total: number;
  page: number;
  pages: number;
}

interface PostResponse<TPost> {
  post: TPost;
}

interface CategoriesResponse<TCategory> {
  categories: TCategory[];
}

interface LanguagesResponse<TLanguage> {
  languages: TLanguage[];
}

interface ErrorWithStatus extends Error {
  status?: number;
  body?: unknown;
}

function buildUrl(base: string, params: Record<string, unknown>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return;
    }
    searchParams.set(key, String(value));
  });

  const query = searchParams.toString();
  return query ? `${base}?${query}` : base;
}

interface FetchState<TData> {
  data: TData | undefined;
  error: unknown;
  loading: boolean;
}

function useApiFetch<TResponse>(url: string | null): FetchState<TResponse> {
  const [state, setState] = useState<FetchState<TResponse>>({
    data: undefined,
    error: undefined,
    loading: Boolean(url)
  });
  const requestIdRef = useRef(0);
  const stableUrl = useMemo(() => url, [url]);

  useEffect(() => {
    if (!stableUrl) {
      setState({ data: undefined, error: undefined, loading: false });
      return;
    }

    const controller = new AbortController();
    const requestId = ++requestIdRef.current;

    setState((previous) => ({
      data: previous.data,
      error: undefined,
      loading: true
    }));

    (async () => {
      try {
        const data = await fetchJson<TResponse>(stableUrl, controller.signal);
        if (requestId === requestIdRef.current) {
          setState({ data, error: undefined, loading: false });
        }
      } catch (error) {
        if (requestId === requestIdRef.current) {
          setState((previous) => ({
            data: previous.data,
            error,
            loading: false
          }));
        }
      }
    })();

    return () => {
      controller.abort();
    };
  }, [stableUrl]);

  return state;
}

async function fetchJson<TResponse>(url: string, signal?: AbortSignal): Promise<TResponse> {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json'
    },
    signal
  });

  if (!response.ok) {
    let errorBody: unknown;
    try {
      errorBody = await response.json();
    } catch {
      errorBody = undefined;
    }
    const error = new Error('Request failed');
    (error as ErrorWithStatus).status = response.status;
    (error as ErrorWithStatus).body = errorBody;
    throw error;
  }

  if (response.status === 204) {
    return undefined as TResponse;
  }

  return (await response.json()) as TResponse;
}

