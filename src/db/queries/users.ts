import type { SqliteDatabase } from '../index';
import { getDatabase } from '../index';

export type UserRole = 'admin' | 'author';

export interface BlogUserRecord {
  id: number;
  email: string;
  name: string;
  password_hash: string;
  role: UserRole;
  created_at: string;
}

export interface CreateUserInput {
  email: string;
  name: string;
  passwordHash: string;
  role?: UserRole;
}

export interface UpdateUserInput {
  email?: string;
  name?: string;
  passwordHash?: string;
  role?: UserRole;
}

function mapUserRow(row: BlogUserRecord | undefined): BlogUserRecord | null {
  return row ?? null;
}

function db(): SqliteDatabase {
  return getDatabase();
}

export function createUser(input: CreateUserInput): BlogUserRecord {
  const result = db()
    .prepare(
      `INSERT INTO blog_users (email, name, password_hash, role)
       VALUES (@email, @name, @password_hash, @role)`
    )
    .run({
      email: input.email,
      name: input.name,
      password_hash: input.passwordHash,
      role: input.role ?? 'author'
    });

  const created = getUserById(Number(result.lastInsertRowid));
  if (!created) {
    throw new Error('Failed to create blog user');
  }

  return created;
}

export function getUserById(id: number): BlogUserRecord | null {
  const row = db()
    .prepare('SELECT id, email, name, password_hash, role, created_at FROM blog_users WHERE id = ?')
    .get(id) as BlogUserRecord | undefined;

  return mapUserRow(row);
}

export function getUserByEmail(email: string): BlogUserRecord | null {
  const row = db()
    .prepare(
      'SELECT id, email, name, password_hash, role, created_at FROM blog_users WHERE email = ?'
    )
    .get(email) as BlogUserRecord | undefined;

  return mapUserRow(row);
}

export function listUsers(): BlogUserRecord[] {
  return db()
    .prepare(
      'SELECT id, email, name, password_hash, role, created_at FROM blog_users ORDER BY created_at DESC'
    )
    .all() as BlogUserRecord[];
}

export function updateUser(id: number, input: UpdateUserInput): BlogUserRecord | null {
  const fields: string[] = [];
  const params: Record<string, unknown> = { id };

  if (typeof input.email !== 'undefined') {
    fields.push('email = @email');
    params.email = input.email;
  }

  if (typeof input.name !== 'undefined') {
    fields.push('name = @name');
    params.name = input.name;
  }

  if (typeof input.passwordHash !== 'undefined') {
    fields.push('password_hash = @password_hash');
    params.password_hash = input.passwordHash;
  }

  if (typeof input.role !== 'undefined') {
    fields.push('role = @role');
    params.role = input.role;
  }

  if (fields.length === 0) {
    return getUserById(id);
  }

  db()
    .prepare(`UPDATE blog_users SET ${fields.join(', ')} WHERE id = @id`)
    .run(params);

  return getUserById(id);
}

export function deleteUser(id: number): void {
  db().prepare('DELETE FROM blog_users WHERE id = ?').run(id);
}

export function countAdmins(): number {
  const row = db()
    .prepare("SELECT COUNT(*) as count FROM blog_users WHERE role = 'admin'")
    .get() as { count: number } | undefined;

  return row?.count ?? 0;
}

