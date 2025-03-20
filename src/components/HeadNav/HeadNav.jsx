import React from 'react';
import PropTypes from 'prop-types';
import { NavTab } from './NavTab';
import './HeadNav.css';

export const HeadNav = ({
  activeTab,
  onTabChange,
  numItems, 
  // Keep props for compatibility but don't use sticky functionality
  tabLabels = {},
  sticky = false, // Default to false
  stickyOffset = 0,
  className = "",
  onHover = () => {}
}) => {
  // Define all possible navigation items
  const allNavItems = [
    { id: 'problem', label: 'Problem', index: '01' },
    { id: 'goals', label: 'Goals', index: '02' },
    { id: 'research', label: 'Research', index: '03' },
    { id: 'insights', label: 'Insights', index: '04' },
    { id: 'solutions', label: 'Solutions', index: '05' },
    { id: 'retrospective', label: 'Retrospective', index: '06' },
    { id: 'item7', label: 'Item 7', index: '07' },
    { id: 'item8', label: 'Item 8', index: '08' },
    // Add more items as needed
  ];

  // Slice the array to get the desired number of items
  const navItems = allNavItems.slice(0, numItems);

  // Get the appropriate label for a tab
  const getTabLabel = (tabId) => {
    return tabLabels[tabId] || tabId.charAt(0).toUpperCase() + tabId.slice(1);
  };

  // Debug which tabs are available
  console.log("HeadNav tabs:", navItems.map(item => item.id));
  console.log("Current active tab:", activeTab);

  return (
    <div 
      className={`head-nav ${className}`}
      // Remove sticky class and positioning
    >
      <div className="nav-header">
        {/* Use NavTab components */}
        {navItems.map((item) => (
          <NavTab
            key={item.id}
            id={item.id}
            index={item.index}
            label={getTabLabel(item.id)}
            isActive={activeTab === item.id}
            onClick={() => {
              console.log(`Clicked tab: ${item.id}`);
              onTabChange(item.id);
              onHover(item.id);
            }}
          />
        ))}
      </div>
    </div>
  );
};

HeadNav.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  numItems: PropTypes.number,
  tabLabels: PropTypes.object,
  sticky: PropTypes.bool,
  stickyOffset: PropTypes.number,
  className: PropTypes.string,
  onHover: PropTypes.func
};

export default HeadNav; 