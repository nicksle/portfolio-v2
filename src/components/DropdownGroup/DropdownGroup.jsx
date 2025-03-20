import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../Dropdown/Dropdown';
import './DropdownGroup.css';

export const DropdownGroup = ({ items, className, shouldCloseDropdowns, onDropdownOpen, onDropdownClose }) => {
  const [openIndex, setOpenIndex] = useState(-1);
  const groupRef = useRef(null);

  useEffect(() => {
    if (shouldCloseDropdowns) {
      setOpenIndex(-1);
    }
  }, [shouldCloseDropdowns]);

  const handleDropdownClick = (index) => {
    const newIndex = openIndex === index ? -1 : index;
    
    if (newIndex === -1 && onDropdownClose) {
      // Dropdown is being closed
      onDropdownClose(index);
    } else if (newIndex !== -1 && onDropdownOpen) {
      // Dropdown is being opened
      onDropdownOpen(index);
    }
    
    setOpenIndex(newIndex);
  };

  return (
    <div ref={groupRef} className={`dropdown-group ${className || ''}`}>
      {items.map((item) => (
        <Dropdown
          key={item.id}
          isOpen={openIndex === item.id}
          onToggle={() => handleDropdownClick(item.id)}
          company={item.company}
          role={item.role}
          period={item.period}
          description={item.description}
          index={String(item.index)}
          bodyItems={item.bodyItems}
        />
      ))}
    </div>
  );
};

DropdownGroup.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      index: PropTypes.number.isRequired,
      company: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      period: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      bodyItems: PropTypes.arrayOf(
        PropTypes.shape({
          layout: PropTypes.oneOf(["column", "row"]).isRequired,
          content: PropTypes.shape({
            type: PropTypes.oneOf([
              "text",
              "image",
              "selected-work",
              "list-group",
              "card-group"
            ]).isRequired
          }).isRequired
        })
      ).isRequired
    })
  ).isRequired,
  className: PropTypes.string,
  shouldCloseDropdowns: PropTypes.bool.isRequired,
  onDropdownOpen: PropTypes.func,
  onDropdownClose: PropTypes.func,
};

export default DropdownGroup; 