import React from "react";
import PropTypes from "prop-types";
import { ListGroup } from "../ListGroup/ListGroup";
import "./List.css";

export const List = ({ className, title }) => {
  return (
    <div className={`list ${className || ""}`}>
      <div className="div-wrapper">
        <div className="text-wrapper-2">{title || "Key Performance Indicators"}</div>
      </div>
      <ListGroup className="list-item-group-instance" />
    </div>
  );
};

List.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
}; 