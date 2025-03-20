import React, { useEffect, useRef, useState } from 'react';
import './BodyArrow.css';

export const BodyArrow = () => {
  const [opacity, setOpacity] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const arrowRef = useRef(null);
  const snapTimeoutRef = useRef(null);
  const lastRatioRef = useRef(1);

  useEffect(() => {
    const handleScroll = (entries) => {
      if (!entries[0]) return;
      
      const ratio = entries[0].intersectionRatio;
      setOpacity(ratio);
      
      // Reduced gravity effect
      const gravity = ratio * 6; // Even smaller multiplier
      setTranslateY(gravity);

      // Only trigger snap back if we're moving from more visible to less visible
      // and we're in a specific range that's narrower than before
      if (ratio < 0.8 && ratio > 0.2 && ratio < lastRatioRef.current) {
        // Clear any existing timeout
        if (snapTimeoutRef.current) {
          clearTimeout(snapTimeoutRef.current);
        }
        
        // Add a small delay before snapping
        snapTimeoutRef.current = setTimeout(() => {
          const dropdown = entries[0].target.closest('.dropdown.open');
          if (dropdown) {
            const previousItem = arrowRef.current.previousElementSibling;
            if (previousItem) {
              // Use a gentler scroll with block: "center" instead of start
              previousItem.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center'
              });
            }
          }
        }, 100); // Small delay to reduce frequency of snapping
      }
      
      // Update the last ratio for comparison
      lastRatioRef.current = ratio;
    };

    const observer = new IntersectionObserver(handleScroll, {
      // Fewer thresholds for less frequent updates
      threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
      root: document.querySelector('.dropdown.open')
    });

    if (arrowRef.current) {
      observer.observe(arrowRef.current);
    }

    return () => {
      if (snapTimeoutRef.current) {
        clearTimeout(snapTimeoutRef.current);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={arrowRef} 
      className="body-arrow"
      style={{ 
        opacity,
        transform: `translateY(${translateY}px)`,
        transition: `transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)`
      }}
    >
      􀄫
    </div>
  );
};

export default BodyArrow; 