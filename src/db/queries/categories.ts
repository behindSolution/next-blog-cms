import type { SqliteDatabase } from '../index';
import { getDatabase } from '../index';

export interface CategoryRecord {
  id: number;
  slug: string;
  created_at: string;
}

export interface CategoryTranslationRecord {
  id: number;
  category_id: number;
  language: string;
  name: string;
  description: string | null;
}

export interface CategoryTranslationInput {
  language: string;
  name: string;
  description?: string | null;
}

export interface CategoryWithTranslations extends CategoryRecord {
  translations: CategoryTranslationRecord[];
}

interface CreateCategoryInput {
  slug: string;
  translations: CategoryTranslationInput[];
}

interface UpdateCategoryInput {
  slug?: string;
  translations?: CategoryTranslationInput[];
}

function db(): SqliteDatabase {
  return getDatabase();
}

function fetchCategoryTranslations(categoryId: number): CategoryTranslationRecord[] {
  return db()
    .prepare(
      `SELECT id, category_id, language, name, description
       FROM category_translations
       WHERE category_id = ?
       ORDER BY language ASC`
    )
    .all(categoryId) as CategoryTranslationRecord[];
}

function mapCategory(record: CategoryRecord): CategoryWithTranslations {
  return {
    ...record,
    translations: fetchCategoryTranslations(record.id)
  };
}

export function getCategoryById(id: number): CategoryWithTranslations | null {
  const row = db()
    .prepare('SELECT id, slug, created_at FROM categories WHERE id = ?')
    .get(id) as CategoryRecord | undefined;

  if (!row) {
    return null;
  }

  return mapCategory(row);
}

export function getCategoryBySlug(slug: string): CategoryWithTranslations | null {
  const row = db()
    .prepare('SELECT id, slug, created_at FROM categories WHERE slug = ?')
    .get(slug) as CategoryRecord | undefined;

  if (!row) {
    return null;
  }

  return mapCategory(row);
}

export function listCategories(): CategoryWithTranslations[] {
  const rows = db()
    .prepare('SELECT id, slug, created_at FROM categories ORDER BY created_at DESC')
    .all() as CategoryRecord[];

  return rows.map(mapCategory);
}

export function createCategory(input: CreateCategoryInput): CategoryWithTranslations {
  const insert = db().transaction((payload: CreateCategoryInput) => {
    const result = db()
      .prepare('INSERT INTO categories (slug) VALUES (?)')
      .run(payload.slug);

    const categoryId = Number(result.lastInsertRowid);

    const insertTranslation = db().prepare(
      `INSERT INTO category_translations (category_id, language, name, description)
       VALUES (@categoryId, @language, @name, @description)`
    );

    for (const translation of payload.translations) {
      insertTranslation.run({
        categoryId,
        language: translation.language,
        name: translation.name,
        description: translation.description ?? null
      });
    }

    const category = getCategoryById(categoryId);
    if (!category) {
      throw new Error('Failed to create category');
    }

    return category;
  });

  return insert(input);
}

export function updateCategory(id: number, input: UpdateCategoryInput): CategoryWithTranslations | null {
  const update = db().transaction((payload: UpdateCategoryInput) => {
    if (typeof payload.slug !== 'undefined') {
      db()
        .prepare('UPDATE categories SET slug = ? WHERE id = ?')
        .run(payload.slug, id);
    }

    if (payload.translations) {
      db().prepare('DELETE FROM category_translations WHERE category_id = ?').run(id);

      const insertTranslation = db().prepare(
        `INSERT INTO category_translations (category_id, language, name, description)
         VALUES (@categoryId, @language, @name, @description)`
      );

      for (const translation of payload.translations) {
        insertTranslation.run({
          categoryId: id,
          language: translation.language,
          name: translation.name,
          description: translation.description ?? null
        });
      }
    }

    return getCategoryById(id);
  });

  return update(input);
}

export function deleteCategory(id: number) {
  db().prepare('DELETE FROM categories WHERE id = ?').run(id);
}

export function listCategoriesByLanguage(language: string): Array<{
  category: CategoryRecord;
  translation: CategoryTranslationRecord | null;
}> {
  const rows = db()
    .prepare(
      `SELECT
        c.id as c_id,
        c.slug as c_slug,
        c.created_at as c_created_at,
        ct.id as ct_id,
        ct.language as ct_language,
        ct.name as ct_name,
        ct.description as ct_description
       FROM categories c
       LEFT JOIN category_translations ct
         ON ct.category_id = c.id AND ct.language = ?
       ORDER BY c.created_at DESC`
    )
    .all(language) as Array<{
    c_id: number;
    c_slug: string;
    c_created_at: string;
    ct_id: number | null;
    ct_language: string | null;
    ct_name: string | null;
    ct_description: string | null;
  }>;

  return rows.map((row) => ({
    category: {
      id: row.c_id,
      slug: row.c_slug,
      created_at: row.c_created_at
    },
    translation:
      row.ct_id != null
        ? {
            id: row.ct_id,
            category_id: row.c_id,
            language: row.ct_language ?? language,
            name: row.ct_name ?? '',
            description: row.ct_description
          }
        : null
  }));
}

