import React from "react";
import PropTypes from "prop-types";
import "./ListItem.css";

export const ListItem = ({ number, category, title, description, className }) => {
  return (
    <div className={`list-item ${className || ""}`}>
      <div className="head">
        <div className="head-top">
          <div className="text-wrapper">{number || "01"}</div>
          <div className="text-wrapper">{category || "Increase"}</div>
        </div>
        <div className="title">
          <div className="div">{title || "Sign Up Rate"}</div>
        </div>
        <div className="index-wrapper">
          <div className="index">􀄩</div>
        </div>
      </div>
      <div className="body">
        <p className="description">
          {description || "We want to measure our sign up rate and more filler text to make this section be around 2 to 3 lines of text and what not. Maybe we can have an icon somewhere?"}
        </p>
      </div>
    </div>
  );
};

ListItem.propTypes = {
  number: PropTypes.string,
  category: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string,
}; 