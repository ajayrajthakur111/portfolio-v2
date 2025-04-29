// src/components/about/AboutPage.tsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '@/hooks/useTheme';
import Layout from '@/components/common/Layout'; // Assuming this exists
import { FiAward, FiBriefcase, FiBook } from 'react-icons/fi'; // Removed FiCheckCircle as it's unused

// Assuming types and data imports are correct
import { Experience, Education, Skill } from '@/types/common.types'; // Keep types as they might be used implicitly
import { skills } from '@/data/skills'; // Import skills data

// --- Define Example Data (Moved before component function) ---
// In a real app, this data would typically come from an API call or context.
const experiences: Experience[] = [ // Added type annotation
  {
    id: '1',
    role: 'Frontend Developer',
    company: 'Priyam Innovations',
    location: 'Bhopal, MP',
    startDate: '2024-02-05',
    endDate: null,
    description: 'Lead the frontend development team building enterprise applications.',
    achievements: [
      'Implemented a design system that improved development speed by 40%',
      'Mentored junior developers and conducted code reviews',
      'Optimized application performance, reducing load times by 30%'
    ],
    technologies: ['React', 'TypeScript', 'Redux', 'NextJs', 'PWA',"NodeJs"]
  },
  {
    id: '2',
    role: 'Frontend Developer Intern',
    company: 'Priyam Innovations',
    location: 'Bhopal, MP',
    startDate: '2024-01-02',
    endDate: '2024-02-05',
    description: 'Developed and maintained client-facing web applications.',
    achievements: [
      'Built responsive UIs that improved user engagement',
      'Collaborated with designers to implement pixel-perfect interfaces',
      'Reduced bug reports by 25% through improved testing'
    ],
    technologies: ['React', 'JavaScript', 'CSS', 'HTML']
  }
];

const education: Education[] = [ // Added type annotation
  {
    id: '1',
    degree: 'Master of Computer Applications',
    institution: 'RGPV University',
    location: 'Bhopal, Madhya Pradesh',
    startDate: '2022-9-09',
    endDate: '2024-1-5',
    description: 'Specialized in Computer Interaction and Web Technologies.'
  },
  {
    id: '2',
    degree: 'Bachelor of Science in Computer Science',
    institution: 'Barkatullah University',
    location: 'Bhopal, Madhya Pradesh',
    startDate: '2019-02-7',
    endDate: '2022-05-05'
  }
];

// --- CSS Variables (within the scope of this file) ---
const accentColor = '#3498db';
const accentColorHover = '#2980b9';
const textColorDark = '#ffffff';
const textColorLight = '#222222';
const textSecondaryDark = '#a0a0a0';
const textSecondaryLight = '#555555'; // Using #555 from HeroSubtitle
const backgroundDark = '#0e0e0e'; // Using Hero background dark
const backgroundLight = '#fdfdfd'; // Using Hero background light
const cardBackgroundDark = '#1e1e1e'; // Using Skills card background
const cardBackgroundLight = '#ffffff'; // Using Skills card background
const cardShadow = '0 8px 24px rgba(0, 0, 0, 0.1)'; // Slightly updated shadow
const borderRadius = '0.75rem'; // Consistent border radius

// --- Styled Components ---

const AboutPageContainer = styled(motion.div)` // Add motion for potential page entrance animation
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  transition: background-color 0.4s ease; // Smooth theme transition
  // Add theme background like Hero
  background-color: ${props => props.theme === 'dark' ? backgroundDark : backgroundLight};

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Section = styled.section`
  margin-bottom: 6rem; // Increased space between sections

  &:last-child {
    margin-bottom: 2rem; // Less margin for the last section
  }
