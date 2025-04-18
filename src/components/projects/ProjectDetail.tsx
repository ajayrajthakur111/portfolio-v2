
import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@/hooks/useTheme';
import { Project } from '@/types/project.types';
import ReactMarkdown from 'react-markdown';
import { FiGithub, FiExternalLink, FiCalendar } from 'react-icons/fi';

const ProjectDetailContainer = styled.article`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const MainImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 1rem;
  @media (max-width: 768px) {
    height: 250px;
  }
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.02);
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#222222'};
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: ${props => props.theme === 'dark' ? '#666666' : '#999999'};
`;

const CategoryBadge = styled.span`
  display: inline-block;
  background-color: #3498db;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 2rem;
  font-size: 0.8rem;
  font-weight: 500;
  margin-right: 0.5rem;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const TechItem = styled.span`
  background-color: ${props => props.theme === 'dark' ? '#2a2a2a' : '#f0f0f0'};
  color: ${props => props.theme === 'dark' ? '#e0e0e0' : '#555555'};
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.9rem;
  font-weight: 500;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${props => props.theme === 'dark' ? '#2a2a2a' : '#f0f0f0'};
  color: ${props => props.theme === 'dark' ? '#e0e0e0' : '#333333'};
  padding: 0.8rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
  &:hover {
    background-color: #3498db;
    color: white;
    transform: translateY(-2px);
  }
`;

const Content = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${props => props.theme === 'dark' ? '#e0e0e0' : '#333333'};
  
  h2, h3, h4 {
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: ${props => props.theme === 'dark' ? '#ffffff' : '#222222'};
  }
  
  p {
    margin-bottom: 1.5rem;
  }
  
  a {
    color: #3498db;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  
  code {
    background-color: ${props => props.theme === 'dark' ? '#2a2a2a' : '#f0f0f0'};
    padding: 0.2rem 0.4rem;
    border-radius: 0.3rem;
    font-family: monospace;
  }
  
  pre {
    background-color: ${props => props.theme === 'dark' ? '#2a2a2a' : '#f0f0f0'};
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin-bottom: 1.5rem;
  }
  
  blockquote {
    border-left: 3px solid #3498db;
    padding-left: 1rem;
    margin-left: 0;
    color: ${props => props.theme === 'dark' ? '#a0a0a0' : '#666666'};
    font-style: italic;
  }
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
    margin: 1rem 0;
  }
`;

interface ProjectDetailProps {
  project: Project;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project }) => {
  const { theme } = useTheme();
  const [mainImage, setMainImage] = useState(project.thumbnail);

  return (
    <ProjectDetailContainer>
      <Gallery>
        <MainImage 
          src={mainImage || `/api/placeholder/800/400?text=${project.title}`} 
          alt={project.title} 
        />
        {project.images.length > 0 && (
          <>
            {project.images.slice(0, 3).map((image, index) => (
              <ThumbnailImage
                key={index}
                src={image}
                alt={`${project.title} screenshot ${index + 1}`}
                onClick={() => setMainImage(image)}
              />
            ))}
          </>
        )}
      </Gallery>

      <Title theme={theme}>{project.title}</Title>
      
      <MetaInfo>
        <MetaItem theme={theme}>
          <FiCalendar /> {new Date(project.completedAt).toLocaleDateString()}
        </MetaItem>
        <CategoryBadge>{project.category}</CategoryBadge>
      </MetaInfo>
      
      <TechStack>
        {project.technologies.map((tech, index) => (
          <TechItem key={index} theme={theme}>{tech}</TechItem>
        ))}
      </TechStack>
      
      <ProjectLinks>
        {project.repoUrl && (
          <ProjectLink 
            href={project.repoUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            theme={theme}
          >
            <FiGithub /> View Code
          </ProjectLink>
        )}
        {project.demoUrl && (
          <ProjectLink 
            href={project.demoUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            theme={theme}
          >
            <FiExternalLink /> Live Demo
          </ProjectLink>
        )}
      </ProjectLinks>
      
      <Content theme={theme}>
        <ReactMarkdown>{project.content}</ReactMarkdown>
      </Content>
    </ProjectDetailContainer>
  );
};

export default ProjectDetail;