import PropTypes from "prop-types";
import React from "react";
import "./CardItem.css";
import { ImageCarousel } from "../ImageCarousel/ImageCarousel";

export const CardItem = ({
  layout,
  state,
  className,
  bodyClassName,
  cardFrameClassName,
  icon = "􀐕",
  title = "Conduct an audit of our user sign-up flow",
  description = "Interviewing our users helped identify bugs that made it impossible for them to sign up.",
  buttonText = "See More",
  buttonIcon = "􀄫",
  images = [],
  onCtaClick
}) => {
  return (
    <div 
      className={`card-item ${className || ""}`} 
      data-layout={layout}
      data-state={state}
    >
      <div className={`card-frame ${cardFrameClassName || ""}`}>
        <div className="head">
          <div className="content">
            <div className="frame">
              <div className="icon">
                <div className="text-wrapper">{icon}</div>
              </div>
              <p className="title">{title}</p>
              <p className="description">{description}</p>
            </div>
          </div>
          <div className="CTA" onClick={onCtaClick} style={{ cursor: 'pointer' }}>
            <div className="text-wrapper-2">{buttonText}</div>
            <div className="text-wrapper-2" 
              style={{ 
                transform: state === "expanded" ? "rotate(0deg)" : "rotate(-180deg)",
                transition: "transform 0.3s ease"
              }}
            >
              {buttonIcon}
            </div>
          </div>
        </div>
        <div className={`body ${bodyClassName || ""}`}>
          <div className="image-carousel-wrapper">
            <ImageCarousel images={images} />
          </div>
        </div>
      </div>
    </div>
  );
};

CardItem.propTypes = {
  layout: PropTypes.oneOf(["horizontal", "vertical"]),
  state: PropTypes.oneOf(["expanded", "collapsed"]),
  className: PropTypes.string,
  bodyClassName: PropTypes.string,
  cardFrameClassName: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  buttonText: PropTypes.string,
  buttonIcon: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
  onCtaClick: PropTypes.func
}; 