
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '@/hooks/useTheme';
import Layout from '@/components/common/Layout';
import { FiAward, FiBriefcase, FiBook } from 'react-icons/fi';
import { Experience, Education, Skill } from '@/types/common.types';
import { skills } from '@/data/skills';

const AboutPageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Section = styled.section`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#222222'};
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 50px;
    height: 3px;
    background-color: #3498db;
  }
`;

const BiographyContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BiographyText = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${props => props.theme === 'dark' ? '#e0e0e0' : '#333333'};
  p {
    margin-bottom: 1.5rem;
  }
`;

const BiographyImage = styled(motion.img)`
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  justify-self: center;
  align-self: center;
`;

const ExperienceList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ExperienceItem = styled.li`
  margin-bottom: 2rem;
  padding-left: 2rem;
  border-left: 2px solid #3498db;
  position: relative;
`;

const ExperienceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const ExperienceTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#222222'};
  margin: 0;
`;

const ExperienceCompany = styled.span`
  font-weight: 500;
  color: #3498db;
`;

const ExperienceDate = styled.span`
  font-size: 0.9rem;
  color: ${props => props.theme === 'dark' ? '#a0a0a0' : '#666666'};
`;

const ExperienceLocation = styled.span`
  font-size: 0.9rem;
  color: ${props => props.theme === 'dark' ? '#a0a0a0' : '#666666'};
  display: block;
  margin-bottom: 1rem;
`;

const ExperienceDescription = styled.p`
  font-size: 1rem;
  color: ${props => props.theme === 'dark' ? '#a0a0a0' : '#666666'};
  margin-bottom: 0.5rem;
`;

const ExperienceAchievements = styled.ul`
  margin-top: 1rem;
  padding-left: 1rem;
`;

const ExperienceAchievement = styled.li`
  margin-bottom: 0.5rem;
  color: ${props => props.theme === 'dark' ? '#a0a0a0' : '#666666'};
`;

const ExperienceTechnologies = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ExperienceTechnology = styled.span`
  background-color: ${props => props.theme === 'dark' ? '#2a2a2a' : '#f0f0f0'};
  color: ${props => props.theme === 'dark' ? '#e0e0e0' : '#555555'};
  padding: 0.3rem 0.8rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
`;

const EducationList = styled.ul`
  list-style: none;
  padding: 0;
`;

const EducationItem = styled.li`
  margin-bottom: 2rem;
  padding-left: 2rem;
  border-left: 2px solid #3498db;
  position: relative;
`;

const EducationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const EducationDegree = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#222222'};
  margin: 0;
`;

const EducationInstitution = styled.span`
  font-weight: 500;
  color: #3498db;
`;

const EducationDate = styled.span`
  font-size: 0.9rem;
  color: ${props => props.theme === 'dark' ? '#a0a0a0' : '#666666'};
`;

const EducationLocation = styled.span`
  font-size: 0.9rem;
  color: ${props => props.theme === 'dark' ? '#a0a0a0' : '#666666'};
  display: block;
  margin-bottom: 1rem;
`;

const EducationDescription = styled.p`
  font-size: 1rem;
  color: ${props => props.theme === 'dark' ? '#a0a0a0' : '#666666'};
`;

const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const SkillCategory = styled.div``;

const SkillCategoryTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#222222'};
  margin-bottom: 1rem;
`;

const SkillList = styled.ul`
  list-style: none;
  padding: 0;
`;

const SkillItem = styled.li`
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SkillName = styled.span`
  font-size: 1rem;
  color: ${props => props.theme === 'dark' ? '#e0e0e0' : '#333333'};
`;

const SkillLevel = styled.div<{ level: string; theme: 'light' | 'dark' }>`
  width: 100px;
  height: 8px;
  background-color: ${props => props.theme === 'dark' ? '#333333' : '#e0e0e0'};
  border-radius: 4px;
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
    background-color: #3498db;
    border-radius: 4px;
  }
