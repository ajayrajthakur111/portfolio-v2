import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@/hooks/useTheme';
import { CategoryWithCount } from '@/types/blog.types';

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const FilterButton = styled.button<{ $active: boolean; theme: 'light' | 'dark' }>`
  padding: 0.5rem 1rem;
  background-color: ${props => props.$active
    ? '#3498db'
    : props.theme === 'dark' ? '#2a2a2a' : '#f0f0f0'};
  color: ${props => props.$active
    ? '#ffffff'
    : props.theme === 'dark' ? '#e0e0e0' : '#555555'};
  border: none;
  border-radius: 2rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${props => props.$active
      ? '#2980b9'
      : props.theme === 'dark' ? '#333333' : '#e0e0e0'};
  }
`;

const CountBadge = styled.span`
  background-color: ${props => props.theme === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)'};
  padding: 0.1rem 0.4rem;
  border-radius: 1rem;
  margin-left: 0.3rem;
  font-size: 0.8rem;
`;

interface CategoryFilterProps {
  categories: CategoryWithCount[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory
}) => {
  const { theme } = useTheme();

  return (
    <FilterContainer>
      <FilterButton
        $active={selectedCategory === null}
        onClick={() => onSelectCategory(null)}
        theme={theme}
      >
        All
      </FilterButton>
      
      {categories?.map?.((category) => (
        <FilterButton
          key={category.name}
          $active={selectedCategory === category.name}
          onClick={() => onSelectCategory(category.name)}
          theme={theme}
        >
          {category.name}
          <CountBadge theme={theme}>{category.count}</CountBadge>
        </FilterButton>
      ))}
    </FilterContainer>
  );
};

export default CategoryFilter;