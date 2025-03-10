import PropTypes from "prop-types";
import React from "react";
import { WorkItem } from "../WorkItem/WorkItem";
import "./BodyComponentSelectedWork.css";

export const BodyComponentSelectedWork = ({ works = [] }) => {
  return (
    <div className="body-component">
      <div className="selected-work">
        <div className="div-wrapper">
          <div className="text-wrapper-3">Selected Works</div>
          <div className="subtitle">A collection of my best work and projects</div>
        </div>

        <div className="works-carousel">
          {works.map((work, index) => (
            <WorkItem
              key={index}
              index={work.index}
              subtitle={work.subtitle}
              image={work.image}
              title={work.title}
              description={work.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

BodyComponentSelectedWork.propTypes = {
  works: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number.isRequired,
      subtitle: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
}; 