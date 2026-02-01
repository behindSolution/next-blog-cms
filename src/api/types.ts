import type { BlogStatus } from '../types';

export interface IncomingRequest {
  method: string;
  url: string;
  headers: Record<string, string>;
  body?: unknown;
  query?: Record<string, string | string[]>;
}

export interface NormalizedRequest {
  method: string;
  pathname: string;
  segments: string[];
  headers: Record<string, string>;
  query: Record<string, string | string[]>;
  body?: unknown;
  cookies: Record<string, string>;
}

export interface AuthenticatedUser {
  id: number;
  role: 'admin' | 'author';
}

export interface RequestContext {
  request: NormalizedRequest;
  user?: AuthenticatedUser;
}

export interface HandlerResult<T = unknown> {
  status: number;
  data?: T;
  headers?: Record<string, string>;
  cookies?: string[];
}

export interface PostListQuery {
  lang?: string;
  limit?: number;
  page?: number;
  category?: string;
  status?: BlogStatus;
  search?: string;
}