`;

const SectionTitle = styled(motion.h2)` // Add motion for animation
  font-size: 2.5rem; // Larger title like Hero
  font-weight: 700; // Bolder font like Hero
  color: ${props => props.theme === 'dark' ? textColorDark : textColorLight};
  margin-bottom: 3rem; // More space below title
  position: relative;
  display: inline-block;

  &:after {
    content: '';
    position: absolute;
    bottom: -12px; // Adjusted position
    left: 0;
    width: 70px; // Wider underline
    height: 4px; // Thicker underline
    background: linear-gradient(90deg, ${accentColor}, ${accentColorHover}); // Gradient underline
    border-radius: 2px;
  }

  svg {
    vertical-align: middle; // Align icon with text
    margin-right: 0.75rem; // More space for icon
    color: ${accentColor}; // Color the icon
  }

   @media (max-width: 768px) {
     font-size: 2rem;
     margin-bottom: 2rem;
     text-align: center; // Center title on mobile
     &:after {
        left: 50%;
        transform: translateX(-50%);
     }
     svg {
        margin-right: 0;
        display: block; // Icon above text on mobile if needed
        margin: 0 auto 0.5rem auto;
     }
  }
`;

const BiographyContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr; // Adjusted column ratio
  gap: 4rem; // Increased gap
  align-items: start; // Align items to the top

  @media (max-width: 992px) { // Adjusted breakpoint
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const BiographyText = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${props => props.theme === 'dark' ? textSecondaryDark : textSecondaryLight}; // Using textSecondary
  p {
    margin-bottom: 1.5rem;
    &:last-child {
        margin-bottom: 0;
    }
  }
`;

const BiographyImageWrapper = styled(motion.div)`
    display: flex;
    justify-content: center; // Center image in its column
    align-items: center;
    padding: 1rem; // Add some padding around the image
    background-color: ${props => props.theme === 'dark' ? cardBackgroundDark : cardBackgroundLight}; // Match card background
    border-radius: ${borderRadius};
    box-shadow: ${cardShadow}; // Use consistent shadow
    position: sticky; // Make image sticky
    top: 2rem; // Stick from the top (adjust as needed)
    align-self: start; // Align to the top in grid

     @media (max-width: 992px) {
        order: -1; // Place image above text on smaller screens
        position: static; // Disable sticky on mobile
        margin-bottom: 2rem;
        padding: 0; // Remove padding on mobile if image fills container
        box-shadow: none; // Remove shadow on mobile if desired
        background-color: transparent;
     }
`;

const BiographyImage = styled(motion.img)`
  width: 100%;
  max-width: 400px; // Keep max width if needed
  height: auto;
  border-radius: ${borderRadius}; // Consistent border radius
  object-fit: cover;
   @media (max-width: 992px) {
        max-width: 300px; // Smaller image on mobile
        border-radius: 0.5rem;
   }
`;

const TimelineList = styled(motion.ul)` // Use motion for list animation
  list-style: none;
  padding: 0;
  position: relative;

   /* Vertical line */
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 18px; /* Adjust based on marker size */
    width: 2px;
    height: 100%;
    background-color: ${props => props.theme === 'dark' ? '#333' : '#ddd'}; // Themed line color
     @media (max-width: 768px) {
        left: 8px; /* Adjust for mobile */
     }
  }
`;

const TimelineItem = styled(motion.li)` // Use motion for item animation
  margin-bottom: 3rem; // More space between items
  padding-left: 3rem; /* Increased padding to make space for marker */
  position: relative;

   /* Marker/Dot */
  &:before {
    content: '';
    position: absolute;
    top: 0.5rem; /* Align with the start of content */
    left: 10px; /* Adjust based on marker size and line position */
    width: 20px; // Marker size
    height: 20px; // Marker size
    background: ${accentColor}; // Accent color marker
    border: 3px solid ${props => props.theme === 'dark' ? backgroundDark : backgroundLight}; // Border to match background
    border-radius: 50%; // Round marker
    z-index: 1; // Ensure marker is above the line
    box-shadow: 0 0 0 4px ${accentColor}40; // Subtle pulse effect shadow
     @media (max-width: 768px) {
        left: 0; /* Adjust for mobile */
        width: 16px;
        height: 16px;
        top: 0.4rem;
         box-shadow: 0 0 0 3px ${accentColor}40;
         border-width: 2px;
     }
  }
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem; /* Adjusted margin */
  flex-wrap: wrap; // Allow wrapping

  h3 {
      margin: 0;
      font-size: 1.25rem; // Slightly larger title
      font-weight: 600;
      color: ${props => props.theme === 'dark' ? textColorDark : textColorLight};
  }

  span {
     font-size: 1rem; // Slightly larger date/location
      color: ${props => props.theme === 'dark' ? textSecondaryDark : textSecondaryLight};
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.25rem; /* Smaller gap on mobile */
    h3 { font-size: 1.1rem; }
    span { font-size: 0.9rem; }
  }
`;