`;

// Example data - in a real app, this might come from an API
const experiences: Experience[] = [
  {
    id: '1',
    role: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    startDate: '2020-01-01',
    endDate: null,
    description: 'Lead the frontend development team building enterprise applications.',
    achievements: [
      'Implemented a design system that improved development speed by 40%',
      'Mentored junior developers and conducted code reviews',
      'Optimized application performance, reducing load times by 30%'
    ],
    technologies: ['React', 'TypeScript', 'Redux', 'GraphQL', 'Jest']
  },
  {
    id: '2',
    role: 'Frontend Developer',
    company: 'WebSolutions',
    location: 'New York, NY',
    startDate: '2017-06-01',
    endDate: '2019-12-31',
    description: 'Developed and maintained client-facing web applications.',
    achievements: [
      'Built responsive UIs that improved user engagement',
      'Collaborated with designers to implement pixel-perfect interfaces',
      'Reduced bug reports by 25% through improved testing'
    ],
    technologies: ['React', 'JavaScript', 'CSS', 'HTML']
  }
];

const education: Education[] = [
  {
    id: '1',
    degree: 'Master of Computer Science',
    institution: 'Stanford University',
    location: 'Stanford, CA',
    startDate: '2015-09-01',
    endDate: '2017-05-31',
    description: 'Specialized in Human-Computer Interaction and Web Technologies.'
  },
  {
    id: '2',
    degree: 'Bachelor of Science in Software Engineering',
    institution: 'University of California',
    location: 'Berkeley, CA',
    startDate: '2011-09-01',
    endDate: '2015-05-31'
  }
];

const AboutPage: React.FC = () => {
  const { theme } = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Group skills by category
  const skillsByCategory = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <Layout 
      title="About Me | My Portfolio" 
      description="Learn more about my background and skills"
    >
      <AboutPageContainer ref={ref}>
        <Section>
          <SectionTitle theme={theme}>About Me</SectionTitle>
          <BiographyContent>
            <BiographyText theme={theme}>
              <p>
                Hello! I'm John Doe, a passionate Full Stack Developer with over 7 years of experience 
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
                When I'm not coding, you can find me hiking, reading sci-fi novels, or experimenting 
                with new cooking recipes. I'm also passionate about mentoring junior developers and 
                contributing to open source projects.
              </p>
            </BiographyText>
            <BiographyImage
              src="/api/placeholder/400/500?text=John+Doe"
              alt="John Doe"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
            />
          </BiographyContent>
        </Section>

        <Section>
          <SectionTitle theme={theme}>
            <FiBriefcase style={{ marginRight: '0.5rem' }} />
            Experience
          </SectionTitle>
          <ExperienceList>
            {experiences.map((exp) => (
              <ExperienceItem key={exp.id}>
                <ExperienceHeader>
                  <div>
                    <ExperienceTitle theme={theme}>
                      {exp.role} at <ExperienceCompany>{exp.company}</ExperienceCompany>
                    </ExperienceTitle>
                    <ExperienceLocation theme={theme}>
                      {exp.location}
                    </ExperienceLocation>
                  </div>
                  <ExperienceDate theme={theme}>
                    {new Date(exp.startDate).toLocaleDateString()} -{' '}
                    {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}
                  </ExperienceDate>
                </ExperienceHeader>
                <ExperienceDescription theme={theme}>
                  {exp.description}
                </ExperienceDescription>
                {exp.achievements && exp.achievements.length > 0 && (
                  <ExperienceAchievements>
                    {exp.achievements.map((achievement, idx) => (
                      <ExperienceAchievement key={idx} theme={theme}>
                        {achievement}
                      </ExperienceAchievement>
                    ))}
                  </ExperienceAchievements>
                )}
                {exp.technologies && exp.technologies.length > 0 && (
                  <ExperienceTechnologies>
                    {exp.technologies.map((tech) => (
                      <ExperienceTechnology key={tech} theme={theme}>
                        {tech}
                      </ExperienceTechnology>
                    ))}
                  </ExperienceTechnologies>
                )}
              </ExperienceItem>
            ))}
          </ExperienceList>
        </Section>

        <Section>
          <SectionTitle theme={theme}>
            <FiBook style={{ marginRight: '0.5rem' }} />
            Education
          </SectionTitle>
          <EducationList>
            {education.map((edu) => (
              <EducationItem key={edu.id}>
                <EducationHeader>
                  <div>
                    <EducationDegree theme={theme}>
                      {edu.degree} at <EducationInstitution>{edu.institution}</EducationInstitution>
                    </EducationDegree>
                    <EducationLocation theme={theme}>
                      {edu.location}
                    </EducationLocation>
                  </div>
                  <EducationDate theme={theme}>
                    {new Date(edu.startDate).toLocaleDateString()} -{' '}
                    {new Date(edu.endDate).toLocaleDateString()}
                  </EducationDate>
                </EducationHeader>
                {edu.description && (
                  <EducationDescription theme={theme}>
                    {edu.description}
                  </EducationDescription>
                )}
              </EducationItem>
            ))}
          </EducationList>
        </Section>

        <Section>
          <SectionTitle theme={theme}>
            <FiAward style={{ marginRight: '0.5rem' }} />
            Skills
          </SectionTitle>
          <SkillsContainer>
            {Object.entries(skillsByCategory).map(([category, skills]) => (
              <SkillCategory key={category}>
                <SkillCategoryTitle theme={theme}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SkillCategoryTitle>
                <SkillList>
                  {skills.map((skill) => (
                    <SkillItem key={skill.id}>
                      <SkillName theme={theme}>{skill.name}</SkillName>
                      <SkillLevel level={skill.level} theme={theme} />
                    </SkillItem>
                  ))}
                </SkillList>
              </SkillCategory>
            ))}
          </SkillsContainer>
        </Section>
      </AboutPageContainer>
    </Layout>
  );
};

export default AboutPage;