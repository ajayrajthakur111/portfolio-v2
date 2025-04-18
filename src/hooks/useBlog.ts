
// src/hooks/useBlog.ts
import { useQuery } from 'react-query';
import { BlogPost, BlogFilters } from '@/types/blog.types';
import { BlogApi } from '@/api/blogApi';

export const useBlogPosts = (filters?: BlogFilters) => {
  return useQuery<BlogPost[]>(['blogPosts', filters], () => 
    BlogApi.getAllPosts(filters)
  );
};

export const useFeaturedBlogPosts = () => {
  return useQuery<BlogPost[]>('featuredBlogPosts', 
    BlogApi.getFeaturedPosts
  );
};

export const useBlogPostBySlug = (slug: string) => {
  return useQuery<BlogPost>(['blogPost', slug], 
    () => BlogApi.getPostBySlug(slug),
    { enabled: !!slug }
  );
};

export const useBlogCategories = () => {
  return useQuery<{ name: string; count: number }[]>(
    'blogCategories',
    BlogApi.getCategories
  );
};

export const useBlogTags = () => {
  return useQuery<{ name: string; count: number }[]>(
    'blogTags',
    BlogApi.getTags
  );
};