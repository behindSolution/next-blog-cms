import type { ReactNode } from 'react';

export interface PostListRenderProps<TPost = unknown> {
  posts: TPost[];
  loading: boolean;
  error: unknown;
}

export interface PostListProps<TPost = unknown> {
  children: (props: PostListRenderProps<TPost>) => ReactNode;
  lang?: string;
  limit?: number;
  page?: number;
  category?: string;
  status?: 'draft' | 'published';
}

export function PostList<TPost>(_props: PostListProps<TPost>): ReactNode {
  throw new Error('PostList has not been implemented yet.');
}

export interface PostCardRenderProps<TPost = Record<string, unknown>> {
  post: TPost;
}

export interface PostCardProps<TPost = Record<string, unknown>> {
  post: TPost;
  children: (props: PostCardRenderProps<TPost>) => ReactNode;
}

export function PostCard<TPost>(_props: PostCardProps<TPost>): ReactNode {
  throw new Error('PostCard has not been implemented yet.');
}

