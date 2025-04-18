
// src/types/common.types.ts
export interface SocialLink {
    id: string;
    platform: 'github' | 'linkedin' | 'twitter' | 'instagram' | 'dribbble' | 'behance' | 'medium' | 'youtube';
    url: string;
  }
  
  export interface Skill {
    id: string;
    name: string;
    icon: string;
    category: 'frontend' | 'backend' | 'design' | 'devops' | 'other';
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  }
  
  export interface Testimonial {
    id: string;
    name: string;
    role: string;
    company: string;
    avatar?: string;
    content: string;
  }
  
  export interface Experience {
    id: string;
    role: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string | null;
    description: string;
    achievements: string[];
    technologies: string[];
  }
  
  export interface Education {
    id: string;
    degree: string;
    institution: string;
    location: string;
    startDate: string;
    endDate: string;
    description?: string;
  }