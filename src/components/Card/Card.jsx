import PropTypes from "prop-types";
import React, { useState } from "react";
import { CardItem } from "../CardItem/CardItem";
import "./Card.css";

export const Card = ({ 
  className,
  index,
  initialState = "collapsed",
  images = [],
  ...cardItemProps
}) => {
  const [state, setState] = useState(initialState);

  const handleClick = () => {
    setState(prevState => prevState === "collapsed" ? "expanded" : "collapsed");
  };

  return (
    <div className={`card ${className || ""}`}>
      <div className="index">
        <div className="text-wrapper">{String(index).padStart(2, '0')}</div>
      </div>
      <CardItem 
        {...cardItemProps} 
        state={state}
        onCtaClick={handleClick}
        images={images}
      />
    </div>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  initialState: PropTypes.oneOf(["expanded", "collapsed"]),
  images: PropTypes.arrayOf(PropTypes.string),
};
