import { categoryQueries, languageQueries, postQueries } from '../../db/queries';
import type { CategoryWithTranslations } from '../../db/queries/categories';
import type { HandlerResult, RequestContext } from '../types';
import { HttpError, HttpStatus } from '../../lib/http';
import { createCategorySchema, updateCategorySchema } from '../../lib/validation';
import { getQueryParam } from '../utils/query';

export async function handleCategoriesRoute(
  req: RequestContext['request'],
  ctx: RequestContext
): Promise<HandlerResult> {
  const isAdmin = req.segments[0] === 'admin';
  const segments = isAdmin ? req.segments.slice(1) : req.segments;

  if (segments.length === 1) {
    if (req.method === 'GET') {
      return handleListCategories(req, isAdmin);
    }

    if (isAdmin && req.method === 'POST') {
      ensureAdmin(ctx);
      return handleCreateCategory(req);
    }
  }

  if (segments.length === 2) {
    const identifier = segments[1];

    if (req.method === 'GET') {
      return handleGetCategory(req, identifier, isAdmin);
    }

    if (isAdmin && req.method === 'PUT') {
      ensureAdmin(ctx);
      return handleUpdateCategory(req, identifier);
    }

    if (isAdmin && req.method === 'DELETE') {
      ensureAdmin(ctx);
      return handleDeleteCategory(identifier);
    }
  }

  throw new HttpError('Route not found', { status: HttpStatus.NOT_FOUND });
}

function handleListCategories(req: RequestContext['request'], isAdmin: boolean): HandlerResult {
  const lang = getQueryParam(req, 'lang');
  const defaultLanguage = languageQueries.getDefaultLanguage();
  const fallback = defaultLanguage?.code ?? 'en';

  const categories = categoryQueries.listCategories();

  if (isAdmin) {
    return {
      status: HttpStatus.OK,
      data: {
        categories: categories.map((category) => formatAdminCategory(category))
      }
    };
  }

  const formatted = categories
    .map((category) => formatPublicCategory(category, lang ?? fallback, fallback))
    .filter((category): category is NonNullable<typeof category> => Boolean(category));

  return {
    status: HttpStatus.OK,
    data: {
      categories: formatted
    }
  };
}

function handleGetCategory(
  req: RequestContext['request'],
  identifier: string,
  isAdmin: boolean
): HandlerResult {
  if (isAdmin) {
    const id = Number(identifier);
    if (Number.isNaN(id)) {
      throw new HttpError('Invalid ID', { status: HttpStatus.BAD_REQUEST });
    }

    const category = categoryQueries.getCategoryById(id);
    if (!category) {
      throw new HttpError('Category not found', { status: HttpStatus.NOT_FOUND });
    }

    return {
      status: HttpStatus.OK,
      data: {
        category: formatAdminCategory(category)
      }
    };
  }

  const lang = getQueryParam(req, 'lang');
  const defaultLanguage = languageQueries.getDefaultLanguage();
  const fallback = defaultLanguage?.code ?? 'en';

  const category = categoryQueries.getCategoryBySlug(identifier);
  if (!category) {
    throw new HttpError('Category not found', { status: HttpStatus.NOT_FOUND });
  }

  const formatted = formatPublicCategory(category, lang ?? fallback, fallback);
  if (!formatted) {
    throw new HttpError('Category not found', { status: HttpStatus.NOT_FOUND });
  }

  const { posts } = postQueries.listPostsPaginated({
    status: 'published',
    categoryId: category.id,
    language: lang ?? fallback,
    limit: 100,
    offset: 0
  });

  const postsFormatted = posts
    .map((post) => {
      const translation =
        post.translations.find((t) => t.language === (lang ?? fallback)) ??
        post.translations.find((t) => t.language === fallback) ??
        post.translations[0];

      if (!translation) {
        return null;
      }

      return {
        id: post.id,
        slug: post.slug,
        title: translation.title,
        excerpt: translation.excerpt,
        publishedAt: post.published_at,
        featuredImage: post.featured_image
      };
    })
    .filter((post): post is NonNullable<typeof post> => Boolean(post));

  return {
    status: HttpStatus.OK,
    data: {
      category: formatted,
      posts: postsFormatted
    }
  };
}

function handleCreateCategory(req: RequestContext['request']): HandlerResult {
  const parsed = createCategorySchema.safeParse(req.body);
  if (!parsed.success) {
    throw new HttpError('Invalid data', {
      status: HttpStatus.BAD_REQUEST,
      details: parsed.error.flatten()
    });
  }

  const created = categoryQueries.createCategory(parsed.data);

  return {
    status: HttpStatus.CREATED,
    data: {
      category: formatAdminCategory(created)
    }
  };
}

function handleUpdateCategory(req: RequestContext['request'], identifier: string): HandlerResult {
  const id = Number(identifier);
  if (Number.isNaN(id)) {
    throw new HttpError('Invalid ID', { status: HttpStatus.BAD_REQUEST });
  }

  const existing = categoryQueries.getCategoryById(id);
  if (!existing) {
    throw new HttpError('Category not found', { status: HttpStatus.NOT_FOUND });
  }

  const parsed = updateCategorySchema.safeParse(req.body);
  if (!parsed.success) {
    throw new HttpError('Invalid data', {
      status: HttpStatus.BAD_REQUEST,
      details: parsed.error.flatten()
    });
  }

  const updated = categoryQueries.updateCategory(id, parsed.data);
  if (!updated) {
    throw new HttpError('Failed to update category', {
      status: HttpStatus.INTERNAL_SERVER_ERROR
    });
  }

  return {
    status: HttpStatus.OK,
    data: {
      category: formatAdminCategory(updated)
    }
  };
}

function handleDeleteCategory(identifier: string): HandlerResult {
  const id = Number(identifier);
  if (Number.isNaN(id)) {
    throw new HttpError('Invalid ID', { status: HttpStatus.BAD_REQUEST });
  }

  const existing = categoryQueries.getCategoryById(id);
  if (!existing) {
    throw new HttpError('Category not found', { status: HttpStatus.NOT_FOUND });
  }

  categoryQueries.deleteCategory(id);

  return {
    status: HttpStatus.NO_CONTENT
  };
}

function ensureAdmin(ctx: RequestContext) {
  if (!ctx.user || ctx.user.role !== 'admin') {
    throw new HttpError('Permission denied', { status: HttpStatus.FORBIDDEN });
  }
}

function formatAdminCategory(category: CategoryWithTranslations) {
  return {
    id: category.id,
    slug: category.slug,
    createdAt: category.created_at,
    translations: category.translations.map((translation) => ({
      id: translation.id,
      language: translation.language,
      name: translation.name,
      description: translation.description
    }))
  };
}

function formatPublicCategory(
  category: CategoryWithTranslations,
  language: string,
  fallbackLanguage: string
) {
  const translation =
    category.translations.find((t) => t.language === language) ??
    category.translations.find((t) => t.language === fallbackLanguage) ??
    category.translations[0];

  if (!translation) {
    return null;
  }

  return {
    id: category.id,
    slug: category.slug,
    name: translation.name,
    description: translation.description
  };
}

