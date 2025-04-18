import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { useTheme } from '@/hooks/useTheme';
import Layout from '@/components/common/Layout';
import BlogDetail from '@/components/blog/BlogDetail';
import { BlogApi } from '@/api/blogApi';

const LoadingContainer = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${props => props.theme === 'dark' ? '#a0a0a0' : '#666666'};
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 3rem;
  color: #e74c3c;
`;

const BlogDetailPage: React.FC = () => {
  const { theme } = useTheme();
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery(
    ['blogPost', slug],
    () => BlogApi.getPostBySlug(slug || ''),
    {
      enabled: !!slug
    }
  );

  return (
    <Layout 
      title={post ? `${post.title} | My Portfolio` : 'Blog Post | My Portfolio'} 
      description={post?.excerpt || 'Read this blog post'}
    >
      {isLoading ? (
        <LoadingContainer theme={theme}>Loading post...</LoadingContainer>
      ) : error ? (
        <ErrorContainer>Error loading post. Please try again.</ErrorContainer>
      ) : post ? (
        <BlogDetail post={post} />
      ) : (
        <ErrorContainer>Post not found</ErrorContainer>
      )}
    </Layout>
  );
};

export default BlogDetailPage;