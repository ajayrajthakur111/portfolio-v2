
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { useTheme } from '@/hooks/useTheme';
import Layout from '@/components/common/Layout';
import ProjectDetail from '@/components/projects/ProjectDetail';
import { ProjectApi } from '@/api/projectApi';

const LoadingContainer = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${props => props.theme === 'dark' ? '#a0a0a0' : '#666666'};
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 3rem;
  color: #e74c3c;
`;

const ProjectDetailPage: React.FC = () => {
  const { theme } = useTheme();
  const { slug } = useParams<{ slug: string }>();

  const { data: project, isLoading, error } = useQuery(
    ['project', slug],
    () => ProjectApi.getProjectBySlug(slug || ''),
    {
      enabled: !!slug
    }
  );

  return (
    <Layout 
      title={project ? `${project.title} | My Portfolio` : 'Project | My Portfolio'} 
      description={project?.summary || 'View this project'}
    >
      {isLoading ? (
        <LoadingContainer theme={theme}>Loading project...</LoadingContainer>
      ) : error ? (
        <ErrorContainer>Error loading project. Please try again.</ErrorContainer>
      ) : project ? (
        <ProjectDetail project={project} />
      ) : (
        <ErrorContainer>Project not found</ErrorContainer>
      )}
    </Layout>
  );
};

export default ProjectDetailPage;