import bcrypt from 'bcrypt';
import jwt, { type JwtPayload } from 'jsonwebtoken';

import { getBlogConfig } from '../config';

export interface CreateTokenOptions {
  userId: number;
  role: string;
  sessionDurationDays?: number;
}

export interface TokenPayload {
  sub: number;
  role: string;
  exp: number;
}

export interface VerifyTokenResult {
  valid: boolean;
  payload?: TokenPayload;
  error?: Error;
}

const DEFAULT_SESSION_DURATION_DAYS = 7;
const DEFAULT_SECRET_FALLBACK = 'change-me';
let warnedAboutSecret = false;

function getJwtSecret(): string {
  const envSecret = process.env.BLOG_JWT_SECRET ?? process.env.JWT_SECRET;
  if (envSecret && envSecret !== DEFAULT_SECRET_FALLBACK) {
    return envSecret;
  }

  const configSecret = getBlogConfig().auth.jwtSecret;
  const secret = configSecret || DEFAULT_SECRET_FALLBACK;

  if ((secret === DEFAULT_SECRET_FALLBACK || !secret) && process.env.NODE_ENV === 'production') {
    throw new Error('JWT secret is not configured (set BLOG_JWT_SECRET)');
  }

  if ((secret === DEFAULT_SECRET_FALLBACK || !secret) && !warnedAboutSecret) {
    warnedAboutSecret = true;
    console.warn(
      '[next-blog-cms] Using default JWT secret. Define BLOG_JWT_SECRET to secure your installation.'
    );
  }

  return secret ?? DEFAULT_SECRET_FALLBACK;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function createToken(options: CreateTokenOptions): string {
  const secret = getJwtSecret();
  const sessionDurationDays = options.sessionDurationDays ?? DEFAULT_SESSION_DURATION_DAYS;

  return jwt.sign(
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

export function verifyToken(token: string): VerifyTokenResult {
  try {
    const secret = getJwtSecret();
    const decoded = jwt.verify(token, secret);

    if (typeof decoded === 'string') {
      throw new Error('Invalid token');
    }

    const payload = normalizePayload(decoded);
    if (!payload) {
      throw new Error('Invalid token');
    }

    return {
      valid: true,
      payload
    };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error : new Error('Invalid token')
    };
  }
}

export function decodeToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.decode(token);
    if (!decoded || typeof decoded === 'string') {
      return null;
    }

    return normalizePayload(decoded as JwtPayload);
  } catch {
    return null;
  }
}

function normalizePayload(value: JwtPayload): TokenPayload | null {
  if (typeof value !== 'object' || value === null) {
    return null;
  }

  const sub = typeof value.sub === 'string' ? Number(value.sub) : value.sub;
  if (typeof sub !== 'number' || Number.isNaN(sub)) {
    return null;
  }

  const role = (value as Record<string, unknown>).role;
  if (typeof role !== 'string') {
    return null;
  }

  const exp = value.exp;
  if (typeof exp !== 'number') {
    return null;
  }

  return {
    sub,
    role,
    exp
  };
}

