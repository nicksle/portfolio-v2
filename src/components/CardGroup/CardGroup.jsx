import PropTypes from "prop-types";
import React from "react";
import { Card } from "../Card/Card";
import "./CardGroup.css";

export const CardGroup = ({ layout, property2, amount, className, cards = [] }) => {
  return (
    <div 
      className={`card-group ${className || ""}`}
      data-layout={layout}
      data-state={property2}
    >
      {cards.map((card, index) => (
        <Card
          key={index}
          className="card-instance"
          {...card}
        />
      ))}
    </div>
  );
};

CardGroup.propTypes = {
  layout: PropTypes.oneOf(["horizontal", "vertical"]),
  property2: PropTypes.oneOf(["collapsed", "expanded"]),
  amount: PropTypes.oneOf(["multi", "single"]),
  className: PropTypes.string,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number,
      layout: PropTypes.string,
      initialState: PropTypes.string,
      icon: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      buttonText: PropTypes.string,
      buttonIcon: PropTypes.string,
      images: PropTypes.arrayOf(PropTypes.string)
    })
  )
};
