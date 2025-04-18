// src/hooks/useIntersection.ts
import { useInView } from 'react-intersection-observer';

export const useIntersection = (
  options?: IntersectionObserverInit
) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    ...options
  });

  return { ref, inView };
};