import type { Database } from 'better-sqlite3';
import { getBlogConfig } from '../config';

import {
  CREATE_BLOG_MIGRATIONS_TABLE,
  CREATE_BLOG_USERS_TABLE,
  CREATE_CATEGORIES_TABLE,
  CREATE_CATEGORY_TRANSLATIONS_TABLE,
  CREATE_INDEXES,
  CREATE_LANGUAGES_TABLE,
  CREATE_POSTS_TABLE,
  CREATE_POSTS_UPDATED_TRIGGER,
  CREATE_POST_TRANSLATIONS_TABLE,
  INSERT_DEFAULT_LANGUAGES
} from './schema';

export interface Migration {
  id: string;
  up: (db: Database) => void;
}

const BASE_MIGRATION_ID = '0001_initial_schema';

const migrations: Migration[] = [
  {
    id: BASE_MIGRATION_ID,
    up: (db) => {
      db.exec([
        CREATE_BLOG_USERS_TABLE,
        CREATE_CATEGORIES_TABLE,
        CREATE_CATEGORY_TRANSLATIONS_TABLE,
        CREATE_POSTS_TABLE,
        CREATE_POST_TRANSLATIONS_TABLE,
        CREATE_LANGUAGES_TABLE,
        CREATE_POSTS_UPDATED_TRIGGER,
        CREATE_INDEXES,
        INSERT_DEFAULT_LANGUAGES
      ].join('\n'));
    }
  }
];

function ensureMigrationsTable(db: Database) {
  db.exec(CREATE_BLOG_MIGRATIONS_TABLE);
}

function hasMigration(db: Database, id: string): boolean {
  const row = db.prepare('SELECT id FROM blog_migrations WHERE id = ?').get(id) as
    | { id: string }
    | undefined;
  return Boolean(row);
}

function markMigration(db: Database, id: string) {
  db.prepare('INSERT INTO blog_migrations (id) VALUES (?)').run(id);
}

export function runMigrations(db: Database) {
  ensureMigrationsTable(db);

  const apply = db.transaction((migration: Migration) => {
    migration.up(db);
    markMigration(db, migration.id);
  });

  for (const migration of migrations) {
    if (!hasMigration(db, migration.id)) {
      apply(migration);
    }
  }

  applyConfigurationOverrides(db);
}

function applyConfigurationOverrides(db: Database) {
  synchronizeLanguages(db);
}

function synchronizeLanguages(db: Database) {
  const config = getBlogConfig();
  const configuredLanguages = Array.from(
    new Set([
      config.languages.default,
      ...config.languages.available
    ])
  );

  if (configuredLanguages.length === 0) {
    return;
  }

  // Get existing languages from database
  const existingLanguages = db
    .prepare('SELECT code, enabled, is_default FROM languages')
    .all() as Array<{ code: string; enabled: number; is_default: number }>;

  // Only reset is_default flag to apply the new default from config
  db.prepare('UPDATE languages SET is_default = 0').run();

  const upsert = db.prepare(
    `INSERT INTO languages (code, name, is_default, enabled)
     VALUES (@code, @name, @is_default, @enabled)
     ON CONFLICT(code) DO UPDATE SET
       name = COALESCE(excluded.name, languages.name),
       is_default = excluded.is_default,
       enabled = CASE
         WHEN languages.enabled = 1 THEN 1
         ELSE excluded.enabled
       END`
  );

  for (const code of configuredLanguages) {
    const normalizedCode = code.trim();
    if (!normalizedCode) {
      continue;
    }

    const isDefault = normalizedCode === config.languages.default;
    const existing = existingLanguages.find((l) => l.code === normalizedCode);

    // Preserve user's enabled choice, or default to enabled for configured languages
    const isEnabled = existing ? Boolean(existing.enabled) : true;

    upsert.run({
      code: normalizedCode,
      name: resolveLanguageName(normalizedCode),
      is_default: isDefault ? 1 : 0,
      enabled: isEnabled ? 1 : 0
    });
  }
}

function resolveLanguageName(code: string): string {
  try {
    const displayNames = new Intl.DisplayNames([code], { type: 'language' });
    const resolved = displayNames.of(code);
    if (resolved) {
      return resolved;
    }
  } catch (error) {
    // Intl.DisplayNames may be unavailable; ignore and fallback
  }

  return code.toUpperCase();
}

