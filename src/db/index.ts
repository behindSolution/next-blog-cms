import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';

import { runMigrations } from './migrations';
import { getBlogConfig } from '../config';

export type SqliteDatabase = Database.Database;

const DEFAULT_DB_FILENAME = 'blog.db';
const DB_PATH_ENV_VARS = ['NEXT_BLOG_DB_PATH', 'BLOG_DB_PATH'];

let dbInstance: SqliteDatabase | null = null;

function resolveDatabasePath(): string {
  for (const envVar of DB_PATH_ENV_VARS) {
    const candidate = process.env[envVar];
    if (candidate) {
      return path.resolve(candidate);
    }
  }

  const configPath = getBlogConfig().database.path;
  if (configPath) {
    return path.resolve(process.cwd(), configPath);
  }

  return path.resolve(process.cwd(), DEFAULT_DB_FILENAME);
}

function ensureDirectory(filePath: string) {
  const directory = path.dirname(filePath);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

function createDatabaseInstance(): SqliteDatabase {
  const dbPath = resolveDatabasePath();
  ensureDirectory(dbPath);

  const db = new Database(dbPath);
  db.pragma('foreign_keys = ON');
  db.pragma('journal_mode = WAL');
  db.pragma('synchronous = NORMAL');

  runMigrations(db);

  return db;
}

export function getDatabase(): SqliteDatabase {
  if (!dbInstance) {
    dbInstance = createDatabaseInstance();
  }

  return dbInstance;
}

export function closeDatabase() {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
  }
}

