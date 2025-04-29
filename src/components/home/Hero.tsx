// src/components/home/Hero.tsx
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { FiArrowRight } from 'react-icons/fi';
import { ReactTyped } from 'react-typed';

const HeroContainer = styled.section`
  min-height: 90vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 2rem;
  background: ${({ theme }) => (theme === 'dark' ? '#0e0e0e' : '#fdfdfd')};
  transition: background 0.3s ease;

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
    margin-bottom: 2rem;
  }
`;

const HeroImage = styled(motion.img)`
  max-width: 100%;
  height: auto;
  border-radius: 1rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  object-fit: cover;
  filter: blur(4px);
  transition: filter 0.5s ease;

  &.loaded {
    filter: blur(0);
  }
`;

const GreetingText = styled(motion.p)`
  font-size: 1.1rem;
  color: #3498db;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  letter-spacing: 0.5px;

  &::before {
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

const HeroTitle = styled(motion.h1)<{ theme: 'light' | 'dark' }>`
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: ${({ theme }) => (theme === 'dark' ? '#ffffff' : '#222222')};

  span {
    color: #3498db;
    display: inline-block;
    margin-top: 0.3rem;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)<{ theme: 'light' | 'dark' }>`
  font-size: 1.2rem;
  line-height: 1.8;
  color: ${({ theme }) => (theme === 'dark' ? '#a0a0a0' : '#555555')};
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
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 6px 20px rgba(52, 152, 219, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    background: #2980b9;
  }
`;

const SecondaryButton = styled(Link)<{ theme: 'light' | 'dark' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent;
  color: ${({ theme }) => (theme === 'dark' ? '#ffffff' : '#333333')};
  padding: 0.8rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  border: 2px solid ${({ theme }) => (theme === 'dark' ? '#ffffff' : '#333333')};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => (theme === 'dark' ? '#ffffff' : '#333333')};
    color: ${({ theme }) => (theme === 'dark' ? '#333333' : '#ffffff')};
    transform: translateY(-2px);
  }
`;

const BackgroundShape = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 1;
  opacity: 0.4;
  transition: all 0.5s ease;
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

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

const Hero: React.FC = () => {
  const { theme } = useTheme();
  const greeting = useMemo(() => getGreeting(), []);

  // Parallax shapes
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 30]);
  const y2 = useTransform(scrollY, [0, 300], [0, -30]);

  return (
    <HeroContainer theme={theme}>
      <Shape1 style={{ y: y1 }} />
      <Shape2 style={{ y: y2 }} />

      <HeroContent>
        <HeroTextContent>
          <GreetingText
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {greeting}, I’m
          </GreetingText>

          <HeroTitle
            theme={theme}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ajay Rajput
            <br />
            <span>
              <ReactTyped
                strings={[
                  'Full Stack Developer',
                  'React Enthusiast',
                  'TypeScript Lover',
                  'Node.js Engineer',
                ]}
                typeSpeed={40}
                backSpeed={30}
                loop
              />
            </span>
          </HeroTitle>

          <HeroSubtitle
            theme={theme}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            I create elegant and performant web applications using modern technologies.
            Specializing in React, TypeScript, and Node.js to build exceptional digital experiences.
          </HeroSubtitle>

          <HeroButtons
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <PrimaryButton to="/projects">
              View My Work <FiArrowRight />
            </PrimaryButton>
            <SecondaryButton to="/contact" theme={theme}>
              Let’s Talk
            </SecondaryButton>
          </HeroButtons>
        </HeroTextContent>

        <HeroImageContainer>
          <HeroImage
            src="/api/placeholder/500/500"
            alt="Ajay Rajput - Full Stack Developer"
            loading="lazy"
            onLoad={(e) => e.currentTarget.classList.add('loaded')}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </HeroImageContainer>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;
