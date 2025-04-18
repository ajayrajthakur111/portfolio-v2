
import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { useTheme } from '@/hooks/useTheme';
import Layout from '@/components/common/Layout';
import ProjectList from '@/components/projects/ProjectList';
import { ProjectApi } from '@/api/projectApi';

const ProjectsPageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#222222'};
  margin-bottom: 1rem;
`;

const PageSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme === 'dark' ? '#a0a0a0' : '#666666'};
  max-width: 600px;
  margin: 0 auto;
`;

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

const ProjectsPage: React.FC = () => {
  const { theme } = useTheme();

  const { data: projects, isLoading, error } = useQuery(
    'projects',
    () => ProjectApi.getAllProjects()
  );

  const { data: categories } = useQuery(
    'projectCategories',
    ProjectApi.getProjectCategories
  );

  const { data: technologies } = useQuery(
    'projectTechnologies',
    ProjectApi.getTechnologies
  );

  return (
    <Layout 
      title="Projects | My Portfolio" 
      description="Check out my portfolio projects"
    >
      <ProjectsPageContainer>
        <PageHeader>
          <PageTitle theme={theme}>My Projects</PageTitle>
          <PageSubtitle theme={theme}>
            A collection of my work, showcasing my skills and experience.
          </PageSubtitle>
        </PageHeader>

        {isLoading ? (
          <LoadingContainer theme={theme}>Loading projects...</LoadingContainer>
        ) : error ? (
          <ErrorContainer>Error loading projects. Please try again.</ErrorContainer>
        ) : projects && categories && technologies ? (
          <ProjectList 
            projects={projects} 
            categories={categories} 
            technologies={technologies} 
          />
        ) : null}
      </ProjectsPageContainer>
    </Layout>
  );
};

export default ProjectsPage;