
// src/styles/theme.ts
import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  colors: {
    primary: '#3498db',
    primaryDark: '#2980b9',
    background: '#ffffff',
    text: '#222222',
    textSecondary: '#666666',
    card: '#ffffff',
    border: '#dddddd',
  },
};

export const darkTheme: DefaultTheme = {
  colors: {
    primary: '#3498db',
    primaryDark: '#2980b9',
    background: '#121212',
    text: '#e0e0e0',
    textSecondary: '#a0a0a0',
    card: '#1e1e1e',
    border: '#333333',
  },
};