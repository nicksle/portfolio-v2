import React, { useState, useEffect, useRef } from 'react';
import { HeadNav } from '../HeadNav/HeadNav';
import DropdownStack from '../DropdownStack/DropdownStack';
import './CSContent.css';

// Default data that will be used if props aren't provided
const defaultDropdowns = [
  {
    id: 'problem',
    company: "Problem",
    role: "Identifying the Problem",
    period: "2023 - 2024",
    index: "01",
    bodyItems: [
      {
        layout: "row",
        content: [
          {
            type: "text",
            text: "Despite strong app download numbers, we faced a critical challenge: users weren't completing the sign-up process. Our analytics revealed a significant drop-off between app installation and account creation."
          },
          {
            type: "image",
            src: "https://picsum.photos/800/400?random=1"
          }
        ]
      },
      {
        layout: "row",
        content: [
          {
            type: "text",
            text: "Key Issues Identified:\n\n1. Complex registration process\n2. Unclear value proposition\n3. Long loading times\n4. Too many required fields"
          }
        ]
      },
      {
        layout: "row",
        content: [
          {
            type: "image",
            src: "https://picsum.photos/800/400?random=17"
          },
          {
            type: "text",
            text: "Initial data showed that 67% of users abandoned the sign-up process within the first two steps, indicating a significant usability problem that needed immediate attention."
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
      {
        layout: "row",
        content: [
          {
            type: "text",
            text: "Impact on Business:\n\n• Lost potential customers\n• Increased acquisition costs\n• Reduced market penetration\n• Lower conversion rates"
          },
          {
            type: "image",
            src: "https://picsum.photos/800/400?random=20"
          }
        ]
      }
    ]
  },
  {
    id: 'goals',
    company: "Goals",
    role: "Outlining the Project Goals",
    period: "2023 - 2024",
    index: "02",
    bodyItems: [
      {
        layout: "row",
        content: [
          {
            type: "text",
            text: "Our primary goal was to increase user conversion rates during the onboarding process while maintaining a seamless and engaging user experience."
          },
          {
            type: "image",
            src: "https://picsum.photos/800/400?random=2"
          }
        ]
      },
      {
        layout: "row",
        content: [
          {
            type: "text",
            text: "Key Objectives:\n\n1. Increase sign-up completion rate by 40%\n2. Reduce user drop-off during onboarding\n3. Improve user understanding of product value"
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
    id: 'research',
    company: "Research",
    role: "Product Design",
    period: "2023 - 2024",
    index: "03",
    bodyItems: [
      {
        layout: "row",
        content: [
          {
            type: "text",
            text: "Through user interviews and data analysis, we identified key pain points in the sign-up flow and gathered insights about user expectations and behaviors."
          },
          {
            type: "image",
            src: "https://picsum.photos/800/400?random=3"
          }
        ]
      },
      {
        layout: "row",
        content: [
          {
            type: "text",
            text: "Research Methods:\n\n1. User Interviews (20 participants)\n2. Analytics Review\n3. Competitor Analysis\n4. Usability Testing"
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
    id: 'insights',
    company: "Insights",
    role: "Product Design",
    period: "2023 - 2024",
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
        content: [
          {
            type: "text",
            text: "Major Insights:\n\n1. Users found the initial form too lengthy\n2. Value proposition wasn't clear enough\n3. Missing progress indicators\n4. Need for immediate value demonstration"
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
  },
  {
    id: 'solutions',
    company: "Solutions",
    role: "Product Design",
    period: "2023 - 2024",
    index: "05",
    bodyItems: [
      {
        layout: "row",
        content: [
          {
            type: "text",
            text: "We redesigned the onboarding flow to be more progressive, breaking it into smaller, more manageable steps and highlighting key benefits early in the process."
          },
          {
            type: "image",
            src: "https://picsum.photos/800/400?random=5"
          }
        ]
      },
      {
        layout: "row",
        content: [
          {
            type: "text",
            text: "Key Solutions:\n\n1. Progressive form design\n2. Clear value proposition upfront\n3. Visual progress indicators\n4. Simplified input requirements"
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
              subtitle: "New Design",
              image: "https://picsum.photos/800/400?random=13",
              title: "Redesigned Flow",
              description: "Streamlined onboarding experience"
            },
            {
              index: 2,
              subtitle: "Implementation",
              image: "https://picsum.photos/800/400?random=14",
              title: "Technical Integration",
              description: "Seamless integration of new features"
            }
          ]
        }
      }
    ]
  },
  {
    id: 'retrospective',
    company: "Retrospective",
    role: "Product Design",
    period: "2023 - 2024",
    index: "06",
    bodyItems: [
      {
        layout: "row",
        content: [
          {
            type: "text",
            text: "The redesigned onboarding process resulted in a 45% increase in sign-up completion rates and received positive user feedback for its clarity and ease of use."
          },
          {
            type: "image",
            src: "https://picsum.photos/800/400?random=6"
          }
        ]
      },
      {
        layout: "row",
        content: [
          {
            type: "text",
            text: "Key Results:\n\n1. 45% increase in completion rate\n2. 30% reduction in drop-off\n3. Positive user feedback\n4. Improved engagement metrics"
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
              subtitle: "Results",
              image: "https://picsum.photos/800/400?random=15",
              title: "Performance Metrics",
              description: "Analysis of improvement in key metrics"
            },
            {
              index: 2,
              subtitle: "Feedback",
              image: "https://picsum.photos/800/400?random=16",
              title: "User Response",
              description: "Collection of user feedback and testimonials"
            }
          ]
        }
      }
    ]
  }
];

const CSContent = ({
  // Basic props
  title = "",
  initialActiveTab = "",
  dropdowns = [],
  theme = {},
  className = "",
  style = {},
  
  // Custom props for functionality
  enableOverscrollTriggers = true,
  enableHeaderOpacityEffect = true,
  
  // Event handlers
  onTabChange = () => {},
  
  // Advanced customization
  headNavProps = {},
  
  // ID mapping props - NEW
  mapDropdownIdToHeadNavId = id => id, // Convert dropdown ID to HeadNav ID
  mapHeadNavIdToDropdownId = id => id  // Convert HeadNav ID to dropdown ID
}) => {
  // Use the initial active tab, applying any necessary mapping
  const mappedInitialTab = initialActiveTab;
  const [activeDropdownId, setActiveDropdownId] = useState(mappedInitialTab);
  const dropdownsRef = useRef(null);
  
  // Calculate the corresponding HeadNav ID for the current active dropdown
  const activeHeadNavId = mapDropdownIdToHeadNavId(activeDropdownId);
  
  // Debug info
  console.log("CSContent: activeDropdownId =", activeDropdownId);
  console.log("CSContent: activeHeadNavId =", activeHeadNavId);
  
  // Handle tab changes from HeadNav
  const handleHeadNavTabChange = (headNavId) => {
    console.log("HeadNav tab clicked:", headNavId);
    
    // Map the HeadNav ID to a dropdown ID
    const dropdownId = mapHeadNavIdToDropdownId(headNavId);
    console.log("Mapped to dropdown ID:", dropdownId);
    
    // Update the active dropdown
    setActiveDropdownId(dropdownId);
    
    // Notify parent
    onTabChange(dropdownId);
  };
  
  // Handle tab change from dropdowns (e.g., overscroll)
  const handleDropdownTabChange = (dropdownId) => {
    console.log("Dropdown tab change:", dropdownId);
    
    // Update the active dropdown
    setActiveDropdownId(dropdownId);
    
    // Notify parent
    onTabChange(dropdownId);
  };

  // Add this function to manually handle the opacity effect
  const manuallyUpdateOpacity = () => {
    const activeDropdown = document.querySelector('.dropdown.active, .dropdown.open');
    if (!activeDropdown) return;
    
    // Get dropdownHeader
    const dropdownHeader = activeDropdown.querySelector('.dropdown-header');
    const scrollTop = activeDropdown.scrollTop;
    
    // Calculate opacity based on scroll position
    if (scrollTop > 10) {
      const opacity = Math.max(0, 1 - (scrollTop / 154));
      
      // Apply opacity to the dropdown header
      if (dropdownHeader) {
        dropdownHeader.style.opacity = opacity;
      }
    } else {
      // Reset to full opacity when at top
      if (dropdownHeader) {
        dropdownHeader.style.opacity = 1;
      }
    }
  };

  // Update this to include the manual opacity handling
  useEffect(() => {
    if (!dropdownsRef.current) return;

    // Set up the scroll watcher to manually update opacity
    const watchDropdownScroll = () => {
      const dropdowns = document.querySelectorAll('.dropdown.active, .dropdown.open');
      
      dropdowns.forEach(dropdown => {
        // Remove existing listener if any
        dropdown.removeEventListener('scroll', manuallyUpdateOpacity);
        
        // Add the scroll listener
        dropdown.addEventListener('scroll', manuallyUpdateOpacity, { passive: true });
        
        // Force an initial update
        setTimeout(() => {
          manuallyUpdateOpacity();
        }, 100);
      });
    };

    // Function to add overscroll triggers to open dropdowns
    const addOverscrollTriggers = () => {
      // Find all currently open dropdown bodies
      const dropdownBodies = document.querySelectorAll('.dropdown.active .body');
      
      dropdownBodies.forEach(body => {
        // Check if we already added a trigger
        if (!body.querySelector('.overscroll-trigger')) {
          // Create overscroll trigger
          const trigger = document.createElement('div');
          trigger.className = 'overscroll-trigger';
          trigger.style.height = '50px';
          trigger.style.width = '100%';
          trigger.style.position = 'sticky';
          trigger.style.bottom = '0';
          trigger.style.display = 'flex';
          trigger.style.justifyContent = 'center';
          trigger.style.alignItems = 'center';
          trigger.style.opacity = '0.5';
          trigger.style.backgroundColor = 'transparent';
          trigger.innerHTML = '<div style="width: 50px; height: 4px; background-color: #ccc; border-radius: 2px;"></div>';
          
          // Add to the body
          body.appendChild(trigger);
          
          // Find next tab to activate when this trigger is overscrolled
          const currentTabId = body.closest('.dropdown').getAttribute('data-id');
          const navButtons = Array.from(document.querySelectorAll('.head-nav-item button'));
          const currentIndex = dropdowns.findIndex(d => d.id === currentTabId);
          const nextIndex = currentIndex < dropdowns.length - 1 ? currentIndex + 1 : -1;
          
          // Create intersection observer to detect when trigger becomes visible
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting && nextIndex >= 0 && nextIndex < navButtons.length) {
                // Trigger next tab with a slight delay to prevent accidental triggers
                setTimeout(() => {
                  console.log(`Overscroll detected - opening next tab: ${dropdowns[nextIndex].id}`);
                  navButtons[nextIndex].click();
                }, 300);
                
                // Disconnect to prevent multiple triggers
                observer.disconnect();
              }
            });
          }, {
            root: body,
            rootMargin: '0px 0px 0px 0px',
            threshold: 0.8
          });
          
          observer.observe(trigger);
        }
      });
    };
    
    // Run setup functions whenever the active tab changes
    const setupActiveDropdown = () => {
      setTimeout(() => {
        addOverscrollTriggers();
        watchDropdownScroll();
      }, 300);
    };

    // Set up initially and when tabs change
    setupActiveDropdown();
    
    // Add mutation observer to detect when dropdowns open
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === 'class' && 
            mutation.target.classList.contains('dropdown') && 
            (mutation.target.classList.contains('active') || 
             mutation.target.classList.contains('open'))) {
          setupActiveDropdown();
        }
      });
    });
    
    observer.observe(dropdownsRef.current, {
      attributes: true,
      attributeFilter: ['class'],
      subtree: true
    });
    
    // Cleanup event listeners
    return () => {
      const dropdowns = document.querySelectorAll('.dropdown');
      dropdowns.forEach(dropdown => {
        dropdown.removeEventListener('scroll', manuallyUpdateOpacity);
      });
      observer.disconnect();
    };
  }, [activeDropdownId]);

  return (
    <div 
      className={`cs-content ${className}`} 
      style={{ 
        marginBottom: '24px', 
        padding: '0',
        ...theme,  
        ...style   
      }}
    >
      {title && <h2 className="cs-content-title">{title}</h2>}
      
      <HeadNav 
        activeTab={activeHeadNavId}
        onTabChange={handleHeadNavTabChange}
        numItems={dropdowns.length}
        {...headNavProps}
      />
      <div className="dropdown-wrapper" ref={dropdownsRef}>
        <DropdownStack 
          dropdowns={dropdowns}
          activeTab={activeDropdownId}
          onTabChange={handleDropdownTabChange}
        />
      </div>
      
      {/* Existing inline styles */}
      <style>
        {`
          .cs-content {
            padding: 0 !important;
            margin-bottom: 24px !important;
          }
          
          .cs-content > * {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          
          /* Remove any gap between HeadNav and dropdown-wrapper */
          .head-nav {
            margin-bottom: 0 !important;
            border-bottom: none !important;
          }
          
          .dropdown-wrapper {
            margin-top: 0 !important;
          }
          
          /* Remove any style that would override dropdown scrolling behavior */
          .dropdown {
            overflow-y: auto !important;
          }
          
          /* Ensure dropdown headers can reduce opacity */
          .dropdown-header {
            transition: opacity 0.1s linear !important;
          }
          
          /* Last dropdown needs extra bottom padding to ensure margin is visible */
          .dropdown:last-child .body {
            padding-bottom: 24px !important;
          }
        `}
      </style>
    </div>
  );
};

export default CSContent; 