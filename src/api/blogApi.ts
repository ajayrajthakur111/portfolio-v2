
// src/api/blogApi.ts
import api from './axios';
import { BlogPost, BlogFilters, CategoryWithCount, TagWithCount } from '@/types/blog.types';

export const BlogApi = {
  getAllPosts: async (filters?: BlogFilters): Promise<BlogPost[]> => {
    const response = await api.get('/blog', { params: filters });
    return response.data?.blogs;
  },
  
  getFeaturedPosts: async (): Promise<BlogPost[]> => {
    const response = await api.get('/blog/featured');
    return response.data;
  },
  
  getPostBySlug: async (slug: string): Promise<BlogPost> => {
    const response = await api.get(`/blog/${slug}`);
    return response.data;
  },
  
  getCategories: async (): Promise<CategoryWithCount[]> => {
    const response = await api.get('/blog/categories');
    return response.data;
  },
  
  getTags: async (): Promise<TagWithCount[]> => {
    const response = await api.get('/blog/tags');
    return response.data;
  },
  
  searchPosts: async (query: string): Promise<BlogPost[]> => {
    const response = await api.get('/blog/search', { params: { query } });
    return response.data;
  }
};
