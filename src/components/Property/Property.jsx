import React from "react";
import { CardItem } from "../CardItem/CardItem";
import "./style.css";

export const Property = () => {
  return (
    <div className="property">
      <div className="index">
        <div className="text-wrapper-3">01</div>
      </div>
      <CardItem
        bodyClassName="design-component-instance-node"
        cardFrameClassName="design-component-instance-node"
        className="card-item-instance"
        imageClassName="card-item-2"
        imageClassNameOverride="card-item-3"
        layout="horizontal"
      />
    </div>
  );
}; 