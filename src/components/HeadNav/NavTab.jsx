import React from 'react';
import PropTypes from 'prop-types';
import './NavTab.css';

export const NavTab = ({ id, index, label, isActive, onClick }) => {
  return (
    <div 
      className={isActive ? "navtab-active" : "navtab-inactive"}
      onClick={onClick}
      role="tab"
      aria-selected={isActive}
    >
      <div className="top">
        <div className="text-wrapper">{index}</div>
      </div>

      <div className="title">
        <div className={isActive ? "text-wrapper" : "div"}>{label}</div>
      </div>

      <div className="bottom">
        <div className={isActive ? "active-circle" : "inactive-circle"} />
      </div>
    </div>
  );
};

NavTab.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default NavTab; 