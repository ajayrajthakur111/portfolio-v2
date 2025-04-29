

  // src/types/blog.types.ts
  export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string;
    author: {
      name: string;
      avatar: string;
    };
    categories: string[];
    tags: string[];
    publishedAt: string;
    updatedAt?: string;
    readTime: number; // in minutes
    featured: string;
  }
  
  export interface BlogFilters {
    category?: string;
    tag?: string;
    search?: string;
  }
  
  export interface CategoryWithCount {
    name: string;
    count: number;
  }
  
  export interface TagWithCount {
    name: string;
    count: number;
  }