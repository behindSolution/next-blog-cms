'use client';

import {
  LayoutDashboard,
  FileText,
  FolderTree,
  Languages,
  UsersRound,
  Loader2,
  Plus,
  LogOut,
  Wand2
} from 'lucide-react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useForm, useController } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ThemeProvider } from './components/theme-provider';
import { ThemeToggle } from './components/theme-toggle';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Textarea } from './components/ui/textarea';
import { Badge } from './components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from './components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Switch } from './components/ui/switch';
import { Toaster } from './components/ui/toaster';
import { toast } from './components/ui/use-toast';
import { cn } from './lib/utils';
import { RichTextEditor } from './components/rich-text-editor';
import type { BlogStatus, Language, Post, PostTranslation } from '../types';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTable } from './components/ui/data-table';
import { useTranslate, translateInstant } from './i18n';
import type { TranslateFn } from './i18n';

const API_BASE = '/api/blog';

interface ApiErrorPayload {
  message?: string;
  code?: string;
  details?: unknown;
}

class ApiError extends Error {
  status: number;
  code?: string;
  details?: unknown;

  constructor(status: number, payload?: ApiErrorPayload) {
    super(payload?.message ?? `Erro na API (${status})`);
    this.name = 'ApiError';
    this.status = status;
    this.code = payload?.code;
    this.details = payload?.details;
  }
}

async function apiRequest<TResponse>(
  path: string,
  init: RequestInit = {},
  parseJson = true
): Promise<TResponse> {
  const headers = new Headers(init.headers ?? {});
  if (init.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    credentials: init.credentials ?? 'include',
    headers
  });

  if (!response.ok) {
    let payload: ApiErrorPayload | undefined;
    try {
      const data = await response.json();
      payload = data?.error;
    } catch {
      // ignore
    }
    throw new ApiError(response.status, payload);
  }

  if (!parseJson || response.status === 204) {
    return undefined as TResponse;
  }

  return (await response.json()) as TResponse;
}

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'author';
  createdAt: string;
}

interface AdminPost extends Post {
  translations: Array<
    PostTranslation & {
      id?: number;
    }
  >;
}

type PostTranslationFields = Pick<
  PostTranslation,
  'title' | 'content' | 'excerpt' | 'metaTitle' | 'metaDescription'
>;

interface AdminCategory {
  id: number;
  slug: string;
  createdAt: string;
  translations: Array<{
    id?: number;
    language: string;
    name: string;
    description: string | null;
  }>;
}

interface PostsResponse {
  posts: AdminPost[];
  total: number;
  page: number;
  pages: number;
}

interface CategoriesResponse {
  categories: AdminCategory[];
}

interface UsersResponse {
  users: AdminUser[];
}

interface LanguagesResponse {
  languages: Language[];
}

export interface AdminBranding {
  title?: string;
  tagline?: string;
}

export interface AdminAppProps {
  branding?: AdminBranding;
}

function buildLoginSchema(t: TranslateFn) {
  return z.object({
    email: z.string().email(t('auth.login.validation.email', 'Enter a valid email address')),
    password: z
      .string()
      .min(6, t('auth.login.validation.passwordMin', 'Password must be at least 6 characters long')),
    remember: z.boolean().optional()
  });
}

function buildSetupSchema(t: TranslateFn) {
  return buildLoginSchema(t).extend({
    name: z.string().min(1, t('auth.setup.validation.name', 'Enter the name')),
    role: z.literal('admin').or(z.literal('author')).optional()
  });
}

const datetimeSchema = z
  .string()
  .optional()
  .refine((value) => {
    if (!value) return true;
    return !Number.isNaN(Date.parse(value));
  }, 'Invalid datetime');

type LoginFormData = z.infer<ReturnType<typeof buildLoginSchema>>;
type SetupFormData = z.infer<ReturnType<typeof buildSetupSchema>>;

type Route =
  | { type: 'dashboard' }
  | { type: 'posts-list' }
  | { type: 'posts-create' }
  | { type: 'posts-edit'; id: number }
  | { type: 'categories-list' }
  | { type: 'categories-create' }
  | { type: 'categories-edit'; id: number }
  | { type: 'users-list' }
  | { type: 'users-create' }
  | { type: 'users-edit'; id: number }
  | { type: 'languages' };

interface AdminState {
  user: AdminUser | null;
  languages: Language[];
  features: {
    aiTranslation: boolean;
  };
}

const AdminContext = createContext<{
  state: AdminState;
  setUser: (user: AdminUser | null) => void;
  setLanguages: (languages: Language[]) => void;
  refreshLanguages: () => Promise<void>;
}>({
  state: { user: null, languages: [], features: { aiTranslation: false } },
  setUser: () => undefined,
  setLanguages: () => undefined,
  refreshLanguages: async () => undefined
});

interface RouterState {
  route: Route;
  basePath: string;
}

function parseRoute(pathname: string): RouterState {
  const segments = pathname
    .replace(/(^\/+|\/+$)/g, '')
    .split('/')
    .filter(Boolean);

  const baseSegment = segments[0] ?? 'blog-admin';
  const relative = segments.slice(1);

  if (relative.length === 0) {
    return { route: { type: 'dashboard' }, basePath: `/${baseSegment}` };
  }

  const [first, second] = relative;

  if (first === 'posts') {
    if (!second) return { route: { type: 'posts-list' }, basePath: `/${baseSegment}` };
    if (second === 'new') return { route: { type: 'posts-create' }, basePath: `/${baseSegment}` };
    const id = Number(second);
    if (!Number.isNaN(id)) return { route: { type: 'posts-edit', id }, basePath: `/${baseSegment}` };
  }

  if (first === 'categories') {
    if (!second) return { route: { type: 'categories-list' }, basePath: `/${baseSegment}` };
    if (second === 'new') return { route: { type: 'categories-create' }, basePath: `/${baseSegment}` };
    const id = Number(second);
    if (!Number.isNaN(id)) return { route: { type: 'categories-edit', id }, basePath: `/${baseSegment}` };
  }

  if (first === 'users') {
    if (!second) return { route: { type: 'users-list' }, basePath: `/${baseSegment}` };
    if (second === 'new') return { route: { type: 'users-create' }, basePath: `/${baseSegment}` };
    const id = Number(second);
    if (!Number.isNaN(id)) return { route: { type: 'users-edit', id }, basePath: `/${baseSegment}` };
  }

  if (first === 'languages') {
    return { route: { type: 'languages' }, basePath: `/${baseSegment}` };
  }

  return { route: { type: 'dashboard' }, basePath: `/${baseSegment}` };
}

