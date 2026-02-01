import { userQueries } from '../../db/queries';
import { makeSetCookieHeader } from '../router';
import type { HandlerResult, RequestContext } from '../types';
import { HttpError, HttpStatus } from '../../lib/http';
import { loginSchema } from '../../lib/validation';
import { createToken, verifyPassword, verifyToken } from '../../lib/auth';
import { isObject } from '../../lib/utils';
import { getBlogConfig } from '../../config';

export async function handleAuthRoute(
  req: RequestContext['request'],
  _ctx: RequestContext
): Promise<HandlerResult> {
  const segments = req.segments.slice(1); // remove 'admin'
  const action = segments[1];

  if (action === 'login' && req.method === 'POST') {
    return await handleLogin(req);
  }

  if (action === 'logout' && req.method === 'POST') {
    return handleLogout(req);
  }

  if (action === 'status' && req.method === 'GET') {
    return handleStatus(req);
  }

  throw new HttpError('Route not found', { status: HttpStatus.NOT_FOUND });
}

async function handleLogin(req: RequestContext['request']): Promise<HandlerResult> {
  if (!isObject(req.body)) {
    throw new HttpError('Invalid payload', { status: HttpStatus.BAD_REQUEST });
  }

  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new HttpError('Invalid data', {
      status: HttpStatus.BAD_REQUEST,
      details: parsed.error.flatten()
    });
  }

  const { email, password, remember } = parsed.data;

  const user = userQueries.getUserByEmail(email);
  if (!user) {
    throw new HttpError('Invalid credentials', { status: HttpStatus.UNAUTHORIZED });
  }

  const validPassword = await verifyPassword(password, user.password_hash);
  if (!validPassword) {
    throw new HttpError('Invalid credentials', { status: HttpStatus.UNAUTHORIZED });
  }

  const sessionDuration = remember ? 15 : 7;
  const token = createToken({
    userId: user.id,
    role: user.role,
    sessionDurationDays: sessionDuration
  });

  const cookie = makeSetCookieHeader(token, req, sessionDuration);

  return {
    status: HttpStatus.OK,
    data: {
      user: serializeUser(user)
    },
    cookies: [cookie]
  };
}

function handleLogout(req: RequestContext['request']): HandlerResult {
  const cookie = makeSetCookieHeader('', req, 0);

  return {
    status: HttpStatus.NO_CONTENT,
    cookies: [cookie]
  };
}

function handleStatus(req: RequestContext['request']): HandlerResult {
  const adminCount = userQueries.countAdmins();
  const token = req.cookies['next_blog_token'];

  let user: ReturnType<typeof serializeUser> | null = null;

  if (token) {
    const verification = verifyToken(token);
    if (verification.valid && verification.payload) {
      const record = userQueries.getUserById(verification.payload.sub);
      if (record) {
        user = serializeUser(record);
      }
    }
  }

  const config = getBlogConfig();
  const theme = config.theme;
  const aiTranslationEnabled = Boolean(config.ai?.translator);

  return {
    status: HttpStatus.OK,
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

function serializeUser(user: userQueries.BlogUserRecord) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.created_at
  };
}

