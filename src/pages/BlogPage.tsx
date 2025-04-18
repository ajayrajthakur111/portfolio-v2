import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { useTheme } from '@/hooks/useTheme';
import Layout from '@/components/common/Layout';
import BlogList from '@/components/blog/BlogList';
import CategoryFilter from '@/components/blog/CategoryFilter';
import { BlogApi } from '@/api/blogApi';
import { BlogFilters } from '@/types/blog.types';

const BlogPageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#222222'};
  margin-bottom: 1rem;
`;

const PageSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme === 'dark' ? '#a0a0a0' : '#666666'};
  max-width: 600px;
  margin: 0 auto;
`;

const BlogPage: React.FC = () => {
  const { theme } = useTheme();
  const [filters, setFilters] = useState<BlogFilters>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: posts, isLoading, error } = useQuery(
    ['blogPosts', filters],
    () => BlogApi.getAllPosts(filters)
  );

  const { data: featuredPost } = useQuery(
    'featuredBlogPost',
    () => BlogApi.getFeaturedPosts().then(posts => posts[0] || null)
  );

  const { data: categories } = useQuery(
    'blogCategories',
    BlogApi.getCategories
  );

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setFilters(prev => ({
      ...prev,
      category: category || undefined
    }));
  };

  return (
    <Layout title="Blog | My Portfolio" description="Read my latest articles and thoughts">
      <BlogPageContainer>
        <PageHeader>
          <PageTitle theme={theme}>Blog</PageTitle>
          <PageSubtitle theme={theme}>
            Thoughts, tutorials, and insights on web development, design, and more.
          </PageSubtitle>
        </PageHeader>

        {categories && (
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
        )}

        {isLoading ? (
          <p>Loading posts...</p>
        ) : error ? (
          <p>Error loading posts. Please try again.</p>
        ) : (
          <BlogList 
            posts={posts || []} 
            featuredPost={featuredPost || null}
          />
        )}
      </BlogPageContainer>
    </Layout>
  );
};

export default BlogPage;