function useAdminRouter() {
  const [routerState, setRouterState] = useState<RouterState>(() =>
    typeof window === 'undefined'
      ? { route: { type: 'dashboard' }, basePath: '/blog-admin' }
      : parseRoute(window.location.pathname)
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handler = () => setRouterState(parseRoute(window.location.pathname));
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  const navigate = useCallback(
    (path: string) => {
      if (typeof window === 'undefined') return;
      const base = routerState.basePath;
      const target = `${base}${path.startsWith('/') ? path : `/${path}`}`;
      window.history.pushState({}, '', target);
      setRouterState(parseRoute(target));
    },
    [routerState.basePath]
  );

  return { route: routerState.route, basePath: routerState.basePath, navigate };
}

interface AuthStatus {
  hasUsers: boolean;
  user: AdminUser | null;
  theme?: {
    primaryColor?: string;
  };
  features?: {
    aiTranslation: boolean;
  };
}

async function fetchAuthStatus(): Promise<AuthStatus> {
  return apiRequest<AuthStatus>('/admin/auth/status');
}

async function loginRequest(data: LoginFormData) {
  return apiRequest<{ user: AdminUser }>('/admin/auth/login', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

async function logoutRequest() {
  await apiRequest('/admin/auth/logout', { method: 'POST' }, false);
}

async function createUserRequest(payload: SetupFormData) {
  return apiRequest<{ user: AdminUser }>('/admin/users', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

async function fetchLanguages(): Promise<Language[]> {
  const data = await apiRequest<LanguagesResponse>('/admin/languages');
  return data.languages;
}

async function fetchPosts(query: Record<string, unknown>) {
  const searchParams = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    searchParams.set(key, String(value));
  });
  const suffix = searchParams.toString() ? `?${searchParams.toString()}` : '';
  return apiRequest<PostsResponse>(`/admin/posts${suffix}`);
}

async function fetchSinglePost(id: number) {
  return apiRequest<{ post: AdminPost }>(`/admin/posts/${id}`);
}

async function createPost(payload: Partial<AdminPost> & { translations: AdminPost['translations'] }) {
  return apiRequest<{ post: AdminPost }>('/admin/posts', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

async function updatePost(id: number, payload: Partial<AdminPost>) {
  return apiRequest<{ post: AdminPost }>(`/admin/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });
}

async function requestTranslation(payload: {
  sourceLanguage: string;
  targetLanguages: string[];
  fields: Record<string, string | null | undefined>;
}) {
  return apiRequest<{ translations: Record<string, Record<string, string>> }>( '/admin/ai/translate', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

async function deletePost(id: number) {
  await apiRequest(`/admin/posts/${id}`, { method: 'DELETE' }, false);
}

async function fetchCategories() {
  return apiRequest<CategoriesResponse>('/admin/categories');
}

async function fetchCategory(id: number) {
  return apiRequest<{ category: AdminCategory }>(`/admin/categories/${id}`);
}

async function createCategory(payload: Partial<AdminCategory>) {
  return apiRequest<{ category: AdminCategory }>('/admin/categories', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

async function updateCategory(id: number, payload: Partial<AdminCategory>) {
  return apiRequest<{ category: AdminCategory }>(`/admin/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });
}

async function deleteCategory(id: number) {
  await apiRequest(`/admin/categories/${id}`, { method: 'DELETE' }, false);
}

async function fetchUsers() {
  return apiRequest<UsersResponse>('/admin/users');
}

async function fetchUser(id: number) {
  return apiRequest<{ user: AdminUser }>(`/admin/users/${id}`);
}

async function updateUser(id: number, payload: Partial<AdminUser> & { password?: string }) {
  return apiRequest<{ user: AdminUser }>(`/admin/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });
}

async function deleteUser(id: number) {
  await apiRequest(`/admin/users/${id}`, { method: 'DELETE' }, false);
}

async function upsertLanguage(payload: { code: string; name: string; enabled?: boolean; isDefault?: boolean }) {
  if (!payload.code) {
    return apiRequest<{ language: Language }>('/admin/languages', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  return apiRequest<{ language: Language }>(`/admin/languages/${payload.code}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });
}

async function deleteLanguage(code: string) {
  await apiRequest(`/admin/languages/${code}`, { method: 'DELETE' }, false);
}

function formatDate(value: string | null | undefined) {
  if (!value) return '—';
  try {
    const date = new Date(value);
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'short',
      timeStyle: 'short'
    }).format(date);
  } catch {
    return value;
  }
}

function notify(message: string, variant: 'default' | 'destructive' = 'default', description?: string) {
  toast({
    title: message,
    description,
    variant
  });
}

function buildNavigationItems(t: TranslateFn) {
  return [
    { route: { type: 'dashboard' } as Route, label: t('nav.dashboard', 'Dashboard'), icon: LayoutDashboard, path: '/' },
    { route: { type: 'posts-list' } as Route, label: t('nav.posts', 'Posts'), icon: FileText, path: '/posts' },
    {
      route: { type: 'categories-list' } as Route,
      label: t('nav.categories', 'Categories'),
      icon: FolderTree,
      path: '/categories'
    },
    { route: { type: 'users-list' } as Route, label: t('nav.users', 'Users'), icon: UsersRound, path: '/users' },
    { route: { type: 'languages' } as Route, label: t('nav.languages', 'Languages'), icon: Languages, path: '/languages' }
  ];
}

function buildPostFilterButtons(t: TranslateFn): Array<{ label: string; value: 'all' | 'published' | 'draft' }> {
  return [
    { label: t('posts.filters.all', 'All'), value: 'all' },
    { label: t('posts.filters.published', 'Published'), value: 'published' },
    { label: t('posts.filters.draft', 'Drafts'), value: 'draft' }
  ];
}

function buildPostFormSchema(t: TranslateFn) {
  return z.object({
    slug: z.string().min(1, t('posts.form.validation.slug', 'Slug is required')),
    status: z.enum(['draft', 'published']),
    categoryId: z.string(),
    featuredImage: z.string(),
    translations: z.record(
      z.object({
        title: z.string().min(1, t('posts.form.validation.title', 'Title is required')),
        content: z.string().min(1, t('posts.form.validation.content', 'Content is required')),
        excerpt: z.string().optional(),
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional()
      })
    ),
    publishedAt: datetimeSchema
  });
}

function generateSlug(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

type TranslationContentFieldName = `translations.${string}.content`;

const TranslationContentField = ({
  control,
  name,
  placeholder,
  id
}: {
  control: Control<PostFormValues>;
  name: TranslationContentFieldName;
  placeholder: string;
  id: string;
}) => {
  const { field } = useController({
    control,
    name
  });

  return (
    <RichTextEditor
      id={id}
      value={field.value ?? ''}
      onChange={field.onChange}
      onBlur={field.onBlur}
      placeholder={placeholder}
    />
  );
};

const LoadingState = () => {
  const t = useTranslate();
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <div className="flex items-center gap-3 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>{t('common.loading', 'Loading...')}</span>
      </div>
    </div>
  );
};

const Sidebar = ({
  current,
  navigate,
  branding
}: {
  current: Route;
  navigate: (path: string) => void;
  branding?: AdminBranding;
}) => {
  const t = useTranslate();
  const navigationItems = useMemo(() => buildNavigationItems(t), [t]);
  const brandTitle = branding?.title?.trim() || t('nav.brandTitle', 'Blog CMS');
  const brandTagline =
    branding?.tagline?.trim() || t('nav.tagline', 'Multi-language content for Next.js');

  return (
    <aside className="hidden w-64 flex-none border-r bg-card/40 shadow-sm lg:flex lg:flex-col">
      <div className="flex h-16 items-center border-b px-6">
        <div>
          <p className="text-sm font-semibold">{brandTitle}</p>
          <p className="text-xs text-muted-foreground">{brandTagline}</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = current.type === item.route.type;
          return (
            <Button
              key={item.label}
              variant={isActive ? 'secondary' : 'ghost'}
              className={cn('w-full justify-start gap-2', isActive && 'font-semibold')}
              onClick={() => navigate(item.path)}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>
      <div className="border-t px-6 py-3 text-xs text-muted-foreground">next-blog-cms v0.1.2</div>
    </aside>
  );
};

const MobileNav = ({ current, navigate }: { current: Route; navigate: (path: string) => void }) => {
  const t = useTranslate();
  const navigationItems = useMemo(() => buildNavigationItems(t), [t]);

  return (
    <nav className="flex items-center gap-2 border-b bg-card/60 p-2 lg:hidden">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = current.type === item.route.type;
        return (
          <Button
            key={item.label}
            variant={isActive ? 'secondary' : 'ghost'}
            size="icon"
            className={cn('h-10 w-10', isActive && 'bg-secondary font-semibold')}
            onClick={() => navigate(item.path)}
          >
            <Icon className="h-4 w-4" />
            <span className="sr-only">{item.label}</span>
          </Button>
        );
      })}
    </nav>
  );
};

const Header = ({ title, onLogout }: { title: string; onLogout: () => void }) => {
  const {
    state: { user }
  } = useContext(AdminContext);
  const t = useTranslate();

  return (
    <div className="flex h-16 items-center justify-between border-b bg-card/60 px-4 py-3 md:px-6">
      <div>
        <h1 className="text-lg font-semibold md:text-xl">{title}</h1>
        <p className="text-sm text-muted-foreground">
          {t('header.subtitle', 'Manage your blog content with ease')}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-full border px-3 py-1 text-sm text-muted-foreground sm:flex">
          <span className="font-medium text-foreground">{user?.name ?? t('header.userDefaultName', 'User')}</span>
          <span className="text-xs uppercase">{user?.role}</span>
        </div>
        <ThemeToggle />
        <Button variant="outline" onClick={onLogout} className="gap-2">
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">{t('header.signOut', 'Sign out')}</span>
        </Button>
      </div>
    </div>
  );
};

