'use strict';

var Database = require('better-sqlite3');
var fs = require('fs');
var path2 = require('path');
var module$1 = require('module');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var zod = require('zod');
var react = require('react');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var Database__default = /*#__PURE__*/_interopDefault(Database);
var fs__default = /*#__PURE__*/_interopDefault(fs);
var path2__default = /*#__PURE__*/_interopDefault(path2);
var bcrypt__default = /*#__PURE__*/_interopDefault(bcrypt);
var jwt__default = /*#__PURE__*/_interopDefault(jwt);

var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/lib/http.ts
var HttpStatus = /* @__PURE__ */ ((HttpStatus2) => {
  HttpStatus2[HttpStatus2["OK"] = 200] = "OK";
  HttpStatus2[HttpStatus2["CREATED"] = 201] = "CREATED";
  HttpStatus2[HttpStatus2["NO_CONTENT"] = 204] = "NO_CONTENT";
  HttpStatus2[HttpStatus2["BAD_REQUEST"] = 400] = "BAD_REQUEST";
  HttpStatus2[HttpStatus2["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
  HttpStatus2[HttpStatus2["FORBIDDEN"] = 403] = "FORBIDDEN";
  HttpStatus2[HttpStatus2["NOT_FOUND"] = 404] = "NOT_FOUND";
  HttpStatus2[HttpStatus2["METHOD_NOT_ALLOWED"] = 405] = "METHOD_NOT_ALLOWED";
  HttpStatus2[HttpStatus2["CONFLICT"] = 409] = "CONFLICT";
  HttpStatus2[HttpStatus2["TOO_MANY_REQUESTS"] = 429] = "TOO_MANY_REQUESTS";
  HttpStatus2[HttpStatus2["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
  return HttpStatus2;
})(HttpStatus || {});
var HttpError = class extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = "HttpError";
    this.status = options.status ?? 500 /* INTERNAL_SERVER_ERROR */;
    this.code = options.code;
    this.details = options.details;
  }
};
function createResponse(data, init) {
  const status = init?.status ?? 200 /* OK */;
  const headers = new Headers(init?.headers ?? {});
  if (status === 204 /* NO_CONTENT */) {
    headers.delete("Content-Type");
    return new Response(null, {
      ...init,
      status,
      headers
    });
  }
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  return new Response(JSON.stringify(data), {
    ...init,
    status,
    headers
  });
}
function createErrorResponse(error) {
  if (error instanceof HttpError) {
    return createResponse(
      {
        error: {
          message: error.message,
          code: error.code,
          details: error.details
        }
      },
      {
        status: error.status
      }
    );
  }
  console.error("[next-blog-cms] Erro interno na API:", error);
  return createResponse(
    {
      error: {
        message: "Erro interno do servidor"
      }
    },
    {
      status: 500 /* INTERNAL_SERVER_ERROR */
    }
  );
}

// src/db/queries/users.ts
var users_exports = {};
__export(users_exports, {
  countAdmins: () => countAdmins,
  createUser: () => createUser,
  deleteUser: () => deleteUser,
  getUserByEmail: () => getUserByEmail,
  getUserById: () => getUserById,
  listUsers: () => listUsers,
  updateUser: () => updateUser
});
var defaultBlogConfig = {
  database: { path: "./blog.db" },
  languages: { default: "en", available: ["en", "pt"] },
  auth: { jwtSecret: process.env.BLOG_JWT_SECRET ?? "change-me", sessionDuration: 7 },
  theme: { primaryColor: "#3b82f6" },
  ai: {}
};
var cachedConfig = null;
var configFilePath = null;
var configFileTimestamp = null;
var requireFromPath = (filePath) => {
  try {
    const require2 = module$1.createRequire((typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('index.cjs', document.baseURI).href)));
    return require2(filePath);
  } catch (error) {
    if (filePath.endsWith(".cjs")) {
      const code = fs__default.default.readFileSync(filePath, "utf8");
      const module = { exports: {} };
      const func = new Function("module", "exports", "require", code);
      func(module, module.exports, module$1.createRequire(filePath));
      return module.exports;
    }
    throw error;
  }
};
function getBlogConfig() {
  if (cachedConfig && configFilePath && configFileTimestamp) {
    try {
      const currentTimestamp = fs__default.default.statSync(configFilePath).mtimeMs;
      if (currentTimestamp === configFileTimestamp) {
        return cachedConfig;
      }
      console.log("[next-blog-cms] Config file changed, reloading...");
      cachedConfig = null;
    } catch {
      cachedConfig = null;
    }
  }
  const userConfig = loadUserConfig();
  cachedConfig = mergeConfig(defaultBlogConfig, userConfig);
  return cachedConfig;
}
function loadUserConfig() {
  const cwd = process.cwd();
  const candidates = ["blog.config.js", "blog.config.cjs", "blog.config.json"];
  for (const candidate of candidates) {
    const filePath = path2__default.default.resolve(cwd, candidate);
    if (!fs__default.default.existsSync(filePath)) {
      continue;
    }
    try {
      if (filePath.endsWith(".json")) {
        const raw = fs__default.default.readFileSync(filePath, "utf8");
        configFilePath = filePath;
        configFileTimestamp = fs__default.default.statSync(filePath).mtimeMs;
        return JSON.parse(raw);
      }
      if (filePath.endsWith(".cjs") || filePath.endsWith(".js")) {
        const loaded = requireFromPath(filePath);
        configFilePath = filePath;
        configFileTimestamp = fs__default.default.statSync(filePath).mtimeMs;
        if (loaded && typeof loaded === "object") {
          console.log("[next-blog-cms] Successfully loaded config from", candidate);
          return loaded.default ?? loaded;
        }
      }
    } catch (error) {
      console.warn(`[next-blog-cms] Unable to load ${candidate}:`, error);
    }
  }
  console.warn("[next-blog-cms] No config file found, using defaults");
  return void 0;
}
function mergeConfig(defaults, overrides) {
  const merged = {
    database: {
      ...defaults.database,
      ...overrides?.database ?? {}
    },
    languages: {
      default: overrides?.languages?.default ?? defaults.languages.default,
      available: overrides?.languages?.available ?? defaults.languages.available
    },
    auth: {
      jwtSecret: overrides?.auth?.jwtSecret ?? defaults.auth.jwtSecret,
      sessionDuration: overrides?.auth?.sessionDuration ?? defaults.auth.sessionDuration
    },
    theme: {
      ...defaults.theme,
      ...overrides?.theme ?? {}
    },
    ai: {
      translator: overrides?.ai?.translator ?? defaults.ai.translator
    }
  };
  if (!merged.languages.available.includes(merged.languages.default)) {
    merged.languages.available = [
      merged.languages.default,
      ...merged.languages.available
    ];
  }
  merged.languages.available = Array.from(
    new Set(merged.languages.available.map((code) => code.trim()).filter(Boolean))
  );
  return merged;
}

// src/db/schema.ts
var CREATE_BLOG_USERS_TABLE = `
CREATE TABLE IF NOT EXISTS blog_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'author',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;
var CREATE_CATEGORIES_TABLE = `
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;
var CREATE_CATEGORY_TRANSLATIONS_TABLE = `
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
var CREATE_POSTS_TABLE = `
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
var CREATE_POST_TRANSLATIONS_TABLE = `
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
var CREATE_LANGUAGES_TABLE = `
CREATE TABLE IF NOT EXISTS languages (
  code TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  is_default INTEGER DEFAULT 0,
  enabled INTEGER DEFAULT 1
);
`;
var CREATE_BLOG_MIGRATIONS_TABLE = `
CREATE TABLE IF NOT EXISTS blog_migrations (
  id TEXT PRIMARY KEY,
  applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;
var CREATE_POSTS_UPDATED_TRIGGER = `
CREATE TRIGGER IF NOT EXISTS posts_updated_at_trigger
AFTER UPDATE ON posts
FOR EACH ROW
BEGIN
  UPDATE posts SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;
`;
var CREATE_INDEXES = `
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at);
CREATE INDEX IF NOT EXISTS idx_post_translations_language ON post_translations(language);
CREATE INDEX IF NOT EXISTS idx_category_translations_language ON category_translations(language);
CREATE INDEX IF NOT EXISTS idx_posts_author_id ON posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_category_id ON posts(category_id);
`;
var INSERT_DEFAULT_LANGUAGES = `
INSERT INTO languages (code, name, is_default, enabled)
VALUES ('en', 'English', 1, 1)
ON CONFLICT(code) DO NOTHING;

INSERT INTO languages (code, name, is_default, enabled)
VALUES ('pt', 'Portuguese', 0, 1)
ON CONFLICT(code) DO NOTHING;
`;

// src/db/migrations.ts
var BASE_MIGRATION_ID = "0001_initial_schema";
var migrations = [
  {
    id: BASE_MIGRATION_ID,
    up: (db5) => {
      db5.exec([
        CREATE_BLOG_USERS_TABLE,
        CREATE_CATEGORIES_TABLE,
        CREATE_CATEGORY_TRANSLATIONS_TABLE,
        CREATE_POSTS_TABLE,
        CREATE_POST_TRANSLATIONS_TABLE,
        CREATE_LANGUAGES_TABLE,
        CREATE_POSTS_UPDATED_TRIGGER,
        CREATE_INDEXES,
        INSERT_DEFAULT_LANGUAGES
      ].join("\n"));
    }
  }
];
function ensureMigrationsTable(db5) {
  db5.exec(CREATE_BLOG_MIGRATIONS_TABLE);
}
function hasMigration(db5, id) {
  const row = db5.prepare("SELECT id FROM blog_migrations WHERE id = ?").get(id);
  return Boolean(row);
}
function markMigration(db5, id) {
  db5.prepare("INSERT INTO blog_migrations (id) VALUES (?)").run(id);
}
function runMigrations(db5) {
  ensureMigrationsTable(db5);
  const apply = db5.transaction((migration) => {
    migration.up(db5);
    markMigration(db5, migration.id);
  });
  for (const migration of migrations) {
    if (!hasMigration(db5, migration.id)) {
      apply(migration);
    }
  }
  applyConfigurationOverrides(db5);
}
function applyConfigurationOverrides(db5) {
  synchronizeLanguages(db5);
}
function synchronizeLanguages(db5) {
  const config = getBlogConfig();
  const configuredLanguages = Array.from(
    /* @__PURE__ */ new Set([
      config.languages.default,
      ...config.languages.available
    ])
  );
  if (configuredLanguages.length === 0) {
    return;
  }
  const existingLanguages = db5.prepare("SELECT code, enabled, is_default FROM languages").all();
  db5.prepare("UPDATE languages SET is_default = 0").run();
  const upsert = db5.prepare(
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
    const isEnabled = existing ? Boolean(existing.enabled) : true;
    upsert.run({
      code: normalizedCode,
      name: resolveLanguageName(normalizedCode),
      is_default: isDefault ? 1 : 0,
      enabled: isEnabled ? 1 : 0
    });
  }
}
function resolveLanguageName(code) {
  try {
    const displayNames = new Intl.DisplayNames([code], { type: "language" });
    const resolved = displayNames.of(code);
    if (resolved) {
      return resolved;
    }
  } catch (error) {
  }
  return code.toUpperCase();
}

// src/db/index.ts
var DEFAULT_DB_FILENAME = "blog.db";
var DB_PATH_ENV_VARS = ["NEXT_BLOG_DB_PATH", "BLOG_DB_PATH"];
var dbInstance = null;
function resolveDatabasePath() {
  for (const envVar of DB_PATH_ENV_VARS) {
    const candidate = process.env[envVar];
    if (candidate) {
      return path2__default.default.resolve(candidate);
    }
  }
  const configPath = getBlogConfig().database.path;
  if (configPath) {
    return path2__default.default.resolve(process.cwd(), configPath);
  }
  return path2__default.default.resolve(process.cwd(), DEFAULT_DB_FILENAME);
}
function ensureDirectory(filePath) {
  const directory = path2__default.default.dirname(filePath);
  if (!fs__default.default.existsSync(directory)) {
    fs__default.default.mkdirSync(directory, { recursive: true });
  }
}
function createDatabaseInstance() {
  const dbPath = resolveDatabasePath();
  ensureDirectory(dbPath);
  const db5 = new Database__default.default(dbPath);
  db5.pragma("foreign_keys = ON");
  db5.pragma("journal_mode = WAL");
  db5.pragma("synchronous = NORMAL");
  runMigrations(db5);
  return db5;
}
function getDatabase() {
  if (!dbInstance) {
    dbInstance = createDatabaseInstance();
  }
  return dbInstance;
}

// src/db/queries/users.ts
function mapUserRow(row) {
  return row ?? null;
}
function db() {
  return getDatabase();
}
function createUser(input) {
  const result = db().prepare(
    `INSERT INTO blog_users (email, name, password_hash, role)
       VALUES (@email, @name, @password_hash, @role)`
  ).run({
    email: input.email,
    name: input.name,
    password_hash: input.passwordHash,
    role: input.role ?? "author"
  });
  const created = getUserById(Number(result.lastInsertRowid));
  if (!created) {
    throw new Error("Failed to create blog user");
  }
  return created;
}
function getUserById(id) {
  const row = db().prepare("SELECT id, email, name, password_hash, role, created_at FROM blog_users WHERE id = ?").get(id);
  return mapUserRow(row);
}
function getUserByEmail(email) {
  const row = db().prepare(
    "SELECT id, email, name, password_hash, role, created_at FROM blog_users WHERE email = ?"
  ).get(email);
  return mapUserRow(row);
}
function listUsers() {
  return db().prepare(
    "SELECT id, email, name, password_hash, role, created_at FROM blog_users ORDER BY created_at DESC"
  ).all();
}
function updateUser(id, input) {
  const fields = [];
  const params = { id };
  if (typeof input.email !== "undefined") {
    fields.push("email = @email");
    params.email = input.email;
  }
  if (typeof input.name !== "undefined") {
    fields.push("name = @name");
    params.name = input.name;
  }
  if (typeof input.passwordHash !== "undefined") {
    fields.push("password_hash = @password_hash");
    params.password_hash = input.passwordHash;
  }
  if (typeof input.role !== "undefined") {
    fields.push("role = @role");
    params.role = input.role;
  }
  if (fields.length === 0) {
    return getUserById(id);
  }
  db().prepare(`UPDATE blog_users SET ${fields.join(", ")} WHERE id = @id`).run(params);
  return getUserById(id);
}
function deleteUser(id) {
  db().prepare("DELETE FROM blog_users WHERE id = ?").run(id);
}
function countAdmins() {
  const row = db().prepare("SELECT COUNT(*) as count FROM blog_users WHERE role = 'admin'").get();
  return row?.count ?? 0;
}

// src/db/queries/categories.ts
var categories_exports = {};
__export(categories_exports, {
  createCategory: () => createCategory,
  deleteCategory: () => deleteCategory,
  getCategoryById: () => getCategoryById,
  getCategoryBySlug: () => getCategoryBySlug,
  listCategories: () => listCategories,
  listCategoriesByLanguage: () => listCategoriesByLanguage,
  updateCategory: () => updateCategory
});
function db2() {
  return getDatabase();
}
function fetchCategoryTranslations(categoryId) {
  return db2().prepare(
    `SELECT id, category_id, language, name, description
       FROM category_translations
       WHERE category_id = ?
       ORDER BY language ASC`
  ).all(categoryId);
}
function mapCategory(record) {
  return {
    ...record,
    translations: fetchCategoryTranslations(record.id)
  };
}
function getCategoryById(id) {
  const row = db2().prepare("SELECT id, slug, created_at FROM categories WHERE id = ?").get(id);
  if (!row) {
    return null;
  }
  return mapCategory(row);
}
function getCategoryBySlug(slug) {
  const row = db2().prepare("SELECT id, slug, created_at FROM categories WHERE slug = ?").get(slug);
  if (!row) {
    return null;
  }
  return mapCategory(row);
}
function listCategories() {
  const rows = db2().prepare("SELECT id, slug, created_at FROM categories ORDER BY created_at DESC").all();
  return rows.map(mapCategory);
}
function createCategory(input) {
  const insert = db2().transaction((payload) => {
    const result = db2().prepare("INSERT INTO categories (slug) VALUES (?)").run(payload.slug);
    const categoryId = Number(result.lastInsertRowid);
    const insertTranslation = db2().prepare(
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
      throw new Error("Failed to create category");
    }
    return category;
  });
  return insert(input);
}
function updateCategory(id, input) {
  const update = db2().transaction((payload) => {
    if (typeof payload.slug !== "undefined") {
      db2().prepare("UPDATE categories SET slug = ? WHERE id = ?").run(payload.slug, id);
    }
    if (payload.translations) {
      db2().prepare("DELETE FROM category_translations WHERE category_id = ?").run(id);
      const insertTranslation = db2().prepare(
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
function deleteCategory(id) {
  db2().prepare("DELETE FROM categories WHERE id = ?").run(id);
}
function listCategoriesByLanguage(language) {
  const rows = db2().prepare(
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
  ).all(language);
  return rows.map((row) => ({
    category: {
      id: row.c_id,
      slug: row.c_slug,
      created_at: row.c_created_at
    },
    translation: row.ct_id != null ? {
      id: row.ct_id,
      category_id: row.c_id,
      language: row.ct_language ?? language,
      name: row.ct_name ?? "",
      description: row.ct_description
    } : null
  }));
}

// src/db/queries/posts.ts
var posts_exports = {};
__export(posts_exports, {
  createPost: () => createPost,
  deletePost: () => deletePost,
  getPostById: () => getPostById,
  getPostBySlug: () => getPostBySlug,
  listPosts: () => listPosts,
  listPostsPaginated: () => listPostsPaginated,
  mapPostToDomain: () => mapPostToDomain,
  updatePost: () => updatePost
});
function db3() {
  return getDatabase();
}
function fetchPostTranslations(postId) {
  return db3().prepare(
    `SELECT id, post_id, language, title, content, excerpt, meta_title, meta_description
       FROM post_translations
       WHERE post_id = ?
       ORDER BY language ASC`
  ).all(postId);
}
function mapPost(record) {
  return {
    ...record,
    translations: fetchPostTranslations(record.id)
  };
}
function getPostById(id) {
  const row = db3().prepare(
    `SELECT id, slug, author_id, category_id, featured_image, status,
              published_at, created_at, updated_at
       FROM posts
       WHERE id = ?`
  ).get(id);
  if (!row) {
    return null;
  }
  return mapPost(row);
}
function getPostBySlug(slug) {
  const row = db3().prepare(
    `SELECT id, slug, author_id, category_id, featured_image, status,
              published_at, created_at, updated_at
       FROM posts
       WHERE slug = ?`
  ).get(slug);
  if (!row) {
    return null;
  }
  return mapPost(row);
}
function listPosts() {
  const rows = db3().prepare(
    `SELECT id, slug, author_id, category_id, featured_image, status,
              published_at, created_at, updated_at
       FROM posts
       ORDER BY created_at DESC`
  ).all();
  return rows.map(mapPost);
}
function listPostsPaginated(options = {}) {
  const clauses = [];
  const params = {};
  if (options.status) {
    clauses.push("p.status = @status");
    params.status = options.status;
  }
  if (options.categoryId) {
    clauses.push("p.category_id = @categoryId");
    params.categoryId = options.categoryId;
  }
  if (options.authorId) {
    clauses.push("p.author_id = @authorId");
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
  const whereClause = clauses.length > 0 ? `WHERE ${clauses.join(" AND ")}` : "";
  const baseQuery = `
    FROM posts p
    ${options.language ? "LEFT JOIN post_translations pt ON pt.post_id = p.id AND pt.language = @language" : ""}
    ${whereClause}
  `;
  const totalRow = db3().prepare(`SELECT COUNT(DISTINCT p.id) as count ${baseQuery}`).get(params);
  const orderBy = options.orderBy ?? "created_at";
  const direction = (options.orderDirection ?? "desc").toUpperCase();
  const limit = options.limit ?? 20;
  const offset = options.offset ?? 0;
  const rows = db3().prepare(
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
  ).all({
    ...params,
    limit,
    offset
  });
  return {
    posts: rows.map(mapPost),
    total: totalRow?.count ?? 0
  };
}
function createPost(input) {
  const insert = db3().transaction((payload) => {
    const result = db3().prepare(
      `INSERT INTO posts (
            slug,
            author_id,
            category_id,
            featured_image,
            status,
            published_at
          )
          VALUES (@slug, @authorId, @categoryId, @featuredImage, @status, @publishedAt)`
    ).run({
      slug: payload.slug,
      authorId: payload.authorId,
      categoryId: typeof payload.categoryId === "undefined" ? null : payload.categoryId,
      featuredImage: payload.featuredImage ?? null,
      status: payload.status ?? "draft",
      publishedAt: payload.publishedAt ?? null
    });
    const postId = Number(result.lastInsertRowid);
    const insertTranslation = db3().prepare(
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
      throw new Error("Failed to create post");
    }
    return post;
  });
  return insert(input);
}
function updatePost(id, input) {
  const update = db3().transaction((payload) => {
    const fields = [];
    const params = { id };
    if (typeof payload.slug !== "undefined") {
      fields.push("slug = @slug");
      params.slug = payload.slug;
    }
    if (typeof payload.categoryId !== "undefined") {
      fields.push("category_id = @categoryId");
      params.categoryId = payload.categoryId === null ? null : payload.categoryId;
    }
    if (typeof payload.featuredImage !== "undefined") {
      fields.push("featured_image = @featuredImage");
      params.featuredImage = payload.featuredImage ?? null;
    }
    if (typeof payload.status !== "undefined") {
      fields.push("status = @status");
      params.status = payload.status;
    }
    if (typeof payload.publishedAt !== "undefined") {
      fields.push("published_at = @publishedAt");
      params.publishedAt = payload.publishedAt ?? null;
    }
    if (fields.length > 0) {
      db3().prepare(`UPDATE posts SET ${fields.join(", ")} WHERE id = @id`).run(params);
    }
    if (payload.translations) {
      db3().prepare("DELETE FROM post_translations WHERE post_id = ?").run(id);
      const insertTranslation = db3().prepare(
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
function deletePost(id) {
  db3().prepare("DELETE FROM posts WHERE id = ?").run(id);
}
function mapPostToDomain(post) {
  return {
    id: post.id,
    slug: post.slug,
    authorId: post.author_id,
    categoryId: post.category_id ?? void 0,
    featuredImage: post.featured_image ?? void 0,
    status: post.status,
    publishedAt: post.published_at ?? void 0,
    createdAt: post.created_at,
    updatedAt: post.updated_at,
    translations: post.translations.map((translation) => ({
      language: translation.language,
      title: translation.title,
      content: translation.content,
      excerpt: translation.excerpt ?? void 0,
      metaTitle: translation.meta_title ?? void 0,
      metaDescription: translation.meta_description ?? void 0
    }))
  };
}

// src/db/queries/languages.ts
var languages_exports = {};
__export(languages_exports, {
  deleteLanguage: () => deleteLanguage,
  getDefaultLanguage: () => getDefaultLanguage,
  getLanguage: () => getLanguage,
  listLanguages: () => listLanguages,
  setDefaultLanguage: () => setDefaultLanguage,
  upsertLanguage: () => upsertLanguage
});
function db4() {
  return getDatabase();
}
function toLanguage(record) {
  return {
    code: record.code,
    name: record.name,
    isDefault: Boolean(record.is_default),
    enabled: Boolean(record.enabled)
  };
}
function listLanguages() {
  const rows = db4().prepare(
    `SELECT code, name, is_default, enabled
       FROM languages
       ORDER BY is_default DESC, name ASC`
  ).all();
  return rows.map(toLanguage);
}
function getLanguage(code) {
  const row = db4().prepare(
    `SELECT code, name, is_default, enabled
       FROM languages
       WHERE code = ?`
  ).get(code);
  return row ? toLanguage(row) : null;
}
function getDefaultLanguage() {
  const row = db4().prepare(
    `SELECT code, name, is_default, enabled
       FROM languages
       ORDER BY is_default DESC
       LIMIT 1`
  ).get();
  return row ? toLanguage(row) : null;
}
function upsertLanguage(input) {
  const operation = db4().transaction((payload) => {
    const existing = getLanguage(payload.code);
    const enabled = typeof payload.enabled === "undefined" ? existing?.enabled ?? true : payload.enabled;
    const isDefault = typeof payload.isDefault === "undefined" ? existing?.isDefault ?? false : payload.isDefault;
    if (isDefault) {
      db4().prepare("UPDATE languages SET is_default = 0").run();
    }
    db4().prepare(
      `INSERT INTO languages (code, name, enabled, is_default)
         VALUES (@code, @name, @enabled, @isDefault)
         ON CONFLICT(code) DO UPDATE SET
           name = excluded.name,
           enabled = excluded.enabled,
           is_default = excluded.is_default`
    ).run({
      code: payload.code,
      name: payload.name,
      enabled: enabled ? 1 : 0,
      isDefault: isDefault ? 1 : 0
    });
    return getLanguage(payload.code);
  });
  const language = operation(input);
  if (!language) {
    throw new Error("Failed to update language");
  }
  return language;
}
function deleteLanguage(code) {
  db4().prepare("DELETE FROM languages WHERE code = ?").run(code);
}
function setDefaultLanguage(code) {
  const transaction = db4().transaction((languageCode) => {
    db4().prepare("UPDATE languages SET is_default = 0").run();
    db4().prepare("UPDATE languages SET is_default = 1, enabled = 1 WHERE code = ?").run(languageCode);
  });
  transaction(code);
}

// src/lib/cookies.ts
function parseCookies(cookieHeader) {
  if (!cookieHeader) {
    return {};
  }
  return cookieHeader.split(";").reduce((acc, part) => {
    const [name, ...rest] = part.trim().split("=");
    if (!name) {
      return acc;
    }
    const value = rest.join("=");
    acc[name] = decodeURIComponent(value);
    return acc;
  }, {});
}
function serializeCookie(name, value, options = {}) {
  const segments = [`${name}=${encodeURIComponent(value)}`];
  if (options.maxAge !== void 0) {
    segments.push(`Max-Age=${Math.floor(options.maxAge)}`);
  }
  if (options.path) {
    segments.push(`Path=${options.path}`);
  }
  if (options.httpOnly) {
    segments.push("HttpOnly");
  }
  if (options.secure) {
    segments.push("Secure");
  }
  if (options.sameSite) {
    segments.push(`SameSite=${capitalize(options.sameSite)}`);
  }
  return segments.join("; ");
}
function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}
var DEFAULT_SESSION_DURATION_DAYS = 7;
var DEFAULT_SECRET_FALLBACK = "change-me";
var warnedAboutSecret = false;
function getJwtSecret() {
  const envSecret = process.env.BLOG_JWT_SECRET ?? process.env.JWT_SECRET;
  if (envSecret && envSecret !== DEFAULT_SECRET_FALLBACK) {
    return envSecret;
  }
  const configSecret = getBlogConfig().auth.jwtSecret;
  const secret = configSecret || DEFAULT_SECRET_FALLBACK;
  if ((secret === DEFAULT_SECRET_FALLBACK || !secret) && process.env.NODE_ENV === "production") {
    throw new Error("JWT secret is not configured (set BLOG_JWT_SECRET)");
  }
  if ((secret === DEFAULT_SECRET_FALLBACK || !secret) && !warnedAboutSecret) {
    warnedAboutSecret = true;
    console.warn(
      "[next-blog-cms] Using default JWT secret. Define BLOG_JWT_SECRET to secure your installation."
    );
  }
  return secret ?? DEFAULT_SECRET_FALLBACK;
}
async function hashPassword(password) {
  return bcrypt__default.default.hash(password, 10);
}
async function verifyPassword(password, hash) {
  return bcrypt__default.default.compare(password, hash);
}
function createToken(options) {
  const secret = getJwtSecret();
  const sessionDurationDays = options.sessionDurationDays ?? DEFAULT_SESSION_DURATION_DAYS;
  return jwt__default.default.sign(
    {
      sub: options.userId,
      role: options.role
    },
    secret,
    {
      expiresIn: `${sessionDurationDays}d`
    }
  );
}
function verifyToken(token) {
  try {
    const secret = getJwtSecret();
    const decoded = jwt__default.default.verify(token, secret);
    if (typeof decoded === "string") {
      throw new Error("Invalid token");
    }
    const payload = normalizePayload(decoded);
    if (!payload) {
      throw new Error("Invalid token");
    }
    return {
      valid: true,
      payload
    };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error : new Error("Invalid token")
    };
  }
}
function normalizePayload(value) {
  if (typeof value !== "object" || value === null) {
    return null;
  }
  const sub = typeof value.sub === "string" ? Number(value.sub) : value.sub;
  if (typeof sub !== "number" || Number.isNaN(sub)) {
    return null;
  }
  const role = value.role;
  if (typeof role !== "string") {
    return null;
  }
  const exp = value.exp;
  if (typeof exp !== "number") {
    return null;
  }
  return {
    sub,
    role,
    exp
  };
}
var languageCodeSchema = zod.z.string().min(2).max(5).regex(/^[a-z]{2,5}$/i, "Invalid language code");
var blogStatusSchema = zod.z.enum(["draft", "published"]);
var paginationSchema = zod.z.object({
  page: zod.z.coerce.number().int().min(1).optional(),
  limit: zod.z.coerce.number().int().min(1).max(100).optional()
});
var postTranslationSchema = zod.z.object({
  language: languageCodeSchema,
  title: zod.z.string().min(1),
  content: zod.z.string().min(1),
  excerpt: zod.z.string().optional(),
  metaTitle: zod.z.string().optional(),
  metaDescription: zod.z.string().optional()
});
var categoryTranslationSchema = zod.z.object({
  language: languageCodeSchema,
  name: zod.z.string().min(1),
  description: zod.z.string().optional()
});
var loginSchema = zod.z.object({
  email: zod.z.string().email(),
  password: zod.z.string().min(6),
  remember: zod.z.boolean().optional()
});
var createUserSchema = zod.z.object({
  name: zod.z.string().min(1),
  email: zod.z.string().email(),
  password: zod.z.string().min(6),
  role: zod.z.enum(["admin", "author"]).optional()
});
var updateUserSchema = zod.z.object({
  name: zod.z.string().min(1).optional(),
  email: zod.z.string().email().optional(),
  password: zod.z.string().min(6).optional(),
  role: zod.z.enum(["admin", "author"]).optional()
});
var createCategorySchema = zod.z.object({
  slug: zod.z.string().min(1),
  translations: zod.z.array(categoryTranslationSchema).min(1)
});
var updateCategorySchema = zod.z.object({
  slug: zod.z.string().min(1).optional(),
  translations: zod.z.array(categoryTranslationSchema).min(1).optional()
});
var optionalDatetime = zod.z.string().refine((value) => {
  if (value === void 0 || value === null || value === "") return true;
  const timestamp = Date.parse(value);
  return !Number.isNaN(timestamp);
}, "Invalid datetime").optional();
var createPostSchema = zod.z.object({
  slug: zod.z.string().min(1),
  categoryId: zod.z.number().int().positive().nullable().optional(),
  featuredImage: zod.z.string().url().nullable().optional(),
  status: blogStatusSchema.optional(),
  publishedAt: optionalDatetime,
  translations: zod.z.array(postTranslationSchema).min(1)
});
var updatePostSchema = zod.z.object({
  slug: zod.z.string().min(1).optional(),
  categoryId: zod.z.number().int().positive().nullable().optional(),
  featuredImage: zod.z.string().url().nullable().optional(),
  status: blogStatusSchema.optional(),
  publishedAt: optionalDatetime,
  translations: zod.z.array(postTranslationSchema).min(1).optional()
});
var upsertLanguageSchema = zod.z.object({
  code: languageCodeSchema,
  name: zod.z.string().min(1),
  enabled: zod.z.boolean().optional(),
  isDefault: zod.z.boolean().optional()
});
var updateLanguageSchema = zod.z.object({
  name: zod.z.string().min(1).optional(),
  enabled: zod.z.boolean().optional(),
  isDefault: zod.z.boolean().optional()
});

// src/lib/utils.ts
function resolvePagination(input = {}) {
  const limit = clampNumber(input.limit ?? 20, 1, 100);
  const page = clampNumber(input.page ?? 1, 1, Number.MAX_SAFE_INTEGER);
  return {
    page,
    limit,
    offset: (page - 1) * limit
  };
}
function clampNumber(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
function isObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// src/api/routes/auth.ts
async function handleAuthRoute(req, _ctx) {
  const segments = req.segments.slice(1);
  const action = segments[1];
  if (action === "login" && req.method === "POST") {
    return await handleLogin(req);
  }
  if (action === "logout" && req.method === "POST") {
    return handleLogout(req);
  }
  if (action === "status" && req.method === "GET") {
    return handleStatus(req);
  }
  throw new HttpError("Route not found", { status: 404 /* NOT_FOUND */ });
}
async function handleLogin(req) {
  if (!isObject(req.body)) {
    throw new HttpError("Invalid payload", { status: 400 /* BAD_REQUEST */ });
  }
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new HttpError("Invalid data", {
      status: 400 /* BAD_REQUEST */,
      details: parsed.error.flatten()
    });
  }
  const { email, password, remember } = parsed.data;
  const user = users_exports.getUserByEmail(email);
  if (!user) {
    throw new HttpError("Invalid credentials", { status: 401 /* UNAUTHORIZED */ });
  }
  const validPassword = await verifyPassword(password, user.password_hash);
  if (!validPassword) {
    throw new HttpError("Invalid credentials", { status: 401 /* UNAUTHORIZED */ });
  }
  const sessionDuration = remember ? 15 : 7;
  const token = createToken({
    userId: user.id,
    role: user.role,
    sessionDurationDays: sessionDuration
  });
  const cookie = makeSetCookieHeader(token, req, sessionDuration);
  return {
    status: 200 /* OK */,
    data: {
      user: serializeUser(user)
    },
    cookies: [cookie]
  };
}
function handleLogout(req) {
  const cookie = makeSetCookieHeader("", req, 0);
  return {
    status: 204 /* NO_CONTENT */,
    cookies: [cookie]
  };
}
function handleStatus(req) {
  const adminCount = users_exports.countAdmins();
  const token = req.cookies["next_blog_token"];
  let user = null;
  if (token) {
    const verification = verifyToken(token);
    if (verification.valid && verification.payload) {
      const record = users_exports.getUserById(verification.payload.sub);
      if (record) {
        user = serializeUser(record);
      }
    }
  }
  const config = getBlogConfig();
  const theme = config.theme;
  const aiTranslationEnabled = Boolean(config.ai?.translator);
  return {
    status: 200 /* OK */,
    data: {
      hasUsers: adminCount > 0,
      user,
      theme: {
        primaryColor: theme.primaryColor
      },
      features: {
        aiTranslation: aiTranslationEnabled
      }
    }
  };
}
function serializeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.created_at
  };
}

// src/api/utils/query.ts
function getQueryParam(req, name) {
  const value = req.query[name];
  if (Array.isArray(value)) {
    return value[0] ?? void 0;
  }
  if (typeof value === "string") {
    return value;
  }
  return void 0;
}

// src/api/routes/posts.ts
async function handlePostsRoute(req, ctx) {
  const isAdmin = req.segments[0] === "admin";
  const segments = isAdmin ? req.segments.slice(1) : req.segments;
  if (segments.length === 1) {
    if (req.method === "GET") {
      return handleListPosts(req, ctx, isAdmin);
    }
    if (isAdmin && req.method === "POST") {
      return handleCreatePost(req, ctx);
    }
  }
  if (segments.length === 2) {
    const identifier = segments[1];
    if (req.method === "GET") {
      return handleGetPost(req, ctx, identifier, isAdmin);
    }
    if (isAdmin && req.method === "PUT") {
      return handleUpdatePost(req, ctx, identifier);
    }
    if (isAdmin && req.method === "DELETE") {
      return handleDeletePost(ctx, identifier);
    }
  }
  throw new HttpError("Route not found", { status: 404 /* NOT_FOUND */ });
}
async function handleListPosts(req, ctx, isAdmin) {
  const pagination = paginationSchema.safeParse({
    page: getQueryParam(req, "page"),
    limit: getQueryParam(req, "limit")
  });
  if (!pagination.success) {
    throw new HttpError("Invalid pagination parameters", {
      status: 400 /* BAD_REQUEST */,
      details: pagination.error.flatten()
    });
  }
  const { limit, page, offset } = resolvePagination({
    limit: pagination.data.limit,
    page: pagination.data.page
  });
  const lang = getQueryParam(req, "lang");
  const statusQuery = getQueryParam(req, "status");
  const categorySlug = getQueryParam(req, "category");
  const search = getQueryParam(req, "search");
  let status = isAdmin ? void 0 : "published";
  if (isAdmin && statusQuery && (statusQuery === "draft" || statusQuery === "published")) {
    status = statusQuery;
  }
  let categoryId;
  if (categorySlug) {
    const category = categories_exports.getCategoryBySlug(categorySlug);
    if (!category) {
      return {
        status: 200 /* OK */,
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
  const authorId = isAdmin && ctx.user?.role === "author" ? ctx.user.id : void 0;
  const { posts, total } = posts_exports.listPostsPaginated({
    status,
    categoryId,
    authorId,
    search: search ?? void 0,
    language: lang ?? void 0,
    limit,
    offset,
    orderBy: "created_at"
  });
  if (isAdmin) {
    const data2 = posts.map((post) => formatAdminPost(posts_exports.mapPostToDomain(post)));
    return {
      status: 200 /* OK */,
      data: {
        posts: data2,
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    };
  }
  const defaultLanguage = languages_exports.getDefaultLanguage();
  const defaultCode = defaultLanguage?.code ?? "en";
  const data = posts.map((post) => formatPublicPost(post, lang ?? defaultCode, defaultCode)).filter((post) => Boolean(post));
  return {
    status: 200 /* OK */,
    data: {
      posts: data,
      total,
      page,
      pages: Math.ceil(total / limit)
    }
  };
}
async function handleCreatePost(req, ctx) {
  if (!ctx.user) {
    throw new HttpError("Unauthorized", { status: 401 /* UNAUTHORIZED */ });
  }
  const parsed = createPostSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new HttpError("Invalid data", {
      status: 400 /* BAD_REQUEST */,
      details: parsed.error.flatten()
    });
  }
  const payload = parsed.data;
  const publishedAt = payload.status === "published" && !payload.publishedAt ? (/* @__PURE__ */ new Date()).toISOString() : payload.publishedAt ?? null;
  const created = posts_exports.createPost({
    slug: payload.slug,
    authorId: ctx.user.id,
    categoryId: payload.categoryId ?? null,
    featuredImage: payload.featuredImage ?? null,
    status: payload.status ?? "draft",
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
    status: 201 /* CREATED */,
    data: {
      post: formatAdminPost(posts_exports.mapPostToDomain(created))
    }
  };
}
async function handleGetPost(req, _ctx, identifier, isAdmin) {
  if (isAdmin) {
    const id = Number(identifier);
    if (Number.isNaN(id)) {
      throw new HttpError("Invalid ID", { status: 400 /* BAD_REQUEST */ });
    }
    const post2 = posts_exports.getPostById(id);
    if (!post2) {
      throw new HttpError("Post not found", { status: 404 /* NOT_FOUND */ });
    }
    return {
      status: 200 /* OK */,
      data: {
        post: formatAdminPost(posts_exports.mapPostToDomain(post2))
      }
    };
  }
  const lang = getQueryParam(req, "lang");
  const defaultLanguage = languages_exports.getDefaultLanguage();
  const defaultCode = defaultLanguage?.code ?? "en";
  const post = posts_exports.getPostBySlug(identifier);
  if (!post || post.status !== "published") {
    throw new HttpError("Post not found", { status: 404 /* NOT_FOUND */ });
  }
  const formatted = formatPublicPost(post, lang ?? defaultCode, defaultCode);
  if (!formatted) {
    throw new HttpError("Translation not available", { status: 404 /* NOT_FOUND */ });
  }
  return {
    status: 200 /* OK */,
    data: { post: formatted }
  };
}
async function handleUpdatePost(req, ctx, identifier) {
  if (!ctx.user) {
    throw new HttpError("Unauthorized", { status: 401 /* UNAUTHORIZED */ });
  }
  const id = Number(identifier);
  if (Number.isNaN(id)) {
    throw new HttpError("Invalid ID", { status: 400 /* BAD_REQUEST */ });
  }
  const post = posts_exports.getPostById(id);
  if (!post) {
    throw new HttpError("Post not found", { status: 404 /* NOT_FOUND */ });
  }
  if (ctx.user.role === "author" && post.author_id !== ctx.user.id) {
    throw new HttpError("You do not have permission to update this post", {
      status: 403 /* FORBIDDEN */
    });
  }
  const parsed = updatePostSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new HttpError("Invalid data", {
      status: 400 /* BAD_REQUEST */,
      details: parsed.error.flatten()
    });
  }
  const payload = parsed.data;
  const nextStatus = payload.status ?? post.status;
  let publishedAt = payload.publishedAt ?? post.published_at;
  if (nextStatus === "published" && !publishedAt) {
    publishedAt = (/* @__PURE__ */ new Date()).toISOString();
  }
  const updated = posts_exports.updatePost(id, {
    slug: payload.slug,
    categoryId: typeof payload.categoryId === "undefined" ? void 0 : payload.categoryId,
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
    throw new HttpError("Failed to update post", { status: 500 /* INTERNAL_SERVER_ERROR */ });
  }
  return {
    status: 200 /* OK */,
    data: {
      post: formatAdminPost(posts_exports.mapPostToDomain(updated))
    }
  };
}
async function handleDeletePost(ctx, identifier) {
  if (!ctx.user) {
    throw new HttpError("Unauthorized", { status: 401 /* UNAUTHORIZED */ });
  }
  const id = Number(identifier);
  if (Number.isNaN(id)) {
    throw new HttpError("Invalid ID", { status: 400 /* BAD_REQUEST */ });
  }
  const existing = posts_exports.getPostById(id);
  if (!existing) {
    throw new HttpError("Post not found", { status: 404 /* NOT_FOUND */ });
  }
  if (ctx.user.role === "author" && existing.author_id !== ctx.user.id) {
    throw new HttpError("You do not have permission to delete this post", {
      status: 403 /* FORBIDDEN */
    });
  }
  posts_exports.deletePost(id);
  return {
    status: 204 /* NO_CONTENT */
  };
}
function formatAdminPost(post) {
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
function formatPublicPost(post, language, fallbackLanguage) {
  const translation = post.translations.find((t) => t.language === language) ?? post.translations.find((t) => t.language === fallbackLanguage) ?? post.translations[0];
  if (!translation) {
    return null;
  }
  const category = post.category_id != null ? categories_exports.getCategoryById(post.category_id) : null;
  const categoryTranslation = category?.translations.find((t) => t.language === language) ?? category?.translations.find((t) => t.language === fallbackLanguage) ?? category?.translations[0];
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
    category: categoryTranslation ? {
      id: category.id,
      slug: category.slug,
      name: categoryTranslation.name,
      description: categoryTranslation.description
    } : null
  };
}
function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const plainText = content.replace(/<[^>]+>/g, " ");
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// src/api/routes/categories.ts
async function handleCategoriesRoute(req, ctx) {
  const isAdmin = req.segments[0] === "admin";
  const segments = isAdmin ? req.segments.slice(1) : req.segments;
  if (segments.length === 1) {
    if (req.method === "GET") {
      return handleListCategories(req, isAdmin);
    }
    if (isAdmin && req.method === "POST") {
      ensureAdmin(ctx);
      return handleCreateCategory(req);
    }
  }
  if (segments.length === 2) {
    const identifier = segments[1];
    if (req.method === "GET") {
      return handleGetCategory(req, identifier, isAdmin);
    }
    if (isAdmin && req.method === "PUT") {
      ensureAdmin(ctx);
      return handleUpdateCategory(req, identifier);
    }
    if (isAdmin && req.method === "DELETE") {
      ensureAdmin(ctx);
      return handleDeleteCategory(identifier);
    }
  }
  throw new HttpError("Route not found", { status: 404 /* NOT_FOUND */ });
}
function handleListCategories(req, isAdmin) {
  const lang = getQueryParam(req, "lang");
  const defaultLanguage = languages_exports.getDefaultLanguage();
  const fallback = defaultLanguage?.code ?? "en";
  const categories = categories_exports.listCategories();
  if (isAdmin) {
    return {
      status: 200 /* OK */,
      data: {
        categories: categories.map((category) => formatAdminCategory(category))
      }
    };
  }
  const formatted = categories.map((category) => formatPublicCategory(category, lang ?? fallback, fallback)).filter((category) => Boolean(category));
  return {
    status: 200 /* OK */,
    data: {
      categories: formatted
    }
  };
}
function handleGetCategory(req, identifier, isAdmin) {
  if (isAdmin) {
    const id = Number(identifier);
    if (Number.isNaN(id)) {
      throw new HttpError("Invalid ID", { status: 400 /* BAD_REQUEST */ });
    }
    const category2 = categories_exports.getCategoryById(id);
    if (!category2) {
      throw new HttpError("Category not found", { status: 404 /* NOT_FOUND */ });
    }
    return {
      status: 200 /* OK */,
      data: {
        category: formatAdminCategory(category2)
      }
    };
  }
  const lang = getQueryParam(req, "lang");
  const defaultLanguage = languages_exports.getDefaultLanguage();
  const fallback = defaultLanguage?.code ?? "en";
  const category = categories_exports.getCategoryBySlug(identifier);
  if (!category) {
    throw new HttpError("Category not found", { status: 404 /* NOT_FOUND */ });
  }
  const formatted = formatPublicCategory(category, lang ?? fallback, fallback);
  if (!formatted) {
    throw new HttpError("Category not found", { status: 404 /* NOT_FOUND */ });
  }
  const { posts } = posts_exports.listPostsPaginated({
    status: "published",
    categoryId: category.id,
    language: lang ?? fallback,
    limit: 100,
    offset: 0
  });
  const postsFormatted = posts.map((post) => {
    const translation = post.translations.find((t) => t.language === (lang ?? fallback)) ?? post.translations.find((t) => t.language === fallback) ?? post.translations[0];
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
  }).filter((post) => Boolean(post));
  return {
    status: 200 /* OK */,
    data: {
      category: formatted,
      posts: postsFormatted
    }
  };
}
function handleCreateCategory(req) {
  const parsed = createCategorySchema.safeParse(req.body);
  if (!parsed.success) {
    throw new HttpError("Invalid data", {
      status: 400 /* BAD_REQUEST */,
      details: parsed.error.flatten()
    });
  }
  const created = categories_exports.createCategory(parsed.data);
  return {
    status: 201 /* CREATED */,
    data: {
      category: formatAdminCategory(created)
    }
  };
}
function handleUpdateCategory(req, identifier) {
  const id = Number(identifier);
  if (Number.isNaN(id)) {
    throw new HttpError("Invalid ID", { status: 400 /* BAD_REQUEST */ });
  }
  const existing = categories_exports.getCategoryById(id);
  if (!existing) {
    throw new HttpError("Category not found", { status: 404 /* NOT_FOUND */ });
  }
  const parsed = updateCategorySchema.safeParse(req.body);
  if (!parsed.success) {
    throw new HttpError("Invalid data", {
      status: 400 /* BAD_REQUEST */,
      details: parsed.error.flatten()
    });
  }
  const updated = categories_exports.updateCategory(id, parsed.data);
  if (!updated) {
    throw new HttpError("Failed to update category", {
      status: 500 /* INTERNAL_SERVER_ERROR */
    });
  }
  return {
    status: 200 /* OK */,
    data: {
      category: formatAdminCategory(updated)
    }
  };
}
function handleDeleteCategory(identifier) {
  const id = Number(identifier);
  if (Number.isNaN(id)) {
    throw new HttpError("Invalid ID", { status: 400 /* BAD_REQUEST */ });
  }
  const existing = categories_exports.getCategoryById(id);
  if (!existing) {
    throw new HttpError("Category not found", { status: 404 /* NOT_FOUND */ });
  }
  categories_exports.deleteCategory(id);
  return {
    status: 204 /* NO_CONTENT */
  };
}
function ensureAdmin(ctx) {
  if (!ctx.user || ctx.user.role !== "admin") {
    throw new HttpError("Permission denied", { status: 403 /* FORBIDDEN */ });
  }
}
function formatAdminCategory(category) {
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
function formatPublicCategory(category, language, fallbackLanguage) {
  const translation = category.translations.find((t) => t.language === language) ?? category.translations.find((t) => t.language === fallbackLanguage) ?? category.translations[0];
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

// src/api/routes/users.ts
async function handleUsersRoute(req, ctx) {
  const segments = req.segments.slice(1);
  if (segments.length === 1) {
    if (req.method === "GET") {
      ensureAdmin2(ctx);
      return handleListUsers();
    }
    if (req.method === "POST") {
      return await handleCreateUser(req, ctx);
    }
  }
  if (segments.length === 2) {
    const identifier = segments[1];
    if (req.method === "GET") {
      ensureAdmin2(ctx);
      return handleGetUser(identifier);
    }
    if (req.method === "PUT") {
      ensureAdmin2(ctx);
      return await handleUpdateUser(identifier, req);
    }
    if (req.method === "DELETE") {
      ensureAdmin2(ctx);
      return handleDeleteUser(identifier, ctx);
    }
  }
  throw new HttpError("Route not found", { status: 404 /* NOT_FOUND */ });
}
function handleListUsers() {
  const users = users_exports.listUsers();
  return {
    status: 200 /* OK */,
    data: {
      users: users.map(serializeUser2)
    }
  };
}
async function handleCreateUser(req, ctx) {
  const parsed = createUserSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new HttpError("Invalid data", {
      status: 400 /* BAD_REQUEST */,
      details: parsed.error.flatten()
    });
  }
  const hasAdmins = users_exports.countAdmins() > 0;
  if (hasAdmins) {
    ensureAdmin2(ctx);
  }
  const payload = parsed.data;
  const passwordHash = await hashPassword(payload.password);
  const role = hasAdmins ? payload.role ?? "author" : "admin";
  try {
    const user = users_exports.createUser({
      email: payload.email,
      name: payload.name,
      passwordHash,
      role
    });
    return {
      status: 201 /* CREATED */,
      data: {
        user: serializeUser2(user)
      }
    };
  } catch (error) {
    throw new HttpError("Unable to create user", {
      status: 409 /* CONFLICT */,
      details: error
    });
  }
}
function handleGetUser(identifier) {
  const id = Number(identifier);
  if (Number.isNaN(id)) {
    throw new HttpError("Invalid ID", { status: 400 /* BAD_REQUEST */ });
  }
  const user = users_exports.getUserById(id);
  if (!user) {
    throw new HttpError("User not found", { status: 404 /* NOT_FOUND */ });
  }
  return {
    status: 200 /* OK */,
    data: {
      user: serializeUser2(user)
    }
  };
}
async function handleUpdateUser(identifier, req) {
  const id = Number(identifier);
  if (Number.isNaN(id)) {
    throw new HttpError("Invalid ID", { status: 400 /* BAD_REQUEST */ });
  }
  const existing = users_exports.getUserById(id);
  if (!existing) {
    throw new HttpError("User not found", { status: 404 /* NOT_FOUND */ });
  }
  const parsed = updateUserSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new HttpError("Invalid data", {
      status: 400 /* BAD_REQUEST */,
      details: parsed.error.flatten()
    });
  }
  const input = parsed.data;
  if (existing.role === "admin" && input.role === "author") {
    const adminCount = users_exports.countAdmins();
    if (adminCount <= 1) {
      throw new HttpError("At least one administrator must remain", {
        status: 409 /* CONFLICT */
      });
    }
  }
  const passwordHash = input.password ? await hashPassword(input.password) : void 0;
  const updated = users_exports.updateUser(id, {
    email: input.email,
    name: input.name,
    passwordHash,
    role: input.role
  });
  if (!updated) {
    throw new HttpError("Failed to update user", { status: 500 /* INTERNAL_SERVER_ERROR */ });
  }
  return {
    status: 200 /* OK */,
    data: {
      user: serializeUser2(updated)
    }
  };
}
function handleDeleteUser(identifier, ctx) {
  const id = Number(identifier);
  if (Number.isNaN(id)) {
    throw new HttpError("Invalid ID", { status: 400 /* BAD_REQUEST */ });
  }
  const existing = users_exports.getUserById(id);
  if (!existing) {
    throw new HttpError("User not found", { status: 404 /* NOT_FOUND */ });
  }
  if (ctx.user && existing.id === ctx.user.id) {
    throw new HttpError("You cannot delete your own user", {
      status: 409 /* CONFLICT */
    });
  }
  if (existing.role === "admin") {
    const adminCount = users_exports.countAdmins();
    if (adminCount <= 1) {
      throw new HttpError("At least one administrator must remain", {
        status: 409 /* CONFLICT */
      });
    }
  }
  users_exports.deleteUser(id);
  return {
    status: 204 /* NO_CONTENT */
  };
}
function ensureAdmin2(ctx) {
  if (!ctx.user || ctx.user.role !== "admin") {
    throw new HttpError("Permission denied", { status: 403 /* FORBIDDEN */ });
  }
}
function serializeUser2(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.created_at
  };
}

// src/api/routes/languages.ts
async function handleLanguagesRoute(req, ctx) {
  const isAdmin = req.segments[0] === "admin";
  const segments = isAdmin ? req.segments.slice(1) : req.segments;
  if (segments.length === 1) {
    if (req.method === "GET") {
      return handleListLanguages();
    }
    if (isAdmin && req.method === "POST") {
      ensureAdmin3(ctx);
      return handleCreateLanguage(req);
    }
  }
  if (segments.length === 2 && isAdmin) {
    const code = segments[1];
    if (req.method === "PUT") {
      ensureAdmin3(ctx);
      return handleUpdateLanguage(code, req);
    }
    if (req.method === "DELETE") {
      ensureAdmin3(ctx);
      return handleDeleteLanguage(code);
    }
  }
  throw new HttpError("Route not found", { status: 404 /* NOT_FOUND */ });
}
function handleListLanguages() {
  const languages = languages_exports.listLanguages();
  return {
    status: 200 /* OK */,
    data: {
      languages
    }
  };
}
function handleCreateLanguage(req) {
  const parsed = upsertLanguageSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new HttpError("Invalid data", {
      status: 400 /* BAD_REQUEST */,
      details: parsed.error.flatten()
    });
  }
  const language = languages_exports.upsertLanguage(parsed.data);
  return {
    status: 201 /* CREATED */,
    data: {
      language
    }
  };
}
function handleUpdateLanguage(code, req) {
  const parsed = updateLanguageSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new HttpError("Invalid data", {
      status: 400 /* BAD_REQUEST */,
      details: parsed.error.flatten()
    });
  }
  const current = languages_exports.getLanguage(code);
  if (!current) {
    throw new HttpError("Language not found", { status: 404 /* NOT_FOUND */ });
  }
  const nextEnabled = parsed.data.enabled ?? current.enabled;
  const nextDefault = parsed.data.isDefault ?? current.isDefault;
  if (current.isDefault && !nextDefault) {
    throw new HttpError("Set another language as default before changing this one", {
      status: 409 /* CONFLICT */
    });
  }
  if (nextDefault && !nextEnabled) {
    throw new HttpError("The default language must be enabled", {
      status: 409 /* CONFLICT */
    });
  }
  if (!nextEnabled) {
    const enabledLanguages = languages_exports.listLanguages().filter((language2) => language2.enabled && language2.code !== code);
    if (enabledLanguages.length === 0) {
      throw new HttpError("At least one language must remain enabled", {
        status: 409 /* CONFLICT */
      });
    }
  }
  const language = languages_exports.upsertLanguage({
    code,
    name: parsed.data.name ?? current.name,
    enabled: nextEnabled,
    isDefault: nextDefault
  });
  return {
    status: 200 /* OK */,
    data: {
      language
    }
  };
}
function handleDeleteLanguage(code) {
  const language = languages_exports.getLanguage(code);
  if (!language) {
    throw new HttpError("Language not found", { status: 404 /* NOT_FOUND */ });
  }
  if (language.isDefault) {
    throw new HttpError("Cannot remove the default language", {
      status: 409 /* CONFLICT */
    });
  }
  const enabledLanguages = languages_exports.listLanguages().filter((lang) => lang.enabled);
  if (enabledLanguages.length <= 1) {
    throw new HttpError("At least one language must remain enabled", {
      status: 409 /* CONFLICT */
    });
  }
  languages_exports.deleteLanguage(code);
  return {
    status: 204 /* NO_CONTENT */
  };
}
function ensureAdmin3(ctx) {
  if (!ctx.user || ctx.user.role !== "admin") {
    throw new HttpError("Permission denied", { status: 403 /* FORBIDDEN */ });
  }
}

// src/lib/ai/translator.ts
var DEFAULT_OPENAI_MODEL = "gpt-4o-mini";
async function translateContent(input) {
  if (!input.targetLanguages.length) {
    throw new HttpError("No target languages provided", { status: 400 /* BAD_REQUEST */ });
  }
  const config = getBlogConfig();
  const translator = config.ai?.translator;
  if (!translator) {
    throw new HttpError("AI translation is not configured", { status: HttpStatus.NOT_IMPLEMENTED });
  }
  switch (translator.provider) {
    case "openai":
      return translateWithOpenAi(input, translator);
    default:
      throw new HttpError("Unsupported AI translation provider", { status: 400 /* BAD_REQUEST */ });
  }
}
async function translateWithOpenAi(input, config) {
  const apiKey = config.apiKey ?? process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new HttpError("OpenAI API key is not configured", {
      status: 500 /* INTERNAL_SERVER_ERROR */
    });
  }
  const endpoint = config.baseUrl?.replace(/\/$/, "") ?? "https://api.openai.com/v1/chat/completions";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: config.model ?? DEFAULT_OPENAI_MODEL,
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that translates blog posts. Respond with a JSON object only."
        },
        {
          role: "user",
          content: JSON.stringify({
            sourceLanguage: input.sourceLanguage,
            targetLanguages: input.targetLanguages,
            fields: input.fields
          })
        }
      ]
    })
  });
  if (!response.ok) {
    let reason = response.statusText;
    try {
      const errorPayload = await response.json();
      if (errorPayload?.error?.message) {
        reason = errorPayload.error.message;
      }
    } catch {
    }
    throw new HttpError(`AI translation request failed: ${reason}`, {
      status: response.status >= 500 ? 500 /* INTERNAL_SERVER_ERROR */ : 400 /* BAD_REQUEST */
    });
  }
  const payload = await response.json();
  const content = payload.choices?.[0]?.message?.content;
  if (!content) {
    throw new HttpError("AI translation response did not include content", {
      status: 500 /* INTERNAL_SERVER_ERROR */
    });
  }
  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch (error) {
    throw new HttpError("Failed to parse AI translation response", {
      status: 500 /* INTERNAL_SERVER_ERROR */,
      details: error instanceof Error ? error.message : void 0
    });
  }
  if (!isObject(parsed) || !isObject(parsed.translations)) {
    throw new HttpError("AI translation response has an unexpected format", {
      status: 500 /* INTERNAL_SERVER_ERROR */
    });
  }
  const translations = Object.entries(parsed.translations).reduce((acc, [language, value]) => {
    if (!isObject(value)) {
      return acc;
    }
    const fields = {};
    for (const [key, fieldValue] of Object.entries(value)) {
      if (typeof fieldValue === "string") {
        fields[key] = fieldValue;
      }
    }
    acc[language] = fields;
    return acc;
  }, {});
  return translations;
}

// src/api/routes/ai.ts
async function handleAiRoute(req, ctx) {
  if (!ctx.user) {
    throw new HttpError("Unauthorized", { status: 401 /* UNAUTHORIZED */ });
  }
  const segments = req.segments.slice(1);
  const action = segments[1];
  if (segments[0] === "ai" && action === "translate" && req.method === "POST") {
    return handleTranslate(req);
  }
  throw new HttpError("Route not found", { status: 404 /* NOT_FOUND */ });
}
async function handleTranslate(req) {
  const payload = parseTranslateBody(req.body);
  const translations = await translateContent(payload);
  return {
    status: 200 /* OK */,
    data: {
      translations
    }
  };
}
function parseTranslateBody(body) {
  if (!isObject(body)) {
    throw new HttpError("Invalid payload", { status: 400 /* BAD_REQUEST */ });
  }
  const sourceLanguage = typeof body.sourceLanguage === "string" ? body.sourceLanguage.trim() : "";
  if (!sourceLanguage) {
    throw new HttpError("sourceLanguage is required", { status: 400 /* BAD_REQUEST */ });
  }
  const targetLanguages = Array.isArray(body.targetLanguages) ? body.targetLanguages.filter((value) => typeof value === "string" && value.trim()) : [];
  if (!targetLanguages.length) {
    throw new HttpError("targetLanguages is required", { status: 400 /* BAD_REQUEST */ });
  }
  const fields = {};
  if (isObject(body.fields)) {
    for (const [key, value] of Object.entries(body.fields)) {
      if (typeof key === "string" && key.trim() && typeof value === "string") {
        fields[key] = value;
      }
    }
  }
  if (Object.keys(fields).length === 0) {
    throw new HttpError("fields must include at least one value", { status: 400 /* BAD_REQUEST */ });
  }
  return {
    sourceLanguage,
    targetLanguages,
    fields
  };
}

// src/api/router.ts
var ADMIN_PREFIX = "admin";
var AUTH_PREFIX = "auth";
var COOKIE_NAME = "next_blog_token";
async function handleRequest(incoming) {
  const normalized = normalizeRequest(incoming);
  const resolved = resolveRoute(normalized);
  if (!resolved) {
    throw new HttpError("Route not found", { status: 404 /* NOT_FOUND */ });
  }
  const ctx = { request: normalized };
  if (resolved.requiresAuth) {
    const user = authenticate(normalized);
    if (!user) {
      throw new HttpError("Unauthorized", { status: 401 /* UNAUTHORIZED */ });
    }
    ctx.user = user;
  }
  const result = await resolved.handler(normalized, ctx);
  return result;
}
function normalizeRequest(incoming) {
  const url = new URL(incoming.url, "http://localhost");
  const pathSegments = url.pathname.split("/").filter(Boolean);
  const segments = stripBaseSegments(pathSegments);
  const headers = Object.fromEntries(
    Object.entries(incoming.headers).map(([key, value]) => [key.toLowerCase(), value])
  );
  const query = {};
  for (const key of url.searchParams.keys()) {
    const all = url.searchParams.getAll(key);
    query[key] = all.length > 1 ? all : all[0] ?? "";
  }
  if (incoming.query) {
    for (const [key, value] of Object.entries(incoming.query)) {
      query[key] = value;
    }
  }
  return {
    method: incoming.method.toUpperCase(),
    pathname: `/${segments.join("/")}`,
    segments,
    headers,
    query,
    body: incoming.body,
    cookies: parseCookies(headers.cookie)
  };
}
function stripBaseSegments(segments) {
  if (segments[0] === "api" && segments[1] === "blog") {
    return segments.slice(2);
  }
  if (segments[0] === "blog") {
    return segments.slice(1);
  }
  return segments;
}
function resolveRoute(request) {
  const segments = request.segments;
  if (segments.length === 0) {
    if (globalThis.process?.env?.NODE_ENV !== "production") {
      console.warn("[next-blog-cms] Rota raiz da API chamada sem segments.");
    }
    return {
      handler: async () => ({
        status: 200 /* OK */,
        data: { ok: true }
      }),
      requiresAuth: false
    };
  }
  if (segments[0] === ADMIN_PREFIX) {
    const adminSegments = segments.slice(1);
    if (adminSegments[0] === AUTH_PREFIX) {
      return {
        handler: handleAuthRoute,
        requiresAuth: false
      };
    }
    if (adminSegments[0] === "posts") {
      return {
        handler: handlePostsRoute,
        requiresAuth: true
      };
    }
    if (adminSegments[0] === "categories") {
      return {
        handler: handleCategoriesRoute,
        requiresAuth: true
      };
    }
    if (adminSegments[0] === "users") {
      const requiresAuth = !(request.method === "POST" && adminSegments.length === 1 && users_exports.countAdmins() === 0);
      return {
        handler: handleUsersRoute,
        requiresAuth
      };
    }
    if (adminSegments[0] === "languages") {
      return {
        handler: handleLanguagesRoute,
        requiresAuth: true
      };
    }
    if (adminSegments[0] === "ai") {
      return {
        handler: handleAiRoute,
        requiresAuth: true
      };
    }
    return null;
  }
  if (segments[0] === "posts") {
    return {
      handler: handlePostsRoute,
      requiresAuth: false
    };
  }
  if (segments[0] === "categories") {
    return {
      handler: handleCategoriesRoute,
      requiresAuth: false
    };
  }
  if (segments[0] === "languages") {
    return {
      handler: handleLanguagesRoute,
      requiresAuth: false
    };
  }
  return null;
}
function authenticate(request) {
  const token = request.cookies[COOKIE_NAME] ?? extractTokenFromHeader(request);
  if (!token) {
    return null;
  }
  const verification = verifyToken(token);
  if (!verification.valid || !verification.payload) {
    return null;
  }
  const user = users_exports.getUserById(verification.payload.sub);
  if (!user) {
    return null;
  }
  return {
    id: user.id,
    role: user.role
  };
}
function extractTokenFromHeader(request) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return void 0;
  }
  const [scheme, token] = authHeader.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) {
    return void 0;
  }
  return token;
}
function makeSetCookieHeader(token, request, maxAgeDays) {
  const secure = request.headers["x-forwarded-proto"] === "https" || request.headers.host?.includes("localhost") === false;
  return serializeCookie("next_blog_token", token, {
    httpOnly: true,
    secure,
    path: "/",
    maxAge: maxAgeDays * 24 * 60 * 60,
    sameSite: "lax"
  });
}

