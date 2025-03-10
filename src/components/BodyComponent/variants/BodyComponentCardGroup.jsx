import PropTypes from "prop-types";
import React from "react";
import { CardGroup } from "../../CardGroup/CardGroup";
import "../BodyComponentCardGroup.css";

export const BodyComponentCardGroup = ({ property1, className }) => {
  return (
    <div className={`body-component ${className || ""}`}>
      <CardGroup
        amount="multi"
        className="card-group-instance"
        property1="horizontal"
        property2="collapsed"
      />
    </div>
  );
};

BodyComponentCardGroup.propTypes = {
  property1: PropTypes.oneOf(["card-group"]),
  className: PropTypes.string,
};
