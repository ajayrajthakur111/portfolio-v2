

// src/components/home/FeaturedProjects.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { FiArrowRight, FiGithub, FiExternalLink } from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';
import { ProjectApi } from '@/api/projectApi';
import { Project } from '@/types/project.types';
import { useQuery } from 'react-query';

const SectionContainer = styled.section`
  padding: 5rem 2rem;
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const SectionContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#222222'};
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background-color: #3498db;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme === 'dark' ? '#a0a0a0' : '#666666'};
  max-width: 600px;
  margin: 0 auto;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background-color: ${props => props.theme === 'dark' ? '#1e1e1e' : '#ffffff'};
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.5s;
  
  ${ProjectCard}:hover & {
    transform: scale(1.05);
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectCategory = styled.span`
  font-size: 0.9rem;
  color: #3498db;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ProjectTitle = styled(Link)`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#222222'};
  margin: 0.5rem 0;
  display: block;
  text-decoration: none;
  transition: color 0.3s;
  
  &:hover {
    color: #3498db;
  }
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  color: ${props => props.theme === 'dark' ? '#a0a0a0' : '#666666'};
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const ProjectTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  background-color: ${props => props.theme === 'dark' ? '#2a2a2a' : '#f0f0f0'};
  color: ${props => props.theme === 'dark' ? '#e0e0e0' : '#555555'};
  padding: 0.3rem 0.8rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ProjectLinks = styled.div`
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

const ProjectMoreLink = styled(Link)`
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

const ViewAllLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 3rem auto 0;
  background-color: transparent;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#333333'};
  padding: 0.8rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  border: 2px solid ${props => props.theme === 'dark' ? '#ffffff' : '#333333'};
  transition: background-color 0.3s, transform 0.3s, color 0.3s, gap 0.3s;
  width: fit-content;
  
  &:hover {
    background-color: ${props => props.theme === 'dark' ? '#ffffff' : '#333333'};
    color: ${props => props.theme === 'dark' ? '#333333' : '#ffffff'};
    transform: translateY(-2px);
    gap: 0.8rem;
  }
`;

const Loader = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${props => props.theme === 'dark' ? '#a0a0a0' : '#666666'};
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #e74c3c;
`;

const FeaturedProjects: React.FC = () => {
  const { theme } = useTheme();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const { data: projects, isLoading, error } = useQuery<Project[]>(
    'featuredProjects',
    ProjectApi.getFeaturedProjects
  );
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  
  return (
    <SectionContainer ref={ref}>
      <SectionContent>
        <SectionHeader>
          <SectionTitle theme={theme}>Featured Projects</SectionTitle>
          <SectionSubtitle theme={theme}>
            Check out some of my recent work. These projects showcase my skills and expertise.
          </SectionSubtitle>
        </SectionHeader>
        
        {isLoading ? (
          <Loader theme={theme}>Loading projects...</Loader>
        ) : error ? (
          <ErrorMessage>Failed to load projects. Please try again.</ErrorMessage>
        ) : (
          <>
            <ProjectsGrid
              as={motion.div}
              variants={containerVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              {projects?.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  theme={theme}
                  variants={itemVariants}
                >
                  <ProjectImage 
                    src={project.thumbnail || `/api/placeholder/400/200?text=${project.title}`} 
                    alt={project.title} 
                  />
                  <ProjectContent>
                    <ProjectCategory>{project.category}</ProjectCategory>
                    <ProjectTitle to={`/projects/${project.slug}`} theme={theme}>
                      {project.title}
                    </ProjectTitle>
                    <ProjectDescription theme={theme}>
                      {project.summary}
                    </ProjectDescription>
                    <ProjectTech>
                      {project.technologies.slice(0, 4).map((tech, index) => (
                        <TechTag key={index} theme={theme}>
                          {tech}
                        </TechTag>
                      ))}
                      {project.technologies.length > 4 && (
                        <TechTag theme={theme}>+{project.technologies.length - 4}</TechTag>
                      )}
                    </ProjectTech>
                    <ProjectLinks>
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
                        {project.repoUrl && project.demoUrl && <span> &nbsp;|&nbsp; </span>}
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
                      <ProjectMoreLink to={`/projects/${project.slug}`}>
                        View Details <FiArrowRight />
                      </ProjectMoreLink>
                    </ProjectLinks>
                  </ProjectContent>
                </ProjectCard>
              ))}
            </ProjectsGrid>
            
            <ViewAllLink to="/projects" theme={theme}>
              View All Projects <FiArrowRight />
            </ViewAllLink>
          </>
        )}
      </SectionContent>
    </SectionContainer>
  );
};

export default FeaturedProjects;