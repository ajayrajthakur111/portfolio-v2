import React from 'react';
import { ThemeProvider as CustomThemeProvider, ThemeContext } from '@/context/ThemeContext';
import { BlogProvider } from '@/context/BlogContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '@/routes/AppRoutes';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useContext } from 'react';
import { darkTheme, lightTheme } from '@/styles/theme';
import './App.css'


// Bridge component: converts custom theme to styled-components theme
const ThemeBridge: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('ThemeBridge must be used within ThemeContext.Provider');
  }

  const styledTheme = context.theme === 'dark' ? darkTheme : lightTheme;

  return <StyledThemeProvider theme={styledTheme}>{children}</StyledThemeProvider>;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 15 * 60 * 1000, // How long data stays in cache (inactive)
      refetchOnWindowFocus: false, // See point 2
    },
  },
});

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <CustomThemeProvider>
          <ThemeBridge>
            <BlogProvider>
              <BrowserRouter>
                <AppRoutes />
              </BrowserRouter>
            </BlogProvider>
          </ThemeBridge>
        </CustomThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>

  );
};

export default App;
