import React, { useEffect, useRef, useState } from 'react';
import './Work.css';
// Import CSContent and its CSS
import CSContent from '../CSContent/CSContent';
import '../CSContent/CSContent.css';

// Custom hook to handle dropdown opacity effect
const useDropdownOpacityEffect = (isEnabled) => {
  useEffect(() => {
    if (!isEnabled) return;
    
    // Create a single reusable scroll handler
    const handleDropdownScroll = (event) => {
      const dropdown = event.target;
      if (!dropdown.classList.contains('dropdown')) return;
      
      const header = dropdown.querySelector('.dropdown-header');
      if (!header) return;
      
      const scrollTop = dropdown.scrollTop;
      
      // Simple fade out formula - same as the original
      const opacity = scrollTop > 10 
        ? Math.max(0, 1 - (scrollTop / 154)) 
        : 1;
        
      header.style.opacity = opacity;
    };
    
    // Helper to set up dropdowns
    const setupDropdowns = () => {
      const dropdowns = document.querySelectorAll('.dropdown.open, .dropdown.active');
      
      dropdowns.forEach(dropdown => {
        // Ensure proper styling
        dropdown.style.overflowY = 'auto';
        
        // Remove existing listener to prevent duplicates
        dropdown.removeEventListener('scroll', handleDropdownScroll);
        
        // Add scroll listener
        dropdown.addEventListener('scroll', handleDropdownScroll, { passive: true });
        
        // Reset opacity on initial setup
        const header = dropdown.querySelector('.dropdown-header');
        if (header) header.style.opacity = 1;
      });
    };
    
    // Set up a MutationObserver to watch for dropdown changes
    const observer = new MutationObserver((mutations) => {
      let shouldSetup = false;
      
      for (const mutation of mutations) {
        // If classes change on a dropdown
        if (mutation.type === 'attributes' && 
            mutation.attributeName === 'class' &&
            mutation.target.classList.contains('dropdown')) {
          shouldSetup = true;
          break;
        }
        
        // If new dropdowns are added
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          for (const node of mutation.addedNodes) {
            if (node.classList && node.classList.contains('dropdown')) {
              shouldSetup = true;
              break;
            }
          }
        }
      }
      
      if (shouldSetup) {
        setupDropdowns();
      }
    });
    
    // Initial setup
    setupDropdowns();
    
    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => {
      // Clean up all listeners
      const dropdowns = document.querySelectorAll('.dropdown');
      dropdowns.forEach(dropdown => {
        dropdown.removeEventListener('scroll', handleDropdownScroll);
      });
      observer.disconnect();
    };
  }, [isEnabled]);
};

// Define mapping functions for your specific use case
const mapDropdownToHeadNav = (dropdownId) => {
  // This maps from your dropdown IDs to HeadNav IDs
  const mapping = {
    'tanda': 'problem',
    'liftoff': 'goals',
    'jetfuel': 'research',
    'cashapp': 'insights'
  };
  return mapping[dropdownId] || dropdownId;
};

const mapHeadNavToDropdown = (headNavId) => {
  // This maps from HeadNav IDs to your dropdown IDs
  const mapping = {
    'problem': 'tanda',
    'goals': 'liftoff',
    'research': 'jetfuel',
    'insights': 'cashapp'
  };
  return mapping[headNavId] || headNavId;
};

