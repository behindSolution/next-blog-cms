import { categoryQueries, languageQueries, postQueries } from '../../db/queries';
import type { PostWithTranslations } from '../../db/queries/posts';
import type { Post } from '../../types';
import { HttpError, HttpStatus } from '../../lib/http';
import {
  createPostSchema,
  paginationSchema,
  updatePostSchema
} from '../../lib/validation';
import { resolvePagination } from '../../lib/utils';
import { getQueryParam } from '../utils/query';
import type { HandlerResult, RequestContext } from '../types';

export async function handlePostsRoute(
  req: RequestContext['request'],
  ctx: RequestContext
): Promise<HandlerResult> {
  const isAdmin = req.segments[0] === 'admin';
  const segments = isAdmin ? req.segments.slice(1) : req.segments;

  if (segments.length === 1) {
    if (req.method === 'GET') {
      return handleListPosts(req, ctx, isAdmin);
    }

    if (isAdmin && req.method === 'POST') {
      return handleCreatePost(req, ctx);
    }
  }

  if (segments.length === 2) {
    const identifier = segments[1];

    if (req.method === 'GET') {
      return handleGetPost(req, ctx, identifier, isAdmin);
    }

    if (isAdmin && req.method === 'PUT') {
      return handleUpdatePost(req, ctx, identifier);
    }

    if (isAdmin && req.method === 'DELETE') {
      return handleDeletePost(ctx, identifier);
    }
  }

  throw new HttpError('Route not found', { status: HttpStatus.NOT_FOUND });
}

async function handleListPosts(
  req: RequestContext['request'],
  ctx: RequestContext,
  isAdmin: boolean
): Promise<HandlerResult> {
  const pagination = paginationSchema.safeParse({
    page: getQueryParam(req, 'page'),
    limit: getQueryParam(req, 'limit')
  });
  if (!pagination.success) {
    throw new HttpError('Invalid pagination parameters', {
      status: HttpStatus.BAD_REQUEST,
      details: pagination.error.flatten()
    });
  }

  const { limit, page, offset } = resolvePagination({
    limit: pagination.data.limit,
    page: pagination.data.page
  });

  const lang = getQueryParam(req, 'lang');
  const statusQuery = getQueryParam(req, 'status');
  const categorySlug = getQueryParam(req, 'category');
  const search = getQueryParam(req, 'search');

  let status: 'draft' | 'published' | undefined = isAdmin ? undefined : 'published';
  if (isAdmin && statusQuery && (statusQuery === 'draft' || statusQuery === 'published')) {
    status = statusQuery;
  }

  let categoryId: number | undefined;
  if (categorySlug) {
    const category = categoryQueries.getCategoryBySlug(categorySlug);
    if (!category) {
      return {
        status: HttpStatus.OK,
        data: {
          posts: [],
          total: 0,
          page,
          pages: 0
        }
      };
    }
    categoryId = category.id;
  }

  const authorId = isAdmin && ctx.user?.role === 'author' ? ctx.user.id : undefined;

  const { posts, total } = postQueries.listPostsPaginated({
    status,
    categoryId,
    authorId,
    search: search ?? undefined,
    language: lang ?? undefined,
    limit,
    offset,
    orderBy: 'created_at'
  });

  if (isAdmin) {
    const data = posts.map((post) => formatAdminPost(postQueries.mapPostToDomain(post)));
    return {
      status: HttpStatus.OK,
      data: {
        posts: data,
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    };
  }

  const defaultLanguage = languageQueries.getDefaultLanguage();
  const defaultCode = defaultLanguage?.code ?? 'en';
  const data = posts
    .map((post) => formatPublicPost(post, lang ?? defaultCode, defaultCode))
    .filter((post): post is NonNullable<typeof post> => Boolean(post));

  return {
    status: HttpStatus.OK,
    data: {
      posts: data,
      total,
      page,
      pages: Math.ceil(total / limit)
    }
  };
}

async function handleCreatePost(
  req: RequestContext['request'],
  ctx: RequestContext
): Promise<HandlerResult> {
  if (!ctx.user) {
    throw new HttpError('Unauthorized', { status: HttpStatus.UNAUTHORIZED });
  }

  const parsed = createPostSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new HttpError('Invalid data', {
      status: HttpStatus.BAD_REQUEST,
      details: parsed.error.flatten()
    });
  }

  const payload = parsed.data;
  const publishedAt =
    payload.status === 'published' && !payload.publishedAt
      ? new Date().toISOString()
      : payload.publishedAt ?? null;

  const created = postQueries.createPost({
    slug: payload.slug,
    authorId: ctx.user.id,
    categoryId: payload.categoryId ?? null,
    featuredImage: payload.featuredImage ?? null,
    status: payload.status ?? 'draft',
    publishedAt,
    translations: payload.translations.map((translation) => ({
      language: translation.language,
      title: translation.title,
      content: translation.content,
      excerpt: translation.excerpt,
      metaTitle: translation.metaTitle,
      metaDescription: translation.metaDescription
    }))
  });

  return {
    status: HttpStatus.CREATED,
    data: {
      post: formatAdminPost(postQueries.mapPostToDomain(created))
    }
  };
}

