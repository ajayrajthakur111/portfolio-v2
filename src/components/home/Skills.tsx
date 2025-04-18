
// src/components/home/Skills.tsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '@/hooks/useTheme';

// Import example data - in a real app, this might come from an API
import { skills } from '@/data/skills';

const SectionContainer = styled.section`
  padding: 5rem 2rem;
  background-color: ${props => props.theme === 'dark' ? '#0f0f0f' : '#f6f9fc'};
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const SectionContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#222222'};
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background-color: #3498db;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme === 'dark' ? '#a0a0a0' : '#666666'};
  max-width: 600px;
  margin: 0 auto;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const FilterButton = styled.button<{ active: boolean; theme: 'light' | 'dark' }>`
  padding: 0.6rem 1.2rem;
  background-color: ${props => props.active 
    ? '#3498db' 
    : props.theme === 'dark' ? '#1e1e1e' : '#ffffff'};
  color: ${props => props.active 
    ? '#ffffff' 
    : props.theme === 'dark' ? '#e0e0e0' : '#555555'};
  border: none;
  border-radius: 2rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  
  &:hover {
    background-color: ${props => props.active 
      ? '#2980b9' 
      : props.theme === 'dark' ? '#2a2a2a' : '#f0f0f0'};
    transform: translateY(-2px);
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 1.5rem;
  }
`;

const SkillCard = styled(motion.div)`
  background-color: ${props => props.theme === 'dark' ? '#1e1e1e' : '#ffffff'};
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const SkillIcon = styled.div<{ bg: string }>`
  width: 60px;
  height: 60px;
  border-radius: 15px;
  background-color: ${props => props.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 2rem;
`;

const SkillName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#333333'};
  text-align: center;
`;

const SkillLevel = styled.div<{ level: string; theme: 'light' | 'dark' }>`
  width: 100%;
  height: 5px;
  background-color: ${props => props.theme === 'dark' ? '#333333' : '#e0e0e0'};
  border-radius: 3px;
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
    border-radius: 3px;
  }
`;

const NoSkillsMessage = styled.p`
  text-align: center;
  padding: 2rem;
  color: ${props => props.theme === 'dark' ? '#a0a0a0' : '#666666'};
  grid-column: 1 / -1;
`;

const Skills: React.FC = () => {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = React.useState<string>('all');
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const categories = ['all', 'frontend', 'backend', 'design', 'devops', 'other'];
  
  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  
  // Function to get background color based on skill
  const getSkillColor = (skill: string): string => {
    const colors: {[key: string]: string} = {
      react: '#61DAFB',
      typescript: '#3178C6',
      javascript: '#F7DF1E',
      html: '#E34F26',
      css: '#1572B6',
      sass: '#CC6699',
      node: '#339933',
      express: '#000000',
      mongodb: '#47A248',
      postgresql: '#336791',
      git: '#F05032',
      github: '#181717',
      figma: '#F24E1E',
      adobe: '#FF0000',
      aws: '#FF9900',
      docker: '#2496ED',
    };
    
    // Convert skill to lowercase for case-insensitive matching
    const lowerSkill = skill.toLowerCase();
    
    // Find a key in colors that is contained in the skill name
    for (const key in colors) {
      if (lowerSkill.includes(key)) {
        return colors[key];
      }
    }
    
    // Default color if no match is found
    return '#3498db';
  };
  
  return (
    <SectionContainer theme={theme} ref={ref}>
      <SectionContent>
        <SectionHeader>
          <SectionTitle theme={theme}>My Skills</SectionTitle>
          <SectionSubtitle theme={theme}>
            I've worked with a variety of technologies throughout my career. Here are some of my technical skills.
          </SectionSubtitle>
        </SectionHeader>
        
        <FilterContainer>
          {categories.map((category) => (
            <FilterButton
              key={category}
              active={activeCategory === category}
              theme={theme}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </FilterButton>
          ))}
        </FilterContainer>
        
        <SkillsGrid
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {filteredSkills.length === 0 ? (
            <NoSkillsMessage theme={theme}>
              No skills found in this category.
            </NoSkillsMessage>
          ) : (
            filteredSkills.map((skill) => (
              <SkillCard 
                key={skill.id} 
                theme={theme}
                variants={itemVariants}
              >
                <SkillIcon bg={getSkillColor(skill.name)}>
                  <i className={skill.icon}></i>
                </SkillIcon>
                <SkillName theme={theme}>{skill.name}</SkillName>
                <SkillLevel level={skill.level} theme={theme} />
              </SkillCard>
            ))
          )}
        </SkillsGrid>
      </SectionContent>
    </SectionContainer>
  );
};

export default Skills;
