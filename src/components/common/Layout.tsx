
// src/components/common/Layout.tsx
import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import styled from 'styled-components';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

const Main = styled.main`
  min-height: calc(100vh - 140px); // Adjusting for header and footer
  width: 100%;
`;

const Layout: React.FC<LayoutProps> = ({
  children,
  title = 'Modern Portfolio',
  description = 'A professional portfolio showcasing my work and skills',
  className,
}) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <div className={`app-container ${className || ''}`}>
        <Header />
        <Main>{children}</Main>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default Layout;
