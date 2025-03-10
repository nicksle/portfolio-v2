import React from "react";
import PropTypes from "prop-types";
import "./WorkItem.css";

export const WorkItem = ({ index, subtitle, image, title, description }) => {
  // Format index to always be two digits
  const formattedIndex = String(index).padStart(2, '0');

  return (
    <div className="work-item">
      <div className="head">
        <div className="info-top">
          <div className="text-wrapper">{formattedIndex}</div>
          <div className="text-wrapper">{subtitle}</div>
        </div>
        <div className="image">
          <img className="frame" alt={title} src={image} />
        </div>
      </div>
      <div className="workbody">
        <div className="title">{title}</div>
        <p className="description">{description}</p>
      </div>
      <div className="CTA">
        <div className="div">Read More</div>
        <div className="text-wrapper-2">􀄫</div>
      </div>
    </div>
  );
};

WorkItem.propTypes = {
  index: PropTypes.number.isRequired,
  subtitle: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default WorkItem; 