
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '@/hooks/useTheme';
import Layout from '@/components/common/Layout';
import ContactForm from '@/components/contact/ContactForm';
import SocialLinks from '@/components/contact/SocialLinks';

const ContactPageContainer = styled.div`
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

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ContactPage: React.FC = () => {
  const { theme } = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Layout 
      title="Contact | My Portfolio" 
      description="Get in touch with me for collaboration or inquiries"
    >
      <ContactPageContainer ref={ref}>
        <PageHeader>
          <PageTitle theme={theme}>Let's Talk</PageTitle>
          <PageSubtitle theme={theme}>
            Have a project in mind or want to discuss potential opportunities? 
            Feel free to reach out!
          </PageSubtitle>
        </PageHeader>

        <ContactContent>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <ContactForm />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SocialLinks />
          </motion.div>
        </ContactContent>
      </ContactPageContainer>
    </Layout>
  );
};

export default ContactPage;