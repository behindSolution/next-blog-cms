import { ReactNode } from 'react';

interface PostListRenderProps<TPost = unknown> {
    posts: TPost[];
    loading: boolean;
    error: unknown;
}
interface PostListProps<TPost = unknown> {
    children: (props: PostListRenderProps<TPost>) => ReactNode;
    lang?: string;
    limit?: number;
    page?: number;
    category?: string;
    status?: 'draft' | 'published';
}
declare function PostList<TPost>(_props: PostListProps<TPost>): ReactNode;
interface PostCardRenderProps<TPost = Record<string, unknown>> {
    post: TPost;
}
interface PostCardProps<TPost = Record<string, unknown>> {
    post: TPost;
    children: (props: PostCardRenderProps<TPost>) => ReactNode;
}
declare function PostCard<TPost>(_props: PostCardProps<TPost>): ReactNode;

export { PostCard, type PostCardProps, type PostCardRenderProps, PostList, type PostListProps, type PostListRenderProps };
