import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../Dropdown/Dropdown';
import './DropdownStack.css';

const DropdownStack = ({ dropdowns, activeTab, onTabChange }) => {
  // Store previous active tab for comparison
  const prevActiveTabRef = useRef(activeTab);
  // Track if animation is in progress
  const isAnimatingRef = useRef(false);
  // For debugging - track which dropdowns are available
  const [availableIds, setAvailableIds] = useState([]);
  
  useEffect(() => {
    // Debug which dropdowns are available
    const ids = dropdowns.map(d => d.id);
    setAvailableIds(ids);
    console.log("Available dropdown IDs:", ids);
  }, [dropdowns]);
  
  // Reset scrolls when tab changes
  useEffect(() => {
    if (activeTab !== prevActiveTabRef.current) {
      console.log(`Tab changed from ${prevActiveTabRef.current} to ${activeTab}`);
      
      // Verify the active tab exists in our dropdowns
      const dropdownExists = dropdowns.some(d => d.id === activeTab);
      if (!dropdownExists) {
        console.error(`Active tab ${activeTab} doesn't match any dropdown ID!`);
        console.log("Available dropdowns:", availableIds);
      }
      
      // Set animating flag
      isAnimatingRef.current = true;
      
      // Find closed dropdowns and reset them
      setTimeout(() => {
        const closedDropdowns = document.querySelectorAll('.dropdown.closed');
        closedDropdowns.forEach(dropdown => {
          dropdown.scrollTop = 0;
        });
        
        // Clear animating flag
        isAnimatingRef.current = false;
      }, 700); // Wait for animation to complete
      
      prevActiveTabRef.current = activeTab;
    }
  }, [activeTab, dropdowns, availableIds]);

  // Handle overscroll events
  const handleOverscroll = (currentId) => {
    // Don't trigger if animation is in progress
    if (isAnimatingRef.current) return;
    
    const currentIndex = dropdowns.findIndex(dropdown => dropdown.id === currentId);
    
    // If there's a next dropdown, switch to it
    if (currentIndex < dropdowns.length - 1) {
      console.log(`Overscroll detected, moving from ${currentId} to ${dropdowns[currentIndex + 1].id}`);
      const nextDropdown = dropdowns[currentIndex + 1];
      onTabChange(nextDropdown.id);
    }
  };

  // Debug to see if the activeTab is being passed correctly
  console.log("DropdownStack: activeTab =", activeTab);
  console.log("DropdownStack: available dropdowns =", dropdowns.map(d => d.id));

  return (
    <div className="dropdown-stack">
      {dropdowns.map((dropdown, index) => {
        const isActive = dropdown.id === activeTab;
        console.log(`Dropdown ${dropdown.id}, isActive: ${isActive}`);
        
        return (
          <div 
            key={dropdown.id}
            className={`stack-layer ${isActive ? 'active' : ''}`}
            style={{
              display: 'block',
              position: isActive ? 'relative' : 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              zIndex: isActive ? 10 : 0,
              visibility: isActive ? 'visible' : 'hidden'
            }}
          >
            <Dropdown
              id={dropdown.id}
              isOpen={isActive}
              company={dropdown.company}
              role={dropdown.role}
              period={dropdown.period}
              index={dropdown.index}
              bodyItems={dropdown.bodyItems}
              onOverscroll={() => {
                const nextIndex = index + 1;
                if (nextIndex < dropdowns.length) {
                  onTabChange(dropdowns[nextIndex].id);
                }
              }}
              isLastItem={index === dropdowns.length - 1}
            />
          </div>
        );
      })}
    </div>
  );
};

DropdownStack.propTypes = {
  dropdowns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      period: PropTypes.string.isRequired,
      index: PropTypes.string.isRequired,
      bodyItems: PropTypes.array.isRequired
    })
  ).isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired
};

export default DropdownStack; 