import type { BlogStatus, Post, PostTranslation } from '../../types';
import type { SqliteDatabase } from '../index';
import { getDatabase } from '../index';

export interface PostRecord {
  id: number;
  slug: string;
  author_id: number;
  category_id: number | null;
  featured_image: string | null;
  status: BlogStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PostTranslationRecord {
  id: number;
  post_id: number;
  language: string;
  title: string;
  content: string;
  excerpt: string | null;
  meta_title: string | null;
  meta_description: string | null;
}

export interface PostTranslationInput {
  language: string;
  title: string;
  content: string;
  excerpt?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
}

export interface CreatePostInput {
  slug: string;
  authorId: number;
  categoryId?: number | null;
  featuredImage?: string | null;
  status?: BlogStatus;
  publishedAt?: string | null;
  translations: PostTranslationInput[];
}

export interface UpdatePostInput {
  slug?: string;
  categoryId?: number | null;
  featuredImage?: string | null;
  status?: BlogStatus;
  publishedAt?: string | null;
  translations?: PostTranslationInput[];
}

export interface ListPostsOptions {
  status?: BlogStatus;
  categoryId?: number;
  authorId?: number;
  search?: string;
  language?: string;
  limit?: number;
  offset?: number;
  orderBy?: 'created_at' | 'published_at' | 'updated_at';
  orderDirection?: 'asc' | 'desc';
}

export interface PaginatedPosts {
  posts: PostWithTranslations[];
  total: number;
}

export interface PostWithTranslations extends PostRecord {
  translations: PostTranslationRecord[];
}

function db(): SqliteDatabase {
  return getDatabase();
}

function fetchPostTranslations(postId: number): PostTranslationRecord[] {
  return db()
    .prepare(
      `SELECT id, post_id, language, title, content, excerpt, meta_title, meta_description
       FROM post_translations
       WHERE post_id = ?
       ORDER BY language ASC`
    )
    .all(postId) as PostTranslationRecord[];
}

function mapPost(record: PostRecord): PostWithTranslations {
  return {
    ...record,
    translations: fetchPostTranslations(record.id)
  };
}

export function getPostById(id: number): PostWithTranslations | null {
  const row = db()
    .prepare(
      `SELECT id, slug, author_id, category_id, featured_image, status,
              published_at, created_at, updated_at
       FROM posts
       WHERE id = ?`
    )
    .get(id) as PostRecord | undefined;

  if (!row) {
    return null;
  }

  return mapPost(row);
}

export function getPostBySlug(slug: string): PostWithTranslations | null {
  const row = db()
    .prepare(
      `SELECT id, slug, author_id, category_id, featured_image, status,
              published_at, created_at, updated_at
       FROM posts
       WHERE slug = ?`
    )
    .get(slug) as PostRecord | undefined;

  if (!row) {
    return null;
  }

  return mapPost(row);
}

export function listPosts(): PostWithTranslations[] {
  const rows = db()
    .prepare(
      `SELECT id, slug, author_id, category_id, featured_image, status,
              published_at, created_at, updated_at
       FROM posts
       ORDER BY created_at DESC`
    )
    .all() as PostRecord[];

  return rows.map(mapPost);
}

export function listPostsPaginated(options: ListPostsOptions = {}): PaginatedPosts {
  const clauses: string[] = [];
  const params: Record<string, unknown> = {};

  if (options.status) {
    clauses.push('p.status = @status');
    params.status = options.status;
  }

  if (options.categoryId) {
    clauses.push('p.category_id = @categoryId');
    params.categoryId = options.categoryId;
  }

  if (options.authorId) {
    clauses.push('p.author_id = @authorId');
    params.authorId = options.authorId;
  }

  if (options.search && options.language) {
    clauses.push(
      `(pt.title LIKE @search OR pt.content LIKE @search OR pt.excerpt LIKE @search)`
    );
    params.search = `%${options.search}%`;
  }

  if (options.language) {
    params.language = options.language;
  }

  const whereClause =
    clauses.length > 0
      ? `WHERE ${clauses.join(' AND ')}`
      : '';

  const baseQuery = `
    FROM posts p
    ${options.language ? 'LEFT JOIN post_translations pt ON pt.post_id = p.id AND pt.language = @language' : ''}
    ${whereClause}
  `;

  const totalRow = db()
    .prepare(`SELECT COUNT(DISTINCT p.id) as count ${baseQuery}`)
    .get(params) as { count: number } | undefined;

  const orderBy = options.orderBy ?? 'created_at';
  const direction = (options.orderDirection ?? 'desc').toUpperCase();

  const limit = options.limit ?? 20;
  const offset = options.offset ?? 0;

  const rows = db()
    .prepare(
      `
      SELECT DISTINCT
        p.id,
        p.slug,
        p.author_id,
        p.category_id,
        p.featured_image,
        p.status,
        p.published_at,
        p.created_at,
        p.updated_at
      ${baseQuery}
      ORDER BY p.${orderBy} ${direction}
      LIMIT @limit
      OFFSET @offset
    `
    )
    .all({
      ...params,
      limit,
      offset
    }) as PostRecord[];

  return {
    posts: rows.map(mapPost),
    total: totalRow?.count ?? 0
  };
}

export function createPost(input: CreatePostInput): PostWithTranslations {
  const insert = db().transaction((payload: CreatePostInput) => {
    const result = db()
      .prepare(
        `INSERT INTO posts (
            slug,
            author_id,
            category_id,
            featured_image,
            status,
            published_at
          )
          VALUES (@slug, @authorId, @categoryId, @featuredImage, @status, @publishedAt)`
      )
      .run({
        slug: payload.slug,
        authorId: payload.authorId,
        categoryId: typeof payload.categoryId === 'undefined' ? null : payload.categoryId,
        featuredImage: payload.featuredImage ?? null,
        status: payload.status ?? 'draft',
        publishedAt: payload.publishedAt ?? null
      });

    const postId = Number(result.lastInsertRowid);

    const insertTranslation = db().prepare(
      `INSERT INTO post_translations (
          post_id,
          language,
          title,
          content,
          excerpt,
          meta_title,
          meta_description
        )
        VALUES (
          @postId,
          @language,
          @title,
          @content,
          @excerpt,
          @metaTitle,
          @metaDescription
        )`
    );

    for (const translation of payload.translations) {
      insertTranslation.run({
        postId,
        language: translation.language,
        title: translation.title,
        content: translation.content,
        excerpt: translation.excerpt ?? null,
        metaTitle: translation.metaTitle ?? null,
        metaDescription: translation.metaDescription ?? null
      });
    }

    const post = getPostById(postId);
    if (!post) {
      throw new Error('Failed to create post');
    }

    return post;
  });

  return insert(input);
}

export function updatePost(id: number, input: UpdatePostInput): PostWithTranslations | null {
  const update = db().transaction((payload: UpdatePostInput) => {
    const fields: string[] = [];
    const params: Record<string, unknown> = { id };

    if (typeof payload.slug !== 'undefined') {
      fields.push('slug = @slug');
      params.slug = payload.slug;
    }

    if (typeof payload.categoryId !== 'undefined') {
      fields.push('category_id = @categoryId');
      params.categoryId = payload.categoryId === null ? null : payload.categoryId;
    }

    if (typeof payload.featuredImage !== 'undefined') {
      fields.push('featured_image = @featuredImage');
      params.featuredImage = payload.featuredImage ?? null;
    }

    if (typeof payload.status !== 'undefined') {
      fields.push('status = @status');
      params.status = payload.status;
    }

    if (typeof payload.publishedAt !== 'undefined') {
      fields.push('published_at = @publishedAt');
      params.publishedAt = payload.publishedAt ?? null;
    }

    if (fields.length > 0) {
      db()
        .prepare(`UPDATE posts SET ${fields.join(', ')} WHERE id = @id`)
        .run(params);
    }

    if (payload.translations) {
      db().prepare('DELETE FROM post_translations WHERE post_id = ?').run(id);

      const insertTranslation = db().prepare(
        `INSERT INTO post_translations (
            post_id,
            language,
            title,
            content,
            excerpt,
            meta_title,
            meta_description
          )
          VALUES (
            @postId,
            @language,
            @title,
            @content,
            @excerpt,
            @metaTitle,
            @metaDescription
          )`
      );

      for (const translation of payload.translations) {
        insertTranslation.run({
          postId: id,
          language: translation.language,
          title: translation.title,
          content: translation.content,
          excerpt: translation.excerpt ?? null,
          metaTitle: translation.metaTitle ?? null,
          metaDescription: translation.metaDescription ?? null
        });
      }
    }

    return getPostById(id);
  });

  return update(input);
}

export function deletePost(id: number) {
  db().prepare('DELETE FROM posts WHERE id = ?').run(id);
}

export function mapPostToDomain(post: PostWithTranslations): Post {
  return {
    id: post.id,
    slug: post.slug,
    authorId: post.author_id,
    categoryId: post.category_id ?? undefined,
    featuredImage: post.featured_image ?? undefined,
    status: post.status,
    publishedAt: post.published_at ?? undefined,
    createdAt: post.created_at,
    updatedAt: post.updated_at,
    translations: post.translations.map<PostTranslation>((translation) => ({
      language: translation.language,
      title: translation.title,
      content: translation.content,
      excerpt: translation.excerpt ?? undefined,
      metaTitle: translation.meta_title ?? undefined,
      metaDescription: translation.meta_description ?? undefined
    }))
  };
}

