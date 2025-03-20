import { useEffect, useRef, useCallback } from 'react';

export const useIntersectionObserver = (callback, options = {}) => {
  const targetRef = useRef(null);
  const observerRef = useRef(null);

  const cleanupObserver = useCallback(() => {
    if (observerRef.current && targetRef.current) {
      observerRef.current.unobserve(targetRef.current);
      observerRef.current.disconnect();
    }
  }, []);

  useEffect(() => {
    const currentTarget = targetRef.current;

    observerRef.current = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry);
          // Cleanup after animation is triggered
          cleanupObserver();
        }
      });
    }, {
      root: document.querySelector('.dropdown.open'),
      threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
      rootMargin: '0px 0px -10% 0px',
      ...options
    });

    if (currentTarget) {
      observerRef.current.observe(currentTarget);
    }

    return cleanupObserver;
  }, [callback, options, cleanupObserver]);

  return targetRef;
}; 