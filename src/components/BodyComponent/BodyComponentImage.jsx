import PropTypes from "prop-types";
import React from "react";
import "./BodyComponentImage.css";

export const BodyComponentImage = ({ src }) => {
  return (
    <div className="body-component">
      <div className="image-container">
        <img className="image" src={src} alt="" />
      </div>
    </div>
  );
};

BodyComponentImage.propTypes = {
  src: PropTypes.string.isRequired,
};

export default BodyComponentImage; 