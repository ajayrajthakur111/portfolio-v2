// src/data/projects.ts
import { Project } from '@/types/project.types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    slug: 'e-commerce-platform',
    description: 'A full-featured e-commerce platform with product listings, cart functionality, and payment processing.',
    summary: 'Modern e-commerce solution built with React and Node.js',
    thumbnail: '/api/placeholder/800/600?text=E-commerce',
    images: [
      '/api/placeholder/800/600?text=Product+Page',
      '/api/placeholder/800/600?text=Cart',
      '/api/placeholder/800/600?text=Checkout'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Stripe'],
    category: 'web',
    featured: true,
    demoUrl: 'https://demo-ecommerce.com',
    repoUrl: 'https://github.com/username/e-commerce-platform',
    completedAt: '2023-05-15',
    content: `
## Project Overview

This e-commerce platform was built to provide a seamless shopping experience for customers. The platform includes:

- Product listings with filtering and search
- Shopping cart functionality
- User authentication
- Payment processing with Stripe
- Order history and tracking

## Technologies Used

- **Frontend**: React with TypeScript, Redux for state management, Tailwind CSS for styling
- **Backend**: Node.js with Express, MongoDB for database
- **Payment**: Stripe integration for secure payments
- **Deployment**: Docker containers deployed on AWS

## Challenges & Solutions

One of the main challenges was implementing real-time inventory updates to prevent overselling. We solved this by:

1. Implementing a reservation system when items are added to cart
2. Using database transactions for order processing
3. Setting up alerts for low inventory

## Results

- 30% increase in conversion rate compared to previous platform
- 50% reduction in cart abandonment
- 99.9% uptime since launch
    `
  },
  {
    id: '2',
    title: 'Task Management App',
    slug: 'task-management-app',
    description: 'A collaborative task management application with real-time updates and team features.',
    summary: 'Productivity app for teams to manage tasks and projects',
    thumbnail: '/api/placeholder/800/600?text=Task+App',
    images: [
      '/api/placeholder/800/600?text=Dashboard',
      '/api/placeholder/800/600?text=Task+View'
    ],
    technologies: ['React', 'Firebase', 'Material UI', 'Redux'],
    category: 'web',
    featured: true,
    demoUrl: 'https://task-app-demo.com',
    repoUrl: 'https://github.com/username/task-management-app',
    completedAt: '2023-02-10',
    content: `
## Project Overview

A task management application designed for teams to collaborate on projects. Features include:

- Real-time task updates
- Team collaboration
- Task assignments and due dates
- Progress tracking
- Notifications

## Technologies Used

- **Frontend**: React with Material UI components
- **Backend**: Firebase for real-time database and authentication
- **State Management**: Redux for global state
- **Real-time**: Firebase WebSockets for live updates

## Key Features

1. **Drag-and-drop interface** for easy task organization
2. **Activity feed** to track team progress
3. **Customizable boards** for different projects
4. **File attachments** for task documentation

## User Feedback

The app has been well-received by teams, with particular praise for:
- Intuitive interface
- Reliable real-time updates
- Comprehensive notification system
    `
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    slug: 'weather-dashboard',
    description: 'A weather application showing current conditions and forecasts for locations worldwide.',
    summary: 'Interactive weather application with detailed forecasts',
    thumbnail: '/api/placeholder/800/600?text=Weather+App',
    images: [
      '/api/placeholder/800/600?text=Current+Weather',
      '/api/placeholder/800/600?text=Forecast'
    ],
    technologies: ['JavaScript', 'OpenWeather API', 'Chart.js'],
    category: 'web',
    featured: false,
    demoUrl: 'https://weather-demo.com',
    repoUrl: 'https://github.com/username/weather-dashboard',
    completedAt: '2022-11-20',
    content: `
## Project Overview

A responsive weather dashboard that provides:

- Current weather conditions
- 5-day forecast
- Hourly temperature graphs
- Location search
- Favorite locations

## Technical Details

- Uses the OpenWeather API for weather data
- Chart.js for visualizing temperature trends
- Local storage for saving favorite locations
- Responsive design works on all devices

## Challenges

1. **API Rate Limiting**: Implemented client-side caching to reduce API calls
2. **Data Visualization**: Used Chart.js to create clear, interactive charts
3. **Geolocation**: Added support for browser geolocation with fallback

## Features

- Detailed weather metrics (humidity, wind speed, UV index)
- Animated weather icons
- Dark/light mode toggle
- Unit conversion (Celsius/Fahrenheit)
    `
  }
];