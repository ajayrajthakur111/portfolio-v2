import api from './axios';

// src/api/projectApi.ts
import { Project, ProjectFilters } from '@/types/project.types';

export const ProjectApi = {
  getAllProjects: async (filters?: ProjectFilters): Promise<Project[]> => {
    const response = await api.get('/projects', { params: filters });
    return response.data;
  },
  
  getFeaturedProjects: async (): Promise<Project[]> => {
    const response = await api.get('/projects/featured');
    return response.data;
  },
  
  getProjectBySlug: async (slug: string): Promise<Project> => {
    const response = await api.get(`/projects/${slug}`);
    return response.data;
  },
  
  getProjectCategories: async (): Promise<string[]> => {
    const response = await api.get('/projects/categories');
    return response.data;
  },
  
  getTechnologies: async (): Promise<string[]> => {
    const response = await api.get('/projects/technologies');
    return response.data;
  }
};