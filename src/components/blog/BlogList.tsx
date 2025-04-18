
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '@/hooks/useTheme';
import BlogCard from './BlogCard';
import { BlogPost } from '@/types/blog.types';

const BlogListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedPostContainer = styled.div`
  grid-column: 1 / -1;
`;

const NoPostsMessage = styled.p`
  text-align: center;
  padding: 2rem;
  color: ${props => props.theme === 'dark' ? '#a0a0a0' : '#666666'};
  grid-column: 1 / -1;
`;

interface BlogListProps {
  posts: BlogPost[];
  featuredPost?: BlogPost | null;
}

const BlogList: React.FC<BlogListProps> = ({ posts, featuredPost = null }) => {
  const { theme } = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
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
    <BlogListContainer
      ref={ref}
      as={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {featuredPost && (
        <FeaturedPostContainer as={motion.div} variants={itemVariants}>
          <BlogCard post={featuredPost} featured />
        </FeaturedPostContainer>
      )}
      
      {posts.length === 0 ? (
        <NoPostsMessage theme={theme}>
          No blog posts found. Check back later!
        </NoPostsMessage>
      ) : (
        posts.map((post) => (
          <motion.div key={post.id} variants={itemVariants}>
            <BlogCard post={post} />
          </motion.div>
        ))
      )}
    </BlogListContainer>
  );
};

export default BlogList;