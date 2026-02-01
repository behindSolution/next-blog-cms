# next-blog-cms

A pluggable blog CMS for existing Next.js applications. Install one package, wire two routes, and you get an isolated admin panel, SQLite storage, multi-language posts, and frontend hooks for rendering content.

## Supported Next.js versions

- **Next.js 13+ (App Router)**
- **Next.js 12+ (Pages Router)**
- Tested with Next 16 / React 19

## Quick start

1. **Install the package**
   ```bash
   npm install next-blog-cms
   ```

2. **Expose the admin panel**

   - App Router (`app/` folder). Create **both** routes so `/blog-admin` and nested paths work:
     ```tsx
     // app/blog-admin/page.tsx
     import { BlogAdmin } from 'next-blog-cms/admin';

     export default BlogAdmin;
     ```
     ```tsx
     // app/blog-admin/[...path]/page.tsx
     import { BlogAdmin } from 'next-blog-cms/admin';

     export default BlogAdmin;
     ```

   - Pages Router (`pages/` folder):
     ```tsx
     // pages/blog-admin/[...path].tsx
     export { BlogAdminPage as default } from 'next-blog-cms/admin';
     ```

3. **Expose the API routes**

   - App Router. Again, create the root and the catch-all:
     ```tsx
     // app/api/blog/route.ts
     import { blogApiHandlerApp } from 'next-blog-cms/api';

     export const GET = blogApiHandlerApp;
     export const POST = blogApiHandlerApp;
     export const PUT = blogApiHandlerApp;
     export const DELETE = blogApiHandlerApp;
     ```
     ```tsx
     // app/api/blog/[...path]/route.ts
     import { blogApiHandlerApp } from 'next-blog-cms/api';

     export const GET = blogApiHandlerApp;
     export const POST = blogApiHandlerApp;
     export const PUT = blogApiHandlerApp;
     export const DELETE = blogApiHandlerApp;
     ```

   - Pages Router:
     ```ts
     // pages/api/blog/[...path].ts
     export { blogApiHandler as default } from 'next-blog-cms/api';
     ```

4. **Run the project**

   Visit `http://localhost:3000/blog-admin`. If no users exist, you will be asked to create the first admin. Afterwards, log in with those credentials to access the dashboard.

5. **Configure environment variables**

   Add a secure secret for JWT signing:

   ```env
   # .env.local
   BLOG_JWT_SECRET=your-super-secret-token
   ```

   (In development a default is used if this variable is missing, but production deployments should always set it.)

## Admin features (MVP)

- Dashboard with key metrics and latest posts
- Full post CRUD (multi-language, slug editing, draft/published toggle, featured image)
- Category management with translations
- Automatic slug suggestions while you type the default-language title
- User management (admin/author roles, safeguards against deleting yourself)
- Language management (enable/disable, set default, add/remove)
- Optional AI-powered translation buttons for posts and categories (uses your configured provider)
- Admin UI built with shadcn/ui + Tailwind (auto light/dark, configurable primary colour)
- Toast notifications and isolated component styling so the host app is unaffected

## Database

- Uses SQLite (`./blog.db` by default) via `better-sqlite3`
- Auto-migrations on first run
- Environment overrides: set `BLOG_DB_PATH` or `NEXT_BLOG_DB_PATH` to customize the location

## Auth

- Email/password with bcrypt hashing
- JWT stored in httpOnly cookies
- Session length: 7 days (15 days with “remember me”)

## Frontend consumption

Use the public hooks to render content inside your app. Example (App Router):

```tsx
'use client';
import { usePosts } from 'next-blog-cms/hooks';

export default function BlogSection() {
  const { posts, loading, error, hasMore, loadMore } = usePosts({ lang: 'en', limit: 6, status: 'published' });

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Failed to load posts.</p>;

  return (
    <div>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
      {hasMore && (
        <button type="button" onClick={loadMore}>
          Load more
        </button>
      )}
    </div>
  );
}
```

Available hooks: `usePosts`, `usePost`, `useCategories`, `useLanguages`.

## Configuration (optional)

Create `blog.config.js` (or `.cjs`/`.json`) at the project root to override defaults:

```js
module.exports = {
  database: {
    path: './data/blog.db'
  },
  languages: {
    default: 'en',
    available: ['en', 'pt', 'es']
  },
  auth: {
    jwtSecret: process.env.BLOG_JWT_SECRET,
    sessionDuration: 7
  },
  theme: {
    // Accepts hex ("#2563eb") or HSL ("hsl(221 83% 53%)")
    primaryColor: '#2563eb'
  },
  ai: {
    translator: {
      provider: 'openai',
      apiKey: process.env.OPENAI_API_KEY,
      model: 'gpt-4o-mini'
    }
  }
};
```

- `database.path`: SQLite file location (created automatically).
- `languages`: default language and the list presented in the admin UI. The package now defaults to English.
- `auth`: default JWT secret and session duration (days) when “remember me” is unchecked.
- `theme.primaryColor`: adjusts the admin primary colour (light/dark aware).
- `ai.translator`: optional, enables the “Auto-translate” button in the post editor. Currently the `openai` provider is supported; if omitted the button is hidden.

All fields are optional; the CMS runs zero-config. The file is loaded at runtime (CommonJS `module.exports`) so changes apply without rebuilds.

### Admin i18n

The admin UI is English by default. To provide custom copy, pass translations to `BlogAdmin`:

```tsx
import { BlogAdmin } from 'next-blog-cms/admin';

const messages = {
  'nav.dashboard': 'Painel',
  'common.cancel': 'Cancelar'
  // ...any other keys used in the admin
};

export default function AdminPage() {
  return <BlogAdmin locale="pt" messages={messages} />;
}
```

You can also pass a custom `translate` function if you have an existing i18n runtime.

### Branding

Customise the sidebar title and tagline by providing the `branding` prop:

```tsx
import { BlogAdmin } from 'next-blog-cms/admin';

export default function AdminPage() {
  return (
    <BlogAdmin
      branding={{
        title: 'Acme CMS',
        tagline: 'Content tools tailored for Acme'
      }}
    />
  );
}
```

## Development scripts

```bash
npm run dev       # tsup in watch mode
npm run build     # build dist (CJS + ESM + types + CSS)
npm run lint      # eslint
npm run typecheck # tsc --noEmit
npm run test      # vitest (placeholder in MVP)
```

## Roadmap (short term)

- Rich text editor (Tiptap)
- Image uploads
- Dark mode for the admin
- Additional filters/search in tables

Contributions and feedback are welcome! Open an issue or start a discussion to influence the next features.
