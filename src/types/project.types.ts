

  
  // src/types/project.types.ts
  export interface Project {
    id: string;
    title: string;
    slug: string;
    description: string;
    summary: string;
    thumbnail: string;
    images: string[];
    technologies: string[];
    category: 'web' | 'mobile' | 'design' | 'other';
    featured: boolean;
    demoUrl?: string;
    repoUrl?: string;
    completedAt: string;
    content: string;
  }
  
  export interface ProjectFilters {
    category?: string;
    technology?: string;
    search?: string;
  }
  