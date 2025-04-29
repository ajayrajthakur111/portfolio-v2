

// src/components/common/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram } from 'react-icons/fi';
import { useTheme } from '@/hooks/useTheme';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme === 'dark' ? '#121212' : '#f8f8f8'};
  color: ${props => props.theme === 'dark' ? '#e0e0e0' : '#333333'};
  padding: 3rem 2rem;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterHeading = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#000000'};
`;

const FooterLink = styled(Link)`
  color: ${props => props.theme === 'dark' ? '#a0a0a0' : '#555555'};
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #3498db;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  color: ${props => props.theme === 'dark' ? '#a0a0a0' : '#555555'};
  font-size: 1.2rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #3498db;
  }
`;

const Copyright = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme === 'dark' ? '#333333' : '#dddddd'};
  text-align: center;
  color: ${props => props.theme === 'dark' ? '#a0a0a0' : '#777777'};
  font-size: 0.9rem;
`;

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer theme={theme}>
      <FooterContent>
        <FooterSection>
          <FooterHeading theme={theme}>Portfolio</FooterHeading>
          <p>A showcase of my work, skills, and professional journey.</p>
          <SocialLinks>
            <SocialLink href="https://github.com" target="_blank" rel="noopener noreferrer" theme={theme}>
              <FiGithub />
            </SocialLink>
            <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer" theme={theme}>
              <FiLinkedin />
            </SocialLink>
            <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer" theme={theme}>
              <FiTwitter />
            </SocialLink>
            <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer" theme={theme}>
              <FiInstagram />
            </SocialLink>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterHeading theme={theme}>Navigation</FooterHeading>
          <FooterLink to="/" theme={theme}>Home</FooterLink>
          <FooterLink to="/about" theme={theme}>About</FooterLink>
          <FooterLink to="/projects" theme={theme}>Projects</FooterLink>
          <FooterLink to="/blog" theme={theme}>Blog</FooterLink>
          <FooterLink to="/contact" theme={theme}>Let's Talk</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterHeading theme={theme}>Legal</FooterHeading>
          <FooterLink to="/privacy-policy" theme={theme}>Privacy Policy</FooterLink>
          <FooterLink to="/terms-of-service" theme={theme}>Terms of Service</FooterLink>
          <FooterLink to="/cookies" theme={theme}>Cookies</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterHeading theme={theme}>Contact</FooterHeading>
                <p>Email: <Link to="mailto:ajayrajthakur111@gmail.com" style={{ color: '#000' }}>ajayrajthakur111@gmail.com</Link></p>    <p>Let's connect and discuss your next project!</p>
          <FooterLink to="/contact" theme={theme}>Get in Touch →</FooterLink>
        </FooterSection>
      </FooterContent>
      
      <Copyright theme={theme}>
        © {currentYear} Your Portfolio. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;