

// src/data/blogPosts.ts
// (Add your blog post data here following the BlogPost type structure)
// Example:
import { BlogPost } from '@/types/blog.types';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with React Query',
    slug: 'getting-started-with-react-query',
    excerpt: 'Learn the basics of React Query for efficient data fetching and caching in React applications.',
    content: 'Full markdown content here...',
    coverImage: '/api/placeholder/800/400?text=ReactQuery',
    author: { name: 'John Doe', avatar: '/api/placeholder/50/50?text=JD' },
    categories: ['React', 'Data Fetching'],
    tags: ['react-query', 'javascript', 'frontend'],
    publishedAt: '2023-11-01',
    readTime: 5,
    featured: true,
  },
  // Add more blog posts
];