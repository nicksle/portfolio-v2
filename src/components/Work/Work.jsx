import React, { useEffect, useRef } from 'react';
import { WorkExperience } from '../WorkExperience/WorkExperience';
import './Work.css';

export const Work = () => {
  const containerRef = useRef(null);
  const workContentRef = useRef(null);
  const workExperienceRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !workContentRef.current || !workExperienceRef.current) return;

      const scrollPosition = window.scrollY;
      const containerTop = containerRef.current.offsetTop;
      const containerHeight = containerRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate how far through the section we've scrolled (0 to 1)
      const scrollProgress = Math.min(
        Math.max((scrollPosition - containerTop) / (containerHeight - viewportHeight), 0),
        1
      );

      // Fade out work content and disable pointer events when fully scrolled
      workContentRef.current.style.opacity = 1 - scrollProgress;
      workContentRef.current.style.pointerEvents = scrollProgress === 1 ? 'none' : 'auto';

      // Move work experience from out of view to center of viewport with easing
      const startY = viewportHeight * 1.5; // Start completely out of view
      const endY = viewportHeight / 2;    // End at center of viewport
      // Use cubic-bezier easing for smoother motion
      const easedProgress = scrollProgress < 0.5
        ? 2 * scrollProgress * scrollProgress
        : 1 - Math.pow(-2 * scrollProgress + 2, 2) / 2;
      const currentY = startY - (easedProgress * (startY - endY));
      workExperienceRef.current.style.top = `${currentY}px`;
    };

    // Call once on mount to set initial positions
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="work" style={{ height: '200vh' }}>
      <div ref={workContentRef} className="work-content">
        <p className="work-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p className="work-text body2">
          Additional text with body2 style goes here. This will appear 16px below the text above.
        </p>
        <div className="work-carousel">
          {/* Placeholder for carousel images */}
          <div className="carousel-item"></div>
          <div className="carousel-item"></div>
          <div className="carousel-item"></div>
        </div>
      </div>
      
      <div ref={workExperienceRef} className="work-experience">
        <WorkExperience />
      </div>
    </div>
  );
};

export default Work; 