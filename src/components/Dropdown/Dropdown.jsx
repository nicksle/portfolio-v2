import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from 'react';
import { Head } from "../Head/Head";
import { Body } from "../Body/Body";
import "./Dropdown.css";

const Dropdown = ({ 
  isOpen, 
  company, 
  role, 
  period, 
  index,
  bodyItems,
  onOverscroll,
  isLastItem = false,
  id
}) => {
  const [headerOpacity, setHeaderOpacity] = useState(1);
  const dropdownRef = useRef(null);
  const headerRef = useRef(null);
  const bodyRef = useRef(null);
  const prevIsOpenRef = useRef(isOpen);
  const isAnimatingRef = useRef(false);
  const isActivatingRef = useRef(false);
  
  // Track overscroll progress (0-100%)
  const [overscrollProgress, setOverscrollProgress] = useState(0);
  
  // Track height for animation
  const [height, setHeight] = useState(isOpen ? '80vh' : '154px');
  // Track if head content is animating
  const [isHeadAnimating, setIsHeadAnimating] = useState(false);

  // Make the handleScroll function available to parent components
  window.dropdownScrollHandlers = window.dropdownScrollHandlers || {};

  // Reset header opacity when dropdown becomes active
  useEffect(() => {
    if (isOpen) {
      console.log("Resetting header opacity to 1 for:", company);
      setHeaderOpacity(1);
      setOverscrollProgress(0);
    }
  }, [isOpen, company]);

  // When open state changes, trigger height animation
  useEffect(() => {
    // When changing from open to closed
    if (prevIsOpenRef.current && !isOpen) {
      console.log("Collapsing dropdown:", company);
      isAnimatingRef.current = true;
      setHeight('154px'); // Collapse to header height
      setIsHeadAnimating(true); // Trigger head animations
      
      // Reset animation states after animation completes
      setTimeout(() => {
        setIsHeadAnimating(false);
        isAnimatingRef.current = false;
      }, 600);
    }
    
    // When changing from closed to open
    if (!prevIsOpenRef.current && isOpen) {
      console.log("Expanding dropdown:", company);
      isAnimatingRef.current = true;
      isActivatingRef.current = true;
      setHeight('80vh'); // Expand to full height
      setIsHeadAnimating(true); // Trigger head animations
      setHeaderOpacity(1); // Ensure header is fully visible
      
      // Reset animation states after animation completes
      setTimeout(() => {
        setIsHeadAnimating(false);
        isAnimatingRef.current = false;
        isActivatingRef.current = false;
      }, 600);
    }
    
    // Update previous state reference
    prevIsOpenRef.current = isOpen;
  }, [isOpen, company]);

  // Detect when dropdown becomes active and trigger animation
  useEffect(() => {
    // Check if we're transitioning from closed to open
    if (!prevIsOpenRef.current && isOpen) {
      console.log("Dropdown becoming active - triggering animation");
      isActivatingRef.current = true;
      
      // Reset animation flag after animation completes
      const animationTimeout = setTimeout(() => {
        isActivatingRef.current = false;
      }, 1000); // Match this to your animation duration
      
      return () => clearTimeout(animationTimeout);
    }
    
    // Update previous state reference
    prevIsOpenRef.current = isOpen;
  }, [isOpen]);

  // Handle scroll events
  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = () => {
      if (!dropdownRef.current || isAnimatingRef.current) return;
      
      const scrollTop = dropdownRef.current.scrollTop;
      
      // Only update opacity if we've scrolled past a threshold
      if (scrollTop > 10) {
        const opacity = Math.max(0, 1 - (scrollTop / 154));
        setHeaderOpacity(opacity);
      } else {
        // Reset to full opacity when at top
        setHeaderOpacity(1);
      }
      
      // Detect approaching bottom for overscroll indicator
      const scrollHeight = dropdownRef.current.scrollHeight;
      const clientHeight = dropdownRef.current.clientHeight;
      const scrollBottom = scrollHeight - scrollTop - clientHeight;
      
      // Calculate overscroll progress (0-100%)
      if (!isLastItem && scrollBottom < 100) {
        // Convert to percentage (100% when ready to trigger)
        const progress = Math.min(100, Math.max(0, 
          100 - (scrollBottom / 100) * 100));
        setOverscrollProgress(progress);
        
        if (progress > 80) {
          dropdownRef.current.classList.add('overscroll-ready');
        } else {
          dropdownRef.current.classList.remove('overscroll-ready');
        }
        
        // Show bottom gradient and indicator
        dropdownRef.current.classList.add('at-bottom');
      } else {
        setOverscrollProgress(0);
        dropdownRef.current.classList.remove('at-bottom');
        dropdownRef.current.classList.remove('overscroll-ready');
      }
    };

    // Store the reference so it can be accessed externally
    window.dropdownScrollHandlers[company] = handleScroll;

    const dropdown = dropdownRef.current;
    if (dropdown) {
      dropdown.addEventListener('scroll', handleScroll, { passive: true });
      
      // Initial call to set correct opacity
      handleScroll();
    }

    // Reset scroll position and opacity when becoming active
    if (dropdown) {
      // Force scroll to top when opened
      dropdown.scrollTop = 0;
      setHeaderOpacity(1);
    }

    // Add wheel event for overscroll detection
    const handleWheel = (e) => {
      if (!isOpen || isAnimatingRef.current || !dropdownRef.current || isLastItem) return;
      
      const scrollHeight = dropdownRef.current.scrollHeight;
      const clientHeight = dropdownRef.current.clientHeight;
      const scrollTop = dropdownRef.current.scrollTop;
      const scrollBottom = scrollHeight - scrollTop - clientHeight;
      
      // If we're near the bottom and user is scrolling down with enough force
      if (scrollBottom <= 30 && e.deltaY > 20) {
        console.log("Overscroll triggered with force:", e.deltaY);
        
        if (onOverscroll) {
          // Prevent the default scroll
          if (e.cancelable) e.preventDefault();
          onOverscroll();
        }
      }
    };
    
    // Add event listeners
    if (dropdownRef.current) {
      dropdownRef.current.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (dropdown) {
        dropdown.removeEventListener('scroll', handleScroll);
      }
      if (dropdownRef.current) {
        dropdownRef.current.removeEventListener('wheel', handleWheel);
      }
      delete window.dropdownScrollHandlers[company];
    };
  }, [isOpen, onOverscroll, isLastItem]);

  return (
    <div 
      ref={dropdownRef}
      className={`dropdown ${isOpen ? 'open' : 'closed'} ${isActivatingRef.current ? 'activating' : ''}`}
      data-id={id}
      style={{
        height: height,
        transition: 'height 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden'
      }}
    >
      <div 
        ref={headerRef}
        className={`dropdown-header ${isHeadAnimating ? 'animating' : ''}`}
        style={{ 
          opacity: isOpen ? headerOpacity : 1, // Always full opacity when closed
          position: 'sticky',
          top: 0,
          zIndex: 999,
          backgroundColor: 'var(--base)',
          transition: 'opacity 0.1s linear'
        }}
      >
        <Head
          title={company}
          role={role}
          year={period}
          index={index}
          divClassName={isOpen ? 'rotated' : ''}
          isAnimating={isHeadAnimating}
        />
      </div>
      
      <div 
        ref={bodyRef}
        className="body"
        style={{
          opacity: 1, // Set base opacity to 1
          transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
          transition: 'transform 0.4s ease',
          pointerEvents: isOpen ? 'auto' : 'none',
          visibility: isOpen ? 'visible' : 'hidden'
        }}
      >
        <Body 
          bodyItems={bodyItems} 
          isOpen={isOpen}
        />
        
        {/* Add the overscroll indicator as the last item in the body */}
        {!isLastItem && (
          <div 
            className="overscroll-indicator-container" 
            style={{
              width: '100%',
              marginTop: '32px',
              marginBottom: '16px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: overscrollProgress > 10 ? (overscrollProgress / 100) : 0.3,
              transition: 'opacity 0.3s ease'
            }}
          >
            <div className="indicator-content" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span 
                className="arrow-icon" 
                style={{
                  fontSize: '24px',
                  color: 'var(--tertiary)',
                  animation: 'bounce 1.5s infinite'
                }}
              >
                ↓
              </span>
              <div 
                className="progress-bar" 
                style={{
                  width: '80px',
                  height: '4px',
                  backgroundColor: 'var(--inactive)',
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}
              >
                <div 
                  className="progress" 
                  style={{ 
                    width: `${overscrollProgress}%`,
                    height: '100%',
                    backgroundColor: 'var(--active)',
                    transition: 'width 0.2s ease',
                    borderRadius: '2px'
                  }}
                ></div>
              </div>
              <span 
                className="hint-text"
                style={{
                  fontSize: '14px',
                  color: overscrollProgress > 80 ? 'var(--active)' : 'var(--tertiary)',
                  transition: 'color 0.3s ease',
                  fontWeight: '500'
                }}
              >
                {overscrollProgress > 80 ? "Release to continue" : "Scroll to continue"}
              </span>
            </div>
          </div>
        )}
      </div>
      <style>
        {`
          /* Base state - hide items initially */
          .dropdown.activating .body .body-item,
          .dropdown.activating .body .selected-work,
          .dropdown.activating .body .text,
          .dropdown.activating .body .image {
            opacity: 0;
          }
          
          /* Fade-in animation */
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          /* Apply animations only when activating */
          .dropdown.activating .body .body-item {
            animation: fadeIn 0.8s ease forwards;
          }
          
          .dropdown.activating .body .selected-work {
            animation: fadeIn 0.8s ease forwards;
            animation-delay: 0.1s;
          }
          
          .dropdown.activating .body .text {
            animation: fadeIn 0.8s ease forwards;
            animation-delay: 0.2s;
          }
          
          .dropdown.activating .body .image {
            animation: fadeIn 0.8s ease forwards;
            animation-delay: 0.3s;
          }
          
          .dropdown.activating .overscroll-indicator-container {
            opacity: 0;
            animation: fadeIn 0.8s ease forwards;
            animation-delay: 0.4s;
          }
        `}
      </style>
    </div>
  );
};

Dropdown.propTypes = {
  isOpen: PropTypes.bool,
  company: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  bodyItems: PropTypes.array.isRequired,
  onOverscroll: PropTypes.func,
  isLastItem: PropTypes.bool,
  id: PropTypes.string
};

export default Dropdown;
