// src/components/blog/BlogDetailPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { motion } from 'framer-motion'; // Import motion
import { useInView } from 'react-intersection-observer'; // Import useInView
import { useTheme } from '@/hooks/useTheme';
import Layout from '@/components/common/Layout'; // Assuming this wraps the content
import BlogDetail from '@/components/blog/BlogDetail'; // Assuming this exists and styles the blog content
import { BlogApi } from '@/api/blogApi'; // Assuming BlogApi exists

// Import type - Make sure BlogPost is exported in your types file
import { BlogPost } from '@/types/blog.types';

// Optional: Import icons for status messages if desired
// import { FiLoader, FiAlertTriangle, FiFrown } from 'react-icons/fi';

// --- CSS Variables (within the scope of this file) ---
const textSecondaryDark = '#a0a0a0';
const textSecondaryLight = '#555555';
const backgroundDark = '#0e0e0e'; // Consistent with other pages
const backgroundLight = '#fdfdfd'; // Consistent with other pages
const borderRadius = '0.75rem'; // Consistent border radius
const errorColor = '#e74c3c'; // Consistent error color

// --- Styled Components ---

// Wrapper to apply consistent page padding and background
const BlogDetailPageContainer = styled(motion.div)` // Add motion for potential page entrance animation
  max-width: 1200px; // Consistent max-width
  margin: 0 auto;
  padding: 4rem 2rem; // Consistent vertical padding
  background-color: ${props => props.theme === 'dark' ? backgroundDark : backgroundLight}; // Themed background
  transition: background-color 0.4s ease; // Smooth theme transition
  min-height: 80vh; // Ensure enough height to show loading/error message in center

  @media (max-width: 768px) {
    padding: 3rem 1rem; // Adjusted padding for mobile
  }
`;

// Combined Status Container for Loading, Error, Not Found states
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

// --- React Component ---

const BlogDetailPage: React.FC = () => {
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


  // Add type annotation for data: BlogPost | undefined
  const { data: post, isLoading, error } = useQuery<BlogPost | undefined>(
    ['blogPost', slug],
    // Use a conditional fetcher to avoid querying if slug is undefined
    // Resolve undefined if slug is missing
    () => slug ? BlogApi.getPostBySlug(slug) : Promise.resolve(undefined),
    {
      enabled: !!slug // Only run the query if slug exists
      // Add staleTime and cacheTime if needed for performance
      // Add retry: false optionally for 404s
    }
  );

   // Determine if the post was explicitly not found
   // Handles cases where the query finishes (not loading, no network error) but data is null/undefined
   const isNotFound = !isLoading && !error && !post && !!slug; // Only show "not found" if slug exists and no loading/error

  return (
    <Layout
      // Dynamic title based on state
      title={
          isLoading ? 'Loading Blog Post...'
        : error ? 'Error Loading Blog Post'
        : isNotFound ? 'Blog Post Not Found'
        : post ? `${post.title} | My Portfolio`
        : 'Blog Post | My Portfolio' // Default title
      }
      description={post?.excerpt || 'Read this blog post'}
    >
      {/* Apply animation variants to the container */}
      <BlogDetailPageContainer
          theme={theme} // Pass theme prop
          ref={containerRef} // Attach ref
          variants={containerVariants} // Apply variants
          initial="hidden"
          animate={inViewContainer ? "visible" : "hidden"} // Animate when container is in view
      >
        {isLoading ? (
          <StatusContainer theme={theme} type="loading">
             {/* <FiLoader /> */}
             Loading post...
          </StatusContainer>
        ) : error ? (
          <StatusContainer theme={theme} type="error">
             {/* <FiAlertTriangle /> */}
             Error loading post. Please try again.
          </StatusContainer>
        ) : isNotFound ? ( // Handle "not found" explicitly
           <StatusContainer theme={theme} type="notFound">
             {/* <FiFrown /> */}
             Post not found.
          </StatusContainer>
        ) : post ? (
          // Render the actual BlogDetail component when data is available
          // Removed theme prop - BlogDetail should use useTheme() internally
          <BlogDetail post={post} />
        ) : null} {/* Should not reach here if isNotFound logic is correct, but keeps it safe */}
      </BlogDetailPageContainer>
    </Layout>
  );
};

export default BlogDetailPage;