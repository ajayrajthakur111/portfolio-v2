
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { Project } from '@/types/project.types';

const CardContainer = styled(motion.div)<{ theme: 'light' | 'dark' }>`
  background-color: ${props => props.theme === 'dark' ? '#1e1e1e' : '#ffffff'};
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    transform: translateY(-7px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }
`;

const CardImage = styled.div<{ imageUrl: string }>`
  height: 200px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  transition: transform 0.5s;
  ${CardContainer}:hover & {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CategoryBadge = styled.span`
  display: inline-block;
  background-color: #3498db;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 2rem;
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const Title = styled(Link)`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#222222'};
  margin-bottom: 0.8rem;
  display: block;
  text-decoration: none;
  transition: color 0.3s;
  &:hover {
    color: #3498db;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  color: ${props => props.theme === 'dark' ? '#a0a0a0' : '#666666'};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechItem = styled.span`
  background-color: ${props => props.theme === 'dark' ? '#2a2a2a' : '#f0f0f0'};
  color: ${props => props.theme === 'dark' ? '#e0e0e0' : '#555555'};
  padding: 0.3rem 0.8rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme === 'dark' ? '#e0e0e0' : '#555555'};
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.3s;
  &:hover {
    color: #3498db;
  }
`;

const ViewDetailsLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #3498db;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: gap 0.3s;
  &:hover {
    gap: 0.8rem;
  }
`;

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { theme } = useTheme();

  return (
    <CardContainer
      layout
      theme={theme}
      whileHover={{ y: -5 }}
    >
      <CardImage 
        imageUrl={project.thumbnail || `/api/placeholder/400/200?text=${project.title}`}
      />
      <CardContent>
        <CategoryBadge>{project.category}</CategoryBadge>
        <Title to={`/projects/${project.slug}`} theme={theme}>
          {project.title}
        </Title>
        <Description theme={theme}>
          {project.summary}
        </Description>
        
        <TechStack>
          {project.technologies.slice(0, 4).map((tech, index) => (
            <TechItem key={index} theme={theme}>{tech}</TechItem>
          ))}
          {project.technologies.length > 4 && (
            <TechItem theme={theme}>+{project.technologies.length - 4}</TechItem>
          )}
        </TechStack>
        
        <LinksContainer>
          <div>
            {project.repoUrl && (
              <ProjectLink 
                href={project.repoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                theme={theme}
              >
                <FiGithub /> Code
              </ProjectLink>
            )}
            {project.repoUrl && project.demoUrl && <span> | </span>}
            {project.demoUrl && (
              <ProjectLink 
                href={project.demoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                theme={theme}
              >
                <FiExternalLink /> Demo
              </ProjectLink>
            )}
          </div>
          <ViewDetailsLink to={`/projects/${project.slug}`}>
            View Details →
          </ViewDetailsLink>
        </LinksContainer>
      </CardContent>
    </CardContainer>
  );
};

export default ProjectCard;