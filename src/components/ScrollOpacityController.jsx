import React, { useEffect } from 'react';

const ScrollOpacityController = () => {
  useEffect(() => {
    // Handle scroll events anywhere in the document
    const handleScroll = () => {
      // Find all active dropdowns in the document
      const activeDropdowns = document.querySelectorAll('.dropdown.open');
      
      activeDropdowns.forEach(dropdown => {
        // Calculate how far we've scrolled within this dropdown
        const rect = dropdown.getBoundingClientRect();
        const viewportTop = 0;
        const distanceFromTop = rect.top - viewportTop;
        
        // Calculate opacity - header fades as it moves up
        let headerOpacity = 1;
        
        if (distanceFromTop < 0) {
          // We've scrolled past the top
          headerOpacity = Math.max(0, 1 + (distanceFromTop / 154));
        }
        
        // Apply the opacity
        const header = dropdown.querySelector('.dropdown-header');
        if (header) {
          header.style.opacity = headerOpacity;
          console.log('Applied opacity:', headerOpacity, 'to dropdown');
        }
      });
    };

    // Add listener to document/window
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default ScrollOpacityController; 