const StatsCard = ({ title, value }: { title: string; value: string | number }) => (
  <Card>
    <CardHeader className="pb-2">
      <CardDescription>{title}</CardDescription>
      <CardTitle className="text-3xl font-semibold tracking-tight">{value}</CardTitle>
    </CardHeader>
  </Card>
);

const DashboardView = ({ navigate }: { navigate: (path: string) => void }) => {
  const t = useTranslate();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const [postsResponse, categoriesResponse, usersResponse] = await Promise.all([
          fetchPosts({ limit: 5 }),
          fetchCategories(),
          fetchUsers()
        ]);
        setPosts(postsResponse.posts);
        setCategories(categoriesResponse.categories);
        setUsers(usersResponse.users);
      } catch {
        notify(t('dashboard.loadError', 'Unable to load dashboard data'), 'destructive');
      } finally {
        setLoading(false);
      }
    })();
  }, [t]);

  if (loading) return <LoadingState />;

  const publishedCount = posts.filter((post) => post.status === 'published').length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard title={t('dashboard.stats.published', 'Published posts')} value={publishedCount} />
        <StatsCard title={t('dashboard.stats.drafts', 'Drafts')} value={posts.length - publishedCount} />
        <StatsCard title={t('dashboard.stats.categories', 'Categories')} value={categories.length} />
        <StatsCard title={t('dashboard.stats.users', 'Users')} value={users.length} />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-base">
              {t('dashboard.latestPosts.title', 'Latest posts')}
            </CardTitle>
            <CardDescription>
              {t('dashboard.latestPosts.description', 'The five most recent posts.')}
            </CardDescription>
          </div>
          <Button variant="outline" onClick={() => navigate('/posts')}>
            {t('dashboard.latestPosts.viewAll', 'View all')}
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('posts.table.title', 'Title')}</TableHead>
                <TableHead>{t('posts.table.status', 'Status')}</TableHead>
                <TableHead>{t('posts.table.updatedAt', 'Updated at')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.slice(0, 5).map((post) => (
                <TableRow key={post.id} className="cursor-pointer" onClick={() => navigate(`/posts/${post.id}`)}>
                  <TableCell className="font-medium">{post.translations[0]?.title ?? post.slug}</TableCell>
                  <TableCell>
                    <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                      {post.status === 'published'
                        ? t('common.status.published', 'Published')
                        : t('common.status.draft', 'Draft')}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(post.updatedAt)}</TableCell>
                </TableRow>
              ))}
              {posts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-sm text-muted-foreground">
                    {t('dashboard.latestPosts.empty', 'No posts have been published yet.')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

type PostFormValues = {
  slug: string;
  status: BlogStatus;
  categoryId: string;
  featuredImage: string;
  translations: Record<
    string,
    {
      title: string;
      content: string;
      excerpt: string;
      metaTitle: string;
      metaDescription: string;
    }
  >;
  publishedAt?: string;
};

const PostListView = ({ navigate }: { navigate: (path: string) => void }) => {
  const t = useTranslate();
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const filterButtons = useMemo(() => buildPostFilterButtons(t), [t]);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchPosts({ status: statusFilter === 'all' ? undefined : statusFilter, limit: 50 });
      setPosts(response.posts);
    } catch {
      notify(t('posts.loadError', 'Unable to load posts'), 'destructive');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, t]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const handleDelete = useCallback(
    async (id: number) => {
      if (!window.confirm(t('posts.confirmDelete', 'Are you sure you want to remove this post?'))) return;
      try {
        await deletePost(id);
        notify(t('posts.deleteSuccess', 'Post removed successfully'), 'default');
        loadPosts();
      } catch {
        notify(t('posts.deleteError', 'Unable to remove the post'), 'destructive');
      }
    },
    [loadPosts, t]
  );

  const columns = useMemo<ColumnDef<AdminPost>[]>(
    () => [
      {
        accessorKey: 'title',
        header: t('posts.table.title', 'Title'),
        cell: ({ row }) => (
          <div className="font-medium">
            {row.original.translations[0]?.title ?? t('posts.table.untitled', 'Untitled')}
          </div>
        )
      },
      {
        accessorKey: 'slug',
        header: t('posts.table.slug', 'Slug')
      },
      {
        id: 'status',
        header: t('posts.table.status', 'Status'),
        cell: ({ row }) => (
          <Badge variant={row.original.status === 'published' ? 'default' : 'secondary'}>
            {row.original.status === 'published'
              ? t('common.status.published', 'Published')
              : t('common.status.draft', 'Draft')}
          </Badge>
        )
      },
      {
        accessorKey: 'updatedAt',
        header: t('posts.table.updatedAt', 'Updated at'),
        cell: ({ row }) => formatDate(row.original.updatedAt),
        enableSorting: false
      },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate(`/posts/${row.original.id}`)}>
              {t('common.edit', 'Edit')}
            </Button>
            <Button variant="destructive" size="sm" onClick={() => handleDelete(row.original.id)}>
              {t('common.remove', 'Remove')}
            </Button>
          </div>
        ),
        enableSorting: false
      }
    ],
    [navigate, handleDelete, t]
  );

  if (loading) return <LoadingState />;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          {filterButtons.map((filter) => (
            <Button
              key={filter.value}
              variant={statusFilter === filter.value ? 'default' : 'outline'}
              onClick={() => setStatusFilter(filter.value)}
            >
              {filter.label}
            </Button>
          ))}
        </div>
        <Button onClick={() => navigate('/posts/new')} className="gap-2">
          <Plus className="h-4 w-4" /> {t('posts.actions.new', 'New post')}
        </Button>
      </div>

      <DataTable columns={columns} data={posts} />
    </div>
  );
};

const fieldClass = 'space-y-2';

