import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from '../Dropdown/Dropdown';
import './DropdownGroup.css';

export const DropdownGroup = ({ items }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const groupRef = useRef(null);

  const handleToggle = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <div ref={groupRef} className="dropdown-group">
      {items.map((item) => (
        <Dropdown
          key={item.id}
          isOpen={openDropdown === item.id}
          onToggle={() => handleToggle(item.id)}
          company={item.company}
          role={item.role}
          period={item.period}
          description={item.description}
          index={item.index}
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
};

export default DropdownGroup; 