export const Work = () => {
  console.log("Work component rendering");
  
  const containerRef = useRef(null);
  const workContentRef = useRef(null);
  const workExperienceRef = useRef(null);
  const [isInitialAnimationComplete, setIsInitialAnimationComplete] = useState(false);
  
  // Custom props for CSContent
  const csContentProps = {
    initialActiveTab: "tanda",
    dropdowns: [
      {
        id: 'tanda',
        company: "TANDA",
        role: "Senior Product Designer",
        period: "2023 - 2024",
        index: "01",
        bodyItems: [
          {
            layout: "row",
            content: [
              {
                type: "text",
                text: "TANDA is a fintech startup dedicated to making financial security accessible to everyone. Through our iOS and Android mobile apps, we offer a community-driven savings service that empowers users to reach their financial goals."
              },
              {
                type: "image",
                src: "https://picsum.photos/800/400?random=1"
              }
            ]
          },
          {
            layout: "row",
            content: {
              type: "selected-work",
              works: [
                {
                  index: 1,
                  subtitle: "User Drop-off",
                  image: "https://picsum.photos/800/400?random=18",
                  title: "Analytics Deep Dive",
                  description: "Comprehensive analysis of user behavior and drop-off points"
                },
                {
                  index: 2,
                  subtitle: "Initial Research",
                  image: "https://picsum.photos/800/400?random=19",
                  title: "Problem Space",
                  description: "Mapping the complexity of the current sign-up flow"
                }
              ]
            }
          },
        ]
      },
      {
        id: 'liftoff',
        company: "LiftOff Mobile",
        role: "Product Designer",
        period: "2022 - 2023",
        index: "02",
        bodyItems: [
          {
            layout: "row",
            content: [
              {
                type: "text",
                text: "LiftOff Mobile's Influence team aims to transform digital advertising by leveraging user-generated content (UGC) as a powerful, authentic marketing tool for brands and mobile businesses.  We bridge relationships between influencers and advertisers, providing tools to help influencers to monetize their content, and advertisers find creators who fit their specific needs."
              },
              {
                type: "image",
                src: "https://picsum.photos/800/400?random=2"
              }
            ]
          },
          {
            layout: "row",
            content: {
              type: "selected-work",
              works: [
                {
                  index: 1,
                  subtitle: "Primary Goal",
                  image: "https://picsum.photos/800/400?random=7",
                  title: "Conversion Optimization",
                  description: "Improve the sign-up completion rate through optimized UX"
                },
                {
                  index: 2,
                  subtitle: "Secondary Goal",
                  image: "https://picsum.photos/800/400?random=8",
                  title: "User Engagement",
                  description: "Enhance user engagement during the onboarding process"
                }
              ]
            }
          }
        ]
      },
      {
        id: 'jetfuel',
        company: "Jetfuel",
        role: "Product Designer",
        period: "2020 - 2022",
        index: "03",
        bodyItems: [
          {
            layout: "row",
            content: [
              {
                type: "text",
                text: "Jetfuel is a performance-based influencer marketing platform connecting our network of influencers to a myriad of advertisers; giving our users more direct access to monetization opportunities, and relationship building with advertisers."
              },
              {
                type: "image",
                src: "https://picsum.photos/800/400?random=3"
              }
            ]
          },
          {
            layout: "row",
            content: {
              type: "selected-work",
              works: [
                {
                  index: 1,
                  subtitle: "User Research",
                  image: "https://picsum.photos/800/400?random=9",
                  title: "Interview Findings",
                  description: "Key insights from user interviews and testing sessions"
                },
                {
                  index: 2,
                  subtitle: "Data Analysis",
                  image: "https://picsum.photos/800/400?random=10",
                  title: "Analytics Review",
                  description: "Quantitative data analysis of user behavior"
                }
              ]
            }
          }
        ]
      },
      {
        id: 'cashapp',
        company: "Cash App",
        role: "Product Designer",
        period: "2019",
        index: "04",
        bodyItems: [
          {
            layout: "row",
            content: [
              {
                type: "text",
                text: "Key findings revealed that users were overwhelmed by the amount of information required upfront and needed better understanding of the value proposition."
              },
              {
                type: "image",
                src: "https://picsum.photos/800/400?random=4"
              }
            ]
          },
          {
            layout: "row",
            content: {
              type: "selected-work",
              works: [
                {
                  index: 1,
                  subtitle: "User Behavior",
                  image: "https://picsum.photos/800/400?random=11",
                  title: "Behavioral Patterns",
                  description: "Analysis of user interaction patterns"
                },
                {
                  index: 2,
                  subtitle: "Pain Points",
                  image: "https://picsum.photos/800/400?random=12",
                  title: "Problem Areas",
                  description: "Identified major friction points in the flow"
                }
              ]
            }
          }
        ]
      }
    ],
    
    // Pass your mapping functions
    mapDropdownIdToHeadNavId: mapDropdownToHeadNav,
    mapHeadNavIdToDropdownId: mapHeadNavToDropdown,
    
    // Customize HeadNav via props
    headNavProps: {
      // Since HeadNav uses IDs like 'problem', set labels using those IDs
      tabLabels: {
        problem: "TANDA",
        goals: "LiftOff Mobile", 
        research: "Jetfuel",
        insights: "Cash App"
      },
      sticky: false,
      onHover: (tabId) => {
        console.log(`Tab ${tabId} hovered in Work component`);
      }
    },
    
    // Your event handlers
    onTabChange: (dropdownId) => {
      console.log(`Tab changed to ${dropdownId} in Work component`);
    },
    
    // Other customization
    enableOverscrollTriggers: true,
    enableHeaderOpacityEffect: true,
    
    // Styling
    className: "work-cs-content",
    style: { marginBottom: '24px', padding: '0' }
  };
  
  // Use our custom hook to handle dropdown opacity
  useDropdownOpacityEffect(isInitialAnimationComplete);

  // Initial animation effect
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !workContentRef.current || !workExperienceRef.current) return;

      const scrollPosition = window.scrollY;
      const containerTop = containerRef.current.offsetTop;
      const containerBottom = containerTop + containerRef.current.offsetHeight;
      
      // Use 75% of viewport height for scroll range
      const scrollRange = window.innerHeight * 0.75;
      
      // Calculate progress (0 to 1)
      const scrollProgress = Math.min(
        Math.max((scrollPosition - containerTop) / scrollRange, 0),
        1
      );

      // Update animation completion state
      if (scrollProgress >= 0.99 && !isInitialAnimationComplete) {
        setIsInitialAnimationComplete(true);
      }

      // Fade out work content
      const contentOpacity = Math.max(0, 1 - scrollProgress);
      workContentRef.current.style.opacity = contentOpacity;
      workContentRef.current.style.pointerEvents = contentOpacity < 0.1 ? 'none' : 'auto';

      // Position calculations
      const headerHeight = 64; // Fixed header height
      const targetGap = 24; // Desired gap below header
      const endY = headerHeight + targetGap; // Final Y position
      const startY = window.innerHeight; // Start position outside viewport
      
      // Calculate position
      const currentY = startY - (scrollProgress * (startY - endY));
      
      // Apply position - only update if we haven't reached the end position
      if (scrollProgress < 1) {
        workExperienceRef.current.style.top = `${Math.max(currentY, endY)}px`;
      } else {
        workExperienceRef.current.style.top = `${endY}px`;
      }
      
      // Prevent overscrolling by stopping at boundaries
      if (scrollPosition <= containerTop && window.scrollY < scrollPosition) {
        // If we're at the top of the container and trying to scroll up
        window.scrollTo(0, containerTop);
      } else if (scrollPosition >= containerBottom - window.innerHeight && window.scrollY > scrollPosition) {
        // If we're at the bottom of the container and trying to scroll down
        window.scrollTo(0, containerBottom - window.innerHeight);
      }

      console.log(`Current Y position: ${currentY}, Scroll Progress: ${scrollProgress}`);
    };

    // Call once on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isInitialAnimationComplete]);

  // Add wheel event handler to prevent overscrolling
  useEffect(() => {
    const handleWheel = (event) => {
      // Only apply overscroll prevention once we're within the Work component
      if (!containerRef.current) return;
      
      const containerTop = containerRef.current.offsetTop;
      const containerBottom = containerTop + containerRef.current.offsetHeight;
      const scrollPosition = window.scrollY;
      
      // Check if we're scrolling within a dropdown
      const isInDropdown = event.target.closest('.dropdown') || 
                          event.target.closest('.body');
      
      // If we're in a dropdown, let it handle its own scrolling
      if (isInDropdown && isInitialAnimationComplete) {
        return;
      }
      
      // Prevent scrolling beyond the container's bounds
      if (
        // Trying to scroll up past the top
        (scrollPosition <= containerTop && event.deltaY < 0) ||
        // Trying to scroll down past the bottom
        (scrollPosition >= containerBottom - window.innerHeight && event.deltaY > 0)
      ) {
        event.preventDefault();
        return false;
      }
    };
    
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    // Also prevent touchmove overscrolling
    const handleTouchMove = (event) => {
      if (!containerRef.current) return;
      
      const containerTop = containerRef.current.offsetTop;
      const containerBottom = containerTop + containerRef.current.offsetHeight;
      const scrollPosition = window.scrollY;
      
      // Check if we're at boundaries
      if (
        (scrollPosition <= containerTop && window.scrollY === scrollPosition) ||
        (scrollPosition >= containerBottom - window.innerHeight)
      ) {
        // Only prevent default at the boundaries
        event.preventDefault();
      }
    };
    
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isInitialAnimationComplete]);

  // Add wheel event handler for nested scrolling support
  useEffect(() => {
    // Helper function to check if an element is a dropdown body
    const isDropdownBody = (element) => {
      while (element && element !== document.body) {
        if (element.classList && element.classList.contains('body')) {
          return true;
        }
        element = element.parentElement;
      }
      return false;
    };

    const handleWheel = (event) => {
      if (!isInitialAnimationComplete) return;
      
      // Check if we're scrolling inside a dropdown body
      if (isDropdownBody(event.target)) {
        const dropdownBody = event.target.closest('.body');
        
        // Allow dropdown body to scroll naturally when it needs to
        if (dropdownBody) {
          const { scrollTop, scrollHeight, clientHeight } = dropdownBody;
          
          // If we're at the top and scrolling up, or at the bottom and scrolling down,
          // let the main page scroll. Otherwise, let the dropdown scroll.
          const isAtTop = scrollTop === 0;
          const isAtBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 1;
          const isScrollingUp = event.deltaY < 0;
          const isScrollingDown = event.deltaY > 0;
          
          if ((isAtTop && isScrollingUp) || (isAtBottom && isScrollingDown)) {
            // Let the main page scroll - don't prevent default
            return;
          }
          
          // Otherwise, let the dropdown body scroll - prevent page scrolling
          event.stopPropagation();
        }
      }
    };
    
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isInitialAnimationComplete]);

  // Add this immediately after the state declarations
  useEffect(() => {
    // Force animation to complete for testing
    setTimeout(() => {
      setIsInitialAnimationComplete(true);
      if (workExperienceRef.current) {
        workExperienceRef.current.style.top = '88px'; // 64px header + 24px gap
      }
    }, 500);
  }, []);

  return (
    <div ref={containerRef} className="work" style={{ height: '300vh' }}>
      <div ref={workContentRef} className="work-content">
        <p className="work-text">
          Product designer with 5+ years of experience working with startups in the influencer marketing and fintech space.
        </p>
        <div className="work-carousel">
          <div className="carousel-item"></div>
          <div className="carousel-item"></div>
          <div className="carousel-item"></div>
        </div>
      </div>
      
      <div 
        ref={workExperienceRef} 
        className="work-experience-wrapper"
        style={{ 
          position: 'fixed', 
          width: '1200px',
          left: '50%', 
          transform: 'translateX(-50%)',
          height: 'calc(100vh - 88px)',
          overflow: 'visible',
          zIndex: 1000
        }}
      >
        <CSContent 
          {...csContentProps}
        />
      </div>
    </div>
  );
};

export default Work; 