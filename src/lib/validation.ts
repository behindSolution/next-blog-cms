import { z } from 'zod';

export const languageCodeSchema = z
  .string()
  .min(2)
  .max(5)
  .regex(/^[a-z]{2,5}$/i, 'Invalid language code');

export const blogStatusSchema = z.enum(['draft', 'published']);

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional()
});

export const postTranslationSchema = z.object({
  language: languageCodeSchema,
  title: z.string().min(1),
  content: z.string().min(1),
  excerpt: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional()
});

export const categoryTranslationSchema = z.object({
  language: languageCodeSchema,
  name: z.string().min(1),
  description: z.string().optional()
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  remember: z.boolean().optional()
});

export const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['admin', 'author']).optional()
});

export const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  role: z.enum(['admin', 'author']).optional()
});

export const createCategorySchema = z.object({
  slug: z.string().min(1),
  translations: z.array(categoryTranslationSchema).min(1)
});

export const updateCategorySchema = z.object({
  slug: z.string().min(1).optional(),
  translations: z.array(categoryTranslationSchema).min(1).optional()
});

export const withOptionalDateTime = (schema: z.ZodString) =>
  schema.refine((value) => {
    if (!value) return true;
    const timestamp = Date.parse(value);
    return !Number.isNaN(timestamp);
  }, 'Invalid datetime');

const optionalDatetime = z
  .string()
  .refine((value) => {
    if (value === undefined || value === null || value === '') return true;
    const timestamp = Date.parse(value);
    return !Number.isNaN(timestamp);
  }, 'Invalid datetime')
  .optional();

export const createPostSchema = z.object({
  slug: z.string().min(1),
  categoryId: z.number().int().positive().nullable().optional(),
  featuredImage: z.string().url().nullable().optional(),
  status: blogStatusSchema.optional(),
  publishedAt: optionalDatetime,
  translations: z.array(postTranslationSchema).min(1)
});

export const updatePostSchema = z.object({
  slug: z.string().min(1).optional(),
  categoryId: z.number().int().positive().nullable().optional(),
  featuredImage: z.string().url().nullable().optional(),
  status: blogStatusSchema.optional(),
  publishedAt: optionalDatetime,
  translations: z.array(postTranslationSchema).min(1).optional()
});

export const upsertLanguageSchema = z.object({
  code: languageCodeSchema,
  name: z.string().min(1),
  enabled: z.boolean().optional(),
  isDefault: z.boolean().optional()
});

export const updateLanguageSchema = z.object({
  name: z.string().min(1).optional(),
  enabled: z.boolean().optional(),
  isDefault: z.boolean().optional()
});

