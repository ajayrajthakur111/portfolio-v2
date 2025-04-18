
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '@/hooks/useTheme';
import ProjectCard from './ProjectCard';
import { Project } from '@/types/project.types';

const ProjectListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const FilterButton = styled.button<{ active: boolean; theme: 'light' | 'dark' }>`
  padding: 0.6rem 1.2rem;
  background-color: ${props => props.active
    ? '#3498db'
    : props.theme === 'dark' ? '#1e1e1e' : '#ffffff'};
  color: ${props => props.active
    ? '#ffffff'
    : props.theme === 'dark' ? '#e0e0e0' : '#555555'};
  border: none;
  border-radius: 2rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  &:hover {
    background-color: ${props => props.active
      ? '#2980b9'
      : props.theme === 'dark' ? '#2a2a2a' : '#f0f0f0'};
    transform: translateY(-2px);
  }
`;

const NoProjectsMessage = styled.p`
  text-align: center;
  padding: 2rem;
  color: ${props => props.theme === 'dark' ? '#a0a0a0' : '#666666'};
  grid-column: 1 / -1;
`;

interface ProjectListProps {
  projects: Project[];
  categories: string[];
  technologies: string[];
}

const ProjectList: React.FC<ProjectListProps> = ({ 
  projects, 
  categories, 
  technologies 
}) => {
  const { theme } = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTechnology, setSelectedTechnology] = useState<string>('all');

  const filteredProjects = projects.filter(project => {
    const categoryMatch = selectedCategory === 'all' || project.category === selectedCategory;
    const techMatch = selectedTechnology === 'all' || 
      project.technologies.includes(selectedTechnology);
    return categoryMatch && techMatch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <div>
      <FilterContainer>
        <FilterButton
          active={selectedCategory === 'all'}
          onClick={() => setSelectedCategory('all')}
          theme={theme}
        >
          All Categories
        </FilterButton>
        {categories.map((category) => (
          <FilterButton
            key={category}
            active={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
            theme={theme}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </FilterButton>
        ))}
      </FilterContainer>

      <FilterContainer>
        <FilterButton
          active={selectedTechnology === 'all'}
          onClick={() => setSelectedTechnology('all')}
          theme={theme}
        >
          All Technologies
        </FilterButton>
        {technologies.slice(0, 5).map((tech) => (
          <FilterButton
            key={tech}
            active={selectedTechnology === tech}
            onClick={() => setSelectedTechnology(tech)}
            theme={theme}
          >
            {tech}
          </FilterButton>
        ))}
      </FilterContainer>

      <ProjectListContainer
        ref={ref}
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {filteredProjects.length === 0 ? (
          <NoProjectsMessage theme={theme}>
            No projects found matching your filters.
          </NoProjectsMessage>
        ) : (
          filteredProjects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))
        )}
      </ProjectListContainer>
    </div>
  );
};

export default ProjectList;