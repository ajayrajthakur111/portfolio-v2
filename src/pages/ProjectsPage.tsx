// src/components/projects/ProjectsPage.tsx
import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { motion } from 'framer-motion'; // Import motion
import { useInView } from 'react-intersection-observer'; // Import useInView
import { useTheme } from '@/hooks/useTheme';
import Layout from '@/components/common/Layout';
import ProjectList from '@/components/projects/ProjectList'; // Assuming this component exists and is styled separately
import { ProjectApi } from '@/api/projectApi'; // Assuming ProjectApi exists

// --- CSS Variables (within the scope of this file) ---
const accentColor = '#3498db';
const accentColorHover = '#2980b9';
const textColorDark = '#ffffff';
const textColorLight = '#222222';
const textSecondaryDark = '#a0a0a0';
const textSecondaryLight = '#555555';
const backgroundDark = '#0e0e0e'; // Consistent with Hero/About
const backgroundLight = '#fdfdfd'; // Consistent with Hero/About

// --- Styled Components ---

const ProjectsPageContainer = styled(motion.div)` // Add motion for potential page entrance animation
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2rem; // Increased vertical padding for more breathing room
  background-color: ${props => props.theme === 'dark' ? backgroundDark : backgroundLight}; // Themed background
  transition: background-color 0.4s ease; // Smooth theme transition

  @media (max-width: 768px) {
    padding: 3rem 1rem; // Adjusted padding for mobile
  }
`;

const PageHeader = styled(motion.div)` // Add motion for animation
  text-align: center;
  margin-bottom: 4rem; // More space below header

  @media (max-width: 768px) {
    margin-bottom: 3rem;
  }
`;

const PageTitle = styled.h1`
  font-size: 3.5rem; // Larger title like Hero
  font-weight: 700; // Bolder font like Hero
  color: ${props => props.theme === 'dark' ? textColorDark : textColorLight};
  margin-bottom: 1.5rem; // Adjusted margin below title
  position: relative;
  display: inline-block; // Needed for :after positioning below text
  padding-bottom: 15px; // Add padding for underline

  &:after {
    content: '';
    position: absolute;
    bottom: 0; // Position at the bottom of the padding
    left: 50%;
    transform: translateX(-50%);
    width: 100px; // Wide underline
    height: 5px; // Thicker underline
    background: linear-gradient(90deg, ${accentColorHover}, ${accentColor}); // Gradient underline like About page titles
    border-radius: 3px; // Subtle rounded ends
  }

  @media (max-width: 768px) {
     font-size: 2.5rem; // Adjusted font size for mobile
     padding-bottom: 10px;
     &:after {
        height: 4px;
     }
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.2rem; // Slightly larger subtitle like HeroSubtitle
  line-height: 1.8; // Consistent line height
  color: ${props => props.theme === 'dark' ? textSecondaryDark : textSecondaryLight}; // Themed secondary color
  max-width: 700px; // Slightly wider max-width
  margin: 0 auto;

   @media (max-width: 768px) {
     font-size: 1.1rem;
   }
`;

const StatusContainer = styled(motion.div)` // Use a single styled component for loading/error
  text-align: center;
  padding: 4rem 2rem; // Generous padding
  font-size: 1.2rem;
  font-weight: 500;
  border-radius: 0.75rem; // Consistent border radius
  margin: 2rem auto; // Center and add margin
  max-width: 400px; // Limit width

  // Conditional styling based on props (you'd pass 'isError' or 'isSuccess' via props)
  &.loading {
    color: ${props => props.theme === 'dark' ? textSecondaryDark : textSecondaryLight};
    background-color: ${props => props.theme === 'dark' ? '#1a1a1a' : '#f0f0f0'};
    border: 1px solid ${props => props.theme === 'dark' ? '#333' : '#ddd'};
  }

  &.error {
    color: #e74c3c; // Error color
    background-color: ${props => props.theme === 'dark' ? '#3a2020' : '#ffebeb'}; // Themed error background
    border: 1px solid #e74c3c;
  }
`;


// --- React Component ---

const ProjectsPage: React.FC = () => {
  const { theme } = useTheme();

   // Use useInView for animating the header
   const [headerRef, inViewHeader] = useInView({
       triggerOnce: true,
       threshold: 0.1,
   });

  const { data: projects, isLoading, error } = useQuery(
    'projects',
    () => ProjectApi.getAllProjects()
  );

  // Assuming categories and technologies are also needed by ProjectList
  const { data: categories, isLoading: isLoadingCategories } = useQuery(
    'projectCategories',
    ProjectApi.getProjectCategories
  );

  const { data: technologies, isLoading: isLoadingTechnologies } = useQuery(
    'projectTechnologies',
    ProjectApi.getTechnologies
  );

  // Animation variants for the header
  const headerVariants = {
      hidden: { opacity: 0, y: 40 },
      visible: {
          opacity: 1,
          y: 0,
          transition: {
              duration: 0.6,
              ease: "easeOut"
          }
      }
  };

  // Determine overall loading/error state
  const overallLoading = isLoading || isLoadingCategories || isLoadingTechnologies;
  const overallError = error; // We'll just show one error message for simplicity

  return (
    <Layout
      title="Projects | My Portfolio"
      description="Check out my portfolio projects"
    >
      {/* Apply animation variants to the container if you want the whole page to fade in */}
       <ProjectsPageContainer
           theme={theme} // Pass theme prop
           // Add variants/initial/animate here if animating the whole container
           // variants={...}
           // initial="hidden"
           // animate="visible"
       >
        {/* Animate the header separately */}
        <PageHeader
            ref={headerRef} // Attach ref to header
            variants={headerVariants}
            initial="hidden"
            animate={inViewHeader ? "visible" : "hidden"} // Animate when header comes into view
        >
          <PageTitle theme={theme}>My Projects</PageTitle>
          <PageSubtitle theme={theme}>
            A collection of my work, showcasing my skills and experience.
          </PageSubtitle>
        </PageHeader>

        {/* Status messages */}
        {overallLoading ? (
          <StatusContainer theme={theme} className="loading">Loading projects...</StatusContainer>
        ) : overallError ? (
          <StatusContainer theme={theme} className="error">Error loading projects. Please try again.</StatusContainer>
        ) : projects && categories && technologies ? (
          // ProjectList component assumes it receives necessary data
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