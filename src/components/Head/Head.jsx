import PropTypes from "prop-types";
import React from "react";
import "./Head.css";

export const Head = ({ 
  className, 
  divClassName,
  index,          // Already the number we want to display
  role,           // For top-right text
  title,          // For middle title only
  year,           // For bottom-right text
  arrow = "􀆈",   // For bottom-left
  onClick,        // Click handler
  isAnimating = false // New prop to track animation state
}) => {
  return (
    <div className={`head ${className}`} onClick={onClick} style={{ cursor: 'pointer' }}>
      {/* Head Top - Horizontal layout with space between */}
      <div className={`head-top ${isAnimating ? 'animating' : ''}`}>
        <div className="subtitle">{String(index).padStart(2, '0')}</div>
        <div className="subtitle">{role}</div>
      </div>

      {/* Title Section */}
      <div className={`title ${isAnimating ? 'animating' : ''}`}>
        <div className="title-text">{title}</div>
      </div>

      {/* Head Bottom - Horizontal layout with space between */}
      <div className={`head-bottom ${isAnimating ? 'animating' : ''}`}>
        <div className={`arrow ${divClassName}`}>{arrow}</div>
        <div className="subtitle">{year}</div>
      </div>
    </div>
  );
};

Head.propTypes = {
  className: PropTypes.string,
  divClassName: PropTypes.string,
  index: PropTypes.string,
  title: PropTypes.string,
  role: PropTypes.string,
  year: PropTypes.string,
  arrow: PropTypes.string,
  onClick: PropTypes.func,
  isAnimating: PropTypes.bool
};

export default Head; 