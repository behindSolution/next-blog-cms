import { userQueries } from '../../db/queries';
import type { HandlerResult, RequestContext } from '../types';
import { HttpError, HttpStatus } from '../../lib/http';
import { createUserSchema, updateUserSchema } from '../../lib/validation';
import { hashPassword } from '../../lib/auth';

export async function handleUsersRoute(
  req: RequestContext['request'],
  ctx: RequestContext
): Promise<HandlerResult> {
  const segments = req.segments.slice(1); // remove 'admin'

  if (segments.length === 1) {
    if (req.method === 'GET') {
      ensureAdmin(ctx);
      return handleListUsers();
    }

    if (req.method === 'POST') {
      return await handleCreateUser(req, ctx);
    }
  }

  if (segments.length === 2) {
    const identifier = segments[1];

    if (req.method === 'GET') {
      ensureAdmin(ctx);
      return handleGetUser(identifier);
    }

    if (req.method === 'PUT') {
      ensureAdmin(ctx);
      return await handleUpdateUser(identifier, req);
    }

    if (req.method === 'DELETE') {
      ensureAdmin(ctx);
      return handleDeleteUser(identifier, ctx);
    }
  }

  throw new HttpError('Route not found', { status: HttpStatus.NOT_FOUND });
}

function handleListUsers(): HandlerResult {
  const users = userQueries.listUsers();

  return {
    status: HttpStatus.OK,
    data: {
      users: users.map(serializeUser)
    }
  };
}

async function handleCreateUser(
  req: RequestContext['request'],
  ctx: RequestContext
): Promise<HandlerResult> {
  const parsed = createUserSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new HttpError('Invalid data', {
      status: HttpStatus.BAD_REQUEST,
      details: parsed.error.flatten()
    });
  }

  const hasAdmins = userQueries.countAdmins() > 0;

  if (hasAdmins) {
    ensureAdmin(ctx);
  }

  const payload = parsed.data;
  const passwordHash = await hashPassword(payload.password);

  const role = hasAdmins ? payload.role ?? 'author' : 'admin';

  try {
    const user = userQueries.createUser({
      email: payload.email,
      name: payload.name,
      passwordHash,
      role
    });

    return {
      status: HttpStatus.CREATED,
      data: {
        user: serializeUser(user)
      }
    };
  } catch (error) {
    throw new HttpError('Unable to create user', {
      status: HttpStatus.CONFLICT,
      details: error
    });
  }
}

function handleGetUser(identifier: string): HandlerResult {
  const id = Number(identifier);
  if (Number.isNaN(id)) {
    throw new HttpError('Invalid ID', { status: HttpStatus.BAD_REQUEST });
  }

  const user = userQueries.getUserById(id);
  if (!user) {
    throw new HttpError('User not found', { status: HttpStatus.NOT_FOUND });
  }

  return {
    status: HttpStatus.OK,
    data: {
      user: serializeUser(user)
    }
  };
}

async function handleUpdateUser(
  identifier: string,
  req: RequestContext['request']
): Promise<HandlerResult> {
  const id = Number(identifier);
  if (Number.isNaN(id)) {
    throw new HttpError('Invalid ID', { status: HttpStatus.BAD_REQUEST });
  }

  const existing = userQueries.getUserById(id);
  if (!existing) {
    throw new HttpError('User not found', { status: HttpStatus.NOT_FOUND });
  }

  const parsed = updateUserSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new HttpError('Invalid data', {
      status: HttpStatus.BAD_REQUEST,
      details: parsed.error.flatten()
    });
  }

  const input = parsed.data;

  if (existing.role === 'admin' && input.role === 'author') {
    const adminCount = userQueries.countAdmins();
    if (adminCount <= 1) {
      throw new HttpError('At least one administrator must remain', {
        status: HttpStatus.CONFLICT
      });
    }
  }

  const passwordHash = input.password
    ? await hashPassword(input.password)
    : undefined;

  const updated = userQueries.updateUser(id, {
    email: input.email,
    name: input.name,
    passwordHash,
    role: input.role
  });

  if (!updated) {
    throw new HttpError('Failed to update user', { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }

  return {
    status: HttpStatus.OK,
    data: {
      user: serializeUser(updated)
    }
  };
}

function handleDeleteUser(identifier: string, ctx: RequestContext): HandlerResult {
  const id = Number(identifier);
  if (Number.isNaN(id)) {
    throw new HttpError('Invalid ID', { status: HttpStatus.BAD_REQUEST });
  }

  const existing = userQueries.getUserById(id);
  if (!existing) {
    throw new HttpError('User not found', { status: HttpStatus.NOT_FOUND });
  }

  if (ctx.user && existing.id === ctx.user.id) {
    throw new HttpError('You cannot delete your own user', {
      status: HttpStatus.CONFLICT
    });
  }

  if (existing.role === 'admin') {
    const adminCount = userQueries.countAdmins();
    if (adminCount <= 1) {
      throw new HttpError('At least one administrator must remain', {
        status: HttpStatus.CONFLICT
      });
    }
  }

  userQueries.deleteUser(id);

  return {
    status: HttpStatus.NO_CONTENT
  };
}

function ensureAdmin(ctx: RequestContext) {
  if (!ctx.user || ctx.user.role !== 'admin') {
    throw new HttpError('Permission denied', { status: HttpStatus.FORBIDDEN });
  }
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

