
import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@/hooks/useTheme';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Layout from '@/components/common/Layout';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  text-align: center;
  padding: 2rem;
`;

const StatusCode = styled.h1`
  font-size: 8rem;
  font-weight: 700;
  color: ${props => props.theme === 'dark' ? '#3498db' : '#2980b9'};
  margin: 0;
  line-height: 1;
  @media (max-width: 768px) {
    font-size: 5rem;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#222222'};
  margin: 1rem 0;
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Message = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme === 'dark' ? '#a0a0a0' : '#666666'};
  max-width: 600px;
  margin-bottom: 2rem;
`;

const HomeLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background-color: #3498db;
  color: white;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s, transform 0.3s;
  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
  }
`;

const NotFoundPage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Layout 
      title="Page Not Found | My Portfolio" 
      description="The page you're looking for doesn't exist"
    >
      <NotFoundContainer>
        <StatusCode theme={theme}>404</StatusCode>
        <Title theme={theme}>Page Not Found</Title>
        <Message theme={theme}>
          The page you're looking for doesn't exist or has been moved. 
          Please check the URL or return to the homepage.
        </Message>
        <HomeLink to="/">
          <FiArrowLeft /> Back to Home
        </HomeLink>
      </NotFoundContainer>
    </Layout>
  );
};

export default NotFoundPage;