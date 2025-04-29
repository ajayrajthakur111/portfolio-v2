import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@/hooks/useTheme';
import { BlogPost } from '@/types/blog.types';
// import ReactMarkdown from 'react-markdown';
import { FiCalendar, FiClock, FiTag } from 'react-icons/fi';

const BlogDetailContainer = styled.article`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const CoverImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 1rem;
  margin-bottom: 2rem;
  @media (max-width: 768px) {
    height: 250px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#222222'};
  margin-bottom: 1rem;
  line-height: 1.3;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;
  font-size: 0.9rem;
  color: ${props => props.theme === 'dark' ? '#666666' : '#999999'};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const AuthorAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const AuthorDetails = styled.div``;

const AuthorName = styled.h3`
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#222222'};
  margin: 0;
`;

const PublishDate = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme === 'dark' ? '#a0a0a0' : '#666666'};
  margin: 0;
`;

const Content = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${props => props.theme === 'dark' ? '#e0e0e0' : '#333333'};
  margin-bottom: 3rem;
  
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

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background-color: ${props => props.theme === 'dark' ? '#2a2a2a' : '#f0f0f0'};
  color: ${props => props.theme === 'dark' ? '#e0e0e0' : '#555555'};
  padding: 0.3rem 0.8rem;
  border-radius: 2rem;
  font-size: 0.8rem;
  font-weight: 500;
`;

interface BlogDetailProps {
  post: BlogPost;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ post }) => {
  const { theme } = useTheme();

  return (
    <BlogDetailContainer>
      <CoverImage 
        src={post.coverImage || `/api/placeholder/800/400?text=${post.title}`} 
        alt={post.title} 
      />
      
      <Title theme={theme}>{post.title}</Title>
      
      <MetaInfo theme={theme}>
        <MetaItem>
          <FiCalendar /> {new Date(post.publishedAt).toLocaleDateString()}
        </MetaItem>
        <MetaItem>
          <FiClock /> {post.readTime} min read
        </MetaItem>
      </MetaInfo>
      
      <AuthorInfo>
        <AuthorAvatar 
          src={post.author.avatar || `/api/placeholder/50/50?text=${post.author.name.charAt(0)}`} 
          alt={post.author.name} 
        />
        <AuthorDetails>
          <AuthorName theme={theme}>{post.author.name}</AuthorName>
          <PublishDate theme={theme}>
            Published on {new Date(post.publishedAt).toLocaleDateString()}
          </PublishDate>
        </AuthorDetails>
      </AuthorInfo>
      
      {post.categories.length > 0 && (
        <div>
          {post.categories.map((category) => (
            <CategoryBadge key={category}>{category}</CategoryBadge>
          ))}
        </div>
      )}
      
      <Content theme={theme}   dangerouslySetInnerHTML={{ __html: post.content }}
>
      </Content>
      
      {post.tags.length > 0 && (
        <TagsContainer>
          <FiTag />
          {post.tags.map((tag) => (
            <Tag key={tag} theme={theme}>{tag}</Tag>
          ))}
        </TagsContainer>
      )}
    </BlogDetailContainer>
  );
};

export default BlogDetail;