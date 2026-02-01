import { BlogStatus, Language } from '../types/index.cjs';

type LanguageCode = string;
interface BlogPostCategory {
    id: number;
    slug: string;
    name: string;
    description?: string | null;
}
interface BlogPost {
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
interface UsePostsOptions {
    lang?: LanguageCode;
    limit?: number;
    page?: number;
    category?: string;
    status?: 'draft' | 'published';
}
interface UsePostsResult<TPost = BlogPost> {
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
declare function usePosts<TPost = BlogPost>(options?: UsePostsOptions): UsePostsResult<TPost>;
interface UsePostOptions {
    lang?: LanguageCode;
}
interface UsePostResult<TPost = BlogPost> {
    post: TPost | null;
    loading: boolean;
    error: unknown;
}
declare function usePost<TPost = BlogPost>(slug: string, options?: UsePostOptions): UsePostResult<TPost>;
interface UseCategoriesOptions {
    lang?: LanguageCode;
}
interface UseCategoriesResult<TCategory = BlogPostCategory> {
    categories: TCategory[];
    loading: boolean;
    error: unknown;
}
declare function useCategories<TCategory = BlogPostCategory>(options?: UseCategoriesOptions): UseCategoriesResult<TCategory>;
interface UseLanguagesResult<TLanguage = Language> {
    languages: TLanguage[];
    loading: boolean;
    error: unknown;
}
declare function useLanguages<TLanguage = Language>(): UseLanguagesResult<TLanguage>;

export { type BlogPost, type BlogPostCategory, type LanguageCode, type UseCategoriesOptions, type UseCategoriesResult, type UseLanguagesResult, type UsePostOptions, type UsePostResult, type UsePostsOptions, type UsePostsResult, useCategories, useLanguages, usePost, usePosts };
