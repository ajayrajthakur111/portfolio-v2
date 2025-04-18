
// src/components/home/Hero.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { FiArrowRight } from 'react-icons/fi';

const HeroContainer = styled.section`
  min-height: 90vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 2rem;

  @media (max-width: 768px) {
    min-height: 70vh;
    padding: 1rem;
  }
`;

const HeroContent = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  position: relative;
  z-index: 2;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const HeroTextContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;

  @media (max-width: 992px) {
    order: 2;
    align-items: center;
  }
`;

const HeroImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 992px) {
    order: 1;
  }
`;

const HeroImage = styled(motion.img)`
  max-width: 100%;
  height: auto;
  border-radius: 1rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

const GreetingText = styled(motion.p)`
  font-size: 1.2rem;
  color: #3498db;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:before {
    content: '';
    width: 40px;
    height: 2px;
    background-color: #3498db;
    display: inline-block;
    
    @media (max-width: 992px) {
      display: none;
    }
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#222222'};
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.6;
  color: ${props => props.theme === 'dark' ? '#a0a0a0' : '#666666'};
  max-width: 600px;
  
  @media (max-width: 992px) {
    margin: 0 auto;
  }
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #3498db;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.3s, transform 0.3s;
  
  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#333333'};
  padding: 0.8rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  border: 2px solid ${props => props.theme === 'dark' ? '#ffffff' : '#333333'};
  transition: background-color 0.3s, transform 0.3s, color 0.3s;
  
  &:hover {
    background-color: ${props => props.theme === 'dark' ? '#ffffff' : '#333333'};
    color: ${props => props.theme === 'dark' ? '#333333' : '#ffffff'};
    transform: translateY(-2px);
  }
`;

const BackgroundShape = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 1;
  opacity: 0.5;
`;

const Shape1 = styled(BackgroundShape)`
  background-color: #3498db;
  width: 300px;
  height: 300px;
  top: -150px;
  right: 10%;
`;

const Shape2 = styled(BackgroundShape)`
  background-color: #e74c3c;
  width: 200px;
  height: 200px;
  bottom: -100px;
  left: 20%;
`;

const Hero: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <HeroContainer>
      <Shape1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2 }}
      />
      <Shape2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
      
      <HeroContent>
        <HeroTextContent>
          <GreetingText
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            Hello, my name is
          </GreetingText>
          
          <HeroTitle 
            theme={theme}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Ajay Rajput<br />
            <span style={{ color: '#3498db' }}>Full Stack Developer</span>
          </HeroTitle>
          
          <HeroSubtitle 
            theme={theme}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            I create elegant and performant web applications with modern technologies.
            Specializing in React, TypeScript, and Node.js to build exceptional digital experiences.
          </HeroSubtitle>
          
          <HeroButtons
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <PrimaryButton to="/projects">
              View My Work <FiArrowRight />
            </PrimaryButton>
            <SecondaryButton to="/contact" theme={theme}>
              Let's Talk
            </SecondaryButton>
          </HeroButtons>
        </HeroTextContent>
        
        <HeroImageContainer>
          <HeroImage 
            src="/api/placeholder/500/500"
            alt="John Doe - Full Stack Developer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </HeroImageContainer>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;
