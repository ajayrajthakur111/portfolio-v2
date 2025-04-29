

// src/components/contact/SocialLinks.tsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { 
  FiGithub, 
  FiLinkedin, 
  FiTwitter, 
  FiInstagram,
  FiDribbble,
  FiYoutube,
  FiMail,
  FiMapPin
} from 'react-icons/fi';
import { SocialLink } from '@/types/common.types';

// Example social links data - in a real app, this might come from an API
const socialLinks: SocialLink[] = [
  { id: '1', platform: 'github', url: 'https://github.com/ajayrajthakur111' },
  { id: '2', platform: 'linkedin', url: 'https://linkedin.com/in/ajayrajthakur' },
  { id: '3', platform: 'twitter', url: 'https://x.com/theonly1_ajay' },
  { id: '4', platform: 'instagram', url: 'https://instagram.com/mr_ajay_thakur__' },
];

const SocialLinksContainer = styled(motion.div)`
  background-color: ${props => props.theme === 'dark' ? '#1e1e1e' : '#ffffff'};
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Title = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#222222'};
`;

const ContactInfoList = styled.div`
  margin-bottom: 2rem;
`;

const ContactInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  background-color: rgba(52, 152, 219, 0.1);
  color: #3498db;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ContactText = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContactLabel = styled.span`
  font-size: 0.9rem;
  color: ${props => props.theme === 'dark' ? '#a0a0a0' : '#666666'};
`;

const ContactValue = styled.span`
  font-size: 1rem;
  color: ${props => props.theme === 'dark' ? '#e0e0e0' : '#333333'};
  font-weight: 500;
`;

const SocialLinksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const SocialLinkItem = styled.a`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: ${props => props.theme === 'dark' ? '#2a2a2a' : '#f8f8f8'};
  color: ${props => props.color || '#333333'};
  text-decoration: none;
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const SocialIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const SocialName = styled.span`
  font-weight: 500;
`;

// Function to get social icon and color
const getSocialIcon = (platform: SocialLink['platform']) => {
  switch (platform) {
    case 'github':
      return { icon: <FiGithub />, color: '#181717' };
    case 'linkedin':
      return { icon: <FiLinkedin />, color: '#0A66C2' };
    case 'twitter':
      return { icon: <FiTwitter />, color: '#1DA1F2' };
    case 'instagram':
      return { icon: <FiInstagram />, color: '#E4405F' };
    case 'dribbble':
      return { icon: <FiDribbble />, color: '#EA4C89' };
    case 'behance':
      return { icon: <FiDribbble />, color: '#1769FF' }; // Using Dribbble icon as a placeholder
    case 'medium':
      return { icon: <FiTwitter />, color: '#000000' }; // Using Twitter icon as a placeholder
    case 'youtube':
      return { icon: <FiYoutube />, color: '#FF0000' };
    default:
      return { icon: <FiGithub />, color: '#333333' };
  }
};

// Function to get platform display name
const getPlatformName = (platform: SocialLink['platform']) => {
  switch (platform) {
    case 'github':
      return 'GitHub';
    case 'linkedin':
      return 'LinkedIn';
    case 'twitter':
      return 'Twitter';
    case 'instagram':
      return 'Instagram';
    case 'dribbble':
      return 'Dribbble';
    case 'behance':
      return 'Behance';
    case 'medium':
      return 'Medium';
    case 'youtube':
      return 'YouTube';
    default:
      return platform;
  }
};

const SocialLinksComponent: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <SocialLinksContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      theme={theme}
    >
      <Title theme={theme}>Contact Information</Title>
      
      <ContactInfoList>
        <ContactInfoItem>
          <IconWrapper>
            <FiMail />
          </IconWrapper>
          <ContactText>
            <ContactLabel theme={theme}>Email</ContactLabel>
            <ContactValue theme={theme}>hello@yourportfolio.com</ContactValue>
          </ContactText>
        </ContactInfoItem>
        
        <ContactInfoItem>
          <IconWrapper>
            <FiMapPin />
          </IconWrapper>
          <ContactText>
            <ContactLabel theme={theme}>Location</ContactLabel>
            <ContactValue theme={theme}>Bhopal, MP, India</ContactValue>
          </ContactText>
        </ContactInfoItem>
      </ContactInfoList>
      
      <Title theme={theme}>Connect With Me</Title>
      
      <SocialLinksGrid>
        {socialLinks.map((link) => {
          const { icon, color } = getSocialIcon(link.platform);
          return (
            <SocialLinkItem 
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              theme={theme}
              color={theme === 'dark' ? '#ffffff' : color}
            >
              <SocialIcon>{icon}</SocialIcon>
              <SocialName>{getPlatformName(link.platform)}</SocialName>
            </SocialLinkItem>
          );
        })}
      </SocialLinksGrid>
    </SocialLinksContainer>
  );
};

export default SocialLinksComponent;