
import React from 'react';
import styled from 'styled-components';
import Layout from '@/components/common/Layout';
import Hero from '@/components/home/Hero';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import Skills from '@/components/home/Skills';
import Testimonials from '@/components/home/Testimonials';
import { Maps } from '@/components/common/Maps';
import { SocialWork } from '@/components/common/SocialWork';

const HomePageContainer = styled.div`
  max-width: 100%;
  overflow-x: hidden;
`;

const HomePage: React.FC = () => {

  return (
    <Layout 
      title="Home | My Portfolio" 
      description="Welcome to my professional portfolio showcasing my work and skills"
    >
      <HomePageContainer>
        <Hero />
        <FeaturedProjects />
        <Skills />
        <Testimonials />
        <Maps/>
        <SocialWork/> 
      </HomePageContainer>
    </Layout>
  );
};

export default HomePage;