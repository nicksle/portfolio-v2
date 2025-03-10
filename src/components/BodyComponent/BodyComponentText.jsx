import PropTypes from "prop-types";
import React from "react";
import "./BodyComponentText.css";

export const BodyComponentText = ({ text }) => {
  return (
    <div className="body-component">
      <p className="text">{text}</p>
    </div>
  );
};

BodyComponentText.propTypes = {
  text: PropTypes.string.isRequired,
};

export default BodyComponentText; 