import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { Head } from "../Head/Head";
import { Body } from "../Body/Body";
import "./Dropdown.css";

export const Dropdown = ({ 
  isOpen, 
  onToggle, 
  company, 
  role, 
  period, 
  description,
  index,
  bodyItems
}) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      // Add a small delay to ensure the dropdown has expanded
      setTimeout(() => {
        dropdownRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className={`dropdown ${isOpen ? 'open' : ''}`}>
      <Head
        className="head-instance"
        index={String(index).padStart(2, '0')}
        title={company}
        role={role}
        year={period}
        onClick={onToggle}
      />
      <div className="body">
        <Body
          className="body-instance"
          bodyItems={bodyItems}
        />
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  company: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
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
        ]).isRequired,
        text: PropTypes.string,
        src: PropTypes.string,
        cards: PropTypes.array
      }).isRequired
    })
  ).isRequired
};

export default Dropdown;