const PostFormView = ({ postId, navigate }: { postId?: number; navigate: (path: string) => void }) => {
  const t = useTranslate();
  const {
    state: { languages, features }
  } = useContext(AdminContext);
  const enabledLanguages = useMemo(
    () => languages.filter((language) => language.enabled),
    [languages]
  );
  const defaultLanguage = useMemo(
    () =>
      enabledLanguages.find((language) => language.isDefault) ??
      (enabledLanguages.length ? enabledLanguages[0] : undefined),
    [enabledLanguages]
  );
  const [loading, setLoading] = useState(Boolean(postId));
  const [saving, setSaving] = useState(false);
  const [autoTranslating, setAutoTranslating] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(Boolean(postId));
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [activeLanguage, setActiveLanguage] = useState<string>('');
  const postFormSchema = useMemo(() => buildPostFormSchema(t), [t]);

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      slug: '',
      status: 'draft',
      categoryId: '',
      featuredImage: '',
      translations: {},
      publishedAt: ''
    }
  });
  const translations = form.watch('translations');
  const defaultLanguageCode = defaultLanguage?.code;
  const slugField = form.register('slug');

  useEffect(() => {
    (async () => {
      try {
        const categoriesResponse = await fetchCategories();
        setCategories(categoriesResponse.categories);
      } catch {
        notify(t('categories.loadError', 'Unable to load categories'), 'destructive');
      }
    })();
  }, [t]);

  useEffect(() => {
    if (!postId) return;
    (async () => {
      try {
        setLoading(true);
        const { post } = await fetchSinglePost(postId);
        form.reset({
          slug: post.slug,
          status: post.status,
          categoryId: post.categoryId ? String(post.categoryId) : '',
          featuredImage: post.featuredImage ?? '',
          publishedAt: post.publishedAt ?? '',
          translations: post.translations.reduce<PostFormValues['translations']>((acc, translation) => {
            acc[translation.language] = {
              title: translation.title,
              content: translation.content,
              excerpt: translation.excerpt ?? '',
              metaTitle: translation.metaTitle ?? '',
              metaDescription: translation.metaDescription ?? ''
            };
            return acc;
          }, {})
        });
        setSlugManuallyEdited(true);
        if (post.translations.length > 0) {
          setActiveLanguage(post.translations[0].language);
        }
      } catch {
        notify(t('posts.loadSingleError', 'Unable to load the post'), 'destructive');
      } finally {
        setLoading(false);
      }
    })();
  }, [postId, form, t]);

  useEffect(() => {
    if (!enabledLanguages.length) return;
    const currentTranslations = form.getValues('translations');
    enabledLanguages.forEach((language) => {
      if (!currentTranslations[language.code]) {
        form.setValue(`translations.${language.code}` as const, {
          title: '',
          content: '',
          excerpt: '',
          metaTitle: '',
          metaDescription: ''
        });
      }
    });
    setActiveLanguage((current) => {
      if (current && enabledLanguages.some((language) => language.code === current)) {
        return current;
      }
      return defaultLanguage?.code ?? enabledLanguages[0].code;
    });
  }, [enabledLanguages, defaultLanguage, form]);

  useEffect(() => {
    if (!defaultLanguageCode) return;
    if (slugManuallyEdited) return;
    const title = translations?.[defaultLanguageCode]?.title ?? '';
    const generatedSlug = title ? generateSlug(title) : '';
    const currentSlug = form.getValues('slug');
    if (currentSlug !== generatedSlug) {
      form.setValue('slug', generatedSlug, { shouldDirty: false, shouldTouch: false });
    }
  }, [defaultLanguageCode, slugManuallyEdited, translations, form]);

  const handleAutoTranslate = useCallback(async () => {
    if (!features.aiTranslation) return;
    if (!defaultLanguage) {
      notify(
        t('posts.translation.noDefaultLanguage', 'Set a default language before translating content.'),
        'destructive'
      );
      return;
    }
    const source = form.getValues(`translations.${defaultLanguage.code}` as const);
    if (!source || !source.title.trim() || !source.content.trim()) {
      notify(
        t(
          'posts.translation.missingSource',
          'Fill in the default language title and content before requesting translations.'
        ),
        'destructive'
      );
      return;
    }

    const targetLanguages = enabledLanguages
      .map((language) => language.code)
      .filter((code) => code !== defaultLanguage.code);

    if (!targetLanguages.length) {
      notify(
        t('posts.translation.noTargets', 'Add at least one additional language to translate into.'),
        'destructive'
      );
      return;
    }

    setAutoTranslating(true);
    try {
      const response = await requestTranslation({
        sourceLanguage: defaultLanguage.code,
        targetLanguages,
        fields: {
          title: source.title,
          content: source.content,
          excerpt: source.excerpt,
          metaTitle: source.metaTitle,
          metaDescription: source.metaDescription
        }
      });

      Object.entries(response.translations).forEach(([languageCode, translation]) => {
        (['title', 'content', 'excerpt', 'metaTitle', 'metaDescription'] as const).forEach(
          (fieldKey) => {
            const fieldValue = translation[fieldKey];
            if (typeof fieldValue === 'string') {
              form.setValue(`translations.${languageCode}.${fieldKey}` as any, fieldValue, {
                shouldDirty: true,
                shouldValidate: false
              });
            }
          }
        );
      });
      notify(t('posts.translation.success', 'Translations generated successfully'), 'default');
    } catch (error) {
      if (error instanceof ApiError) {
        notify(error.message, 'destructive');
      } else {
        notify(
          t('posts.translation.error', 'Unable to generate translations automatically'),
          'destructive'
        );
      }
    } finally {
      setAutoTranslating(false);
    }
  }, [features.aiTranslation, defaultLanguage, enabledLanguages, form, t]);

  const onSubmit = form.handleSubmit(async (data) => {
    if (!enabledLanguages.length) {
      notify(
        t('posts.form.noLanguages', 'Enable at least one language before publishing posts.'),
        'destructive'
      );
      return;
    }

    setSaving(true);
    try {
      const translationsPayload = enabledLanguages.reduce<AdminPost['translations']>(
        (acc, language) => {
          const translation = data.translations[language.code];
          if (!translation) {
            return acc;
          }
          acc.push({
            language: language.code,
            title: translation.title,
            content: translation.content,
            excerpt: translation.excerpt || null,
            metaTitle: translation.metaTitle || null,
            metaDescription: translation.metaDescription || null
          });
          return acc;
        },
        []
      );

      const payload: Partial<AdminPost> & { translations: AdminPost['translations'] } = {
        slug: data.slug,
        status: data.status,
        categoryId: data.categoryId ? Number(data.categoryId) : null,
        featuredImage: data.featuredImage || null,
        publishedAt: data.publishedAt || null,
        translations: translationsPayload
      };

      if (postId) {
        await updatePost(postId, payload);
        notify(t('posts.updateSuccess', 'Post updated successfully'), 'default');
      } else {
        await createPost(payload);
        notify(t('posts.createSuccess', 'Post created successfully'), 'default');
      }

      navigate('/posts');
    } catch (error) {
      if (error instanceof ApiError) {
        notify(error.message, 'destructive');
      } else {
        notify(
          postId
            ? t('posts.updateError', 'Unable to update the post')
            : t('posts.createError', 'Unable to save the post'),
          'destructive'
        );
      }
    } finally {
      setSaving(false);
    }
  });

  if (loading) return <LoadingState />;

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{postId ? t('posts.form.editTitle', 'Edit post') : t('posts.form.newTitle', 'New post')}</CardTitle>
          <CardDescription>
            {t('posts.form.description', 'Configure the primary information for this post.')}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className={fieldClass}>
            <Label htmlFor="post-slug">{t('posts.form.slugLabel', 'Slug *')}</Label>
            <Input
              id="post-slug"
              {...slugField}
              onChange={(event) => {
                slugField.onChange(event);
                const next = event.target.value;
                setSlugManuallyEdited(Boolean(next.trim()));
              }}
            />
          </div>
          <div className={fieldClass}>
            <Label htmlFor="post-status">{t('posts.form.statusLabel', 'Status')}</Label>
            <select
              id="post-status"
              className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              {...form.register('status')}
            >
              <option value="draft">{t('common.status.draft', 'Draft')}</option>
              <option value="published">{t('common.status.published', 'Published')}</option>
            </select>
          </div>
          <div className={fieldClass}>
            <Label htmlFor="post-category">{t('posts.form.categoryLabel', 'Category')}</Label>
            <select
              id="post-category"
              className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              {...form.register('categoryId')}
            >
              <option value="">{t('posts.form.categoryNone', 'No category')}</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.translations[0]?.name ?? category.slug}
                </option>
              ))}
            </select>
          </div>
          <div className={fieldClass}>
            <Label htmlFor="post-featured">{t('posts.form.featuredLabel', 'Featured image (URL)')}</Label>
            <Input id="post-featured" {...form.register('featuredImage')} />
          </div>
          <div className={fieldClass}>
            <Label htmlFor="post-published-at">{t('posts.form.publishedAtLabel', 'Publication date')}</Label>
            <Input id="post-published-at" type="datetime-local" {...form.register('publishedAt')} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>{t('posts.form.translationsTitle', 'Content by language')}</CardTitle>
            <CardDescription>
              {t('posts.form.translationsDescription', 'Manage every translation for this post.')}
            </CardDescription>
          </div>
          {features.aiTranslation && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={handleAutoTranslate}
              disabled={autoTranslating}
            >
              <Wand2 className="h-4 w-4" />
              {autoTranslating
                ? t('posts.translation.loading', 'Generating translations...')
                : t('posts.translation.button', 'Auto-translate content')}
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {enabledLanguages.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              {t(
                'posts.form.noLanguagesHint',
                'No languages available yet. Configure them in the Languages section.'
              )}
            </p>
          ) : (
            <Tabs value={activeLanguage} onValueChange={setActiveLanguage} className="w-full">
              <TabsList>
                {enabledLanguages.map((language) => (
                  <TabsTrigger key={language.code} value={language.code}>
                    {language.name ? `${language.name} (${language.code.toUpperCase()})` : language.code.toUpperCase()}
                  </TabsTrigger>
                ))}
              </TabsList>
              {enabledLanguages.map((language) => (
                <TabsContent key={language.code} value={language.code} className="mt-4 space-y-4">
                  <div className={fieldClass}>
                    <Label htmlFor={`title-${language.code}`}>
                      {t('posts.form.titleLabel', 'Title *')}
                    </Label>
                    <Input
                      id={`title-${language.code}`}
                      {...form.register(`translations.${language.code}.title` as const)}
                    />
                  </div>
                  <div className={fieldClass}>
                    <Label htmlFor={`content-${language.code}`}>
                      {t('posts.form.contentLabel', 'Content *')}
                    </Label>
                    <TranslationContentField
                      control={form.control}
                      name={`translations.${language.code}.content` as TranslationContentFieldName}
                      placeholder={t('posts.form.contentPlaceholder', 'Content for {{code}}', {
                        code: language.code.toUpperCase()
                      })}
                      id={`content-${language.code}`}
                    />
                  </div>
                  <div className={fieldClass}>
                    <Label htmlFor={`excerpt-${language.code}`}>
                      {t('posts.form.excerptLabel', 'Excerpt')}
                    </Label>
                    <Textarea
                      id={`excerpt-${language.code}`}
                      {...form.register(`translations.${language.code}.excerpt` as const)}
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className={fieldClass}>
                      <Label htmlFor={`meta-title-${language.code}`}>
                        {t('posts.form.metaTitleLabel', 'Meta title')}
                      </Label>
                      <Input
                        id={`meta-title-${language.code}`}
                        {...form.register(`translations.${language.code}.metaTitle` as const)}
                      />
                    </div>
                    <div className={fieldClass}>
                      <Label htmlFor={`meta-description-${language.code}`}>
                        {t('posts.form.metaDescriptionLabel', 'Meta description')}
                      </Label>
                      <Textarea
                        id={`meta-description-${language.code}`}
                        {...form.register(`translations.${language.code}.metaDescription` as const)}
                      />
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => navigate('/posts')}>
            {t('common.cancel', 'Cancel')}
          </Button>
          <Button type="submit" disabled={saving}>
            {saving
              ? t('common.saving', 'Saving...')
              : postId
                ? t('posts.form.updateAction', 'Update post')
                : t('posts.form.publishAction', 'Publish post')}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

const CategoryFormView = ({
  categoryId,
  navigate
}: {
  categoryId?: number;
  navigate: (path: string) => void;
}) => {
  const {
    state: { languages, features }
  } = useContext(AdminContext);
  const t = useTranslate();
  const enabledLanguages = useMemo(
    () => languages.filter((language) => language.enabled),
    [languages]
  );
  const defaultLanguage = useMemo(
    () =>
      enabledLanguages.find((language) => language.isDefault) ??
      enabledLanguages[0] ??
      languages[0],
    [enabledLanguages, languages]
  );
  const defaultLanguageCode = defaultLanguage?.code;
  const [translations, setTranslations] = useState<Record<string, { name: string }>>({});
  const [activeLanguage, setActiveLanguage] = useState('');
  const [slug, setSlug] = useState('');
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(Boolean(categoryId));
  const [loading, setLoading] = useState(Boolean(categoryId));
  const [saving, setSaving] = useState(false);
  const [autoTranslating, setAutoTranslating] = useState(false);

  useEffect(() => {
    if (!languages.length) return;
    const fallbackCode = defaultLanguageCode ?? languages[0].code;
    setActiveLanguage((current) => {
      if (current && languages.some((language) => language.code === current)) {
        return current;
      }
      return fallbackCode ?? '';
    });
    setTranslations((prev) => {
      const base = { ...prev };
      languages.forEach((language) => {
        if (!base[language.code]) {
          base[language.code] = { name: '' };
        }
      });
      return base;
    });
  }, [languages, defaultLanguageCode]);

  useEffect(() => {
    if (!categoryId) return;
    (async () => {
      try {
        setLoading(true);
        const { category } = await fetchCategory(categoryId);
        setSlug(category.slug);
        setSlugManuallyEdited(true);
        const map = category.translations.reduce<Record<string, { name: string }>>(
          (acc, translation) => {
            acc[translation.language] = {
              name: translation.name
            };
            return acc;
          },
          {}
        );
        setTranslations((prev) => ({ ...prev, ...map }));
        if (category.translations.length > 0) {
          setActiveLanguage(category.translations[0].language);
        }
      } catch {
        notify(t('categories.loadErrorSingle', 'Unable to load category'), 'destructive');
      } finally {
        setLoading(false);
      }
    })();
  }, [categoryId, t]);

  useEffect(() => {
    if (!defaultLanguageCode) return;
    if (slugManuallyEdited) return;
    const sourceName = translations[defaultLanguageCode]?.name?.trim() ?? '';
    const generated = sourceName ? generateSlug(sourceName) : '';
    if (slug !== generated) {
      setSlug(generated);
    }
  }, [defaultLanguageCode, translations, slugManuallyEdited, slug]);

  const handleAutoTranslate = useCallback(async () => {
    if (!features.aiTranslation) return;
    if (!defaultLanguageCode) {
      notify(
        t(
          'categories.translation.noDefaultLanguage',
          'Set a default language before translating category names.'
        ),
        'destructive'
      );
      return;
    }
    const sourceName = translations[defaultLanguageCode]?.name?.trim();
    if (!sourceName) {
      notify(
        t(
          'categories.translation.missingSource',
          'Fill in the default language name before translating.'
        ),
        'destructive'
      );
      return;
    }

    const targetLanguages = enabledLanguages
      .map((language) => language.code)
      .filter((code) => code !== defaultLanguageCode);

    if (!targetLanguages.length) {
      notify(
        t(
          'categories.translation.noTargets',
          'Enable at least one additional language to translate into.'
        ),
        'destructive'
      );
      return;
    }

    setAutoTranslating(true);
    try {
      const response = await requestTranslation({
        sourceLanguage: defaultLanguageCode,
        targetLanguages,
        fields: { name: sourceName }
      });

      setTranslations((prev) => {
        const updated = { ...prev };
        Object.entries(response.translations).forEach(([languageCode, value]) => {
          if (languageCode === defaultLanguageCode) return;
          const translatedName = value.name;
          if (typeof translatedName === 'string' && translatedName.trim()) {
            updated[languageCode] = { name: translatedName };
          } else if (!updated[languageCode]) {
            updated[languageCode] = { name: '' };
          }
        });
        return updated;
      });
      notify(
        t('categories.translation.success', 'Category names translated successfully'),
        'default'
      );
    } catch (error) {
      if (error instanceof ApiError) {
        notify(error.message, 'destructive');
      } else {
        notify(
          t(
            'categories.translation.error',
            'Unable to translate category names automatically'
          ),
          'destructive'
        );
      }
    } finally {
      setAutoTranslating(false);
    }
  }, [features.aiTranslation, defaultLanguageCode, translations, enabledLanguages, t]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!slug.trim()) {
      notify(t('categories.form.slugRequired', 'Enter the category slug'), 'destructive');
      return;
    }

    setSaving(true);
    try {
      const payload: Partial<AdminCategory> = {
        slug,
        translations: Object.entries(translations)
          .filter(([, value]) => value.name.trim())
          .map(([language, value]) => ({
            language,
            name: value.name,
            description: null
          }))
      };

      if (!payload.translations?.length) {
        notify(
          t('categories.form.translationRequired', 'Add at least one language for this category'),
          'destructive'
        );
        setSaving(false);
        return;
      }

      if (categoryId) {
        await updateCategory(categoryId, payload);
        notify(t('categories.updateSuccess', 'Category updated successfully'), 'default');
      } else {
        await createCategory(payload);
        notify(t('categories.createSuccess', 'Category created successfully'), 'default');
      }

      navigate('/categories');
    } catch (error) {
      if (error instanceof ApiError) {
        notify(error.message, 'destructive');
      } else {
        notify(t('categories.saveError', 'Unable to save the category'), 'destructive');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingState />;

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <Card>
        <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>
              {categoryId
                ? t('categories.form.editTitle', 'Edit category')
                : t('categories.form.newTitle', 'New category')}
            </CardTitle>
            <CardDescription>
              {t('categories.form.description', 'Organize the blog categories.')}
            </CardDescription>
          </div>
          {features.aiTranslation && enabledLanguages.length > 1 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={handleAutoTranslate}
              disabled={autoTranslating}
            >
              <Wand2 className="h-4 w-4" />
              {autoTranslating
                ? t('categories.translation.loading', 'Translating...')
                : t('categories.translation.button', 'Auto-translate names')}
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={fieldClass}>
            <Label htmlFor="category-slug">Slug *</Label>
            <Input
              id="category-slug"
              value={slug}
              onChange={(event) => {
                const next = event.target.value;
                setSlug(next);
                setSlugManuallyEdited(Boolean(next.trim()));
              }}
            />
          </div>

          <Tabs value={activeLanguage} onValueChange={setActiveLanguage}>
            <TabsList>
              {languages.map((language) => (
                <TabsTrigger key={language.code} value={language.code}>
                  {language.code.toUpperCase()}
                </TabsTrigger>
              ))}
            </TabsList>
            {languages.map((language) => (
              <TabsContent key={language.code} value={language.code} className="space-y-4">
                <div className={fieldClass}>
                  <Label htmlFor={`category-name-${language.code}`}>
                    {t('categories.form.nameLabel', 'Name')} ({language.code.toUpperCase()})
                  </Label>
                  <Input
                    id={`category-name-${language.code}`}
                    value={translations[language.code]?.name ?? ''}
                    onChange={(event) =>
                      setTranslations((prev) => ({
                        ...prev,
                        [language.code]: {
                          name: event.target.value
                        }
                      }))
                    }
                  />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => navigate('/categories')}>
            {t('common.cancel', 'Cancel')}
          </Button>
          <Button type="submit" disabled={saving}>
            {saving
              ? t('common.saving', 'Saving...')
              : categoryId
                ? t('categories.form.updateAction', 'Update category')
                : t('categories.form.createAction', 'Create category')}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

const CategoryListView = ({ navigate }: { navigate: (path: string) => void }) => {
  const t = useTranslate();
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchCategories();
      setCategories(response.categories);
    } catch {
      notify(t('categories.loadError', 'Unable to load categories'), 'destructive');
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleDelete = useCallback(
    async (id: number) => {
      if (!window.confirm(t('categories.confirmDelete', 'Remove this category?'))) return;
      try {
        await deleteCategory(id);
        notify(t('categories.deleteSuccess', 'Category removed'), 'default');
        loadCategories();
      } catch {
        notify(t('categories.deleteError', 'Unable to remove category'), 'destructive');
      }
    },
    [loadCategories, t]
  );

  const columns = useMemo<ColumnDef<AdminCategory & { defaultName: string }>[]>(
    () => [
      {
        accessorKey: 'slug',
        header: t('categories.table.slug', 'Slug'),
        cell: ({ row }) => <span className="font-medium">{row.original.slug}</span>
      },
      {
        accessorKey: 'defaultName',
        header: t('categories.table.defaultName', 'Name (default)')
      },
      {
        accessorKey: 'createdAt',
        header: t('categories.table.createdAt', 'Created at'),
        cell: ({ row }) => formatDate(row.original.createdAt),
        enableSorting: false
      },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate(`/categories/${row.original.id}`)}>
              {t('common.edit', 'Edit')}
            </Button>
            <Button variant="destructive" size="sm" onClick={() => handleDelete(row.original.id)}>
              {t('common.remove', 'Remove')}
            </Button>
          </div>
        ),
        enableSorting: false
      }
    ],
    [navigate, handleDelete, t]
  );

  if (loading) return <LoadingState />;

  const tableData = categories.map((category) => ({
    ...category,
    defaultName: category.translations[0]?.name ?? '—'
  }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">{t('categories.title', 'Categories')}</h2>
          <p className="text-sm text-muted-foreground">
            {t('categories.subtitle', 'Manage how your content is grouped.')}
          </p>
        </div>
        <Button onClick={() => navigate('/categories/new')} className="gap-2">
          <Plus className="h-4 w-4" /> {t('categories.actions.new', 'New category')}
        </Button>
      </div>

      <DataTable columns={columns} data={tableData} />
    </div>
  );
};

const UsersView = ({ navigate }: { navigate: (path: string) => void }) => {
  const t = useTranslate();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchUsers();
      setUsers(response.users);
    } catch {
      notify(t('users.loadError', 'Unable to load users'), 'destructive');
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleDelete = useCallback(
    async (id: number) => {
      if (!window.confirm(t('users.confirmDelete', 'Remove this user?'))) return;
      try {
        await deleteUser(id);
        notify(t('users.deleteSuccess', 'User removed'), 'default');
        loadUsers();
      } catch {
        notify(t('users.deleteError', 'Unable to remove user'), 'destructive');
      }
    },
    [loadUsers, t]
  );

  const columns = useMemo<ColumnDef<AdminUser>[]>(
    () => [
      {
        accessorKey: 'name',
        header: t('users.table.name', 'Name'),
        cell: ({ row }) => <span className="font-medium">{row.original.name}</span>
      },
      {
        accessorKey: 'email',
        header: t('users.table.email', 'Email')
      },
      {
        accessorKey: 'role',
        header: t('users.table.role', 'Role'),
        cell: ({ row }) => (
          <Badge variant={row.original.role === 'admin' ? 'default' : 'secondary'}>
            {row.original.role === 'admin'
              ? t('users.roles.admin', 'Admin')
              : t('users.roles.author', 'Author')}
          </Badge>
        )
      },
      {
        accessorKey: 'createdAt',
        header: t('users.table.createdAt', 'Created at'),
        cell: ({ row }) => formatDate(row.original.createdAt),
        enableSorting: false
      },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate(`/users/${row.original.id}`)}>
              {t('common.edit', 'Edit')}
            </Button>
            <Button variant="destructive" size="sm" onClick={() => handleDelete(row.original.id)}>
              {t('common.remove', 'Remove')}
            </Button>
          </div>
        ),
        enableSorting: false
      }
    ],
    [navigate, handleDelete, t]
  );

  if (loading) return <LoadingState />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">{t('users.title', 'Blog users')}</h2>
          <p className="text-sm text-muted-foreground">
            {t('users.subtitle', 'Control who can access the admin area.')}
          </p>
        </div>
        <Button onClick={() => navigate('/users/new')} className="gap-2">
          <Plus className="h-4 w-4" /> {t('users.actions.new', 'New user')}
        </Button>
      </div>

      <DataTable columns={columns} data={users} />
    </div>
  );
};

const UserFormView = ({ userId, navigate }: { userId?: number; navigate: (path: string) => void }) => {
  const t = useTranslate();
  const [loading, setLoading] = useState(Boolean(userId));
  const [saving, setSaving] = useState(false);
  const form = useForm<{
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'author';
  }>({
    resolver: zodResolver(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        password: z.string().optional(),
        role: z.enum(['admin', 'author'])
      })
    ),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'author'
    }
  });

  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        setLoading(true);
        const { user } = await fetchUser(userId);
        form.reset({ name: user.name, email: user.email, password: '', role: user.role });
      } catch {
        notify(t('users.loadSingleError', 'Unable to load user'), 'destructive');
      } finally {
        setLoading(false);
      }
    })();
  }, [userId, form, t]);

  const onSubmit = form.handleSubmit(async (data) => {
    setSaving(true);
    try {
      if (userId) {
        await updateUser(userId, {
          name: data.name,
          email: data.email,
          role: data.role,
          password: data.password || undefined
        });
        notify(t('users.updateSuccess', 'User updated'), 'default');
      } else {
        await createUserRequest({
          name: data.name,
          email: data.email,
          password: data.password,
          remember: false,
          role: data.role
        });
        notify(t('users.createSuccess', 'User created'), 'default');
      }

      navigate('/users');
    } catch (error) {
      if (error instanceof ApiError) {
        notify(error.message, 'destructive');
      } else {
        notify(t('users.saveError', 'Unable to save user'), 'destructive');
      }
    } finally {
      setSaving(false);
    }
  });

  if (loading) return <LoadingState />;

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {userId ? t('users.form.editTitle', 'Edit user') : t('users.form.newTitle', 'New user')}
          </CardTitle>
          <CardDescription>
            {t('users.form.description', 'Define who can access the admin area.')}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className={fieldClass}>
            <Label htmlFor="user-name">{t('users.form.nameLabel', 'Name')}</Label>
            <Input id="user-name" {...form.register('name')} />
          </div>
          <div className={fieldClass}>
            <Label htmlFor="user-email">{t('users.form.emailLabel', 'Email')}</Label>
            <Input id="user-email" type="email" {...form.register('email')} />
          </div>
          <div className={fieldClass}>
            <Label htmlFor="user-password">
              {userId
                ? t('users.form.newPasswordLabel', 'New password (optional)')
                : t('users.form.passwordLabel', 'Password')}
            </Label>
            <Input id="user-password" type="password" {...form.register('password')} />
          </div>
          <div className={fieldClass}>
            <Label htmlFor="user-role">{t('users.form.roleLabel', 'Role')}</Label>
            <select
              id="user-role"
              className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              {...form.register('role')}
            >
              <option value="admin">{t('users.roles.admin', 'Admin')}</option>
              <option value="author">{t('users.roles.author', 'Author')}</option>
            </select>
          </div>
          <div className="md:col-span-2 rounded-md border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-200">
            {t(
              'users.form.rolesHint',
              'Authors can edit only their own posts. Admins manage everything.'
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => navigate('/users')}>
            {t('common.cancel', 'Cancel')}
          </Button>
          <Button type="submit" disabled={saving}>
            {saving
              ? t('common.saving', 'Saving...')
              : userId
                ? t('users.form.updateAction', 'Update user')
                : t('users.form.createAction', 'Create user')}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

const LanguagesView = ({ refreshLanguages }: { refreshLanguages: () => Promise<void> }) => {
  const {
    state: { languages }
  } = useContext(AdminContext);
  const t = useTranslate();
  const [form, setForm] = useState({ code: '', name: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.code || !form.name) {
      notify(t('languages.form.required', 'Enter a language code and name'), 'destructive');
      return;
    }

    if (!/^[a-z]{2,5}$/i.test(form.code)) {
      notify(t('languages.form.invalidCode', 'Invalid language code'), 'destructive');
      return;
    }

    setLoading(true);
    try {
      await upsertLanguage({ code: form.code.toLowerCase(), name: form.name });
      notify(t('languages.form.saveSuccess', 'Language saved successfully'), 'default');
      setForm({ code: '', name: '' });
      await refreshLanguages();
    } catch (error) {
      if (error instanceof ApiError) {
        notify(error.message, 'destructive');
      } else {
        notify(t('languages.form.saveError', 'Unable to save language'), 'destructive');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = useCallback(
    async (language: Language, prop: 'enabled' | 'isDefault') => {
      try {
        await upsertLanguage({
          code: language.code,
          name: language.name,
          enabled: prop === 'enabled' ? !language.enabled : true,
          isDefault: prop === 'isDefault' ? true : language.isDefault
        });
        notify(
          prop === 'isDefault'
            ? t('languages.setDefaultSuccess', '{{name}} set as default', { name: language.name })
            : t('languages.updateSuccess', 'Language updated'),
          'default'
        );
        await refreshLanguages();
      } catch (error) {
        if (error instanceof ApiError) {
          notify(error.message, 'destructive');
        } else {
          notify(t('languages.updateError', 'Unable to update language'), 'destructive');
        }
      }
    },
    [refreshLanguages, t]
  );

  const handleDelete = useCallback(
    async (code: string) => {
      if (!window.confirm(t('languages.confirmDelete', 'Remove this language?'))) return;
      try {
        await deleteLanguage(code);
        notify(t('languages.deleteSuccess', 'Language removed'), 'default');
        await refreshLanguages();
      } catch (error) {
        if (error instanceof ApiError) {
          notify(error.message, 'destructive');
        } else {
          notify(t('languages.deleteError', 'Unable to remove language'), 'destructive');
        }
      }
    },
    [refreshLanguages, t]
  );

  const columns = useMemo<ColumnDef<Language>[]>(
    () => [
      {
        accessorKey: 'code',
        header: t('languages.table.code', 'Code'),
        cell: ({ row }) => <span className="font-medium uppercase">{row.original.code}</span>
      },
      {
        accessorKey: 'name',
        header: t('languages.table.name', 'Name')
      },
      {
        id: 'isDefault',
        header: t('languages.table.default', 'Default'),
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Badge variant={row.original.isDefault ? 'default' : 'secondary'}>
              {row.original.isDefault
                ? t('languages.badges.default', 'Default')
                : t('languages.badges.alternative', 'Alternative')}
            </Badge>
            {!row.original.isDefault && (
              <Button variant="ghost" size="sm" onClick={() => handleToggle(row.original, 'isDefault')}>
                {t('languages.actions.setDefault', 'Set as default')}
              </Button>
            )}
          </div>
        ),
        enableSorting: false
      },
      {
        id: 'enabled',
        header: t('languages.table.enabled', 'Enabled'),
        cell: ({ row }) => (
          <Switch checked={row.original.enabled} onCheckedChange={() => handleToggle(row.original, 'enabled')} />
        ),
        enableSorting: false
      },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <div className="flex justify-end">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(row.original.code)}
              disabled={row.original.isDefault}
            >
              {t('common.remove', 'Remove')}
            </Button>
          </div>
        ),
        enableSorting: false
      }
    ],
    [handleDelete, handleToggle, t]
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('languages.form.title', 'Add language')}</CardTitle>
          <CardDescription>
            {t('languages.form.description', 'Choose which translations are available in the admin.')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-[200px,1fr,120px]">
            <div className={fieldClass}>
              <Label htmlFor="language-code">
                {t('languages.form.codeLabel', 'Code (e.g., pt, en)')}
              </Label>
              <Input
                id="language-code"
                value={form.code}
                onChange={(event) => setForm((prev) => ({ ...prev, code: event.target.value }))}
              />
            </div>
            <div className={fieldClass}>
              <Label htmlFor="language-name">{t('languages.form.nameLabel', 'Name')}</Label>
              <Input
                id="language-name"
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              />
            </div>
            <div className="flex items-end">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? t('common.saving', 'Saving...') : t('languages.form.addAction', 'Add')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <DataTable columns={columns} data={languages} />
    </div>
  );
};

