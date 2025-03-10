import React from "react";
import PropTypes from "prop-types";
import { ListItem } from "../ListItem/ListItem";
import "./ListGroup.css";

export const ListGroup = ({ className }) => {
  return (
    <div className={`list-item-group ${className || ""}`}>
      <ListItem className="list-item-instance" number="01" category="Increase" title="Sign Up Rate" />
      <ListItem className="list-item-instance" number="02" category="Decrease" title="Drop Off Rate" />
      <ListItem className="list-item-instance" number="03" category="Improve" title="User Satisfaction" />
    </div>
  );
};

ListGroup.propTypes = {
  className: PropTypes.string,
}; 