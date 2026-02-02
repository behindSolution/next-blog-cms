import { useState, useMemo, useRef, useEffect, useCallback } from 'react';

// src/hooks/index.ts
function usePosts(options = {}) {
  const limit = options.limit ?? 10;
  const isControlled = typeof options.page === "number";
  const [internalPage, setInternalPage] = useState(options.page ?? 1);
  const page = isControlled ? options.page : internalPage;
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({ total: 0, pages: 0 });
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
    if (isControlled && typeof options.page === "number") {
      setInternalPage(options.page);
    }
  }, [isControlled, options.page]);
  const url = buildUrl("/api/blog/posts", {
    lang: filters.lang ?? void 0,
    category: filters.category ?? void 0,
    status: filters.status ?? void 0,
    limit,
    page
  });
  const { data, error, loading } = useApiFetch(url);
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
          const candidate = item;
          return candidate.id ?? candidate.slug ?? JSON.stringify(item);
        })
      );
      data.posts.forEach((post) => {
        const candidate = post;
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
function usePost(slug, options = {}) {
  const sanitizedSlug = slug?.trim();
  const url = sanitizedSlug ? buildUrl(`/api/blog/posts/${encodeURIComponent(sanitizedSlug)}`, {
    lang: options.lang
  }) : null;
  const { data, error, loading } = useApiFetch(url);
  return {
    post: data?.post ?? null,
    loading: url ? loading : false,
    error
  };
}
function useCategories(options = {}) {
  const url = buildUrl("/api/blog/categories", { lang: options.lang });
  const { data, error, loading } = useApiFetch(url);
  return {
    categories: data?.categories ?? [],
    loading,
    error
  };
}
function useLanguages() {
  const url = "/api/blog/languages";
  const { data, error, loading } = useApiFetch(url);
  return {
    languages: data?.languages ?? [],
    loading,
    error
  };
}
function buildUrl(base, params) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === void 0 || value === null || value === "") {
      return;
    }
    searchParams.set(key, String(value));
  });
  const query = searchParams.toString();
  return query ? `${base}?${query}` : base;
}
function useApiFetch(url) {
  const [state, setState] = useState({
    data: void 0,
    error: void 0,
    loading: Boolean(url)
  });
  const requestIdRef = useRef(0);
  const stableUrl = useMemo(() => url, [url]);
  useEffect(() => {
    if (!stableUrl) {
      setState({ data: void 0, error: void 0, loading: false });
      return;
    }
    const controller = new AbortController();
    const requestId = ++requestIdRef.current;
    setState((previous) => ({
      data: previous.data,
      error: void 0,
      loading: true
    }));
    (async () => {
      try {
        const data = await fetchJson(stableUrl, controller.signal);
        if (requestId === requestIdRef.current) {
          setState({ data, error: void 0, loading: false });
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
async function fetchJson(url, signal) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json"
    },
    signal
  });
  if (!response.ok) {
    let errorBody;
    try {
      errorBody = await response.json();
    } catch {
      errorBody = void 0;
    }
    const error = new Error("Request failed");
    error.status = response.status;
    error.body = errorBody;
    throw error;
  }
  if (response.status === 204) {
    return void 0;
  }
  return await response.json();
}

export { useCategories, useLanguages, usePost, usePosts };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map