const RouteView = ({ route, navigate }: { route: Route; navigate: (path: string) => void }) => {
  const { refreshLanguages } = useContext(AdminContext);

  switch (route.type) {
    case 'dashboard':
      return <DashboardView navigate={navigate} />;
    case 'posts-list':
      return <PostListView navigate={navigate} />;
    case 'posts-create':
      return <PostFormView navigate={navigate} />;
    case 'posts-edit':
      return <PostFormView postId={route.id} navigate={navigate} />;
    case 'categories-list':
      return <CategoryListView navigate={navigate} />;
    case 'categories-create':
      return <CategoryFormView navigate={navigate} />;
    case 'categories-edit':
      return <CategoryFormView categoryId={route.id} navigate={navigate} />;
    case 'users-list':
      return <UsersView navigate={navigate} />;
    case 'users-create':
      return <UserFormView navigate={navigate} />;
    case 'users-edit':
      return <UserFormView userId={route.id} navigate={navigate} />;
    case 'languages':
      return <LanguagesView refreshLanguages={refreshLanguages} />;
    default:
      return <DashboardView navigate={navigate} />;
  }
};

const AuthView = ({
  mode,
  onSwitchMode,
  onSuccess
}: {
  mode: 'login' | 'setup';
  onSwitchMode: (mode: 'login' | 'setup') => void;
  onSuccess: (user: AdminUser) => void;
}) => {
  const t = useTranslate();
  const setupSchema = useMemo(() => buildSetupSchema(t), [t]);
  const loginSchema = useMemo(() => buildLoginSchema(t), [t]);
  const setupForm = useForm<SetupFormData>({
    resolver: zodResolver(setupSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      remember: true,
      role: 'admin'
    }
  });

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: true
    }
  });

  const handleSetupSubmit = setupForm.handleSubmit(async (data) => {
    try {
      await createUserRequest({ ...data, role: 'admin' });
      const loginResult = await loginRequest({ email: data.email, password: data.password, remember: true });
      notify(t('auth.setup.success', 'First admin user created'), 'default');
      onSuccess(loginResult.user);
    } catch (error) {
      if (error instanceof ApiError) {
        notify(error.message, 'destructive');
      } else {
        notify(t('auth.setup.error', 'Unable to create the first user'), 'destructive');
      }
    }
  });

  const handleLoginSubmit = loginForm.handleSubmit(async (data) => {
    try {
      const response = await loginRequest(data);
      notify(t('auth.login.success', 'Logged in successfully'), 'default');
      onSuccess(response.user);
    } catch (error) {
      if (error instanceof ApiError) {
        notify(error.message, 'destructive');
      } else {
        notify(t('auth.login.error', 'Unable to sign in'), 'destructive');
      }
    }
  });

  if (mode === 'setup') {
    return (
      <div className="flex flex-1 items-center justify-center bg-muted/30 p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{t('auth.setup.title', 'Create the first admin user')}</CardTitle>
            <CardDescription>
              {t('auth.setup.subtitle', 'Provide the initial administrator credentials.')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSetupSubmit}>
              <div className={fieldClass}>
                <Label htmlFor="setup-name">{t('auth.setup.nameLabel', 'Name')}</Label>
                <Input id="setup-name" {...setupForm.register('name')} />
                {setupForm.formState.errors.name && (
                  <p className="text-sm text-destructive">{setupForm.formState.errors.name.message}</p>
                )}
              </div>
              <div className={fieldClass}>
                <Label htmlFor="setup-email">{t('auth.setup.emailLabel', 'Email')}</Label>
                <Input id="setup-email" type="email" {...setupForm.register('email')} />
                {setupForm.formState.errors.email && (
                  <p className="text-sm text-destructive">{setupForm.formState.errors.email.message}</p>
                )}
              </div>
              <div className={fieldClass}>
                <Label htmlFor="setup-password">{t('auth.setup.passwordLabel', 'Password')}</Label>
                <Input id="setup-password" type="password" {...setupForm.register('password')} />
                {setupForm.formState.errors.password && (
                  <p className="text-sm text-destructive">{setupForm.formState.errors.password.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={setupForm.formState.isSubmitting}>
                {setupForm.formState.isSubmitting
                  ? t('common.saving', 'Saving...')
                  : t('auth.setup.submit', 'Create user')}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="link" onClick={() => onSwitchMode('login')}>
              {t('auth.setup.switchToLogin', 'I already have a user')}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-muted/30 p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t('auth.login.title', 'Access the blog admin')}</CardTitle>
          <CardDescription>
            {t('auth.login.subtitle', 'Enter your credentials to manage the content.')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleLoginSubmit}>
            <div className={fieldClass}>
              <Label htmlFor="login-email">{t('auth.login.emailLabel', 'Email')}</Label>
              <Input id="login-email" type="email" {...loginForm.register('email')} />
              {loginForm.formState.errors.email && (
                <p className="text-sm text-destructive">{loginForm.formState.errors.email.message}</p>
              )}
            </div>
            <div className={fieldClass}>
              <Label htmlFor="login-password">{t('auth.login.passwordLabel', 'Password')}</Label>
              <Input id="login-password" type="password" {...loginForm.register('password')} />
              {loginForm.formState.errors.password && (
                <p className="text-sm text-destructive">{loginForm.formState.errors.password.message}</p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border border-input text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                {...loginForm.register('remember')}
              />
              <Label htmlFor="remember" className="text-sm text-muted-foreground">
                {t('auth.login.rememberMe', 'Keep me signed in')}
              </Label>
            </div>
            <Button type="submit" className="w-full" disabled={loginForm.formState.isSubmitting}>
              {loginForm.formState.isSubmitting
                ? t('auth.login.submitting', 'Signing in...')
                : t('auth.login.submit', 'Sign in')}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <Button variant="link" onClick={() => onSwitchMode('setup')}>
            {t('auth.login.switchToSetup', 'Create first user')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

const AdminShell = ({ branding }: { branding?: AdminBranding }) => {
  const t = useTranslate();
  const router = useAdminRouter();
  const [authState, setAuthState] = useState<'loading' | 'setup' | 'login' | 'ready'>('loading');
  const [authUser, setAuthUser] = useState<AdminUser | null>(null);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [themeColor, setThemeColor] = useState<string | undefined>();
  const [features, setFeatures] = useState<AdminState['features']>({ aiTranslation: false });
  const resolvedBranding = useMemo(
    () => ({
      title: branding?.title?.trim() || t('nav.brandTitle', 'Blog CMS'),
      tagline: branding?.tagline?.trim() || t('nav.tagline', 'Multi-language content for Next.js')
    }),
    [branding?.title, branding?.tagline, t]
  );

  const refreshLanguages = useCallback(async () => {
    try {
      const response = await fetchLanguages();
      setLanguages(response);
    } catch {
      notify(t('languages.loadError', 'Unable to load languages'), 'destructive');
    }
  }, [t]);

  useEffect(() => {
    (async () => {
      try {
        const status = await fetchAuthStatus();
        setThemeColor(status.theme?.primaryColor ?? undefined);
        setFeatures({
          aiTranslation: status.features?.aiTranslation ?? false
        });

        if (!status.hasUsers) {
          setAuthState('setup');
          return;
        }
        if (!status.user) {
          setAuthState('login');
          return;
        }
        setAuthUser(status.user);
        setAuthState('ready');
      } catch {
        setAuthState('login');
      }
    })();
  }, []);

  useEffect(() => {
    if (authState === 'ready') refreshLanguages();
  }, [authState, refreshLanguages]);

  const handleAuthSuccess = useCallback(
    async (user: AdminUser) => {
      setAuthUser(user);
      setAuthState('ready');
      try {
        const status = await fetchAuthStatus();
        setThemeColor(status.theme?.primaryColor ?? undefined);
        setFeatures({
          aiTranslation: status.features?.aiTranslation ?? false
        });
      } catch {
        setFeatures({ aiTranslation: false });
      }
      refreshLanguages();
    },
    [refreshLanguages]
  );

  const handleLogout = async () => {
    try {
      await logoutRequest();
      setAuthUser(null);
      setAuthState('login');
      setFeatures({ aiTranslation: false });
      notify(t('auth.logout.success', 'Session closed'));
    } catch {
      notify(t('auth.logout.error', 'Unable to end the session'), 'destructive');
    }
  };

  const adminContextValue = useMemo(
    () => ({
      state: { user: authUser, languages, features },
      setUser: setAuthUser,
      setLanguages,
      refreshLanguages
    }),
    [authUser, languages, features, refreshLanguages]
  );

  let content;

  if (authState === 'loading') {
    content = (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  } else if (authState === 'setup' || authState === 'login') {
    content = <AuthView mode={authState} onSwitchMode={setAuthState} onSuccess={handleAuthSuccess} />;
  } else {
    content = (
      <AdminContext.Provider value={adminContextValue}>
        <div className="flex min-h-screen bg-background text-foreground">
          <Sidebar current={router.route} navigate={router.navigate} branding={resolvedBranding} />
          <div className="flex flex-1 flex-col">
            <MobileNav current={router.route} navigate={router.navigate} />
            <Header title={resolveTitle(router.route)} onLogout={handleLogout} />
            <main className="flex-1 overflow-y-auto bg-muted/20 p-4 md:p-6 lg:p-8">
              <RouteView route={router.route} navigate={router.navigate} />
            </main>
          </div>
        </div>
      </AdminContext.Provider>
    );
  }

  return (
    <ThemeProvider primaryColor={themeColor}>
      {content}
      <Toaster />
    </ThemeProvider>
  );
};

function resolveTitle(route: Route): string {
  switch (route.type) {
    case 'dashboard':
      return translateInstant('nav.dashboard', 'Dashboard');
    case 'posts-list':
      return translateInstant('routes.posts.list', 'Posts');
    case 'posts-create':
      return translateInstant('routes.posts.create', 'New post');
    case 'posts-edit':
      return translateInstant('routes.posts.edit', 'Edit post');
    case 'categories-list':
      return translateInstant('routes.categories.list', 'Categories');
    case 'categories-create':
      return translateInstant('routes.categories.create', 'New category');
    case 'categories-edit':
      return translateInstant('routes.categories.edit', 'Edit category');
    case 'users-list':
      return translateInstant('routes.users.list', 'Users');
    case 'users-create':
      return translateInstant('routes.users.create', 'New user');
    case 'users-edit':
      return translateInstant('routes.users.edit', 'Edit user');
    case 'languages':
      return translateInstant('routes.languages', 'Languages');
    default:
      return translateInstant('routes.default', 'Blog Admin');
  }
}

export default function AdminApp({ branding }: AdminAppProps = {}) {
  return <AdminShell branding={branding} />;
}