const ItemCompany = styled.span`
  font-weight: 500;
  color: ${accentColor}; // Accent color for company/institution
  margin-left: 0.5rem; // Space after role/degree
  @media (max-width: 768px) {
     margin-left: 0;
     display: block; // Company on new line
  }
`;

const ItemDescription = styled.p`
  font-size: 1rem;
  color: ${props => props.theme === 'dark' ? textSecondaryDark : textSecondaryLight};
  margin-bottom: 0.75rem; /* Adjusted margin */
`;

const ItemAchievements = styled.ul`
  margin-top: 1rem;
  padding-left: 1.5rem; /* Adjusted padding */
  list-style: none; /* Remove default list style */

  /* Style the list item itself */
  li {
    margin-bottom: 0.75rem; /* Adjusted margin */
    color: ${props => props.theme === 'dark' ? textSecondaryDark : textSecondaryLight};
    position: relative;
    padding-left: 1.5rem; // Space for custom bullet

    &:before {
        content: '•'; /* Custom bullet point or use icon */
        color: ${accentColor}; // Color the bullet
        position: absolute;
        left: 0;
        top: 0;
        font-weight: bold;
        font-size: 1.2em; // Make bullet slightly larger
        line-height: 1; // Adjust line height to prevent spacing issues
    }
     @media (max-width: 768px) {
        padding-left: 1rem;
     }
  }
`;

const ItemTechnologies = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ItemTechnology = styled.span`
  background-color: ${props => props.theme === 'dark' ? '#2a2a2a' : '#e9ecef'}; /* Slightly different inactive button bg */
  color: ${props => props.theme === 'dark' ? '#e0e0e0' : '#555555'};
  padding: 0.3rem 0.8rem;
  border-radius: 1rem; // Pill shape
  font-size: 0.8rem;
  font-weight: 500;
   transition: background-color 0.3s ease, color 0.3s ease;
  &:hover {
      background-color: ${props => props.theme === 'dark' ? '#3a3a3a' : '#dcdcdc'};
  }
`;


const SkillsGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); // Adjusted min width
  gap: 2.5rem; // Increased gap
   @media (max-width: 768px) {
      grid-template-columns: 1fr; // Stack categories on mobile
      gap: 3rem;
   }
`;

const SkillsCategory = styled(motion.div)` // Add motion
   /* Optional: Add a subtle border or background to the category block */
   /* background-color: ${props => props.theme === 'dark' ? cardBackgroundDark : cardBackgroundLight};
   border-radius: ${borderRadius};
   padding: 1.5rem;
   box-shadow: ${cardShadow}; */
`;

const SkillCategoryTitle = styled.h3`
  font-size: 1.3rem; // Slightly larger category title
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? textColorDark : textColorLight};
  margin-bottom: 1.5rem; // More space below title
   display: flex;
   align-items: center;
   gap: 0.75rem;

   svg {
       color: ${accentColor}; // Color category icon
   }
`;

const SkillList = styled.ul`
  list-style: none;
  padding: 0;
`;

const SkillItem = styled(motion.li)` // Add motion
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SkillName = styled.span`
  font-size: 1rem;
  color: ${props => props.theme === 'dark' ? textSecondaryDark : textSecondaryLight};
`;

