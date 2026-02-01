export const CREATE_BLOG_USERS_TABLE = `
CREATE TABLE IF NOT EXISTS blog_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'author',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;

export const CREATE_CATEGORIES_TABLE = `
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;

export const CREATE_CATEGORY_TRANSLATIONS_TABLE = `
CREATE TABLE IF NOT EXISTS category_translations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER NOT NULL,
  language TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
  UNIQUE(category_id, language)
);
`;

export const CREATE_POSTS_TABLE = `
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  author_id INTEGER NOT NULL,
  category_id INTEGER,
  featured_image TEXT,
  status TEXT DEFAULT 'draft',
  published_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES blog_users(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);
`;

export const CREATE_POST_TRANSLATIONS_TABLE = `
CREATE TABLE IF NOT EXISTS post_translations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL,
  language TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  meta_title TEXT,
  meta_description TEXT,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  UNIQUE(post_id, language)
);
`;

export const CREATE_LANGUAGES_TABLE = `
CREATE TABLE IF NOT EXISTS languages (
  code TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  is_default INTEGER DEFAULT 0,
  enabled INTEGER DEFAULT 1
);
`;

export const CREATE_BLOG_MIGRATIONS_TABLE = `
CREATE TABLE IF NOT EXISTS blog_migrations (
  id TEXT PRIMARY KEY,
  applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;

export const CREATE_POSTS_UPDATED_TRIGGER = `
CREATE TRIGGER IF NOT EXISTS posts_updated_at_trigger
AFTER UPDATE ON posts
FOR EACH ROW
BEGIN
  UPDATE posts SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;
`;

export const CREATE_INDEXES = `
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at);
CREATE INDEX IF NOT EXISTS idx_post_translations_language ON post_translations(language);
CREATE INDEX IF NOT EXISTS idx_category_translations_language ON category_translations(language);
CREATE INDEX IF NOT EXISTS idx_posts_author_id ON posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_category_id ON posts(category_id);
`;

export const INSERT_DEFAULT_LANGUAGES = `
INSERT INTO languages (code, name, is_default, enabled)
VALUES ('en', 'English', 1, 1)
ON CONFLICT(code) DO NOTHING;

INSERT INTO languages (code, name, is_default, enabled)
VALUES ('pt', 'Portuguese', 0, 1)
ON CONFLICT(code) DO NOTHING;
`;

