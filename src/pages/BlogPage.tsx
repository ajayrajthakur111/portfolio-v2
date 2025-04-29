// src/components/blog/BlogPage.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '@/hooks/useTheme';
import Layout from '@/components/common/Layout';
import BlogList from '@/components/blog/BlogList';
import CategoryFilter from '@/components/blog/CategoryFilter';
import { BlogApi } from '@/api/blogApi';

// Import types - Corrected import names based on your blog.types.ts
import { BlogFilters, BlogPost, CategoryWithCount } from '@/types/blog.types'; // Corrected: Blog -> BlogPost, Category -> CategoryWithCount

// --- CSS Variables (within the scope of this file) ---
const accentColor = '#3498db';
const accentColorHover = '#2980b9';
const textColorDark = '#ffffff';
const textColorLight = '#222222';
const textSecondaryDark = '#a0a0a0';
const textSecondaryLight = '#555555'; // Using #555 from HeroSubtitle/About
const backgroundDark = '#0e0e0e'; // Consistent with other pages
const backgroundLight = '#fdfdfd'; // Consistent with other pages
const borderRadius = '0.75rem'; // Consistent border radius
const errorColor = '#e74c3c'; // Consistent error color

// --- Styled Components ---

const BlogPageContainer = styled(motion.div)` // Add motion for potential page entrance animation
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2rem; // Increased vertical padding for more breathing room
  background-color: ${props => props.theme === 'dark' ? backgroundDark : backgroundLight}; // Themed background
  transition: background-color 0.4s ease; // Smooth theme transition
  min-height: 80vh; // Ensure enough height for content/status messages

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

// Combined Status Container for Loading, Error, Not Found/Empty states
// Added type annotation for theme prop for better type safety
const StatusContainer = styled(motion.div)<{ type?: 'loading' | 'error' | 'empty', theme: 'light' | 'dark' }>`
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

  // Default styles (used for 'loading' and 'empty')
  color: ${props => props.theme === 'dark' ? textSecondaryDark : textSecondaryLight};
  background-color: ${props => props.theme === 'dark' ? '#1a1a1a' : '#f0f0f0'};
  border: 1px solid ${props => props.theme === 'dark' ? '#333' : '#ddd'};

  // Error specific styles
  ${props => props.type === 'error' && `
    color: ${errorColor};
    background-color: ${props.theme === 'dark' ? '#3a2020' : '#ffebeb'};
    border: 1px solid ${errorColor};
  `}

  svg {
      font-size: 2rem; // Icon size
      color: inherit; // Icon color inherits from text color
      margin-bottom: 0.5rem; // Space below icon
  }
`;

const BlogContent = styled(motion.div)` // Wrapper for filter and list
    margin-top: 2rem; // Space above filter/list area
`;

// --- React Component ---

const BlogPage: React.FC = () => {
  const { theme } = useTheme();
  const [filters, setFilters] = useState<BlogFilters>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

   // Use useInView for animating the header
   const [headerRef, inViewHeader] = useInView({
       triggerOnce: true,
       threshold: 0.1,
   });

   // Use useInView for animating the blog content area (filter + list)
    const [contentRef, inViewContent] = useInView({
        triggerOnce: true,
        threshold: 0.1,
        // rootMargin: '0px 0px -50px 0px', // Adjust root margin if needed
    });


  // Add type annotation for data: BlogPost[] | undefined
  const { data: posts, isLoading, error } = useQuery<BlogPost[] | undefined>( // Corrected type: Blog -> BlogPost
    ['blogPosts', filters],
    () => BlogApi.getAllPosts(filters),
    {
      keepPreviousData: true, // Keep previous data visible while loading new filtered results
    }
  );

   // Typing categories data: CategoryWithCount[] | undefined
  const { data: categories } = useQuery<CategoryWithCount[] | undefined>( // Corrected type: Category -> CategoryWithCount, Removed isLoadingCategories
    'blogCategories',
    BlogApi.getCategories
  );

   // Typing featured post data: BlogPost | null | undefined
   const { data: featuredPost } = useQuery<BlogPost | null >( // Corrected type: Blog -> BlogPost, Removed isLoadingFeatured
    'featuredBlogPost',
    () => BlogApi.getFeaturedPosts().then(posts => posts[0] || null)
  );


  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setFilters(prev => ({
      ...prev,
      category: category || undefined // Set category filter or remove it
    }));
     // Optional: Reset scroll position or apply animation on filter change
  };

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

   // Animation variants for the blog content (filter + list)
   const contentVariants = {
       hidden: { opacity: 0, y: 40 },
       visible: {
           opacity: 1,
           y: 0,
           transition: {
               duration: 0.6,
               ease: "easeOut",
               delay: 0.2 // Small delay after header animation
           }
       }
   };


   // Check if there are no posts found after loading, without error
   const isEmpty = !isLoading && !error && (!posts || posts.length === 0);


  return (
    <Layout title="Blog | My Portfolio" description="Read my latest articles and thoughts">
      <BlogPageContainer theme={theme}> {/* Pass theme to container */}

        {/* Animate the header separately */}
        <PageHeader
            ref={headerRef} // Attach ref to header
            variants={headerVariants}
            initial="hidden"
            animate={inViewHeader ? "visible" : "hidden"} // Animate when header comes into view
        >
          <PageTitle theme={theme}>Blog</PageTitle>
          <PageSubtitle theme={theme}>
            Thoughts, tutorials, and insights on web development, design, and more.
          </PageSubtitle>
        </PageHeader>

        {/* Use a separate ref and motion wrapper for the main blog content area */}
        <BlogContent
            ref={contentRef}
            variants={contentVariants}
            initial="hidden"
            animate={inViewContent ? "visible" : "hidden"}
        >
            {/* Render filter only when categories are loaded */}
            {/* Removed theme prop, CategoryFilter should use useTheme() internally */}
            {/* Pass categories with correct type: CategoryWithCount[] */}
            {categories && (
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategorySelect}
                // theme={theme} // Removed theme prop
              />
            )}

            {/* Status messages */}
            {isLoading ? (
                <StatusContainer theme={theme} type="loading">
                    Loading posts...
                </StatusContainer>
            ) : error ? (
                <StatusContainer theme={theme} type="error">
                    Error loading posts. Please try again.
                </StatusContainer>
            ) : isEmpty ? ( // Handle empty state
                <StatusContainer theme={theme} type="empty">
                    No posts found matching this criteria.
                </StatusContainer>
            ) : (
                // Render BlogList when posts are loaded and not empty/error
                // Removed theme prop, BlogList should use useTheme() internally
                /* Pass posts with correct type: BlogPost[] */
                <BlogList
                    posts={posts || []}
                    featuredPost={featuredPost||null}
                    // theme={theme} // Removed theme prop
                />
            )}
        </BlogContent>

      </BlogPageContainer>
    </Layout>
  );
};

export default BlogPage;