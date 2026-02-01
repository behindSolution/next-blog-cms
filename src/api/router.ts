import { userQueries } from '../db/queries';
import type {
  AuthenticatedUser,
  HandlerResult,
  IncomingRequest,
  NormalizedRequest,
  RequestContext
} from './types';
import { parseCookies, serializeCookie } from '../lib/cookies';
import { HttpError, HttpStatus } from '../lib/http';
import { verifyToken } from '../lib/auth';
import { handleAuthRoute } from './routes/auth';
import { handlePostsRoute } from './routes/posts';
import { handleCategoriesRoute } from './routes/categories';
import { handleUsersRoute } from './routes/users';
import { handleLanguagesRoute } from './routes/languages';
import { handleAiRoute } from './routes/ai';

const ADMIN_PREFIX = 'admin';
const AUTH_PREFIX = 'auth';
const COOKIE_NAME = 'next_blog_token';

interface ResolvedRoute {
  handler: (req: NormalizedRequest, ctx: RequestContext) => Promise<HandlerResult>;
  requiresAuth: boolean;
}

export async function handleRequest(incoming: IncomingRequest): Promise<HandlerResult> {
  const normalized = normalizeRequest(incoming);

  const resolved = resolveRoute(normalized);

  if (!resolved) {
    throw new HttpError('Route not found', { status: HttpStatus.NOT_FOUND });
  }

  const ctx: RequestContext = { request: normalized };

  if (resolved.requiresAuth) {
    const user = authenticate(normalized);
    if (!user) {
      throw new HttpError('Unauthorized', { status: HttpStatus.UNAUTHORIZED });
    }
    ctx.user = user;
  }

  const result = await resolved.handler(normalized, ctx);

  return result;
}

function normalizeRequest(incoming: IncomingRequest): NormalizedRequest {
  const url = new URL(incoming.url, 'http://localhost');
  const pathSegments = url.pathname.split('/').filter(Boolean);
  const segments = stripBaseSegments(pathSegments);

  const headers = Object.fromEntries(
    Object.entries(incoming.headers).map(([key, value]) => [key.toLowerCase(), value])
  );

  const query: Record<string, string | string[]> = {};

  for (const key of url.searchParams.keys()) {
    const all = url.searchParams.getAll(key);
    query[key] = all.length > 1 ? all : all[0] ?? '';
  }

  if (incoming.query) {
    for (const [key, value] of Object.entries(incoming.query)) {
      query[key] = value;
    }
  }

  return {
    method: incoming.method.toUpperCase(),
    pathname: `/${segments.join('/')}`,
    segments,
    headers,
    query,
    body: incoming.body,
    cookies: parseCookies(headers.cookie)
  };
}

function stripBaseSegments(segments: string[]): string[] {
  if (segments[0] === 'api' && segments[1] === 'blog') {
    return segments.slice(2);
  }

  if (segments[0] === 'blog') {
    return segments.slice(1);
  }

  return segments;
}

function resolveRoute(request: NormalizedRequest): ResolvedRoute | null {
  const segments = request.segments;
  if (segments.length === 0) {
    if (globalThis.process?.env?.NODE_ENV !== 'production') {
      console.warn('[next-blog-cms] Rota raiz da API chamada sem segments.');
    }
    return {
      handler: async () => ({
        status: HttpStatus.OK,
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

    if (adminSegments[0] === 'posts') {
      return {
        handler: handlePostsRoute,
        requiresAuth: true
      };
    }

    if (adminSegments[0] === 'categories') {
      return {
        handler: handleCategoriesRoute,
        requiresAuth: true
      };
    }

    if (adminSegments[0] === 'users') {
      const requiresAuth =
        !(request.method === 'POST' && adminSegments.length === 1 && userQueries.countAdmins() === 0);

      return {
        handler: handleUsersRoute,
        requiresAuth
      };
    }

    if (adminSegments[0] === 'languages') {
      return {
        handler: handleLanguagesRoute,
        requiresAuth: true
      };
    }

    if (adminSegments[0] === 'ai') {
      return {
        handler: handleAiRoute,
        requiresAuth: true
      };
    }

    return null;
  }

  if (segments[0] === 'posts') {
    return {
      handler: handlePostsRoute,
      requiresAuth: false
    };
  }

  if (segments[0] === 'categories') {
    return {
      handler: handleCategoriesRoute,
      requiresAuth: false
    };
  }

  if (segments[0] === 'languages') {
    return {
      handler: handleLanguagesRoute,
      requiresAuth: false
    };
  }

      return null;
}

function authenticate(request: NormalizedRequest): AuthenticatedUser | null {
  const token = request.cookies[COOKIE_NAME] ?? extractTokenFromHeader(request);

  if (!token) {
    return null;
  }

  const verification = verifyToken(token);
  if (!verification.valid || !verification.payload) {
    return null;
  }

  const user = userQueries.getUserById(verification.payload.sub);
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    role: user.role
  };
}

function extractTokenFromHeader(request: NormalizedRequest): string | undefined {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return undefined;
  }

  const [scheme, token] = authHeader.split(' ');
  if (scheme?.toLowerCase() !== 'bearer' || !token) {
    return undefined;
  }

  return token;
}

export function makeSetCookieHeader(token: string, request: NormalizedRequest, maxAgeDays: number) {
  const secure =
    request.headers['x-forwarded-proto'] === 'https' ||
    request.headers.host?.includes('localhost') === false;

  return serializeCookie('next_blog_token', token, {
    httpOnly: true,
    secure,
    path: '/',
    maxAge: maxAgeDays * 24 * 60 * 60,
    sameSite: 'lax'
  });
}

