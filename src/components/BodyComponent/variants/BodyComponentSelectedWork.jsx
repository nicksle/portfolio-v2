import PropTypes from "prop-types";
import React from "react";
import "../BodyComponentSelectedWork.css";

export const BodyComponentSelectedWork = ({ property1, className, frameClassName, frameClassNameOverride }) => {
  return (
    <div className={`body-component ${className || ""}`}>
      <div className="selected-work">
        <div className="head">
          <div className="text-wrapper">Selected Works</div>
        </div>
        <div className="works-carousel">
          <div className="work-item">
            <div className="div">
              <div className="info-top">
                <div className="text-wrapper-2">01</div>
                <div className="text-wrapper-2">Secondary Text</div>
              </div>
              <div className="image">
                <div className={`frame ${frameClassName || ""}`} style={{ backgroundColor: '#f0f0f0', height: '200px' }} />
              </div>
            </div>
            <div className="body">
              <div className="title">Improved Sign-Up Flow</div>
              <p className="description">
                Delightful sign-up flow that increased user retention and
                reduced drop off
              </p>
            </div>
            <div className="CTA">
              <div className="text-wrapper-3">Read More</div>
              <div className="text-wrapper-4">􀄫</div>
            </div>
          </div>
          <div className="work-item">
            <div className="div">
              <div className="info-top">
                <div className="text-wrapper-2">02</div>
                <div className="text-wrapper-2">Secondary Text</div>
              </div>
              <div className="image">
                <div className={`frame-2 ${frameClassNameOverride || ""}`} style={{ backgroundColor: '#f0f0f0', height: '200px' }} />
              </div>
            </div>
            <div className="body">
              <div className="title">Improved Sign-Up Flow</div>
              <p className="description">
                Delightful sign-up flow that increased user retention and
                reduced drop off
              </p>
            </div>
            <div className="CTA">
              <div className="text-wrapper-3">Read More</div>
              <div className="text-wrapper-4">􀄫</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

BodyComponentSelectedWork.propTypes = {
  property1: PropTypes.oneOf(["selected-work"]),
  className: PropTypes.string,
  frameClassName: PropTypes.string,
  frameClassNameOverride: PropTypes.string,
};
