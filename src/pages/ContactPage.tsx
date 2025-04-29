// src/components/contact/ContactPage.tsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion'; // Already imported
import { useInView } from 'react-intersection-observer'; // Already imported
import { useTheme } from '@/hooks/useTheme';
import Layout from '@/components/common/Layout'; // Assuming this exists
import ContactForm from '@/components/contact/ContactForm'; // Assuming this exists and is styled separately
import SocialLinks from '@/components/contact/SocialLinks'; // Assuming this exists and is styled separately

// --- CSS Variables (within the scope of this file) ---
const accentColor = '#3498db'; // Consistent accent color
const accentColorHover = '#2980b9'; // Consistent accent hover color
const textColorDark = '#ffffff'; // Consistent dark text color
const textColorLight = '#222222'; // Consistent light text color
const textSecondaryDark = '#a0a0a0'; // Consistent dark secondary text color
const textSecondaryLight = '#555555'; // Consistent light secondary text color (from Hero/About)
const backgroundDark = '#0e0e0e'; // Consistent dark background (from Hero/About/Projects/Blog)
const backgroundLight = '#fdfdfd'; // Consistent light background (from Hero/About/Projects/Blog)

// --- Styled Components ---

// Wrapper to apply consistent page padding and background
const ContactPageContainer = styled(motion.div)` // Add motion for potential page entrance animation
  max-width: 1400px; // Consistent max-width
  margin: 0 auto;
  padding: 4rem 2rem; // Consistent vertical padding
  background-color: ${props => props.theme === 'dark' ? backgroundDark : backgroundLight}; // Themed background
  transition: background-color 0.4s ease; // Smooth theme transition
  min-height: 80vh; // Ensure enough height

  @media (max-width: 768px) {
    padding: 3rem 1rem; // Adjusted padding for mobile
  }
`;

const PageHeader = styled(motion.div)` // Add motion for animation
  text-align: center;
  margin-bottom: 4rem; // More space below header

  @media (max-width: 768px) {
    margin-bottom: 3rem;
  }
`;

const PageTitle = styled.h1`
  font-size: 3.5rem; // Larger title like Hero/Projects/Blog
  font-weight: 700; // Bolder font like Hero/Projects/Blog
  color: ${props => props.theme === 'dark' ? textColorDark : textColorLight}; // Themed text color
  margin-bottom: 1.5rem; // Adjusted margin below title
  position: relative;
  display: inline-block; // Needed for :after positioning below text
  padding-bottom: 15px; // Add padding for underline

  &:after {
    content: '';
    position: absolute;
    bottom: 0; // Position at the bottom of the padding
    left: 50%;
    transform: translateX(-50%);
    width: 100px; // Wide underline
    height: 5px; // Thicker underline
    background: linear-gradient(90deg, ${accentColorHover}, ${accentColor}); // Gradient underline like About page titles
    border-radius: 3px; // Subtle rounded ends
  }

  @media (max-width: 768px) {
     font-size: 2.5rem; // Adjusted font size for mobile
     padding-bottom: 10px;
     &:after {
        height: 4px;
     }
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.2rem; // Slightly larger subtitle like Hero/Projects/Blog
  line-height: 1.8; // Consistent line height
  color: ${props => props.theme === 'dark' ? textSecondaryDark : textSecondaryLight}; // Themed secondary color
  max-width: 700px; // Consistent max-width
  margin: 0 auto;

   @media (max-width: 768px) {
     font-size: 1.1rem;
   }
`;

const ContactContent = styled(motion.div)` // Add motion for animation
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem; // Increased gap for more space between form and social links

  @media (max-width: 992px) {
    grid-template-columns: 1fr; // Stack on tablets and below
    gap: 3rem; // Adjusted gap on mobile
  }
`;


// --- React Component ---

const ContactPage: React.FC = () => {
  const { theme } = useTheme();

  // Use a single ref for the entire page container to trigger animations
  const [pageRef, inViewPage] = useInView({
    triggerOnce: true,
    threshold: 0.1, // Trigger when 10% of the page is visible
  });

   // Animation variants for the container or main content block
   const containerVariants = {
       hidden: { opacity: 0, y: 50 },
       visible: {
           opacity: 1,
           y: 0,
           transition: {
               duration: 0.6,
               ease: "easeOut",
               staggerChildren: 0.2 // Stagger header and content
           }
       }
   };

   // Animation variants for children within the container (Header, ContactContent)
   const childVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
   };


  return (
    <Layout
      title="Contact | My Portfolio"
      description="Get in touch with me for collaboration or inquiries"
    >
      {/* Apply animation variants to the main container */}
      <ContactPageContainer
          theme={theme} // Pass theme prop
          ref={pageRef} // Attach ref
          variants={containerVariants} // Apply variants
          initial="hidden"
          animate={inViewPage ? "visible" : "hidden"} // Animate when container is in view
      >
        {/* Animate Header as a child */}
        <PageHeader variants={childVariants}>
          <PageTitle theme={theme}>Let's Talk</PageTitle>
          <PageSubtitle theme={theme}>
            Have a project in mind or want to discuss potential opportunities?
            Feel free to reach out!
          </PageSubtitle>
        </PageHeader>

        {/* Animate ContactContent grid as a child */}
        <ContactContent variants={childVariants}>
           {/* Animate ContactForm and SocialLinks directly with individual variants */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={inViewPage ? { opacity: 1, x: 0 } : {}} // Animate based on page visibility
                transition={{ duration: 0.5, delay: 0.3 }} // Add delay for sequence after header
            >
                <ContactForm /> {/* Removed theme prop as ContactForm does not accept it */}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={inViewPage ? { opacity: 1, x: 0 } : {}} // Animate based on page visibility
                transition={{ duration: 0.5, delay: 0.4 }} // Add delay for sequence after form
            >
                <SocialLinks  /> {/* Pass theme if SocialLinks needs it */}
            </motion.div>
        </ContactContent>

      </ContactPageContainer>
    </Layout>
  );
};

export default ContactPage;