

// src/components/common/Header.tsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '@/hooks/useTheme';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: ${props => props.theme === 'dark' ? '#121212' : '#ffffff'};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#000000'};
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #3498db;
  }
`;

const NavLinks = styled.div<{ isOpen: boolean; theme: 'light' | 'dark' }>`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 250px;
    flex-direction: column;
    justify-content: center;
    background-color: ${props => props.theme === 'dark' ? '#1a1a1a' : '#f8f8f8'};
    transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s ease-in-out;
    z-index: 101;
    padding: 2rem;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  }
`;

const NavLink = styled(Link)<{ active: boolean; theme: 'light' | 'dark' }>`
  font-size: 1rem;
  color: ${props => props.active 
    ? '#3498db' 
    : props.theme === 'dark' ? '#e0e0e0' : '#333333'};
  text-decoration: none;
  font-weight: ${props => props.active ? '600' : '400'};
  transition: color 0.3s ease;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: #3498db;
    transition: width 0.3s ease;
  }

  &:hover {
    color: #3498db;

    &:after {
      width: 100%;
    }
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme === 'dark' ? '#e0e0e0' : '#333333'};
  transition: color 0.3s ease;

  &:hover {
    color: #3498db;
  }
`;

const MobileMenuBtn = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: ${props => props.theme === 'dark' ? '#e0e0e0' : '#333333'};
  transition: color 0.3s ease;
  z-index: 102;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${props => props.isOpen ? 'block' : 'none'};
  z-index: 100;
`;

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  
  // Close mobile menu when path changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup function to ensure scroll is restored
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <HeaderContainer theme={theme}>
      <Nav>
        <Logo to="/" theme={theme}>Portfolio</Logo>
        
        <MobileMenuBtn onClick={toggleMenu} theme={theme}>
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </MobileMenuBtn>
        
        <Overlay isOpen={isMenuOpen} onClick={() => setIsMenuOpen(false)} />
        
        <NavLinks isOpen={isMenuOpen} theme={theme}>
          <NavLink to="/" active={location.pathname === '/'} theme={theme}>Home</NavLink>
          <NavLink to="/about" active={location.pathname === '/about'} theme={theme}>About</NavLink>
          <NavLink to="/projects" active={location.pathname.startsWith('/projects')} theme={theme}>Projects</NavLink>
          <NavLink to="/blog" active={location.pathname.startsWith('/blog')} theme={theme}>Blog</NavLink>
          <NavLink to="/contact" active={location.pathname === '/contact'} theme={theme}>Let's Talk</NavLink>
          
          <ThemeToggle onClick={toggleTheme} theme={theme}>
            {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
          </ThemeToggle>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