const SkillLevel = styled.div<{ level: string; theme: 'light' | 'dark' }>`
  width: 120px; // Slightly wider bar
  height: 7px; // Slightly thinner bar
  background-color: ${props => props.theme === 'dark' ? '#333' : '#eee'}; // Themed track color
  border-radius: 3.5px;
  position: relative;
  overflow: hidden;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => {
      switch (props.level) {
        case 'beginner': return '25%';
        case 'intermediate': return '50%';
        case 'advanced': return '75%';
        case 'expert': return '100%';
        default: return '0%';
      }
    }};
    background: linear-gradient(90deg, ${accentColorHover}, ${accentColor}); // Gradient fill
    border-radius: 3.5px;
    transition: width 0.6s ease-out; // Smooth transition
  }
`;

// Mapping category strings to imported React Icon components
const categoryIcons: { [key: string]: React.ElementType } = {
    frontend: FiBriefcase, // Example mapping, adjust as needed
    backend: FiBriefcase,
    design: FiAward,
    devops: FiBriefcase,
    other: FiBook,
    // Add more mappings if needed
};


// --- React Component ---

const AboutPage: React.FC = () => {
  const { theme } = useTheme();

  // Use a single ref for the entire page container to trigger animations
  const [pageRef, inViewPage] = useInView({
    triggerOnce: true,
    threshold: 0.1, // Trigger when 10% of the page is visible
  });

  // Group skills by category - memoize this calculation
  const skillsByCategory = React.useMemo(() => {
    return skills.reduce<Record<string, Skill[]>>((acc, skill) => {
      const category = skill.category || 'other'; // Handle skills without category
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    }, {});
  }, [skills]); // Dependency on skills data


  // Variants for section/list animation - Triggered by inViewPage
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1 // Stagger items within sections/lists
      },
    },
  };

   // Variants for individual items (list items, skill categories) - Triggered by parent animation
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      },
    },
  };


  return (
    <Layout
      title="About Me | My Portfolio"
      description="Learn more about my background and skills"
    >
      {/* Attach ref to the main container */}
      {/* Apply sectionVariants to the main container to animate sections as a whole */}
      <AboutPageContainer
          theme={theme} // Pass theme prop
          ref={pageRef}
          variants={sectionVariants} // Apply variants to container
          initial="hidden"
          animate={inViewPage ? "visible" : "hidden"} // Animate based on container visibility
      >
        {/* Content within sections will use itemVariants, staggered by sectionVariants */}

        {/* About Section */}
        <Section> {/* No motion on section itself, container handles it */}
          <SectionTitle theme={theme}>About Me</SectionTitle>
          <BiographyContent>
            {/* Animate BiographyText and BiographyImageWrapper as items */}
            <BiographyText theme={theme} as={motion.div} variants={itemVariants}>
              <p>
                Hello! I'm Ajay Rajput, a passionate Full Stack Developer with over a year of experience
                building web applications. I specialize in modern JavaScript frameworks like React and
                Node.js, and I'm dedicated to creating elegant, performant, and accessible digital
                experiences.
              </p>
              <p>
                My journey in web development began during my university years, and I've been hooked
                ever since. I love the constant evolution of web technologies and the creative problem
                solving that comes with building for the web.
              </p>
                <p>
                When I'm not coding, I love immersing myself in intense chess matches, staying updated 
                with geopolitical events, and enjoying sci-fi movies with friends. I find these 
                activities not only entertaining but also intellectually stimulating and a great way 
                to unwind after work.
                </p>
            </BiographyText>
            <BiographyImageWrapper theme={theme} variants={itemVariants}> {/* Animate the wrapper */}
              <BiographyImage
                src="/api/placeholder/400/500?text=John+Doe"
                alt="Ajay Rajput"
              />
            </BiographyImageWrapper>
          </BiographyContent>
        </Section>

        {/* Experience Section */}
        <Section> {/* No motion on section itself */}
          <SectionTitle theme={theme}>
            <FiBriefcase />
            Experience
          </SectionTitle>
          <TimelineList> {/* Animate the list container to stagger items */}
            {/* Use type annotation for exp */}
            {experiences.map((exp: Experience) => (
              <TimelineItem key={exp.id} variants={itemVariants}> {/* Animate each item */}
                <ItemHeader>
                  <div>
                    <h3>
                      {exp.role} at <ItemCompany>{exp.company}</ItemCompany>
                    </h3>
                    <span>{exp.location}</span>
                  </div>
                  <span>
                    {new Date(exp.startDate).toLocaleDateString()} -{' '}
                    {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}
                  </span>
                </ItemHeader>
                {exp.description && (
                  <ItemDescription theme={theme}>
                    {exp.description}
                  </ItemDescription>
                )}
                {exp.achievements && exp.achievements.length > 0 && (
                  <ItemAchievements>
                     {/* Use type annotations for achievement and idx */}
                    {exp.achievements.map((achievement: string, idx: number) => (
                      <li key={idx}>
                        {achievement}
                      </li>
                    ))}
                  </ItemAchievements>
                )}
                {exp.technologies && exp.technologies.length > 0 && (
                  <ItemTechnologies>
                     {/* Use type annotation for tech */}
                    {exp.technologies.map((tech: string) => (
                      <ItemTechnology key={tech} theme={theme}>
                        {tech}
                      </ItemTechnology>
                    ))}
                  </ItemTechnologies>
                )}
              </TimelineItem>
            ))}
          </TimelineList>
        </Section>

        {/* Education Section */}
        <Section> {/* No motion on section itself */}
          <SectionTitle theme={theme}>
            <FiBook />
            Education
          </SectionTitle>
          <TimelineList> {/* Animate the list container to stagger items */}
             {/* Use type annotation for edu */}
            {education.map((edu: Education) => (
              <TimelineItem key={edu.id} variants={itemVariants}> {/* Animate each item */}
                 <ItemHeader>
                  <div>
                    <h3>
                      {edu.degree} at <ItemCompany>{edu.institution}</ItemCompany>
                    </h3>
                    <span>{edu.location}</span>
                  </div>
                  <span>
                    {new Date(edu.startDate).toLocaleDateString()} -{' '}
                    {new Date(edu.endDate).toLocaleDateString()}
                  </span>
                </ItemHeader>
                {edu.description && (
                  <ItemDescription theme={theme}>
                    {edu.description}
                  </ItemDescription>
                )}
              </TimelineItem>
            ))}
          </TimelineList>
        </Section>

        {/* Skills Section */}
        <Section> {/* No motion on section itself */}
          <SectionTitle theme={theme}>
            <FiAward />
            Skills
          </SectionTitle>
          <SkillsGridContainer>
            {/* Iterate over categories and animate each category block as an item */}
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => {
                const CategoryIcon = categoryIcons[category.toLowerCase()] || FiAward;
               return (
                 <SkillsCategory key={category} variants={itemVariants}> {/* Animate category blocks */}
                   <SkillCategoryTitle theme={theme}>
                       <CategoryIcon />
                       {category.charAt(0).toUpperCase() + category.slice(1)}
                   </SkillCategoryTitle>
                   <SkillList>
                      {/* Iterate over skills within a category - these will also animate based on itemVariants */}
                     {categorySkills.map((skill: Skill) => ( // Use type annotation for skill
                       <SkillItem key={skill.id} variants={itemVariants}> {/* Animate individual skill items */}
                         <SkillName theme={theme}>{skill.name}</SkillName>
                         <SkillLevel level={skill.level} theme={theme} />
                       </SkillItem>
                     ))}
                   </SkillList>
                 </SkillsCategory>
               );
            })}
          </SkillsGridContainer>
        </Section>
      </AboutPageContainer>
    </Layout>
  );
};

export default AboutPage;