async function handleGetPost(
  req: RequestContext['request'],
  _ctx: RequestContext,
  identifier: string,
  isAdmin: boolean
): Promise<HandlerResult> {
  if (isAdmin) {
    const id = Number(identifier);
    if (Number.isNaN(id)) {
      throw new HttpError('Invalid ID', { status: HttpStatus.BAD_REQUEST });
    }

    const post = postQueries.getPostById(id);
    if (!post) {
      throw new HttpError('Post not found', { status: HttpStatus.NOT_FOUND });
    }

    return {
      status: HttpStatus.OK,
      data: {
        post: formatAdminPost(postQueries.mapPostToDomain(post))
      }
    };
  }

  const lang = getQueryParam(req, 'lang');
  const defaultLanguage = languageQueries.getDefaultLanguage();
  const defaultCode = defaultLanguage?.code ?? 'en';

  const post = postQueries.getPostBySlug(identifier);
  if (!post || post.status !== 'published') {
    throw new HttpError('Post not found', { status: HttpStatus.NOT_FOUND });
  }

  const formatted = formatPublicPost(post, lang ?? defaultCode, defaultCode);
  if (!formatted) {
    throw new HttpError('Translation not available', { status: HttpStatus.NOT_FOUND });
  }

  return {
    status: HttpStatus.OK,
    data: { post: formatted }
  };
}

async function handleUpdatePost(
  req: RequestContext['request'],
  ctx: RequestContext,
  identifier: string
): Promise<HandlerResult> {
  if (!ctx.user) {
    throw new HttpError('Unauthorized', { status: HttpStatus.UNAUTHORIZED });
  }

  const id = Number(identifier);
  if (Number.isNaN(id)) {
    throw new HttpError('Invalid ID', { status: HttpStatus.BAD_REQUEST });
  }

  const post = postQueries.getPostById(id);
  if (!post) {
    throw new HttpError('Post not found', { status: HttpStatus.NOT_FOUND });
  }

  if (ctx.user.role === 'author' && post.author_id !== ctx.user.id) {
    throw new HttpError('You do not have permission to update this post', {
      status: HttpStatus.FORBIDDEN
    });
  }

  const parsed = updatePostSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new HttpError('Invalid data', {
      status: HttpStatus.BAD_REQUEST,
      details: parsed.error.flatten()
    });
  }

  const payload = parsed.data;
  const nextStatus = payload.status ?? post.status;
  let publishedAt = payload.publishedAt ?? post.published_at;

  if (nextStatus === 'published' && !publishedAt) {
    publishedAt = new Date().toISOString();
  }

  const updated = postQueries.updatePost(id, {
    slug: payload.slug,
    categoryId: typeof payload.categoryId === 'undefined' ? undefined : payload.categoryId,
    featuredImage: payload.featuredImage,
    status: payload.status,
    publishedAt,
    translations: payload.translations?.map((translation) => ({
      language: translation.language,
      title: translation.title,
      content: translation.content,
      excerpt: translation.excerpt,
      metaTitle: translation.metaTitle,
      metaDescription: translation.metaDescription
    }))
  });

  if (!updated) {
    throw new HttpError('Failed to update post', { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }

  return {
    status: HttpStatus.OK,
    data: {
      post: formatAdminPost(postQueries.mapPostToDomain(updated))
    }
  };
}

async function handleDeletePost(ctx: RequestContext, identifier: string): Promise<HandlerResult> {
  if (!ctx.user) {
    throw new HttpError('Unauthorized', { status: HttpStatus.UNAUTHORIZED });
  }

  const id = Number(identifier);
  if (Number.isNaN(id)) {
    throw new HttpError('Invalid ID', { status: HttpStatus.BAD_REQUEST });
  }

  const existing = postQueries.getPostById(id);
  if (!existing) {
    throw new HttpError('Post not found', { status: HttpStatus.NOT_FOUND });
  }

  if (ctx.user.role === 'author' && existing.author_id !== ctx.user.id) {
    throw new HttpError('You do not have permission to delete this post', {
      status: HttpStatus.FORBIDDEN
    });
  }

  postQueries.deletePost(id);

  return {
    status: HttpStatus.NO_CONTENT
  };
}

function formatAdminPost(post: Post) {
  return {
    id: post.id,
    slug: post.slug,
    authorId: post.authorId,
    categoryId: post.categoryId ?? null,
    featuredImage: post.featuredImage ?? null,
    status: post.status,
    publishedAt: post.publishedAt ?? null,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    translations: post.translations.map((translation) => ({
      language: translation.language,
      title: translation.title,
      content: translation.content,
      excerpt: translation.excerpt ?? null,
      metaTitle: translation.metaTitle ?? null,
      metaDescription: translation.metaDescription ?? null
    }))
  };
}

function formatPublicPost(
  post: PostWithTranslations,
  language: string,
  fallbackLanguage: string
) {
  const translation =
    post.translations.find((t) => t.language === language) ??
    post.translations.find((t) => t.language === fallbackLanguage) ??
    post.translations[0];

  if (!translation) {
    return null;
  }

  const category =
    post.category_id != null ? categoryQueries.getCategoryById(post.category_id) : null;
  const categoryTranslation =
    category?.translations.find((t) => t.language === language) ??
    category?.translations.find((t) => t.language === fallbackLanguage) ??
    category?.translations[0];

  const readingTimeMinutes = calculateReadingTime(translation.content);

  return {
    id: post.id,
    slug: post.slug,
    title: translation.title,
    content: translation.content,
    excerpt: translation.excerpt,
    metaTitle: translation.meta_title,
    metaDescription: translation.meta_description,
    featuredImage: post.featured_image,
    status: post.status,
    publishedAt: post.published_at,
    createdAt: post.created_at,
    updatedAt: post.updated_at,
    readingTimeMinutes,
    category: categoryTranslation
      ? {
          id: category!.id,
          slug: category!.slug,
          name: categoryTranslation.name,
          description: categoryTranslation.description
        }
      : null
  };
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const plainText = content.replace(/<[^>]+>/g, ' ');
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

