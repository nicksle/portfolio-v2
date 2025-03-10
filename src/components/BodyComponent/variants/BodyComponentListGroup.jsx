import PropTypes from "prop-types";
import React from "react";
import { ListGroup } from "../../ListGroup/ListGroup";
import "../BodyComponentListGroup.css";

export const BodyComponentListGroup = ({ property1, className }) => {
  return (
    <div className={`body-component ${className || ""}`}>
      <ListGroup className="list-group-instance" />
    </div>
  );
};

BodyComponentListGroup.propTypes = {
  property1: PropTypes.oneOf(["list-group"]),
  className: PropTypes.string,
};
