type BlogStatus = 'draft' | 'published';
interface Language {
    code: string;
    name: string;
    isDefault: boolean;
    enabled: boolean;
}
interface CategoryTranslation {
    language: string;
    name: string;
    description?: string | null;
}
interface Category {
    id: number;
    slug: string;
    translations: CategoryTranslation[];
    createdAt: string;
}
interface PostTranslation {
    language: string;
    title: string;
    content: string;
    excerpt?: string | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
}
interface Post {
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

export type { BlogStatus, Category, CategoryTranslation, Language, Post, PostTranslation };
