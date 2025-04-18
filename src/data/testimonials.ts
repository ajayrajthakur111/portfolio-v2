// src/data/testimonials.ts
import { Testimonial } from '@/types/common.types';

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Product Manager',
    company: 'TechCorp',
    avatar: '/api/placeholder/100/100?text=SJ',
    content: 'Working with John was an absolute pleasure. His attention to detail and problem-solving skills helped us deliver our product ahead of schedule. The code quality was exceptional, and he was always willing to go the extra mile to ensure the best user experience.'
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'CTO',
    company: 'StartUp Inc',
    avatar: '/api/placeholder/100/100?text=MC',
    content: 'John transformed our frontend architecture, making it more maintainable and performant. His expertise in React and TypeScript was evident in every aspect of his work. He\'s not just a great developer but also an excellent communicator and team player.'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'UX Designer',
    company: 'DesignHub',
    avatar: '/api/placeholder/100/100?text=ER',
    content: 'Collaborating with John on our design system was a fantastic experience. He understood the importance of design consistency and implemented our components with pixel-perfect precision. His frontend skills are matched only by his professionalism.'
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Senior Developer',
    company: 'WebSolutions',
    avatar: '/api/placeholder/100/100?text=DK',
    content: 'John is one of the most skilled developers I\'ve worked with. His ability to break down complex problems into manageable solutions is impressive. He consistently delivered high-quality code and was always willing to mentor junior team members.'
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    role: 'Project Lead',
    company: 'DigitalAgency',
    avatar: '/api/placeholder/100/100?text=LT',
    content: 'We brought John in to lead a critical project, and he exceeded all expectations. His technical leadership and clear communication kept the project on track. The end result was a robust application that our client loved.'
  }
];