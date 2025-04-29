// src/components/home/Skills.tsx
import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '@/hooks/useTheme';
import { skills } from '@/data/skills';

const categories = ['all', 'frontend', 'backend', 'design', 'devops', 'other'];

const accentColor = '#3498db';
const accentColorHover = '#2980b9';
const backgroundDark = '#0f0f0f';
const backgroundLight = '#f6f9fc';
const cardBackgroundDark = '#1e1e1e';
const cardBackgroundLight = '#ffffff';
const textDark = '#ffffff';
const textLight = '#222222';
const textSecondaryDark = '#a0a0a0';
const textSecondaryLight = '#666666';

const SectionContainer = styled.section`
  padding: 5rem 2rem;
  background-color: ${({ theme }) => theme === 'dark' ? backgroundDark : backgroundLight};
  transition: background-color 0.4s ease;
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
  color: ${({ theme }) => theme === 'dark' ? textDark : textLight};
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;

  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background-color: ${accentColor};
    border-radius: 2px;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme === 'dark' ? textSecondaryDark : textSecondaryLight};
  max-width: 600px;
  margin: 0 auto;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 2rem 0 3rem;
`;

const FilterButton = styled.button<{ $active: boolean; theme: 'light' | 'dark' }>`
  padding: 0.75rem 1.5rem;
  background: ${({ $active }) => $active ? `linear-gradient(135deg, ${accentColor}, ${accentColorHover})` : 'transparent'};
  color: ${({ $active, theme }) => $active ? '#fff' : theme === 'dark' ? textSecondaryDark : textSecondaryLight};
  border: 1px solid ${({ $active, theme }) => $active ? accentColor : theme === 'dark' ? '#333' : '#ccc'};
  border-radius: 2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ $active, theme }) => $active ? accentColorHover : theme === 'dark' ? '#2a2a2a' : '#f0f0f0'};
    transform: translateY(-2px);
  }
`;

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
`;

const SkillCard = styled(motion.div)<{ theme: 'light' | 'dark' }>`
  background-color: ${({ theme }) => theme === 'dark' ? cardBackgroundDark : cardBackgroundLight};
  border-radius: 0.75rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  transition: 0.3s ease;
  height: 100%;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  }
`;

const SkillIconWrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 0.6rem;
  background-color: ${({ theme }) => theme === 'dark' ? '#2a2a2a' : '#f0f0f0'};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.15);
`;

const SkillLogo = styled.img`
  max-width: 70%;
  max-height: 70%;
  object-fit: contain;
`;

const SkillName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme === 'dark' ? textDark : textLight};
  text-align: center;
  margin: 0;
`;

const SkillLevel = styled.div<{ level: string; theme: 'light' | 'dark' }>`
  width: 100%;
  height: 6px;
  background-color: ${({ theme }) => theme === 'dark' ? '#333' : '#eee'};
  border-radius: 3px;
  position: relative;
  overflow: hidden;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ level }) => {
      switch (level) {
        case 'beginner': return '25%';
        case 'intermediate': return '50%';
        case 'advanced': return '75%';
        case 'expert': return '100%';
        default: return '0%';
      }
    }};
    background: linear-gradient(90deg, ${accentColorHover}, ${accentColor});
    border-radius: 3px;
    transition: width 0.8s ease-in-out;
  }
`;

const NoSkillsMessage = styled.p`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme === 'dark' ? textSecondaryDark : textSecondaryLight};
  grid-column: 1 / -1;
`;

// Component
const Skills: React.FC = () => {
  const { theme } = useTheme();
  const [$activeCategory, setActiveCategory] = useState('all');

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const filteredSkills = useMemo(() => {
    return $activeCategory === 'all'
      ? skills
      : skills.filter(skill => skill.category === $activeCategory);
  }, [$activeCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <SectionContainer theme={theme} ref={ref}>
      <SectionContent>
        <SectionHeader>
          <SectionTitle theme={theme}>My Skills</SectionTitle>
          <SectionSubtitle theme={theme}>
            I’ve worked with a wide variety of technologies in the web development world.
          </SectionSubtitle>
        </SectionHeader>

        <FilterContainer>
          {categories.map(category => (
            <FilterButton
              key={category}
              $active={$activeCategory === category}
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
            <NoSkillsMessage theme={theme}>No skills found in this category.</NoSkillsMessage>
          ) : (
            filteredSkills.map(skill => (
              <SkillCard key={skill.id} theme={theme} variants={itemVariants}>
                <SkillIconWrapper theme={theme}>
                  <SkillLogo
                    src={skill.logoUrl}
                    alt={skill.name}
                    title={skill.name}
                    loading="lazy"
                  />
                </SkillIconWrapper>
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
