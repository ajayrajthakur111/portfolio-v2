// src/components/projects/ProjectDetailPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { motion } from 'framer-motion'; // Import motion
import { useInView } from 'react-intersection-observer'; // Import useInView
import { useTheme } from '@/hooks/useTheme';
import Layout from '@/components/common/Layout'; // Assuming this wraps the content
import ProjectDetail from '@/components/projects/ProjectDetail'; // Assuming this exists and styles the project content
import { ProjectApi } from '@/api/projectApi'; // Assuming ProjectApi exists

// Attempt to import Project type - adjust path/export if needed in your project
// If 'Project' is not exported from common.types, you might need to define it here or fix the export.
import { Project } from '@/types/project.types'; // Make sure Project is exported here

// --- CSS Variables (within the scope of this file) ---
// Removed unused variables based on warnings
const textSecondaryDark = '#a0a0a0';
const textSecondaryLight = '#555555';
const backgroundDark = '#0e0e0e'; // Consistent with other pages
const backgroundLight = '#fdfdfd'; // Consistent with other pages
const borderRadius = '0.75rem'; // Consistent border radius
const errorColor = '#e74c3c'; // Consistent error color

// --- Styled Components ---

// Wrapper to apply consistent page padding and background
const ProjectDetailPageContainer = styled(motion.div)` // Add motion for potential page entrance animation
  max-width: 1200px; // Adjusted max-width, can use 1400px if preferred
  margin: 0 auto;
  padding: 4rem 2rem; // Consistent vertical padding
  background-color: ${props => props.theme === 'dark' ? backgroundDark : backgroundLight}; // Themed background
  transition: background-color 0.4s ease; // Smooth theme transition
  min-height: 80vh; // Ensure enough height to show loading/error message in center

  @media (max-width: 768px) {
    padding: 3rem 1rem; // Adjusted padding for mobile
  }
`;

// Combined Status Container for Loading, Error, Not Found
// Added type annotation for theme prop for better type safety
const StatusContainer = styled(motion.div)<{ type?: 'loading' | 'error' | 'notFound', theme: 'light' | 'dark' }>`
  text-align: center;
  padding: 4rem 2rem; // Generous padding
  font-size: 1.2rem;
  font-weight: 500;
  border-radius: ${borderRadius}; // Consistent border radius
  margin: 2rem auto; // Center and add margin
  max-width: 400px; // Limit width
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  // Default styles (used for 'loading')
  color: ${props => props.theme === 'dark' ? textSecondaryDark : textSecondaryLight};
  background-color: ${props => props.theme === 'dark' ? '#1a1a1a' : '#f0f0f0'};
  border: 1px solid ${props => props.theme === 'dark' ? '#333' : '#ddd'};

  // Error specific styles
  ${props => props.type === 'error' && `
    color: ${errorColor};
    background-color: ${props.theme === 'dark' ? '#3a2020' : '#ffebeb'};
    border: 1px solid ${errorColor};
  `}

   // Not Found specific styles (can be similar to error or distinct)
  ${props => props.type === 'notFound' && `
    color: ${errorColor}; // Or a different color like textSecondary
    background-color: ${props.theme === 'dark' ? '#2a2a2a' : '#fff0f0'}; // Slightly different bg
    border: 1px solid ${errorColor}; // Or theme border
  `}

  svg {
      font-size: 2rem; // Icon size
      color: inherit; // Icon color inherits from text color
      margin-bottom: 0.5rem; // Space below icon
  }
`;

// Optional: Import icons for status messages
// import { FiLoader, FiAlertTriangle, FiFrown } from 'react-icons/fi';
// ... and render them inside StatusContainer conditionally based on 'type' prop

// --- React Component ---

const ProjectDetailPage: React.FC = () => {
  const { theme } = useTheme();
  // Specify that 'slug' should be a string
  const { slug } = useParams<{ slug: string }>();

  // Optional: Use useInView for the container itself if you want page-wide animation
   const [containerRef, inViewContainer] = useInView({
       triggerOnce: true,
       threshold: 0.1,
   });

   // Animation variants for the container
   const containerVariants = {
       hidden: { opacity: 0, y: 50 },
       visible: {
           opacity: 1,
           y: 0,
           transition: {
               duration: 0.6,
               ease: "easeOut"
           }
       }
   };

  // Add type annotation for data: Project | undefined
  const { data: project, isLoading, error } = useQuery<Project | undefined>(
    ['project', slug],
    // Use a conditional fetcher to avoid querying if slug is undefined
    // The query is already enabled: !!slug, so this extra check is belt-and-suspenders but harmless
    () => slug ? ProjectApi.getProjectBySlug(slug) : Promise.resolve(undefined), // Resolve undefined if slug is missing
    {
      enabled: !!slug, // Only run the query if slug exists
      // Add staleTime and cacheTime if needed for performance
      // staleTime: 5 * 60 * 1000, // 5 minutes
      // cacheTime: 10 * 60 * 1000, // 10 minutes
      // retry: false, // Optionally disable retries on 404 if your API returns errors for not found
    }
  );

   // Determine if the project was explicitly not found
   // This handles cases where the query finishes (not loading, no network error) but data is null/undefined
   const isNotFound = !isLoading && !error && !project && !!slug; // Only show "not found" if slug exists and no loading/error

  return (
    <Layout
      // Dynamic title based on state
      title={
          isLoading ? 'Loading Project...'
        : error ? 'Error Loading Project'
        : isNotFound ? 'Project Not Found'
        : project ? `${project.title} | My Portfolio`
        : 'Project | My Portfolio' // Default title
      }
      description={project?.summary || 'View this project details'}
    >
      {/* Apply animation variants to the container */}
      <ProjectDetailPageContainer
          theme={theme} // Pass theme prop
          ref={containerRef} // Attach ref
          variants={containerVariants} // Apply variants
          initial="hidden"
          animate={inViewContainer ? "visible" : "hidden"} // Animate when container is in view
      >
        {isLoading ? (
          <StatusContainer theme={theme} type="loading">
             {/* <FiLoader /> */}
             Loading project...
          </StatusContainer>
        ) : error ? (
          <StatusContainer theme={theme} type="error">
             {/* <FiAlertTriangle /> */}
             Error loading project. Please try again.
          </StatusContainer>
        ) : isNotFound ? ( // Handle "not found" explicitly
           <StatusContainer theme={theme} type="notFound">
             {/* <FiFrown /> */}
             Project not found.
          </StatusContainer>
        ) : project ? (
          // Render the actual ProjectDetail component when data is available
          // Removed theme prop - ProjectDetail should use useTheme() internally
          <ProjectDetail project={project} />
        ) : null} {/* Should not reach here if isNotFound logic is correct, but keeps it safe */}
      </ProjectDetailPageContainer>
    </Layout>
  );
};

export default ProjectDetailPage;