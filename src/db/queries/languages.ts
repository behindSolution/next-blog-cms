import type { Language } from '../../types';
import type { SqliteDatabase } from '../index';
import { getDatabase } from '../index';

export interface LanguageRecord {
  code: string;
  name: string;
  is_default: number;
  enabled: number;
}

export interface UpsertLanguageInput {
  code: string;
  name: string;
  enabled?: boolean;
  isDefault?: boolean;
}

function db(): SqliteDatabase {
  return getDatabase();
}

function toLanguage(record: LanguageRecord): Language {
  return {
    code: record.code,
    name: record.name,
    isDefault: Boolean(record.is_default),
    enabled: Boolean(record.enabled)
  };
}

export function listLanguages(): Language[] {
  const rows = db()
    .prepare(
      `SELECT code, name, is_default, enabled
       FROM languages
       ORDER BY is_default DESC, name ASC`
    )
    .all() as LanguageRecord[];

  return rows.map(toLanguage);
}

export function getLanguage(code: string): Language | null {
  const row = db()
    .prepare(
      `SELECT code, name, is_default, enabled
       FROM languages
       WHERE code = ?`
    )
    .get(code) as LanguageRecord | undefined;

  return row ? toLanguage(row) : null;
}

export function getDefaultLanguage(): Language | null {
  const row = db()
    .prepare(
      `SELECT code, name, is_default, enabled
       FROM languages
       ORDER BY is_default DESC
       LIMIT 1`
    )
    .get() as LanguageRecord | undefined;

  return row ? toLanguage(row) : null;
}

export function upsertLanguage(input: UpsertLanguageInput): Language {
  const operation = db().transaction((payload: UpsertLanguageInput) => {
    const existing = getLanguage(payload.code);

    const enabled =
      typeof payload.enabled === 'undefined'
        ? existing?.enabled ?? true
        : payload.enabled;

    const isDefault =
      typeof payload.isDefault === 'undefined'
        ? existing?.isDefault ?? false
        : payload.isDefault;

    if (isDefault) {
      db().prepare('UPDATE languages SET is_default = 0').run();
    }

    db()
      .prepare(
        `INSERT INTO languages (code, name, enabled, is_default)
         VALUES (@code, @name, @enabled, @isDefault)
         ON CONFLICT(code) DO UPDATE SET
           name = excluded.name,
           enabled = excluded.enabled,
           is_default = excluded.is_default`
      )
      .run({
        code: payload.code,
        name: payload.name,
        enabled: enabled ? 1 : 0,
        isDefault: isDefault ? 1 : 0
      });

    return getLanguage(payload.code);
  });

  const language = operation(input);
  if (!language) {
    throw new Error('Failed to update language');
  }

  return language;
}

export function deleteLanguage(code: string) {
  db().prepare('DELETE FROM languages WHERE code = ?').run(code);
}

export function setDefaultLanguage(code: string) {
  const transaction = db().transaction((languageCode: string) => {
    db().prepare('UPDATE languages SET is_default = 0').run();
    db()
      .prepare('UPDATE languages SET is_default = 1, enabled = 1 WHERE code = ?')
      .run(languageCode);
  });

  transaction(code);
}

