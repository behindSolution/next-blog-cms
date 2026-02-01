export type BlogStatus = 'draft' | 'published';

export interface Language {
  code: string;
  name: string;
  isDefault: boolean;
  enabled: boolean;
}

export interface CategoryTranslation {
  language: string;
  name: string;
  description?: string | null;
}

export interface Category {
  id: number;
  slug: string;
  translations: CategoryTranslation[];
  createdAt: string;
}

export interface PostTranslation {
  language: string;
  title: string;
  content: string;
  excerpt?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
}

export interface Post {
  id: number;
  slug: string;
  authorId: number;
  categoryId?: number | null;
  featuredImage?: string | null;
  status: BlogStatus;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  translations: PostTranslation[];
}