// src/api/index.ts
async function blogApiHandler(req, res) {
  try {
    const result = await handleRequest({
      method: req.method ?? "GET",
      url: `${inferProtocol(req)}://${req.headers.host ?? "localhost"}${req.url ?? ""}`,
      headers: Object.fromEntries(
        Object.entries(req.headers).map(([key, value]) => [key, String(value)])
      ),
      body: req.body,
      query: req.query
    });
    applyHandlerResultToNodeResponse(result, res);
  } catch (error) {
    const response = createErrorResponse(error);
    res.status(response.status);
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    const text = await response.text();
    res.send(text);
  }
}
function inferProtocol(req) {
  const forwardedProto = req.headers["x-forwarded-proto"];
  if (Array.isArray(forwardedProto)) {
    return forwardedProto[0];
  }
  if (forwardedProto) {
    return forwardedProto;
  }
  const socket = req.socket;
  return socket.encrypted ? "https" : "http";
}
function applyHandlerResultToNodeResponse(result, res) {
  res.status(result.status);
  if (result.headers) {
    for (const [key, value] of Object.entries(result.headers)) {
      res.setHeader(key, value);
    }
  }
  if (result.cookies?.length) {
    res.setHeader("Set-Cookie", result.cookies);
  }
  if (typeof result.data === "undefined") {
    res.send("");
  } else {
    res.json(result.data);
  }
}
function usePosts(options = {}) {
  const limit = options.limit ?? 10;
  const isControlled = typeof options.page === "number";
  const [internalPage, setInternalPage] = react.useState(options.page ?? 1);
  const page = isControlled ? options.page : internalPage;
  const [items, setItems] = react.useState([]);
  const [meta, setMeta] = react.useState({ total: 0, pages: 0 });
  const filters = react.useMemo(
    () => ({
      lang: options.lang ?? null,
      category: options.category ?? null,
      status: options.status ?? null,
      limit
    }),
    [options.lang, options.category, options.status, limit]
  );
  const filtersKey = react.useMemo(() => JSON.stringify(filters), [filters]);
  const filtersKeyRef = react.useRef(filtersKey);
  react.useEffect(() => {
    if (filtersKeyRef.current !== filtersKey) {
      filtersKeyRef.current = filtersKey;
      setMeta({ total: 0, pages: 0 });
      setItems([]);
      if (!isControlled) {
        setInternalPage(1);
      }
    }
  }, [filtersKey, isControlled]);
  react.useEffect(() => {
    if (isControlled && typeof options.page === "number") {
      setInternalPage(options.page);
    }
  }, [isControlled, options.page]);
  const url = buildUrl("/api/blog/posts", {
    lang: filters.lang ?? void 0,
    category: filters.category ?? void 0,
    status: filters.status ?? void 0,
    limit,
    page
  });
  const { data, error, loading } = useApiFetch(url);
  react.useEffect(() => {
    if (!data) return;
    setMeta({ total: data.total, pages: data.pages });
    if (isControlled) {
      setItems(data.posts);
      return;
    }
    setItems((previous) => {
      if (page === 1) {
        return data.posts;
      }
      const deduped = [...previous];
      const existingKeys = new Set(
        previous.map((item) => {
          const candidate = item;
          return candidate.id ?? candidate.slug ?? JSON.stringify(item);
        })
      );
      data.posts.forEach((post) => {
        const candidate = post;
        const key = candidate.id ?? candidate.slug ?? JSON.stringify(post);
        if (!existingKeys.has(key)) {
          existingKeys.add(key);
          deduped.push(post);
        }
      });
      return deduped;
    });
  }, [data, isControlled, page]);
  const hasMore = meta.pages > 0 ? page < meta.pages : false;
  const loadMore = react.useCallback(() => {
    if (isControlled) return;
    if (hasMore && !loading) {
      setInternalPage((current) => current + 1);
    }
  }, [hasMore, isControlled, loading]);
  const reset = react.useCallback(() => {
    if (!isControlled) {
      setInternalPage(1);
    }
    setItems([]);
    setMeta({ total: 0, pages: 0 });
  }, [isControlled]);
  return {
    posts: items,
    total: meta.total,
    page,
    pages: meta.pages,
    loading,
    error,
    hasMore,
    loadMore,
    reset
  };
}
function usePost(slug, options = {}) {
  const sanitizedSlug = slug?.trim();
  const url = sanitizedSlug ? buildUrl(`/api/blog/posts/${encodeURIComponent(sanitizedSlug)}`, {
    lang: options.lang
  }) : null;
  const { data, error, loading } = useApiFetch(url);
  return {
    post: data?.post ?? null,
    loading: url ? loading : false,
    error
  };
}
function useCategories(options = {}) {
  const url = buildUrl("/api/blog/categories", { lang: options.lang });
  const { data, error, loading } = useApiFetch(url);
  return {
    categories: data?.categories ?? [],
    loading,
    error
  };
}
function useLanguages() {
  const url = "/api/blog/languages";
  const { data, error, loading } = useApiFetch(url);
  return {
    languages: data?.languages ?? [],
    loading,
    error
  };
}
function buildUrl(base, params) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === void 0 || value === null || value === "") {
      return;
    }
    searchParams.set(key, String(value));
  });
  const query = searchParams.toString();
  return query ? `${base}?${query}` : base;
}
function useApiFetch(url) {
  const [state, setState] = react.useState({
    data: void 0,
    error: void 0,
    loading: Boolean(url)
  });
  const requestIdRef = react.useRef(0);
  const stableUrl = react.useMemo(() => url, [url]);
  react.useEffect(() => {
    if (!stableUrl) {
      setState({ data: void 0, error: void 0, loading: false });
      return;
    }
    const controller = new AbortController();
    const requestId = ++requestIdRef.current;
    setState((previous) => ({
      data: previous.data,
      error: void 0,
      loading: true
    }));
    (async () => {
      try {
        const data = await fetchJson(stableUrl, controller.signal);
        if (requestId === requestIdRef.current) {
          setState({ data, error: void 0, loading: false });
        }
      } catch (error) {
        if (requestId === requestIdRef.current) {
          setState((previous) => ({
            data: previous.data,
            error,
            loading: false
          }));
        }
      }
    })();
    return () => {
      controller.abort();
    };
  }, [stableUrl]);
  return state;
}
async function fetchJson(url, signal) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json"
    },
    signal
  });
  if (!response.ok) {
    let errorBody;
    try {
      errorBody = await response.json();
    } catch {
      errorBody = void 0;
    }
    const error = new Error("Request failed");
    error.status = response.status;
    error.body = errorBody;
    throw error;
  }
  if (response.status === 204) {
    return void 0;
  }
  return await response.json();
}

// src/components/index.ts
function PostList(_props) {
  throw new Error("PostList has not been implemented yet.");
}
function PostCard(_props) {
  throw new Error("PostCard has not been implemented yet.");
}

exports.PostCard = PostCard;
exports.PostList = PostList;
exports.blogApiHandler = blogApiHandler;
exports.defaultBlogConfig = defaultBlogConfig;
exports.getBlogConfig = getBlogConfig;
exports.useCategories = useCategories;
exports.useLanguages = useLanguages;
exports.usePost = usePost;
exports.usePosts = usePosts;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map