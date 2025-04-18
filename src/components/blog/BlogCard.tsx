
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiClock, FiCalendar, FiTag } from 'react-icons/fi';
import { useTheme } from '@/hooks/useTheme';
import { BlogPost } from '@/types/blog.types';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

const CardContainer = styled(motion.article)<{ featured?: boolean; theme: 'light' | 'dark' }>`
  background-color: ${props => props.theme === 'dark' ? '#1e1e1e' : '#ffffff'};
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: ${props => props.featured ? 'row' : 'column'};
  &:hover {
    transform: translateY(-7px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CardImage = styled.div<{ imageUrl: string }>`
  height: ${props => props.featured ? '100%' : '200px'};
  width: ${props => props.featured ? '40%' : '100%'};
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  transition: transform 0.5s;
  ${CardContainer}:hover & {
    transform: scale(1.05);
  }
  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;

const CardContent = styled.div<{ featured?: boolean }>`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
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
  align-self: flex-start;
`;

const Title = styled(Link)`
  font-size: ${props => props.featured ? '1.8rem' : '1.4rem'};
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#222222'};
  margin-bottom: 0.8rem;
  text-decoration: none;
  transition: color 0.3s;
  &:hover {
    color: #3498db;
  }
`;

const Excerpt = styled.p`
  font-size: 1rem;
  color: ${props => props.theme === 'dark' ? '#a0a0a0' : '#666666'};
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: ${props => props.featured ? 1 : 'unset'};
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  font-size: 0.9rem;
  color: ${props => props.theme === 'dark' ? '#666666' : '#999999'};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const AuthorAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const AuthorName = styled.span`
  font-weight: 500;
  color: ${props => props.theme === 'dark' ? '#e0e0e0' : '#333333'};
`;

const ReadMoreLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
  margin-top: 1.5rem;
  transition: gap 0.3s;
  &:hover {
    gap: 0.8rem;
  }
`;

const BlogCard: React.FC<BlogCardProps> = ({ post, featured = false }) => {
  const { theme } = useTheme();
  
  return (
    <CardContainer 
      layout
      featured={featured}
      theme={theme}
      whileHover={{ y: -5 }}
    >
      <CardImage 
        imageUrl={post.coverImage || `/api/placeholder/600/400?text=${post.title}`}
        featured={featured}
      />
      <CardContent featured={featured}>
        {post.categories.length > 0 && (
          <CategoryBadge>{post.categories[0]}</CategoryBadge>
        )}
        
        <Title 
          to={`/blog/${post.slug}`} 
          theme={theme}
          featured={featured}
        >
          {post.title}
        </Title>
        
        <Excerpt theme={theme} featured={featured}>
          {post.excerpt}
        </Excerpt>
        
        <MetaInfo theme={theme}>
          <MetaItem>
            <FiCalendar /> {new Date(post.publishedAt).toLocaleDateString()}
          </MetaItem>
          <MetaItem>
            <FiClock /> {post.readTime} min read
          </MetaItem>
          {post.tags.length > 0 && (
            <MetaItem>
              <FiTag /> {post.tags[0]}
            </MetaItem>
          )}
        </MetaInfo>
        
        <AuthorInfo>
          <AuthorAvatar 
            src={post.author.avatar || `/api/placeholder/40/40?text=${post.author.name.charAt(0)}`} 
            alt={post.author.name} 
          />
          <AuthorName theme={theme}>{post.author.name}</AuthorName>
        </AuthorInfo>
        
        <ReadMoreLink to={`/blog/${post.slug}`}>
          Read more →
        </ReadMoreLink>
      </CardContent>
    </CardContainer>
  );
};

export default BlogCard;