
// src/hooks/useProjects.ts
import { useQuery } from 'react-query';
import { Project, ProjectFilters } from '@/types/project.types';
import { ProjectApi } from '@/api/projectApi';

export const useProjects = (filters?: ProjectFilters) => {
  return useQuery<Project[]>(['projects', filters], () => 
    ProjectApi.getAllProjects(filters)
  );
};

export const useFeaturedProjects = () => {
  return useQuery<Project[]>('featuredProjects', 
    ProjectApi.getFeaturedProjects
  );
};

export const useProjectBySlug = (slug: string) => {
  return useQuery<Project>(['project', slug], 
    () => ProjectApi.getProjectBySlug(slug),
    { enabled: !!slug }
  );
};

export const useProjectCategories = () => {
  return useQuery<string[]>('projectCategories', 
    ProjectApi.getProjectCategories
  );
};

export const useProjectTechnologies = () => {
  return useQuery<string[]>('projectTechnologies', 
    ProjectApi.getTechnologies
  );
};