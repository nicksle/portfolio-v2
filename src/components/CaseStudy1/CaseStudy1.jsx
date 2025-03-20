import React, { useEffect, useRef, useState } from 'react';
import { CSContent } from '../CSContent/CSContent';
import './CaseStudy1.css';

export const CaseStudy1 = ({ headerHeight = 64 }) => {
  const containerRef = useRef(null);
  const caseStudyContentRef = useRef(null);
  const csContentContainerRef = useRef(null);
  const [shouldCloseDropdowns, setShouldCloseDropdowns] = useState(false);

  useEffect(() => {
    // Set initial styles
    if (caseStudyContentRef.current) {
      caseStudyContentRef.current.style.opacity = 1;
      caseStudyContentRef.current.style.transform = 'translateY(0) scale(1)';
    }

    const handleScroll = () => {
      if (!containerRef.current || !caseStudyContentRef.current || !csContentContainerRef.current) return;

      const scrollPosition = window.scrollY;
      const containerTop = containerRef.current.getBoundingClientRect().top + window.scrollY;
      
      // Parallax effect - content moves faster than the container
      const parallaxSpeed = 0.5; // How much faster the content moves compared to scroll
      const csContentSpeed = 0.2; // How much slower the CSContent moves
      
      // Calculate relative scroll position within the section
      const relativeScroll = scrollPosition - containerTop;
      
      // Only apply effects when we're within the container section
      if (relativeScroll >= 0) {
        // Fast parallax for casestudy1-content - moves up and fades out quickly
        const contentTranslate = relativeScroll * parallaxSpeed;
        const contentOpacity = Math.max(0, 1 - relativeScroll / 300); // Fade out over 300px of scroll
        const contentScale = 0.7 + (contentOpacity * 0.3); // Scale from 1 to 0.7
        
        caseStudyContentRef.current.style.transform = `translateX(-50%) translateY(-${contentTranslate}px) scale(${contentScale})`;
        caseStudyContentRef.current.style.opacity = contentOpacity;
        caseStudyContentRef.current.style.pointerEvents = contentOpacity < 0.1 ? 'none' : 'auto';
        
        // Set state to close dropdowns
        setShouldCloseDropdowns(contentOpacity < 0.5);
        
        // Slow parallax for CSContent - moves up more slowly
        if (relativeScroll < 400) { // Animation range
          const csTranslate = Math.max(0, (relativeScroll * csContentSpeed));
          const csScale = 0.9 + (Math.min(relativeScroll / 400, 1) * 0.1); // Scale from 0.9 to 1
          
          csContentContainerRef.current.style.transform = `translateX(-50%) translateY(-${csTranslate}px) scale(${csScale})`;
          csContentContainerRef.current.style.position = 'absolute';
          csContentContainerRef.current.style.top = '120vh'; // Start below viewport
        } else {
          // Once we've scrolled enough, fix it in place
          csContentContainerRef.current.style.transform = 'translateX(-50%) scale(1)';
          csContentContainerRef.current.style.position = 'fixed';
          csContentContainerRef.current.style.top = '80px';
        }
      }
    };

    // Call once on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headerHeight]);

  return (
    <div ref={containerRef} className="casestudy1">
      <div ref={caseStudyContentRef} className="casestudy1-content">
        <div className="casestudy1-text-container">
          <h1 className="casestudy1-title">Sign-Up Flow</h1>
          <p className="casestudy1-text">
            Product designer with 5+ years of experience working Through this project, we streamlined the onboarding process to reduce drop-offs and improve user conversion. More text because i feel like this section should actually take up a decent amount of space.
          </p>
        </div>
        <div className="casestudy1-image">
          <div className="image-placeholder"></div>
        </div>
      </div>
      
      <div 
        ref={csContentContainerRef} 
        className="cs-content-container" 
        style={{ 
          position: 'absolute',
          top: '120vh', // Start completely below the viewport
          left: '50%',
          transform: 'translateX(-50%) scale(0.9)',
          width: '100%', 
          maxWidth: '1200px',
          transformOrigin: 'center top',
          zIndex: 20 // Higher than casestudy1-content
        }}
      >
        <CSContent />
      </div>
    </div>
  );
};

export default CaseStudy1;
