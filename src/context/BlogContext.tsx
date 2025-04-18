
// src/context/BlogContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { BlogPost, BlogFilters } from '@/types/blog.types';
import { BlogApi } from '@/api/blogApi';
import { useQuery } from 'react-query';

interface BlogContextType {
  posts: BlogPost[];
  featuredPosts: BlogPost[];
  categories: { name: string; count: number }[];
  tags: { name: string; count: number }[];
  filters: BlogFilters;
  isLoading: boolean;
  error: Error | null;
  setFilters: (filters: BlogFilters) => void;
  searchPosts: (query: string) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

interface BlogProviderProps {
  children: ReactNode;
}

export const BlogProvider: React.FC<BlogProviderProps> = ({ children }) => {
  const [filters, setFilters] = useState<BlogFilters>({});
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Fetch all blog posts with filters
  const { 
    data: posts, 
    isLoading: postsLoading, 
    error: postsError 
  } = useQuery(['blogPosts', filters], () => BlogApi.getAllPosts(filters));

  // Fetch featured posts
  const { 
    data: featuredPosts, 
    isLoading: featuredLoading, 
    error: featuredError 
  } = useQuery('featuredBlogPosts', BlogApi.getFeaturedPosts);

  // Fetch categories
  const { 
    data: categories, 
    isLoading: categoriesLoading, 
    error: categoriesError 
  } = useQuery('blogCategories', BlogApi.getCategories);

  // Fetch tags
  const { 
    data: tags, 
    isLoading: tagsLoading, 
    error: tagsError 
  } = useQuery('blogTags', BlogApi.getTags);

  // Search posts
  const searchPosts = (query: string) => {
    setSearchQuery(query);
    setFilters(prev => ({ ...prev, search: query }));
  };

  // Combine loading states
  const isLoading = postsLoading || featuredLoading || categoriesLoading || tagsLoading;
  
  // Combine errors
  const error = postsError || featuredError || categoriesError || tagsError;

  return (
    <BlogContext.Provider
      value={{
        posts: posts || [],
        featuredPosts: featuredPosts || [],
        categories: categories || [],
        tags: tags || [],
        filters,
        isLoading,
        error,
        setFilters,
        searchPosts
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlogContext must be used within a BlogProvider');
  }
  return context;
};